# Phase 22: Layout, Mobile & Conversion - Research

**Researched:** 2026-01-30
**Domain:** CSS Layouts, Mobile UX, Conversion Optimization
**Confidence:** HIGH

## Summary

This phase builds on the Phase 21.1 editorial design system (Fraunces + Bricolage Grotesque typography, 80+ design tokens, purple glow CTAs, tilted hero headline) to implement three interconnected areas: asymmetric/grid-breaking layouts, mobile excellence, and conversion optimization.

The current beamacademy-index.html has a solid foundation but uses conventional symmetric grid layouts throughout. Mobile support exists (sticky CTA bar, 44px tap targets, responsive breakpoints) but can be enhanced. Conversion elements are present but not optimally placed or emphasized.

**Primary recommendation:** Focus on selective asymmetric layouts in high-impact sections (hero, trust), mobile polish (tap targets verification, sticky CTA refinement), and conversion hierarchy improvements (primary CTA consistency, trust signal prominence).

## Current State Analysis

### Section Structure (Page Flow)
| Section | ID | Current Layout | Asymmetry Potential |
|---------|-----|----------------|---------------------|
| Hero | #home | 2-col grid (1fr 1fr) | HIGH - already tilted headline |
| Proof | #proof | 2x2 grid | MEDIUM - could offset cards |
| Comparison | #comparison | Table on desktop, cards on mobile | LOW - functional as-is |
| Trust | #trust | auto-fit grid for tutors + testimonials | HIGH - tutors could break grid |
| Support | #support | Single Discord mockup centered | MEDIUM - could offset |
| Pricing | #courses | 3-col grid for tiers | LOW - functional/clear |
| FAQ | #faq | Accordion list | LOW - functional |
| Contact | #contact | 2-col grid (info + form) | MEDIUM - could overlap |

### Current Mobile Implementation
| Feature | Status | Notes |
|---------|--------|-------|
| Sticky CTA Bar | IMPLEMENTED | IntersectionObserver shows after hero scroll |
| 44px Touch Targets | PARTIALLY | Global rule exists, but not all elements verified |
| Mobile Nav | IMPLEMENTED | Hamburger + slide-in menu |
| Form Input Types | GOOD | tel, email with inputmode attributes |
| Safe Area Insets | IMPLEMENTED | env(safe-area-inset-bottom) used |
| Responsive Grids | IMPLEMENTED | All grids collapse to 1-col on mobile |

### Current Conversion Elements
| Element | Location | Status |
|---------|----------|--------|
| Primary CTA | Hero, Pricing Tiers, Course Cards, Sticky Bar | "Get Your Free Diagnostic" |
| Trust Signals | Trust Section, Contact Form | Tutor credentials, 5.0 rating, testimonials |
| Stats | Hero mockup, Proof section | 95% improve stat, ATAR mentions |
| Risk Reversal | Hero, Pricing | "No payment required" messaging |
| Social Proof | Trust testimonials | Parent quote with attribution |

## Standard Stack

### Core (Already in Use)
| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| CSS Grid | Native | Page layouts | Native browser support, no dependencies |
| CSS Custom Properties | Native | Design tokens | Already established 80+ tokens |
| Intersection Observer | Native | Scroll detection | Sticky CTA already uses this |
| clamp() | Native | Fluid typography | Already in Phase 21.1 type scale |

### Supporting (No Additional Libraries Needed)
This phase requires NO new libraries. All implementation uses:
- Native CSS (Grid, Flexbox, transforms)
- Existing design tokens from Phase 21.1
- Native JavaScript APIs already in use

## Architecture Patterns

### Recommended Asymmetric Layout Patterns

**Pattern 1: Offset Grid Items**
```css
/* Source: CSS Grid specification - grid placement */
.section-content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-6);
}

/* Offset left item */
.content-left {
    grid-column: 1 / 7;  /* Takes 6 of 12 columns */
}

/* Offset right item with visual tension */
.content-right {
    grid-column: 6 / 13; /* Overlaps by 1 column */
    margin-top: var(--space-10); /* Vertical offset */
}
```

**Pattern 2: Asymmetric Card Grid**
```css
/* Source: Editorial design patterns */
.asymmetric-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-5);
}

.card:nth-child(1) { grid-column: 1 / 3; }  /* 2 cols */
.card:nth-child(2) { grid-column: 3 / 5; margin-top: var(--space-8); } /* Offset down */
.card:nth-child(3) { grid-column: 2 / 4; }  /* Center-ish */
```

**Pattern 3: Tilted Element (Already in Use)**
```css
/* Source: Phase 21.1 - hero h1 */
.tilted-element {
    transform: rotate(-2deg);
    transform-origin: left center;
}

/* Reset on mobile for readability */
@media (max-width: 768px) {
    .tilted-element {
        transform: none;
    }
}
```

