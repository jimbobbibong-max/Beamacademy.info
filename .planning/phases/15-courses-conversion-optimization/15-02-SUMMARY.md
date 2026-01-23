---
phase: 15-courses-conversion-optimization
plan: 02
subsystem: landing-page
tags: [conversion, CTA, consistency, courses-section]

dependency-graph:
  requires:
    - 15-01 (established header messaging foundation)
  provides:
    - Unified CTA messaging across courses section
    - Mobile-responsive button styling
  affects:
    - User conversion path (consistent CTA language)

tech-stack:
  patterns:
    - Consistent value proposition messaging
    - Mobile-first responsive adjustments

key-files:
  modified:
    - C:/Users/bskim/Downloads/beamacademy-index.html

decisions:
  - id: cta-text-choice
    choice: "Get Your Free Diagnostic" for all CTAs
    rationale: Matches hero section CTA, reinforces diagnostic value proposition consistently
  - id: mobile-layout-adjustment
    choice: Stack course card footer vertically on mobile
    rationale: Longer CTA text (25 chars vs 10 chars) needs more space; vertical layout prevents cramping

metrics:
  duration: ~10 minutes
  completed: 2026-01-23
---

# Phase 15 Plan 02: CTA Consistency Summary

**One-liner:** Unified all 25 Courses section CTAs to "Get Your Free Diagnostic" with mobile-responsive styling adjustments.

---

## What Was Done

### Task 1: Update Pricing Tier CTAs

**Changes made:**
- Replaced all 3 pricing tier CTA buttons
- OLD: `<a href="#contact" class="tier-cta">Start Free</a>`
- NEW: `<a href="#contact" class="tier-cta">Get Your Free Diagnostic</a>`

**Affected tiers:**
- Junior (line 5833)
- Intermediate (line 5853)
- Senior (line 5873)

**Commit:** `5847362` - feat(15-02): update pricing tier CTAs to Get Your Free Diagnostic

---

### Task 2: Update Course Card CTAs

**Changes made:**
- Replaced all 22 course card CTA buttons
- OLD: `<a href="#contact" class="course-btn">Try Free</a>`
- NEW: `<a href="#contact" class="course-btn">Get Your Free Diagnostic</a>`

**Affected courses:**
- All Years 7-8, 9-10, and 11-12 course cards across Mathematics, English, Physics, and Chemistry

**Commit:** `1db93f3` - feat(15-02): update course card CTAs to Get Your Free Diagnostic

---

### Task 3: Mobile Responsive CSS Adjustment

**Changes made:**
- Added mobile CSS (768px breakpoint) for `.course-card-footer`:
  - `flex-direction: column` - stacks price and CTA vertically
  - `gap: 12px` - spacing between elements
  - `align-items: stretch` - full-width button

- Adjusted `.course-btn` for mobile:
  - `text-align: center` - center button text
  - `padding: 12px 16px` - comfortable tap target
  - `font-size: 0.8rem` - slightly reduced for longer text

**Rationale:** The new CTA text (25 characters) is 2.5x longer than the original (10 characters). On narrow screens, the horizontal layout would cramp the price and button together.

**CSS added at line 3785:**
```css
/* Course card footer mobile - stack price and CTA vertically */
.course-card-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
}
.course-btn {
    text-align: center;
    padding: 12px 16px;
    font-size: 0.8rem;
}
```

---

## Verification Results

| Criterion | Status |
|-----------|--------|
| grep "Start Free" returns 0 results | PASSED |
| grep "Try Free" returns 0 results | PASSED |
| All 3 pricing tier CTAs show "Get Your Free Diagnostic" | PASSED |
| All 22 course card CTAs show "Get Your Free Diagnostic" | PASSED |
| Mobile-responsive CSS added | PASSED |

---

## Deviations from Plan

### Auto-added CSS Adjustment (Rule 2 - Missing Critical)

**Found during:** Task 3 planning
**Issue:** The 2.5x longer CTA text could cause layout issues on mobile screens
**Fix:** Added responsive CSS to stack footer elements vertically on mobile
**Files modified:** beamacademy-index.html (CSS section)

---

## Technical Notes

- Total CTAs updated: 25 (3 tier + 22 course)
- Other instances of "Get Your Free Diagnostic" exist in hero section (6 additional occurrences)
- The consistent messaging creates a unified value proposition pathway: Hero CTA -> Pricing CTAs -> Course CTAs

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| CTA text | "Get Your Free Diagnostic" | Matches hero section, reinforces diagnostic-first value proposition |
| Mobile layout | Vertical stacking at 768px | Prevents cramped layout with longer button text |
| Button font-size on mobile | 0.8rem | Balances readability with space constraints |

---

## Next Phase Readiness

**Courses section conversion optimization complete:**
- 15-01: Header copy updated (outcome-focused headline, risk reversal)
- 15-02: CTA consistency established (all buttons unified)

**Phase 15 remaining plans:**
- Check if additional plans exist or phase is complete

**Blockers:** None
