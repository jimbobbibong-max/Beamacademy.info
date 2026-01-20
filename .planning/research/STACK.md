# Mobile Responsive CSS Stack

**Project:** BEAM Academy Landing Page Mobile Optimization
**Researched:** 2026-01-20
**Confidence:** HIGH (MDN, W3C WCAG, and multiple authoritative sources)

## Executive Summary

Your BEAM Academy site has 24 ad clicks with 0 conversions due to mobile viewport/scaling issues. This document provides the exact CSS techniques to fix mobile rendering. The core problem is likely a missing or misconfigured viewport meta tag combined with fixed-width elements causing horizontal scroll.

---

## 1. Viewport Meta Tag

### Recommended Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
```

**Why this exact configuration:**

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| `width=device-width` | Required | Matches viewport to actual device width instead of defaulting to 980px virtual viewport |
| `initial-scale=1.0` | Required | Sets 100% zoom on load, preventing auto-zoom behavior |
| `viewport-fit=cover` | Recommended | Handles notched devices (iPhone X+) properly |

### What NOT to Add

```html
<!-- DO NOT USE - Accessibility violations -->
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="maximum-scale=1.0">
```

**Why:** Disabling zoom violates WCAG 1.4.4 (Resize Text). Users with low vision MUST be able to zoom to 200%. Google also penalizes sites that disable zoom in mobile rankings.

### Accessibility-Safe Alternative (if you need to limit extreme zoom)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

This allows zoom up to 5x while preventing extreme scaling issues.

**Source:** [MDN Viewport Meta Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)

---

## 2. CSS Media Queries (Mobile-First)

### Recommended Breakpoints

Use mobile-first approach with `min-width` queries. Start with mobile styles as default, layer desktop styles on top.

```css
/* Mobile base styles (no media query needed - these are defaults) */
.container {
  padding: 16px;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    font-size: 16px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Large desktop */
@media (min-width: 1280px) {
  .container {
    max-width: 1400px;
  }
}
```

### Why These Breakpoints

| Breakpoint | Target | Rationale |
|------------|--------|-----------|
| 0-767px | Mobile (default) | Base styles, no query needed |
| 768px+ | Tablet | iPad portrait and similar |
| 1024px+ | Desktop | Most laptops, iPad landscape |
| 1280px+ | Large desktop | Wide monitors |

**Why mobile-first:**
1. Smaller CSS payload for mobile users (most critical for your ad clicks)
2. Forces you to prioritize essential content
3. Progressive enhancement is more reliable than graceful degradation

**Source:** [BrowserStack Responsive Design Breakpoints](https://www.browserstack.com/guide/responsive-design-breakpoints)

---

## 3. Touch-Friendly Sizing

### WCAG 2.2 Requirements (Level AA)

**Minimum touch target: 24x24 CSS pixels**
**Recommended touch target: 44x44 CSS pixels** (Level AAA)

```css
/* Buttons - use 44px minimum for critical CTAs */
.cta-button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

/* All clickable elements */
a, button, [role="button"], input[type="submit"] {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Form inputs */
input, select, textarea {
  min-height: 44px;
  padding: 12px 16px;
}

/* Spacing between touch targets */
.button-group button {
  margin: 8px; /* Prevents accidental adjacent taps */
}
```

### Why 44px Not 24px

While WCAG 2.5.8 (Level AA) requires only 24px, use 44px because:
1. Apple Human Interface Guidelines recommend 44pt minimum
2. Google Material Design recommends 48dp minimum
3. Users with motor impairments or in unstable environments (bus, walking) need larger targets
4. Your conversion problem may be users struggling to tap small CTAs

**Source:** [W3C WCAG 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

---

## 4. Mobile Typography

### Font Size Requirements

```css
/* Base font size - NEVER below 16px */
html {
  font-size: 16px; /* 1rem = 16px */
}

body {
  font-size: 1rem; /* 16px */
  line-height: 1.5;
}

/* Headings with fluid scaling */
h1 {
  font-size: clamp(1.75rem, 5vw, 2.5rem); /* 28px - 40px */
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2rem); /* 24px - 32px */
}

h3 {
  font-size: clamp(1.25rem, 3vw, 1.5rem); /* 20px - 24px */
}

/* CRITICAL: Form inputs must be 16px+ to prevent iOS zoom */
input, select, textarea {
  font-size: 16px; /* Prevents iOS Safari auto-zoom on focus */
}
```

### Why 16px Minimum is Critical

**iOS Safari auto-zooms inputs under 16px.** When a user taps a form field with font-size below 16px, Safari zooms in. This:
1. Disorients users
2. Hides surrounding content
3. Requires manual zoom-out
4. Kills conversions

**DO NOT use this workaround:**
```html
<!-- AVOID - Accessibility violation -->
<meta name="viewport" content="maximum-scale=1.0">
```

Instead, just use `font-size: 16px` on inputs.

### Fluid Typography with clamp()

```css
/* clamp(minimum, preferred, maximum) */
.hero-title {
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
}
```

**Accessibility constraint:** Maximum must be <= 2.5x minimum to pass WCAG 1.4.4 zoom test.

**Source:** [CSS-Tricks: 16px or Larger Text Prevents iOS Form Zoom](https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/)

---

## 5. Preventing Horizontal Scroll

### Root Cause Fixes

```css
/* Global overflow protection */
html, body {
  max-width: 100%;
  overflow-x: hidden;
}

/* Alternative: wrapper approach (more reliable in some browsers) */
.page-wrapper {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  position: relative;
}

/* Responsive images - prevents overflow */
img, video, iframe {
  max-width: 100%;
  height: auto;
}

/* Responsive tables */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Fix vw unit scrollbar issue */
.full-width-section {
  width: 100%; /* NOT 100vw - vw includes scrollbar width */
}
```

### Common Overflow Culprits

| Culprit | Fix |
|---------|-----|
| `width: 100vw` | Change to `width: 100%` |
| Fixed pixel widths | Use `max-width` with percentage |
| Negative margins | Ensure parent has `overflow-x: hidden` |
| Absolute positioned elements | Add `overflow: hidden` to parent |
| iframes/embeds | Wrap in container with `max-width: 100%` |
| Tables | Wrap in scrollable container |

### Debugging Technique

```css
/* Temporarily add to find overflow source */
* {
  outline: 1px solid red !important;
}
```

This outlines every element so you can visually identify what extends beyond the viewport.

**Source:** [LogRocket: How to Prevent Overflow Scrolling in CSS](https://blog.logrocket.com/how-to-prevent-overflow-scrolling-css/)

---

## 6. Complete Mobile Reset Snippet

Copy this entire block to the top of your CSS:

```css
/* ===========================================
   MOBILE-FIRST RESPONSIVE FOUNDATION
   =========================================== */

/* Box-sizing reset */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Root settings */
html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}