### Mobile-First Touch Target Pattern
```css
/* Source: Apple HIG (44x44pt), WCAG (44x44px) */
/* Existing in file - ensure coverage */
a, button, [role="button"],
input[type="submit"], input[type="button"], input[type="reset"],
.btn, .nav-link, .nav-cta, .mobile-toggle,
.year-tab, .package-card, .faq-question {
    min-height: 44px;
    min-width: 44px;
}

/* Touch-friendly spacing between targets */
.button-group {
    gap: var(--space-3); /* 12px minimum between targets */
}
```

### Sticky CTA Enhancement Pattern
```css
/* Source: Current implementation + best practices */
.sticky-cta-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 950;
    /* Existing implementation is good */
    padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhancement: Hide when near contact form to avoid redundancy */
.sticky-cta-bar.near-form {
    transform: translateY(100%);
}
```

### Anti-Patterns to Avoid
- **Over-asymmetry:** Don't break grid on EVERY section - reserve for 2-3 high-impact areas
- **Tiny tap targets on mobile:** Never reduce below 44px even for "minor" links
- **Multiple competing CTAs:** Maintain single primary CTA pattern per viewport
- **Hiding trust signals on mobile:** These should remain prominent, not collapsed

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Touch target sizing | Manual pixel checks | CSS min-height/min-width rules | Consistent enforcement |
| Scroll-based visibility | Custom scroll listeners | IntersectionObserver (already used) | Performance, native |
| Fluid spacing | Media query breakpoints | CSS clamp() | Already in design system |
| Safe area handling | Fixed padding | env(safe-area-inset-*) | Already implemented |

**Key insight:** The existing codebase already has good patterns. This phase is about refinement and selective enhancement, not replacement.

## Common Pitfalls

### Pitfall 1: Asymmetry Causing Mobile Overflow
**What goes wrong:** Offset elements with negative margins or overlaps overflow on narrow screens
**Why it happens:** Desktop-first thinking; asymmetric patterns not reset on mobile
**How to avoid:** Always reset transforms/offsets at 768px breakpoint; test thoroughly
**Warning signs:** Horizontal scroll appears on mobile

### Pitfall 2: Sticky CTA Covering Content
**What goes wrong:** Fixed element covers important content or other interactive elements
**Why it happens:** Not accounting for sticky bar height in page layout
**How to avoid:** Add padding-bottom to body/main equal to sticky bar height when visible
**Warning signs:** Users can't tap footer links, floating buttons overlap

### Pitfall 3: Touch Target Collision
**What goes wrong:** Tap targets too close together cause mis-taps
**Why it happens:** Desktop spacing doesn't account for finger size
**How to avoid:** Minimum 8px (ideally 12px) gap between adjacent touch targets
**Warning signs:** User complaints about "wrong button" taps

### Pitfall 4: Trust Signals Below the Fold
**What goes wrong:** Key conversion elements only visible after significant scroll
**Why it happens:** Prioritizing "pretty" over persuasion
**How to avoid:** Ensure at least one trust signal visible in hero or immediately after
**Warning signs:** Low conversion despite traffic

### Pitfall 5: CTA Text Inconsistency
**What goes wrong:** Different CTAs say different things, causing confusion
**Why it happens:** Copy written at different times, not unified
**How to avoid:** Audit all CTAs - primary should always be "Get Your Free Diagnostic"
**Warning signs:** Multiple CTA variants like "Book Now", "Start Free", "Get Started"

## Code Examples

### Asymmetric Trust Section Layout
```css
/* Offset tutor cards for editorial feel */
.trust-tutors {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-5);
}

.tutor-card:nth-child(1) { grid-column: 1 / 2; }
.tutor-card:nth-child(2) { grid-column: 2 / 3; margin-top: var(--space-6); }
.tutor-card:nth-child(3) { grid-column: 3 / 4; }
.tutor-card:nth-child(4) { grid-column: 4 / 5; margin-top: var(--space-6); }

/* Reset on mobile */
@media (max-width: 900px) {
    .trust-tutors {
        grid-template-columns: repeat(2, 1fr);
    }
    .tutor-card {
        margin-top: 0 !important;
    }
}

@media (max-width: 600px) {
    .trust-tutors {
        grid-template-columns: 1fr;
    }
}
```

### Mobile-Optimized Form Inputs
```css
/* Source: Mobile UX best practices */
.form-input,
.form-textarea,
.form-select {
    /* Already has 14px padding, 16px font-size */
    font-size: 16px; /* Prevents iOS zoom on focus */
    min-height: 44px;
    touch-action: manipulation; /* Already present */
}

/* Enhanced focus state for mobile */
@media (hover: none) and (pointer: coarse) {
    .form-input:focus,
    .form-textarea:focus,
    .form-select:focus {
        border-color: var(--purple-500);
        box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.2);
    }
}
```

