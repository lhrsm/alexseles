// Grava o vídeo do Manifesto fotograma a fotograma (determinístico) e junta com o ffmpeg.
// Uso (na pasta frontend/tools/manifesto-video): node record.mjs h   |   node record.mjs v   (normalmente chamado pelo build.py)
import { createRequire } from 'module';
import { mkdirSync, rmSync, existsSync } from 'fs';
import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const require = createRequire(process.env.PLAYWRIGHT_FROM || 'C:/Users/Admin/');
const { chromium } = require('playwright-core');
const here = path.dirname(fileURLToPath(import.meta.url));
const vert = process.argv[2] === 'v';
const FPS = 30;
const [W, H] = vert ? [1080, 1920] : [1920, 1080];
const frames = path.join(here, 'out', vert ? 'frames-v' : 'frames-h');
if (existsSync(frames)) rmSync(frames, { recursive: true });
mkdirSync(frames, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
// DUR=intro,c1,…,c8,fecho (segundos) acerta as cenas à narração
const url = pathToFileURL(path.join(here, 'index.html')).href + `?record=1${vert ? '&v=1' : ''}${process.env.DUR ? `&dur=${process.env.DUR}` : ''}`;
await page.goto(url);
await page.evaluate(() => window.ready);
await page.waitForTimeout(500);
const duration = await page.evaluate(() => window.DURATION);
const total = Math.round(duration * FPS);
for (let f = 0; f < total; f++) {
  await page.evaluate(t => window.render(t), f / FPS);
  await page.screenshot({ path: path.join(frames, `f${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 95 });
  if (f % 150 === 0) console.log(`${f}/${total}`);
}
await browser.close();
console.log(`fotogramas: ${total} (${duration.toFixed(1)} s)`);
