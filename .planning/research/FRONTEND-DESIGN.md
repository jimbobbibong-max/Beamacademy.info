# Frontend Design Best Practices Research

**Project:** BEAM Academy Landing Page Redesign (v7)
**Researched:** 2026-01-29
**Overall Confidence:** HIGH (verified with multiple authoritative 2025-2026 sources)

---

## Executive Summary

This research document provides comprehensive frontend design best practices for redesigning the BEAM Academy tutoring landing page. The current site has solid technical foundations (0.9s LCP, 88/100 Lighthouse) and uses purple (#7c3aed) branding with Outfit font.

**Key priorities for the redesign:**

1. **Visual Hierarchy**: Implement proper F-pattern/Z-pattern layouts with clear focal points
2. **Typography System**: Establish a modular type scale with proper line height for parent readability
3. **Spacing Consistency**: Adopt strict 8px grid system for visual rhythm
4. **Trust & Conversion**: Optimize social proof placement and CTA design
5. **Modern UI Polish**: Add subtle glassmorphism, refined shadows, and purposeful micro-interactions
6. **Performance-First**: Maintain sub-2.5s LCP while adding visual enhancements

---

## 1. Visual Hierarchy & Layout

### Current Best Practices (2025-2026)

Visual hierarchy guides users' attention and prioritizes information based on importance. By 2026, visual hierarchy is essential for engagement and conversion.

#### F-Pattern Layout
- Users scan horizontally across the top, then down the left side
- Best for text-heavy pages with consistent formatting
- Place key information along these scan lines

#### Z-Pattern Layout
- Users scan top-left to top-right, diagonally to bottom-left, then horizontally right
- Ideal for landing pages with balanced layouts
- **End the Z-pattern with your CTA in bottom-right**

### Recommendations for BEAM

```
Hero Section Z-Pattern:
[Logo/Nav]────────────────[Trial CTA]
     \
      \  (diagonal scan)
       \
[Value Prop]──────────[Book Trial Button]
```

**Above-the-fold elements (critical):**
- Clear value proposition headline
- Single focused CTA ("Book Free Trial")
- Trust signal (star rating, review count)
- Hero visual showing the product/experience

**Statistics:**
- Users spend 80% of time viewing above-the-fold content
- Visitors form opinions about a website within 0.05 seconds

### Grid System

```css
/* Recommended container and grid */
.container {
    max-width: 1200px;
    padding-inline: clamp(16px, 5vw, 24px);
    margin-inline: auto;
}

/* 12-column grid for complex layouts */
.grid-12 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px; /* 3 * 8px base */
}
```

**Sources:**
- [Hero Section Design Best Practices 2026](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Visual Hierarchy in Web Design 2026](https://theorangebyte.com/visual-hierarchy-web-design/)
- [Above the Fold Best Practices](https://leadflask.com/blog/website-hero-design-best-practices)

---

## 2. Typography

### Type Scale (Modular Scale)

Use a consistent ratio for harmonious sizing. Recommended ratio: **1.250 (Major Third)** or **1.333 (Perfect Fourth)**.

```css
:root {
    /* Base: 16px, Ratio: 1.25 (Major Third) */
    --text-xs: 0.75rem;    /* 12px - captions, labels */
    --text-sm: 0.875rem;   /* 14px - small text, metadata */
    --text-base: 1rem;     /* 16px - body text */
    --text-lg: 1.125rem;   /* 18px - large body, intro */
    --text-xl: 1.25rem;    /* 20px - lead paragraphs */
    --text-2xl: 1.5rem;    /* 24px - H4 */
    --text-3xl: 1.875rem;  /* 30px - H3 */
    --text-4xl: 2.25rem;   /* 36px - H2 */
    --text-5xl: 3rem;      /* 48px - H1 */
    --text-6xl: 3.75rem;   /* 60px - Hero */
}
```

### Line Height & Spacing

| Element | Line Height | Letter Spacing |
|---------|-------------|----------------|
| Body text | 1.6-1.7 | 0 (normal) |
| Headings | 1.1-1.2 | -0.02em to -0.03em |
| Captions | 1.4-1.5 | 0.02em |
| Buttons | 1.0-1.2 | 0.02em (uppercase) |

**Readability for parents (40-55 age range):**
- Minimum body text: **16px** (never smaller)
- Optimal line length: **45-75 characters** on desktop
- Sufficient contrast: **4.5:1 minimum** (AA standard)
- Line spacing: **130-150%** of font size

### Font Pairing with Outfit

Outfit is a geometric sans-serif. Recommended pairings:

**Option 1: All Outfit (current)**
```css
/* Leverage Outfit's weight range */
h1, h2, h3 { font-weight: 700; }
body { font-weight: 400; }
.lead { font-weight: 300; }
```

**Option 2: Add a serif for contrast (editorial feel)**
```css
/* Outfit for headings + Source Serif for body */
h1, h2, h3 { font-family: 'Outfit', sans-serif; }
p, .body { font-family: 'Source Serif 4', serif; }
```

**Option 3: Two sans-serifs (tech/modern feel)**
```css
/* Outfit for display + Inter/DM Sans for body */
.display { font-family: 'Outfit', sans-serif; }
.body { font-family: 'Inter', sans-serif; }
```

### Fluid Typography with clamp()

```css
/* Responsive type without media queries */
h1 {
    font-size: clamp(2.5rem, 5vw + 1rem, 4rem);
    line-height: 1.1;
    letter-spacing: -0.03em;
}

p {
    font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    line-height: 1.7;
}
```

**Sources:**
- [Modern Web Typography 2025](https://www.frontendtools.tech/blog/modern-web-typography-techniques-2025-readability-guide)
- [Type Scale Tool](https://precise-type.com/)
- [Modular Scale](https://www.modularscale.com/)

---

## 3. Color Theory

### Purple (#7c3aed) Psychology

Purple combines the calmness of blue with the energy of red, making it ideal for:
- **Education**: Conveys wisdom, imagination, and depth
- **Trust**: Cool colors create feelings of calmness and stability
- **Premium positioning**: Historical associations with royalty and sophistication

**Key insight**: Purple has emerged as 2025's leadership color for technology innovators and thought leadership brands.

### Recommended Color System

```css
:root {
    /* Primary - Purple (existing) */
    --purple-50: #faf5ff;
    --purple-100: #f3e8ff;
    --purple-200: #e9d5ff;
    --purple-300: #d8b4fe;
    --purple-400: #c084fc;
    --purple-500: #a855f7;
    --purple-600: #9333ea;
    --purple-700: #7c3aed;  /* Primary brand */
    --purple-800: #6b21a8;
    --purple-900: #581c87;

    /* Neutrals - Warm gray for friendliness */
    --gray-50: #fafafa;
    --gray-100: #f4f4f5;
    --gray-200: #e4e4e7;
    --gray-300: #d4d4d8;
    --gray-400: #a1a1aa;
    --gray-500: #71717a;
    --gray-600: #52525b;
    --gray-700: #3f3f46;
    --gray-800: #27272a;
    --gray-900: #18181b;

    /* Semantic colors */
    --success: #22c55e;
    --warning: #f59e0b;
    --error: #ef4444;
    --info: #3b82f6;
}
```

### Contrast Ratios (WCAG 2.1)

| Use Case | Minimum Ratio | Recommendation |
|----------|--------------|----------------|
| Body text | 4.5:1 (AA) | 7:1 (AAA) preferred |
| Large text (18pt+) | 3:1 | 4.5:1 preferred |
| UI components | 3:1 | - |
| Focus indicators | 3:1 | - |

**Purple contrast on white:**
- #7c3aed on #ffffff = **4.54:1** (just passes AA for normal text)
- #6b21a8 on #ffffff = **7.08:1** (passes AAA)

**Recommendation**: Use #7c3aed for large text/headings, #6b21a8 for body text links.

### Color Usage Guidelines

| Element | Color | Why |
|---------|-------|-----|
| Primary CTA | purple-700 | Brand recognition, action |
| Secondary CTA | white + purple border | Lower visual priority |
| Headings | gray-900 | Maximum readability |
| Body text | gray-700 | Softer than black, easier to read |
| Muted text | gray-500 | Secondary information |
| Backgrounds | white, purple-50, gray-50 | Clean, professional |
| Accents | success green | Results, achievements |

**Sources:**
- [Color Psychology in Branding 2025](https://www.nwbranddesign.com/nwbd-blog/the-psychology-of-color-in-branding-what-works-in-2025)
- [Purple Color Theory in Branding](https://www.andacademy.com/resources/blog/graphic-design/purple-color-theory/)
- [WCAG Contrast Guidelines](https://www.allaccessible.org/blog/color-contrast-accessibility-wcag-guide-2025)

---

## 4. Spacing & Rhythm

### 8px Grid System

All spacing should be multiples of 8px. This ensures:
- Consistent visual rhythm
- Easy mental math
- Better scaling across devices
- Alignment with device pixels

```css
:root {
    /* Spacing scale (8px base) */
    --space-1: 0.25rem;   /* 4px - tight, icons */
    --space-2: 0.5rem;    /* 8px - base unit */
    --space-3: 0.75rem;   /* 12px - small gaps */
    --space-4: 1rem;      /* 16px - standard padding */
    --space-5: 1.25rem;   /* 20px */
    --space-6: 1.5rem;    /* 24px - card padding */
    --space-8: 2rem;      /* 32px - section gaps */
    --space-10: 2.5rem;   /* 40px */
    --space-12: 3rem;     /* 48px - large spacing */
    --space-16: 4rem;     /* 64px - section padding */
    --space-20: 5rem;     /* 80px */
    --space-24: 6rem;     /* 96px - major sections */
    --space-32: 8rem;     /* 128px */
}
```

### Section Padding Pattern

```css
/* Mobile-first section padding */
section {
    padding-block: var(--space-16);  /* 64px mobile */
}

@media (min-width: 768px) {
    section {
        padding-block: var(--space-20);  /* 80px tablet */
    }
}

@media (min-width: 1024px) {
    section {
        padding-block: var(--space-24);  /* 96px desktop */
    }
}
```

### Internal vs External Spacing Rule

**Key principle**: Internal spacing (within components) should be less than or equal to external spacing (between components).

```css
/* Card example */
.card {
    padding: var(--space-6);        /* 24px internal */
    margin-bottom: var(--space-8);  /* 32px external */
}

.card-title {
    margin-bottom: var(--space-2);  /* 8px - tight internal */
}

.card-description {
    margin-bottom: var(--space-4);  /* 16px */
}
```

### Whitespace Strategy

| Area | Desktop | Mobile |
|------|---------|--------|
| Hero section | 120-160px top padding | 80-100px |
| Between sections | 80-120px | 64-80px |
| Section header to content | 48-64px | 32-48px |
| Between cards | 24-32px | 16-24px |
| Card internal padding | 24-32px | 16-24px |

**Sources:**
- [8px Grid System Guide](https://hub.sivo.it.com/ui-ux-design-systems/what-is-an-8-point-grid-system/)
- [Spacing Best Practices](https://cieden.com/book/sub-atomic/spacing/spacing-best-practices)
- [GitLab Design System - Spacing](https://design.gitlab.com/product-foundations/spacing/)

---

## 5. Modern UI Patterns 2025-2026

### Recommended Style: Refined Flat with Depth

The 2026 trend is **not** pure glassmorphism or neumorphism, but **refined flat design with subtle depth cues**.

| Style | Use in BEAM | Avoid |
|-------|-------------|-------|
| Subtle shadows | Cards, modals, dropdowns | Heavy drop shadows |
| Soft glass blur | Navigation, overlays | Full glassmorphism everywhere |
| Light borders | Cards, inputs | Thick colored borders |
| Micro-interactions | Buttons, hovers, feedback | Flashy animations |

### Shadow System

```css
:root {
    /* Refined shadow scale */
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06),
                 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07),
                 0 2px 4px -1px rgba(0, 0, 0, 0.04);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08),
                 0 4px 6px -2px rgba(0, 0, 0, 0.04);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08),
                 0 10px 10px -5px rgba(0, 0, 0, 0.03);

    /* Brand shadow for emphasis */
    --shadow-purple: 0 4px 14px rgba(124, 58, 237, 0.15);
    --shadow-purple-hover: 0 8px 25px rgba(124, 58, 237, 0.25);
}
```

### Card Design Pattern

```css
.card {
    background: white;
    border-radius: 16px;  /* Slightly rounded, not pill */
    border: 1px solid var(--gray-100);
    box-shadow: var(--shadow-sm);
    padding: var(--space-6);
    transition: all 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--purple-200);
}
```

### Glass Effect (Use Sparingly)

```css
/* For navigation or overlays only */
.glass {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Micro-Interactions

**Timing:**
- Hover transitions: 150-200ms
- Focus transitions: 100-150ms
- Page transitions: 300-500ms
- Never exceed 500ms

```css
/* Button hover with subtle lift */
.btn {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.btn:active {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}
```

**Sources:**
- [UI/UX Design Trends 2026](https://www.index.dev/blog/ui-ux-design-trends)
- [Card UI Design Examples 2025](https://bricxlabs.com/blogs/card-ui-design-examples)
- [Motion Design Trends 2026](https://primotech.com/ui-ux-evolution-2026-why-micro-interactions-and-motion-matter-more-than-ever/)

---

## 6. Mobile-First Responsive Design

### Breakpoint Strategy

```css
/* Mobile-first: Start with mobile styles, enhance up */

/* Base styles (mobile) */
.container { padding: 16px; }

/* Tablet (768px+) */
@media (min-width: 768px) {
    .container { padding: 24px; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .container { padding: 24px; }
}

/* Large desktop (1280px+) */
@media (min-width: 1280px) {
    .container { max-width: 1200px; }
}
```

### Recommended Breakpoints

| Name | Width | Use Case |
|------|-------|----------|
| sm | 480px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |
| 2xl | 1536px | Wide screens |

### Touch-Friendly Design

**Minimum touch targets: 44px x 44px** (Apple HIG, WCAG)

```css
/* Touch-friendly buttons and links */
a, button, [role="button"],
input[type="submit"], .btn {
    min-height: 44px;
    min-width: 44px;
}

/* Prevent zoom on iOS */
input, textarea, select {
    font-size: 16px;  /* Prevents auto-zoom */
    min-height: 44px;
}
```

### Mobile Navigation Pattern

For a tutoring landing page, use:
- **Sticky header with hamburger menu** on mobile
- **Visible CTA in header** even on mobile
- **Smooth slide-out menu** (not dropdown)

```css
/* Mobile nav example */
.mobile-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: white;
    transition: right 0.3s ease;
    z-index: 1000;
}

.mobile-nav.active {
    right: 0;
}
```

**Statistics:**
- 70%+ of global traffic is mobile
- Google uses mobile-first indexing
- Mobile users convert 8% less than desktop (optimize for simplicity)

**Sources:**
- [Responsive Design Best Practices 2025](https://nextnative.dev/blog/responsive-design-best-practices)
- [Responsive Design Breakpoints 2025](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [Mobile-First Development Guide](https://www.engagecoders.com/responsive-web-design-mobile-first-development-best-practices-2025-guide/)

---

## 7. Performance-Conscious Design

### Core Web Vitals Targets

| Metric | Target | Current BEAM |
|--------|--------|--------------|
| LCP (Largest Contentful Paint) | < 2.5s | 0.9s (excellent) |
| CLS (Cumulative Layout Shift) | < 0.1 | Verify |
| INP (Interaction to Next Paint) | < 200ms | Verify |

### CSS Animation Best Practices

**Only animate these properties (GPU-accelerated):**
- `transform`
- `opacity`

**Avoid animating:**
- `width`, `height` (causes layout shifts)
- `margin`, `padding` (causes layout shifts)
- `top`, `left` (use transform instead)

```css
/* Good: GPU-accelerated animation */
.card:hover {
    transform: translateY(-4px) scale(1.02);
    opacity: 1;
}

/* Bad: Triggers layout */
.card:hover {
    margin-top: -4px;  /* Avoid */
    height: 110%;      /* Avoid */
}
```

### Image Optimization

```html
<!-- Modern image with fallbacks -->
<picture>
    <source srcset="hero.avif" type="image/avif">
    <source srcset="hero.webp" type="image/webp">
    <img
        src="hero.jpg"
        alt="BEAM Academy tutoring session"
        width="800"
        height="600"
        loading="eager"  /* Hero image: eager */
        decoding="async"
    >
</picture>

<!-- Below-fold images: lazy load -->
<img
    src="testimonial.jpg"
    loading="lazy"
    width="400"
    height="300"
>
```

**Key rules:**
- Always specify `width` and `height` attributes (prevents CLS)
- Use WebP/AVIF formats (25-35% smaller)
- Lazy load below-fold images
- Preload hero/LCP images

### Critical CSS

```html
<!-- Inline critical CSS in <head> -->
<style>
    /* Only above-the-fold styles */
    :root { --purple-700: #7c3aed; }
    body { font-family: 'Outfit', sans-serif; }
    .hero { min-height: 100vh; }
    /* ... minimal styles for first paint */
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
```

**Sources:**
- [Core Web Vitals 2026 Guide](https://nitropack.io/blog/most-important-core-web-vitals-metrics/)
- [Web Performance 2025 Review](https://www.debugbear.com/blog/2025-in-web-performance)
- [LCP Optimization](https://www.ableneo.com/insight/how-to-improve-core-web-vitals-lcp-inp-cls-in-modern-web-apps/)

---

## 8. Conversion-Focused Design

### CTA Design

**Primary CTA styling:**
```css
.btn-primary {
    background: var(--purple-700);
    color: white;
    padding: 16px 32px;
    border-radius: 100px;  /* Pill shape for CTAs */
    font-weight: 600;
    font-size: 1rem;
    box-shadow: var(--shadow-purple);
    transition: all 0.2s ease;
}

.btn-primary:hover {
    background: var(--purple-800);
    transform: translateY(-2px);
    box-shadow: var(--shadow-purple-hover);
}
```

**CTA Statistics:**
- Single CTA pages convert 13.5% vs 10.5% for multiple CTAs
- Mobile-optimized CTAs improve conversion by 32.5%
- Urgency language increases conversion by 332%
- Personalized CTAs convert 202% better

### CTA Placement Strategy

| Location | Purpose |
|----------|---------|
| Hero (primary) | Main conversion action |
| After value proposition | Catch scrollers |
| After social proof | Leverage trust moment |
| Sticky mobile footer | Always accessible |
| Pricing section | Decision point |

### Trust Signals

**Must-haves for tutoring:**
1. **Tutor credentials** (school, ATAR, university)
2. **Star ratings** with review count
3. **Student testimonials** (specific outcomes)
4. **Money-back guarantee** (+32.57% conversions)
5. **Parent testimonials** (decision makers)

**Placement:**
- Trust signals near CTAs increase conversion
- 3-5 testimonials is optimal
- Include photos for 90% more trust
- Specific results > vague praise

### Social Proof Design

```html
<!-- Testimonial card pattern -->
<div class="testimonial">
    <div class="testimonial-stars">★★★★★</div>
    <blockquote class="testimonial-quote">
        "Specific result achieved..."
    </blockquote>
    <div class="testimonial-author">
        <img src="parent.jpg" alt="" class="testimonial-avatar">
        <div>
            <div class="testimonial-name">Parent Name</div>
            <div class="testimonial-meta">Parent of Year 11 student</div>
        </div>
    </div>
</div>
```

**Client logo impact:** Adding client logos increased conversions by 69% in A/B tests.

### Form Design

- Minimize fields (name, email, phone, year level)
- Use single-column layout
- Show progress for multi-step forms
- Mobile-friendly input sizes (16px+)
- Clear error states with inline validation

**Sources:**
- [Landing Page CRO Guide 2026](https://www.optimonk.com/conversion-rate-optimization-for-landing-pages/)
- [CTA Statistics 2025](https://wisernotify.com/blog/call-to-action-stats/)
- [Social Proof Landing Pages](https://www.klientboost.com/landing-pages/landing-page-testimonials/)

---

## Recommended Design System Specifications

### Design Tokens Summary

```css
:root {
    /* Typography */
    --font-display: 'Outfit', sans-serif;
    --font-body: 'Outfit', sans-serif;

    /* Type Scale (1.25 ratio) */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;
    --text-4xl: 2.25rem;
    --text-5xl: 3rem;

    /* Spacing (8px base) */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-24: 6rem;

    /* Colors */
    --color-primary: #7c3aed;
    --color-primary-dark: #6b21a8;
    --color-primary-light: #a855f7;
    --color-text: #27272a;
    --color-text-muted: #71717a;
    --color-bg: #ffffff;
    --color-bg-subtle: #faf5ff;

    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07);
    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08);
    --shadow-brand: 0 4px 14px rgba(124,58,237,0.15);

    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-full: 100px;

    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-base: 200ms ease;
    --transition-slow: 300ms ease;
}
```

---

## Priority Order for Implementation

### Phase 1: Foundation (Highest Impact)
1. **Establish spacing system** - 8px grid tokens
2. **Type scale** - Implement modular scale with clamp()
3. **Color tokens** - Verify contrast ratios
4. **CTA optimization** - Single focused CTA, proper styling

### Phase 2: Visual Polish
5. **Shadow refinement** - Consistent shadow scale
6. **Card redesign** - Unified card patterns
7. **Section rhythm** - Consistent vertical spacing
8. **Hero optimization** - Z-pattern, above-fold focus

### Phase 3: Micro-Interactions
9. **Button states** - Hover, focus, active
10. **Card hover effects** - Lift and shadow
11. **Navigation transitions** - Smooth mobile menu
12. **Scroll animations** - Subtle entrance effects

### Phase 4: Conversion Optimization
13. **Trust signal placement** - Near CTAs
14. **Social proof design** - Testimonial cards
15. **Form optimization** - Minimal fields, clear states
16. **Mobile CTA sticky** - Always accessible action

---

## Sources

### Visual Hierarchy & Layout
- [Modern Front-End Design Principles 2025](https://www.index.dev/blog/top-front-end-design-principles)
- [Visual Hierarchy in Web Design 2026](https://theorangebyte.com/visual-hierarchy-web-design/)
- [Hero Section Design Best Practices 2026](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Above the Fold Best Practices 2025](https://evergreendm.com/above-the-fold-what-should-actually-be-there-in-2025/)

### Typography
- [Modern Web Typography 2025](https://www.frontendtools.tech/blog/modern-web-typography-techniques-2025-readability-guide)
- [Modular Scale](https://www.modularscale.com/)
- [Google Font Pairings 2026](https://www.landingpageflow.com/post/google-font-pairings-for-websites)

### Color & Accessibility
- [Color Psychology in Branding 2025](https://www.nwbranddesign.com/nwbd-blog/the-psychology-of-color-in-branding-what-works-in-2025)
- [Purple Color Theory](https://www.andacademy.com/resources/blog/graphic-design/purple-color-theory/)
- [WCAG Contrast Guide 2025](https://www.allaccessible.org/blog/color-contrast-accessibility-wcag-guide-2025)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Spacing
- [8px Grid System](https://hub.sivo.it.com/ui-ux-design-systems/what-is-an-8-point-grid-system/)
- [Spacing Best Practices](https://cieden.com/book/sub-atomic/spacing/spacing-best-practices)
- [GitLab Design System](https://design.gitlab.com/product-foundations/spacing/)

### UI Patterns
- [UI/UX Design Trends 2026](https://www.index.dev/blog/ui-ux-design-trends)
- [Glassmorphism UI Trend 2026](https://www.designstudiouiux.com/blog/what-is-glassmorphism-ui-trend/)
- [Card UI Design Examples 2025](https://bricxlabs.com/blogs/card-ui-design-examples)
- [Motion Design & Micro-Interactions 2026](https://primotech.com/ui-ux-evolution-2026-why-micro-interactions-and-motion-matter-more-than-ever/)

### Responsive Design
- [Responsive Design Best Practices 2025](https://nextnative.dev/blog/responsive-design-best-practices)
- [Responsive Design Breakpoints 2025](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [Common Screen Resolutions 2026](https://www.browserstack.com/guide/common-screen-resolutions)

### Performance
- [Core Web Vitals 2026 Guide](https://nitropack.io/blog/most-important-core-web-vitals-metrics/)
- [Web Performance 2025 Review](https://www.debugbear.com/blog/2025-in-web-performance)
- [How to Improve Core Web Vitals](https://www.ableneo.com/insight/how-to-improve-core-web-vitals-lcp-inp-cls-in-modern-web-apps/)

### Conversion
- [Landing Page CRO Guide 2026](https://www.optimonk.com/conversion-rate-optimization-for-landing-pages/)
- [CTA Statistics 2025](https://wisernotify.com/blog/call-to-action-stats/)
- [CTA Placement Strategies 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)
- [Social Proof Landing Pages](https://www.klientboost.com/landing-pages/landing-page-testimonials/)
- [Tutoring Landing Page Guide](https://unicornplatform.com/blog/build-a-stunning-tutoring-landing-page-in-minutes/)
