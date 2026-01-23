# Phase 13: About & Courses Overhaul - Research

**Researched:** 2026-01-23
**Domain:** CSS modernization, single-page landing page design consistency
**Confidence:** HIGH (based on existing codebase analysis - no external libraries involved)

## Summary

Phase 13 aims to modernize the About ("Building Education and Mastery") and Courses ("Invest in Your Future") sections to match the v2 design quality established in Phases 6-11. This is a pure CSS/HTML consistency pass rather than a feature addition.

The About section currently uses older styling patterns (no section-header component, simpler badge treatment, basic feature checkmarks). The Courses section is already well-styled but was built before v2 patterns were fully established, leading to some inconsistencies in badge usage and spacing.

**Primary recommendation:** Apply v2 design patterns systematically - add section-header to About, standardize badge components across both sections, and ensure mobile responsiveness matches other v2 sections.

## Current State Analysis

### About Section (Lines 5719-5752)

**HTML Structure:**
```html
<section class="about" id="about">
  <div class="container">
    <div class="about-content">           <!-- 2-column grid -->
      <div class="about-image">           <!-- Left: image + badge -->
        <div class="about-image-main about-photo">
          <img src="images/classroom-students.jpg">
        </div>
        <div class="about-badge">         <!-- BHHS Graduates badge -->
          <div class="about-badge-number">BHHS</div>
          <div class="about-badge-text">Graduates</div>
        </div>
      </div>
      <div class="about-text">            <!-- Right: text content -->
        <h2>Building Education And Mastery</h2>
        <p>...</p>
        <div class="about-features">      <!-- 6 checkmark features -->
          <div class="about-feature">...</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Styling Gaps (vs v2 sections):**

| Element | Current (About) | v2 Pattern | Gap |
|---------|-----------------|------------|-----|
| Section header | No `section-header`, no `section-tag` | Uses `header.section-header` with `.section-tag`, `.section-title`, `.section-description` | Missing standardized header |
| Badge | Custom `.about-badge` (absolute positioned, purple-700 bg) | `.proof-badge`, `.trust-badge`, `.support-badge` use pill style with icon | Different badge style |
| Background | `var(--gray-50)` | v2 sections use white, purple-50, or gray-50 consistently | OK |
| Container | Standard `.container` | Same | OK |
| Typography | Direct h2 styling (2.25rem) | Uses `.section-title` with clamp sizing | Not using shared class |
| Features | Checkmark pseudo-elements | v2 uses icon boxes (`.support-feature-icon`) | Simpler than v2 |

### Courses Section (Lines 5755-5875+)

**HTML Structure:**
```html
<section class="courses-pricing" id="courses">
  <div class="container">
    <header class="section-header">       <!-- Already using v2 pattern -->
      <div class="section-tag">Courses & Pricing</div>
      <h2 class="section-title">Invest in Your Future</h2>
      <p class="section-description">...</p>
    </header>

    <div class="all-access-hero">         <!-- Hero banner -->
    <p>Or choose individual subjects...</p>
    <div class="enrollment-info-prompt">  <!-- How it works -->
    <div class="pricing-tiers-new">       <!-- 3 pricing cards -->
    <div class="course-browser-divider">  <!-- Browse Our Courses -->
    <div class="year-tabs">               <!-- Year level tabs -->
    <div class="courses-grid">            <!-- Course cards -->
  </div>
</section>
```

**Styling Gaps (vs v2 sections):**

| Element | Current (Courses) | v2 Pattern | Gap |
|---------|------------------|------------|-----|
| Section header | Uses `section-header` correctly | Same | OK |
| Background | `var(--gray-900)` dark theme | Different from other sections (intentional for contrast) | OK (design choice) |
| All Access banner | Custom `.all-access-hero` | Could use v2 card patterns | Minor consistency issue |
| Pricing tiers | Clean design with `.pricing-tier-new` | Similar to v2 card hover effects | OK |
| Course cards | Good hover effects, uses purple accents | Similar to v2 patterns | OK |
| Mobile | Has responsive breakpoints | Need to verify consistency | Review needed |

## v2 Design Patterns (Established in Phases 6-11)

### 1. Section Header Pattern
All v2 sections use this standardized header:

```html
<header class="section-header">
  <div class="proof-badge"><!-- or trust-badge, support-badge --></div>  <!-- Optional badge -->
  <h2 class="section-title" id="[section]-title">Title</h2>
  <p class="section-description">Subtitle text</p>
</header>
```

**CSS:**
```css
.section-header {
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 60px;
}