/* Body reset */
body {
  margin: 0;
  padding: 0;
  max-width: 100%;
  overflow-x: hidden;
  font-size: 1rem;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Responsive media */
img, video, iframe, embed, object {
  max-width: 100%;
  height: auto;
}

/* Touch-friendly defaults */
a, button, input, select, textarea, [role="button"] {
  min-height: 44px;
  font-size: 16px; /* Prevents iOS zoom */
}

/* Button reset */
button {
  padding: 12px 24px;
  cursor: pointer;
  touch-action: manipulation; /* Removes 300ms tap delay */
}

/* Input reset */
input, select, textarea {
  padding: 12px 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 100%;
}

/* Tap highlight removal (optional) */
a, button {
  -webkit-tap-highlight-color: transparent;
}
```

---

## 7. Implementation Checklist

Apply these changes to your 226KB HTML file:

### Step 1: Viewport Meta Tag
- [ ] Add `<meta name="viewport" content="width=device-width, initial-scale=1.0">` in `<head>`
- [ ] Remove any `user-scalable=no` or `maximum-scale=1.0` if present

### Step 2: CSS Foundation
- [ ] Add mobile reset CSS snippet at top of styles
- [ ] Add `box-sizing: border-box` to all elements
- [ ] Set `overflow-x: hidden` on `html, body`

### Step 3: Typography
- [ ] Ensure body font-size is 16px minimum
- [ ] Set ALL input/select/textarea to `font-size: 16px`
- [ ] Use `clamp()` for headings if desired

### Step 4: Touch Targets
- [ ] Set CTA buttons to minimum 44x44px
- [ ] Add 8px+ spacing between adjacent tap targets
- [ ] Verify form inputs are at least 44px tall

### Step 5: Media
- [ ] Add `max-width: 100%` to all images
- [ ] Wrap tables in scrollable containers
- [ ] Check iframes/embeds for fixed widths

### Step 6: Test
- [ ] Use browser DevTools mobile view (Chrome: F12 > toggle device toolbar)
- [ ] Test on actual iPhone Safari (iOS zoom behavior)
- [ ] Debug with `* { outline: 1px solid red; }` if horizontal scroll persists

---

## Quick Reference Card

| Property | Mobile Value | Why |
|----------|--------------|-----|
| Viewport | `width=device-width, initial-scale=1.0` | Enables responsive design |
| Body font | 16px minimum | Readability, iOS zoom prevention |
| Input font | 16px exactly | Prevents iOS Safari auto-zoom |
| Touch targets | 44x44px minimum | Accessibility, usability |
| Line height | 1.4-1.6x font size | Readability |
| Button padding | 12px 24px | Touch-friendly |
| Input padding | 12px 16px | Touch-friendly |
| Images | `max-width: 100%` | Prevents overflow |
| Overflow | `overflow-x: hidden` on body | Prevents horizontal scroll |

---

## Sources

### Primary (HIGH Confidence)
- [MDN: Viewport Meta Tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag)
- [W3C WCAG 2.2: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)
- [MDN: CSS clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp)

### Supporting (MEDIUM Confidence)
- [CSS-Tricks: 16px Prevents iOS Form Zoom](https://css-tricks.com/16px-or-larger-text-prevents-ios-form-zoom/)
- [Smashing Magazine: Modern Fluid Typography](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/)
- [BrowserStack: Responsive Design Breakpoints](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [LogRocket: Prevent Overflow Scrolling](https://blog.logrocket.com/how-to-prevent-overflow-scrolling-css/)
- [LearnUI: Font Size Guidelines](https://www.learnui.design/blog/mobile-desktop-website-font-size-guidelines.html)
