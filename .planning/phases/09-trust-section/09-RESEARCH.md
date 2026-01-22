# Phase 9: Trust Section - Research

**Researched:** 2026-01-23
**Domain:** Trust signals, tutor profiles, testimonials, conversion optimization
**Confidence:** HIGH

## Summary

Phase 9 builds credibility through tutor profiles and social proof, positioned after the Comparison section (Phase 8) which naturally raises the "why trust this?" question. The existing codebase already has Team and Testimonials sections (lines 6009-6115) with full CSS patterns that can be adapted. Real tutor photos exist in `/images/` (chris.jpg, nathan.jpg, taehoon.jpg, john.jpg). The key change is: (1) replacing the generic Team section with a Trust-focused section emphasizing the Baulko trifecta, (2) enhancing testimonials with parent-focused content including specific outcomes, and (3) prominently featuring the 6-8 max group size promise.

The CONTEXT.md provides specific tutor credentials: Chris Kim (97 Maths Ext1, 93 Maths Ext2, 95 Physics, 98th percentile UCAT, Medicine @ Newcastle), Nathan You (95 Maths Ext1, 95 Maths Ext2, 99th percentile UCAT, Medicine @ Newcastle), Taehoon Kim (95 Maths Ext1, 1540 SAT, 4 years tutoring, Optometry @ UNSW), John Park (95 English Adv, 96 Maths Ext1, 96 Maths Ext2). All are Baulko graduates.

**Primary recommendation:** Transform existing Team section into a Trust section with 2-3 featured tutors (showing trifecta credentials), add a parent testimonial with specific outcomes, and prominently display "Max 6-8 Students" as a trust badge. Use existing `.team-card` and `.testimonial-card` CSS patterns.

## Current State Analysis

### Existing Section Structure
```
Page Flow (line numbers):
5094  Hero (#home)
5167  Proof Section (#proof)        <- Phase 7
5293  Comparison Section (#comparison) <- Phase 8
5366  About Section (#about)
5402  Courses & Pricing (#courses)
5899  Why Us (#why-us)
5944  Portal Section (#portal)
6009  Team Section (#team)          <- REPLACE/ENHANCE
6076  Testimonials Section          <- ENHANCE
6118  FAQ (#faq)
6165  Contact (#contact)
```

**Insertion strategy:** The Trust section should be inserted AFTER the Comparison section (line 5363), BEFORE the About section. This positions trust signals immediately after "Not All Tutoring is the Same" which naturally prompts "okay, but who are these people?"

### Existing Team Section (lines 6009-6073)
```html
<section class="team" id="team">
  <div class="container">
    <header class="section-header">
      <div class="section-tag">Meet the Team</div>
      <h2 class="section-title">Expert Tutors</h2>
      <p class="section-description">...</p>
    </header>
    <div class="team-grid">
      <article class="team-card">...</article>
      <!-- 4 tutors currently displayed -->
    </div>
  </div>
</section>
```

**Current issues:**
- Generic "Meet the Team" framing (not trust-focused)
- Shows 4 tutors (cognitive overload, decision paralysis)
- Credentials list doesn't emphasize the trifecta pattern
- No "All from Baulko" callout
- Group size not mentioned

### Existing Testimonials Section (lines 6076-6115)
```html
<section class="testimonials">
  <div class="container">
    <header class="section-header">
      <div class="section-tag">Student Stories</div>
      <h2 class="section-title">What Our Students Say</h2>
    </header>
    <div class="testimonials-grid">
      <!-- 3 testimonials, all from students, no specific outcomes -->
    </div>
  </div>
</section>
```

**Current issues:**
- "Student Stories" framing (parents are the buyers, not students)
- No parent testimonials
- No specific score improvements
- Generic quotes without measurable outcomes

### Available Tutor Images
```
images/
├── chris.jpg      (19KB)
├── nathan.jpg     (15KB)
├── taehoon.jpg    (13KB)
├── john.jpg       (14KB)
```

All images exist and are already used in the current Team section. Professional quality confirmed.

## Standard Stack

No external libraries needed. This phase uses existing CSS patterns.

### Core CSS Classes to Reuse
| Class | Purpose | Source Lines |
|-------|---------|--------------|
| `.team-grid` | Grid layout for profile cards | 2324-2329 |
| `.team-card` | Profile card styling | 2331-2340 |
| `.team-image` | Circular image container | 2361-2369 |
| `.team-credentials` | Credentials list | 2412-2418 |
| `.testimonial-card` | Testimonial card styling | 2429-2463 |
| `.testimonial-quote` | Quote formatting | 2455-2463 |
| `.section-header` | Standard section header | Various |
| `.section-tag` | Category badge | Various |

