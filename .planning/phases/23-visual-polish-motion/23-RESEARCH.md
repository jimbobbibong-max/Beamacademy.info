# Phase 23: Visual Polish & Motion - Research

**Researched:** 2026-01-30
**Domain:** CSS animations, visual effects, micro-interactions
**Confidence:** HIGH (verified with MDN, official Chrome blog, and authoritative sources)

## Summary

Phase 23 requires implementing visual polish and motion enhancements based on Frontend Design Skill critique: bolder hero tilt, background texture, grid-breaking elements, brutalist CTA styling, and page load animations with staggered reveals.

The CSS animation landscape in 2025/2026 offers excellent native solutions. The `@starting-style` at-rule (86% browser support) enables pure-CSS page load animations. SVG `feTurbulence` filters provide performant grain texture without image files. Brutalist button styling uses simple `box-shadow` with no blur. All techniques use `transform` and `opacity` only, ensuring MOT-04 compliance.

**Primary recommendation:** Use `@starting-style` for page load entry animations with staggered `animation-delay` via CSS custom properties. Implement grain texture via inline SVG filter. Apply brutalist offset shadows to CTAs. Maintain performance guardrails throughout.

---

## Standard Stack

The established techniques for this domain:

### Core CSS Features (Native - No Libraries)
| Feature | Support | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@starting-style` | 86% (Baseline) | Page load entry animations | Native CSS, no JS required |
| `transition` | 98%+ | State changes, hover effects | GPU-accelerated with transform/opacity |
| `@keyframes` | 98%+ | Complex animation sequences | Full control over timing |
| `animation-delay` | 98%+ | Staggered reveals | Simple calc() with CSS vars |
| `prefers-reduced-motion` | 98%+ | Accessibility | Mandatory for all animations |

### Supporting Techniques
| Technique | Purpose | When to Use |
|-----------|---------|-------------|
| SVG `feTurbulence` filter | Grain/noise texture | Background depth without images |
| CSS custom properties | Animation stagger timing | Reusable delay calculations |
| Intersection Observer | Scroll-triggered reveals | Elements entering viewport |
| `will-change` (sparingly) | Performance optimization | Only on actively animating elements |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@starting-style` | JS-based class toggle | Lower browser support vs. more control |
| `sibling-index()` | Manual CSS vars | `sibling-index()` is Chromium-only (not recommended) |
| JS animation libraries | Native CSS | CSS is CSS-only per MOT-03, better performance |

---

## Architecture Patterns

### Pattern 1: Page Load Animation with `@starting-style`

**What:** CSS-only entry animation when elements first render
**When to use:** Hero section, above-the-fold elements
**Browser support:** 86% (Firefox 129+, Chrome 117+, Safari 17.5+)

```css
/* Source: MDN @starting-style documentation */
.hero-text {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  @starting-style {
    opacity: 0;
    transform: translateY(20px);
  }
}

/* Staggered children using CSS custom properties */
.hero-text > *:nth-child(1) { transition-delay: 0ms; }
.hero-text > *:nth-child(2) { transition-delay: 100ms; }
.hero-text > *:nth-child(3) { transition-delay: 200ms; }
.hero-text > *:nth-child(4) { transition-delay: 300ms; }
```

**Critical ordering:** `@starting-style` rules MUST come after normal declarations (Chrome 130+ requirement).

### Pattern 2: Scroll-Triggered Reveals with Intersection Observer

**What:** Minimal JS to add class when element enters viewport
**When to use:** Below-the-fold sections, content that scrolls into view

```javascript
// Source: MDN Intersection Observer API
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target); // Animate once only
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

```css
/* CSS handles the animation */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.reveal.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

### Pattern 3: Grain Texture via SVG Filter

**What:** Subtle noise overlay for background depth
**When to use:** Hero background, section backgrounds

```html
<!-- Inline SVG filter - no network request -->
<svg style="position:absolute;width:0;height:0;">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" />
    <feColorMatrix type="saturate" values="0" />
  </filter>
</svg>
```

