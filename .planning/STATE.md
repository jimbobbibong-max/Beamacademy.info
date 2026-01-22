# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-22)

**Core value:** Visitors understand BEAM's differentiator (custom materials based on score tracking) within 3 seconds
**Current focus:** v2 Messaging Overhaul — Phase 6 (Hero Overhaul)

## Current Position

Phase: 6 - Hero Overhaul
Plan: 01 of 02 complete (Text Overhaul)
Status: Plan 01 executed, awaiting verification
Last activity: 2026-01-22 — Completed 06-01 hero text overhaul

Progress: [##--------] 17% (v2: 1/6 plans in phase 6)

## v2 Phase Overview

| Phase | Name | Requirements | Status |
|-------|------|--------------|--------|
| 6 | Hero Overhaul | HERO-01 to HERO-05 | 01/02 plans complete |
| 7 | Proof Section | PROOF-01 to PROOF-04 | Blocked by 6 |
| 8 | Comparison Section | COMP-01 to COMP-02 | Blocked by 7 |
| 9 | Trust Section | TRUST-01 to TRUST-05 | Blocked by 8 |
| 10 | Support Section | SUPP-01 to SUPP-03 | Blocked by 9 |
| 11 | CTA & Mobile Polish | CTA-01/02, MOB-01/02/03 | Blocked by 10 |

## Milestone History

| Version | Name | Phases | Status | Date |
|---------|------|--------|--------|------|
| v1 | Mobile Conversion | 1-5 | SHIPPED | 2026-01-20 |
| v2 | Messaging Overhaul | 6-11 | Active | - |

## Performance Baseline (v1)

| Metric | Target | Current |
|--------|--------|---------|
| LCP | < 2.5s | 0.9s |
| CLS | < 0.1 | 0.014 |
| Performance | - | 88/100 |
| SEO | - | 100/100 |

## Accumulated Context

### Key Decisions (v2)

| Decision | Rationale |
|----------|-----------|
| "Custom materials" as hook | Score tracking is HOW, personalization is VALUE |
| Show don't tell | Visual comprehension 60,000x faster than text |
| 4 documents from ONE trial | Concrete proof beats abstract claims |
| Comparison table | Crystallizes difference in single scan |
| Parent-outcome headline | "Where they're struggling" speaks to parent concerns |
| Badge-style category label | Visual prominence for "HSC Tutoring" identification |
| Single CTA in hero | Remove competing buttons for clear conversion path |

### Research Insights

- 85% scroll past hero, 55% reach halfway, 45% reach bottom
- Front-load proof and comparison before 50% mark
- Jargon ("data-driven") fails; plain English ("we track scores") lands
- Every extra form field loses 11% conversions

### Tech Debt (from v1)

- Skip button positioning (cosmetic)
- Form scroll anchor positioning (UX)
- Some aria-hidden with focusable children
- Some contrast issues
- Links without discernible names

## Session Continuity

Last session: 2026-01-22
Stopped at: Completed 06-01-PLAN.md
Resume file: None

## Next Up

**Verification:** Run `/gsd:verify-work 06-01` to confirm hero text changes

**Then Phase 6 Plan 02:** Hero Visual (portal mockup) - already executed (commit 9cb73e3)

**Requirements to verify:**
- HERO-01: Headline with category + differentiator
- HERO-03: Category label visible
- HERO-04: Single primary CTA
- HERO-05: Plain English subheadline
- HERO-02: Portal screenshot in hero (from 06-02)

---

*Last updated: 2026-01-22 — Completed 06-01 hero text overhaul*
