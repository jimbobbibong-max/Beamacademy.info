# BEAM Academy Landing Page

## What This Is

A conversion-optimized landing page for BEAM Academy tutoring that instantly communicates the core differentiator — data-driven personalized materials — through visual proof (portal mockups, document previews) and converts Google Ads traffic into free trial bookings.

## Current State

**Version:** v3 (shipped 2026-01-23)
**Status:** Live on beamacademy.info
**Codebase:** ~7,500 LOC (HTML/CSS/JS in single index.html)

**Performance:**
- LCP: 0.9s (target <2.5s)
- CLS: 0.014 (target <0.1)
- Lighthouse Performance: 88/100
- Lighthouse SEO: 100/100

## Current Milestone: v4.0 Courses Section Redesign

**Goal:** Complete redesign of the Courses/Pricing section with fresh CSS architecture, research-backed UX patterns, and holistic integration with the rest of the site.

**Why:** Phase 14 (v3) attempted incremental CSS patches which created conflicts. Fresh implementation needed with proper research on pricing page best practices.

**Target:**
- Clean, maintainable CSS (no duplicates, clear structure)
- Research-backed pricing/course browser UX
- Consistent with Hero/Trust/Proof section quality
- Mobile-first, responsive

## The Jobs It Does

1. **Communicate the differentiator instantly** — Visitors understand within 3 seconds that BEAM provides custom materials based on their child's tracked scores, not generic tutoring.

2. **Show proof of the system** — Display concrete deliverables (4 PDFs from trial, portal dashboard, booklet quality) so parents see what they actually get.

3. **Convert to free trial** — Minimize friction between understanding and action. Sticky CTAs, simplified form, clear path to booking.

4. **Help parents choose the right package** — (v4 focus) Clear pricing tiers, easy course browsing, obvious path from "interested" to "booking".

## Why This Matters

BEAM's differentiator is data-driven personalization: track scores → identify weak spots → generate custom materials. No other tutoring company does this. The v2 redesign makes this instantly visible through portal mockups and document previews — show, don't tell.

## Requirements

### Validated (v1 + v2 + v3)

**v1 Requirements:** (18 requirements — mobile conversion)
- VIEW-01 through VIEW-04: Mobile viewport and touch targets
- CTA-01 through CTA-03: Hero and sticky CTAs
- FORM-01 through FORM-04: Optimized contact form
- CONT-01 through CONT-04: Content and trust signals
- PERF-01 through PERF-03: Performance optimization

**v2 Requirements:** (24 requirements — messaging overhaul)
- HERO-01 through HERO-05: Hero section
- PROOF-01 through PROOF-04: Proof section
- COMP-01 through COMP-02: Comparison section
- TRUST-01 through TRUST-05: Trust section
- SUPP-01 through SUPP-03: Support section
- CTA-01 through CTA-02: CTAs
- MOB-01 through MOB-03: Mobile polish

**v3 Requirements:** (14 requirements — content cleanup)
- DEL-01 through DEL-04: Removed redundant sections
- MERGE-01 through MERGE-06: Consolidated content
- QUAL-01 through QUAL-04: Quality after changes

### Active

(To be defined after v4 research — see `.planning/REQUIREMENTS.md`)

### Out of Scope

- Desktop-only redesign — mobile-first, desktop follows
- New pages — optimize landing page first
- Backend changes — Netlify Forms works; frontend is the focus
- Framework migration — keep vanilla HTML/CSS for simplicity
- WWCC badge — basic/expected, not differentiating
- Video testimonials — asset doesn't exist yet
- Live chat widget — complexity vs value
- SMS opt-in — deferred to future milestone

## Context

- **Site:** beamacademy.info (static site on Netlify)
- **Stack:** Single HTML file (index.html) with inline CSS/JS
- **Deployment:** Auto-deploy on push to main branch
- **Ad source:** Google Ads targeting parents searching for tutoring in Epping/Sydney area
- **Conversion goal:** Free trial form submission → thank-you.html
- **Portal:** beamportal.netlify.app (student dashboard for screenshots)

## Constraints

- **Tech stack**: Single HTML file with inline styles — maintain this structure
- **Deployment**: Auto-deploy to main, all changes pushed immediately
- **No frameworks**: Keep vanilla HTML/CSS/JS, no React/Vue/etc
- **Existing branding**: Keep purple color scheme, Outfit font
- **v4 constraint**: Clean CSS architecture — no duplicate rules, clear organization

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Mobile-first approach | 24 ad clicks likely all mobile | ✓ Good — all requirements met |
| Sticky CTA over form move | Less disruptive than restructuring page | ✓ Good — both hero + sticky CTAs work |
| Keep single HTML file | Maintain simplicity, easier deployment | ✓ Good — no build step needed |
| 44px touch targets | Apple HIG recommendation | ✓ Good — passes accessibility |
| IntersectionObserver for sticky | Modern API, performant | ✓ Good — smooth behavior |
| Async fonts via preload+onload | Eliminates render-blocking | ✓ Good — 0 render-blocking resources |
| inert attribute for sticky bar | Better than aria-hidden for focusable children | ✓ Good — no accessibility violations |
| "Custom materials" as hook | Score tracking is the HOW, personalization is the value | ✓ Good — v2 delivered this |
| Show don't tell | Visual comprehension 60,000x faster than text | ✓ Good — portal mockups work |
| CSS mockups for documents | Preserves LCP performance (no image loads) | ✓ Good — 0.9s LCP maintained |
| Pure CSS Discord mockup | Faster loads than screenshot, no privacy concerns | ✓ Good — 33-min proof works |
| Nav CTA shortened | "Free Diagnostic" fits nav; full text on hero/sticky | ✓ Good — no overflow |
| v4: Fresh CSS over patches | Incremental patches caused conflicts in v3 Phase 14 | — Pending |

## Tech Debt

**v1 accessibility issues (still present):**
- Skip to main content button positioning (cosmetic)
- Form scroll anchor positioning (UX polish)
- Some course-icons have aria-hidden with focusable children
- Some contrast issues (Lighthouse accessibility)
- Links without discernible names (Lighthouse accessibility)

**v3 learnings:**
- Courses section CSS is messy/duplicated — v4 will rewrite cleanly

---
*Last updated: 2026-01-23 after starting v4 milestone*
