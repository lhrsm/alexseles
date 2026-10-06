// Fotogramas soltos para rever: node preview.mjs h 1.5 5 9.8 ...
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const require = createRequire(process.env.PLAYWRIGHT_FROM || 'C:/Users/Admin/');
const { chromium } = require('playwright-core');
const here = path.dirname(fileURLToPath(import.meta.url));
const vert = process.argv[2] === 'v';
const [W, H] = vert ? [1080, 1920] : [1920, 1080];
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const p = await (await b.newContext({ viewport: { width: W, height: H } })).newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(pathToFileURL(path.join(here, 'index.html')).href + `?record=1${vert ? '&v=1' : ''}${process.env.DUR ? `&dur=${process.env.DUR}` : ''}`);
await p.evaluate(() => window.ready); await p.waitForTimeout(400);
for (const t of process.argv.slice(3)) {
  await p.evaluate(x => window.render(+x), t);
  await p.screenshot({ path: path.join(here, 'out', `prev-${vert ? 'v' : 'h'}-${t}.png`) });
}
console.log(errs.join('\n') || 'sem erros', await p.evaluate(() => window.DURATION));
await b.close();
