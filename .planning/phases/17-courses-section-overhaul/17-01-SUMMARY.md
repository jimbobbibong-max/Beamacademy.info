---
phase: 17
plan: 01
subsystem: pricing
tags: [pricing-psychology, value-ladder, anchor-pricing, conversion-optimization]

dependency_graph:
  requires: [16-courses-visual-polish]
  provides: [enhanced-pricing-architecture, dollar-savings-display, standardized-badges]
  affects: [17-02, 17-03]

tech_stack:
  added: []
  patterns: [anchor-pricing, goldilocks-effect, value-ladder]

key_files:
  created: []
  modified:
    - C:/Users/bskim/Downloads/beamacademy-index.html

decisions:
  - id: badge-placement
    choice: "Best Value badges on 3 Subject options across all tiers"
    rationale: "Goldilocks effect - 60-70% choose middle option when labeled"
  - id: savings-format
    choice: "Dollar amounts (Save $X/wk) instead of percentages"
    rationale: "Concrete savings more compelling than abstract percentages"
  - id: anchor-enhancement
    choice: "Enhanced All Access banner with glow, prominent pricing boxes"
    rationale: "Anchor pricing psychology - premium option establishes price ceiling"

metrics:
  duration: "~12 minutes"
  completed: "2026-01-24"
---

# Phase 17 Plan 01: Pricing Architecture Value Ladder Summary

**One-liner:** Implemented anchor pricing psychology with enhanced All Access banner, dollar savings display, and standardized "Best Value" badges on 3-subject options.

## What Was Built

### Task 1: Enhanced All Access Anchor Pricing Display

**Changes:**
- Added prominent box-shadow (`0 8px 32px rgba(124, 58, 237, 0.3)`) for visual weight
- Increased padding from `32px 40px` to `36px 44px`
- Enhanced hover state with stronger shadow and lift (`translateY(-3px)`)
- Upgraded badge styling: larger font (0.8rem), bolder weight (700), added shadow
- Added semi-transparent price boxes with borders for price clarity
- Increased price font size to 2.25rem with font-weight 800
- Enhanced CTA button with shadow and larger padding
- Added subtext "Best for students taking 4+ subjects" for context

**Files modified:**
- `C:/Users/bskim/Downloads/beamacademy-index.html` (CSS lines 4777-4928, HTML line 5887)

### Task 2: Dollar Savings Display

**Converted from percentages to actual dollar amounts:**

| Tier | Package | Old | New |
|------|---------|-----|-----|
| Junior | 2 Subjects | 25% off 2nd | Save $20/wk |
| Junior | 3 Subjects | 50% off 3rd | Save $40/wk |
| Intermediate | 2 Subjects | 25% off 2nd | Save $25/wk |
| Intermediate | 3 Subjects | 50% off 3rd | Save $50/wk |
| Intermediate | 4 Subjects | 4th free | 4th FREE! |
| Senior | 2 Subjects | 25% off 2nd | Save $30/wk |
| Senior | 3 Subjects | 50% off 3rd | Save $60/wk |
| Senior | 4 Subjects | 4th free | 4th FREE! |

**Rationale:** Research shows concrete dollar savings are more compelling than abstract percentages. "Save $60/wk" has more psychological impact than "50% off 3rd subject".

### Task 3: Standardized Best Value Badges

**Badge repositioning for Goldilocks effect:**

| Tier | Previous Badge | New Badge |
|------|----------------|-----------|
| Junior | 3 Subjects (Best Value) | 3 Subjects (Best Value) - unchanged |
| Intermediate | 4 Subjects (Popular) | 3 Subjects (Best Value) |
| Senior | All Access (Best Value) | 3 Subjects (Best Value) |

**Rationale:** The Goldilocks principle shows 60-70% of customers choose the labeled middle option. Standardizing "Best Value" on 3-subject options across all tiers guides decisions toward the sweet spot for most families.

## Verification Results

- [x] All Access banner displays prominently with enhanced visual weight
- [x] Prices clearly visible with new box styling and larger fonts
- [x] "Most Popular" badge present and styled
- [x] Subtext "Best for students taking 4+ subjects" added
- [x] All multi-subject packages show dollar savings (Save $X/wk format)
- [x] Math verified correct for each tier
- [x] "4th FREE!" retained for maximum impact
- [x] All Access still shows "Unlimited"
- [x] "Best Value" badges on 3 Subject options across all tiers
- [x] Badge styling consistent
- [x] Visual hierarchy guides to 3 Subjects per tier

## Deviations from Plan

None - plan executed exactly as written.

## Technical Notes

1. **Edit Tool Issues:** The Claude Edit tool had persistent "file unexpectedly modified" errors on the 260KB HTML file. Workaround: Used Python scripts for bulk text replacements.

2. **Line Endings:** File uses CRLF (Windows) line endings. Python scripts needed `newline=''` parameter for correct handling.

3. **Regex for CSS:** Used regex pattern matching to replace the entire CSS block for All Access Hero because exact string matching failed due to trailing whitespace on blank lines.

## Next Phase Readiness

Plan 17-01 complete. Ready for:
- **17-02:** Social proof positioning near pricing decisions
- **17-03:** CTA and checkout flow optimization

## Files Changed

| File | Changes |
|------|---------|
| `C:/Users/bskim/Downloads/beamacademy-index.html` | CSS: Enhanced All Access Hero styling. HTML: Added subtext, converted savings to dollars, repositioned badges. |

---

*Completed: 2026-01-24 | Duration: ~12 minutes*
