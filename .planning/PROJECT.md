# BEAM Academy Mobile Conversion Redesign

## What This Is

A mobile-optimized landing page for BEAM Academy tutoring that converts Google Ads traffic into free trial bookings. Features viewport-friendly layout, always-visible CTAs, simplified 4-field form, and fast loading (0.9s LCP).

## Current State

**Version:** v1 (shipped 2026-01-20)
**Status:** Live on beamacademy.info
**Codebase:** 6,835 LOC (HTML/CSS/JS in single index.html)

**Performance:**
- LCP: 0.9s (target <2.5s)
- CLS: 0.014 (target <0.1)
- Lighthouse Performance: 88/100
- Lighthouse SEO: 100/100

## The Jobs It Does

1. **Capture ad traffic** — Mobile users from Google Ads land on the site and immediately understand the value proposition (tutoring for Years 7-12 by BHHS graduates)

2. **Display content properly** — All content renders correctly on mobile without zooming, panning, or horizontal scroll. Text is readable, buttons are tappable, forms are usable.

3. **Convert to free trial** — Minimize friction between landing and form submission. Sticky CTAs, simplified mobile form, clear path to booking.

## Why This Matters

24 clicks with 0 conversions meant ad spend was wasted. v1 fixed mobile conversion to directly improve ROI. Every trial booking is a potential term-long student ($80-500/week).

## Requirements

### Validated (v1)

- VIEW-01: Page renders correctly on mobile without zoom/pan — v1
- VIEW-02: Form inputs have 16px minimum font-size (iOS zoom prevention) — v1
- VIEW-03: No horizontal scroll on 320px-428px screens — v1
- VIEW-04: 44x44px minimum touch targets — v1
- CTA-01: Primary CTA visible in hero without scrolling — v1
- CTA-02: Sticky floating CTA bar visible during scroll — v1
- CTA-03: Click-to-call button functional — v1
- FORM-01: Contact form reduced to 3-4 essential fields — v1
- FORM-02: Form inputs use correct types for mobile keyboards — v1
- FORM-03: Form submit button has large tap target and clear CTA — v1
- FORM-04: Form reachable without excessive scrolling — v1
- CONT-01: Hero communicates value proposition clearly — v1
- CONT-02: Pricing displays cleanly on mobile — v1
- CONT-03: Trust signals visible near form — v1
- CONT-04: Mobile hamburger menu works smoothly — v1
- PERF-01: Images optimized for mobile — v1
- PERF-02: LCP under 2.5 seconds (achieved 0.9s) — v1
- PERF-03: No render-blocking resources — v1

### Active

(None — run `/gsd:new-milestone` to define v2 requirements)

### Out of Scope

- Desktop redesign — focus was mobile conversion; desktop works acceptably
- New pages — optimize existing landing page first
- Backend changes — Netlify Forms works; frontend was the blocker
- Framework migration — keep vanilla HTML/CSS for simplicity
- Content rewrite — same copy, better mobile presentation

## Context

- **Site:** beamacademy.info (static site on Netlify)
- **Stack:** Single HTML file (index.html) with inline CSS/JS
- **Deployment:** Auto-deploy on push to main branch
- **Ad source:** Google Ads targeting parents searching for tutoring in Epping/Sydney area
- **Conversion goal:** Free trial form submission → thank-you.html

## Constraints

- **Tech stack**: Single HTML file with inline styles — maintain this structure
- **Deployment**: Auto-deploy to main, all changes pushed immediately
- **No frameworks**: Keep vanilla HTML/CSS/JS, no React/Vue/etc
- **Existing branding**: Keep purple color scheme, Outfit font, current imagery

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

## Tech Debt (from v1)

- Skip to main content button positioning (cosmetic)
- Form scroll anchor positioning (UX polish)
- Some course-icons have aria-hidden with focusable children
- Some contrast issues (Lighthouse accessibility)
- Links without discernible names (Lighthouse accessibility)

## Future Milestones

### v2: Design Polish
Remove generic AI feel while keeping current purple brand colors.
- Use skillhub frontend design skill (high-starred) for visual improvements
- More distinctive, less template-looking
- Can start before conversion data comes in

### v3: SEO + Content Revamp
Deep research on education/tutoring website SEO, then full content revamp.

Research areas:
- Tutoring industry SEO best practices
- Local SEO for Sydney/Epping area
- Parent search behavior and intent
- Competitor content analysis
- Keywords that convert vs just rank

Needs conversion data + research before starting.

### Feature Ideas (bundle into milestones as needed)
- Multi-step form wizard
- Personalized CTAs based on ad source
- A/B testing framework
- Exit-intent popup
- Google Reviews widget
- Video testimonial
- Live chat widget
- SMS opt-in

---
*Last updated: 2026-01-22 — v1 milestone archived*