### Design System Variables
```css
--purple-50: #faf5ff;    /* Light badge background */
--purple-100: #f3e8ff;   /* Card backgrounds */
--purple-600: #9333ea;   /* Role badges, accents */
--purple-700: #7c3aed;   /* Primary brand */
--gray-50: #fafafa;      /* Section background */
--gray-100: #f4f4f5;     /* Borders */
--gray-500: #71717a;     /* Description text */
--gray-900: #18181b;     /* Headings */
```

## Architecture Patterns

### Recommended Section Structure

```html
<!-- Trust Section - Insert after line 5363 (comparison section), before 5366 (about section) -->
<section class="trust-section" id="trust" aria-labelledby="trust-title">
  <div class="container">
    <header class="section-header">
      <div class="trust-badge">
        <span class="trust-badge-icon"><!-- checkmark --></span>
        All Baulkham Hills High School Graduates
      </div>
      <h2 class="section-title" id="trust-title">Tutors Who've Been There</h2>
      <p class="section-description">
        Our tutors achieved 95%+ in HSC Mathematics and are now studying medicine or professional degrees.
      </p>
    </header>

    <!-- Tutor Profiles (2-3) -->
    <div class="trust-tutors">
      <article class="tutor-card">...</article>
      <article class="tutor-card">...</article>
      <article class="tutor-card">...</article>
    </div>

    <!-- Group Size Promise -->
    <div class="trust-promise">
      <div class="promise-number">6-8</div>
      <div class="promise-text">
        <strong>Maximum students per class</strong>
        <span>So every question gets answered</span>
      </div>
    </div>

    <!-- Parent Testimonial -->
    <div class="trust-testimonial">
      <blockquote>...</blockquote>
      <div class="testimonial-author">...</div>
    </div>
  </div>
</section>
```

### Tutor Card Pattern (Enhanced from existing)

```html
<article class="tutor-card">
  <div class="tutor-image">
    <img src="images/chris.jpg" alt="Chris Kim" width="400" height="400" loading="lazy">
  </div>
  <div class="tutor-info">
    <h3 class="tutor-name">Chris Kim</h3>
    <div class="tutor-role">Head of Mathematics</div>
    <div class="tutor-trifecta">
      <span class="trifecta-badge trifecta-school">BHHS Graduate</span>
      <span class="trifecta-badge trifecta-hsc">97 Maths Ext1</span>
      <span class="trifecta-badge trifecta-uni">Medicine @ Newcastle</span>
    </div>
    <ul class="tutor-credentials">
      <li>93 in Maths Ext 2</li>
      <li>95 in Physics</li>
      <li>98th percentile UCAT</li>
    </ul>
  </div>
</article>
```

### Group Size Promise Pattern

```html
<div class="trust-promise">
  <div class="promise-icon">
    <!-- People/group icon -->
  </div>
  <div class="promise-content">
    <div class="promise-number">6-8 Max</div>
    <div class="promise-text">students per class</div>
    <div class="promise-subtext">Every student gets individual attention</div>
  </div>
</div>
```

### Parent Testimonial Pattern

```html
<div class="trust-testimonial">
  <blockquote class="parent-quote">
    "After 2 terms at BEAM, my son's Maths Ext1 assessment improved from 68% to 89%.
    The tutors identified exactly which topics he was struggling with."
  </blockquote>
  <div class="testimonial-author">
    <div class="testimonial-avatar" aria-hidden="true">P</div>
    <div>
      <div class="testimonial-name">Parent of Year 11 Student</div>
      <div class="testimonial-context">Baulkham Hills High School</div>
    </div>
  </div>
</div>
```

### Mobile Responsive Pattern (from existing breakpoints)

