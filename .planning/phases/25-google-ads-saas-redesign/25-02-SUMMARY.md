---
phase: 25-google-ads-saas-redesign
plan: 02
subsystem: landing-pages
tags: [html, css, landing-page, google-ads, seo]
dependency-graph:
  requires: [25-01]
  provides: [mathematics-landing-page, english-landing-page]
  affects: [25-04]
tech-stack:
  added: []
  patterns: [subject-landing-pages, design-system-consistency]
key-files:
  created:
    - C:/Users/bskim/Downloads/mathematics.html
    - C:/Users/bskim/Downloads/english.html
  modified: []
decisions:
  - id: standalone-pages
    choice: "Standalone HTML files with embedded CSS"
    rationale: "Matches main site approach, no build process needed, consistent with existing deployment"
  - id: form-names
    choice: "Unique form names per subject (maths-trial, english-trial)"
    rationale: "Allows filtering leads by subject in form submissions"
metrics:
  duration: "~15 minutes"
  completed: "2026-01-31"
---

# Phase 25 Plan 02: Mathematics + English Landing Pages Summary

**One-liner:** Subject-specific landing pages for Google Ads with diagnostic-first messaging and full design system.

## What Was Built

### Task 1: Mathematics Landing Page (593 lines)
- **File:** `C:/Users/bskim/Downloads/mathematics.html`
- **Hero:** "Watch Their Maths Grades Climb" with algebra-to-calculus messaging
- **Testimonial:** "His Maths improved from 68% to 89% in just one term."
- **Topics:** Years 7-10 (Numbers, Algebra, Geometry, Stats) + Years 11-12 (Advanced, Ext 1, Ext 2)
- **Approach:** 4-card diagnostic methodology section
- **CTA:** "Get My Free Diagnostic" linking to #contact

### Task 2: English Landing Page (593 lines)
- **File:** `C:/Users/bskim/Downloads/english.html`
- **Hero:** "Unlock Their Voice. Master Their Craft." with essay writing focus
- **Testimonial:** "Her essays went from generic to Band 6 quality in a single term."
- **Topics:** Years 7-10 (Reading, Creative Writing, Essays) + Years 11-12 (HSC Modules, Text Analysis)
- **Approach:** Writing-focused diagnostic methodology
- **CTA:** "Get My Free Diagnostic" linking to #contact

## Design System Consistency

Both pages share the main site's complete design system:
- **Fonts:** Fraunces (display) + Bricolage Grotesque (body)
- **Colors:** Purple brand palette with warm gold accents
- **Components:** Utility bar, nav with scroll effect, brutalist CTA buttons
- **Mobile:** Fully responsive with mobile nav toggle
- **Accessibility:** Skip links, ARIA labels, focus states, 44px touch targets

## Key Features

| Feature | Status |
|---------|--------|
| Utility bar with click-to-call | ✅ |
| Subject-specific hero headlines | ✅ |
| Subject-specific testimonials | ✅ |
| Topics covered section | ✅ |
| Diagnostic approach section | ✅ |
| Contact form with hidden subject field | ✅ |
| Full footer matching main site | ✅ |
| Google Ads gtag configuration | ✅ |
| Mobile responsive (tested to 375px) | ✅ |

## Technical Details

- **Form action:** `/thank-you` (Netlify form handler)
- **Form names:** `maths-trial` and `english-trial` for subject filtering
- **Hidden fields:** `subject` field auto-populated with subject name
- **Phone links:** All use `phone-number` class for Google Ads call tracking
- **Navigation:** Links back to main site (`beamacademy-index.html`)

## Verification Checklist

- [x] Both pages load without JavaScript errors
- [x] Utility bar with phone number visible
- [x] Subject-specific headlines in hero
- [x] Hero CTAs link to #contact
- [x] Form includes hidden subject field
- [x] All navigation links work
- [x] Footer consistent with main site
- [x] Min 200 lines each (actual: 593 lines each)

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

Phase 25-03 (Physics + Chemistry pages) and 25-04 (Polish) can proceed:
- Design system pattern established and tested
- Page structure proven
- Form integration pattern documented
