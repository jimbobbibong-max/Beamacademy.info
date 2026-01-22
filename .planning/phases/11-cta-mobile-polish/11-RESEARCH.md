# Phase 11: CTA & Mobile Polish - Research

**Researched:** 2026-01-23
**Domain:** CTA optimization, mobile responsive design, landing page conversion
**Confidence:** HIGH

## Summary

This phase focuses on two distinct but related objectives: (1) optimizing CTA copy to be outcome-focused rather than action-focused, and (2) verifying all new sections from phases 6-10 render correctly on mobile viewports (320px-428px).

The current codebase already has strong mobile foundations with responsive breakpoints at 768px and 600px. However, there are no explicit breakpoints for the smallest mobile viewports (320px-375px), which is the primary mobile testing gap. The CTA copy audit reveals multiple buttons that need updating from generic action text ("Book Trial", "Submit") to outcome-focused text ("Get Your Free Diagnostic").

**Primary recommendation:** Update 25+ CTA buttons to outcome-focused copy, then systematically test all 6 new sections (Hero, Proof, Comparison, Trust, Support, CTA) at 320px, 375px, and 428px viewports.

## Standard Stack

This phase is pure CSS/HTML optimization with no new libraries required.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Pure CSS | N/A | All mobile responsive fixes | Site uses no CSS frameworks; all styles are inline |
| Chrome DevTools | Latest | Mobile viewport testing | Standard for responsive testing at exact pixel widths |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| None | - | - | No supporting libraries needed |

**Installation:**
```bash
# No dependencies to install - pure HTML/CSS modifications
```

## Architecture Patterns

### Current Mobile Breakpoint Structure
```
CSS Media Query Hierarchy:
├── @media (min-width: 769px)     # Desktop
├── @media (max-width: 768px)     # Tablet/Mobile (primary breakpoint)
└── @media (max-width: 600px)     # Small mobile
```

**Gap identified:** No explicit handling for 320px-428px range. The 768px breakpoint handles most mobile cases, but ultra-narrow viewports (320px iPhone SE) may have overflow issues.

### Pattern 1: CTA Copy Hierarchy
**What:** All CTAs should follow outcome-focused pattern
**When to use:** Every button that leads to the contact form
**Example:**
```html
<!-- BEFORE: Action-focused -->
<a href="#contact" class="btn btn-primary">Book Free Trial</a>

<!-- AFTER: Outcome-focused -->
<a href="#contact" class="btn btn-primary">Get Your Free Diagnostic</a>
```

### Pattern 2: Mobile-First Section Testing
**What:** Test each section independently at target viewports
**When to use:** For all new sections (phases 6-10)
**Checklist per section:**
1. No horizontal scroll at 320px
2. Text readable (min 14px font size)
3. Touch targets >= 44px
4. Images/mockups scale properly
5. Grid layouts collapse to single column

### Anti-Patterns to Avoid
- **Overflow from fixed-width elements:** Document mockups in Proof section have fixed heights (200px/160px) - verify these don't cause issues
- **Touch target gaps:** Current nav CTAs and form buttons already have 44px minimum - maintain this
- **CTA inconsistency:** Don't have mixed CTA styles ("Book Trial" in some places, "Get Diagnostic" in others)

## CTA Copy Audit

### Current CTA Inventory (from HTML analysis)

| Location | Current Copy | Line # | Needs Update |
|----------|-------------|--------|--------------|
| Nav CTA | "Book Free Trial" | 5590 | YES |
| Mobile Nav | "Book Free Trial" | 5611 | YES |
| Hero Button | "Book Free Trial" | 5627 | YES |
| Pricing Tier Cards (x3) | "Start Free Trial" | 6174, 6194, 6214 | YES |
| Course Cards (x22) | "Book Trial" | 6246-6588 | YES |
| Portal CTA | "Start Your Free Trial" | 6687 | YES |
| Form Submit Button | "Book Your Free Trial" | 7030 | YES |
| Bottom CTA Section | "Start Your Free Trial" | 7055 | YES |
| Sticky CTA Bar | "Book Free Trial" | 7066 | YES |

**Total CTAs needing update:** 31 instances

### Recommended CTA Copy

| Context | Recommended Copy | Rationale |
|---------|-----------------|-----------|
| Primary CTAs (hero, nav, sticky bar) | "Get Your Free Diagnostic" | Outcome-focused, emphasizes the tangible deliverable |
| Pricing/Course Cards | "Get Started Free" or "Start Free" | Shorter for card context |
| Form Submit | "Get My Free Diagnostic" | Personal ownership with "My" |
| Bottom CTA | "Get Your Free Diagnostic" | Consistency with primary |