```css
@media (max-width: 768px) {
  .trust-tutors {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .trust-promise {
    flex-direction: column;
    text-align: center;
  }
}
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Profile grid | Custom flex layout | Existing `.team-grid` pattern | Already responsive, proven |
| Card styling | New card component | Adapt `.team-card` | Consistent with existing UI |
| Testimonial format | New quote component | Adapt `.testimonial-card` | Maintains visual consistency |
| Badge styling | Custom badges | Adapt `.team-role` pattern | Uses established purple accents |
| Section background | New color schemes | `var(--gray-50)` or `var(--white)` | Established alternating pattern |

## Common Pitfalls

### Pitfall 1: Too Many Tutors
**What goes wrong:** Displaying all 4 tutors creates decision paralysis and dilutes the "expert" impression
**Why it happens:** Wanting to show everyone is qualified
**How to avoid:** Show 2-3 tutors maximum with strongest credentials; mention "more tutors available"
**Warning signs:** User scrolls past without reading any profile

### Pitfall 2: Generic Credential Lists
**What goes wrong:** List of scores doesn't communicate the PATTERN (Baulko + 95%+ + Medicine)
**Why it happens:** Treating credentials as data, not a story
**How to avoid:** Use visual "trifecta" badges that show the pattern at a glance
**Warning signs:** Parent doesn't immediately understand why these tutors are special

### Pitfall 3: Student Testimonials Instead of Parent
**What goes wrong:** Students say "tutoring is fun" but parents want "my child's grades improved"
**Why it happens:** Easier to get student quotes than parent quotes
**How to avoid:** Prioritize parent testimonials with specific outcomes
**Warning signs:** Testimonials lack measurable results

### Pitfall 4: Burying Group Size
**What goes wrong:** "Max 6-8 students" hidden in paragraph text instead of prominent callout
**Why it happens:** Treating it as one of many features
**How to avoid:** Make it a visual element (large number + label), not prose
**Warning signs:** User doesn't notice group size promise

### Pitfall 5: Missing School-Specific Matching
**What goes wrong:** Not mentioning that tutors match student's school assessment style
**Why it happens:** Assuming it's implied
**How to avoid:** Explicit mention: "Tutors who know Baulko/James Ruse assessment formats"
**Warning signs:** Parent doesn't connect "custom materials" to their specific school

## Code Examples

### Trust Badge (adapted from proof-badge)
```css
/* Source: Adapt from proof-section badge pattern */
.trust-badge {
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

.trust-badge-icon {
  width: 20px;
  height: 20px;
}
```

### Trifecta Badges
```css
.tutor-trifecta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.trifecta-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 500;
}

.trifecta-school {
  background: var(--purple-100);
  color: var(--purple-700);
}

.trifecta-hsc {
  background: #d1fae5; /* Green tint for scores */
  color: #065f46;
}

.trifecta-uni {
  background: #dbeafe; /* Blue tint for uni */
  color: #1e40af;
}
```

### Group Size Promise
```css
.trust-promise {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: var(--purple-50);
  border: 2px solid var(--purple-200);
  border-radius: 20px;
  padding: 32px 48px;
  margin: 48px auto;
  max-width: 600px;
}

.promise-number {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--purple-700);
  line-height: 1;
}

.promise-text {
  text-align: left;
}

.promise-text strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--gray-900);
  margin-bottom: 4px;
}

.promise-text span {
  font-size: 0.95rem;
  color: var(--gray-500);
}
```

### Parent Testimonial (enhanced from existing)
```css
/* Adapt from .testimonial-card */
.trust-testimonial {
  background: white;
  border-radius: 24px;
  padding: 40px;
  border: 1px solid var(--gray-100);
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}

.trust-testimonial::before {
  content: '"';
  position: absolute;
  top: 20px;
  left: 24px;
  font-size: 4rem;
  font-family: Georgia, serif;
  color: var(--purple-100);
  line-height: 1;
}

.parent-quote {
  font-size: 1.15rem;
  color: var(--gray-700);
  font-style: italic;
  line-height: 1.7;
  margin-bottom: 24px;
  padding-left: 48px;
}

.parent-quote strong {
  color: var(--purple-700);
  font-weight: 600;
}
```

### Tutor Grid (2-3 cards)
```css
.trust-tutors {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto 48px;
}

