# Phase 16: Courses Section Visual Polish - Research

**Researched:** 2026-01-24
**Domain:** CSS Visual Polish / Design System Consistency
**Confidence:** HIGH

## Summary

Analyzed the BEAM Academy landing page to identify visual gaps between the Courses section (dark theme) and other v2 sections (Hero, About, FAQ). The site has a solid foundation from Phases 13-15, but the Courses section lacks some of the visual refinements present in other sections.

**Key finding:** The Hero and About sections have more sophisticated visual treatments (gradients, shadows, animations, decorative elements) that the Courses section is missing. The dark theme works well but needs polish to match v2 quality.

**Primary recommendation:** Add gradient backgrounds, refine shadows with purple accents, and improve hover states across the Courses section to match the visual sophistication of Hero/About.

## Current State Analysis

### Courses Section Structure (Lines 5777-6272)
The Courses section consists of:
1. **Section Header** - Title, tag, description
2. **All Access Hero Banner** - Premium gradient banner (well-styled from Phase 14)
3. **Enrollment Info Prompt** - "How it works" helper text
4. **Pricing Tiers** - 3 columns: Junior, Intermediate, Senior
5. **Course Browser Divider** - "Browse Our Courses" heading
6. **Year Tabs** - Filter buttons: Years 7-8, 9-10, 11-12
7. **Course Cards Grid** - 24 course cards with icons, titles, descriptions, prices
8. **Pricing Note** - Footer disclaimer

### Current Courses Section Styling

| Element | Current Style | Notes |
|---------|--------------|-------|
| Background | `var(--gray-900)` solid | No decorative elements or gradients |
| Section Title | Gradient text (good) | Already has gradient via line 4067-4072 |
| Pricing Tiers | 16px border-radius, 1px border | Minimal shadow/depth |
| Course Cards | 20px border-radius, translateY hover | Hover shadow exists but basic |
| Year Tabs | 100px border-radius (pill), purple-700 active | Good, could have subtle shadow |
| Course Icons | 48x48, 12px border-radius | Simple styling, no glow effect |
| CTAs | tier-cta, course-btn | Consistent but no shadow |

## Visual Gap Analysis

### Gap 1: Background Treatment

**Hero Section:**
```css
background: linear-gradient(180deg, #ffffff 0%, #faf8ff 50%, #f5f0ff 100%);
/* Plus ::before and ::after pseudo-elements with radial gradients */
```

**About Section:**
```css
background: var(--gray-50);
/* Plus subtle dot pattern via ::before (line 4091-4102) */
```

**Courses Section:**
```css
background: var(--gray-900);  /* Flat solid color only */
```

**Gap:** Courses has no decorative background elements - no gradients, no patterns.

### Gap 2: Shadow Quality

**Hero Cards:**
```css
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);  /* Large, soft shadow */
/* Hover: */
box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
```

**About Image:**
```css
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
```

**About Badge:**
```css
box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);  /* Purple-tinted shadow */
```

**Pricing Tiers:**
```css
/* No explicit box-shadow in .pricing-tier-new */
border: 1px solid var(--gray-700);
```

**Course Cards:**
```css
/* Hover only: */
box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
```

**Gap:** Pricing tiers have no shadow at all. Course cards only have shadow on hover, not base state. No purple-accented shadows in dark section.

### Gap 3: Interactive Feedback

**Hero Badge:**
```css
transition: all 0.3s ease;
.hero-badge:hover {
    transform: translateY(-2px);
    background: var(--purple-200);
}
```

**FAQ Items:**
```css
.faq-item:hover {
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
    border-color: var(--purple-200);
}
```

**Pricing Tier Packages (li):**
```css
.tier-packages li:hover {
    background: rgba(124, 58, 237, 0.15);
}
```

**Gap:** Package hover states are subtle (just background change). No shadow or border feedback on pricing tiers. Course cards have good hover but no focus states.

### Gap 4: Decorative Elements

**Hero Section Has:**
- Floating cards with icons (line 943-978)
- Testimonial star badge (line 767-774)
- Portal mockup with colored dots (line 817-830)

**About Section Has:**
- Badge with box-shadow (BHHS Graduates)
- Dot pattern background
- Checkmark features with ::before