```css
/* Source: CSS-Tricks Grainy Gradients */
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,..."); /* Or reference #grain filter */
  opacity: 0.03; /* Very subtle - 3% opacity */
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

**Performance note:** SVG filter is more performant than loading a texture image (no network request, smaller footprint).

### Pattern 4: Brutalist Button with Offset Shadow

**What:** Hard-edged offset shadow without blur
**When to use:** Primary CTAs to create visual prominence

```css
/* Source: Multiple brutalist/neobrutalist guides */
.btn-brutalist {
  background: white;
  color: var(--purple-700);
  border: 3px solid var(--gray-900);
  box-shadow: 4px 4px 0 var(--gray-900);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-brutalist:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--gray-900);
}

.btn-brutalist:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--gray-900);
}
```

### Anti-Patterns to Avoid

- **Animating width/height/margin:** Triggers layout recalculation, causes jank
- **Using `will-change` on everything:** Promotes too many layers, uses excess memory
- **Opacity:0 on LCP elements:** Chrome ignores 0-opacity elements for LCP measurement (use 0.01 minimum)
- **Ignoring prefers-reduced-motion:** Accessibility violation, fails WCAG
- **`sibling-index()` for production:** Chromium-only (not cross-browser ready)

---

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Page load animation | Custom JS timing | `@starting-style` | Native CSS, no JS, compositor thread |
| Scroll reveals | Manual scroll listeners | Intersection Observer | Performance optimized, debounced |
| Grain texture | Load PNG/JPG texture | SVG `feTurbulence` | Zero network request, smaller bundle |
| Staggered delays | JS loop over elements | CSS `:nth-child` + vars | Pure CSS, no render blocking |
| Animation timing | Linear or `ease` | Named cubic-bezier | Professional feel, physics-based |

**Key insight:** All required animations can be achieved with CSS-only or minimal JS (Intersection Observer). No animation libraries needed (GSAP, Framer Motion, etc.) - this keeps bundle size minimal and satisfies MOT-03.

---

## Common Pitfalls

### Pitfall 1: LCP Delay from Opacity Animation
**What goes wrong:** Hero text has `opacity: 0` at start, Chrome doesn't count it as LCP candidate
**Why it happens:** Chrome ignores elements with `opacity: 0` for LCP measurement
**How to avoid:** Use `opacity: 0.01` instead of `0` for starting state
**Warning signs:** LCP metric suddenly gets worse after adding animations

### Pitfall 2: `@starting-style` Ordering
**What goes wrong:** Animation doesn't play on page load
**Why it happens:** `@starting-style` must come AFTER normal declarations (Chrome 130+)
**How to avoid:** Always place `@starting-style` block at end of rule
**Warning signs:** Works in Firefox but not Chrome

### Pitfall 3: CLS from Grid-Breaking Elements
**What goes wrong:** Elements overflow container, cause horizontal scroll or layout shift
**Why it happens:** Negative margins or `position: absolute` without proper containment
**How to avoid:** Use `overflow: hidden` on parent, or CSS Grid named lines for breakouts
**Warning signs:** Horizontal scrollbar appears, CLS score increases

### Pitfall 4: Animation on Reduced Motion
**What goes wrong:** Users with vestibular disorders see animations
**Why it happens:** Developer forgot `prefers-reduced-motion` media query
**How to avoid:** Always include reduced motion styles (set duration to 0.01ms)
**Warning signs:** No `@media (prefers-reduced-motion)` in stylesheet

### Pitfall 5: Overusing will-change
**What goes wrong:** High memory usage, browser creates too many compositor layers
**Why it happens:** Applying `will-change` to many elements "just in case"
**How to avoid:** Only add `will-change` to actively animating elements, remove after animation
**Warning signs:** Memory usage spikes, animations become janky

---

## Code Examples

### Example 1: Complete Page Load Animation System

```css
/* Source: Chrome Developer Blog + MDN */