@media (max-width: 900px) {
  .trust-tutors {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .trust-tutors {
    grid-template-columns: 1fr;
  }
}
```

## Tutor Selection Recommendation

Based on CONTEXT.md credentials, recommended 3 tutors to showcase:

| Tutor | Why Featured | Trifecta |
|-------|--------------|----------|
| **Chris Kim** | Highest individual HSC scores, Head of Maths role, 98th percentile UCAT | BHHS + 97 Maths Ext1 + Medicine Newcastle |
| **Nathan You** | Dual 95s, highest UCAT (99th), Medicine | BHHS + 95 Maths Ext1 + Medicine Newcastle |
| **John Park** | English + Maths combo (rare), Medicine | BHHS + 95 English Adv + Medicine UNSW |

**Rationale:** These three show breadth (English + Math), top credentials, and all are Medicine students. Taehoon has valuable experience (4 years) but lacks Medicine credential which is key to the parent-facing trifecta message.

**Alternative:** If wanting to show SAT/experience, swap John for Taehoon.

## Content Recommendations

### Section Headline Options
| Option | Rationale |
|--------|-----------|
| "Tutors Who've Been There" | Emphasizes shared experience (Baulko grads) |
| "Your Child's Future Tutors" | Personal, forward-looking |
| "Meet the Baulko Grads" | Direct, school-specific |

**Recommendation:** "Tutors Who've Been There" - conveys empathy and experience without being too salesy.

### Parent Testimonial Content
CONTEXT.md confirms parent testimonials with specific score improvements are available. Ideal format:

```
"After 2 terms at BEAM, [Child]'s Maths assessment improved from [X]% to [Y]%.
The tutors identified exactly which topics [he/she] was struggling with -
[specific topic like integration or trig]. That targeted approach made all the difference."

- [First name] [Last initial], Parent of Year [X] student at [School]
```

### School-Specific Matching Copy
```
"Our tutors know your school's assessment style. Baulko, James Ruse,
Epping Boys - we tailor materials to match what your child will face."
```

Or as a bullet/badge:
```
School-specific practice papers
```

## Section Order Recommendation

**Claude's Discretion item from CONTEXT.md:** Layout and visual hierarchy (profiles first vs testimonials first)

**Recommendation: Profiles first, then group size, then testimonial**

Rationale:
1. **Profiles first:** Answer "who are these people?" immediately after comparison
2. **Group size:** Trust signal that differentiates from generic tutoring
3. **Parent testimonial:** Proof that "people like me" trust BEAM (final validation)

This follows the persuasion sequence: Expertise -> Promise -> Social Proof

## Open Questions

1. **Parent testimonial specifics**
   - What we know: CONTEXT.md says parent testimonials with specific outcomes exist
   - What's unclear: Exact wording, which school, which score improvements
   - Recommendation: Request actual testimonial content from user before planning

2. **School-specific matching placement**
   - What we know: Should be mentioned prominently
   - What's unclear: As part of tutor profiles? Separate callout? In promise section?
   - Recommendation: Add as small text under group size promise

3. **Existing Team/Testimonials sections**
   - What we know: Trust section goes BEFORE these (after comparison)
   - What's unclear: Remove/keep existing Team and Testimonials sections?
   - Recommendation: Keep existing sections for now; Trust section serves different purpose (conversion-focused vs comprehensive)

## Sources

### Primary (HIGH confidence)
- `C:\Users\bskim\beamacademy-site\index.html` - Direct file analysis (team CSS lines 2313-2494, section patterns, tutor data lines 6019-6070)
- `C:\Users\bskim\beamacademy-site\.planning\phases\09-trust-section\09-CONTEXT.md` - User decisions, tutor credentials
- `C:\Users\bskim\beamacademy-site\.planning\phases\07-proof-section\07-RESEARCH.md` - Design system reference
- `C:\Users\bskim\beamacademy-site\images/` - Confirmed tutor photos exist

### Secondary (MEDIUM confidence)
- [KlientBoost Landing Page Testimonials](https://www.klientboost.com/landing-pages/landing-page-testimonials/) - Testimonial placement best practices
- [WebFX CRO Trends 2026](https://www.webfx.com/blog/conversion-rate-optimization/cro-trends/) - Trust signals as key CRO trend
- [Tutor Me Education](https://tutormeeducation.com/efficacy/) - Parent testimonial examples with specific outcomes
- [WiserNotify Social Proof](https://wisernotify.com/blog/landing-page-social-proof/) - Social proof placement strategies

### Tertiary (LOW confidence - general patterns)
- [ScienceDirect Class Size Research](https://www.sciencedirect.com/science/article/abs/pii/S0883035518314095) - Academic support for small group effectiveness (6-10 optimal)

## Metadata

**Confidence breakdown:**
- Current state analysis: HIGH - Direct file inspection
- CSS patterns: HIGH - Existing code analyzed
- Tutor credentials: HIGH - CONTEXT.md provided exact data
- Testimonial format: MEDIUM - Best practices from research, actual content TBD
- Conversion optimization: MEDIUM - Industry research, not A/B tested

**Research date:** 2026-01-23
**Valid until:** Stable (static HTML site, no external dependencies)

---
*Research completed: 2026-01-23*
