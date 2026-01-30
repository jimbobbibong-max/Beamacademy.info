# Phase 25: Google Ads Website Optimization + Premium SaaS Redesign - Research

**Researched:** 2026-01-31
**Domain:** Google Ads Call Tracking, Premium SaaS Landing Page Design, Mobile UX
**Confidence:** HIGH

## Summary

This research covers five key areas for Phase 25: Google Ads call tracking implementation, sticky header utility bar patterns, subject-specific landing pages, premium SaaS design patterns (2026), and mobile click-to-call UX.

The core approach is:
1. **Call tracking**: Use Google Tag Manager with the built-in "Google Ads Calls from Website Conversion" tag rather than manual gtag code
2. **Utility bar**: A slim (40-50px) utility bar above the main nav with phone number only; stays visible on scroll
3. **Subject pages**: Mirror the main page design system with subject-specific hero messaging and social proof
4. **Premium SaaS aesthetic**: Bold serif headlines (Fraunces), purposeful micro-animations, product-first hero with dashboard mockup, testimonials near CTAs
5. **Mobile click-to-call**: Header placement preferred over floating FAB for a single-CTA page; FAB optional if testing shows conversion lift

**Primary recommendation:** Implement call tracking via GTM's built-in tag, add a minimal utility bar, create 4 subject landing pages sharing the existing design system, and enhance premium feel through refined spacing and motion rather than adding new visual complexity.

---

## 1. Google Ads Call Tracking Setup

### How It Works

Google replaces your displayed phone number with a Google forwarding number (GFN) for visitors who clicked an ad. When they call, Google logs the call as a conversion, then redirects to your real number.

