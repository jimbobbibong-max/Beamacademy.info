# Phase 7: Proof Section - Research

**Researched:** 2026-01-23
**Domain:** Static HTML document preview mockups and visual proof section
**Confidence:** HIGH

## Summary

This phase creates a new "Proof Section" immediately after the hero, showing parents the 4 documents they receive from ONE free trial. The existing codebase provides all necessary patterns: the hero portal mockup (dark theme, macOS-style window) and section styling (`.section-header`, `.section-tag`, `.section-title`). The Progress Report template (LaTeX-based with purple header, topic breakdown, scores, and focus areas) is generated dynamically in the portal but can be represented as a static mockup.

The key implementation challenge is creating 4 distinct document previews (Diagnostic Worksheet, Answer Key, Worked Solutions, Progress Report) in a 2x2 grid that communicate the VALUE of each document at a glance. The existing `hero-portal-mockup` pattern provides excellent scaffolding for the Progress Report mockup, while the other 3 documents need simpler paper-like styling.

**Primary recommendation:** Create a new `.proof-section` with 2x2 `.document-card` grid, adapting the existing mockup patterns. Use inline expand (not modal) for mobile UX. Position "Yours to keep" as a prominent badge above the headline.

## Current Implementation

### Page Structure (Section Order)
```
1. Hero Section (#home)          <- Phase 6 complete
2. About Section (#about)        <- Proof section goes BEFORE this
3. Courses & Pricing (#courses)
4. Why Us (#why-us)
5. Team (#team)
6. Testimonials
7. FAQ (#faq)
8. Contact (#contact)
```

**Insertion point:** After line 4717 (`</section>` closing hero), before line 4719 (`<!-- About Section -->`).

### Design System Summary

**Colors (CSS Variables):**
```css
--purple-50: #faf5ff;    /* Lightest background */
--purple-100: #f3e8ff;   /* Light background */
--purple-600: #9333ea;   /* Accent/tag text */
--purple-700: #7c3aed;   /* Primary brand */
--gray-50: #fafafa;      /* Section backgrounds */
--gray-100: #f4f4f5;     /* Subtle borders */
--gray-500: #71717a;     /* Description text */
--gray-600: #52525b;     /* Body text */
--gray-900: #18181b;     /* Headings, dark mockup bg */
```

**Typography:**
```css
--font-display: 'Outfit', sans-serif;
--font-body: 'Outfit', sans-serif;
```

**Section Pattern:**
```html
<section class="[section-name]" id="[anchor]">
  <div class="container">
    <header class="section-header">
      <div class="section-tag">[Category Tag]</div>
      <h2 class="section-title">[Title]</h2>
      <p class="section-description">[Description]</p>
    </header>
    <!-- Content -->
  </div>
</section>
```

**Section CSS:**
```css
section { padding: 100px 0; }

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
}

.section-tag {
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

**Responsive Breakpoints:**
```css
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile - primary breakpoint */ }
@media (max-width: 400px)  { /* Small mobile */ }
```

## Progress Report Template Reference

The actual Progress Report is generated via LaTeX in `beam-portal/netlify/functions/view-maths-stats-pdf.js`. Key visual elements to replicate in mockup:

**Color Scheme:**
- `beampurple`: RGB(102, 51, 153) - Header, borders, titles
- `beamlight`: RGB(200, 180, 220) - Light backgrounds
- `improvement`: RGB(34, 139, 34) - Green for strengths
- `warning`: RGB(255, 165, 0) - Orange for developing
- `concern`: RGB(220, 53, 69) - Red for focus areas

**Key Data Sections:**
1. **Student Info Box** - Name, Year Level, Date
2. **Overall Score Hero** - Large percentage with performance label
3. **Topic Performance Table** - Topic | Score | % | Status
4. **Strengths/Focus Areas** - Side-by-side cards
5. **Assessment History** - Date-ordered list (for returning students)

**Realistic Mock Data (from CONTEXT.md decisions):**
- Overall: 78% (Needs Practice)
- Topics showing GAP: Proofs 45%, Trigonometry 68%, Calculus 71%
- Improvement trend: +22% shown
- Focus areas: Specific topic gaps (not MCQ vs Written)

## Architecture Patterns

### Recommended Section Structure

```html
<section class="proof-section" id="proof">
  <div class="container">
    <header class="section-header">
      <!-- "Yours to Keep" badge above headline -->
      <div class="proof-badge">From ONE Free Trial - Yours to Keep</div>
      <h2 class="section-title">See Exactly Where They're Struggling</h2>
      <p class="section-description">
        Your free diagnostic produces 4 custom documents.
        Keep them even if you don't enrol.
      </p>
    </header>

    <div class="documents-grid">
      <!-- 4 document cards -->
      <div class="document-card">...</div>
      <div class="document-card">...</div>
      <div class="document-card">...</div>
      <div class="document-card">...</div>
    </div>

    <!-- Optional: Topic gap callout near Progress Report -->
    <div class="proof-insight">
      <span class="insight-icon">...</span>
      <span class="insight-text">The gap most parents miss: specific topics, not question types</span>
    </div>
  </div>