## Form Field Verification

### Current Form Structure (from HTML analysis)
```
Visible Fields:
1. Name * (required) - line 6997
2. Email (optional) - line 7001
3. Phone * (required) - line 7007
4. Year Level (optional dropdown) - line 7016

Hidden Fields:
- form-name, package, subjects, price, bot-field (honeypot)
```

**Assessment:** Form has 4 visible fields (3 required + 1 optional Year Level). This matches the v1 optimization target of 3-4 fields. No changes needed.

**Confidence:** HIGH - directly verified from HTML source

## New Sections Requiring Mobile Testing

### Sections Added in Phases 6-10

| Section | ID | Line Range | Key Mobile Concerns |
|---------|-----|------------|---------------------|
| Hero (Overhaul) | #home | 5617-5687 | Portal mockup scaling, hero-mockup-tags |
| Proof Section | #proof | 5690-5814 | 2x2 document grid, paper mockups |
| Comparison Section | #comparison | 5816-5897 | Table (hidden) vs Cards (visible) |
| Trust Section | #trust | 5899-5986 | 3-col tutor grid, trifecta badges, promise callout |
| Support Section | #support | 5988-6080 | Discord mockup, side-by-side layout |
| CTA Section | .cta | 7051-7057 | Simple, likely no issues |

### Specific Mobile Concerns by Section

**1. Hero Section (Phase 6)**
- Portal mockup has `.hero-mockup-tags` that go `flex-direction: column` on mobile
- Weak tags use `font-size: 0.75rem` - verify legibility at 320px
- Score value drops to `font-size: 2rem` - adequate

**2. Proof Section (Phase 7)**
- Grid changes to 1-column at 768px - GOOD
- `.document-preview` drops to 160px height on mobile
- Paper mockup text is 0.7rem - may be too small at 320px
- Fade gradient may obscure content

**3. Comparison Section (Phase 8)**
- Table hidden, cards shown on mobile - GOOD pattern
- Cards have max-width 500px - will center on wider mobiles
- Card labels use uppercase + 0.85rem - verify at 320px

**4. Trust Section (Phase 9)**
- Tutor grid: 3-col -> 2-col -> 1-col responsive - GOOD
- `.tutor-card` shrinks to max-width 180px on mobile
- Trifecta badges drop to 0.65rem font - small but acceptable
- Promise callout goes vertical on mobile - GOOD

**5. Support Section (Phase 10)**
- Discord mockup already has mobile styles (768px breakpoint)
- Avatar drops to 32px, text to 0.9rem - adequate
- Side-by-side layout stacks on mobile - verify

## Sticky CTA Bar Analysis

### Current Implementation
```html
<div class="sticky-cta-bar" id="sticky-cta-bar" inert>
    <div class="sticky-cta-container">
        <a href="tel:..." class="sticky-cta-phone">Call</a>
        <a href="#contact" class="sticky-cta-button">Book Free Trial</a>
    </div>
</div>
```

### CSS Analysis (from lines 3307-3393)
- Position: fixed bottom, z-index 950
- Hidden by default with transform: translateY(100%)
- Shows on scroll via `.visible` class (IntersectionObserver on hero)
- Hidden on desktop (min-width: 769px)
- Has container max-width 400px

**Concerns:**
1. CTA copy needs updating to outcome-focused
2. Floating contact button repositions when sticky bar visible (line 3389-3392)
3. May overlap with footer on very short pages - but current page is long enough

**Confidence:** HIGH - no structural issues expected, just copy update

## Image Impact on LCP

### Current Images in New Sections

| Image | Section | Size | Loading | LCP Impact |
|-------|---------|------|---------|------------|
| chris.jpg | Trust, Support | 400x400 | lazy | None |
| nathan.jpg | Trust | 400x400 | lazy | None |
| john.jpg | Trust | 400x400 | lazy | None |

**Assessment:** All new images use `loading="lazy"` attribute and are below the fold. No LCP regression expected. Current LCP baseline is 0.9s.

**No new hero images were added** - the portal mockup is pure CSS, which preserves the excellent LCP performance.

## Common Pitfalls

### Pitfall 1: Inconsistent CTA Copy
**What goes wrong:** Updating some CTAs but missing others creates confusion
**Why it happens:** Many CTAs spread across the file (31 instances)
**How to avoid:** Use grep to find all instances, update systematically
**Warning signs:** "Book Trial" appearing after "Get Diagnostic" in user flow

