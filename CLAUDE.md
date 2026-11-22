# Phenotech Marketer: handoff for the marketing session

This repo is Phenotech's marketing workspace. A Claude session here plans and drafts all of Phenotech's marketing:
LinkedIn and other channels, launch posts, the content calendar, brand assets, one-pagers and campaign copy. The product
itself lives in `K14-coder/phenotech-v2` (private). **This session reads that repo but never commits to it, pushes it,
deploys it or runs its pipelines.**

## Start here

1. This file.
2. `PLAN.md`: the marketing agenda and its status. Keep it current: it is how the next session knows where things stand.
3. `brand/BRAND.md`: name, colours, mark, voice per audience.
4. The current campaign folder (now `linkedin/`).

## Who decides what

- **The founder approves and publishes everything.** Claude drafts. It never posts, sends messages, connects, follows,
  comments or invites on anyone's behalf, and never creates accounts. The founder's list of decisions only they can make
  (phenotech-v2 `docs/STRATEGY-2026-10-16.md` §7) includes outreach, company formation, pricing and every public
  statement about accuracy.
- Mark every draft `Status: draft` until the founder approves it. Then mark it `approved <date>`, and once it is live
  `posted <date> <url>`.
- If the founder later attaches their computer and asks Claude to post through their browser, confirm each post
  individually before publishing it.

## Product truth: where facts come from

Never write a fact or figure from memory. Take it from phenotech-v2 and note the date and file next to it in the draft.

| Need | Read in phenotech-v2 |
|---|---|
| What Phenotech is, who it serves, the business | `docs/PROJECT-BRIEF.md` (19 Nov 2026) |
| Current figures and status | `README.md` "Status" and "How good is the ranking"; `docs/MODEL_CARD.md` |
| What we may and may not claim | `docs/INTENDED_USE.md`, `docs/REGULATORY.md`, `docs/PRODUCT-2026-10-21.md` §1 and §4 |
| Banned phrases (machine-checked on the site) | `web/scripts/check-copy.mjs` |
| Audiences and their tone | `docs/persona-spec.md`, `docs/ROLES.md` |
| Offers and target customers | `docs/STRATEGY-2026-10-16.md` §5, `docs/outreach/` |

The clone sits next to this one (`../phenotech-v2`). If it is missing, attach it with `add_repo` (read access).

Figures in use (checked 2026-11-22 against `docs/PROJECT-BRIEF.md`; re-check before each post):
- 11,456 rare diseases with a page; 45 curated in depth; 30+ public sources.
- 3,634 existing drugs ranked against 8,723 rare diseases.
- Forward test: rebuilt with data from before 2021, **35.0%** of 983 later uses were already in the drug's top 20
  (from 2023: 37.2% of 561). **Chance: 0.2%.** A "use" is a registered trial at any phase: the test measures where a
  drug gets *tried*, not whether it works.
- October 2026: 39 of 42 declared tests failed their pre-set rule and were published as failures.
- No human expert has reviewed the suggestions yet. Frozen forecasts get scored in April and October 2027. No revenue.

## Claims rules (non-negotiable)

Phenotech stays out of medical-device regulation only while everything it publishes says it is general research
information. Under the EU MDR, **social posts and marketing count as part of the intended purpose**
(`docs/INTENDED_USE.md`, first paragraph). A single post saying "find the right treatment for your child" can change
the product's legal status.

- Drug suggestions are **research leads / hypotheses**, never treatments, cures or recommendations.
- Never: "diagnose", "which drug will work", "the right treatment", "check your risk", "eligible for this trial",
  "clinical decision support", "AI doctor", "cure", "breakthrough", "proven". A benchmark hit is "matched a later
  known use", never "the right drug" or "turned out right".
- Every accuracy figure appears with its test and its baseline (35.0% *vs 0.2% chance*). Never quote the 55.1% nested
  figure without its 39.2% popularity baseline. Never raise or sell on a headline figure alone.
- Do not claim to serve "the most neglected diseases": the engine is weakest there, and we say so.
- Do not claim coverage depth we lack: 11,456 pages, but about a fifth of ranked diseases have no causal gene.
- Patient-facing text: plain, warm, no advice; treatment evidence is "to discuss with your doctor".
- Industry-facing text: no model internals (scores, weights, inputs).
- AI-R is "research and education", never decision support, point of care or "the European OpenEvidence".
- Name the AI: content that AI extracted or drafted is labelled as AI.
- **People:** never put personal contact details of individuals in this repo. phenotech-v2 holds personal data in
  tracked files (its B10 clean-up is pending); never copy from `data/raw/contacts/` or `data/derived/contacts/`.
  Tagging or naming a real person in a post needs the founder's OK.
- Unverified claims stay out until sourced. Example: the Hack-Nation **win** is in the repo docs, but no public page
  confirming it was found on 2026-11-22. Add the organiser's link before any post says "won".

Run `node tools/check-claims.mjs` on every draft before showing it to the founder. It flags banned phrases (errors) and
figures without a baseline nearby (warnings). It does not replace reading the rules above.

## Repo layout

| Path | What |
|---|---|
| `PLAN.md` | Agenda, status and backlog |
| `brand/` | `BRAND.md`; `logo/` (SVG mark, 400 px PNG); `src/` (HTML sources of the rendered images) |
| `linkedin/` | Company page fields, setup checklist, launch posts, `assets/` (logo, cover, screenshots) |
| `tools/check-claims.mjs` | Claims checker for drafts |
| `tools/render.mjs` | Renders `brand/src/*.html` to PNG: `node tools/render.mjs <src.html> <out.png> <w> <h>` |
| `tools/shoot.mjs` | Screenshots a live page at 2x: `node tools/shoot.mjs <url> <out.png> [w] [h]` |

Rendering uses the container's global Playwright and Chromium (no `npm install` needed). Fonts: Inter, the site's font.

## Conventions

- Work on the branch the session names; commit with the `Co-Authored-By` line; push only this repo.
- Live site for links and screenshots: https://phenotech.mehro.ch. Re-shoot screenshots rather than reuse the ones in
  phenotech-v2 `docs/img/`: those are older and show wording the site has since dropped.
- British spelling, as on the site.
