// Renders source/cover.html#<name> to covers/<name>.png at 1280x720.
// Usage: node source/render.mjs   (needs Playwright with Chromium installed globally)
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execSync } from 'node:child_process';
const pw = process.env.PLAYWRIGHT ?? path.join(execSync('npm root -g').toString().trim(), 'playwright', 'index.mjs');
const { chromium } = await import(pw);
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, '..', 'covers');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
for (const n of ['netflix', 'prime', 'disney', 'appletv', 'hbomax']) {
  await p.goto('file://' + path.join(here, 'cover.html') + '#' + n); await p.reload(); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(out, n + '.png') });
}
await b.close();
