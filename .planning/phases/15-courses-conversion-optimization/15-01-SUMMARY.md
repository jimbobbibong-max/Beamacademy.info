---
phase: 15-courses-conversion-optimization
plan: 01
subsystem: landing-page
tags: [conversion, copywriting, courses-section]

dependency-graph:
  requires:
    - 14-all-access-polish (established styling foundation)
  provides:
    - Outcome-focused section headline
    - Explicit risk reversal messaging
  affects:
    - 15-02 (CTA consistency work)

tech-stack:
  patterns:
    - Value-focused copywriting
    - Risk reversal positioning

key-files:
  modified:
    - C:/Users/bskim/Downloads/beamacademy-index.html

decisions:
  - id: headline-focus
    choice: Outcome-focused headline tied to diagnostic value prop
    rationale: "See Exactly Where Your Child Needs Help" connects directly to BEAM's diagnostic differentiator vs generic "Invest in Your Future"
  - id: risk-reversal-placement
    choice: Bold risk reversal text in section description
    rationale: Immediate visibility reduces friction before user sees pricing

metrics:
  duration: ~5 minutes
  completed: 2026-01-23
---

# Phase 15 Plan 01: Courses Section Header Copy Summary

**One-liner:** Replaced generic headline with outcome-focused "See Exactly Where Your Child Needs Help" and added bold risk reversal messaging.

---

## What Was Done

### Task 1: Update Section Headline and Description

**Changes made:**
1. **Headline update:**
   - OLD: "Invest in Your Future"
   - NEW: "See Exactly Where Your Child Needs Help"

2. **Description update:**
   - OLD: "Transparent pricing with multi-subject discounts. Maximum 8 students per class. Your first lesson is always free."
   - NEW: "Transparent pricing with multi-subject discounts. Maximum 8 students per class.<br><strong>No payment required. No obligation.</strong> Your free diagnostic is yours to keep."

**Files modified:**
- `C:/Users/bskim/Downloads/beamacademy-index.html` (lines 5793-5797)

**Commit:** `41bd773` - feat(15-01): update courses section header with outcome-focused copy

---

## Verification Results

| Criterion | Status |
|-----------|--------|
| Headline changed to outcome-focused | PASSED |
| Risk reversal in bold | PASSED |
| Section renders correctly | PASSED |
| No visual regressions | PASSED |

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Technical Notes

- Used `<br>` tag to separate the risk reversal line visually
- Used `<strong>` tags for bold emphasis on "No payment required. No obligation."
- No CSS changes required - existing `.section-description` styles apply correctly

---

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Headline wording | "See Exactly Where Your Child Needs Help" | Ties directly to diagnostic value proposition established in hero section |
| Risk reversal placement | In section description, bolded | Maximum visibility before user reaches pricing information |

---

## Next Phase Readiness

**Ready for 15-02:** CTA Consistency
- Section header now has proper messaging foundation
- Next plan should update CTA buttons throughout courses section for consistency

**Blockers:** None
