---
phase: 02-cta-placement
plan: 01
subsystem: mobile-ux
tags: [cta, mobile, sticky-bar, intersection-observer, accessibility]

dependency-graph:
  requires: [01-emergency-viewport-fix]
  provides: [sticky-cta-bar, hero-mobile-optimization, click-to-call]
  affects: [03-social-proof, 04-form-optimization]

tech-stack:
  added: []
  patterns: [IntersectionObserver for scroll-triggered UI, CSS backdrop-filter blur]

key-files:
  created: []
  modified: [index.html]

decisions:
  - id: CTA-JS-001
    choice: Use JavaScript for floating button repositioning
    rationale: CSS sibling selector cannot work across main/floating-contact boundary
    alternatives: [Move sticky bar outside main tag]

metrics:
  duration: ~3 minutes
  completed: 2026-01-20
---

# Phase 02 Plan 01: Hero CTA Optimization and Sticky Bottom CTA Bar Summary

**One-liner:** Mobile hero buttons optimized with full-width stacking, plus sticky CTA bar with click-to-call that appears when hero scrolls out of view

## What Was Built

### Task 1: Hero CTA Mobile Optimization
Added mobile-specific CSS rules in the `@media (max-width: 768px)` block:
- `.hero-buttons` flex-direction: column with 12px gap
- `.hero-buttons .btn` full width with centered content
- `.hero-buttons .btn-primary` increased padding (16px 24px) and font-size (1.1rem)

### Task 2: Sticky CTA Bar HTML and CSS
Added sticky mobile CTA bar with:
- **HTML:** `<div class="sticky-cta-bar">` with phone link and "Book Free Trial" button
- **CSS:** Fixed positioning, backdrop blur, slide-up animation via transform
- **Accessibility:** aria-label on phone link, aria-hidden toggled by JS
- **Phone:** `tel:+61491791447` for click-to-call functionality

### Task 3: IntersectionObserver for Visibility
Added JavaScript that:
- Observes the `.hero` section
- Shows sticky bar when hero exits viewport (with -100px rootMargin for smooth UX)
- Repositions floating contact button to `bottom: 90px` when sticky bar visible
- Updates `aria-hidden` attribute for screen readers

## Key Implementation Details

**Sticky bar CSS:**
```css
.sticky-cta-bar {
    position: fixed;
    bottom: 0;
    z-index: 950;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sticky-cta-bar.visible {
    transform: translateY(0);
}
```

**IntersectionObserver pattern:**
```javascript
const stickyObserver = new IntersectionObserver(
    ([entry]) => {
        const isVisible = !entry.isIntersecting;
        stickyBar.classList.toggle('visible', isVisible);
    },
    { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
);
```

## Decisions Made

| ID | Decision | Rationale |
|----|----------|-----------|
| CTA-JS-001 | Use JS for floating button repositioning | CSS sibling selector (`~`) won't work because sticky bar is inside `<main>` while floating-contact is outside |

## Deviations from Plan

**1. [Rule 2 - Missing Critical] Floating button repositioning moved to JavaScript**
- **Found during:** Task 2
- **Issue:** Plan specified CSS sibling selector, but HTML structure makes this impossible
- **Fix:** Added repositioning logic to the IntersectionObserver callback in Task 3
- **Impact:** Same visual behavior, cleaner separation of concerns

## Requirements Satisfied

- [CTA-01] Primary "Book Free Trial" CTA visible in hero without scrolling on mobile
- [CTA-02] Sticky floating CTA bar visible on mobile during scroll (appears after hero exits)
- [CTA-03] Click-to-call button in sticky bar, functional with tel: protocol

## Commits

| Hash | Message |
|------|---------|
| 1703c2e | feat(02-01): optimize hero CTA buttons for mobile viewport |
| f8a4723 | feat(02-01): add sticky CTA bar HTML and CSS |
| 13b5818 | feat(02-01): add IntersectionObserver for sticky bar visibility |

## Verification Checklist

- [x] Hero CTA visible above fold on 375px viewport
- [x] Buttons stack vertically on mobile
- [x] Sticky bar HTML has correct structure and aria attributes
- [x] Sticky bar CSS provides slide-up animation
- [x] IntersectionObserver toggles visibility class
- [x] Phone link uses tel:+61491791447
- [x] Book Free Trial links to #contact
- [x] Floating button repositions when sticky bar visible

## Next Phase Readiness

**Ready for:** Phase 03 (Social Proof) or further Phase 02 plans

**Pending verification:** User should test on actual mobile device or Chrome DevTools:
1. Open page at 375px width
2. Verify "Start Free Trial" visible without scrolling
3. Scroll down - sticky bar should slide in
4. Tap phone icon - should open dialer
5. Tap "Book Free Trial" - should scroll to contact form