.section-tag {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--purple-600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  color: var(--gray-900);
  margin-bottom: 20px;
}

.section-description {
  font-size: 1.15rem;
  color: var(--gray-500);
}
```

### 2. Badge Pattern (Pill with Icon)
v2 sections use pill-shaped badges with optional icons:

```html
<div class="trust-badge">
  <svg class="trust-badge-icon">...</svg>
  All Baulkham Hills High School Graduates
</div>
```

**CSS:**
```css
.trust-badge, .proof-badge, .support-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--purple-100);
  color: var(--purple-700);
  padding: 10px 24px;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
}
```

### 3. Card Hover Pattern
v2 cards use consistent hover effects:

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--purple-200);
}
```

### 4. Feature List Pattern (Support Section)
v2 uses icon boxes for features:

```html
<div class="support-feature">
  <div class="support-feature-icon">
    <svg>...</svg>
  </div>
  <span class="support-feature-text">Feature description</span>
</div>
```

**CSS:**
```css
.support-feature {
  display: flex;
  align-items: center;
  gap: 16px;
}

.support-feature-icon {
  width: 48px;
  height: 48px;
  background: var(--purple-100);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--purple-700);
}
```

### 5. Mobile Responsiveness Pattern
v2 sections use consistent breakpoints:

- `@media (max-width: 1024px)` - Tablet breakpoint
- `@media (max-width: 768px)` - Mobile breakpoint
- `@media (max-width: 600px)` - Small mobile breakpoint

Grid collapses to single column, spacing reduces proportionally.

## Gap Analysis

### About Section Changes Needed

| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| HIGH | Add `section-header` wrapper with `section-title` class | Low | Typography consistency |
| MEDIUM | Convert `.about-badge` to pill badge style | Medium | Visual consistency |
| MEDIUM | Add section-tag "About Us" above title | Low | Pattern consistency |
| LOW | Upgrade feature checkmarks to icon boxes | High | Optional enhancement |
| HIGH | Verify mobile responsive matches v2 | Low | Mobile consistency |

### Courses Section Changes Needed

| Priority | Change | Effort | Impact |
|----------|--------|--------|--------|
| LOW | Verify All Access hero consistency | Low | Minor polish |
| HIGH | Verify mobile responsive matches v2 | Low | Mobile consistency |
| LOW | Consider adding insight callout (like proof-insight) | Low | Optional enhancement |

## Technical Approach Recommendations

### Approach 1: Minimal Changes (Recommended)
Apply v2 patterns to About section only, leave Courses largely as-is since it already uses section-header.

**Changes:**
1. Wrap About h2 in `<header class="section-header">`
2. Add `.section-title` class to h2
3. Add optional section-tag above title
4. Update `.about-badge` to pill style
5. Mobile verification for both sections

**Pros:** Minimal risk, quick implementation
**Cons:** About features still use simpler checkmark style (acceptable)

### Approach 2: Full v2 Alignment
Apply all v2 patterns including feature icon boxes.

**Changes:**
- All of Approach 1
- Convert `.about-feature` checkmarks to icon boxes like `.support-feature`

**Pros:** Maximum consistency
**Cons:** More effort, risk of over-engineering

**Recommendation:** Use Approach 1. The About section checkmarks work well and changing them adds risk without significant benefit.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Section headers | Custom h2 styling | `.section-header`, `.section-title` | Already exists, DRY |
| Badges | Custom badge CSS | Extend `.trust-badge` pattern | Consistency |
| Responsive breakpoints | New media queries | Match existing 1024px/768px/600px | Consistency |
| Card hover effects | New animations | Use existing `translateY(-4px)` + shadow pattern | Proven |

## Common Pitfalls

### Pitfall 1: Breaking Mobile Layout
**What goes wrong:** Adding section-header can break mobile text centering
**Why it happens:** Parent flex/grid contexts override text-align
**How to avoid:** Test at 375px width before committing
**Warning signs:** Header text not centered on mobile

### Pitfall 2: CSS Specificity Conflicts
**What goes wrong:** New styles don't apply because existing selectors are more specific
**Why it happens:** About section has its own `.about-text h2` selector
**How to avoid:** Either remove old selector or use same specificity level
**Warning signs:** Styles not applying despite correct class names

### Pitfall 3: Badge Positioning Breakage
**What goes wrong:** Converting `.about-badge` (absolute positioned) to pill style breaks image layout
**Why it happens:** Absolute positioning is tied to image container
**How to avoid:** Move badge to header area OR keep absolute positioning but update visual style
**Warning signs:** Badge overlaps wrong element or disappears