</section>
```

### Document Card Pattern

**Two visual styles needed:**

1. **Paper Document Style** (Worksheet, Answer Key, Solutions)
```html
<div class="document-card document-paper">
  <div class="document-preview">
    <!-- Paper mockup with visible content snippets -->
    <div class="paper-header">BEAM Academy</div>
    <div class="paper-title">[Document Name]</div>
    <div class="paper-content">
      <!-- Faux content showing document type -->
    </div>
  </div>
  <div class="document-info">
    <h3 class="document-name">[Document Name]</h3>
    <p class="document-desc">[What it provides]</p>
  </div>
</div>
```

2. **Dashboard/Infographic Style** (Progress Report)
```html
<div class="document-card document-dashboard">
  <div class="document-preview">
    <!-- Adapt hero-portal-mockup pattern -->
    <div class="report-mockup">
      <div class="report-header">Progress Report</div>
      <div class="report-score">87%</div>
      <div class="report-topics">...</div>
    </div>
  </div>
  <div class="document-info">
    <h3 class="document-name">Progress Report</h3>
    <p class="document-desc">Topic-by-topic breakdown with trends</p>
  </div>
</div>
```

### Grid Layout

```css
.documents-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .documents-grid {
    grid-template-columns: 1fr;
  }
}
```

### Expand Behavior (Claude's Discretion)

**Recommendation: Inline expand** for mobile UX reasons.

| Approach | Pros | Cons |
|----------|------|------|
| Modal/Lightbox | Familiar pattern, focuses attention | Requires overlay management, scrolling issues on mobile |
| Inline expand | No overlay needed, works better on touch | Less dramatic reveal |

**Inline expand implementation:**
```css
.document-card.expanded .document-detail {
  display: block;
  max-height: 300px;
  opacity: 1;
}

.document-detail {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}
```

## The 4 Document Mockups

### 1. Diagnostic Worksheet
**Visual style:** White paper with math problems
**Content to show:**
- BEAM Academy header
- "Year 11 Advanced Mathematics - Diagnostic"
- Question list (Q1-Q20 format)
- Mix of algebra, trig, calculus visible
- Some questions partially visible (cut off to show depth)

**Example content:**
```
Q1. Differentiate y = 3x² + 2x - 5
Q2. Find the exact value of sin(π/4) + cos(π/3)
Q3. Solve for x: 2x² - 5x + 3 = 0
...
```

### 2. Answer Key
**Visual style:** Simple list format
**Content to show:**
- "Answer Key"
- Q1-Q20 format with short answers
- Clean, scannable layout

**Example content:**
```
Answers
1. 6x + 2
2. (√2 + 1)/2
3. x = 1.5 or x = 1
...
```

### 3. Worked Solutions
**Visual style:** Paper with detailed working
**Content to show:**
- "Worked Solutions"
- One question expanded with step-by-step
- Mathematical notation visible
- "Step 1:", "Step 2:" format

**Example content:**
```
Q1. Differentiate y = 3x² + 2x - 5

Step 1: Apply power rule to each term
Step 2: d/dx(3x²) = 6x
Step 3: d/dx(2x) = 2
Step 4: d/dx(-5) = 0

