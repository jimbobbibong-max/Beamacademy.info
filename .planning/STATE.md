# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-23)

**Core value:** Visitors understand BEAM's differentiator (custom materials based on score tracking) within 3 seconds
**Current focus:** v4 Courses Section Redesign — COMPLETE

## Current Position

Milestone: v4 (Courses Section Redesign) — COMPLETE
Phase: 16 — Courses Visual Polish — VERIFIED
Status: Milestone complete, ready for archive
Last activity: 2026-01-24 — Phase 16 verified, v4 milestone complete

Progress: [██████████████████████████████] 100% (all phases complete and verified)

## Milestone History

| Version | Name | Phases | Status | Date |
|---------|------|--------|--------|------|
| v1 | Mobile Conversion | 1-5 | SHIPPED | 2026-01-20 |
| v2 | Messaging Overhaul | 6-11 | SHIPPED | 2026-01-23 |
| v3 | Content Cleanup | 12-13 | SHIPPED | 2026-01-23 |
| v4 | Courses Section Redesign | 14-16 | SHIPPED | 2026-01-24 |

## v4 Summary

**Phase 14 — Courses Section Redesign:** COMPLETE
- 14-01: About section v2 styling
- 14-02: Courses section v2 styling
- 14-03: Pricing tiers centering fix

**Phase 15 — Courses Conversion Optimization:** VERIFIED
- 15-01: Outcome-focused headline + risk reversal
- 15-02: Unified CTAs to "Get Your Free Diagnostic"
- 15-03: Dark theme decision documented

**Phase 16 — Courses Visual Polish:** VERIFIED
- 16-01: Shadow depth for pricing tiers and course cards
- 16-02: Background decoration, icon glow, button consistency

## Decisions Made (v4)

| Decision | Rationale | Phase |
|----------|-----------|-------|
| Purple-tinted shadows (rgba 124,58,237) | Brand consistency on hover states | 16-01 |
| Mobile hover transforms disabled | Touch devices don't have hover, saves rendering | 16-01 |
| 0.25 opacity base shadows | Subtle depth without heaviness | 16-01 |
| Background decoration 0.06 opacity | Subtle ambient lighting, not neon aesthetic | 16-02 |
| Gradient buttons on hover | Match Hero section button quality | 16-02 |

## Performance Baseline

| Metric | Target | Current |
|--------|--------|---------|
| LCP | < 2.5s | 0.9s |
| CLS | < 0.1 | 0.014 |
| Performance | - | 88/100 |
| SEO | - | 100/100 |

## Tech Debt

**Carried forward:**
- Skip button positioning (cosmetic)
- Form scroll anchor positioning (UX)
- Some aria-hidden with focusable children
- Some contrast issues
- Links without discernible names

## Session Continuity

Last session: 2026-01-24
Stopped at: v4 milestone complete
Resume file: None

## Next Up

**Audit milestone** — verify requirements, cross-phase integration, E2E flows

`/gsd:audit-milestone`

---

*Last updated: 2026-01-24 — v4 milestone complete*