### Pitfall 2: Mobile Overflow on 320px
**What goes wrong:** Elements that fit 375px overflow at 320px (55px difference)
**Why it happens:** 768px breakpoint designed for tablets, not iPhone SE
**How to avoid:** Test specifically at 320px width in DevTools
**Warning signs:** Horizontal scrollbar appears, text gets cut off

### Pitfall 3: Touch Target Size Regression
**What goes wrong:** Resizing buttons for mobile makes them too small
**Why it happens:** Trying to fit more on screen
**How to avoid:** Maintain 44px minimum per Apple HIG (already in CSS)
**Warning signs:** min-height/min-width below 44px in CSS

### Pitfall 4: Form Scroll Anchor Issues
**What goes wrong:** CTA links to #contact but user doesn't see form
**Why it happens:** Package selection modal or other content above form
**How to avoid:** Test full user flow from each CTA to form completion
**Warning signs:** User clicks CTA but lands on confusing modal

## Code Examples

### CTA Update Pattern
```html
<!-- Nav CTA -->
<a href="#contact" class="nav-cta">Get Your Free Diagnostic</a>

<!-- Hero Button -->
<a href="#contact" class="btn btn-primary">Get Your Free Diagnostic</a>

<!-- Form Submit -->
<button type="submit" class="btn btn-primary form-submit btn-trial">
    <span class="btn-text"><span id="submitBtnText">Get My Free Diagnostic</span> →</span>
    ...
</button>

<!-- Sticky Bar -->
<a href="#contact" class="sticky-cta-button">Get Your Free Diagnostic</a>
```

### Mobile Testing Checklist CSS Pattern
```css
/* Add to catch 320px edge cases if needed */
@media (max-width: 375px) {
    /* Only if issues discovered during testing */
    .proof-badge { font-size: 0.75rem; }
    .paper-mockup { font-size: 0.65rem; }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Action verbs in CTAs | Outcome-focused CTAs | Modern conversion research | Higher conversion rates |
| 375px minimum mobile | 320px minimum | iPhone SE still common | Wider device support |
| Table on all screens | Mobile cards pattern | Responsive design evolution | Better UX on small screens |

## Mobile Testing Protocol

### Required Viewports (per MOB-01)
1. **320px** - iPhone SE, smallest target
2. **375px** - iPhone 12/13/14 standard
3. **390px** - iPhone 14 Pro
4. **428px** - iPhone 14 Pro Max (upper bound)

### Testing Checklist Per Section
```
For each of: Hero, Proof, Comparison, Trust, Support, CTA

At each viewport (320px, 375px, 428px):
[ ] No horizontal scroll
[ ] All text readable (no truncation)
[ ] Touch targets >= 44px
[ ] Images/mockups visible and proportional
[ ] Grids collapsed appropriately
[ ] CTA buttons full-width and tappable
[ ] No overlap with sticky bar
```

## Open Questions

1. **CTA Copy Variants**
   - What we know: "Get Your Free Diagnostic" is the primary recommended copy
   - What's unclear: Should course cards use same copy or shorter variant?
   - Recommendation: Use "Get Started Free" for course cards (limited space)

2. **320px Edge Cases**
   - What we know: Site has 768px and 600px breakpoints but not 320px
   - What's unclear: Whether any elements overflow at 320px
   - Recommendation: Test first, add 375px breakpoint only if issues found

3. **Modal Flow**
   - What we know: Package selection modal exists before form
   - What's unclear: Whether this interrupts user flow after CTA click
   - Recommendation: Test CTA -> modal -> form flow at each viewport

## Sources

### Primary (HIGH confidence)
- C:/Users/bskim/Downloads/beamacademy-index.html - Direct HTML analysis
- Phase 6-10 PLAN.md files - Section requirements and structure

### Secondary (MEDIUM confidence)
- CSS pattern analysis from existing codebase
- Mobile breakpoint standard practices

### Tertiary (LOW confidence)
- None - all findings from direct source code analysis

## Metadata

**Confidence breakdown:**
- CTA Inventory: HIGH - Direct grep of all button/anchor elements
- Form Fields: HIGH - Verified from HTML source
- Mobile Breakpoints: HIGH - CSS media queries directly examined
- New Sections: HIGH - Cross-referenced with phase plans

**Research date:** 2026-01-23
**Valid until:** Indefinite (code-based research, not library-dependent)
