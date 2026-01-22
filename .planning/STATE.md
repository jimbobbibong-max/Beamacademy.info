# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-22)

**Core value:** Visitors understand BEAM's differentiator (custom materials based on score tracking) within 3 seconds
**Current focus:** v2 Messaging Overhaul — Phase 7 (Proof Section) COMPLETE

## Current Position

Phase: 7 - Proof Section (COMPLETE)
Plan: 01 of 01 complete (Document Grid)
Status: Phase 7 complete - all plans executed and verified
Last activity: 2026-01-23 — Completed 07-01 proof section with document grid

Progress: [####------] 40% (v2: Phase 7 complete, ready for Phase 8)

## v2 Phase Overview

| Phase | Name | Requirements | Status |
|-------|------|--------------|--------|
| 6 | Hero Overhaul | HERO-01 to HERO-05 | COMPLETE |
| 7 | Proof Section | PROOF-01 to PROOF-04 | COMPLETE |
| 8 | Comparison Section | COMP-01 to COMP-02 | Ready |
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
| Portal mockup vs screenshot | HTML mockup loads faster, more responsive than image |
| Realistic score data | 78% overall with mix of strong/weak topics shows tracking is meaningful |
| Progress Report top-left | Most visual impact position in 2x2 grid |
| CSS mockups for documents | Preserves LCP performance (no image loads) |
| Topic gap via Focus Areas | Shows "Calculus - Derivatives" specificity, not just overall scores |

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

Last session: 2026-01-23
Stopped at: Completed 07-01-PLAN.md (Phase 7 complete)
Resume file: None

## Next Up

**Phase 8: Comparison Section** - Ready to plan and execute

**Phase 7 Requirements (ALL VERIFIED):**
- PROOF-01: 4 documents from ONE trial visualized (4 distinct mockups in grid)
- PROOF-02: "Yours to keep" messaging prominently displayed (badge above headline)
- PROOF-03: Documents shown with visual previews (CSS-only mockups)
- PROOF-04: Topic gap insight shown (Focus Areas section + callout)

---

*Last updated: 2026-01-23 — Completed Phase 7 Proof Section*
