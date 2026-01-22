# Architecture Research: Page Structure for Instant Comprehension

**Domain:** Tutoring service landing page (BEAM Academy)
**Researched:** 2026-01-22
**Overall Confidence:** HIGH

---

## The 3-Second Test

**What must land immediately:** The visitor must understand TWO things in 3 seconds:
1. **What this is:** A tutoring service
2. **Why it's different:** Custom materials for YOUR kid

Research shows users make snap judgments in under 5 seconds. Your UVP should be readable and understood in less than 5 seconds and must be incorporated above-the-fold.

**The critical insight:** "Custom materials for YOUR kid" is the hook, but without the word "tutoring" prominently visible, visitors won't know what category of product they're looking at. The current problem ("hard to tell it's even a tutoring company") means the category label is missing or buried.

**3-Second Formula for BEAM:**
```
[Category] + [Differentiator] + [Visual Proof]
    |              |                |
"HSC Tutoring" + "Custom Materials" + Portal screenshot
```

---

## Section Order

Based on conversion psychology research, landing pages follow an emotional progression: **Curiosity > Empathy > Safety > Desire > Action**. The recommended sequence maps directly to BEAM's content priorities.

### Recommended Section Sequence

| Order | Section | Purpose | BEAM Content |
|-------|---------|---------|--------------|
| 1 | **Hero** | Hook + Category clarity | "Custom materials for YOUR kid" + "HSC Tutoring" |
| 2 | **Proof** | Immediate evidence | 4 documents from ONE trial, portal screenshot |
| 3 | **Comparison** | Crystallize difference | Generic tutoring vs BEAM side-by-side |
| 4 | **Credentials** | Build trust | BHHS grads, 95+ HSC, med students |
| 5 | **CTA** | Convert | Free trial form |
| 6 | **FAQ** (optional) | Handle objections | Pricing, logistics, what to expect |

### Why This Order Works

**Hero first** because 57% of viewing time happens above the fold. You have 3 seconds to answer "What is this?" and "Why should I care?"

**Proof second** because after the hook lands, skepticism kicks in. "Custom materials? Prove it." Showing 4 actual documents from ONE trial is concrete evidence.

**Comparison third** because after seeing proof, visitors think "How is this different from what I already know?" The comparison crystallizes the gap between generic tutoring and BEAM's approach.

**Credentials fourth** because after understanding the difference, visitors want to know "Can these people actually deliver?" Credentials answer capability concerns.

**CTA fifth** because by this point, interested visitors have enough information to act. The form should be simple and reinforce the value ("Get YOUR kid's custom materials").

---

## Above-the-Fold Requirements

Research shows 57% of viewing time occurs above the fold, and on mobile 75% of users didn't see the main CTA when it was below the fold. The above-fold area must work hard.

### Must Be Visible (No Scrolling)

| Element | Why | BEAM Specific |
|---------|-----|---------------|
| **Category label** | Answers "What is this?" | "HSC Tutoring" or "Years 7-12 Tutoring" |
| **Differentiator headline** | Answers "Why different?" | "Custom materials for YOUR kid" |
| **Supporting evidence** | Proves claim visually | Portal screenshot OR document sample |
| **Primary CTA** | Enables action | "Book Free Trial" button |
| **Trust indicator** | Reduces friction | "BHHS grads" badge or review count |

### Mobile Above-Fold (600px viewport)

Mobile viewports are approximately 600px or less in height. This severely limits above-fold real estate.

**Mobile Above-Fold Priority (top to bottom):**
1. Logo/brand (small, top-left)
2. Headline (Custom materials for YOUR kid)
3. Category clarifier (HSC Tutoring - Sydney)
4. CTA button (Book Free Trial)
5. Trust badge (optional if space permits)

**Critical mobile rule:** The headline and CTA must be visible immediately. The portal screenshot can be partially visible (teaser), encouraging scroll.

---

## Visual Hierarchy

Visual hierarchy determines the order visitors notice elements. The pattern follows predictable eye movements.

### Z-Pattern for Hero Section

The Z-pattern is ideal for landing page hero sections with minimal text. Eyes move: Top-left > Top-right > Diagonal down > Bottom-left > Bottom-right.

**BEAM Hero Z-Pattern Layout:**
```
[Logo]                          [CTA Button - "Book Free Trial"]

         CUSTOM MATERIALS FOR YOUR KID
              HSC Tutoring | Years 7-12

[Trust Badge]                   [Portal Screenshot]
```

### Size & Weight Hierarchy

