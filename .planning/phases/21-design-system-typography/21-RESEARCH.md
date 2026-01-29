# Phase 21 Research: Design System & Typography Foundation

**Researched:** 2026-01-29
**Domain:** CSS Design Systems, Typography, Visual Identity
**Confidence:** HIGH

## Summary

This research establishes how to implement Phase 21's design system foundation: Geist Sans typography, fluid type scales, CSS design tokens, and diagonal visual elements. The phase replaces the current Outfit font with Geist Sans (Vercel's signature font), implements a proper fluid type scale using clamp(), and establishes a complete design token system.

Key findings:
- **Geist Sans** is available via CDN at `https://geistfont.vercel.app/geist.css` - simple one-line integration
- **Fluid typography** using Utopia-style clamp() formulas with rem units for accessibility
- **Design tokens** should follow an 8px grid system for spacing, with semantic naming
- **Diagonal elements** work best with pseudo-element skewY transforms (11 degrees is a good angle)
- **Performance** requires preloading the font and using `font-display: swap`

**Primary recommendation:** Use the Geist CDN for simplest integration, implement a 7-step fluid type scale, establish tokens in `:root` with semantic organization, and use skewY(-5deg) for subtle diagonal sections.

---

## Font Implementation

### Geist Sans Loading Options

| Method | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **Vercel CDN** | One-line, always updated, includes all weights | External dependency | **RECOMMENDED** |
| Google Fonts | Familiar, well-cached | Missing full glyph set and font-feature-settings | Not recommended |
| Self-host (WOFF2) | Full control, no external calls | Must manage updates | Alternative if CDN fails |

**CDN Implementation (HIGH confidence):**
```html
<link rel="preload" href="https://geistfont.vercel.app/geist.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://geistfont.vercel.app/geist.css"></noscript>
```

Source: [Vercel Font Page](https://vercel.com/font), [Geist CDN](https://geistfont.vercel.app/)

### Available Weights

Geist Sans includes 9 weights (variable font):
- Thin (100)
- Ultra Light (200)
- Light (300)
- **Regular (400)** — body text
- **Medium (500)** — emphasis, subheadings
- **Semi Bold (600)** — headings
- **Bold (700)** — hero headings, CTAs
- Black (800)
- Ultra Black (900)

**Recommended for BEAM (single font approach):**
- Body: 400 (Regular)
- Subheadings/emphasis: 500 (Medium)
- Section headings: 600 (Semi Bold)
- Hero/major headings: 700 (Bold)

### Fallback Stack

```css
:root {
  --font-primary: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

The system fonts provide good fallback metrics to minimize CLS during font swap.

---

## Type Scale

### Fluid Typography Formula

The clamp() function: `clamp(minimum, preferred, maximum)`

**Accessible pattern (HIGH confidence):**
```css
font-size: clamp(1rem, 0.93rem + 0.33vw, 1.19rem);
```

Key rules:
- **Use rem for min/max** — allows user zoom scaling
- **Keep vw contribution small** — prevents zoom from being blocked
- **Test at 200% zoom** — WCAG requirement

Source: [Smashing Magazine](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/), [Web.dev](https://web.dev/articles/baseline-in-action-fluid-type)

### Recommended Type Scale

Based on Utopia calculator with:
- Min viewport: 360px
- Max viewport: 1200px
- Base size: 18px (min) to 20px (max)
- Scale ratio: 1.2 (minor third) to 1.25 (major third)

```css
:root {
  /* Type Scale - Fluid */
  --text-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.84rem);    /* 12-13.5px */
  --text-sm: clamp(0.875rem, 0.84rem + 0.17vw, 0.975rem);  /* 14-15.6px */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);    /* 16-18px */
  --text-lg: clamp(1.125rem, 1.06rem + 0.33vw, 1.313rem);  /* 18-21px */
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);      /* 20-24px */
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);   /* 24-30px */
  --text-3xl: clamp(1.875rem, 1.65rem + 1.13vw, 2.5rem);   /* 30-40px */
  --text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3.25rem);    /* 36-52px */
  --text-5xl: clamp(2.75rem, 2.2rem + 2.75vw, 4.25rem);    /* 44-68px */
}
```

### Application Pattern

| Element | Token | Weight | Use |
|---------|-------|--------|-----|
| Body text | --text-base | 400 | Paragraphs, descriptions |
| Small text | --text-sm | 400 | Captions, metadata |
| Subheadings | --text-lg | 500 | Card titles, labels |
| Section titles | --text-2xl or --text-3xl | 600 | Section headings |
| Hero headline | --text-4xl or --text-5xl | 700 | Main hero text |

### Line Height Scale

```css
:root {
  --leading-tight: 1.2;    /* Headings */
  --leading-snug: 1.35;    /* Subheadings */
  --leading-normal: 1.6;   /* Body text */
  --leading-relaxed: 1.75; /* Long-form reading */
}
```

---

## Design Tokens Organization

### Token Structure (HIGH confidence)

Based on industry best practices (USWDS, Atlassian, GitLab design systems):

```css
:root {
  /* =====================
     1. SPACING SCALE (8px grid)
     ===================== */
  --space-1: 0.25rem;   /* 4px - micro adjustments */
  --space-2: 0.5rem;    /* 8px - tight spacing */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px - default */
  --space-5: 1.5rem;    /* 24px - comfortable */
  --space-6: 2rem;      /* 32px - section padding */
  --space-8: 3rem;      /* 48px - section gaps */
  --space-10: 4rem;     /* 64px - major sections */
  --space-12: 6rem;     /* 96px - hero spacing */

  /* =====================
     2. COLOR PALETTE
     ===================== */
  /* Brand Purple (Primary) */
  --color-purple-50: #faf5ff;
  --color-purple-100: #f3e8ff;
  --color-purple-200: #e9d5ff;
  --color-purple-300: #d8b4fe;
  --color-purple-400: #c084fc;
  --color-purple-500: #a855f7;
  --color-purple-600: #9333ea;
  --color-purple-700: #7c3aed;  /* Primary brand */
  --color-purple-800: #6b21a8;
  --color-purple-900: #581c87;

  /* Neutrals */
  --color-gray-50: #fafafa;
  --color-gray-100: #f4f4f5;
  --color-gray-200: #e4e4e7;
  --color-gray-300: #d4d4d8;
  --color-gray-400: #a1a1aa;
  --color-gray-500: #71717a;
  --color-gray-600: #52525b;
  --color-gray-700: #3f3f46;
  --color-gray-800: #27272a;
  --color-gray-900: #18181b;
  --color-white: #ffffff;
  --color-black: #000000;

  /* Semantic Colors */
  --color-primary: var(--color-purple-700);
  --color-primary-hover: var(--color-purple-800);
  --color-primary-light: var(--color-purple-100);
  --color-text: var(--color-gray-800);
  --color-text-muted: var(--color-gray-500);
  --color-text-inverted: var(--color-white);
  --color-background: var(--color-white);
  --color-background-alt: var(--color-gray-50);
  --color-border: var(--color-gray-200);

  /* Accent (for visual pop) */
  --color-accent: #f97316;  /* Warm orange - sharp contrast to purple */

  /* =====================
     3. SHADOW SCALE
     ===================== */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.15);

  /* Brand shadows (purple tinted) */
  --shadow-purple-sm: 0 4px 14px rgba(124, 58, 237, 0.12);
  --shadow-purple-md: 0 8px 25px rgba(124, 58, 237, 0.18);
  --shadow-purple-lg: 0 16px 40px rgba(124, 58, 237, 0.22);

  /* =====================
     4. TYPOGRAPHY
     ===================== */
  --font-primary: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* =====================
     5. BORDERS & RADIUS
     ===================== */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* =====================
     6. TRANSITIONS
     ===================== */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
  --transition-bounce: 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

