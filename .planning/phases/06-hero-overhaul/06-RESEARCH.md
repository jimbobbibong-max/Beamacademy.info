# Phase 6: Hero Overhaul - Research

**Researched:** 2026-01-22
**Domain:** Static HTML hero section redesign
**Confidence:** HIGH

## Summary

This is a static HTML site (not Next.js), with all content in a single `index.html` file. The hero section exists at lines 4489-4525 and uses inline CSS defined in the same file. The current hero communicates "Expert Tutoring for Years 7-12" with a classroom teaching image, but does NOT communicate the category ("HSC Tutoring") or the differentiator (custom materials based on score tracking) as required by HERO-01 through HERO-05.

No portal screenshot currently exists in the codebase. The hero visual is currently a classroom teaching photo (`images/classroom-teaching.jpg`). The portal section lower on the page uses a CSS-only mockup (not a real screenshot). A real portal screenshot showing score tracking and weak topics will need to be created or the existing mockup pattern can be adapted for the hero.

**Primary recommendation:** Modify the existing hero section in index.html, replacing the current headline/visual approach with one that satisfies all HERO requirements. Use the existing mockup pattern from the portal section as a fallback if a real screenshot isn't available.

## Current Implementation

### File Structure
- **Single file:** `C:\Users\bskim\beamacademy-site\index.html` (226,980 bytes)
- **All CSS is inline** in `<style>` tags within the HTML file (lines ~123-4487)
- **All JS is inline** at the bottom of the file (lines ~5700+)

### Hero Section Location
- **HTML:** Lines 4489-4525 (`<section class="hero" id="home">`)
- **CSS:** Lines 603-850 (`.hero`, `.hero-*` selectors)
- **Mobile CSS:** Lines 3174-3221 (`@media (max-width: 768px)`)

### Current Hero Elements

| Element | Current Content | Class |
|---------|----------------|-------|
| Badge | "Epping, Sydney" | `.hero-badge` |
| Headline | "Expert Tutoring for Years 7-12" | `.hero h1` |
| Description | "Small classes by BHHS graduates..." | `.hero-description` |
| Primary CTA | "Start Free Trial" | `.btn.btn-primary` |
| Secondary CTA | "View Courses" | `.btn.btn-secondary` |
| Link | "Already enrolled? Pay for your term here" | `.hero-returning` |
| Social Proof | "5.0 - The teachers explain..." | `.hero-testimonial` |
| Visual | Classroom teaching image | `.hero-image-card` |
| Floating Cards | "Medical Students", "Personalised Plans" | `.floating-card` |

### Current Visual Hierarchy Problem
1. Badge says "Epping, Sydney" (location, not category)
2. Headline says "Years 7-12" (too broad, not HSC-specific)
3. No portal screenshot visible
4. Two CTAs compete for attention (violates HERO-04)

## Assets Available

### Existing Images
```
C:\Users\bskim\beamacademy-site\images\
  - classroom-teaching.jpg (48KB) - currently in hero
  - classroom-students.jpg (66KB) - in about section
  - chris.jpg, john.jpg, nathan.jpg, taehoon.jpg - tutor photos
```

### Portal Screenshot Status
**No real portal screenshot exists.** The portal section (lines 5105-5168) uses a CSS-only mockup:

```html
<div class="portal-mockup">
  <div class="portal-mockup-dots"><!-- macOS window dots --></div>
  <div class="portal-mockup-content">
    <div class="portal-mockup-title">Performance Dashboard</div>
    <div class="portal-mockup-row">
      <span>Algebra</span>
      <span class="score-green">92%</span>
    </div>
    <!-- more rows -->
  </div>
</div>
```

**Options for HERO-02 (Portal Screenshot):**

| Option | Effort | Authenticity | Recommendation |
|--------|--------|--------------|----------------|
| Real screenshot from portal | High (requires access) | Highest | Ideal but needs user |
| Adapt CSS mockup for hero | Low | Medium | Good fallback |
| Illustrated/designed mockup | Medium | Medium-High | Best balance |

**What the real portal shows (from Dashboard.jsx analysis):**
- Current Score percentage with trend arrows
- MCQ Average percentage
- Total Assessments count
- Homework Due count
- Weak Topics list with specific topic names
- Progress chart over time

## Technical Patterns

### CSS Design System

**Colors (CSS Variables):**
```css
--purple-700: #7c3aed;  /* Primary brand color */
--purple-600: #9333ea;  /* Accent highlights */
--purple-100: #f3e8ff;  /* Light background */
--gray-900: #18181b;    /* Headline text */
--gray-600: #52525b;    /* Body text */
```

**Typography:**
```css
--font-display: 'Outfit', sans-serif;
--font-body: 'Outfit', sans-serif;
```

**Button Pattern:**
```html
<a href="#contact" class="btn btn-primary">Primary CTA</a>
<a href="#courses" class="btn btn-secondary">Secondary CTA</a>
```

### Existing Tag/Label Pattern
```css
.section-tag {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--purple-600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}
```
Example usage: "Courses & Pricing", "Meet the Team", "Student Stories"