**Courses Section Missing:**
- No decorative pseudo-elements on section
- No accent lines or dividers (other than basic border-top)
- Course icons are flat (no glow or shadow)

### Gap 5: Typography Refinement

**Hero:**
```css
.hero h1 {
    font-size: clamp(2.8rem, 6vw, 4.5rem);
    letter-spacing: -0.03em;
    line-height: 1.1;
}
```

**About:**
```css
.about-text h2 {
    font-size: clamp(2rem, 4vw, 2.75rem);
    /* No letter-spacing specified */
}
```

**Courses:**
```css
.section-title (shared) - already has gradient
.tier-name {
    font-size: 1.5rem;
    /* No letter-spacing */
}
.course-card h3 {
    font-size: 1.15rem;
    /* No letter-spacing */
}
```

**Gap:** Minor - could add letter-spacing to tier names for visual hierarchy.

### Gap 6: Button/CTA Styling

**Hero Primary Button:**
```css
background: linear-gradient(135deg, var(--purple-600), var(--purple-700));
box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
```

**Tier CTA:**
```css
background: transparent;
border: 2px solid var(--purple-500);
/* No shadow */
```

**Course Button:**
```css
background: var(--purple-600);
/* No shadow, no gradient */
```

**Gap:** Tier and course CTAs lack the gradient and shadow of hero buttons.

## Improvement Opportunities

### Priority 1: Add Depth to Pricing Tiers (HIGH IMPACT)

**What:** Add subtle base shadows and improved hover shadows to pricing tiers.

**CSS Pattern:**
```css
.pricing-tier-new {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.pricing-tier-new:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(124, 58, 237, 0.3);
    border-color: var(--purple-600);
}
```

### Priority 2: Enhance Course Card Base State (HIGH IMPACT)

**What:** Add subtle glow/shadow to course cards even at rest.

**CSS Pattern:**
```css
.course-card {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.course-card:hover {
    box-shadow: 0 16px 40px rgba(124, 58, 237, 0.25);  /* Purple-tinted */
}
```

### Priority 3: Add Background Decoration (MEDIUM IMPACT)

**What:** Add subtle decorative gradient or pattern to courses section.

**CSS Pattern:**
```css
.courses-pricing::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 50%;
    background: radial-gradient(ellipse at top right, rgba(124, 58, 237, 0.08) 0%, transparent 60%);
    pointer-events: none;
}
```

### Priority 4: Improve Course Icon Styling (MEDIUM IMPACT)

**What:** Add subtle glow to course icons for visual interest.

**CSS Pattern:**
```css
.course-icon {
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2);
}
```

### Priority 5: Enhance Year Tab Active State (LOW IMPACT)

**What:** Add shadow to active year tab for better emphasis.

**CSS Pattern:**
```css
.year-tab.active {
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
}
```

### Priority 6: Button Gradient Consistency (MEDIUM IMPACT)

**What:** Add gradient and shadow to tier CTAs and course buttons.

**CSS Pattern:**
```css
.tier-cta {
    background: linear-gradient(135deg, transparent, transparent);  /* Keep outline style */
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.2);
}

.tier-cta:hover {
    background: linear-gradient(135deg, var(--purple-600), var(--purple-700));
    box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
}

.course-btn {
    background: linear-gradient(135deg, var(--purple-600), var(--purple-700));
    box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
}
```

## Technical Approach

### Pattern: Dark Theme Shadow Colors

For dark backgrounds, shadows need different treatment:
- Use `rgba(0, 0, 0, 0.x)` for depth shadows
- Use `rgba(124, 58, 237, 0.x)` for purple accent glows on hover
- Combine both for layered effect

**Example:**
```css
box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.3),           /* Depth */
    0 0 20px rgba(124, 58, 237, 0.15);       /* Purple glow */
```

### Pattern: Subtle Background Decorations

For dark sections, use very low opacity gradients:
- `rgba(124, 58, 237, 0.05)` to `0.08` for subtle purple tints
- Position in corners to avoid overwhelming content
- Always use `pointer-events: none`

### Pattern: Consistent Transitions

Use consistent easing across all interactive elements:
```css
transition: all 0.3s ease;  /* Standard for most elements */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);  /* For more polish */
```

### Don't Hand-Roll

