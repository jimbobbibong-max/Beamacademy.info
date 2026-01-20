# Mobile Landing Page Architecture for BEAM Academy

**Domain:** Education/Tutoring Services Landing Page
**Researched:** 2026-01-20
**Confidence:** HIGH (verified with multiple authoritative sources)

---

## Executive Summary

The current BEAM Academy landing page structure (Hero > About > Pricing > Why Us > Portal > Team > FAQ > Contact) forces users through 7 sections before reaching the contact form. Industry research shows this creates significant drop-off, especially on mobile where 83% of traffic originates but converts 40-51% worse than desktop.

**The core problem:** Mobile users scroll in bursts, scan, pause, then decide. A contact form buried at the bottom means most users never reach it.

**The solution:** Restructure for mobile-first conversion with early CTA exposure, sticky contact mechanisms, and progressive content hierarchy.

---

## Recommended Content Architecture

### Mobile-First Section Order

Based on conversion research and AIDA (Attention, Interest, Desire, Action) framework:

| Position | Section | Purpose | Mobile Priority |
|----------|---------|---------|-----------------|
| 1 | **Hero + Embedded CTA** | Attention: Value prop + immediate action option | CRITICAL |
| 2 | **Social Proof Strip** | Trust: Quick credibility (logos, ratings, "15+ reviews") | HIGH |
| 3 | **Value Proposition Cards** | Interest: 3 key benefits (small classes, results, tutors) | HIGH |
| 4 | **Pricing** | Desire: Show accessibility early ($80-$120/week) | HIGH |
| 5 | **Testimonials** | Desire: Parent/student stories | MEDIUM |
| 6 | **Contact Form (Full)** | Action: Primary conversion point | CRITICAL |
| 7 | **FAQ (Collapsed)** | Objection handling | MEDIUM |
| 8 | **Team** | Trust reinforcement | LOW |
| 9 | **About (Brief)** | Brand story (for engaged users) | LOW |

**Rationale:**
- Move contact form from position 9 to position 6 (visible within 2-3 scroll bursts)
- Pricing early reduces "what's the catch?" anxiety
- Testimonials before form builds desire right before action
- FAQ after form catches users who almost converted but had questions
- Team/About moved to end (engaged users will find it)

### Current vs Recommended Structure

```
CURRENT (conversion-hostile):           RECOMMENDED (conversion-optimized):
1. Hero                                 1. Hero + Sticky Mobile CTA
2. About                                2. Trust Strip (5-star, student count)
3. Courses & Pricing                    3. Value Props (3 cards)
4. Why Us                               4. Pricing (transparent, early)
5. Portal                               5. Testimonials (2-3 rotating)
6. Team                                 6. Contact Form (primary CTA)
7. Testimonials                         7. FAQ (accordion, collapsed)
8. FAQ                                  8. Team (for deep divers)
9. Contact Form                         9. About (brief)
```

---

## Sticky Mobile CTA Implementation

### Pattern: Bottom Sticky Bar

Research shows sticky CTAs at the bottom of mobile screens:
- Stay within thumb zone (natural reach area)
- Increase conversions by 6-20% depending on implementation
- Must not obstruct content or feel intrusive

**Recommended Implementation:**

```css
/* Mobile sticky CTA bar */
.sticky-cta-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: none; /* Hidden by default */
}

/* Show after scrolling past hero */
.sticky-cta-bar.visible {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Minimum touch target: 48x48px */
.sticky-cta-bar .btn {
  min-height: 48px;
  min-width: 48px;
  font-size: 16px; /* Prevent iOS zoom on tap */
}

@media (min-width: 768px) {
  /* Hide on tablet/desktop - use inline CTAs instead */
  .sticky-cta-bar {
    display: none !important;
  }
}
```

**Content:**
- Left: "Book a Free Trial" (primary)
- Right: Phone icon or "Call Us" (secondary)

**Trigger:** Show after user scrolls past hero section (viewport height + 100px).

---

## CTA Placement Strategy

### Multiple CTA Approach (Verified Best Practice)

CTAs should appear 3-4 times on mobile:

| Location | CTA Type | Wording |
|----------|----------|---------|
| Hero section | Primary button | "Book Your Free Trial" |
| After value props | Secondary button | "See Our Pricing" |
| Before contact form | Primary button | "Start Your Free Trial" |
| Sticky bar (mobile) | Compact button | "Book Trial" |

**Avoid:**
- More than 2 different CTA wordings (confuses users)
- Generic CTAs ("Submit", "Click Here")
- CTAs without clear value exchange

**Recommended Wording for Tutoring:**
- "Book Your Free Trial" (low commitment, high value)
- "Get Started Free" (alternative)
- NOT "Contact Us" (too vague)
- NOT "Enquire Now" (formal, cold)

