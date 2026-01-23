# Phase 14: Courses Section Redesign - Research

**Researched:** 2026-01-23
**Domain:** Pricing page design, course catalog UX, education website patterns
**Confidence:** HIGH

## Summary

This research investigates best practices for pricing tier layouts and course browser designs in the education/tutoring sector, with specific focus on patterns that align with BEAM Academy's existing v2 design language (Hero/Trust sections). The goal is to provide prescriptive guidance for a visual refresh of the "Invest in Your Future" (pricing tiers) and "Browse Our Courses" (course browser) sections.

The existing implementation uses a solid functional foundation: three pricing tiers (Junior, Intermediate, Senior) displayed as vertical columns with nested package lists, plus a tabbed course browser showing 24 courses across year levels. However, the visual treatment lags behind the modern Hero and Trust sections.

**Primary recommendation:** Retain the 3-tier column structure (matches industry best practice) but modernize with card-based styling, stronger visual hierarchy, improved mobile stacking, and course cards redesigned for scannability and visual consistency with the Hero/Trust design language.

## Standard Stack

This phase is pure HTML/CSS visual redesign - no new libraries needed.

### Core (Already in Use)
| Technology | Version | Purpose | Status |
|------------|---------|---------|--------|
| Pure CSS | - | Styling, animations | Continue using |
| CSS Custom Properties | - | Design tokens (colors, shadows) | Continue using |
| CSS Grid/Flexbox | - | Layout | Continue using |

### Design Tokens to Match
| Token | Value | Purpose |
|-------|-------|---------|
| `--purple-700` | #7c3aed | Primary brand color |
| `--shadow-card` | 0 4px 20px rgba(0,0,0,0.06) | Card elevation |
| `--shadow-card-hover` | 0 25px 80px rgba(124,58,237,0.18) | Hover elevation |
| `border-radius: 24px` | - | Card corners (v2 standard) |
| `border: 1px solid var(--gray-100)` | - | Subtle card borders |

**No new dependencies required.** Phase uses existing CSS architecture.

## Architecture Patterns

### Recommended Section Structure

```
courses-pricing section
├── section-header (tag + title + description)
├── all-access-hero (prominent featured banner)
├── pricing-tiers-v2 (3-column card grid)
│   ├── pricing-card (Junior)
│   │   ├── card-header (tier name, years)
│   │   ├── card-price (from $XX/week)
│   │   ├── package-list (selectable options)
│   │   └── card-cta (Start Free button)
│   ├── pricing-card featured (Intermediate - highlighted)
│   └── pricing-card (Senior)
├── course-browser-section
│   ├── section-subheader
│   ├── year-tabs (tab navigation)
│   └── courses-grid (responsive card grid)
│       └── course-card (per course)
└── pricing-note (footer text)
```

### Pattern 1: Three-Tier Pricing with Center Highlight

**What:** Display exactly 3 pricing tiers in side-by-side columns, with the middle tier visually emphasized as "recommended" or "most popular."

**When to use:** Standard for 2-4 buyer personas (Junior/Intermediate/Senior maps perfectly).

**Why:** Research shows 3 plans is optimal - more causes confusion, fewer loses anchoring opportunity. Studies indicate highlighting a recommended option can boost conversions by 56% (Optimizely).

**Implementation:**
```css
.pricing-tiers-v2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    max-width: 1100px;
    margin: 0 auto;
}

.pricing-card.featured {
    transform: scale(1.05);
    border: 2px solid var(--purple-500);
    box-shadow: 0 0 40px rgba(124, 58, 237, 0.2);
    position: relative;
}

.pricing-card.featured::before {
    content: 'Most Popular';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--purple-600);
    color: white;
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
}
```

### Pattern 2: Card-Based Pricing (v2 Style)

**What:** Each pricing tier as a distinct card with rounded corners, subtle borders, and elevation on hover - matching Trust section tutor cards.

**Why:** Current implementation uses dark-background styling that doesn't match the modern card aesthetic of Hero/Trust sections.

**Implementation:**
```css
.pricing-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 32px;
    transition: all 0.3s ease;
}

.pricing-card:hover {
    transform: translateY(-4px);
    border-color: var(--purple-400);
    box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15);
}
```

### Pattern 3: Scannable Course Cards