### Primary CTA Visual Hierarchy
```css
/* Ensure primary CTA stands out */
.btn-lime, .tier-cta, .sticky-cta-button {
    /* Consistent styling for all primary CTAs */
    background: var(--purple-700);
    color: white;
    box-shadow: var(--shadow-purple);
    font-weight: 600;
}

/* Secondary CTAs visually subordinate */
.btn-secondary, .nav-cta-secondary {
    background: transparent;
    border: 2px solid var(--purple-500);
    color: var(--purple-700);
    box-shadow: none;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Fixed breakpoints | Fluid clamp() values | 2023+ | Already implemented in Phase 21.1 |
| position: sticky alone | IntersectionObserver + class toggle | 2022+ | Already implemented |
| Separate mobile site | Mobile-first responsive | Standard for years | Already implemented |
| Button onclick handlers | Touch-friendly form elements | Standard | Already implemented |

**Current best practices already in use:**
- CSS custom properties for design tokens
- IntersectionObserver for scroll-triggered UI
- env() for safe area handling
- inputmode attributes for mobile keyboards

## Requirements Mapping

### VIS-04: Intentional Spatial Composition
**Implementation approach:**
1. Apply asymmetric offset to Trust section tutor cards
2. Consider subtle overlap in Contact section (form card overlapping info)
3. Maintain hero tilt from Phase 21.1
4. Do NOT over-apply - reserve for 2-3 sections max

### MOB-01: 44x44px Tap Targets
**Implementation approach:**
1. Audit all interactive elements
2. Verify global CSS rules are comprehensive
3. Add any missing elements to selector list
4. Test with browser dev tools mobile simulation

### MOB-02: Mobile Sticky CTA Persists
**Implementation approach:**
1. Current implementation works well
2. Enhancement: Hide when user is near contact form (avoid redundancy)
3. Ensure doesn't cover floating contact button

### MOB-03: Touch-Friendly Forms
**Implementation approach:**
1. Already has type="tel", type="email" with inputmode
2. Verify 16px font-size (iOS zoom prevention)
3. Ensure adequate spacing between fields (12px+)
4. Test on actual mobile device

### MOB-04: Color Contrast >= 4.5:1
**Implementation approach:**
1. Audit text colors against backgrounds
2. Purple on white should pass
3. Gray-500 on white may need darkening
4. Use browser accessibility tools to verify

### CONV-01: Single Primary CTA Pattern
**Implementation approach:**
1. Audit all CTAs - should all say "Get Your Free Diagnostic"
2. Hero, Sticky Bar, Pricing Tiers, Course Cards - verify consistency
3. Secondary CTAs (login, FAQ links) visually subordinate

### CONV-02: Trust Signals Prominent
**Implementation approach:**
1. Hero already has testimonial snippet
2. Form has trust-signal element ("95% improve")
3. Consider adding small trust badge near hero CTA
4. Tutor credentials are visible in Trust section

### CONV-03: Specific Stats Displayed
**Implementation approach:**
1. Already has: "95% improve in first term"
2. Already has: "2x 99.95 ATAR students"
3. Already has: "4 years tutoring experience"
4. Verify stats are visible early in page

### CONV-04: Clear Visual Hierarchy to CTA
**Implementation approach:**
1. Section flow already guides: Proof -> Comparison -> Trust -> Pricing -> Contact
2. Each section should have subtle CTA link (already has section-cta pattern)
3. Ensure primary CTA stands out visually (purple glow from 21.1)

## Open Questions

1. **Asymmetry Extent**
   - What we know: Editorial design benefits from some asymmetry
   - What's unclear: How much is "too much" for parent audience (40-55)
   - Recommendation: Start with Trust section only, evaluate before expanding

2. **Sticky CTA Auto-Hide**
   - What we know: Current shows after hero, stays visible
   - What's unclear: Should it hide when near Contact form?
   - Recommendation: Implement hide near form, test user feedback

## Sources

### Primary (HIGH confidence)
- beamacademy-index.html - Current implementation review
- Phase 21.1 design tokens - Typography and spacing system
- 22-CONTEXT.md - User decisions and discretion areas

### Secondary (MEDIUM confidence)
- Apple Human Interface Guidelines - 44pt touch targets
- WCAG 2.1 - Contrast ratio requirements
- Google Web Fundamentals - Mobile UX patterns

### Tertiary (LOW confidence - validate)
- General editorial web design patterns - asymmetry approaches

## Metadata

**Confidence breakdown:**
- Current state analysis: HIGH - direct code review
- Mobile patterns: HIGH - established standards
- Conversion patterns: MEDIUM - context-dependent
- Asymmetric layouts: MEDIUM - editorial judgment required

**Research date:** 2026-01-30
**Valid until:** 30 days (stable domain, no rapid changes expected)
