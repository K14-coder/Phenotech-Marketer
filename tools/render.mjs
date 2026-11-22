// Renders brand/src/*.html to PNG at the size the page declares (html,body width/height).
//   node tools/render.mjs brand/src/logo.html brand/logo/phenotech-logo-400.png 400 400
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright"); // the container's global Playwright
import path from "node:path";
const [src, out, w, h, scale = "1"] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +scale });
await page.goto("file://" + path.resolve(src));
await page.waitForTimeout(300);
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: +w, height: +h } });
await browser.close();
console.log("wrote", out);