### Hero Badge Pattern (currently location-based)
```css
.hero-badge {
  display: inline-flex;
  background: var(--purple-100);
  color: var(--purple-700);
  padding: 12px 24px;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
}
.hero-badge::before { content: 'sparkles'; }
```

### Image Handling
- Images are served directly (no optimization pipeline)
- Use `loading="eager"` and `fetchpriority="high"` for hero images
- Width/height attributes set for CLS prevention
- Rounded corners via `border-radius: 24px`

### Responsive Breakpoints
```css
@media (max-width: 1024px) { /* tablet */ }
@media (max-width: 768px)  { /* mobile - most critical */ }
@media (max-width: 400px)  { /* small mobile */ }
```

**Mobile Hero Changes (768px):**
- Hero content stacks vertically (grid becomes single column)
- Buttons stack vertically, full width
- Floating cards hidden (`display: none`)
- h1 shrinks to 2.25rem (from clamp 2.8-4.5rem)

## Implementation Approach

### Required Changes for HERO-01 to HERO-05

| Requirement | Current State | Change Needed |
|-------------|--------------|---------------|
| HERO-01 | Generic "Years 7-12" | New headline with category + differentiator |
| HERO-02 | Classroom photo | Portal screenshot or mockup |
| HERO-03 | "Epping, Sydney" badge | "HSC Tutoring" category label |
| HERO-04 | Two CTAs | Single primary CTA |
| HERO-05 | BHHS graduates mention | Plain English subheadline about hook |

### Recommended Structure

```html
<section class="hero" id="home">
  <div class="container">
    <div class="hero-content">
      <div class="hero-text">
        <!-- HERO-03: Category label -->
        <div class="hero-category">HSC Tutoring</div>

        <!-- HERO-01: Headline with differentiator -->
        <h1>We Show You Exactly Where They're Struggling</h1>

        <!-- HERO-05: Plain English subheadline -->
        <p class="hero-description">
          Every student gets custom worksheets targeting their weak spots.
          Our portal tracks topic-by-topic scores so nothing gets missed.
        </p>

        <!-- HERO-04: Single CTA -->
        <div class="hero-buttons">
          <a href="#contact" class="btn btn-primary">Book Free Trial</a>
        </div>

        <!-- Existing elements to keep/adapt -->
        <p class="hero-returning">...</p>
        <div class="hero-testimonial">...</div>
      </div>

      <!-- HERO-02: Portal visual -->
      <div class="hero-visual">
        <div class="hero-card hero-portal-preview">
          <!-- Portal mockup or screenshot -->
        </div>
      </div>
    </div>
  </div>
</section>
```

### CSS Additions Needed

```css
/* Category label (new) - adapt from .section-tag pattern */
.hero-category {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--purple-600);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

/* Portal preview in hero (adapt from .portal-mockup) */
.hero-portal-preview {
  background: var(--gray-900);
  border-radius: 16px;
  padding: 24px;
  /* ... copy from portal-mockup styles */
}
```

### Elements to Remove/Change
- Remove secondary CTA ("View Courses")
- Change badge from "Epping, Sydney" to category label
- Replace classroom image with portal visual
- Consider keeping or moving floating cards

## Risks & Considerations

### Must Address

1. **No real portal screenshot exists**
   - Impact: HERO-02 requirement
   - Mitigation: Use CSS mockup initially, replace with real screenshot later
   - User action needed: Capture screenshot from live portal or provide one

2. **Mobile layout changes**
   - Current mobile hides floating cards and stacks content
   - Portal mockup needs to work at 320px width
   - Test thoroughly on mobile after changes

3. **Single CTA may reduce secondary conversions**
   - Currently "View Courses" is available
   - Impact: Some users may bounce without exploring
   - Mitigation: Courses still accessible via nav; consider keeping as subtle link

### Good to Know

4. **Large single HTML file**
   - 227KB HTML with inline CSS makes editing error-prone
   - Recommend using search/line numbers carefully
   - Changes affect SEO-critical content

5. **Existing CSS is well-organized**
   - Hero styles grouped together (lines 603-850)
   - Mobile overrides in single media query block
   - CSS variables make color changes consistent

6. **CTA destination unchanged**
   - Both current CTAs go to `#contact`
   - No routing changes needed

### Portal Mockup Data for HERO-02

Based on the real Dashboard.jsx, an authentic mockup should show:

```
Performance Dashboard
-----------------------
Current Score: 78%  [Needs Practice]
MCQ Average: 82%
Weak Topics:
  - Trigonometry: 64%
  - Calculus: 71%
  - Probability: 68%
```

This demonstrates the VALUE (personalized tracking of weak spots) not just the FEATURE (we have a portal).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Responsive layout | Custom JS breakpoint detection | CSS media queries already in place |
| Animation | Custom JS animations | Existing CSS transitions (0.3s cubic-bezier) |
| Color consistency | Hardcoded hex values | CSS variables (--purple-700 etc) |
| Button styles | New button classes | Existing .btn .btn-primary pattern |

## Common Pitfalls

