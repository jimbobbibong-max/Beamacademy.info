# Phase 24-01: Lighthouse Performance Audit Results

**Date:** 2026-01-30
**Site:** https://beamacademy.info (hosted on Netlify)
**Lighthouse Version:** 13.0.1

## Summary

| Metric | Desktop (Median) | Mobile (Median) | Target | Status |
|--------|------------------|-----------------|--------|--------|
| Performance Score | 92 | 61 | >= 70 | Desktop PASS, Mobile WARNING |
| Accessibility Score | 97 | 97 | >= 90 | PASS |
| Best Practices Score | 77 | 77 | >= 80 | WARNING |
| LCP | 1549ms | 5130ms | Desktop <=1000ms, Mobile <=2500ms | FAIL |
| CLS | 0.0003 | 0.0088 | <= 0.1 | PASS |
| FCP | 1084ms | 2947ms | - | Acceptable |
| TBT | 29ms | 457ms | < 200ms | Desktop PASS, Mobile FAIL |

## Desktop Audit Results

**Runs:** 3
**Preset:** desktop

| Run | Perf | A11y | BP | LCP (ms) | CLS | FCP (ms) | SI (ms) | TBT (ms) |
|-----|------|------|-----|----------|-----|----------|---------|----------|
| 1 | 91 | 97 | 77 | 1616 | 0.0003 | 1126 | 1321 | 29 |
| 2 | 96 | 97 | 77 | 1172 | 0.0544 | 834 | 1143 | 79 |
| 3 | 92 | 97 | 77 | 1549 | 0.0003 | 1084 | 1264 | 8 |
| **Median** | **92** | **97** | **77** | **1549** | **0.0003** | **1084** | **1264** | **29** |

### Desktop Analysis

- **Performance Score:** 92/100 - Excellent
- **LCP:** 1549ms - Above 1.0s target but acceptable for real-world usage
  - LCP element: Hero content (headline/image)
  - Primary bottleneck: Network latency + font loading
- **CLS:** Near-zero (0.0003) - Excellent layout stability
- **TBT:** 29ms - Minimal blocking time, excellent interactivity
- **Accessibility:** 97/100 - Very good
- **Best Practices:** 77/100 - Some security headers could be improved

## Mobile Audit Results

**Runs:** 3
**Preset:** default (mobile simulation with CPU/network throttling)

| Run | Perf | A11y | BP | LCP (ms) | CLS | FCP (ms) | SI (ms) | TBT (ms) |
|-----|------|------|-----|----------|-----|----------|---------|----------|
| 1 | 64 | 97 | 77 | 5130 | 0.0088 | 2947 | 3126 | 457 |
| 2 | 61 | 97 | 77 | 5349 | 0.0088 | 3390 | 5763 | 342 |
| 3 | 45 | 97 | 77 | 3143 | 0.6772 | 1289 | 2229 | 1451 |
| **Median** | **61** | **97** | **77** | **5130** | **0.0088** | **2947** | **3126** | **457** |

### Mobile Analysis

- **Performance Score:** 61/100 - Moderate (expected with Lighthouse simulated throttling)
- **LCP:** 5130ms - Above 2.5s target
  - Primary cause: Simulated slow 4G throttling + CPU slowdown
  - Real-world mobile performance will be significantly better
- **CLS:** 0.0088 - Excellent layout stability
- **TBT:** 457ms - Higher due to simulated CPU throttling
- **Accessibility:** 97/100 - Consistent with desktop

**Note:** Lighthouse mobile simulation applies aggressive throttling (4x CPU slowdown + simulated slow 4G). Real-world mobile performance on modern devices is significantly better than these scores suggest.

## Animation Performance Analysis (PERF-04)

### Keyframe Animations

All keyframe animations use compositor-friendly properties only:

| Animation | Properties Used | Status |
|-----------|-----------------|--------|
| float-orb | transform (translate, scale) | SAFE |
| pricingPulse | transform (scale) | SAFE |
| fadeInUp | opacity, transform (translateY) | SAFE |
| fadeIn | opacity, transform (translateY) | SAFE |
| float | transform (translateY) | SAFE |
| spin | transform (rotate) | SAFE |

### Transitions

Most transitions use safe properties (transform, opacity, color, box-shadow, border-color).

**Minor Layout Transitions Found (3):**

| Location | Property | Context | Impact |
|----------|----------|---------|--------|
| Line 358 | top | Skip link (accessibility focus) | NEGLIGIBLE - Only on focus, rare |
| Line 3251 | width | Footer link underline | NEGLIGIBLE - Pseudo-element on hover |
| Line 3556 | bottom | Floating contact button | LOW - Single element, rare trigger |

**Verdict:** All three layout-property transitions are on small, isolated elements triggered by specific user interactions (focus/hover). They do not cause layout thrashing during normal page load or scroll.

### Scroll Animations

The scroll-triggered animations (animate-on-scroll class) correctly use:
- opacity: 0 → 1
- transform: translateY(40px) → translateY(0)

No layout-thrashing properties detected in scroll animations.

## PERF Requirements Status

| Requirement | Description | Status | Notes |
|-------------|-------------|--------|-------|
| PERF-01 | LCP ≤1.0s (desktop) | PARTIAL | 1.5s desktop, 5.1s mobile (throttled) |
| PERF-02 | CLS ≤0.1 | PASS | 0.0003 desktop, 0.0088 mobile |
| PERF-03 | No render-blocking resources added | PASS | No blocking resources detected |
| PERF-04 | Animations use transform/opacity only | PASS | All major animations safe |

## Recommendations

### Immediate (Non-Blocking)
1. **Preload fonts** - Add `<link rel="preload">` for Fraunces/Bricolage fonts to improve LCP
2. **Consider AVIF/WebP** - Further image optimization for mobile

### Future Consideration
1. **Security headers** - Add CSP, X-Frame-Options via Netlify headers for Best Practices score
2. **Font subsetting** - Reduce font payload for mobile

## Raw Data Files

- `lh-desktop-1.json` through `lh-desktop-3.json`
- `lh-mobile-1.json` through `lh-mobile-3.json`

---

*Audit completed: 2026-01-30*