### Pitfall 4: Dark Theme Inconsistency
**What goes wrong:** About section is light theme, Courses is dark - must maintain this
**Why it happens:** Accidentally applying wrong color variables
**How to avoid:** About uses `--gray-50` bg, `--gray-900` text; Courses uses `--gray-900` bg, white text
**Warning signs:** Text becomes unreadable

## Code Examples

### Converting About Header to v2 Pattern

**Before:**
```html
<section class="about" id="about" aria-labelledby="about-title">
  <div class="container">
    <div class="about-content">
      <div class="about-image">...</div>
      <div class="about-text">
        <h2 id="about-title">Building Education And Mastery</h2>
        ...
      </div>
    </div>
  </div>
</section>
```

**After (Option A - Header inside about-text):**
```html
<section class="about" id="about" aria-labelledby="about-title">
  <div class="container">
    <div class="about-content">
      <div class="about-image">...</div>
      <div class="about-text">
        <div class="about-section-tag">About Us</div>
        <h2 class="section-title" id="about-title">Building Education And Mastery</h2>
        ...
      </div>
    </div>
  </div>
</section>
```

**After (Option B - Full restructure with centered header):**
```html
<section class="about" id="about" aria-labelledby="about-title">
  <div class="container">
    <header class="section-header">
      <div class="about-badge-new">BHHS Graduates</div>
      <h2 class="section-title" id="about-title">Building Education And Mastery</h2>
      <p class="section-description">High-quality tutoring for Years 7-12</p>
    </header>
    <div class="about-content">
      <div class="about-image">...</div>
      <div class="about-text">
        <!-- Features and detailed text -->
      </div>
    </div>
  </div>
</section>
```

**Recommendation:** Option A is lower risk - keeps existing 2-column layout.

### Adding Section Tag to About

**New CSS:**
```css
.about-section-tag {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--purple-600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}

.about .section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  color: var(--gray-900);
  margin-bottom: 24px;
}
```

### Converting About Badge to Pill Style

**Before:**
```css
.about-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  background: var(--purple-700);
  color: white;
  padding: 20px 28px;
  border-radius: 16px;
  text-align: center;
}
```

**After (keep position, update visual):**
```css
.about-badge {
  position: absolute;
  bottom: -20px;
  right: -20px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: var(--purple-100);
  color: var(--purple-700);
  padding: 16px 24px;
  border-radius: 16px;
  border: 2px solid var(--purple-200);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);
}
```

## Mobile Verification Checklist

Both sections should be tested at these breakpoints:

| Breakpoint | Test For |
|------------|----------|
| 1024px | Grid to single column, spacing reduction |
| 768px | Font sizes reduce, padding reduces |
| 600px | Everything still readable, no horizontal scroll |
| 375px | iPhone SE size - minimum viable |
| 320px | Extreme small - should still work |

**About Section Mobile (current):**
- Grid goes single column at 1024px
- Features grid goes single column at 768px

**Courses Section Mobile (current):**
- Pricing tiers stack at 768px
- Year tabs wrap with smaller padding
- Course cards auto-fill grid handles responsiveness

## Open Questions

1. **Badge placement decision:**
   - Keep absolute positioned overlay on image? (current)
   - Move to header area as pill badge? (v2 pattern)
   - Recommendation: Keep current position but update visual style

2. **About features upgrade:**
   - Keep simple checkmarks? (current - works fine)
   - Upgrade to icon boxes? (v2 pattern - more work)
   - Recommendation: Keep checkmarks - they're effective and changing adds risk

## Sources

### Primary (HIGH confidence)
- Direct codebase analysis of `beamacademy-index.html`
- CSS lines 984-1012 (section-header patterns)
- CSS lines 1015-1100 (proof section patterns)
- CSS lines 1372-1520 (trust section patterns)
- CSS lines 1600-1800 (support section patterns)
- CSS lines 1804-1900 (about section patterns)
- CSS lines 1902-2520 (courses section patterns)

### Secondary (MEDIUM confidence)
- v2 ROADMAP showing phases 6-11 established design patterns
- Phase 12 consolidation context

## Metadata

**Confidence breakdown:**
- Current state analysis: HIGH - direct codebase inspection
- v2 patterns: HIGH - extracted from existing implementation
- Gap analysis: HIGH - side-by-side comparison
- Technical approach: HIGH - based on proven patterns in codebase

**Research date:** 2026-01-23
**Valid until:** Indefinitely (internal codebase research, no external dependencies)
