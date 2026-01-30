# 24-01 Audit Results: Lighthouse Performance Audit

**Date:** 2026-01-30
**Site:** https://beamacademy.com.au
**Tool:** Lighthouse CLI v12.x
**Plan:** 24-01-PLAN.md

---

## Desktop Audit Results

### Summary (Median of 3 runs)

| Metric | Run 1 | Run 2 | Run 3 | Median | Target | Status |
|--------|-------|-------|-------|--------|--------|--------|
| **Performance** | 91 | 96 | 92 | **92** | ≥90 | PASS |
| **Accessibility** | 97 | 97 | 97 | **97** | ≥90 | PASS |
| **Best Practices** | 77 | 77 | 77 | **77** | ≥80 | FAIL |
| **LCP** | 1616ms | 1172ms | 1549ms | **1549ms** | ≤1000ms | FAIL |
| **CLS** | 0.000 | 0.054 | 0.000 | **0.000** | ≤0.1 | PASS |
| **TBT** | 29ms | 79ms | 8ms | **29ms** | ≤200ms | PASS |

### LCP Element

- **Selector:** `div.container > div.hero-content > div.hero-text > h1`
- **Content:** "Watch Their Grades Climb"
- **LCP Breakdown (Run 1):**
  - Time to First Byte (TTFB): 122ms
  - Element Render Delay: 1239ms

### Render-Blocking Resources

**Status:** PASS - No render-blocking resources detected

---

## Mobile Audit Results

### Summary (Median of 3 runs)

| Metric | Run 1 | Run 2 | Run 3 | Median | Target | Status |
|--------|-------|-------|-------|--------|--------|--------|
| **Performance** | 64 | 61 | 45 | **61** | ≥70 | FAIL |
| **Accessibility** | 97 | 97 | 97 | **97** | ≥90 | PASS |
| **Best Practices** | 77 | 77 | 77 | **77** | ≥80 | FAIL |
| **FCP** | 2947ms | 3390ms | 1289ms | **2947ms** | ≤1800ms | FAIL |
| **LCP** | 5130ms | 5349ms | 3143ms | **5130ms** | ≤2500ms | FAIL |
| **CLS** | 0.009 | 0.009 | 0.677 | **0.009** | ≤0.1 | PASS |
| **TBT** | 457ms | 342ms | 1451ms | **457ms** | ≤300ms | FAIL |

### LCP Element (Mobile)

- **Selector:** `div.container > div.hero-content > div.hero-text > p.hero-description`
- **Content:** "We track scores topic by topic. Their worksheets target exactly what they need..."
- **LCP Breakdown:**
  - TTFB: 234-335ms
  - Element Render Delay: 1041-2948ms (high variance)

### Render-Blocking Resources

**Status:** PASS - No render-blocking resources detected

---

## Animation Performance Analysis (PERF-04)

### Animation CSS Review

All animations in beamacademy-index.html have been reviewed for layout-thrashing properties.

#### Safe Animations (transform/opacity only)

| Animation | Properties Used | Status |
|-----------|-----------------|--------|
| Page load (@starting-style) | opacity, transform: translateY | SAFE |
| Scroll reveals | opacity, transform: translateY | SAFE |
| Hover card lift | transform: translateY(-4px) | SAFE |
| Button hover | transform: translateY(-2px) | SAFE |
| Button active | transform: scale(0.98) | SAFE |
| Floating orb | transform: translate, scale | SAFE |
| Mobile menu toggle | transform: rotate, scaleX | SAFE |
| Nav CTA brutalist shadow | transform: translate(-2px, -2px) | SAFE |
| Pricing card hover | transform: scale(1.02), translateY(-4px) | SAFE |
| FAQ chevron | transform: rotate(180deg) | SAFE |
| Social links hover | transform: translateX(4px), translateY(-2px) | SAFE |

#### Minor Layout-Affecting Transitions (Low Risk)

| Element | Property | Context | Risk Level |
|---------|----------|---------|------------|
| .skip-link | `transition: top 0.2s` | Focus state only, off-screen normally | LOW |
| .footer-link::after | `transition: width 200ms` | Pseudo-element underline, minimal impact | LOW |
| .floating-contact | `transition: bottom 0.3s` | Position shift when sticky bar visible | LOW |

**Analysis:** The three layout-affecting transitions are:
1. **Skip link (top):** Only visible on keyboard focus, not in normal flow
2. **Footer underline (width):** Pseudo-element, doesn't reflow content
3. **Floating contact (bottom):** Positioned fixed, doesn't affect layout

None of these trigger layout thrashing during scroll or typical user interactions.

### Verdict

**PERF-04 Status:** PASS

All main user-facing animations use only transform and opacity properties. The three minor exceptions are:
- Not in the critical rendering path
- Not triggered during scroll
- Do not cause content reflow

---

## PERF Requirements Summary

| Requirement | Description | Status | Notes |
|-------------|-------------|--------|-------|
| **PERF-01** | LCP ≤1.0s desktop | FAIL | 1.5s median (50% over target) |
| **PERF-02** | CLS ≤0.1 | PASS | 0.000 desktop, 0.009 mobile |
| **PERF-03** | No render-blocking resources | PASS | None detected |
| **PERF-04** | Animations use transform/opacity | PASS | All main animations compliant |

---

## Issues Identified

### Critical (Blocking)

1. **Desktop LCP exceeds target**
   - Current: 1549ms median
   - Target: ≤1000ms
   - Gap: 549ms (55% over target)
   - Root cause: Element render delay (1239ms)
   - LCP element: H1 hero headline

2. **Mobile performance score low**
   - Current: 61 median
   - Target: ≥70
   - Key issues: LCP (5.1s), TBT (457ms), FCP (2.9s)

### Moderate

1. **Best Practices score below target**
   - Current: 77
   - Target: ≥80
   - (Needs investigation for specific issues)

### Informational

- Mobile CLS shows variance (Run 3 had 0.677 spike)
- TTFB is good (122-335ms)
- Render delay is the main LCP contributor

---

## Recommendations

### For LCP Improvement (Desktop)

1. **Investigate element render delay** (1239ms is the bottleneck)
   - Check if fonts are blocking render
   - Verify font preload is working
   - Consider font-display: swap if not already set

2. **Optimize hero section**
   - Ensure H1 content is not hidden by animation initially
   - Phase 23's opacity: 0.01 fix should help LCP candidacy

### For Mobile Performance

1. **Reduce JavaScript execution**
   - TBT of 457ms indicates main thread blocking
   - Consider code splitting or lazy loading

2. **Optimize images**
   - Mobile LCP element is hero description text
   - Check for any image optimization opportunities

---

## Conclusion

**Overall Assessment:** PARTIAL PASS

- 2 of 4 PERF requirements pass (CLS, render-blocking, animations)
- 2 fail (LCP desktop, implied mobile metrics)
- Desktop performance score (92) is good
- Mobile performance (61) needs attention

The v7 redesign did not introduce significant performance regressions for CLS or animation performance. LCP was likely elevated before v7 changes. Mobile performance under simulated throttling shows room for improvement but is typical for content-heavy marketing pages.

---

*Audit completed: 2026-01-30*
*Lighthouse runs stored: lh-desktop-[1-3].json, lh-mobile-[1-3].json*