---

## Mobile-First CSS Architecture

### Approach: True Mobile-First

Start with mobile styles as the base, then progressively enhance for larger screens.

**Why Mobile-First (not Desktop-First):**
- 60%+ of web traffic is mobile
- Google uses mobile-first indexing
- Forces prioritisation of essential content
- Smaller CSS payload for mobile users

**Implementation Pattern:**

```css
/* BASE STYLES = MOBILE */
.hero-title {
  font-size: 2rem;      /* Mobile default */
  line-height: 1.2;
  padding: 0 16px;
}

.hero-buttons {
  flex-direction: column;  /* Stack on mobile */
  gap: 12px;
}

/* TABLET (768px+) */
@media (min-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: row;
    gap: 16px;
  }
}

/* DESKTOP (1024px+) */
@media (min-width: 1024px) {
  .hero-title {
    font-size: 3.5rem;
  }
}
```

### Breakpoint Strategy

| Breakpoint | Target | Typical Width |
|------------|--------|---------------|
| Base | Mobile (portrait) | 320-479px |
| 480px | Mobile (landscape) | 480-767px |
| 768px | Tablet | 768-1023px |
| 1024px | Desktop | 1024px+ |

**Note:** Current BEAM site has some mobile styles but uses desktop-first approach in places. Refactoring to true mobile-first will improve maintainability and performance.

---

## Critical CSS Strategy

### What Goes in Critical CSS

Critical CSS = only styles needed for above-the-fold content on initial load.

**For BEAM Academy mobile, critical CSS should include:**
- CSS reset/normalise
- Body, typography base
- Navigation styles
- Hero section styles (background, title, subtitle, CTA button)
- Trust strip (if above fold)

**Size target:** Keep critical CSS under 14KB (fits in first TCP packet).

### Implementation

```html
<head>
  <!-- Critical CSS inline -->
  <style>
    /* Only hero, nav, and base styles */
    :root { /* CSS variables */ }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Outfit', sans-serif; }
    .nav { /* nav styles */ }
    .hero { /* hero styles */ }
    .btn-primary { /* CTA button */ }
  </style>

  <!-- Defer non-critical CSS -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
```

### Current State

The existing BEAM site has ALL CSS inline (226KB HTML file). This is problematic because:
- First Contentful Paint delayed by parsing all CSS
- Critical and non-critical CSS not separated
- No opportunity for browser caching

**Recommended approach:**
1. Extract critical CSS (estimated 10-15KB)
2. Inline critical CSS in `<head>`
3. Move remaining CSS to external stylesheet
4. Lazy-load external stylesheet

---

## Image Optimization Strategy

### LCP Impact

Images account for ~80% of LCP elements. For the hero section:

| Technique | Impact | Implementation |
|-----------|--------|----------------|
| WebP format | 25-35% smaller | Convert all images, serve with fallback |
| Responsive images | 50%+ smaller on mobile | Use srcset with multiple sizes |
| Lazy loading | Faster initial load | Add `loading="lazy"` to below-fold images |
| Explicit dimensions | Prevents CLS | Always set width/height |

### Hero Image Strategy

```html
<!-- Hero image with responsive serving -->
<picture>
  <!-- WebP for modern browsers -->
  <source
    type="image/webp"
    srcset="hero-400.webp 400w,
            hero-800.webp 800w,
            hero-1200.webp 1200w"
    sizes="(max-width: 768px) 100vw, 50vw">

  <!-- JPEG fallback -->
  <img
    src="hero-800.jpg"
    srcset="hero-400.jpg 400w,
            hero-800.jpg 800w,
            hero-1200.jpg 1200w"
    sizes="(max-width: 768px) 100vw, 50vw"
    alt="Students learning at BEAM Academy"
    width="1200"
    height="800"
    loading="eager"
    fetchpriority="high">
</picture>
```

### Below-Fold Images

```html
<img
  src="team-member.webp"
  alt="John Smith - Maths Tutor"
  width="300"
  height="300"
  loading="lazy"
  decoding="async">
```

### Performance Targets (Core Web Vitals)

| Metric | Target | Current Risk |
|--------|--------|--------------|
| LCP | < 2.5s | HIGH (no image optimization) |
| CLS | < 0.1 | MEDIUM (inline styles help) |
| INP | < 200ms | LOW (minimal interactivity) |

---

## Form Design for Mobile Conversion

### Field Reduction

Research shows reducing form fields from 11 to 4 increases conversions by 120%.

**Current BEAM form fields (estimated):**
- Name
- Email
- Phone
- Year level
- Subject
- Message
- Preferred time