Source: [Penpot Guide](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/), [USWDS](https://designsystem.digital.gov/design-tokens/spacing-units/)

---

## Premium Visual Patterns

### What Makes Vercel/Linear/Stripe Look Premium (HIGH confidence)

Based on analysis of these sites:

| Pattern | Implementation | Impact |
|---------|---------------|--------|
| **Generous whitespace** | Use --space-10 to --space-12 between sections | Creates luxury, breathing room |
| **Precise typography** | Consistent scale, proper hierarchy | Professional, intentional |
| **Restrained color** | 1-2 colors max, large areas of white/dark | Sophisticated |
| **Subtle shadows** | Soft, layered shadows (not harsh drop-shadows) | Depth without gimmicks |
| **Micro-interactions** | Hover state transforms, smooth transitions | Polish |
| **Sharp contrast** | High contrast text, clear CTAs | Confidence |

### Concrete CSS Techniques

**1. Premium Button Style:**
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-semibold);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  border: none;
  box-shadow: var(--shadow-purple-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-purple-md);
}
```

**2. Premium Card Style:**
```css
.card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

**3. Section Spacing:**
```css
.section {
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
}

@media (max-width: 768px) {
  .section {
    padding-top: var(--space-8);
    padding-bottom: var(--space-8);
  }
}
```

