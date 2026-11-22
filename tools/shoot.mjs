// Screenshot a live page for a post: node tools/shoot.mjs <url> <out.png> [width] [height]
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [url, out, w = "1440", h = "900"] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1500);
await p.screenshot({ path: out });
await b.close();
console.log("wrote", out);
