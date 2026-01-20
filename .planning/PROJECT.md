# BEAM Academy Mobile Conversion Redesign

## What I'm Building

A full mobile redesign of the BEAM Academy tutoring website to convert Google Ads traffic into free trial bookings. Currently getting 24 clicks with 0 conversions due to mobile viewport/scaling issues and excessive scroll distance to the booking form.

## The Jobs It Does

1. **Capture ad traffic** — Mobile users from Google Ads land on the site and immediately understand the value proposition (tutoring for Years 7-12 by BHHS graduates)

2. **Display content properly** — All content renders correctly on mobile without zooming, panning, or horizontal scroll. Text is readable, buttons are tappable, forms are usable.

3. **Convert to free trial** — Minimize friction between landing and form submission. Sticky CTAs, simplified mobile form, clear path to booking.

## Why This Matters

24 clicks with 0 conversions means ad spend is wasted. Fixing mobile conversion directly improves ROI. Every trial booking is a potential term-long student ($80-500/week).

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Fix mobile viewport issues — no zooming/panning required to view content
- [ ] Hero section readable and compelling on mobile
- [ ] Sticky/floating "Book Free Trial" CTA always visible on mobile
- [ ] Simplified mobile form — reduce fields or break into steps
- [ ] Pricing section displays cleanly on mobile (no horizontal scroll)
- [ ] Navigation works smoothly on mobile
- [ ] Form is easy to complete on mobile (proper input sizing, keyboard handling)
- [ ] Fast page load on mobile (optimize images, reduce blocking resources)

### Out of Scope

- Desktop redesign — focus is mobile only, desktop remains as-is
- New features (chat, scheduling widget) — fix existing flow first
- Content changes — keep same copy, just improve mobile presentation
- Backend changes — Netlify Forms works, just improve frontend

## Context

- **Site:** beamacademy.info (static site on Netlify)
- **Stack:** Single HTML file (index.html) with inline CSS/JS
- **Deployment:** Auto-deploy on push to main branch
- **Current state:** 226KB index.html, responsive breakpoints exist but mobile experience is broken
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
| Mobile-first approach | 24 ad clicks likely all mobile | — Pending |
| Sticky CTA over form move | Less disruptive than restructuring page | — Pending |
| Keep single HTML file | Maintain simplicity, easier deployment | — Pending |

---
*Last updated: 2026-01-20 after initialization*