### Pitfall 1: Breaking the mobile layout
**What goes wrong:** Adding new elements that don't stack properly on mobile
**Why it happens:** Desktop-first thinking, forgetting the 768px breakpoint
**How to avoid:** Check the existing mobile hero CSS (lines 3174-3221), ensure any new elements follow the grid collapse pattern
**Warning signs:** Elements overlapping on mobile, horizontal scroll appearing

### Pitfall 2: Removing CTAs users rely on
**What goes wrong:** Hiding "View Courses" completely removes a conversion path
**Why it happens:** Strict interpretation of "single CTA"
**How to avoid:** Keep as a subtle text link if needed, not a competing button
**Warning signs:** Bounce rate increases after change

### Pitfall 3: Mismatch between mockup and real portal
**What goes wrong:** Mockup shows features/data that don't exist in the real product
**Why it happens:** Making up impressive-looking data
**How to avoid:** Reference Dashboard.jsx for actual data structure (scores, topics, trends)
**Warning signs:** Users asking about features shown in mockup that don't exist

### Pitfall 4: Forgetting image optimization
**What goes wrong:** Large screenshot image causes LCP regression
**Why it happens:** Using unoptimized screenshot file
**How to avoid:** Optimize any new images, use width/height attributes, keep hero image under 100KB
**Warning signs:** Lighthouse LCP score increases from current 0.9s

## Code Examples

### Current Hero Badge (to be modified for category label)
```html
<!-- Current (line 4494) -->
<div class="hero-badge">Epping, Sydney</div>

<!-- New for HERO-03 -->
<div class="hero-category">HSC Tutoring</div>
```

### Current Hero Headline (to be modified for HERO-01)
```html
<!-- Current (line 4495) -->
<h1>Expert Tutoring for <span>Years 7-12</span></h1>

<!-- New for HERO-01 (example - Claude has discretion on exact wording) -->
<h1>We Show You Exactly Where <span>They're Struggling</span></h1>
```

### Current Hero Buttons (to be simplified for HERO-04)
```html
<!-- Current (lines 4500-4503) -->
<div class="hero-buttons">
  <a href="#contact" class="btn btn-primary">Start Free Trial</a>
  <a href="#courses" class="btn btn-secondary">View Courses</a>
</div>

<!-- New for HERO-04 -->
<div class="hero-buttons">
  <a href="#contact" class="btn btn-primary">Book Free Trial</a>
</div>
```

### Portal Mockup Pattern (can adapt for hero)
```html
<!-- From existing portal section (lines 5137-5164) -->
<div class="portal-mockup">
  <div class="portal-mockup-dots" aria-hidden="true">
    <span></span><span></span><span></span>
  </div>
  <div class="portal-mockup-content">
    <div class="portal-mockup-title">Performance Dashboard</div>
    <div class="portal-mockup-row">
      <span>Algebra</span>
      <span class="score-green">92%</span>
    </div>
    <!-- ... -->
  </div>
</div>
```

### Existing Responsive Pattern for Hero Content
```css
/* Existing (lines 2848, 3174-3221) */
@media (max-width: 1024px) {
  .hero-content { grid-template-columns: 1fr; gap: 40px; }
}
@media (max-width: 768px) {
  .hero { padding: 100px 0 60px; }
  .hero h1 { font-size: 2.25rem; }
  .hero-buttons { flex-direction: column; gap: 12px; }
  .hero-buttons .btn { width: 100%; }
  .floating-card { display: none; }
}
```

## Open Questions

1. **Portal screenshot availability**
   - What we know: No screenshot exists in codebase; real portal has Dashboard with scores/topics
   - What's unclear: Can user provide a real screenshot? If not, is CSS mockup acceptable?
   - Recommendation: Proceed with CSS mockup, plan for real screenshot replacement

2. **Epping location mention**
   - What we know: Currently in hero badge, important for local SEO
   - What's unclear: Should location be removed from hero entirely or moved elsewhere?
   - Recommendation: Keep in nav and footer; hero should focus on value prop not location

3. **Testimonial placement**
   - What we know: Current hero has a testimonial snippet
   - What's unclear: Should it stay in redesigned hero or move to Trust section (Phase 9)?
   - Recommendation: Keep brief testimonial as social proof; full testimonials in Phase 9

## Sources

### Primary (HIGH confidence)
- `C:\Users\bskim\beamacademy-site\index.html` - Direct file analysis
- `C:\Users\bskim\beamacademy-site\.planning\phases\06-hero-overhaul\06-CONTEXT.md` - User decisions
- `C:\Users\bskim\beamacademy-site\.planning\REQUIREMENTS.md` - Phase requirements
- `C:\Users\bskim\beamacademy-site\.planning\STATE.md` - Project context

### Secondary (MEDIUM confidence)
- `C:\Users\bskim\beam-portal\src\pages\Dashboard.jsx` - Real portal dashboard structure (for mockup authenticity)

## Metadata

**Confidence breakdown:**
- Current implementation: HIGH - Direct file analysis
- CSS patterns: HIGH - Existing code review
- Portal screenshot needs: HIGH - File search confirmed no screenshot exists
- Mobile considerations: HIGH - Existing media queries documented

**Research date:** 2026-01-22
**Valid until:** Stable (static HTML site, no external dependencies)

---
*Research completed: 2026-01-22*
