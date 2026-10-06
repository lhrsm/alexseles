"""Monta o vídeo do Manifesto com narração e música.

Passos: (1) python narrate.py [gemini|windows]  (2) python build.py
- A voz de cada cena só entra depois de o título estar no ecrã (LEAD) e acaba pelo menos TAIL s antes da transição;
  cada cena dura o tempo da animação ou o da narração + LEAD + TAIL (o que for maior).
- Música motivacional gerada aqui (sem direitos de autor): Ré maior, 106 BPM; começa com piano e cordas suaves, cresce com
  baixo e bateria e chega a um pico positivo no fecho; baixa por baixo da voz.
- Tempos de cada palavra (para o texto aparecer ao ritmo da voz): pausas reais da gravação + tamanho de cada palavra,
  gravados em out/words.js, que o index.html lê.
- Mistura normalizada a -16 LUFS; MP4 H.264 + AAC 48 kHz.
- As legendas (WebVTT) ficam só em out/ como referência: no site, o texto da narração já está no ecrã e na lista por baixo.
Saídas: ../../public/media/manifesto.mp4, manifesto-poster.jpg; out/manifesto-vertical-1080x1920.mp4, out/music.wav,
out/manifesto.pt.vtt e out/timings.json.
"""
import json
import os
import shutil
import subprocess
import sys
import re
import unicodedata
import wave
from pathlib import Path

import numpy as np
from scipy.signal import butter, sosfilt

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"
NARR = OUT / "narration"
MEDIA = HERE.parents[1] / "public" / "media"
SR = 48000
FPS = 30
DEFAULTS = [3.2] + [4.2] * 8 + [4.6]   # tempos da animação sem narração
LEAD = 1.0                               # a voz entra quando o título da cena já está no ecrã (~0,95 s)
TAIL = 1.0                               # a voz acaba 1 s antes do fim da cena (a saída começa a D-0,55 s)
BPM = 106
PLAYWRIGHT_DIR = str(HERE)  # pasta onde corre o gravador (o record.mjs resolve o playwright-core)


def run(cmd, **kw):
    subprocess.run(cmd, check=True, **kw)


def read_wav(path: Path) -> np.ndarray:
    with wave.open(str(path)) as w:
        assert w.getframerate() == SR and w.getnchannels() == 1
        return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768


def write_wav(path: Path, data: np.ndarray) -> None:
    data = np.clip(data, -1, 1)
    if data.ndim == 1:
        data = np.stack([data, data], axis=1)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((data * 32767).astype(np.int16).tobytes())


def timings(segments: list) -> tuple:
    durs = [round(max(DEFAULTS[i], LEAD + s["duration"] + TAIL), 2) for i, s in enumerate(segments)]
    starts = np.cumsum([0] + durs[:-1]).tolist()
    return durs, starts


def _env(n: int, attack: float, decay: float) -> np.ndarray:
    tt = np.arange(n) / SR
    return np.minimum(1, tt / max(attack, 1e-4)) * np.exp(-tt / decay)


def _place(buf: np.ndarray, start: float, sound: np.ndarray, gain: float = 1.0) -> None:
    i0 = int(start * SR)
    if i0 >= len(buf):
        return
    m = min(len(sound), len(buf) - i0)
    buf[i0:i0 + m] += sound[:m] * gain