**What:** Compact course cards optimized for quick scanning - icon, title, and key info visible at a glance.

**Why:** Current cards are information-dense. Users browse courses by subject/year first, then read details.

**Key elements (in visual priority):**
1. Course icon/emoji (immediate visual anchor)
2. Course name (bold, prominent)
3. Year badge (colored pill)
4. Price (right-aligned or bottom)
5. Description (secondary, can be truncated)
6. CTA button

**Implementation:**
```css
.course-card-v2 {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.3s ease;
}

.course-card-v2:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: var(--purple-400);
    transform: translateY(-2px);
}

.course-card-v2 .course-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--white);
}

.course-card-v2 .course-desc {
    font-size: 0.9rem;
    color: var(--gray-400);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

### Pattern 4: Mobile-First Stacking

**What:** Pricing tiers stack vertically on mobile with featured tier still visually prominent.

**Why:** Research shows 78% of SaaS sites use stacked pricing on mobile. Horizontal scrolling has poor UX.

**Implementation:**
```css
@media (max-width: 768px) {
    .pricing-tiers-v2 {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .pricing-card.featured {
        transform: none;
        order: -1; /* Move featured to top on mobile */
    }

    .courses-grid {
        grid-template-columns: 1fr;
    }
}
```

### Anti-Patterns to Avoid

- **Too many plans:** More than 4 pricing options causes decision paralysis
- **Horizontal scroll tables:** Never on mobile - use stacked cards instead
- **Hover-only tooltips:** Use tap-activated accordions for accessibility
- **Hidden pricing:** Tutoring industry prefers transparent pricing (already good)
- **Feature overload:** Don't list every feature - highlight differentiators only

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Price toggle (monthly/annual) | Custom toggle logic | Not needed | BEAM charges weekly, no toggle required |
| Complex tier comparison | Feature matrix table | Visual hierarchy | 3 simple tiers don't need comparison tables |
| Animation libraries | GSAP, AOS | CSS transitions | Simple hover effects don't need libraries |
| Tab components | React tabs | Native HTML + CSS | Already have working tab implementation |

**Key insight:** This is a visual refresh, not a functionality change. Keep the existing interactive logic (package selection, tab switching) and focus purely on CSS styling updates.

## Common Pitfalls

### Pitfall 1: Breaking Package Selection Functionality

**What goes wrong:** Restyling pricing tiers disrupts the existing JavaScript that tracks selected packages for the contact form.

**Why it happens:** Changing HTML structure or class names breaks `onclick` handlers and `data-` attributes.

**How to avoid:** Preserve all `data-tier`, `data-pkg` attributes and `onclick` handlers. Style around existing structure.

**Warning signs:** Package selection stops updating contact form summary.

### Pitfall 2: Featured Tier Not Standing Out on Mobile

**What goes wrong:** `transform: scale(1.05)` or overlapping badges look broken when cards stack vertically.

**Why it happens:** Desktop-centric design doesn't account for mobile stacking.

**How to avoid:** Use border/shadow emphasis instead of scale transforms on mobile. Move featured tier to top of stack with `order: -1`.

**Warning signs:** Featured plan looks identical to others on narrow screens.

### Pitfall 3: Course Card Grid Breaking at Awkward Widths

**What goes wrong:** Grid shows orphan cards or uneven rows at tablet widths.

**Why it happens:** Fixed column counts don't adapt smoothly.

**How to avoid:** Use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` for fluid adaptation.

**Warning signs:** Single card on last row looking isolated, or cards at tablet width being too wide.

### Pitfall 4: Inconsistent Dark Section Styling

**What goes wrong:** Cards look jarring against dark background due to contrast issues.

**Why it happens:** Using white card backgrounds on dark section creates harsh contrast.

**How to avoid:** Use subtle semi-transparent backgrounds (`rgba(255,255,255,0.05)`) with low-opacity borders for cards on dark backgrounds.

**Warning signs:** Cards appearing to "float" disconnected from section.

### Pitfall 5: Tab Navigation Losing State

**What goes wrong:** Restyling year tabs breaks active state tracking.

**Why it happens:** CSS changes override or conflict with existing `.active` class styling.

**How to avoid:** Test tab switching after any tab styling changes. Preserve existing JS logic.

**Warning signs:** Active tab doesn't visually differ from inactive tabs.

## Code Examples

### Pricing Card with v2 Styling

```html
<article class="pricing-card featured">
    <div class="pricing-badge">Most Popular</div>
    <div class="pricing-header">
        <h3 class="pricing-name">Intermediate</h3>
        <p class="pricing-years">Years 9-10</p>
    </div>
    <div class="pricing-price">
        <span class="price-from">from</span>
        <span class="price-amount">$100</span>
        <span class="price-period">/week</span>
    </div>
    <ul class="package-list">
        <li onclick="selectPackage('Intermediate', '1 Subject')" data-tier="Intermediate" data-pkg="1">
            <span class="pkg-name">1 Subject</span>
            <span class="pkg-price">$100/wk</span>
        </li>
        <!-- ... more packages ... -->
    </ul>
    <a href="#contact" class="pricing-cta">Start Free</a>
</article>
```

```css
/* Pricing Card - v2 Style */
.pricing-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 32px;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
}

.pricing-card:hover {
    transform: translateY(-4px);
    border-color: rgba(124, 58, 237, 0.4);
    box-shadow: 0 20px 60px rgba(124, 58, 237, 0.15);
}

.pricing-card.featured {
    background: rgba(124, 58, 237, 0.1);
    border: 2px solid var(--purple-500);
}

.pricing-badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, var(--purple-600), var(--purple-700));
    color: white;
    padding: 8px 20px;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.pricing-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 4px;
}

.pricing-years {
    font-size: 0.95rem;
    color: var(--gray-400);
}

.price-amount {
    font-size: 3rem;
    font-weight: 700;
    color: var(--white);
    line-height: 1;
}

.price-from, .price-period {
    font-size: 0.9rem;
    color: var(--gray-400);
}
```

### Course Card with Improved Scannability

```html
<article class="course-card-v2" data-years="9-10">
    <div class="course-header">
        <span class="course-icon">⚡</span>
        <span class="course-year-pill">Years 9-10</span>
    </div>
    <h3 class="course-title">Physics</h3>
    <p class="course-desc">Build strong foundations in mechanics, waves, and energy for senior Physics success.</p>
    <div class="course-footer">
        <span class="course-price">$100<span>/week</span></span>
        <a href="#contact" class="course-cta">Try Free</a>
    </div>
</article>
```

```css
.course-card-v2 {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s ease;
}

.course-card-v2:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(124, 58, 237, 0.3);
    transform: translateY(-2px);
}

.course-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.course-icon {
    font-size: 2rem;
}

.course-year-pill {
    background: var(--purple-600);
    color: white;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 600;
}

.course-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 8px;
}

.course-desc {
    font-size: 0.9rem;
    color: var(--gray-400);
    line-height: 1.5;
    margin-bottom: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.course-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.course-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--white);
}

.course-price span {
    font-size: 0.85rem;
    font-weight: 400;
    color: var(--gray-400);
}

.course-cta {
    background: transparent;
    border: 1px solid var(--purple-500);
    color: var(--purple-400);
    padding: 8px 16px;
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s ease;
}

.course-cta:hover {
    background: var(--purple-600);
    border-color: var(--purple-600);
    color: white;
}
```

### Year Tabs with v2 Styling

```css
.year-tabs {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

.year-tab {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--gray-400);
    padding: 12px 24px;
    border-radius: 100px;
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.year-tab:hover {
    border-color: var(--purple-400);
    color: var(--white);
}

.year-tab.active {
    background: var(--purple-600);
    border-color: var(--purple-600);
    color: white;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Feature comparison tables | Visual hierarchy + badges | 2023-2024 | Reduces cognitive load |
| All features listed equally | 3-5 key differentiators | 2024 | Improves scannability |
| Heavy drop shadows | Subtle elevation + borders | 2024-2025 | Cleaner, modern aesthetic |
| Rigid grid columns | CSS auto-fit with minmax | 2023+ | Better responsive behavior |
| Scale transforms for emphasis | Border/glow emphasis | 2025 | Mobile-friendly highlighting |

**Current trends in 2025-2026:**
- Glass morphism / frosted glass effects (subtle backdrop-blur)
- Gradient accents on borders and badges
- Micro-interactions on hover (subtle transforms)
- Reduced visual complexity (fewer colors, cleaner typography)
- Dark mode as default for pricing sections (increases price visibility)

## Visual Design Recommendations

### Pricing Tiers - Specific Decisions

1. **Layout:** Keep 3-column structure (matches best practices)
2. **Featured tier:** Intermediate (Years 9-10) - has the most package options and All Access
3. **Highlight method:** Elevated position (slight scale or shadow), gradient border, "Most Popular" badge
4. **All Access integration:** Keep prominent hero banner above tiers, include in-tier All Access option for Intermediate/Senior
5. **Package list styling:** Horizontal rows within cards (current approach is good), improve hover states

### Course Browser - Specific Decisions

1. **Layout:** Responsive grid (`auto-fit, minmax(300px, 1fr)`) instead of fixed 3-column
2. **Card density:** Reduce padding, truncate descriptions to 2 lines
3. **Information hierarchy:** Icon > Title > Year badge > Price (description de-emphasized)
4. **Tab styling:** Pill-style tabs matching v2 design language
5. **Course count:** Consider "mini-cards" approach for the 24 courses - show more per row

### Color and Visual Consistency

1. **Section background:** Keep dark (`--gray-900`) - contrasts with white About section
2. **Card backgrounds:** Use `rgba(255,255,255,0.03)` with subtle borders
3. **Accent color:** Purple gradients for badges, borders, and CTAs
4. **Typography:** Match clamp sizing pattern from About section

## Open Questions

Things that couldn't be fully resolved:

1. **All Access banner prominence**
   - What we know: It's currently a large hero-style banner at the top
   - What's unclear: Should it stay separate or integrate into tier cards?
   - Recommendation: Keep prominent banner but reduce height slightly, ensure it doesn't overshadow individual tier selection

2. **Course card action after selection**
   - What we know: Cards currently link to contact form
   - What's unclear: Should clicking a course card auto-select that subject?
   - Recommendation: Out of scope for visual phase - keep existing behavior

3. **24 courses = significant scroll**
   - What we know: Many courses to display, especially for Years 11-12
   - What's unclear: Should we paginate or use a different layout?
   - Recommendation: Keep tabs, improve card density so more fit without scrolling

## Sources

### Primary (HIGH confidence)
- [Smashing Magazine - Designing Better Pricing Page](https://www.smashingmagazine.com/2022/07/designing-better-pricing-page/) - UX patterns, mobile design
- [CXL - Mobile SaaS Pricing Pages](https://cxl.com/blog/mobile-saas-pricing-pages/) - Mobile stacking patterns (78% use stacked)
- [Eleken - SaaS Pricing Page Design Best Practices](https://www.eleken.co/blog-posts/saas-pricing-page-design-8-best-practices-with-examples) - 3 plan recommendation, highlighting
- [Paradiso - Course Catalog Best Practices 2025](https://www.paradisosolutions.com/blog/designing-an-effective-course-catalog-best-practices/) - Filtering, navigation

### Secondary (MEDIUM confidence)
- [Webstacks - 20 Best SaaS Pricing Page Examples 2025](https://www.webstacks.com/blog/saas-pricing-page-design) - Visual examples
- [UXPin - Pricing Page Examples](https://www.uxpin.com/studio/blog/pricing-page-examples/) - Conversion optimization
- [Design Studio - 12 SaaS Pricing Page Best Practices 2026](https://www.designstudiouiux.com/blog/saas-pricing-page-design-best-practices/) - Latest trends
- [Justinmind - Card UI Design](https://www.justinmind.com/ui-design/cards) - Card fundamentals

### Tertiary (LOW confidence - for inspiration only)
- [Dribbble - Course Card Designs](https://dribbble.com/tags/course-card) - Visual inspiration
- [Stylokit - Top 10 Course Platform Designs 2025](https://stylokit.com/blog/top-10-course-platform-designs-for-2025) - Platform examples

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Pure CSS, no dependencies, clear patterns
- Architecture: HIGH - Well-documented industry patterns, existing implementation to match
- Pitfalls: HIGH - Based on specific existing codebase analysis
- Visual recommendations: MEDIUM - Based on industry best practices applied to specific context

**Research date:** 2026-01-23
**Valid until:** 60 days (visual design patterns are relatively stable)

---

*Phase: 14-courses-section-redesign*
*Research complete: 2026-01-23*
