---
phase: 25-google-ads-saas-redesign
plan: 01
subsystem: frontend/utility-bar
tags: [google-ads, call-tracking, click-to-call, utility-bar]

requires:
  - v7-frontend-redesign (typography, colors, design system)
provides:
  - Utility bar component with phone number
  - Google Ads call tracking gtag configuration
  - Click-to-call functionality for mobile
affects:
  - 25-02: Subject pages will need utility bar visible
  - 25-03: Subject pages will need utility bar visible
  - 25-04: Polish phase may refine utility bar styling

tech-stack:
  added: []
  patterns:
    - "Fixed utility bar above navigation"
    - "Google Ads phone call conversion tracking"

key-files:
  created: []
  modified:
    - index.html (utility bar HTML, CSS, gtag config)

decisions:
  - id: utility-bar-position
    choice: "Fixed position above nav (z-index 1001)"
    rationale: "Utility bar must stay visible during scroll for easy phone access"
  - id: phone-alignment
    choice: "Right-aligned desktop, centered mobile"
    rationale: "Follows standard utility bar patterns; centered on mobile for thumb reach"
  - id: conversion-label-placeholder
    choice: "Use CONVERSION_LABEL placeholder with setup instructions"
    rationale: "User must create conversion action in Google Ads to get actual label"

metrics:
  duration: "3 minutes"
  completed: "2026-01-30"
---

# Phase 25 Plan 01: Utility Bar + Call Tracking Summary

**One-liner:** Sticky dark utility bar with click-to-call phone (tel: link) and Google Ads call tracking gtag configuration.

## What Was Built

### Utility Bar Component
- Fixed position dark bar (gray-900) above navigation
- Phone icon (SVG) + formatted phone number (0491 791 447)
- Click-to-call link (`tel:+61491791447`) for mobile users
- 44px minimum tap target for accessibility compliance
- Right-aligned on desktop, centered on mobile

### Navigation Adjustments
- Nav `top` changed from `0` to `44px` to accommodate utility bar
- Mobile nav `top` changed from `72px` to `116px` (72 + 44)
- z-index hierarchy: utility-bar (1001) > nav (1000) > mobile-nav (999)

### Google Ads Call Tracking
- Extended gtag configuration with phone conversion tracking
- Targets `.phone-number` CSS class for number replacement
- Phone number: `0491 791 447`
- Includes setup instructions in code comments
- CONVERSION_LABEL placeholder for user to complete

## Commits

| # | Hash | Description |
|---|------|-------------|
| 1 | 748c9ae | feat(25-01): add utility bar with click-to-call phone number |
| 2 | 7fef74f | feat(25-01): add Google Ads call tracking configuration |

## Verification Results

| Check | Status |
|-------|--------|
| Utility bar visible at top | PASS |
| Phone number clickable (tel: link) | PASS |
| Nav positioned correctly below | PASS |
| Both bars sticky on scroll | PASS |
| Mobile: phone centered, 44px target | PASS |
| Desktop: phone right-aligned | PASS |
| gtag call tracking config present | PASS |

## User Action Required

**Before call tracking will work:**
1. Go to Google Ads > Tools & Settings > Conversions
2. Create new conversion: Phone calls > Calls to phone number on website
3. Enter phone number: `0491 791 447`
4. Set minimum call duration: 60 seconds
5. Copy the Conversion Label from Google Ads
6. Replace `CONVERSION_LABEL` in index.html with actual label

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

- **25-02 (Mathematics + English pages):** Ready to proceed
- **25-03 (Physics + Chemistry pages):** Ready to proceed (can run parallel with 25-02)
- **25-04 (Polish + verification):** Blocked until 25-02 and 25-03 complete

---

*Completed: 2026-01-30*
