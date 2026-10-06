"""Narração do vídeo do Manifesto (audiodescrição para pessoas cegas), um ficheiro por cena.

Uso: python narrate.py [gemini|windows]
- gemini (por omissão): voz feminina natural e calorosa do Gemini (MANIFESTO_VOICE, por omissão Sulafat), gerada num
  ÚNICO pedido com os 10 segmentos separados por pausas; depois corta-se pelas 9 pausas mais longas.
  O plano gratuito dá só 10 pedidos de voz por dia: se a quota tiver acabado (429), repita mais tarde.
- windows: voz portuguesa do Windows (Microsoft Helia, pt-PT), só para testes locais.
A chave vem do .env do RP1 (nunca é mostrada).
Saída: out/narration/seg00.wav … seg09.wav (48 kHz mono, sem silêncio nas pontas) e out/narration/segments.json.
Depois: python build.py
"""
import base64
import json
import os
import re
import subprocess
import sys
import wave
from pathlib import Path

import httpx

HERE = Path(__file__).resolve().parent
OUT = HERE / "out" / "narration"
VOICE = os.getenv("MANIFESTO_VOICE", "Sulafat")   # descrita pela Google como "warm" (calorosa)
MODEL = os.getenv("GEMINI_TTS_MODEL", "gemini-3.8-flash-tts")
STYLE = ("Lê em português de Portugal, de forma natural e calorosa, como quem conversa com uma pessoa, "
         "ritmo tranquilo, sem tom de anúncio, e faz uma pausa longa entre cada parágrafo:")

PILLARS = [
    ("Participar", "Quem aparece, pergunta e responde é lembrado quando surgem oportunidades."),
    ("Partilhar", "Uma vaga, um link ou um erro que já cometeu podem poupar meses a outra pessoa."),
    ("Ajudar primeiro", "Ajudar sem esperar retorno é a forma mais rápida de construir uma rede que responde."),
    ("Aprender em público", "Mostrar o que está a estudar cria confiança e atrai quem está no mesmo caminho."),
    ("Conexões genuínas", "Dez relações reais valem mais do que mil contactos que não se lembram de si."),
    ("Celebrar conquistas", "Uma certificação, uma entrevista, um primeiro emprego: tudo conta e merece ser dito."),
    ("Consistência", "Um pouco todos os dias vence o esforço intenso de uma semana só."),
    ("Ética", "Respeito, verdade e confidencialidade, dentro e fora do grupo."),
]
NUMBERS = ["Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito"]

SEGMENTS = (
    ["Manifesto. O que nos une. Oito princípios da PM Unlocked para crescer em comunidade."]
    + [f"{NUMBERS[i]}. {t}. {d}" for i, (t, d) in enumerate(PILLARS)]
    + ["Oito princípios. Uma comunidade. Gestão de projetos, carreira em TI e a vida em Portugal. "
       "Entre na comunidade em alexseles.online."]
)


def api_key() -> str:
    if os.getenv("GEMINI_API_KEY"):
        return os.environ["GEMINI_API_KEY"]
    for line in Path("C:/Alex/rp1/aiwork/backend/.env").read_text(encoding="utf-8").splitlines():
        if line.startswith("GEMINI_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"')
    sys.exit("Falta a GEMINI_API_KEY.")


def gemini_all(path: Path, key: str) -> None:
    """Um só pedido: instrução de estilo + os 10 parágrafos separados por linhas em branco."""
    text = STYLE + "\n\n" + "\n\n".join(SEGMENTS)
    body = {"contents": [{"role": "user", "parts": [{"text": text}]}],
            "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": {
                "languageCode": "pt-PT", "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": VOICE}}}}}
    res = httpx.post(f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
                     headers={"x-goog-api-key": key}, json=body, timeout=300)
    if res.status_code == 429:
        sys.exit("QUOTA: a quota diária de voz do Gemini acabou. Repita mais tarde: python narrate.py gemini && python build.py")
    if res.status_code != 200:
        sys.exit(f"O Gemini não gerou o áudio ({res.status_code}).")
    part = res.json()["candidates"][0]["content"]["parts"][0]["inlineData"]
    rate = int((re.search(r"rate=(\d+)", part.get("mimeType", "")) or [None, 24000])[1])
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(base64.b64decode(part["data"]))


def silences(path: Path) -> list:
    """Pausas (início, fim) com pelo menos 0,35 s."""
    err = subprocess.run(["ffmpeg", "-v", "info", "-i", str(path), "-af", "silencedetect=noise=-40dB:d=0.35", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    return list(zip(starts, ends))


def split_by_pauses(full: Path) -> list:
    """Corta nas 9 pausas mais longas (entre parágrafos), mantendo a ordem."""
    gaps = sorted(silences(full), key=lambda g: g[1] - g[0], reverse=True)[: len(SEGMENTS) - 1]
    if len(gaps) < len(SEGMENTS) - 1:
        sys.exit("Não encontrei pausas suficientes entre os parágrafos; repita o pedido.")
    cuts = sorted((a + b) / 2 for a, b in gaps)
    bounds = [0.0] + cuts + [None]
    parts = []
    for i in range(len(SEGMENTS)):
        raw = OUT / f"raw{i:02d}.wav"
        cmd = ["ffmpeg", "-v", "error", "-y", "-i", str(full), "-ss", f"{bounds[i]:.3f}"]
        if bounds[i + 1] is not None:
            cmd += ["-to", f"{bounds[i + 1]:.3f}"]
        subprocess.run(cmd + [str(raw)], check=True)
        parts.append(raw)
    return parts


def windows(text: str, path: Path) -> None:
    txt = path.with_suffix(".txt")
    txt.write_text(text, encoding="utf-8")
    subprocess.run(["powershell", "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", str(HERE / "winvoice.ps1"),
                    "-TextFile", str(txt), "-Out", str(path)], check=True, capture_output=True)
    txt.unlink(missing_ok=True)


def duration(path: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True).stdout
    return float(out.strip())


def trim(raw: Path, seg: Path) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-af",
                    "silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
                    "silenceremove=start_periods=1:start_threshold=-45dB,areverse",
                    "-ar", "48000", "-ac", "1", str(seg)], check=True)
    raw.unlink(missing_ok=True)


def main() -> None:
    engine = (sys.argv[1] if len(sys.argv) > 1 else "gemini").lower()
    OUT.mkdir(parents=True, exist_ok=True)
    if engine == "gemini":
        full = OUT / "full.wav"
        print(f"um pedido ao Gemini (voz {VOICE})…")
        gemini_all(full, api_key())
        raws = split_by_pauses(full)
    else:
        raws = []
        for i, text in enumerate(SEGMENTS):
            raw = OUT / f"raw{i:02d}.wav"
            windows(text, raw)
            raws.append(raw)
    info = []
    for i, (raw, text) in enumerate(zip(raws, SEGMENTS)):
        seg = OUT / f"seg{i:02d}.wav"
        trim(raw, seg)
        info.append({"text": text, "file": seg.name, "duration": round(duration(seg), 3)})
        print(f"segmento {i}: {info[-1]['duration']} s")
    (OUT / "segments.json").write_text(json.dumps({"engine": engine, "voice": VOICE if engine == "gemini" else "Helia",
                                                   "segments": info}, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