Answer: dy/dx = 6x + 2
```

### 4. Progress Report
**Visual style:** Dashboard/infographic (adapt hero mockup pattern)
**Content to show:**
- Purple header with "Progress Report"
- Large score: 87% (or 78% per existing mockup)
- Topic breakdown with scores showing GAP
- Trend indicator: +22%
- Focus Areas section highlighted

**Key insight placement:** Add callout near this card:
```html
<div class="proof-callout">
  "The gap most parents miss" - see exactly WHICH topics need work
</div>
```

## "Yours to Keep" Messaging

**Placement options (Claude's discretion):**

| Option | When to Use |
|--------|-------------|
| Badge above headline | High prominence, works with section header pattern |
| Integrated into headline | "Your Free Trial Documents" - less prominent |
| Subtle footnote | Lower prominence, more professional |

**Recommended: Badge above headline**
```html
<div class="proof-badge">
  <span class="badge-icon">✓</span>
  From ONE Free Trial - Yours to Keep
</div>
```

**CSS:**
```css
.proof-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--purple-100);
  color: var(--purple-700);
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 20px;
}
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Document preview thumbnails | Custom canvas/SVG rendering | Pure CSS paper mockups | Simpler, faster, accessible |
| Expand/collapse animation | Custom JS animation | CSS transitions | Native, performant |
| Grid layout | Flexbox hacks | CSS Grid | 2x2 is perfect grid use case |
| Modal overlay | Custom modal system | Inline expand | Less code, better mobile UX |
| Responsive breakpoints | Custom JS | Existing 768px media queries | Consistency with site |

## Common Pitfalls

### Pitfall 1: Overly detailed mockups
**What goes wrong:** Spending time making mockups pixel-perfect to real documents
**Why it happens:** Perfectionism, wanting authenticity
**How to avoid:** Mockups show CONCEPT not CONTENT. Visible snippets + blur/fade is enough
**Warning signs:** Spending >30 min on a single mockup's content

### Pitfall 2: Forgetting mobile grid collapse
**What goes wrong:** 2x2 grid squishes on mobile instead of stacking
**Why it happens:** Desktop-first testing
**How to avoid:** Add `grid-template-columns: 1fr` at 768px breakpoint
**Warning signs:** Document cards unreadable on mobile preview

### Pitfall 3: Inaccessible decorative content
**What goes wrong:** Screen readers announce mockup placeholder text
**Why it happens:** Not using aria-hidden on decorative elements
**How to avoid:** Add `aria-hidden="true"` to mockup preview containers, use real text for labels
**Warning signs:** Lighthouse accessibility warnings

### Pitfall 4: Heavy images for mockups
**What goes wrong:** Using actual images/screenshots for document previews
**Why it happens:** Seems easier than CSS mockups
**How to avoid:** CSS-only mockups (existing hero-portal-mockup proves this works)
**Warning signs:** Large image files, LCP regression

### Pitfall 5: Lost messaging hierarchy
**What goes wrong:** "Yours to keep" buried below fold or hard to find
**Why it happens:** Focusing on documents over messaging
**How to avoid:** Badge placement ABOVE headline ensures visibility
**Warning signs:** User testing shows parents don't notice the "free" messaging

## Code Examples

### Section Container (from existing patterns)
```css
/* Source: index.html lines 980-1011 */
section { padding: 100px 0; }

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
```

### Document Card Base Style
```css
/* Adapt from .hero-card and .feature-card patterns */
.document-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--gray-100);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.document-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
  border-color: var(--purple-200);
}

.document-preview {
  height: 200px;
  background: var(--gray-50);
  position: relative;
  overflow: hidden;
}

.document-info {
  padding: 20px 24px;
}

.document-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 8px;
}

.document-desc {
  font-size: 0.9rem;
  color: var(--gray-500);
  line-height: 1.5;
}
```