**Recommended minimum viable form:**
1. Name (required)
2. Phone OR Email (one required)
3. Year level (dropdown, optional)
4. Message (optional, small)

**Why this works:**
- 3-4 fields maximum for mobile
- Get contact info first, details in follow-up
- Reduces friction dramatically

### Form UX Best Practices

```html
<form class="contact-form">
  <!-- Single column on mobile -->
  <div class="form-group">
    <label for="name">Your Name</label>
    <input
      type="text"
      id="name"
      name="name"
      autocomplete="name"
      required
      style="font-size: 16px;" /* Prevents iOS zoom */
    >
  </div>

  <div class="form-group">
    <label for="phone">Phone Number</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      autocomplete="tel"
      inputmode="tel"
      required
    >
  </div>

  <div class="form-group">
    <label for="year">Year Level (optional)</label>
    <select id="year" name="year" style="font-size: 16px;">
      <option value="">Select year...</option>
      <option value="7">Year 7</option>
      <!-- etc -->
    </select>
  </div>

  <button type="submit" class="btn btn-primary">
    Book Your Free Trial
  </button>
</form>
```

**Key considerations:**
- `font-size: 16px` on inputs prevents iOS auto-zoom
- `inputmode="tel"` shows numeric keyboard for phone
- `autocomplete` attributes speed up entry
- Single column layout on mobile (no side-by-side fields)
- Large submit button (48px+ height)

---

## Scroll Depth and Content Density

### Mobile Attention Patterns

Users scroll in bursts: scan, pause, decide, continue (or bounce).

**Key findings:**
- 57% of viewing time occurs above the fold
- Most conversions happen below the fold (users need context first)
- Low scroll depth is fine IF conversion happens early

### Content Density Recommendations

| Section | Mobile Height Target | Content |
|---------|---------------------|---------|
| Hero | 100vh - 120vh | Headline, subhead, 1 CTA, trust badge |
| Trust Strip | 60px | Logos or stats only |
| Value Props | 80vh | 3 cards, stacked vertically |
| Pricing | 100vh | Price cards, clear comparison |
| Testimonials | 60vh | 1-2 rotating quotes |
| Contact Form | 80vh | Form + map or location |
| FAQ | Collapsed | 5-6 questions, accordion |

**Anti-patterns to avoid:**
- Wall of text in any section
- Hero sections taller than 120vh
- Multiple scroll-to-reveal animations on mobile
- Horizontal scrolling (breaks mobile experience)

### Viewport Considerations

```css
/* Ensure hero fills viewport but allows hint of next section */
.hero {
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height (accounts for mobile browser chrome) */
}

/* Show scroll indicator */
.hero::after {
  content: '';
  position: absolute;
  bottom: 20px;
  left: 50%;
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 12px;
  animation: scroll-hint 2s ease-in-out infinite;
}
```

---

## Component Boundaries

### Recommended Component Structure

```
landing-page/
├── critical.css           # Inline in <head>
├── main.css              # Lazy-loaded
├── components/
│   ├── nav/
│   │   ├── nav.css
│   │   └── nav.js        # Mobile menu toggle
│   ├── hero/
│   │   └── hero.css
│   ├── trust-strip/
│   │   └── trust-strip.css
│   ├── value-props/
│   │   └── value-props.css
│   ├── pricing/
│   │   └── pricing.css
│   ├── testimonials/
│   │   ├── testimonials.css
│   │   └── testimonials.js  # Carousel (if needed)
│   ├── contact-form/
│   │   ├── contact-form.css
│   │   └── contact-form.js  # Validation
│   ├── faq/
│   │   ├── faq.css
│   │   └── faq.js           # Accordion
│   ├── sticky-cta/
│   │   ├── sticky-cta.css
│   │   └── sticky-cta.js    # Show/hide logic
│   └── footer/
│       └── footer.css
```

### Data Flow

```
User lands on page
       │
       ▼
┌─────────────────┐
│  Hero + CTA     │ ──► If click: scroll to form OR show modal
└────────┬────────┘
         │ scroll
         ▼
┌─────────────────┐
│  Trust Strip    │ ──► No interaction (passive credibility)
└────────┬────────┘
         │ scroll
         ▼
┌─────────────────┐
│  Value Props    │ ──► Cards may link to relevant sections
└────────┬────────┘
         │ scroll
         ▼
┌─────────────────┐
│  Pricing        │ ──► CTA: "Get Started" → scroll to form
└────────┬────────┘
         │ scroll
         ▼
┌─────────────────┐
│  Testimonials   │ ──► Builds desire before form
└────────┬────────┘
         │ scroll
         ▼
┌─────────────────┐
│  Contact Form   │ ──► PRIMARY CONVERSION POINT
└────────┬────────┘     On submit: thank-you page + tracking
         │ scroll
         ▼
┌─────────────────┐
│  FAQ            │ ──► Handles objections for non-converters
└────────┬────────┘
         │ scroll
         ▼
┌─────────────────┐
│  Team + About   │ ──► For highly engaged users
└─────────────────┘

[Sticky CTA bar visible throughout after initial scroll]
```

