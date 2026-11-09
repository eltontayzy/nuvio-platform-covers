// Renders source/cover.html#<name> to covers/<name>.png at 1280x720.
// Usage: node source/render.mjs   (needs Playwright with Chromium installed globally)
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
const pw = process.env.PLAYWRIGHT ?? path.join(execSync('npm root -g').toString().trim(), 'playwright', 'index.mjs');
const { chromium } = await import(pw);
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, '..', 'covers');
// Draw at 2x, then scale down with a box filter (ImageMagick) so every edge is supersampled.
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
for (const n of ['netflix', 'prime', 'disney', 'appletv', 'hbomax']) {
  await p.goto('file://' + path.join(here, 'cover.html') + '#' + n); await p.reload(); await p.waitForTimeout(300);
  const big = path.join(out, n + '@2x.png'), dst = path.join(out, n + '.png');
  await p.screenshot({ path: big });
  execSync(`magick "${big}" -colorspace RGB -filter Box -resize 1280x720 -colorspace sRGB "${dst}"`); fs.rmSync(big);
}
await b.close();