| Element | Size Rank | Treatment |
|---------|-----------|-----------|
| **Main headline** | 1st (largest) | Bold, high contrast, 32-48px mobile / 48-72px desktop |
| **Category/subhead** | 2nd | Medium weight, 18-24px, slightly muted color |
| **CTA button** | 3rd (by contrast) | High contrast color, action text |
| **Supporting text** | 4th | Regular weight, 14-16px |
| **Trust badges** | 5th | Small but visible, 12-14px |

### Color Contrast Priorities

1. **CTA button:** Highest contrast against background (the "pop")
2. **Headline:** High contrast (black on white or vice versa)
3. **Portal screenshot:** Medium contrast (draws attention but doesn't compete with headline)
4. **Secondary text:** Lower contrast (readable but recessive)

### The 80/20 Rule for Attention

Research shows users spend 80% of time viewing the left half of a page. Place:
- Headline left-aligned
- CTA accessible from left side
- Key proof element on right (where eyes scan second)

---

## Mobile Structure

Mobile accounts for the majority of Google Ads traffic. The structure must work on phones first, then adapt to desktop.

### Mobile-First Layout Principles

1. **Single column:** Stack everything vertically
2. **Thumb-friendly buttons:** At least 44x44px tap targets
3. **Full-width CTAs:** Make buttons span the screen width
4. **Reduced content density:** More whitespace, less text per screen

### Mobile Section Heights (Approximate)

| Section | Target Height | Reasoning |
|---------|---------------|-----------|
| Hero | 90-100vh | Full screen hook, CTA visible |
| Proof | 80-120vh | Documents need space, encourage scroll |
| Comparison | 60-80vh | Table format, scan-friendly |
| Credentials | 40-60vh | Compact, trust-focused |
| CTA | 60-80vh | Form + context |

### Mobile vs Desktop Differences

| Element | Mobile | Desktop |
|---------|--------|---------|
| Hero layout | Stacked (text > image > CTA) | Side-by-side (text left, image right) |
| Navigation | Hidden (hamburger) or none | Full nav if needed |
| CTA button | Full-width, bottom of viewport | Inline with content |
| Proof images | Carousel or stacked | Grid (2x2) |
| Comparison table | Vertical cards | Side-by-side columns |
| Sticky CTA | Bottom bar, always visible | Optional or top bar |

### Sticky CTA Bar Implementation

Research shows sticky CTAs increase conversions significantly (one study showed 20% increase in sign-ups). For mobile:

**Position:** Bottom of screen (thumb-friendly)
**Size:** 60-80px height, full width
**Content:** "Book Free Trial" + phone number or trust indicator
**Behavior:** Appears after scrolling past hero CTA (avoids redundancy)

---

## Scroll Depth Strategy

Research shows 85% of users scroll past the first viewport, 55% reach halfway, and 45% reach the bottom. Content placement should match these drop-off rates.

### Content Placement by Scroll Depth

| Scroll % | Users Remaining | What to Place | BEAM Content |
|----------|-----------------|---------------|--------------|
| 0% (top) | 100% | Hook + CTA | "Custom materials" + "Book Trial" |
| 10-25% | ~85% | Immediate proof | Portal screenshot, document samples |
| 25-50% | ~55-85% | Comparison | Generic vs BEAM table |
| 50-75% | ~45-55% | Credentials | BHHS, 95+ HSC, med students |
| 75-100% | ~45% | Final CTA + FAQ | Trial form, objection handling |

### Scroll Encouragement Techniques

Users need motivation to scroll. Techniques:

1. **Visual cue at fold:** Partial visibility of next section
2. **Content density gradient:** Sparser content encourages scroll
3. **Progress indicators:** Small dots showing page position
4. **Curiosity gaps:** Headlines that promise more below

**For BEAM:** Show the edge of the portal screenshot or document grid at the fold line, indicating there's more proof below.

---

## Recommendations for BEAM

Given BEAM's specific content priorities and constraints, here is the recommended architecture:

### Final Section Structure

```
[STICKY CTA BAR - Mobile only, appears after scroll past hero]
|
V
=== HERO SECTION (Above Fold) ===
- Category: "HSC Tutoring | Years 7-12 | Sydney"
- Headline: "Custom Materials for YOUR Kid"
- Subhead: "We track every score. Build materials around gaps. Not generic worksheets."
- CTA: "Book Free Trial" button
- Visual: Portal screenshot (partial) or document preview
- Trust: "BHHS Grads | 95+ HSC Achievers"

=== PROOF SECTION ===
- Headline: "Here's What One Trial Session Produces"
- Visual: 4 document samples (custom question set, gap analysis, skill tracker, progress report)
- Portal screenshot with annotations
- Micro-CTA: "See yours - Book a Trial"

=== COMPARISON SECTION ===
- Headline: "Generic Tutoring vs BEAM"
- Two-column or card comparison:
  - Generic: Same worksheets for everyone, hope-based improvement, no tracking
  - BEAM: Custom materials per student, data-driven targeting, visible progress
- Visual: Side-by-side or checkmark table

=== CREDENTIALS SECTION ===
- Headline: "Who's Teaching Your Kid"
- Trust points: BHHS grads, 95+ HSC results, current med students
- Optional: Testimonial snippet
- Trust badges: Any school affiliations, review ratings

=== FINAL CTA SECTION ===
- Headline: "Get YOUR Kid's Custom Materials"
- Form: Name, email, phone, year level
- Reassurance: "Free trial, no commitment"
- Contact alternative: Phone number for parents who prefer calling
```

### Key Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hero focus | Category + Differentiator | Solves "can't tell it's tutoring" problem |
| Proof placement | Immediately after hero | Capitalizes on 85% scroll rate, builds credibility fast |
| Comparison style | Simple 2-column | Easy to scan, clear contrast |
| Credentials depth | Light | Parents care more about results proof than bios |
| Form placement | Bottom only | Sticky CTA handles top-funnel; form for committed visitors |
| Sticky bar | Mobile bottom, desktop optional | Aligns with thumb-zone, always-available CTA |

### Visual Weight Distribution

```
HERO:     ████████████████████████████████████████  (40% visual weight)
PROOF:    ██████████████████████████████            (30% visual weight)
COMPARE:  ████████████████                          (15% visual weight)
CREDS:    ████████                                  (8% visual weight)
CTA:      ██████                                    (7% visual weight)
```

The visual weight front-loads the page because most users won't scroll far. By the time they reach 50%, they should have seen enough to decide.

---

## Sources

**Landing Page Structure & Conversion:**
- [Databox - 17 Landing Pages That Convert](https://databox.com/landing-page-examples)
- [Shopify - High-Converting Landing Pages](https://www.shopify.com/blog/high-converting-landing-pages)
- [LandingPageFlow - Best Practices](https://www.landingpageflow.com/post/best-landing-page-practices-for-higher-conversions)
- [Involve.me - Landing Page Best Practices 2026](https://www.involve.me/blog/landing-page-best-practices)

**Above the Fold & Mobile:**
- [Invesp - Above The Fold Best Practices 2025](https://www.invespcro.com/blog/above-the-fold/)
- [OptinMonster - Mobile Landing Page Best Practices 2025](https://optinmonster.com/mobile-landing-page-best-practices/)
- [Unbounce - Best Mobile Landing Page Examples](https://unbounce.com/landing-page-examples/best-mobile-landing-page-examples/)

**Visual Hierarchy & Reading Patterns:**
- [NN/G - F-Shaped Pattern Reading](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- [99designs - F and Z Patterns](https://99designs.com/blog/tips/visual-hierarchy-landing-page-designs/)
- [LandingPageFlow - Z-Pattern vs F-Pattern](https://www.landingpageflow.com/post/z-pattern-vs-f-pattern)

**Section Order & Psychology:**
- [MarketingSherpa - Value Sequencing (638% more conversions)](https://marketingsherpa.com/article/how-to/sequence-value-on-a-landing-page-example)
- [Unbounce - Information Hierarchy](https://unbounce.com/landing-pages/information-hierachy-helps-you-convert-and-delight/)
- [Thrive Themes - Optimal Landing Page Structure](https://thrivethemes.com/optimal-landing-page-structure/)

**Scroll Depth:**
- [Usermaven - Value of Scroll Depth](https://usermaven.com/blog/value-of-scroll-depth)
- [Sculpt Digital - 85% of Users Scroll](https://sculpt.digital/85-users-scroll-death-of-above-the-fold-content/)

**Sticky CTA & Comparison Pages:**
- [WebWicked - Why Sticky CTA Buttons Boost Conversions](https://www.webwicked.com/articles/sticky-cta-buttons-on-landing-pages)
- [LandingPageFlow - CTA Placement Strategies 2026](https://www.landingpageflow.com/post/best-cta-placement-strategies-for-landing-pages)
- [Landingi - Competitor Comparison Examples](https://landingi.com/landing-page/competitor-comparison-examples/)

**Value Proposition:**
- [CXL - Unique Value Proposition](https://cxl.com/blog/value-proposition-examples-how-to-create/)
- [Unbounce - Value Proposition Guide](https://unbounce.com/copywriting/value-proposition/)
- [ConversionWise - UVP for Landing Pages](https://conversionwise.com/blog/how-to-craft-unique-value-propositions-that-boost-landing-page-conversions/)