Source: [Azuro Digital SaaS Analysis](https://azurodigital.com/saas-website-examples/), [WebStacks Best Practices](https://www.webstacks.com/blog/saas-website-best-practices)

---

## Angular/Diagonal Elements

### Implementation Approaches (HIGH confidence)

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **skewY on pseudo-element** | Clean edges, content unaffected | Requires padding calculation | Section dividers |
| **clip-path: polygon()** | Simple, no padding math | Can clip content if not careful | Images, hero sections |
| **SVG background** | Most flexible | Adds file dependency | Complex shapes |

### Recommended: Pseudo-Element skewY

**The Formula:**
```
padding-needed = tan(angle) × (viewport-width / 2)
```

For 5 degrees: magic number = 0.0437 (tan(5°)/2)
For 11 degrees: magic number = 0.0972 (tan(11°)/2)

**CSS Implementation:**
```css
:root {
  --angle-degrees: 5deg;
  --magic-number: 0.0437;  /* tan(5°)/2 */
}

.diagonal-section {
  position: relative;
  padding: calc(100vw * var(--magic-number) + var(--space-10)) 0;
}

.diagonal-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-purple-700);
  transform: skewY(calc(-1 * var(--angle-degrees)));
  transform-origin: top left;
  z-index: -1;
}
```

**Alternative: clip-path (simpler)**
```css
.diagonal-hero {
  clip-path: polygon(0 0, 100% 0, 100% 95%, 0 100%);
}
```

### Recommended Angle

- **5 degrees** — Subtle, professional, easy to implement (recommended for BEAM)
- 11 degrees — More dramatic, requires more padding
- 3 degrees — Very subtle, almost unnoticeable

Source: [9elements](https://9elements.com/blog/create-diagonal-layouts-like-its-2020/), [CSS-Tricks](https://css-tricks.com/create-diagonal-layouts-like-its-2020/)

---

## Performance Considerations

### Font Loading Impact on LCP (HIGH confidence)

**Problem:** Web fonts can delay LCP if text is invisible during load (FOIT)

**Solution Stack:**
1. **Preload the font CSS** — Discovers font early
2. **Use font-display: swap** — Shows fallback immediately
3. **Match fallback metrics** — Reduces CLS when font swaps

**Implementation:**
```html
<head>
  <!-- Preconnect to font CDN -->
  <link rel="preconnect" href="https://geistfont.vercel.app" crossorigin>

  <!-- Preload font stylesheet -->
  <link rel="preload" href="https://geistfont.vercel.app/geist.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="https://geistfont.vercel.app/geist.css">
  </noscript>
</head>
```

### Testing Checklist

Before/after each change, verify:
- [ ] LCP remains under 2.5s (target: maintain current 0.9s)
- [ ] CLS stays under 0.1
- [ ] Text visible within 100ms (no FOIT)
- [ ] Fallback font similar to Geist (minimal swap flash)

### Performance Budget

| Metric | Target | Warning |
|--------|--------|---------|
| LCP | < 1.5s | > 2.0s |
| CLS | < 0.05 | > 0.1 |
| Font load time | < 500ms | > 1s |

Source: [Web.dev Font Best Practices](https://web.dev/articles/font-best-practices), [DebugBear](https://www.debugbear.com/blog/preload-web-fonts)

---

## Recommendations for Planner

### Task Sequence

1. **Foundation first:** Add design token CSS custom properties to :root
2. **Typography second:** Load Geist, apply type scale
3. **Colors third:** Migrate existing colors to semantic tokens
4. **Visual differentiator last:** Add diagonal section divider

### Specific Recommendations

| Area | Recommendation | Rationale |
|------|----------------|-----------|
| Font loading | Use Vercel CDN with preload | Simplest, always current |
| Type scale | 7 steps (-xs to 4xl) | Covers all use cases |
| Angle for diagonals | 5 degrees | Subtle but noticeable |
| Accent color | Warm orange #f97316 | Sharp contrast to purple |
| Spacing base | 8px grid | Industry standard |

### Don't Hand-Roll

| Problem | Use Instead | Why |
|---------|-------------|-----|
| Type scale calculation | Utopia calculator output | Math is complex, accessible patterns exist |
| Font loading strategy | Established preload pattern | Performance pitfalls are subtle |
| Color accessibility | Contrast checker tools | WCAG compliance is precise |
| Diagonal padding math | Use CSS tan() or magic number | Easy to get wrong |

### Testing Points

After implementation, verify:
1. Text remains readable on mobile (test on real device)
2. Parent audience (40-55) can comfortably read body text
3. LCP hasn't regressed (run Lighthouse)
4. Diagonal sections don't clip content
5. Hover states feel responsive (not sluggish)

---

## Sources

### Primary (HIGH confidence)
- [Vercel Font Official](https://vercel.com/font) — Geist implementation
- [Geist CDN](https://geistfont.vercel.app/) — CDN loading
- [Web.dev Font Best Practices](https://web.dev/articles/font-best-practices) — Performance
- [Smashing Magazine Fluid Typography](https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/) — clamp() formulas
- [9elements Diagonal Layouts](https://9elements.com/blog/create-diagonal-layouts-like-its-2020/) — skewY implementation

### Secondary (MEDIUM confidence)
- [Utopia Type Scale Calculator](https://utopia.fyi/type/calculator/) — Scale values
- [USWDS Spacing Tokens](https://designsystem.digital.gov/design-tokens/spacing-units/) — Token organization
- [Penpot Design Tokens Guide](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) — CSS custom properties

### Tertiary (LOW confidence - validate)
- Premium SaaS patterns from blog analysis — may be subjective

---

## Metadata

**Confidence breakdown:**
- Font implementation: HIGH — official Vercel documentation
- Type scale: HIGH — established Utopia patterns, well-documented
- Design tokens: HIGH — industry standards (USWDS, Atlassian)
- Visual patterns: MEDIUM — based on analysis, somewhat subjective
- Diagonal elements: HIGH — well-documented CSS techniques
- Performance: HIGH — Core Web Vitals best practices

**Research date:** 2026-01-29
**Valid until:** 2026-03-01 (30 days — stable patterns)

---

*Research completed: 2026-01-29*
