// Claims check for marketing drafts. Phenotech's public statements are part of its intended purpose under the EU MDR
// (phenotech-v2 docs/INTENDED_USE.md), so drafts must not use wording that moves it towards a medical device or
// overclaims accuracy. The ERROR patterns mirror phenotech-v2 web/scripts/check-copy.mjs plus marketing hype words;
// keep them in step when that file changes.
//   node tools/check-claims.mjs [files or folders...]   (default: linkedin/ and any posts/ folder; exit 1 on an error)
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const ERROR = [
  [/right treatment|the right (drug|medicine)/i, "promises a treatment choice"],
  [/which (drug|medicine|treatment) will work/i, "predicts treatment success"],
  [/personali[sz]ed treatment/i, "personalised treatment advice"],
  [/find out if you have\b|check your risk|interpret your genetic test|what does this variant mean/i, "diagnosis or test interpretation"],
  [/\b(we|this tool|the atlas|phenotech|it) (can |will )?(diagnoses?|detects?)\b/i, "diagnosis"],
  [/\byou are eligible\b|\beligible for (this|the|a) (trial|study)\b/i, "eligibility claim"],
  [/turned out right|were right in (our )?tests|right drug among|predicted correctly/i, "accuracy phrased as correctness (say: matched a later known use)"],
  [/could a drug help|could help (your|a) (child|patient)/i, "efficacy framing"],
  [/clinical decision support|point[- ]of[- ]care|\bAI doctor\b|treatment recommendations?\b|European OpenEvidence/i, "clinical purpose"],
  [/\bcures?\b|\bcured\b|breakthrough|revolutionar|game[- ]chang|miracle/i, "hype or cure claim"],
  [/\bproven\b|guarantee/i, "overclaim (nothing is proven yet: no expert review, forecasts unscored until 2027)"],
  [/most neglected diseases/i, "the engine is weakest there (PRODUCT-2026-10-21 §1)"],
  [/\bwon\b|\bwinner\b|\bwinning\b/i, "Hack-Nation win: needs a public source link before use (CLAUDE.md)"],
];
// warnings: worth a human look, not always wrong
const WARN = [
  [/\bdiagnos/i, "mentions diagnosis: fine only as a disclaimer (\"not for diagnosing\")"],
  [/\btreatments? for\b/i, "check this does not promise treatments (say: research leads)"],
  [/\bpredict/i, "prefer \"research leads\"; a prediction must carry its test and baseline"],
  [/\bevery rare disease\b|\ball rare diseases\b/i, "coverage claim: 11,456 pages, but about a fifth have no causal gene"],
];
const BASELINE = /chance|baseline|random|popularity|of \d[\d,]* /i;

const args = process.argv.slice(2);
const roots = args.length ? args : ["linkedin", "posts"].filter((d) => existsSync(d));
const files = [];
const walk = (p) => {
  if (statSync(p).isDirectory()) for (const f of readdirSync(p)) walk(path.join(p, f));
  else if (/\.(md|txt)$/.test(p)) files.push(p);
};
roots.forEach(walk);

let errors = 0, warnings = 0;
for (const f of files) {
  const text = readFileSync(f, "utf8");
  // only check what would be published: fenced blocks when the file has them, otherwise everything
  const blocks = [...text.matchAll(/```[^\n]*\n([\s\S]*?)```/g)];
  const parts = blocks.length ? blocks.map((m) => ({ body: m[1], start: text.slice(0, m.index).split("\n").length + 1 })) : [{ body: text, start: 1 }];
  for (const { body, start } of parts) {
    const lines = body.split("\n");
    lines.forEach((line, i) => {
      const at = `${f}:${start + i}`;
      for (const [re, why] of ERROR) if (re.test(line)) { errors++; console.log(`ERROR ${at}: ${why}: ${line.trim().slice(0, 120)}`); }
      for (const [re, why] of WARN) if (re.test(line)) { warnings++; console.log(`warn  ${at}: ${why}: ${line.trim().slice(0, 120)}`); }
      // an accuracy percentage needs its baseline in the same or neighbouring lines
      if (/\d+(\.\d+)?\s?%/.test(line) && !/95% of rare diseases/i.test(line)) {
        const near = lines.slice(Math.max(0, i - 1), i + 2).join(" ");
        if (!BASELINE.test(near)) { warnings++; console.log(`warn  ${at}: a percentage without its baseline nearby: ${line.trim().slice(0, 120)}`); }
      }
    });
  }
}
console.log(`${files.length} files, ${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