/* Base transition setup for all animatable elements */
.animate-on-load {
  transition:
    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Entry animation using @starting-style */
.animate-on-load {
  opacity: 1;
  transform: translateY(0);

  @starting-style {
    opacity: 0.01; /* Not 0, to preserve LCP candidacy */
    transform: translateY(20px);
  }
}

/* Staggered delays using CSS custom properties */
.stagger-1 { transition-delay: calc(var(--stagger-base, 80ms) * 1); }
.stagger-2 { transition-delay: calc(var(--stagger-base, 80ms) * 2); }
.stagger-3 { transition-delay: calc(var(--stagger-base, 80ms) * 3); }
.stagger-4 { transition-delay: calc(var(--stagger-base, 80ms) * 4); }

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-on-load {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

### Example 2: SVG Grain Texture Background

```html
<!-- Place once in document, hidden -->
<svg class="sr-only" aria-hidden="true">
  <filter id="grain-filter">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.65"
      numOctaves="3"
      stitchTiles="stitch"
    />
    <feColorMatrix type="saturate" values="0" />
  </filter>
</svg>
```

```css
/* Source: CSS-Tricks Grainy Gradients */
.hero {
  position: relative;
  background: var(--purple-50);
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  opacity: 0.04;
  pointer-events: none;
  mix-blend-mode: multiply;
}
```

### Example 3: Brutalist CTA Button

```css
/* Source: Neobrutalism design patterns */
.btn-cta {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;

  /* Brutalist styling */
  background: var(--white);
  color: var(--purple-700);
  border: 3px solid var(--gray-900);
  border-radius: var(--radius-md);
  box-shadow: 4px 4px 0 var(--gray-900);

  /* Smooth transition */
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
}

.btn-cta:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--gray-900);
}

.btn-cta:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--gray-900);
}

.btn-cta:focus-visible {
  outline: none;
  box-shadow: 6px 6px 0 var(--gray-900), 0 0 0 3px var(--purple-300);
}
```

### Example 4: Hover Micro-Interactions

```css
/* Source: UI/UX best practices */

/* Card hover lift */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Button scale on hover */
.btn-secondary:hover {
  transform: scale(1.02);
}

/* Link underline animation */
.text-link {
  position: relative;
}

.text-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.2s ease;
}

.text-link:hover::after {
  width: 100%;
}
```

### Example 5: Scroll Reveal (Intersection Observer)

```javascript
// Minimal JS for scroll reveals - satisfies MOT-03 (CSS handles animation)
(function() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('revealed');
    });
  }
})();
```

```css
/* CSS animation - no JS animation logic */
.reveal-on-scroll {
  opacity: 0.01;
  transform: translateY(30px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.reveal-on-scroll.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
.reveal-on-scroll > *:nth-child(1) { transition-delay: 0ms; }
.reveal-on-scroll > *:nth-child(2) { transition-delay: 80ms; }
.reveal-on-scroll > *:nth-child(3) { transition-delay: 160ms; }
```

---

## Easing Functions Reference

Recommended easing curves for different use cases:

| Use Case | Easing | Duration | CSS |
|----------|--------|----------|-----|
| Micro-interactions | Snappy | 150ms | `cubic-bezier(0.4, 0, 1, 1)` |
| UI transitions | Material | 200-250ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Page load reveals | Smooth out | 500-600ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Hover states | Quick | 150-200ms | `ease` or `cubic-bezier(0.4, 0, 0.2, 1)` |
| Bouncy effects | Overshoot | 400-500ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

**MOT-04 compliance:** All UI transitions should be 150-300ms. Page load animations can be longer (up to 600ms) as they occur once.

---

## Warm Accent Color Integration

**Context:** User rejected lime accent. Critique suggests gold (#f59e0b) or coral (#f97316) to break purple monotony.

### Recommended Approach: Strategic Coral Accents

| Element | Current | With Accent |
|---------|---------|-------------|
| Hero "Climb" text | Purple-600 | Keep purple (brand anchor) |
| Trust badges | Gray | Coral border/icon |
| Testimonial quotes | Purple | Coral quote marks |
| Section dividers | None | Subtle coral line |
| CTA hover glow | Purple | Consider coral glow |

**60-30-10 Rule Application:**
- 60% — Purple (dominant brand)
- 30% — Neutrals (gray, white)
- 10% — Coral accent (strategic highlights only)

**Best placement for coral accent:** Trust signals and testimonials (creates warmth, approachability) rather than primary CTAs (which should remain on-brand purple).

---

## Grid-Breaking Techniques

### Approach 1: Negative Margins with Overflow Hidden

```css
/* Hero mockup breaks out of container */
.hero-visual {
  position: relative;
  margin-right: -60px; /* Overflow right edge */
}

/* Parent contains overflow */
.hero {
  overflow-x: hidden; /* Prevents horizontal scroll */
}
```

### Approach 2: CSS Grid Named Lines (Cleaner)

```css
.page-grid {
  display: grid;
  grid-template-columns:
    [full-start] 1fr
    [content-start] min(1200px, 100% - 48px)
    [content-end] 1fr
    [full-end];
}

.content { grid-column: content; }
.breakout { grid-column: full; }
```

---

## Performance Guardrails

### Animation Performance Tier List

| Tier | Properties | Performance |
|------|------------|-------------|
| S-Tier | `transform`, `opacity` | GPU-accelerated, compositor thread |
| A-Tier | `filter`, `clip-path` | GPU but may trigger paint |
| Avoid | `width`, `height`, `margin`, `padding`, `top/left` | Triggers layout, janky |

### LCP Protection Checklist

- [ ] Hero text starts at `opacity: 0.01` not `0`
- [ ] No `will-change: opacity` on LCP elements before load
- [ ] Fonts preloaded with `font-display: swap`
- [ ] Animation delay doesn't exceed 100ms for LCP content

### CLS Protection Checklist

- [ ] All animated elements have explicit dimensions
- [ ] Grid-breaking elements use `overflow: hidden` on parent
- [ ] No `position: absolute` without fixed container dimensions
- [ ] Font fallback metrics defined to prevent text shift

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JS class toggle for entry | `@starting-style` | 2024 (Baseline) | No JS needed |
| Scroll listeners | Intersection Observer | 2019 (mature) | Better performance |
| PNG noise textures | SVG `feTurbulence` | Always available | Zero network request |
| GSAP/Anime.js | Native CSS | 2024+ | No library dependency |
| `sibling-index()` stagger | CSS `:nth-child` + vars | 2025 (experimental) | Cross-browser ready now |

**Deprecated/outdated:**
- `sibling-index()`/`sibling-count()`: Chromium-only, not production-ready (use `:nth-child` instead)
- jQuery animate: Ancient, use CSS transitions
- Scroll event listeners: Use Intersection Observer

---

## Open Questions

Things that couldn't be fully resolved:

1. **Hero tilt angle: -6deg vs -4deg?**
   - What we know: Current -2deg is "timid" per critique, -6deg suggested
   - What's unclear: -6deg may feel too aggressive on smaller screens
   - Recommendation: Test -4deg as middle ground, gather feedback

2. **Warm accent placement**
   - What we know: Coral/gold breaks purple monotony
   - What's unclear: Where exactly to apply without clashing
   - Recommendation: Start with testimonial quotes and trust badges only

3. **Scroll reveal threshold**
   - What we know: Intersection Observer with 0.1 threshold is standard
   - What's unclear: Optimal rootMargin for this specific layout
   - Recommendation: Test `-50px` bottom margin for earlier trigger

---

## Sources

### Primary (HIGH confidence)
- [MDN @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style) - Entry animation syntax and ordering
- [Chrome Developer Blog: Entry Exit Animations](https://developer.chrome.com/blog/entry-exit-animations) - Official Chrome guidance
- [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Scroll reveal API
- [CSS-Tricks Grainy Gradients](https://css-tricks.com/grainy-gradients/) - SVG noise technique
- [MDN CSS Performance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS) - Performance best practices

### Secondary (MEDIUM confidence)
- [Josh W. Comeau @starting-style Gotcha](https://www.joshwcomeau.com/css/starting-style/) - Ordering requirements
- [DebugBear LCP Opacity](https://www.debugbear.com/blog/opacity-animation-poor-lcp) - LCP with animations
- [Easings.net](https://easings.net/) - Easing function reference
- [Frontend Masters Staggered Animation](https://frontendmasters.com/blog/staggered-animation-with-css-sibling-functions/) - Sibling functions (experimental)

### Tertiary (LOW confidence - WebSearch only)
- Various 2025 design trend articles - Color palette recommendations
- Neobrutalism design guides - Offset shadow patterns

---

## Metadata

**Confidence breakdown:**
- Animation patterns: HIGH - MDN, Chrome official docs
- Grain texture: HIGH - CSS-Tricks, well-documented technique
- Brutalist buttons: MEDIUM - Multiple sources agree on pattern
- Color accent placement: LOW - Design opinion, needs user feedback
- Performance guardrails: HIGH - Core Web Vitals documentation

**Research date:** 2026-01-30
**Valid until:** 2026-03-01 (60 days - stable techniques, not fast-moving)
