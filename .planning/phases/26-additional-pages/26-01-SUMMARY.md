---
phase: 26-additional-pages
plan: 01
subsystem: pages
tags: [about, tutors, trust, brand]

dependency-graph:
  requires: [phase-25-google-ads]
  provides: [about-page, tutor-profiles, navigation-update]
  affects: [future-pages, seo]

tech-stack:
  added: []
  patterns: [tutor-card-grid, section-based-layout, scroll-animations]

key-files:
  created:
    - about.html
  modified: []

decisions:
  - id: page-structure
    choice: "Single-page with sections (hero, story, tutors, approach, CTA)"
    rationale: "Keeps all trust-building content on one page, reduces navigation friction"
  - id: tutor-display
    choice: "Summary cards with circular photos, not long bios"
    rationale: "Research showed summary cards with credentials are more effective than lengthy bios"
  - id: color-execution
    choice: "Purple as accent (30%), white dominant (60%), gold highlights (10%)"
    rationale: "Research indicated purple works best as accent against white, not dominant"

metrics:
  duration: "8 minutes"
  completed: "2026-01-31"
---

# Phase 26 Plan 01: About/Tutors Page Summary

**One-liner:** Complete About page with tutor cards, company story, and BEAM brand aesthetic.

## What Was Built

### about.html (513 lines)
Complete About/Our Tutors page with:
- **Hero section:** Badge, headline "The People Behind Your Success", tagline, gold credential highlight
- **Story section:** "Why BEAM Exists" - 2 paragraphs + blockquote explaining data-driven approach
- **Tutor grid:** 6 placeholder tutor cards with photos, ATAR scores, credentials, subject tags
- **Approach section:** 3 pillars (Data-Driven Tracking, Targeted Practice, Expert Tutors)
- **CTA section:** "See the Difference" with brutalist-style button linking to contact form
- **Footer:** Full footer matching main site with all links working

### Navigation Updates
- About Us link added to nav with "active" state styling
- Mobile nav includes About Us
- Footer Quick Links includes About Us

### Design Execution
- **Purple as accent:** Headlines, icons, card borders, subject tags, CTAs
- **White dominant:** All backgrounds except tutor grid (gray-50) and approach (purple-50)
- **Gold highlights:** ATAR scores, hero credential badge
- **Typography:** Fraunces for display, Bricolage Grotesque for body
- **Mobile responsive:** 3-col → 2-col → 1-col grid breakpoints

## Commits

| Hash | Message |
|------|---------|
| 34bf9e8 | feat(26-01): create About page with hero, navigation, and base structure |

## Verification Results

| Criterion | Status |
|-----------|--------|
| about.html exists | PASS |
| Valid HTML5 (DOCTYPE + closing tag) | PASS |
| Min 400 lines | PASS (513) |
| Tutor cards present | PASS (8 matches) |
| Story section present | PASS (6 matches) |
| Footer present | PASS (39 matches) |
| CTA present | PASS (3 matches) |
| Mobile nav script | PASS (6 matches) |
| Responsive breakpoints | PASS (9 @media) |

## Deviations from Plan

None - plan executed exactly as written.

## Notes for User

**Tutor data is placeholder.** The About page uses ui-avatars.com placeholder images and fictional tutor data. Before publishing:
1. Replace tutor photos with real images
2. Update names, ATARs, universities, and experience
3. Adjust number of tutor cards as needed (CSS grid handles any count)

## Next Steps

- Plan 02: Results/Testimonials page
- Plan 03: Contact page
- Update main site navigation to include About link