---

## Anti-Patterns to Avoid

### 1. Form at the Bottom

**What:** Placing contact form as the last section
**Why bad:** Mobile users scroll in bursts; many never reach the bottom
**Instead:** Place form after testimonials (position 5-6), add sticky CTA

### 2. Desktop-First CSS

**What:** Writing desktop styles first, then overriding for mobile
**Why bad:** Mobile users download unnecessary CSS; harder to maintain
**Instead:** Mobile styles as base, enhance with min-width media queries

### 3. Large Hero Images Without Optimization

**What:** Serving desktop-sized images to mobile
**Why bad:** Kills LCP, wastes bandwidth, slow loading
**Instead:** Responsive images with srcset, WebP format, explicit dimensions

### 4. Too Many Form Fields

**What:** Asking for all information upfront
**Why bad:** 81% of users abandon forms; each field adds friction
**Instead:** Minimum viable info (name + contact method), follow up for details

### 5. About Section Early

**What:** Placing company story near the top
**Why bad:** Users care about their problem, not your story (initially)
**Instead:** Lead with value proposition, move About to bottom

### 6. Horizontal Scrolling

**What:** Content or elements that require horizontal scroll on mobile
**Why bad:** Breaks mobile UX completely, users bounce
**Instead:** Single column layouts, responsive images with max-width: 100%

### 7. Input Font Size Under 16px

**What:** Using small font sizes in form inputs on mobile
**Why bad:** iOS Safari auto-zooms, breaking layout
**Instead:** Always use font-size: 16px or larger on inputs/textareas

---

## Build Order Implications

Based on this architecture, recommended implementation order:

### Phase 1: Foundation (Mobile-First CSS)
1. Extract and inline critical CSS
2. Convert to mobile-first media query approach
3. Implement responsive image serving

### Phase 2: Structure Reorder
1. Reorder HTML sections per recommended hierarchy
2. Move contact form to position 6
3. Add trust strip component

### Phase 3: Mobile Enhancements
1. Implement sticky CTA bar
2. Optimise form fields
3. Add FAQ accordion functionality

### Phase 4: Performance
1. Lazy load below-fold images
2. Defer non-critical CSS
3. Test Core Web Vitals

---

## Trade-offs: Mobile vs Desktop

| Decision | Mobile Benefit | Desktop Trade-off | Recommendation |
|----------|---------------|-------------------|----------------|
| Form early in page | Higher mobile conversion | Desktop users expect form at bottom | Keep early; desktop users scroll faster anyway |
| Sticky CTA bar | Always-visible action | Can feel intrusive | Mobile only; hide on desktop |
| Single column layout | Easier scanning | Wastes horizontal space | Use grid on desktop, stack on mobile |
| Shorter form | Less friction | Miss detailed info | Start minimal, gather details post-conversion |
| Collapsed FAQ | Saves scroll depth | Requires click to expand | Acceptable; users who need FAQ will click |

---

## Sources

### Conversion Optimization
- [Conversion Sciences - Landing Page Optimization](https://conversionsciences.com/landing-page-optimization/)
- [Fermat Commerce - Mobile Landing Page Optimization 2025](https://www.fermatcommerce.com/post/mobile-landing-page)
- [Unbounce - Education Conversion Benchmarks](https://unbounce.com/conversion-benchmark-report/education-conversion-rate/)
- [LandingPageFlow - CTA Placement Strategies 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)

### Mobile-First CSS
- [JPG Designs - Mobile First CSS Guide 2025](https://jpgdesigns.com/mobile-first-css/)
- [618 Media - CSS Performance Best Practices](https://618media.com/en/blog/performance-with-css-best-practices/)
- [NitroPack - Critical CSS Guide](https://nitropack.io/blog/critical-css/)

### Core Web Vitals
- [web.dev - Largest Contentful Paint](https://web.dev/articles/lcp)
- [OWDT - Core Web Vitals 2025](https://owdt.com/insight/how-to-improve-core-web-vitals/)

### Psychology and UX
- [WebWave - Psychology of Scroll](https://webwave.me/blog/the-psychology-of-scroll)
- [Thrive Agency - Psychology Behind High-Converting Landing Pages](https://thriveagency.com/news/ux-ui-and-cro-the-psychology-behind-high-converting-landing-pages/)
