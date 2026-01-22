---
phase: 06-hero-overhaul
plan: 02
subsystem: ui
tags: [html, css, hero, portal-mockup, visual]

# Dependency graph
requires:
  - phase: 05-performance
    provides: performance baseline (LCP 0.9s) to maintain
provides:
  - Hero portal mockup visual demonstrating score tracking and weak topic identification
  - Replaces classroom photograph with functional mockup
affects: [06-01-hero-text, 07-proof-section, phase-6-verification]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hero portal mockup: Dark dashboard-style visual with macOS window chrome"
    - "Score color coding: green (92%+), yellow (70-91%), red (<70%)"
    - "Weak topics section: Red-tinted background with tag-style pills"

key-files:
  created: []
  modified:
    - "index.html"

key-decisions:
  - "Replaced classroom image with portal mockup instead of real screenshot"
  - "Removed floating cards to reduce visual noise"
  - "Used realistic but aspirational scores (78% overall, mix of green/yellow/red)"
  - "Highlighted weak topics with red accent to communicate the differentiator"

patterns-established:
  - "hero-portal-mockup: Dashboard-style visual for hero section"
  - "score-green/yellow/red: Color-coded performance indicators"
  - "weak-tag: Red pill badges for identifying specific weaknesses"

# Metrics
duration: 12min
completed: 2026-01-23
---

# Phase 6 Plan 02: Hero Portal Mockup Summary

**Hero visual replaced with portal mockup showing score tracking (78% overall), topic breakdown (Algebra 92%, Trigonometry 71%, Calculus 64%), and weak topics section highlighting "Calculus - Derivatives" and "Trigonometry - Identities"**

## Performance

- **Duration:** 12 min
- **Started:** 2026-01-22
- **Completed:** 2026-01-23
- **Tasks:** 4 (3 auto + 1 checkpoint)
- **Files modified:** 1

## Accomplishments

- Replaced classroom photograph with styled portal mockup in hero section
- Created "Performance Dashboard" mockup with macOS-style window chrome (red/yellow/green dots)
- Added "Current Score" section showing 78% with "Needs Practice" badge
- Added "Topic Breakdown" with color-coded scores (green 92%, yellow 71%, red 64%)
- Added "Weak Topics" section with red-tinted background and specific weakness tags
- Implemented responsive CSS for desktop and mobile views
- Verified mobile works without horizontal scroll at 320px-428px widths

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace hero image with portal mockup HTML** - `9cb73e3` (feat)
2. **Tasks 2-3: Add CSS for hero portal mockup (desktop + mobile)** - `1890932` (feat)
3. **Task 4: Checkpoint** - User approved visual implementation

## Additional Work

- **Hero headline refinement** - `a546635` (fix) - Updated headline and subheadline copy during phase 6 execution

## Files Created/Modified

- `index.html` - Hero portal mockup HTML (hero-visual section) and CSS styles (both desktop and mobile responsive rules)

## Decisions Made

1. **Mockup vs Screenshot:** Chose to build a styled HTML mockup rather than using an actual screenshot - this allows for faster loading, better responsiveness, and easier maintenance

2. **Floating cards removal:** Removed the existing floating cards (mini testimonial/scores) that hovered over the classroom image - they added visual noise and the mockup itself now demonstrates the value

3. **Score values:** Used realistic but aspirational numbers - 78% overall (room for improvement), Algebra 92% (strong), Trigonometry 71% (needs work), Calculus 64% (weak). This shows the tracking is meaningful

4. **Weak topics specificity:** Included specific weaknesses ("Calculus - Derivatives", "Trigonometry - Identities") to demonstrate the granularity of tracking - not just "you're bad at calculus" but exactly which topics need work

5. **Visual treatment:** Used dark background (gray-900) with light text to create visual contrast and make the mockup stand out from the light hero background

## Deviations from Plan

None - plan executed exactly as written.

## Checkpoint

**Type:** human-verify
**Status:** APPROVED by user
**Verified:**
- Portal mockup visible in hero section
- Shows Current Score, Topic Breakdown, and Weak Topics
- Color coding working (green/yellow/red)
- Mobile responsive (no horizontal scroll)
- Looks professional and communicates differentiator

## Issues Encountered

None - execution was straightforward.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

**Phase 6 Complete:**
- HERO-01: Headline with category + differentiator (06-01)
- HERO-02: Portal screenshot in hero (06-02 - this plan)
- HERO-03: Category label visible (06-01)
- HERO-04: Single primary CTA (06-01)
- HERO-05: Plain English subheadline (06-01)

**Ready for Phase 7: Proof Section**
- Hero overhaul complete with visual and text
- Portal mockup provides visual context for proof section claims

---
*Phase: 06-hero-overhaul*
*Completed: 2026-01-23*