def music(total: float, peak: float = None) -> np.ndarray:
    """Música motivacional: Ré maior, 106 BPM, I–V–vi–IV. Arranjo em camadas que crescem com o tempo:
    piano + cordas → + baixo e plucks → + bateria → pico no fecho (peak, em segundos) → acorde final. Sem licenças."""
    rng = np.random.default_rng(11)
    n = int(total * SR)
    peak = peak if peak is not None else total * 0.85
    beat = 60 / BPM
    bar = 4 * beat
    note = lambda m: 440 * 2 ** ((m - 69) / 12)
    prog = [(50, [62, 66, 69]), (45, [61, 64, 69]), (47, [62, 66, 71]), (43, [62, 67, 71])]   # D A Bm G
    piano, strings, bass, pluck, drums = (np.zeros(n, np.float32) for _ in range(5))

    def piano_note(f, ln):
        m = int(ln * SR); tt = np.arange(m) / SR
        tone = sum(a * np.sin(2 * np.pi * f * h * tt) * np.exp(-tt * (2.2 + h * 1.4)) for h, a in ((1, 1), (2, .45), (3, .2), (4, .1)))
        return tone * np.minimum(1, tt / .004)

    kl = int(0.3 * SR); tk = np.arange(kl) / SR
    kick = np.sin(2 * np.pi * (50 + 85 * np.exp(-tk * 36)) * tk) * np.exp(-tk * 10)
    cl = int(0.25 * SR)
    snare = sosfilt(butter(2, [700, 5000], 'band', fs=SR, output='sos'), rng.standard_normal(cl)) * _env(cl, .002, .09)
    hl = int(0.05 * SR)
    hat = sosfilt(butter(2, 7800, 'high', fs=SR, output='sos'), rng.standard_normal(hl)) * _env(hl, .001, .016)
    crl = int(2.2 * SR)
    crash = sosfilt(butter(2, 5000, 'high', fs=SR, output='sos'), rng.standard_normal(crl)) * _env(crl, .003, .7)

    # intensidade 0..1 ao longo do vídeo (cresce até ao pico)
    def level(x):
        return float(np.clip(x / peak, 0, 1))

    bars = int(np.ceil(total / bar)) + 1
    for b in range(bars):
        t0 = b * bar
        if t0 >= total - 0.5:
            break
        root, triad = prog[b % 4] if t0 < total - 2 * bar else prog[0]
        lv = level(t0)
        # cordas/pad: acorde inteiro, ataque lento, sempre
        ln = bar + .6; m = int(ln * SR); tt = np.arange(m) / SR
        env = np.minimum(1, tt / .9) * np.minimum(1, np.maximum(0, (ln - tt) / .6))
        pad = sum(np.sin(2 * np.pi * note(x) * 2 ** (d / 12) * tt) for x in triad + [triad[0] - 12] for d in (-.08, .08))
        _place(strings, t0, pad * env, .035 + .02 * lv)
        # piano: arpejo em colcheias (suave no início, mais presente depois)
        arp = [triad[0], triad[1], triad[2], triad[1] + 12, triad[2], triad[1], triad[0] + 12, triad[2]]
        for k, mnote in enumerate(arp):
            _place(piano, t0 + k * beat / 2, piano_note(note(mnote), 1.2), .07 + .03 * lv)
        _place(piano, t0, piano_note(note(root), 2.2), .09)
        # baixo a partir de ~20 % do pico
        if lv > .2:
            f = note(root)
            for off in ((0, .5, 1, 1.5, 2, 2.5, 3, 3.5) if lv > .55 else (0, 2)):
                ln_s = int(beat * (.45 if lv > .55 else 1.6) * SR); tt = np.arange(ln_s) / SR
                tone = np.sin(2 * np.pi * f * tt) + .3 * np.sin(2 * np.pi * 2 * f * tt)
                _place(bass, t0 + off * beat, tone * _env(ln_s, .006, .25), .28)
        # plucks brilhantes a partir de ~40 %
        if lv > .4:
            hi = [x + 12 for x in triad] + [triad[1] + 24]
            for k in range(16):
                ln_s = int(.2 * SR); tt = np.arange(ln_s) / SR
                ff = note(hi[k % 4])
                tone = np.sin(2 * np.pi * ff * tt) + .4 * np.sin(2 * np.pi * 2 * ff * tt)
                _place(pluck, t0 + k * beat / 4, tone * _env(ln_s, .002, .06), .035 * (lv - .3) / .7)
        # bateria a partir de ~55 %: kick nos tempos, tarola no 2 e 4, pratos em colcheias; mais cheia no pico
        if lv > .55:
            for k in range(4):
                tb = t0 + k * beat
                _place(drums, tb, kick, .8 if lv > .8 or k in (0, 2) else 0)
                if k in (1, 3):
                    _place(drums, tb, snare, .3)
                _place(drums, tb + beat / 2, hat, .16)
                if lv >= 1:
                    _place(drums, tb, hat, .1)
        # pratos ao entrar no pico
        if abs(t0 - peak) < bar / 2:
            _place(drums, t0, crash, .25)
    # acorde final
    ln_s = int(3.0 * SR); tt = np.arange(ln_s) / SR
    final = sum(np.sin(2 * np.pi * note(m) * tt) for m in (38, 50, 62, 66, 69, 74)) * _env(ln_s, .01, 1.1)
    _place(strings, max(0, total - 3.2), final, .06)
    _place(drums, max(0, total - 3.2), crash, .2)

    strings = sosfilt(butter(2, 3200, 'low', fs=SR, output='sos'), strings)
    piano = sosfilt(butter(2, 6500, 'low', fs=SR, output='sos'), piano)
    bass = sosfilt(butter(2, 800, 'low', fs=SR, output='sos'), bass)
    pluck = sosfilt(butter(2, 6000, 'low', fs=SR, output='sos'), pluck)
    mix = strings + piano + bass + pluck + drums
    space = strings + piano + pluck
    for delay, gain in ((0.19, .25), (0.37, .16), (0.61, .1)):
        d = int(delay * SR)
        mix[d:] += space[:-d] * gain
    fade_in, fade_out = int(1.5 * SR), int(2.5 * SR)
    mix[:fade_in] *= np.linspace(0, 1, fade_in)
    mix[-fade_out:] *= np.linspace(1, 0, fade_out)
    return mix / (np.max(np.abs(mix)) + 1e-9)


