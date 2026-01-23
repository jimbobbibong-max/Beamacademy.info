# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-01-23)

**Core value:** Visitors understand BEAM's differentiator (custom materials based on score tracking) within 3 seconds
**Current focus:** v4 Courses Section Redesign — Starting fresh

## Current Position

Milestone: v4 (Courses Section Redesign)
Phase: Not started
Status: Ready for /gsd:new-milestone
Last activity: 2026-01-23 — v3 shipped, v4 initialized

Progress: [----------] 0% (v4 starting)

## Milestone History

| Version | Name | Phases | Status | Date |
|---------|------|--------|--------|------|
| v1 | Mobile Conversion | 1-5 | SHIPPED | 2026-01-20 |
| v2 | Messaging Overhaul | 6-11 | SHIPPED | 2026-01-23 |
| v3 | Content Cleanup | 12-13 | SHIPPED | 2026-01-23 |
| v4 | Courses Section Redesign | TBD | Active | - |

## v3 Summary (Just Shipped)

**Phase 12 — Content Consolidation:**
- Merged Taehoon Kim as 4th tutor in Trust section
- Added 3 testimonials (1 parent + 2 students) to Trust
- Deleted Why Us, Portal, Team, Testimonials sections
- Removed 381 lines orphaned CSS

**Phase 13 — About Section Modernization:**
- Added "ABOUT US" section-tag
- v2 typography and pill-style badge

**Phase 14 — Moved to v4:**
- Incremental CSS patches caused conflicts
- Fresh implementation with research needed

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

**New from v3 learnings:**
- Courses section CSS is messy/duplicated — needs clean rewrite (v4 scope)

## Next Up

**Start v4 milestone** — Research-backed Courses section redesign

`/gsd:new-milestone`

---

*Last updated: 2026-01-23 — v3 shipped, v4 initialized*
