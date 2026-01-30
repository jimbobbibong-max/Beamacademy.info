# Phase 24: Performance Verification & Final QA - Research

**Researched:** 2026-01-30
**Domain:** Web Performance Testing, Accessibility Auditing, Cross-Browser QA
**Confidence:** HIGH

## Summary

Phase 24 verifies that the v7 redesign (Phases 20-23) did not introduce performance regressions, accessibility violations, or cross-browser issues. This is a verification-only phase - no new features, just auditing and documenting results.

Key focus areas:
1. **Core Web Vitals** - LCP must stay at or below 1.0s (currently 0.9s), CLS must stay at or below 0.1 (currently 0.014)
2. **Animation Performance** - Verify all animations use transform/opacity only (no layout thrashing)
3. **Render-Blocking Resources** - Ensure no new blocking CSS/JS was added
4. **Accessibility** - WCAG 2.1 AA compliance with axe-core/Lighthouse
5. **Cross-Browser** - Chrome, Firefox, Safari, Edge on desktop; iOS Safari, Android Chrome on mobile

**Primary recommendation:** Run Lighthouse CLI in desktop preset mode for accurate metrics. Use Chrome DevTools Rendering panel to visually verify CLS and animation performance. Manual cross-browser testing is sufficient for a static site.

## Performance Testing Approach

### Core Web Vitals Targets (from CONTEXT.md)

| Metric | Threshold | Current Baseline | Tool |
|--------|-----------|------------------|------|
| LCP (Largest Contentful Paint) | 1.0s or less | 0.9s | Lighthouse CLI |
| CLS (Cumulative Layout Shift) | 0.1 or less | 0.014 | Lighthouse CLI |
| FID/INP (Interaction) | 100ms or less | N/A | Lighthouse CLI |
| Performance Score | 90+ | N/A | Lighthouse CLI |