def build_audio(segments: list, durs: list, starts: list) -> tuple:  # noqa: C901
    total = sum(durs)
    n = int(total * SR)
    voice = np.zeros(n, dtype=np.float32)
    active = np.zeros(n, dtype=np.float32)
    cues = []
    for i, s in enumerate(segments):
        seg = read_wav(NARR / s["file"])
        i0 = int((starts[i] + LEAD) * SR)
        voice[i0:i0 + len(seg)] += seg[: n - i0]
        active[i0:i0 + len(seg)] = 1
        cues.append((starts[i] + LEAD, starts[i] + LEAD + s["duration"], s["text"]))
    # ducking: -10 dB sem voz, -18 dB com voz, transição suave de ~0,35 s
    k = int(0.35 * SR)
    c = np.concatenate([[0.0], np.cumsum(active)])          # média móvel rápida (soma acumulada)
    idx = np.arange(n)
    lo, hi = np.clip(idx - k // 2, 0, n), np.clip(idx + k // 2, 0, n)
    smooth = ((c[hi] - c[lo]) / np.maximum(hi - lo, 1)).astype(np.float32)
    gain_db = -10 - 8 * smooth
    mus = music(total, peak=starts[-1]) * (10 ** (gain_db / 20))
    voice = voice / (np.max(np.abs(voice)) + 1e-9) * 0.9
    return voice + mus, total, cues


def _norm(word: str) -> str:
    w = unicodedata.normalize("NFKD", word.lower()).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]", "", w)


