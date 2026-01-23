# Phase 15 Research: Courses Section Conversion Optimization

**Researched:** 2026-01-23
**Base research:** `.planning/research/FEATURES.md`
**Scope:** Apply conversion research specifically to Courses & Pricing section

---

## Current State Analysis

### Section Structure
- **Location:** `<section class="courses-pricing" id="courses">`
- **Theme:** Dark (gray-900 background, white text)
- **Components:**
  1. Section header (tag, title, description)
  2. All Access Hero Banner (clickable, opens modal)
  3. Pricing Tiers (3 cards: Junior, Intermediate, Senior)
  4. Course Browser (year tabs + course cards)
  5. FAQ accordion

### Issues Identified

#### 1. Headline ("Invest in Your Future")
- **Problem:** Generic, could be any tutoring service
- **FEATURES.md rec:** Outcome-focused headlines that show BEAM's differentiator
- **Better:** "See Exactly Where Your Child Needs Help" or "Know Your Gaps, Close Them Fast"

#### 2. CTA Inconsistency
- **Problem:** Multiple CTA styles in courses section:
  - Pricing tiers: "Start Free"
  - Course cards: "Try Free"
  - Rest of site: "Get Your Free Diagnostic"
- **FEATURES.md rec:** Consistent "Get Your Free Diagnostic" throughout
- **Impact:** Dilutes the value-focused messaging established in hero

#### 3. Weak Risk Reversal
- **Current:** "Your first lesson is always free"
- **Problem:** Doesn't explicitly address parent concerns about commitment
- **FEATURES.md rec:** "No payment required. No obligation." explicitly stated
- **Location:** Should appear near CTAs and in section description

#### 4. Theme Consistency Question
- **Current:** Dark section (gray-900) on otherwise light site
- **Consideration:** Is this intentional visual hierarchy or jarring?
- **Decision needed:** Keep dark (creates visual break) vs. make light (flow consistency)
- **Recommendation:** Keep dark - creates natural visual separation for "decision" section

---

## Recommendations for Phase 15

### Task 1: Update Section Headline
**From:** "Invest in Your Future"
**To:** "See Exactly Where Your Child Needs Help" (ties to diagnostic value prop)

**Also update section description to include risk reversal:**
```html
<p class="section-description">
    Transparent pricing with multi-subject discounts. Maximum 8 students per class.
    <strong>No payment required. No obligation.</strong> Your free diagnostic is yours to keep.
</p>
```

### Task 2: CTA Consistency
Replace all CTAs in courses section:
- Pricing tier CTAs: "Start Free" → "Get Your Free Diagnostic"
- Course card CTAs: "Try Free" → "Get Your Free Diagnostic"

This unifies messaging across the entire page.

### Task 3: Add Risk Reversal Near CTAs
Add explicit reassurance near the pricing tiers:
```html
<p class="pricing-reassurance">
    No credit card. No obligation. Cancel anytime.
</p>
```

### Task 4: Keep Dark Theme (Decision)
Rationale:
- Creates natural visual break before "decision" section
- Dark backgrounds work well for pricing sections (premium feel)
- The contrast helps the purple CTAs pop
- Already implemented and styled

**Action:** Document decision, no code changes needed.

---

## Files to Modify

1. `C:/Users/bskim/Downloads/beamacademy-index.html`
   - Section header text (lines ~5780-5784)
   - Pricing tier CTAs (lines ~5833, 5853, 5873)
   - Course card CTAs (all "Try Free" buttons)
   - Add risk reversal element

---

## Verification Criteria

1. **Headline changed:** Section title is outcome-focused, not generic
2. **CTAs unified:** All buttons in courses section say "Get Your Free Diagnostic"
3. **Risk reversal visible:** "No payment required. No obligation." appears prominently
4. **Visual coherence:** Changes don't break existing dark theme styling
5. **Mobile check:** Changes render correctly on mobile widths

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| CTA text length breaks layout | Low | Test on all breakpoints |
| Tone mismatch with other sections | Low | Using same phrasing as hero |
| User confusion about what changed | Low | Changes are copy only, not structural |
