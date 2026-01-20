# Phase 5: Performance - Research

**Researched:** 2026-01-20
**Domain:** Web Performance (Core Web Vitals, LCP, CLS)
**Confidence:** HIGH

## Summary

This research covers web performance optimization for a single-page marketing site targeting mobile Google Ads traffic. The primary goals are achieving LCP under 2.5 seconds on 4G and CLS under 0.1.

The current site has a solid foundation: inline CSS (already critical-path optimized), reasonable image sizes (13-66KB), and some lazy loading already implemented. The main optimizations needed are:
1. Adding explicit image dimensions to prevent CLS
2. Optimizing the LCP image (hero classroom-teaching.jpg) with fetchpriority and proper sizing
3. Fine-tuning font loading to prevent layout shifts
4. Adding preload hints for critical resources

**Primary recommendation:** Focus on image dimension attributes and LCP image optimization first, as these will have the largest measurable impact. The site's single-HTML architecture with inline CSS is already well-suited for fast initial rendering.

## 1. Current Best Practices (2025-2026)

### Core Web Vitals Thresholds

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | <= 2.5s | 2.5s - 4.0s | > 4.0s |
| CLS | <= 0.1 | 0.1 - 0.25 | > 0.25 |
| INP | <= 200ms | 200ms - 500ms | > 500ms |

