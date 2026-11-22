# Phenotech brand

Taken from the live product (phenotech-v2 `web/components/brand/Logo.tsx`, `web/app/layout.tsx`), so marketing matches
the site.

## Name

- **Phenotech** (capital P, the rest lower case). Line under the name: *a rare-disease atlas*.
- Before 2026-10-04 the project was called Tasukeru. Don't use that name in public, except when telling the history.
- Another company called PhenoTech exists (blood-bank reagents, US). Before incorporating or advertising, have the name
  checked for trademark conflicts in the classes you need. That is a founder and lawyer decision.

## Mark

Three linked diseases: two solid links and one dashed. The dashed link is a hypothesis, the way the atlas draws therapy
ideas: dashed lines are never presented as fact.

| File | Use |
|---|---|
| `logo/phenotech-mark.svg` | The mark as vector (20 × 20 viewBox) |
| `logo/phenotech-logo-400.png` | Square logo for profile pictures (LinkedIn, X, Bluesky) |

## Colours

| Token | Hex | Use |
|---|---|---|
| Ink | `#16181d` | Headlines, wordmark |
| Muted | `#5f6672` | Body and secondary text |
| Link grey | `#a3a9b3` | Lines in the mark and in diagrams |
| Blue | `#1f5a96` | Main accent, links, buttons |
| Copper | `#C27C3A` | Mark node; second accent |
| Green | `#5A9873` | Mark node; third accent |
| Paper | `#f7f8fa` | Backgrounds of covers and cards |

## Type

Inter (Google Fonts), the site's font. Headlines in SemiBold with tight letter-spacing; body in Regular.

## Voice

The same facts, told four ways (phenotech-v2 `docs/persona-spec.md`):

| Audience | Tone | Example |
|---|---|---|
| Families | Warm, short sentences, no jargon, no numbers they can't use | "You are not alone. Every page shows where its information comes from." |
| Patient-group leaders | Practical, focused on what to do | "Your disease's page lists the groups, registries and recruiting studies we found. Tell us what's missing." |
| Researchers | Precise, sourced, open about limits | "35.0% of later uses were in the drug's top 20 (chance 0.2%); a use is a registered trial, not efficacy." |
| Industry and foundations | Comparative and concrete, no model internals | "15–25 rare-disease leads for one asset, each with its evidence and its gaps." |

Always:
- Say what is still unproven.
- Give each figure with its baseline.
- Prefer "research leads" to "predictions".
- Use British spelling.

Never use hype words: "revolutionary", "breakthrough", "cure", "game-changer". See the claims rules in `../CLAUDE.md`.
