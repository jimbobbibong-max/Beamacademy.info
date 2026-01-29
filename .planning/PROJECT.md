# BEAM Academy Landing Page

## What This Is

A conversion-optimized landing page for BEAM Academy tutoring that instantly communicates the core differentiator — data-driven personalized materials — through visual proof (portal mockups, document previews) and converts Google Ads traffic into free trial bookings.

## Current State

**Version:** v6 (shipped 2026-01-29)
**Status:** Launch-ready, live on beamacademy.info
**Codebase:** ~7,700 LOC (HTML/CSS/JS in single index.html)

**Performance:**
- LCP: 0.9s (target <2.5s)
- CLS: 0.014 (target <0.1)
- Lighthouse Performance: 88/100
- Lighthouse SEO: 100/100

## The Jobs It Does

1. **Communicate the differentiator instantly** — Visitors understand within 3 seconds that BEAM provides custom materials based on their child's tracked scores, not generic tutoring.

2. **Show proof of the system** — Display concrete deliverables (4 PDFs from trial, portal dashboard, booklet quality) so parents see what they actually get.

3. **Convert to free trial** — Minimize friction between understanding and action. Sticky CTAs, simplified form, clear path to booking.

4. **Help parents choose the right package** — Clear pricing tiers, easy course browsing, obvious path from "interested" to "booking".

## Why This Matters

BEAM's differentiator is data-driven personalization: track scores → identify weak spots → generate custom materials. No other tutoring company does this. The landing page makes this instantly visible through portal mockups and document previews — show, don't tell.

## Requirements

### Validated

**v1 Mobile Conversion (shipped 2026-01-20):**
- ✓ Mobile viewport works (320px-428px) — v1
- ✓ Touch targets ≥44px — v1
- ✓ Hero CTA visible without scroll — v1
- ✓ Sticky CTA bar with click-to-call — v1
- ✓ Form reduced to 4 fields — v1
- ✓ LCP <2.5s (achieved 0.9s) — v1
- ✓ CLS <0.1 (achieved 0.014) — v1

**v2 Messaging Overhaul (shipped 2026-01-23):**
- ✓ Hero shows differentiator in 3 seconds — v2
- ✓ Portal mockup demonstrates score tracking — v2
- ✓ Proof section shows 4 trial deliverables — v2
- ✓ Comparison table: Generic vs BEAM — v2
- ✓ Trust section with tutor credentials — v2
- ✓ Support section with Discord response time proof — v2
- ✓ All CTAs say "Get Your Free Diagnostic" — v2

**v3 Content Cleanup (shipped 2026-01-23):**
- ✓ Removed redundant "Why Us" section — v3
- ✓ Removed redundant "Portal" section — v3
- ✓ Consolidated Team into Trust section — v3
- ✓ All orphaned CSS cleaned — v3

**v4 Courses Section Redesign (shipped 2026-01-24):**
- ✓ Clean CSS architecture — v4
- ✓ Mobile-first responsive design — v4
- ✓ Pricing tier hover effects — v4
- ✓ CTA button hover transforms — v4

**v5 Courses Section Overhaul (shipped 2026-01-24):**
- ✓ Value ladder pricing — v5
- ✓ Social proof at decision points — v5
- ✓ Collapsible course browser — v5
- ✓ Free trial conversion audit passed — v5

**v6 Content Reduction & QA (shipped 2026-01-29):**
- ✓ 5-question test applied to all sections — v6
- ✓ Redundant content removed (85 lines) — v6
- ✓ Dead CSS removed (78 lines) — v6
- ✓ All navigation links verified — v6
- ✓ Form attributes verified — v6
- ✓ Pre-launch QA passed — v6

### Active

(None — ready for v7 milestone definition)

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

## Tech Debt

**Carried forward (minor):**
- Skip button positioning (cosmetic)
- Form scroll anchor positioning (UX)
- Some aria-hidden with focusable children
- Some contrast issues
- Links without discernible names

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
| Remove Final CTA section | Sticky bar provides persistent conversion path | ✓ Good — reduced cognitive load |
| Remove Features strip | Generic claims don't differentiate; document cards do | ✓ Good — cleaner Proof section |

---
*Last updated: 2026-01-29 after v6 milestone complete*
