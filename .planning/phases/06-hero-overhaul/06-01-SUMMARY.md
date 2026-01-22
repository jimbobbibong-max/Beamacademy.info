---
phase: 06-hero-overhaul
plan: 01
subsystem: ui
tags: [html, css, hero, messaging, cta]

# Dependency graph
requires:
  - phase: 05-performance
    provides: performance baseline (LCP 0.9s) to maintain
provides:
  - Hero text content with category label, outcome-focused headline, and single CTA
  - CSS styling for hero-category class
affects: [06-02-hero-visual, 07-proof-section, phase-6-verification]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Category label pattern: uppercase badge above h1 for section identification"

key-files:
  created: []
  modified:
    - "index.html"

key-decisions:
  - "Headline focuses on parent outcome (where they're struggling) rather than features"
  - "Category label uses badge-style treatment (inline-block with background)"
  - "Removed secondary CTA entirely - single 'Book Free Trial' button"

patterns-established:
  - "hero-category: uppercase badge-style label for category identification"

# Metrics
duration: 8min
completed: 2026-01-22
---

# Phase 6 Plan 01: Hero Text Overhaul Summary

**Hero section updated with "HSC Tutoring" category label, outcome-focused headline ("We Show You Exactly Where They're Struggling"), plain-English subheadline about score tracking, and single CTA**

## Performance

- **Duration:** 8 min
- **Started:** 2026-01-22T10:00:00Z
- **Completed:** 2026-01-22T10:08:00Z
- **Tasks:** 3
- **Files modified:** 1

## Accomplishments

- Replaced generic "Epping, Sydney" badge with "HSC Tutoring" category label
- Updated headline from "Expert Tutoring for Years 7-12" to "We Show You Exactly Where They're Struggling"
- Rewrote description to explain score tracking in plain English (no jargon)
- Removed secondary CTA - hero now has single "Book Free Trial" button
- Added CSS for `.hero-category` class with badge-style treatment

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace hero text content** - `313cba2` (feat)
2. **Task 2: Add CSS for category label styling** - `2502fb9` (feat)
3. **Task 3: Clean up and verify mobile** - verification only, no commit needed

## Files Created/Modified

- `index.html` - Hero text content (lines 4629-4642) and hero-category CSS (lines 695-708)

## Decisions Made

1. **Headline wording:** Chose "We Show You Exactly Where They're Struggling" - parent-focused outcome that addresses what parents want to know, with "They're Struggling" in purple accent for emphasis

2. **Category label style:** Used badge treatment (inline-block with purple-100 background, border) rather than plain text - matches existing site pattern and provides visual prominence

3. **Subheadline content:** Focused on the HOW/mechanism - explaining that portal tracks scores topic by topic and generates custom worksheets. Avoided jargon like "data-driven" in favor of plain language ("we know exactly where they need help")

4. **CTA simplification:** Removed secondary "View Courses" button entirely rather than making it a subtle link - single CTA focus per HERO-04 requirement

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - hero section was already prepared with portal mockup (from 06-02 execution), making text replacement straightforward.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Ready for verification:**
- Hero text content satisfies HERO-01, HERO-03, HERO-04, HERO-05
- HERO-02 (portal visual) was already addressed in 06-02

**Success criteria to verify:**
- [ ] "HSC Tutoring" category label visible above headline
- [ ] Headline communicates personalization/custom materials value
- [ ] Subheadline explains score tracking in plain English (no jargon)
- [ ] Only ONE primary CTA button in hero
- [ ] Mobile layout works at 320px-428px widths
- [ ] Existing elements (testimonial, payment link) preserved

**Note:** Plan 06-02 (Hero Visual) was executed before 06-01 (Hero Text). The portal mockup is already in place in the hero-visual section.

---
*Phase: 06-hero-overhaul*
*Completed: 2026-01-22*