**Source:** [Google Search Central - Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

### LCP Breakdown (per web.dev)

LCP consists of four components:
- **Time to First Byte (TTFB):** ~40% - Server response time
- **Resource Load Delay:** <10% - Time before LCP resource starts loading
- **Resource Load Duration:** ~40% - Time to download LCP resource
- **Element Render Delay:** <10% - Time from resource loaded to rendered

**Source:** [web.dev - Optimize LCP](https://web.dev/articles/optimize-lcp)

### Key Industry Changes for 2025

1. **INP replaced FID** - Interaction to Next Paint is now the responsiveness metric
2. **fetchpriority widely supported** - All modern browsers support the Fetch Priority API
3. **AVIF mainstream** - 93.8% browser support, recommended for photos
4. **Native lazy loading mature** - 95%+ browser support, thresholds optimized
5. **Chrome 121+** - Horizontal scroll images use same thresholds as vertical

**Confidence:** HIGH - Verified via multiple authoritative sources

## 2. Technical Approach for This Project

### Current Site Analysis

| Aspect | Current State | Assessment |
|--------|---------------|------------|
| HTML size | ~230KB | Large but acceptable for single-file architecture |
| CSS | Inline in `<head>` | Already critical-path optimized |
| Images | 8 images, 13-66KB each | Reasonable sizes, JPG format |
| Fonts | Google Fonts (Outfit, Source Serif 4) | Using preconnect, display=swap |
| Lazy loading | Some images use `loading="lazy"` | Partially implemented |
| Image dimensions | Not specified | **Gap - causes CLS** |

### Images in Current Site

| Image | Size | Location | Current Loading |
|-------|------|----------|-----------------|
| classroom-teaching.jpg | 48KB | Hero (LCP candidate) | `loading="eager"` |
| classroom-students.jpg | 66KB | About section | `loading="lazy"` |
| chris.jpg | 19KB | Team section | `loading="lazy"` |
| nathan.jpg | 15KB | Team section | `loading="lazy"` |
| taehoon.jpg | 13KB | Team section | `loading="lazy"` |
| john.jpg | 14KB | Team section | `loading="lazy"` |
| logo-star.png | 12KB | Nav, footer | None specified |
| logo-banner.jpg | 32KB | OG meta only | N/A |

### Recommended Approach

1. **Keep inline CSS** - Already optimal for critical path
2. **Add image dimensions** - Prevents CLS, browsers calculate aspect ratio
3. **Optimize LCP image** - Add `fetchpriority="high"`, consider WebP
4. **Fine-tune font loading** - Adjust for minimal layout shift
5. **Add targeted preloads** - LCP image, critical font

**Confidence:** HIGH - Based on web.dev recommendations and site analysis

## 3. Image Optimization Strategy

### Format Recommendations

| Format | Use Case | Browser Support | File Size vs JPEG |
|--------|----------|-----------------|-------------------|
| AVIF | Photos (hero, classroom) | 93.8% | 50% smaller |
| WebP | All images (fallback) | 95.3% | 30% smaller |
| JPEG | Final fallback | 100% | Baseline |

**Recommendation:** For this simple marketing site, WebP with JPEG fallback is sufficient. AVIF encoding complexity isn't justified for 8 images.

### Implementation Pattern

```html
<!-- For above-fold images (hero) -->
<picture>
  <source srcset="images/classroom-teaching.webp" type="image/webp">
  <img src="images/classroom-teaching.jpg"
       alt="BEAM Academy tutor teaching"
       width="800" height="533"
       loading="eager"
       fetchpriority="high">
</picture>

<!-- For below-fold images -->
<picture>
  <source srcset="images/classroom-students.webp" type="image/webp">
  <img src="images/classroom-students.jpg"
       alt="Students in tutoring session"
       width="800" height="533"
       loading="lazy">
</picture>
```

### Lazy Loading Strategy

**Native browser behavior (Chrome/Chromium):**
- 4G connections: Load when 1,250px from viewport
- 3G and slower: Load when 2,500px from viewport

**Rules for this site:**
- **Never lazy-load LCP image** - Hero image must be `loading="eager"`
- **Lazy-load below-fold** - About section, Team section, all below viewport
- **Logo images** - Small (12KB), keep as-is (no lazy loading needed)

**Source:** [web.dev - Browser-level lazy loading](https://web.dev/articles/browser-level-image-lazy-loading)

### Above-Fold vs Below-Fold Treatment

| Section | Images | Treatment |
|---------|--------|-----------|
| Hero | classroom-teaching.jpg | `loading="eager"`, `fetchpriority="high"`, preload |
| Nav/Footer | logo-star.png | No lazy (small, critical for branding) |
| About | classroom-students.jpg | `loading="lazy"` |
| Team | 4 tutor photos | `loading="lazy"` |

### Placeholder Strategy

For this site, **no placeholders needed** because:
1. Images are reasonably small (13-66KB)
2. Explicit dimensions prevent layout shift
3. Site targets 4G connections (fast enough for quick loads)
4. Blur-up adds complexity without significant UX benefit for this use case

**Confidence:** HIGH - Native lazy loading is mature and well-documented

## 4. Critical CSS Implementation

### Current State: Already Optimal

The site uses **inline CSS in the `<head>`** - this is already the critical CSS pattern. No external CSS files block rendering.

**Benefits of current approach:**
- Zero CSS render-blocking requests
- First paint can occur immediately after HTML parse
- No need for critical CSS extraction tools

### Considerations

| Aspect | Status | Action |
|--------|--------|--------|
| CSS location | Inline in `<head>` | No change needed |
| CSS size | ~4KB (estimated) | Acceptable for inline |
| External CSS | None | No change needed |
| Unused CSS | Some present | Low priority - minimal impact |

### Recommendation

**No changes to CSS loading strategy.** The current inline approach is optimal for a single-page site. Extracting "critical" CSS from already-inline CSS would add complexity without benefit.

**Confidence:** HIGH - Inline CSS is the gold standard for critical CSS

## 5. Font Loading Strategy

### Current Implementation

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" rel="stylesheet">
```

### Analysis

| Aspect | Current | Assessment |
|--------|---------|------------|
| Preconnect | Present for both domains | Correct |
| Font display | `display=swap` | Causes FOUT, may cause CLS |
| Font weights | Outfit: 6 weights, Source Serif: 3 weights | More than needed |

### Recommended Improvements

**Option A: Use `font-display: optional` (Recommended for performance)**
```html
<link href="...&display=optional" rel="stylesheet">
```
- Prevents layout shift entirely
- Font may not show if slow to load (uses system font instead)
- Best for performance metrics

**Option B: Keep `swap` with font fallback tuning**
- Keep current `display=swap`
- Use `size-adjust` and metric overrides to match fallback
- More complex but ensures custom font always shows

**Recommendation for this project:** Keep `display=swap` (current behavior) because:
1. Branding consistency matters for a marketing site
2. Target audience is on 4G (fonts load quickly)
3. Font loading already has preconnect hints
4. CLS from font swap is minimal with system font fallback

### Font Weight Optimization

Current fonts load many weights. Consider reducing:

```html
<!-- Current: 6 weights -->
family=Outfit:wght@300;400;500;600;700;800

<!-- Optimized: 3-4 weights -->
family=Outfit:wght@400;500;600;700
```

**Impact:** Reduces font CSS file size, faster font loading.

**Confidence:** MEDIUM - Font loading is a tradeoff between UX (custom fonts) and performance (swap/optional)

## 6. Layout Stability Techniques

### Primary CLS Causes

1. **Images without dimensions** - Main issue on this site
2. **Font loading** - Minimal with current preconnect
3. **Dynamic content injection** - Not applicable (static site)
4. **Ads** - Not present

### Solution: Explicit Image Dimensions

**The fix:** Add `width` and `height` attributes to all `<img>` elements.

```html
<!-- Before (causes CLS) -->
<img src="images/classroom-teaching.jpg" alt="...">

<!-- After (prevents CLS) -->
<img src="images/classroom-teaching.jpg"
     alt="..."
     width="800"
     height="533">
```

**How it works:**
- Modern browsers calculate aspect ratio from width/height
- Browser reserves space before image loads
- CSS `height: auto; max-width: 100%` still works for responsive

**Required CSS (already present in site):**

```css
img {
  max-width: 100%;
  height: auto;
}
```

**Source:** [web.dev - Optimize CLS](https://web.dev/articles/optimize-cls)

### Image Dimensions to Add

| Image | Dimensions (WxH) | Aspect Ratio |
|-------|------------------|--------------|
| classroom-teaching.jpg | Get from file | ~3:2 |
| classroom-students.jpg | Get from file | ~3:2 |
| chris.jpg | Get from file | ~1:1 (portrait) |
| nathan.jpg | Get from file | ~1:1 (portrait) |
| taehoon.jpg | Get from file | ~1:1 (portrait) |
| john.jpg | Get from file | ~1:1 (portrait) |
| logo-star.png | Get from file | 1:1 |

**Action:** During implementation, run `identify` or similar to get exact dimensions.

### CSS aspect-ratio Alternative

For more complex responsive scenarios:

```css
.hero-image-card img {
  aspect-ratio: 3 / 2;
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

**Confidence:** HIGH - Explicit dimensions are the primary CLS fix

## 7. Resource Hints and Loading Order

### Current Resource Hints

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### Recommended Additions

```html
<!-- Add: Preload LCP image -->
<link rel="preload"
      as="image"
      href="images/classroom-teaching.jpg"
      fetchpriority="high">

<!-- Add: Preconnect to Google Ads (already loads GTM script) -->
<link rel="preconnect" href="https://www.googletagmanager.com">

<!-- Keep existing font preconnects -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### Resource Priority Order

Optimal loading sequence for this site:

1. **HTML** - Document itself
2. **Inline CSS** - Parsed with HTML (already inline)
3. **LCP Image** - Preloaded, high priority
4. **Fonts CSS** - Google Fonts stylesheet
5. **Font files** - Actual WOFF2 files
6. **Below-fold images** - Lazy loaded
7. **Analytics** - Google Ads gtag (async)

### fetchpriority Usage

| Resource | Priority | Attribute |
|----------|----------|-----------|
| LCP image | High | `fetchpriority="high"` |
| Above-fold content | Default | (none needed) |
| Below-fold images | Low | `fetchpriority="low"` (optional) |
| Analytics scripts | Low | Already async |

**Note:** Only use `fetchpriority="high"` on ONE resource (the LCP image). Multiple high-priority resources compete and negate the benefit.

**Source:** [web.dev - Fetch Priority API](https://web.dev/articles/fetch-priority)

### Script Loading Strategy

Current scripts:
- Google Ads gtag: `async` (correct)
- Inline JavaScript: At end of `<body>` (correct)

**No changes needed** - Scripts are already non-render-blocking.

**Confidence:** HIGH - Resource hints are well-documented

## 8. Measurement and Verification

### Testing Tools

| Tool | Type | Use For |
|------|------|---------|
| Lighthouse (DevTools) | Lab | Development testing, before/after comparisons |
| PageSpeed Insights | Lab + Field | Production validation, real-user data |
| WebPageTest | Lab | Detailed waterfall analysis |
| Chrome DevTools Performance | Lab | Live debugging, interaction testing |
| Search Console | Field | 28-day trends, actual user experience |

### Testing Protocol

1. **Before optimization:**
   - Run Lighthouse on mobile emulation (4G throttling)
   - Record baseline LCP, CLS, Performance score
   - Screenshot the Lighthouse report

2. **After each change:**
   - Run Lighthouse again
   - Compare metrics
   - Document improvement or regression

3. **Final validation:**
   - Test on PageSpeed Insights (uses real Chrome data)
   - Check mobile AND desktop scores
   - Verify CLS is under 0.1

### Lighthouse Mobile Settings

For consistent testing:
- Device: Mobile
- Throttling: Simulated Slow 4G, 4x CPU Slowdown
- Screen: 412x823 (Moto G Power)

### Key Metrics to Track

| Metric | Target | Current (estimate) |
|--------|--------|-------------------|
| LCP | < 2.5s | Unknown - measure baseline |
| CLS | < 0.1 | Likely > 0.1 (no dimensions) |
| FCP | < 1.8s | Should be fast (inline CSS) |
| Performance Score | 90+ | Unknown |

### 2025 Lighthouse Updates

Starting Lighthouse 12.7 (June 2025), multiple CLS-related audits combine into "CLS culprits insight." The tool will identify specific elements causing layout shifts.

**Confidence:** HIGH - Testing tools are well-established

## 9. Risks and Considerations

### Risk 1: Image Dimension Accuracy

**Risk:** Incorrect width/height values cause stretched/distorted images

**Mitigation:**
- Get exact dimensions from image files before adding attributes
- Always use `height: auto` in CSS to maintain aspect ratio
- Test on multiple viewport sizes

### Risk 2: WebP Generation

**Risk:** WebP versions look different from originals

**Mitigation:**
- Use quality 80-85 for WebP
- Visual comparison before deployment
- Always keep JPEG fallback

### Risk 3: Font Loading Tradeoffs

**Risk:** `font-display: optional` may cause system font to show on slow connections

**Mitigation:**
- Keep current `display=swap` for this marketing site
- Brand consistency more important than perfect CLS
- Test on throttled connections

### Risk 4: Preload Overuse

**Risk:** Preloading too many resources wastes bandwidth

**Mitigation:**
- Only preload the LCP image
- Don't preload font files (CSS already handles)
- Monitor waterfall in DevTools

### Risk 5: Measurement Variability

**Risk:** Lighthouse scores vary between runs

**Mitigation:**
- Run 3-5 times and average
- Use consistent testing conditions
- Focus on trends, not single measurements

### Things That Could Go Wrong

1. **Image dimensions break existing CSS layout** - Test responsive behavior
2. **WebP images don't generate correctly** - Have fallback plan (keep JPEGs)
3. **Preload causes duplicate downloads** - Verify in Network tab
4. **CLS from font remains** - May need size-adjust tuning

**Confidence:** MEDIUM - Risks are manageable but require testing

## Standard Stack

### No Additional Libraries Needed

This project can achieve all performance goals with **native browser features**:

| Feature | Native Support | Library Alternative |
|---------|----------------|---------------------|
| Lazy loading | `loading="lazy"` | No library needed |
| Image formats | `<picture>` element | No library needed |
| Priority hints | `fetchpriority` attribute | No library needed |
| Preloading | `<link rel="preload">` | No library needed |

### Tools for Image Optimization (Build Time)

| Tool | Purpose | When to Use |
|------|---------|-------------|
| squoosh.app | WebP conversion | Manual, one-time |
| sharp (Node.js) | Automated WebP generation | If automating build |
| imagemagick | CLI image processing | Server-side |

**Recommendation:** Use squoosh.app for manual WebP conversion. No build tooling needed for 8 images.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Lazy loading | IntersectionObserver script | `loading="lazy"` attribute | Native has 95%+ support, optimized thresholds |
| Image optimization | Custom compression | squoosh.app / sharp | Battle-tested quality algorithms |
| Performance monitoring | Custom analytics | Lighthouse, PageSpeed Insights | Industry standard, comparable results |
| Critical CSS extraction | Manual extraction | Keep current inline CSS | Already optimal |

## Common Pitfalls

### Pitfall 1: Lazy Loading the LCP Image

**What goes wrong:** Hero image loads late, LCP score tanks
**Why it happens:** Developers apply `loading="lazy"` to all images
**How to avoid:** Explicitly use `loading="eager"` on above-fold images
**Warning signs:** LCP > 2.5s despite fast server

### Pitfall 2: Missing Image Dimensions

**What goes wrong:** Page jumps during load, CLS score fails
**Why it happens:** Images load without reserved space
**How to avoid:** Always add `width` and `height` attributes
**Warning signs:** Elements visibly shift after page appears loaded

### Pitfall 3: Preloading Non-Critical Resources

**What goes wrong:** Critical resources delayed, overall slower
**Why it happens:** Too many preload hints compete for bandwidth
**How to avoid:** Only preload the single LCP resource
**Warning signs:** Waterfall shows preloaded items loading late

### Pitfall 4: Ignoring Mobile Viewport

**What goes wrong:** Good desktop scores, poor mobile
**Why it happens:** Testing only on fast desktop connections
**How to avoid:** Always test with mobile throttling
**Warning signs:** PageSpeed mobile score much lower than desktop

### Pitfall 5: Font Loading Layout Shifts

**What goes wrong:** Text visibly resizes when fonts load
**Why it happens:** Fallback font has different metrics than custom font
**How to avoid:** Use preconnect, consider `font-display: optional`
**Warning signs:** CLS audit shows text elements as contributors

## Code Examples

### Complete LCP Image Implementation

```html
<!-- In <head> -->
<link rel="preload"
      as="image"
      href="images/classroom-teaching.jpg">

<!-- In <body> - Hero section -->
<picture>
  <source srcset="images/classroom-teaching.webp" type="image/webp">
  <img src="images/classroom-teaching.jpg"
       alt="BEAM Academy tutor teaching arithmetic sequences"
       width="800"
       height="533"
       loading="eager"
       fetchpriority="high">
</picture>
```

### Lazy-Loaded Image with Dimensions

```html
<img src="images/classroom-students.jpg"
     alt="Students engaged in a BEAM Academy tutoring session"
     width="800"
     height="533"
     loading="lazy">
```

### Optimized Google Fonts Loading

```html
<!-- Preconnect (already present) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts with swap (current approach - keep it) -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet">
```

### Resource Hint Block (Complete)

```html
<!-- Place early in <head>, before other resources -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="preload" as="image" href="images/classroom-teaching.jpg">
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom lazy loading JS | Native `loading="lazy"` | 2020-2022 | Remove JS dependencies |
| JPEG only | WebP/AVIF with fallbacks | 2022-2024 | 30-50% smaller files |
| `font-display: block` | `font-display: swap/optional` | 2019-2020 | Prevent FOIT |
| FID metric | INP metric | March 2024 | Better responsiveness measure |
| Manual priority | `fetchpriority` attribute | 2022-2023 | Native browser hints |

**Deprecated/outdated:**
- **JavaScript lazy-loading libraries** - Native support is now sufficient
- **Intrinsic aspect ratio padding hack** - CSS `aspect-ratio` is widely supported
- **First Input Delay (FID)** - Replaced by INP in Core Web Vitals

## Open Questions

### 1. Exact Image Dimensions

**What we know:** Images exist, approximate sizes listed
**What's unclear:** Exact pixel dimensions for each image
**Recommendation:** Run `identify` or open in image editor during implementation

### 2. Current Lighthouse Score

**What we know:** Site structure and content
**What's unclear:** Baseline performance metrics
**Recommendation:** Run Lighthouse before starting to establish baseline

### 3. WebP Conversion Quality

**What we know:** WebP typically 30% smaller at similar quality
**What's unclear:** Optimal quality setting for these specific images
**Recommendation:** Test quality 80 and 85, compare visually

## Sources

### Primary (HIGH confidence)
- [web.dev - Optimize LCP](https://web.dev/articles/optimize-lcp) - LCP breakdown and optimization strategies
- [web.dev - Optimize CLS](https://web.dev/articles/optimize-cls) - CLS prevention techniques
- [web.dev - Browser-level lazy loading](https://web.dev/articles/browser-level-image-lazy-loading) - Native lazy loading details
- [web.dev - Fetch Priority API](https://web.dev/articles/fetch-priority) - fetchpriority usage
- [Google Search Central - Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) - Official thresholds
- [Chrome for Developers - font-display](https://developer.chrome.com/blog/font-display) - Font loading strategies

### Secondary (MEDIUM confidence)
- [NitroPack - Core Web Vitals Strategy](https://nitropack.io/blog/core-web-vitals-strategy/) - 2025 optimization overview
- [DebugBear - Resource Hints](https://www.debugbear.com/blog/resource-hints-rel-preload-prefetch-preconnect) - Preload/prefetch details
- [DebugBear - Preload Web Fonts](https://www.debugbear.com/blog/preload-web-fonts) - Font optimization
- [SpeedVitals - WebP vs AVIF](https://speedvitals.com/blog/webp-vs-avif/) - Format comparison 2025

### Tertiary (LOW confidence)
- Various search results on specific implementation details - Used for context only

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Native browser features, well-documented
- Architecture patterns: HIGH - Based on official web.dev recommendations
- Pitfalls: HIGH - Common issues documented across multiple sources
- Image optimization: MEDIUM - Format choices depend on specific images
- Font loading: MEDIUM - Tradeoffs between performance and UX

**Research date:** 2026-01-20
**Valid until:** 2026-03-20 (60 days - Core Web Vitals are stable)

---

## RESEARCH COMPLETE

**Phase:** 5 - Performance
**Confidence:** HIGH

### Key Findings

1. **The site's inline CSS is already optimal** for critical rendering path - no CSS loading changes needed
2. **Missing image dimensions is the primary CLS issue** - add width/height to all `<img>` elements
3. **LCP image (classroom-teaching.jpg) needs optimization** - add `fetchpriority="high"` and consider preload
4. **Native lazy loading is sufficient** - no JavaScript libraries needed for lazy loading
5. **Font loading is adequate** - current preconnect + swap is reasonable for marketing site

### File Created

`C:/Users/bskim/beamacademy-site/.planning/phases/05-performance/05-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | Native browser features, no libraries needed |
| Architecture | HIGH | Based on official web.dev, Google documentation |
| Pitfalls | HIGH | Well-documented common issues |
| Image Strategy | MEDIUM | Specific quality settings need testing |
| Font Strategy | MEDIUM | Tradeoffs between UX and performance |

### Open Questions

1. Exact image dimensions (get during implementation)
2. Baseline Lighthouse score (measure before starting)
3. Optimal WebP quality setting (test during implementation)

### Ready for Planning

Research complete. Planner can now create PLAN.md files.
