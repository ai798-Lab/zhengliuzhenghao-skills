/**
 * 把 universe/*.html 渲染成 PNG 截图（完整长图）
 *
 * 用法: node render_universe.js [filename]
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PROJECT = path.resolve(__dirname, '..');
const UNIVERSE_DIR = path.join(PROJECT, 'universe');

(async () => {
  const target = process.argv[2];
  const files = target
    ? [target]
    : fs.readdirSync(UNIVERSE_DIR).filter(f => f.endsWith('.html'));

  if (files.length === 0) {
    console.error('❌ No HTML files found in universe/');
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const file of files) {
    const htmlPath = path.join(UNIVERSE_DIR, file);
    const pngPath = htmlPath.replace(/\.html$/, '.png');

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: pngPath, fullPage: true });
    console.log(`✅ ${pngPath}`);
    await page.close();
  }

  await browser.close();
})();