def _pauses(path: Path) -> list:
    """Pausas internas da gravação (centro de cada silêncio ≥ 0,12 s), em segundos."""
    err = subprocess.run(["ffmpeg", "-v", "info", "-i", str(path), "-af", "silencedetect=noise=-38dB:d=0.12", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    a = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    b = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    return [(x, y) for x, y in zip(a, b)]


def word_times(path: Path, text: str, dur: float) -> list:
    """Início aproximado de cada palavra (s desde o início da gravação).
    Frases separadas pela pontuação ancoram-se nas pausas reais; dentro de cada frase o tempo divide-se pelo tamanho das palavras."""
    words = text.split()
    phrases, cur = [], []
    for w in words:
        cur.append(w)
        if re.search(r"[.,:;!?]$", w):
            phrases.append(cur)
            cur = []
    if cur:
        phrases.append(cur)
    pauses = sorted(_pauses(path), key=lambda g: g[1] - g[0], reverse=True)[: len(phrases) - 1]
    pauses = sorted(pauses)
    # limites das frases: início e fim de fala de cada uma
    spans, start = [], 0.0
    for i in range(len(phrases)):
        end = pauses[i][0] if i < len(pauses) else dur
        spans.append((start, end))
        start = pauses[i][1] if i < len(pauses) else dur
    if len(pauses) < len(phrases) - 1:   # sem pausas suficientes: tudo proporcional ao texto
        total_chars = sum(len(w) + 1 for w in words)
        out, acc = [], 0.0
        for w in words:
            out.append(round(dur * acc / total_chars, 3))
            acc += len(w) + 1
        return out
    out = []
    for (a, b), ph in zip(spans, phrases):
        weights = [len(_norm(w)) + 2 for w in ph]
        tot, acc = sum(weights), 0
        for wgt in weights:
            out.append(round(a + (b - a) * acc / tot, 3))
            acc += wgt
    return out


def screen_words(segments: list, starts: list) -> dict:
    """Para cada cena, o tempo (desde o início da cena) de cada palavra do texto que vai aparecer a ser escrito."""
    scenes = []
    for i, s in enumerate(segments):
        wt = word_times(NARR / s["file"], s["text"], s["duration"])
        scenes.append([(w, round(starts[i] + LEAD + t0 - starts[i], 3)) for w, t0 in zip(s["text"].split(), wt)])
    return scenes


def write_words_js(segments: list, starts: list, durs: list) -> None:
    data = {"lead": LEAD, "starts": starts, "durations": durs, "scenes": screen_words(segments, starts)}
    (OUT / "words.js").write_text("window.WORD_TIMES = " + json.dumps(data, ensure_ascii=False) + ";\n", encoding="utf-8")


def _balanced(words: list, parts: int) -> list:
    """Divide as palavras em grupos com tamanhos de texto parecidos (sem palavras soltas no fim)."""
    total = sum(len(w) + 1 for w in words)
    groups, cur, size = [], [], 0
    for w in words:
        cur.append(w)
        size += len(w) + 1
        if len(groups) < parts - 1 and size >= total * (len(groups) + 1) / parts:
            groups.append(cur)
            cur = []
    if cur:
        groups.append(cur)
    return groups


def split_caption(text: str, max_cue: int = 84) -> list:
    """Legendas curtas: cada uma com no máximo 2 linhas equilibradas (~42 caracteres por linha)."""
    words = text.split()
    n = max(1, -(-len(text) // max_cue))
    cues = []
    for group in _balanced(words, n):
        lines = _balanced(group, 2) if len(" ".join(group)) > 42 else [group]
        cues.append("\n".join(" ".join(l) for l in lines))
    return cues


def vtt(cues: list) -> str:
    def ts(x):
        h, r = divmod(x, 3600)
        m, s = divmod(r, 60)
        return f"{int(h):02d}:{int(m):02d}:{s:06.3f}"
    lines, n = ["WEBVTT", ""], 0
    for a, b, text in cues:
        parts = split_caption(text)
        total = sum(len(x) for x in parts)
        t0 = a
        for part in parts:
            t1 = t0 + (b - a) * len(part) / total   # tempo proporcional ao texto
            n += 1
            lines += [str(n), f"{ts(t0)} --> {ts(t1)}", part, ""]
            t0 = t1
    return "\n".join(lines)


def captions_only() -> None:
    """Refaz só as legendas a partir dos tempos e da narração já gerados."""
    seg = json.loads((NARR / "segments.json").read_text(encoding="utf-8"))["segments"]
    starts = json.loads((OUT / "timings.json").read_text(encoding="utf-8"))["starts"]
    cues = [(starts[i] + LEAD, starts[i] + LEAD + s["duration"], s["text"]) for i, s in enumerate(seg)]
    (OUT / "manifesto.pt.vtt").write_text(vtt(cues), encoding="utf-8")


def record(vertical: bool, dur_param: str) -> Path:
    frames = OUT / ("frames-v" if vertical else "frames-h")
    env = {**os.environ, "DUR": dur_param}
    run(["node", str(HERE / "record.mjs"), "v" if vertical else "h"], env=env, cwd=PLAYWRIGHT_DIR)
    return frames


def encode(frames: Path, audio: Path, dest: Path, crf: int) -> None:
    run(["ffmpeg", "-v", "error", "-y", "-framerate", str(FPS), "-i", str(frames / "f%05d.jpg"), "-i", str(audio),
         "-c:v", "libx264", "-preset", "slow", "-crf", str(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart",
         "-c:a", "aac", "-b:a", "128k", "-ar", str(SR), "-ac", "2", "-shortest", str(dest)])


def main() -> None:
    if len(sys.argv) > 1 and sys.argv[1] == "legendas":
        captions_only()
        return
    meta = json.loads((NARR / "segments.json").read_text(encoding="utf-8"))
    segments = meta["segments"]
    durs, starts = timings(segments)
    dur_param = ",".join(f"{d:.2f}" for d in durs)
    print("cenas (s):", dur_param, "| total:", round(sum(durs), 2))
    write_words_js(segments, starts, durs)

    mix, total, cues = build_audio(segments, durs, starts)
    raw, norm = OUT / "mix-raw.wav", OUT / "mix.wav"
    write_wav(raw, mix)
    run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-ar", str(SR), str(norm)])
    (OUT / "manifesto.pt.vtt").write_text(vtt(cues), encoding="utf-8")
    write_wav(OUT / "music.wav", music(total, peak=starts[-1]) * 0.5)
    (OUT / "timings.json").write_text(json.dumps({"durations": durs, "starts": starts, "engine": meta.get("engine")}), encoding="utf-8")

    only = sys.argv[1] if len(sys.argv) > 1 else "hv"
    if "h" in only:
        frames = record(False, dur_param)
        encode(frames, norm, MEDIA / "manifesto.mp4", 23)
        shutil.copy(MEDIA / "manifesto.mp4", OUT / "manifesto.mp4")
        run(["ffmpeg", "-v", "error", "-y", "-ss", "1.8", "-i", str(MEDIA / "manifesto.mp4"), "-frames:v", "1", "-q:v", "3",
             str(MEDIA / "manifesto-poster.jpg")])
        shutil.copy(MEDIA / "manifesto-poster.jpg", OUT / "manifesto-poster.jpg")
        shutil.rmtree(frames, ignore_errors=True)
    if "v" in only:
        frames = record(True, dur_param)
        encode(frames, norm, OUT / "manifesto-vertical-1080x1920.mp4", 24)
        shutil.rmtree(frames, ignore_errors=True)
    raw.unlink(missing_ok=True)
    print("cena | início cena | voz início | voz fim | fim cena | folga")
    for i, s in enumerate(segments):
        a, b = starts[i] + LEAD, starts[i] + LEAD + s["duration"]
        print(f"{i:>4} | {starts[i]:>11.2f} | {a:>10.2f} | {b:>7.2f} | {starts[i] + durs[i]:>8.2f} | {starts[i] + durs[i] - b:>5.2f}")
    print("feito")


if __name__ == "__main__":
    main()
