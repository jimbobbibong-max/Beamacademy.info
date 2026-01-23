# BEAM Academy Landing Page

## What This Is

A conversion-optimized landing page for BEAM Academy tutoring that instantly communicates the core differentiator — data-driven personalized materials — through visual proof (portal mockups, document previews) and converts Google Ads traffic into free trial bookings.

## Current State

**Version:** v2 (shipped 2026-01-23)
**Status:** Live on beamacademy.info
**Codebase:** 7,921 LOC (HTML/CSS/JS in single index.html)

**Performance:**
- LCP: 0.9s (target <2.5s)
- CLS: 0.014 (target <0.1)
- Lighthouse Performance: 88/100
- Lighthouse SEO: 100/100

## The Jobs It Does

1. **Communicate the differentiator instantly** — Visitors understand within 3 seconds that BEAM provides custom materials based on their child's tracked scores, not generic tutoring.

2. **Show proof of the system** — Display concrete deliverables (4 PDFs from trial, portal dashboard, booklet quality) so parents see what they actually get.

3. **Convert to free trial** — Minimize friction between understanding and action. Sticky CTAs, simplified form, clear path to booking.

## Why This Matters

BEAM's differentiator is data-driven personalization: track scores → identify weak spots → generate custom materials. No other tutoring company does this. The v2 redesign makes this instantly visible through portal mockups and document previews — show, don't tell.

## Requirements

### Validated (v1 + v2)

**v1 Requirements:**
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

**v2 Requirements:**
- HERO-01: Headline communicates category + differentiator — v2
- HERO-02: Portal screenshot visible showing score tracking — v2
- HERO-03: Category label clearly visible without scrolling — v2
- HERO-04: Single primary CTA — v2
- HERO-05: Subheadline explains hook in plain English — v2
- PROOF-01: 4 documents from ONE trial visualized — v2
- PROOF-02: "Yours to keep" messaging prominently displayed — v2
- PROOF-03: Documents shown with visual previews — v2
- PROOF-04: Topic gap insight shown — v2
- COMP-01: Generic vs BEAM side-by-side comparison — v2
- COMP-02: Specific contrasts shown — v2
- TRUST-01: Tutor profiles with real photos — v2
- TRUST-02: Credibility combo (Baulko + HSC + Med) — v2
- TRUST-03: Parent testimonials with specific outcomes — v2
- TRUST-04: Small group size (6-8 max) visible — v2
- TRUST-05: School-specific matching mentioned — v2
- SUPP-01: Discord 24/7 support callout — v2
- SUPP-02: "Stuck at 9pm?" framing — v2
- SUPP-03: Discord screenshot showing real exchange — v2
- CTA-01: Outcome-focused CTA copy — v2
- CTA-02: Form fields remain optimized — v2
- MOB-01: All new sections render on mobile — v2
- MOB-02: Images optimized for mobile loading — v2
- MOB-03: Sticky CTA bar still functional — v2

### Active

(To be defined in next milestone's REQUIREMENTS.md via `/gsd:new-milestone`)

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

## Tech Debt

**v1 accessibility issues (still present):**
- Skip to main content button positioning (cosmetic)
- Form scroll anchor positioning (UX polish)
- Some course-icons have aria-hidden with focusable children
- Some contrast issues (Lighthouse accessibility)
- Links without discernible names (Lighthouse accessibility)

**v2 polish items (minor):**
- Nav doesn't link to v2 sections (design decision - acceptable)
- CTA section copy could be more outcome-focused

## Future Milestones

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
*Last updated: 2026-01-23 after v2 milestone*