**Sources:** [Lighthouse CLI npm](https://www.npmjs.com/package/lighthouse), [Chrome DevTools Performance Reference](https://developer.chrome.com/docs/devtools/performance/reference)

### Lighthouse CLI Installation and Usage

```bash
# Install globally (requires Node.js 18+)
npm install -g lighthouse

# Run desktop audit (recommended for this project)
lighthouse https://beamacademy.com.au --preset=desktop --output=html --output-path=./lighthouse-desktop.html

# Run mobile audit
lighthouse https://beamacademy.com.au --preset=mobile --output=html --output-path=./lighthouse-mobile.html

# Run specific categories only
lighthouse https://beamacademy.com.au --only-categories=performance,accessibility --preset=desktop

# Run in headless mode (CI/automation)
lighthouse https://beamacademy.com.au --chrome-flags="--headless" --preset=desktop
```

**Desktop vs Mobile Thresholds (Lighthouse 13):**
- Desktop LCP green: 1.2s or less
- Mobile LCP green: 2.5s or less
- Desktop FCP green: 0.9s or less
- Mobile FCP green: 1.8s or less

**Note:** Network throttling is applied by default (simulates slow 4G). Use `--throttling-method=devtools` for more realistic local testing.

**Sources:** [Lighthouse CLI Overview](https://developer.chrome.com/docs/lighthouse/overview/), [NitroPack Lighthouse Guide](https://nitropack.io/blog/how-to-run-local-performance-tests-with-lighthouse/)

### Chrome DevTools Performance Profiling

For detailed analysis beyond Lighthouse scores:

1. **Open DevTools** then go to Performance tab
2. **Click Record** then Refresh page then Stop after load
3. **Look for:**
   - Long main-thread tasks (red blocks)
   - Layout/Recalculate Style entries (indicate layout thrashing)
   - Frame drops (should be 60fps steady)

**Key indicators:**
- Green bars = good (paint only)
- Purple bars = layout recalculation (problematic if frequent)
- Red rectangles on network requests = render-blocking

**Source:** [Chrome DevTools Performance Reference](https://developer.chrome.com/docs/devtools/performance/reference)

### LCP Measurement with opacity: 0.01

Phase 23 correctly uses `opacity: 0.01` instead of `opacity: 0` for hero animations. This is critical because:

> "Chrome ignores elements with opacity: 0 as LCP candidates. Starting from opacity: 0.01 ensures the element is counted for LCP measurement."

**Verification:** Confirm Lighthouse identifies the hero headline or hero image as the LCP element, not a fallback element.

**Source:** [DebugBear: Opacity Animation LCP Impact](https://www.debugbear.com/blog/opacity-animation-poor-lcp)

## Animation Performance Verification

### Verifying Transform/Opacity Only (PERF-04)

Phase 23 implemented all animations using only `transform` and `opacity` properties. These are GPU-accelerated and do not cause layout recalculation.

**Properties that CAUSE layout thrashing (avoid):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `font-size`

**Properties that DO NOT cause layout thrashing (Phase 23 uses these):**
- `transform: translate()`, `scale()`, `rotate()`
- `opacity`
- `filter` (GPU-composited)

### Chrome DevTools Rendering Panel Verification

1. **Open DevTools** then Press Cmd/Ctrl+Shift+P then Type "Show Rendering"
2. **Enable these checkboxes:**
   - **Paint Flashing** - Areas turning green = being repainted (bad if whole page flashes)
   - **Layout Shift Regions** - Areas turning blue/purple = CLS events
3. **Refresh page and scroll** - Should see minimal green flashing, no blue regions

**What to look for:**
- Hero load animation: Should NOT trigger paint flashing outside hero area
- Scroll reveals: Should NOT trigger layout shift regions
- Hover states: Should see small paint areas, not full repaint

**Source:** [Chrome DevTools Rendering Performance](https://developer.chrome.com/docs/devtools/rendering/performance)

### Performance Panel Animation Verification

1. **Open DevTools** then go to Performance tab then Enable "Screenshots"
2. **Record during page load and scroll**
3. **Expand the "Animations" track** at the bottom
4. **Look for:**
   - Animations named "transform" or "opacity" = good
   - Animations triggering "Recalculate Style" repeatedly = bad

**If you see many "Recalculate Style" or "Layout" entries during animations, there is a property causing layout thrashing.**

**Source:** [SitePoint CSS Animation DevTools](https://www.sitepoint.com/check-css-animation-performance-with-the-browsers-dev-tools/)

## Render-Blocking Resources Detection (PERF-03)

### Lighthouse Audit

Lighthouse 13 moved render-blocking detection to "Render blocking requests" insight in the Opportunities section.

**What Lighthouse flags:**
- CSS files without `media` attribute or `disabled` attribute
- JS files in `<head>` without `async` or `defer`

**Expected for beamacademy-index.html:**
- All CSS is inline (no external stylesheets to block)
- All JS is inline at end of `<body>` (does not block render)

**Verification:** Lighthouse should NOT show "Eliminate render-blocking resources" warning.

**Source:** [Chrome Lighthouse Render-Blocking Resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources)

### Chrome DevTools Network Waterfall

1. **Open DevTools** then go to Network tab
2. **Reload page with cache disabled** (Cmd+Shift+R)
3. **Look for the blue vertical line (DOMContentLoaded):**
   - Resources loaded before this line are render-blocking
   - All CSS/JS should complete before or be deferred

**Expected:** Single HTML request loads everything (inline CSS/JS), no external blocking resources.

## Cross-Browser Testing

### Browser/Device Matrix

| Browser | Version | Platform | Priority |
|---------|---------|----------|----------|
| Chrome | Latest 2 | Windows/Mac | P1 |
| Safari | Latest 2 | macOS/iOS | P1 |
| Firefox | Latest 2 | Windows/Mac | P1 |
| Edge | Latest 2 | Windows | P2 |
| iOS Safari | Latest | iPhone | P1 (mobile) |
| Android Chrome | Latest | Android | P1 (mobile) |

**Source:** [MDN Cross-Browser Testing Introduction](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Introduction)

### Testing Approach for Static Site

For a single-page static HTML site, **manual testing is sufficient**. Automated cross-browser testing (BrowserStack, Playwright) is overkill.

**Manual Testing Checklist:**
1. **Open in each browser** - Check for layout breaks
2. **Test mobile viewport** (DevTools device mode) - Check responsive behavior
3. **Click all CTAs** - Ensure buttons work, links navigate
4. **Test form submission** - Contact form and payment modal
5. **Scroll through entire page** - Check scroll reveal animations
6. **Test hover states** - Button hovers, card lifts, link underlines

### CSS Feature Support Concerns

| Feature | Support | Fallback |
|---------|---------|----------|
| `@starting-style` | Chrome 117+, Safari 17.5+, Firefox 129+ | Elements appear immediately (no fade) |
| `IntersectionObserver` | All modern browsers | Sections visible immediately |
| `prefers-reduced-motion` | All modern browsers | N/A |
| CSS Grid | All modern browsers | N/A |
| CSS Custom Properties | All modern browsers | N/A |

**@starting-style is the newest feature** - Safari 17.5+ and Firefox 129+ only. Older browsers will see content immediately without animation (graceful degradation).

**Source:** [Can I Use @starting-style](https://caniuse.com/?search=%40starting-style)

## Accessibility Audit

### WCAG 2.1 AA Requirements

| Principle | Key Checks |
|-----------|------------|
| **Perceivable** | Alt text, color contrast (4.5:1 text, 3:1 large), captions |
| **Operable** | Keyboard navigation, no keyboard traps, skip links, focus visible |
| **Understandable** | Clear labels, error identification, consistent navigation |
| **Robust** | Valid HTML, ARIA roles correct, semantic markup |

**Source:** [AccessiBe WCAG Checklist](https://accessibe.com/blog/knowledgebase/wcag-checklist)

### Automated Tools

**1. Lighthouse Accessibility Audit:**
```bash
lighthouse https://beamacademy.com.au --only-categories=accessibility --preset=desktop
```
Target score: 90+

**2. axe DevTools (Browser Extension):**
- Install: Chrome/Firefox/Edge extension
- Open DevTools then go to axe DevTools tab then Scan page
- Catches approximately 30% of accessibility issues (complements manual testing)

**3. @axe-core/cli (Automated):**
```bash
# Install
npm install -g @axe-core/cli
npm install -g browser-driver-manager
npx browser-driver-manager install chrome

# Run audit
axe https://beamacademy.com.au --exit
```

**Note:** Automated tools catch 30-57% of accessibility issues. Manual testing remains essential for:
- Keyboard navigation flow
- Screen reader experience
- Color contrast in context
- Focus management

**Sources:** [axe-core CLI npm package](https://www.npmjs.com/package/@axe-core/cli), [Lighthouse Accessibility Scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring)

### Key Manual Accessibility Checks

| Check | Method | Expected |
|-------|--------|----------|
| Keyboard navigation | Tab through entire page | All interactive elements focusable, logical order |
| Focus visibility | Tab through, observe focus | Visible focus ring on all focusable elements |
| Skip to content | Press Tab once | Skip link appears and works |
| Color contrast | Lighthouse + visual check | 4.5:1 for normal text, 3:1 for large text |
| Alt text | Inspect images | Descriptive alt or empty for decorative |
| Heading hierarchy | View heading structure | H1 then H2 then H3 in order, no skips |
| Form labels | Inspect form fields | All inputs have associated labels |
| Reduced motion | Enable system preference | All animations disabled |

## Final QA Checklist

### Pre-Production Verification

| Category | Check | Tool/Method |
|----------|-------|-------------|
| **Performance** | LCP at or below 1.0s | Lighthouse desktop |
| **Performance** | CLS at or below 0.1 | Lighthouse desktop |
| **Performance** | No render-blocking resources | Lighthouse/DevTools |
| **Performance** | Animations use transform/opacity only | DevTools Rendering |
| **Accessibility** | Score 90+ | Lighthouse |
| **Accessibility** | Keyboard navigation works | Manual Tab test |
| **Accessibility** | prefers-reduced-motion honored | Manual system pref test |
| **Cross-Browser** | Chrome renders correctly | Visual check |
| **Cross-Browser** | Safari renders correctly | Visual check |
| **Cross-Browser** | Firefox renders correctly | Visual check |
| **Cross-Browser** | Edge renders correctly | Visual check |
| **Cross-Browser** | Mobile viewport works | DevTools/real device |
| **Functionality** | All CTAs work | Click test |
| **Functionality** | Form submits correctly | Submit test form |
| **Functionality** | Payment modal opens | Click payment link |
| **Functionality** | Navigation works | Click all nav links |
| **Content** | No lorem ipsum | Visual scan |
| **Content** | No broken images | Visual scan |
| **Content** | No console errors | DevTools Console |

**Source:** [Website Launch Checklist](https://www.semrush.com/blog/website-launch-checklist/)

### Blocker vs Fix-Later Classification (from CONTEXT.md)

**Blocker (must fix before shipping):**
- Any CTA not clickable or broken
- Form submission failure
- Payment flow broken
- WCAG AA failures on critical elements
- Performance scores below 70
- Major layout breaks in any P1 browser

**Fix-Later (document for future):**
- Edge cases in older browsers
- Minor visual glitches that do not affect function
- Scores 70-89 if caused by external factors
- Animation quirks in older Safari/Firefox (graceful degradation)

## Tools Needed

### Required (must have)

| Tool | Purpose | Install |
|------|---------|---------|
| **Lighthouse CLI** | Performance and accessibility audit | `npm install -g lighthouse` |
| **Chrome DevTools** | Rendering, Performance, Network panels | Built into Chrome |
| **axe DevTools** | Accessibility audit | Chrome extension |

### Recommended (nice to have)

| Tool | Purpose | Install |
|------|---------|---------|
| **@axe-core/cli** | Automated accessibility | `npm install -g @axe-core/cli` |
| **WebPageTest** | Detailed performance waterfall | https://webpagetest.org |
| **PageSpeed Insights** | Real-world CrUX data | https://pagespeed.web.dev |

### Browser Testing

- Chrome (latest)
- Safari (via macOS or BrowserStack)
- Firefox (latest)
- Edge (latest, if on Windows)
- Mobile: iOS Safari, Android Chrome (DevTools emulation or real device)

## Risks and Gotchas

### 1. Lighthouse Score Variance

**Risk:** Lighthouse scores vary between runs (plus or minus 5 points typical)
**Mitigation:** Run 3-5 times, use median score. Or use `lighthouse --runs=5` flag.

### 2. Local vs Production Differences

**Risk:** Local testing does not account for Netlify CDN, compression, caching
**Mitigation:** Test the live URL (https://beamacademy.com.au), not local file

### 3. @starting-style Browser Support

**Risk:** Older browsers (Safari before 17.5, Firefox before 129) do not support @starting-style
**Mitigation:** This is acceptable graceful degradation - content appears immediately without animation. Not a blocker.

### 4. LCP Element Detection

**Risk:** Lighthouse might pick wrong LCP element after animation changes
**Mitigation:** Check "View Original Trace" in Lighthouse report to confirm LCP element is the hero

### 5. False Positive CLS from DevTools

**Risk:** DevTools extension panels can cause CLS events
**Mitigation:** Test with DevTools closed, use Lighthouse for accurate CLS

### 6. prefers-reduced-motion Testing

**Risk:** Forgetting to test reduced motion mode
**Mitigation:** Explicitly test with system preference enabled (Win: Settings then Ease of Access then Display then Show animations; Mac: System Preferences then Accessibility then Display then Reduce motion)

### 7. Mobile Testing Fidelity

**Risk:** DevTools device mode is not 100% accurate to real devices
**Mitigation:** If possible, test on real iPhone (Safari) and Android phone (Chrome). Otherwise, device mode is acceptable.

### 8. External Script Impact

**Risk:** Any external scripts (analytics, chat widgets) affect performance
**Mitigation:** Document any third-party impact separately. Core page should score 90+ without external scripts.

## Sources

### Primary (HIGH confidence)
- [Lighthouse CLI npm package](https://www.npmjs.com/package/lighthouse) - Installation and CLI flags
- [Chrome DevTools Performance Reference](https://developer.chrome.com/docs/devtools/performance/reference) - Performance profiling
- [Chrome DevTools Rendering Performance](https://developer.chrome.com/docs/devtools/rendering/performance) - Paint flashing, layout shift regions
- [Chrome Lighthouse Render-Blocking Resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources) - Detection of blocking resources
- [Lighthouse Accessibility Scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) - How accessibility is scored
- [axe-core CLI npm package](https://www.npmjs.com/package/@axe-core/cli) - Automated accessibility testing

### Secondary (MEDIUM confidence)
- [DebugBear: Opacity Animation LCP Impact](https://www.debugbear.com/blog/opacity-animation-poor-lcp) - Why opacity: 0.01 matters
- [web.dev CLS Article](https://web.dev/articles/cls) - CLS definition and optimization
- [SitePoint CSS Animation DevTools](https://www.sitepoint.com/check-css-animation-performance-with-the-browsers-dev-tools/) - Animation performance debugging
- [AccessiBe WCAG Checklist](https://accessibe.com/blog/knowledgebase/wcag-checklist) - WCAG 2.1 AA requirements

### Tertiary (LOW confidence)
- [MDN Cross-Browser Testing Introduction](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing/Introduction) - Browser testing methodology
- [Semrush Website Launch Checklist](https://www.semrush.com/blog/website-launch-checklist/) - General QA checklist structure

## Metadata

**Confidence breakdown:**
- Performance testing approach: HIGH - Official Chrome/Google documentation
- Animation verification: HIGH - Chrome DevTools official docs
- Accessibility audit: HIGH - axe-core and Lighthouse official docs
- Cross-browser testing: MEDIUM - General best practices, project-specific
- Final QA checklist: MEDIUM - Synthesized from multiple sources + CONTEXT.md decisions

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (Lighthouse versions update frequently, re-verify if using later)