| Problem | Use This |
|---------|----------|
| Shadow values | Copy from Hero/About sections |
| Purple color variants | Use existing CSS variables |
| Transition timing | Match existing 0.2s/0.3s patterns |

## Code Examples

### Pricing Tier Enhancement
```css
/* Source: Based on Hero card shadows + purple accents */
.pricing-tier-new {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.pricing-tier-new:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(124, 58, 237, 0.3);
    border-color: var(--purple-500);
}
```

### Course Card Enhancement
```css
/* Source: Based on FAQ item hover + Hero card patterns */
.course-card {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}

.course-card:hover {
    transform: translateY(-4px);
    border-color: var(--purple-500);
    box-shadow: 0 16px 40px rgba(124, 58, 237, 0.25);
}
```

### Section Background Decoration
```css
/* Source: Based on Hero ::before pattern */
.courses-pricing {
    position: relative;
}

.courses-pricing::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 40%;
    background: radial-gradient(ellipse at top right, rgba(124, 58, 237, 0.06) 0%, transparent 60%);
    pointer-events: none;
}
```

## Common Pitfalls

### Pitfall 1: Over-Saturating Dark Backgrounds
**What goes wrong:** Adding too many glowing elements makes the section look cheap
**How to avoid:** Keep decorative opacity below 0.1, use sparingly
**Warning signs:** Section feels "neon" or "gamer aesthetic"

### Pitfall 2: Inconsistent Hover Distances
**What goes wrong:** Some elements move 2px, others 8px on hover
**How to avoid:** Standardize: cards = -4px, buttons = -2px
**Warning signs:** Hover feels janky or uncoordinated

### Pitfall 3: Breaking Mobile Responsiveness
**What goes wrong:** New shadows/decorations break on mobile
**How to avoid:** Test all changes at mobile breakpoints, reduce effects on mobile
**Warning signs:** Performance issues or visual overflow on small screens

## Mobile Considerations

The Courses section already has responsive breakpoints at:
- `@media (max-width: 1200px)` - Line 3166
- `@media (max-width: 900px)` - Lines 2194, 4816

Polish changes should:
1. Reduce shadow intensity on mobile (save battery/performance)
2. Disable translateY hovers on touch devices
3. Keep background decorations minimal or hidden on mobile

## Open Questions

1. **Performance impact:** Should decorative ::before gradients be disabled on mobile for performance?
   - Recommendation: Test first, disable if jank occurs

2. **Featured tier treatment:** Should the featured pricing tier have additional visual treatment?
   - Current: Has `transform: scale(1.02)` and purple border
   - Recommendation: Could add stronger glow shadow

## Sources

### Primary (HIGH confidence)
- Direct analysis of `beamacademy-index.html` (current production file)
- Hero section CSS: lines 604-978
- About section CSS: lines 1805-1916
- Courses section CSS: lines 1919-2544
- FAQ section CSS: lines 3058-3148
- Animation/polish enhancements: lines 4035-4134

### Secondary (MEDIUM confidence)
- CSS shadow best practices from existing codebase patterns
- Transition timing patterns from codebase

## Metadata

**Confidence breakdown:**
- Current state analysis: HIGH - direct file inspection
- Visual gaps: HIGH - side-by-side CSS comparison
- Improvement patterns: HIGH - derived from existing v2 sections

**Research date:** 2026-01-24
**Valid until:** Indefinite (internal codebase analysis)

---

## RESEARCH COMPLETE

**Phase:** 16 - Courses Section Visual Polish
**Confidence:** HIGH

### Key Findings

1. **Pricing tiers lack shadows** - Hero cards have 20px+ shadows; pricing tiers have none
2. **Course cards only glow on hover** - Should have subtle base state shadow
3. **No background decoration** - Hero/About have gradients and patterns; Courses is flat gray-900
4. **CTAs lack gradient/shadow** - Hero buttons have both; course buttons are flat
5. **Course icons are flat** - Could benefit from subtle purple glow

### File Created

`.planning/phases/16-courses-visual-polish/16-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Visual Gap Analysis | HIGH | Direct CSS comparison |
| Improvement Patterns | HIGH | Derived from existing v2 code |
| Mobile Considerations | MEDIUM | Based on existing breakpoints |

### Ready for Planning

Research complete. Planner can now create PLAN.md files with specific CSS modifications for each improvement area.
