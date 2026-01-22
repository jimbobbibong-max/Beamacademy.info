# BEAM Academy Landing Page

## What This Is

A conversion-optimized landing page for BEAM Academy tutoring that communicates the core differentiator — data-driven personalized materials — and converts Google Ads traffic into free trial bookings.

## Current Milestone: v2.0 Messaging Overhaul

**Goal:** Rewrite the landing page so visitors understand BEAM's differentiator (custom materials based on score tracking) within 3 seconds — without reading every word.

**The hook:** "Custom materials for YOUR kid" (score tracking is the proof)

**What visitors should instantly get:**
- This isn't generic tutoring
- They track scores and create personalized materials
- You get concrete deliverables, not just "tutoring sessions"

**Key content to showcase:**
1. The 4 documents from ONE trial (diagnostic, custom worksheets, personalized paper, solutions)
2. Portal dashboard screenshots (progress tracking, topic breakdown)
3. Comparison table (Generic tutoring vs BEAM)
4. Tutor credentials (BHHS grads, 95+ HSC, med students)
5. Booklet quality (concept boxes, misconception boxes, exam tips)

**Assets available:**
- Portal screenshots (beamportal.netlify.app)
- Booklet/materials photos
- Tutor photos

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

1. **Communicate the differentiator instantly** — Visitors understand within 3 seconds that BEAM provides custom materials based on their child's tracked scores, not generic tutoring.

2. **Show proof of the system** — Display concrete deliverables (4 PDFs from trial, portal dashboard, booklet quality) so parents see what they actually get.

3. **Convert to free trial** — Minimize friction between understanding and action. Sticky CTAs, simplified form, clear path to booking.

## Why This Matters

BEAM's differentiator is data-driven personalization: track scores → identify weak spots → generate custom materials. No other tutoring company does this. But the current site fails to communicate this — visitors can't tell it's even a tutoring company without reading every word. Every trial booking is a potential term-long student ($80-500/week).

## The BEAM Differentiator (Reference)

### What a parent gets from ONE free trial:
1. **Diagnostic Statistics PDF** — Topic-by-topic breakdown identifying specific weak sub-skills
2. **Custom Worksheets PDF** — 15-20 questions targeting identified weak areas
3. **Personalized Practice Paper PDF** — Matched to their school's assessment style
4. **Full Worked Solutions PDF** — Step-by-step solutions for all above

### The Student Portal (beamportal.netlify.app):
- Dashboard with progress trend chart and score breakdown
- Color-coded topic bars (green = strong, red = needs work)
- Priority Focus Areas automatically flagged
- Homework submission and materials download

### Generic Tutoring vs BEAM:
| Generic | BEAM |
|---------|------|
| "Work through some problems together" | Diagnostic first to identify gaps |
| Same worksheets for everyone | Custom worksheets from diagnostic |
| "They're doing well" (vague) | "78% overall, weak on trig word problems" |
| Wait until next lesson for help | Discord support anytime |

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

(To be defined in REQUIREMENTS.md)

### Out of Scope

- Desktop-only redesign — mobile-first, desktop follows
- New pages — optimize landing page first
- Backend changes — Netlify Forms works; frontend is the focus
- Framework migration — keep vanilla HTML/CSS for simplicity

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
| "Custom materials" as hook | Score tracking is the HOW, personalization is the value | — Pending |

## Tech Debt (from v1)

- Skip to main content button positioning (cosmetic)
- Form scroll anchor positioning (UX polish)
- Some course-icons have aria-hidden with focusable children
- Some contrast issues (Lighthouse accessibility)
- Links without discernible names (Lighthouse accessibility)

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
*Last updated: 2026-01-22 — v2 milestone started*