**Source:** [Google Ads Help - Track calls to phone number on website](https://support.google.com/google-ads/answer/6095883?hl=en)

### Implementation: Google Tag Manager (Recommended)

Using GTM is the 2025-2026 standard. It allows marketers to manage tracking without developer involvement.

**Step 1: Create Conversion Action in Google Ads**
1. Go to **Tools & Settings > Conversions > + New conversion action**
2. Select **Phone calls > Calls to a phone number on your website**
3. Configure:
   - Phone number: Enter exactly as displayed on site (e.g., `0491 791 447`)
   - Minimum call duration: 60 seconds (filters accidental calls)
   - Attribution model: Data-driven (or Time decay for simpler)
4. Save and note your **Conversion ID** and **Conversion Label**

**Step 2: Configure GTM Tags**

Create two tags in Google Tag Manager:

```
Tag 1: Conversion Linker
------------------------
Tag Type: Conversion Linker
Trigger: All Pages
```

```
Tag 2: Google Ads Calls from Website Conversion
-----------------------------------------------
Tag Type: Google Ads Calls from Website Conversion
Configuration:
  - Conversion ID: [Your AW-XXXXXXXXXX]
  - Conversion Label: [Your conversion label]
  - Phone Number to Replace: 0491 791 447
Trigger: All Pages
```

**Step 3: Test with Debug Mode**
Add `#google-wcc-debug` to your URL. If working, phone numbers show as `9999999999` in debug panel.

**Source:** [Data Marketing School - GTM Phone Call Tracking](https://data-marketing-school.com/en/blog/google-ads-website-phone-call-conversion-tracking-with-google-tag-manager/)

### Alternative: Direct gtag Implementation

If not using GTM, add this after your existing gtag config:

```html
<!-- Existing Google Ads tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17832807956"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-17832807956');

  // Phone call tracking - add conversion label from Google Ads
  gtag('config', 'AW-17832807956/CONVERSION_LABEL', {
    'phone_conversion_number': '0491 791 447'
  });
</script>
```

**Optional:** Add `phone_conversion_css_class: 'phone-number'` to target specific elements.

**Source:** [Google Ads Help - gtag configuration](https://support.google.com/google-ads/answer/7548399?hl=en)

### Confidence: HIGH
- Official Google documentation confirms approach
- GTM method is industry standard for 2025-2026
- Multiple sources agree on implementation pattern

---

## 2. Header Utility Bar Implementation

### Best Practices from UX Research

**Size Guidelines:**
- Keep utility bar slim: **40-50px maximum** on desktop
- Mobile: Minimum 44px tap target for phone link
- Total sticky header height (utility + nav) should not exceed 80-100px

**Content:**
- Phone number with click-to-call (`tel:` link)
- Minimal design: no hours, no location, no clutter
- Optional: email or chat link (but keep minimal)

**Source:** [Nielsen Norman Group - Sticky Headers](https://www.nngroup.com/articles/sticky-headers/)

### Recommended HTML Structure

```html
<!-- Utility bar ABOVE main nav -->
<div class="utility-bar">
  <div class="container">
    <a href="tel:+61491791447" class="phone-link">
      <svg>...</svg> <!-- Phone icon -->
      <span class="phone-number">0491 791 447</span>
    </a>
  </div>
</div>

<!-- Existing nav below -->
<nav class="nav" id="nav">
  ...
</nav>
```

### Recommended CSS

```css
.utility-bar {
  position: sticky;
  top: 0;
  z-index: 1001; /* Above nav */
  background: var(--gray-900);
  color: var(--white);
  padding: var(--space-2) 0;
  font-size: var(--text-sm);
}

.utility-bar .container {
  display: flex;
  justify-content: flex-end; /* Right-align phone */
  align-items: center;
}

.phone-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  transition: background var(--transition-fast);
  min-height: 44px; /* Touch target */
}

.phone-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.phone-link svg {
  width: 18px;
  height: 18px;
}

/* Mobile: Center phone, full-width tap target */
@media (max-width: 768px) {
  .utility-bar .container {
    justify-content: center;
  }

  .phone-link {
    flex: 1;
    justify-content: center;
    max-width: 280px;
  }
}
```

### Animation Guidelines

- **Do:** Quick, smooth transitions (150-250ms)
- **Do:** Immediate appearance on scroll (no delay)
- **Don't:** Stalker menus that animate in with delay
- **Don't:** Headers that shrink with elaborate animations

**Source:** [Smashing Magazine - Sticky Menus UX Guidelines](https://www.smashingmagazine.com/2023/05/sticky-menus-ux-guidelines/)

### Confidence: HIGH
- NN/g research provides authoritative UX guidance
- Multiple sources agree on size constraints (50px sticky recommended)
- Click-to-call effectiveness well-documented (70% of mobile searchers use it)

---

## 3. Subject Landing Page Architecture

### Purpose

Create dedicated pages for Google Ads Sitelinks:
- `/mathematics` - Math tutoring
- `/english` - English tutoring
- `/physics` - Physics tutoring
- `/chemistry` - Chemistry tutoring

### Structure Per Page

Each page shares the design system but has subject-specific:

```
1. Hero Section
   - Subject-specific headline (e.g., "Watch Their Maths Grades Climb")
   - Subject-specific value prop
   - Same CTA: "Get My Free Diagnostic"
   - Subject-relevant dashboard mockup (if feasible)

2. Social Proof (Immediately after hero)
   - Subject-specific testimonial (e.g., "His Maths improved from 68% to 89%")
   - Parent quote relevant to that subject

3. What We Cover
   - Year levels: 7-12 (or 11-12 for Physics/Chemistry)
   - Topics/skills specific to subject
   - "What your child will master" approach

4. Our Approach
   - Same diagnostic-based approach, framed for subject
   - Same 4 documents, same process

5. Pricing CTA
   - Link to main pricing or anchor to #courses
   - Keep pricing consistent across all pages

6. Contact Form
   - Same form structure
   - Subject pre-selected if possible

7. Footer
   - Same footer as main site
```

### SEO & Google Ads Benefits

- Sitelinks that point to specific pages (not main page) perform better
- 6 sitelinks per campaign = up to 3.5% more conversions at similar cost
- Message match: Ad for "Maths Tutoring Epping" → `/mathematics` page

**Source:** [Google Ads Help - About sitelink assets](https://support.google.com/google-ads/answer/2375416?hl=en), [Stakque - Google Ads Best Practices for EdTech](https://stakque.com/google-ads-best-practices-edtech-companies/)

### Implementation Approach

**Option A: Separate HTML files** (Recommended for SEO)
- `mathematics.html`, `english.html`, `physics.html`, `chemistry.html`
- Each file is standalone but shares CSS via `<style>` or external stylesheet
- Duplicate nav, footer, form code (acceptable for 4 pages)

**Option B: Single-page with hash routing** (Not recommended)
- Would require JavaScript routing
- Worse for SEO, worse for Google Ads landing page scores

### Confidence: MEDIUM
- EdTech landing page structure is well-documented
- Subject-specific messaging approach is standard
- Specific content for each subject requires domain knowledge

---

## 4. Premium SaaS Design Patterns (2026)

### Key Trends from Research

| Trend | Implementation for BEAM | Priority |
|-------|-------------------------|----------|
| Story-driven hero | Already have before/after dashboard mockup | Keep |
| Bold serif headlines | Fraunces already in use | Keep |
| Purposeful micro-animations | Add scroll-reveal, form feedback | Add |
| Dark mode aesthetic | Already have dark nav/hero mockup | Keep |
| Product-first hero | Dashboard mockup already shows product | Keep |
| Social proof near CTAs | Move testimonial closer to form | Adjust |
| Minimal motion that adds meaning | Refine existing animations | Polish |

**Source:** [SaaSFrame - 10 SaaS Landing Page Trends for 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)

### Linear/Notion-Inspired Aesthetic

BEAM already aligns well with premium SaaS patterns:
- **Dark dashboard mockup** mimics Linear's dark mode aesthetic
- **Fraunces display font** provides bold serif headlines
- **Purple primary** is distinctive (not generic blue)
- **Tilted hero headline** breaks the grid like Notion's playful layouts

**What to enhance:**

1. **Spacing refinement** - More generous whitespace between sections
2. **Micro-animations** - Add meaning with scroll reveals, CTA pulse
3. **Social proof placement** - Testimonials immediately near CTAs
4. **Single conversion goal** - Keep form as the ONE action per section

**Source:** [LogRocket - Linear design SaaS trend](https://blog.logrocket.com/ux-design/linear-design/)

### Don't Over-Design

The best-performing SaaS sites in 2026 remove friction, show proof immediately, and make the product obvious. BEAM's current v7 design is already strong. Phase 25 is about:
- Adding Google Ads requirements (phone, call tracking, subject pages)
- Refining what exists (spacing, social proof placement)
- NOT a visual overhaul

**Source:** [Stan Vision - SaaS Website Design 2026](https://www.stan.vision/journal/saas-website-design)

### Confidence: HIGH
- Multiple authoritative sources on 2026 SaaS trends
- BEAM already aligns with key patterns
- Research confirms "refine" not "rebuild" approach

---

## 5. Mobile Click-to-Call UX

### Header vs. Floating FAB

| Approach | Pros | Cons |
|----------|------|------|
| **Header phone** | Always visible, non-intrusive, professional | Smaller tap target, may be missed |
| **Floating FAB** | Highly visible, thumb-friendly, prominent | Intrusive, covers content, can feel desperate |

### Research Findings

- **70% of mobile searchers** use click-to-call feature
- **61% of click-to-call users** are ready to purchase
- Click-to-call can increase conversions **up to 200%**
- FABs should be used for the **ONE most important action** (not secondary)

**Source:** [Apexure - Click to Call Landing Page](https://www.apexure.com/blog/click-to-call-landing-page-optimize-landing-page-for-phone-calls), [Nimbata - Optimize Landing Page for Calls](https://www.nimbata.com/guide/optimize-a-landing-page-for-calls)

### Recommendation: Header First, FAB Optional

1. **Implement header utility bar** with click-to-call (Phase 25 core)
2. **Monitor call conversion rate** for 2-4 weeks
3. **A/B test floating FAB** if call conversions are below target
4. **If adding FAB:** Bottom-right, 56px, pulse animation, single action

### FAB Implementation (If Needed)

```css
.mobile-call-fab {
  display: none; /* Hidden by default */
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: var(--purple-700);
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
  z-index: 999;
  align-items: center;
  justify-content: center;
  color: white;
}

@media (max-width: 768px) {
  .mobile-call-fab {
    display: flex;
  }
}

/* Pulse animation */
.mobile-call-fab::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid var(--purple-400);
  animation: fab-pulse 2s ease-out infinite;
}

@keyframes fab-pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0; }
}
```

### Confidence: MEDIUM
- Click-to-call conversion data is well-documented
- FAB vs header is a testing decision
- Context-specific to BEAM's audience (parents, likely desktop + mobile mix)

---

## Implementation Recommendations

### Phase 25 Task Sequence

1. **Google Ads Call Tracking** (GTM setup)
   - Create conversion action in Google Ads
   - Add GTM tags (Conversion Linker + Calls from Website)
   - Test with `#google-wcc-debug`

2. **Utility Bar** (HTML/CSS)
   - Add utility bar above nav
   - Style with phone link, 44px touch target
   - Ensure sticky behavior works with both bars

3. **Subject Landing Pages** (4 HTML files)
   - Create mathematics.html, english.html, physics.html, chemistry.html
   - Copy design system from main page
   - Customize hero, testimonials, topics per subject

4. **Premium Polish** (Refinements)
   - Adjust social proof placement near CTAs
   - Refine spacing/rhythm
   - Add purposeful micro-animations if missing

5. **Mobile Click-to-Call** (Optional A/B test)
   - Monitor call conversions for 2 weeks
   - Add floating FAB only if needed

### What NOT to Do

| Don't | Why |
|-------|-----|
| Rebuild entire design | v7 is already premium SaaS aligned |
| Add multiple FABs | One FAB max per page |
| Over-animate | Motion should add meaning, not noise |
| Remove existing visual differentiators | Tilted hero, grain texture, grid-breaking are brand |
| Generic AI aesthetics | CONTEXT.md explicitly bans "bland gradients, cookie-cutter layouts" |

---

## Sources

### Primary (HIGH confidence)
- [Google Ads Help - Track calls to phone number on website](https://support.google.com/google-ads/answer/6095883?hl=en) - Official call tracking setup
- [Google Ads Help - gtag configuration](https://support.google.com/google-ads/answer/7548399?hl=en) - Code structure
- [Nielsen Norman Group - Sticky Headers](https://www.nngroup.com/articles/sticky-headers/) - UX best practices
- [Google Ads Help - Sitelink assets](https://support.google.com/google-ads/answer/2375416?hl=en) - Subject page rationale

### Secondary (MEDIUM confidence)
- [SaaSFrame - 10 SaaS Landing Page Trends for 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples) - Design patterns
- [Smashing Magazine - Sticky Menus UX Guidelines](https://www.smashingmagazine.com/2023/05/sticky-menus-ux-guidelines/) - Header animation
- [LogRocket - Linear design SaaS trend](https://blog.logrocket.com/ux-design/linear-design/) - Premium aesthetic
- [Data Marketing School - GTM Phone Call Tracking](https://data-marketing-school.com/en/blog/google-ads-website-phone-call-conversion-tracking-with-google-tag-manager/) - Implementation guide

### Tertiary (LOW confidence - for validation)
- [Apexure - Click to Call Landing Page](https://www.apexure.com/blog/click-to-call-landing-page-optimize-landing-page-for-phone-calls) - Conversion statistics
- [Stakque - Google Ads Best Practices for EdTech](https://stakque.com/google-ads-best-practices-edtech-companies/) - Education-specific

---

## Metadata

**Confidence breakdown:**
- Google Ads Call Tracking: HIGH - Official Google documentation
- Utility Bar: HIGH - NN/g research + multiple sources
- Subject Landing Pages: MEDIUM - Best practices clear, content needs domain knowledge
- Premium SaaS Patterns: HIGH - Multiple 2026 sources agree
- Mobile Click-to-Call: MEDIUM - Data-driven, needs testing to confirm for BEAM

**Research date:** 2026-01-31
**Valid until:** 2026-03-31 (Google Ads implementation stable; design trends may shift quarterly)