### Progress Report Mockup (adapt from hero)
```css
/* Source: index.html lines 801-919 (hero-portal-mockup) */
.report-mockup {
  background: var(--gray-900);
  height: 100%;
  padding: 0;
}

.report-header {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--gray-400);
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 500;
}

.report-score {
  padding: 16px;
  text-align: center;
}

.report-score-value {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
}

.report-topics {
  padding: 0 16px 16px;
}

.report-topic-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--gray-300);
  font-size: 0.85rem;
}
```

### Paper Document Mockup
```css
.paper-mockup {
  background: white;
  height: 100%;
  padding: 16px;
  font-family: 'Times New Roman', serif;
  font-size: 0.75rem;
  color: var(--gray-700);
  position: relative;
}

.paper-mockup::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, transparent, white);
}

.paper-header {
  text-align: center;
  font-weight: bold;
  color: var(--purple-700);
  margin-bottom: 8px;
}

.paper-title {
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 12px;
}

.paper-question {
  margin-bottom: 8px;
  line-height: 1.4;
}
```

### Responsive Grid
```css
.documents-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .documents-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .document-preview {
    height: 160px;
  }
}
```

## Accessibility Considerations

Based on [WCAG 2.2 guidelines](https://developer.mozilla.org/en-US/docs/Web/Accessibility) and [modern accessibility patterns](https://medium.com/design-bootcamp/modern-frontend-accessibility-a-2026-developers-guide-b2de10d01d22):

1. **Decorative mockup content:** Use `aria-hidden="true"` on preview containers
2. **Document cards as interactive elements:** If clickable, ensure 44x44px minimum tap target
3. **Expand/collapse:** Use `aria-expanded` attribute if implementing expand behavior
4. **Color contrast:** All text must meet 4.5:1 contrast ratio (existing purple/gray scheme passes)
5. **Focus states:** Reuse existing `.document-card:focus-visible` pattern

## Open Questions

1. **Expand interaction on desktop**
   - What we know: Mobile should use inline expand
   - What's unclear: Should desktop have expand at all, or is thumbnail + text enough?
   - Recommendation: Test thumbnail-only first, add expand if users request detail

2. **Document order in grid**
   - What we know: All 4 should be visible at once (2x2)
   - What's unclear: Which document should be top-left (first visual focus)?
   - Recommendation: Progress Report top-left (most visual), Worksheet top-right, Answer Key bottom-left, Solutions bottom-right

3. **Section background color**
   - What we know: Hero is white, About is gray-50
   - What's unclear: Should Proof match hero (white) or have distinct background?
   - Recommendation: Use `var(--purple-50)` for subtle differentiation without competing

## Sources

### Primary (HIGH confidence)
- `C:\Users\bskim\beamacademy-site\index.html` - Direct file analysis (hero mockup, section patterns, CSS variables)
- `C:\Users\bskim\beamacademy-site\.planning\phases\07-proof-section\07-CONTEXT.md` - User decisions
- `C:\Users\bskim\beamacademy-site\.planning\phases\06-hero-overhaul\06-RESEARCH.md` - Prior research (design system)

### Secondary (MEDIUM confidence)
- `C:\Users\bskim\beam-portal\netlify\functions\view-maths-stats-pdf.js` - Progress Report LaTeX template structure

### Tertiary (LOW confidence - general patterns)
- [Frontend Design Patterns 2026](https://www.netguru.com/blog/frontend-design-patterns) - Component patterns
- [Modern Frontend Accessibility Guide](https://medium.com/design-bootcamp/modern-frontend-accessibility-a-2026-developers-guide-b2de10d01d22) - ARIA patterns
- [WCAG 2.2 Target Size](https://stephaniewalter.design/blog/how-to-check-and-document-design-accessibility-in-your-figma-mockups/) - 24x24px minimum

## Metadata

**Confidence breakdown:**
- Design system: HIGH - Direct analysis of existing CSS
- Section structure: HIGH - Existing patterns documented
- Document mockups: MEDIUM - Creative application of existing patterns
- Progress Report reference: HIGH - Actual LaTeX template analyzed
- Mobile behavior: HIGH - Existing responsive patterns documented

**Research date:** 2026-01-23
**Valid until:** Stable (static HTML site, no external dependencies)

---
*Research completed: 2026-01-23*
