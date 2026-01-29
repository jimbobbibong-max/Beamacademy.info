# Domain Pitfalls: Landing Page Redesign

**Domain:** Static landing page frontend redesign
**Context:** BEAM Academy (HSC tutoring), static HTML/CSS/JS (~7,700 LOC), purple brand, Outfit font, 0.9s LCP
**Researched:** 2026-01-29
**Confidence:** HIGH (multiple authoritative sources cross-referenced)

---

## Critical Pitfalls

Mistakes that cause rewrites, major regressions, or kill conversions.

### Pitfall 1: Redesign Destroys Performance

**What goes wrong:** New design adds animations, new fonts, larger images, or JavaScript that kills the excellent 0.9s LCP you already have. Performance regressions are invisible during development but devastate real users.

**Why it happens:**
- Designers focus on aesthetics, not performance budget
- "Just one more animation" accumulates
- Testing on fast dev machines, not real mobile networks
- LCP element changes and new element is slow to load

**Consequences:**
- Every second of load time = 12% drop in conversion rate
- Pages loading >3s lose 53% of mobile visitors
- Google penalizes slow pages in ad quality score

**Prevention:**
- Establish performance budget BEFORE redesign: LCP < 2.5s, CLS < 0.1
- Test every change on throttled 3G connection
- Track LCP element - if it changes, verify new element loads fast
- Avoid adding new web fonts (Outfit is already loaded)
- No JavaScript that blocks initial render

**Detection:**
- Run Lighthouse before/after every major change
- Monitor LCP in browser DevTools Performance tab
- Test on actual mobile device, not just emulator

**Severity:** CRITICAL - can undo all other redesign benefits

---

### Pitfall 2: Animation Performance Jank

**What goes wrong:** CSS animations that look smooth on dev machine stutter or freeze on mobile. Users experience "jank" - stuttering at <60fps that signals poor quality.

**Why it happens:**
- Animating layout-triggering properties (width, height, margin, top, left)
- Too many simultaneous animations
- Not using GPU-accelerated properties
- Layout thrashing (JS reads then writes DOM repeatedly)

**Consequences:**
- 62% of pages have images without explicit dimensions, causing CLS
- Janky animations feel "broken" to users
- CPU spikes drain mobile battery, creating subconscious negative association

**Prevention:**
- ONLY animate `transform` and `opacity` (GPU-composited, no reflow)
- Never animate `width`, `height`, `margin`, `padding`, `top`, `left`, `right`, `bottom`
- Use `will-change` sparingly and only on elements that will animate
- Limit to 2 simultaneous animations
- Use `requestAnimationFrame` for any JS-driven animation

**Bad:**
```css
.card:hover {
  margin-top: -10px;  /* Forces layout recalc */
  height: 310px;      /* Forces layout recalc */
}
```

**Good:**
```css
.card:hover {
  transform: translateY(-10px);  /* GPU composited */
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);  /* Paint only */
}
```

**Detection:**
- Chrome DevTools > Performance > check for red "Layout" bars
- Aim for 60fps (16.67ms per frame)
- Watch for janky scrolling on mobile

**Severity:** CRITICAL - kills perceived quality

---

### Pitfall 3: CLS (Cumulative Layout Shift) Disasters

**What goes wrong:** Content jumps around as the page loads. User goes to click a button, layout shifts, they click the wrong thing. Extremely frustrating.

**Why it happens:**
- Images without explicit width/height attributes
- Fonts loading and changing text size
- Dynamic content injected above existing content
- Ads or embeds without reserved space

**Consequences:**
- 62% of mobile pages have at least one image without dimensions
- CLS > 0.1 fails Core Web Vitals
- Users click wrong elements, causing rage clicks and bounces

**Prevention:**
- ALWAYS set `width` and `height` attributes on all `<img>` tags
- Use `aspect-ratio` CSS for responsive images
- Preload fonts with `font-display: swap` or `optional`
- Reserve space for dynamic content with min-height
- Never inject content above the viewport after initial load

**Example:**
```html
<!-- Bad: no dimensions -->
<img src="hero.jpg" alt="Hero">

<!-- Good: explicit dimensions -->
<img src="hero.jpg" alt="Hero" width="1200" height="600">

<!-- Also good: aspect-ratio -->
<img src="hero.jpg" alt="Hero" style="aspect-ratio: 2/1; width: 100%;">
```

**Detection:**
- Chrome DevTools > Lighthouse > CLS score
- Web Vitals extension shows CLS in real-time
- Test with slow 3G to see loading sequence

**Severity:** CRITICAL - fails Core Web Vitals, frustrates users

---

### Pitfall 4: Mobile-Last Design

**What goes wrong:** Design looks great on desktop, but mobile is an afterthought. Elements don't fit, tap targets too small, text unreadable.

**Why it happens:**
- Designers use desktop screens
- Easier to start with big canvas
- "We'll fix mobile later"
- Testing only in browser resize, not real devices

**Consequences:**
- 64%+ of searches on mobile
- 52% of users won't engage with company after bad mobile experience
- 73% of designers say non-responsive design is #1 reason visitors leave

**Prevention:**
- Design mobile-first, enhance for desktop
- Minimum 44x44px tap targets (Apple HIG guideline)
- Thumb-friendly CTA placement (bottom center reachable)
- Single-column layouts on mobile
- Test on actual devices, not just browser resize

**Detection:**
- Chrome DevTools > Device toolbar
- Actual device testing (iOS Safari, Android Chrome)
- Lighthouse mobile audit

**Severity:** CRITICAL - 64% of traffic is mobile

---

### Pitfall 5: Too Many CTAs (Decision Paralysis)

**What goes wrong:** Multiple competing calls-to-action confuse visitors. "Book Trial" vs "Learn More" vs "Call Now" vs "Download Guide" - which do they click?

**Why it happens:**
- Trying to serve multiple user intents
- "More options = more conversions" (false)
- Different stakeholders want different CTAs
- Adding without removing

**Consequences:**
- Hick's Law: more choices = longer decision time = more bounces
- Conversion rates DROP with multiple competing CTAs
- Visitors click nothing when unsure what to click

**Prevention:**
- ONE primary CTA, repeated 2-3 times on page
- All instances lead to same action (form submission)
- Secondary actions (phone, chat) visually subordinate
- If you add a CTA, remove one

**Example of what NOT to do:**
```
Above fold: [Book Trial] [Learn More] [Call Us]
Middle: [Get Free Guide] [Book Trial] [Schedule Call]
Footer: [Contact] [Subscribe] [Book Trial] [WhatsApp]
```

**Example of correct approach:**
```
Above fold: [Book Free Trial]
After value section: [Book Free Trial]
After testimonials: [Book Free Trial]
Sticky bar: [Book Free Trial]
```

**Detection:**
- Count unique conversion actions on page
- If > 1 primary CTA type, redesign

**Severity:** CRITICAL - direct conversion killer

---

## Moderate Pitfalls

Mistakes that cause delays, technical debt, or measurable but not catastrophic conversion drops.

### Pitfall 6: Trendy Patterns That Age Poorly

**What goes wrong:** Implementing design trends that will look dated in 6-12 months. Site needs redesign again.

**Common culprits (2025):**
- Extreme brutalism (looks broken to non-designers)
- Overly complex glassmorphism
- Excessive parallax effects
- Cursor-following animations
- "Scroll-jacking" (custom scroll behavior)
- Autoplaying video backgrounds

**Why it happens:**
- Dribbble/Behance inspiration without production context
- "It looks cool" without "will it work"
- Following trends instead of fundamentals

**Prevention:**
- Timeless beats trendy: clean hierarchy, good typography, clear CTAs
- Ask: "Will parents in their 40s find this intuitive?"
- Prefer subtle polish over attention-grabbing gimmicks
- Purple brand + Outfit font is already distinctive; don't add more

**Detection:**
- Would this design work in 2020? Will it work in 2028?
- Would your parents understand how to use it?

**Severity:** MEDIUM - causes premature redesign

---

### Pitfall 7: Breaking Existing Accessibility

**What goes wrong:** Redesign introduces accessibility violations that current site doesn't have, potentially creating legal liability.

**Common mistakes:**
- Removing focus indicators ("looks ugly")
- Low contrast text (aesthetics over readability)
- Interactive elements without keyboard access
- Images without alt text
- Form labels removed for "cleaner" look

**Why it happens:**
- Accessibility not in design requirements
- "We'll add it later" (never happens)
- Testing only with mouse, not keyboard

**Prevention:**
- Test with keyboard only (Tab, Enter, Escape)
- Minimum 4.5:1 contrast for text (WCAG AA)
- All images need meaningful alt text
- Form inputs must have associated labels
- Focus indicators required (can be styled, not removed)

**BEAM-specific concerns (from v6 audit):**
- Some aria-hidden with focusable children - don't make worse
- Some contrast issues - don't add more
- Links without discernible names - ensure new links are labeled

**Detection:**
- Chrome DevTools > Lighthouse > Accessibility
- axe DevTools extension
- Wave accessibility checker
- Manual keyboard testing

**Severity:** MEDIUM - legal risk, excludes users

---

### Pitfall 8: CSS That Breaks on Edge Cases

**What goes wrong:** CSS works in test cases but breaks with real content: long names, different languages, dynamic content.

**Common failures:**
- Fixed-width containers with variable content
- Truncation without showing it (content just disappears)
- Overlapping elements at certain viewport widths
- Broken layouts between common breakpoints (768px-1024px tablet gap)

**Why it happens:**
- Testing with ideal content lengths
- Only testing 3 breakpoints (mobile/tablet/desktop)
- Not testing with real content variations

**Prevention:**
- Test with extremely long and extremely short content
- Use CSS that adapts: `min-width`, `max-width`, `clamp()`, `min()`, `max()`
- Test at viewport widths: 320px, 375px, 414px, 768px, 820px, 1024px, 1280px, 1440px
- Use `text-overflow: ellipsis` with `overflow: hidden` and `white-space: nowrap` for controlled truncation

**Example:**
```css
/* Bad: breaks with long content */
.card-title {
  width: 200px;
}

/* Good: flexible with guardrails */
.card-title {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**Detection:**
- Test with "Lorem ipsum dolor sit amet consectetur" in all text fields
- Test with "Hi" in all text fields
- Resize browser continuously, watch for layout breaks

**Severity:** MEDIUM - causes visual bugs in production

---

### Pitfall 9: Form Field Conversion Killers

**What goes wrong:** Form redesign inadvertently adds friction that kills submissions.

**Common mistakes:**
- Adding fields ("while we're at it, let's ask for...")
- Multi-column form layouts on mobile
- Removing inline validation
- Fancy custom inputs that break autofill
- Required phone number (58% of users hate this)
- Generic "Submit" button

**Why it happens:**
- "More data is better" mindset
- Treating form as afterthought
- Custom styling breaks native behavior

**Statistics:**
- Each additional field = ~10% drop in conversions
- Reducing 11 to 4 fields = 120% conversion increase
- Making phone optional = 275% conversion increase

**Prevention:**
- Maximum 3-4 fields for lead gen: name, email, year level, (optional) phone
- Single-column layout always
- Keep native input behaviors (autofill, validation)
- Benefit-driven CTA: "Book My Free Trial" not "Submit"
- Inline validation that helps, not punishes

**BEAM current form (good baseline):**
- Name, email, phone (should be optional), year level
- Single column
- Don't make it worse

**Detection:**
- Count fields - is each truly necessary?
- Test autofill on Chrome and Safari
- Submit with errors - are messages helpful?

**Severity:** MEDIUM - direct conversion impact

---

### Pitfall 10: Trust Signals Done Wrong

**What goes wrong:** Adding social proof that actually decreases trust.

**Common mistakes:**
- Too many trust badges (looks spammy, >3 badges per section)
- Stock photo testimonials (obviously fake)
- Testimonials without specifics ("Great service!" - John S.)
- Outdated testimonials (dates from 2022)
- Logos of companies that aren't actually clients

**Why it happens:**
- "More social proof = more trust" (false)
- Using easy-to-get generic testimonials
- Not refreshing old content

**Prevention:**
- Maximum 3 badges per section
- Testimonials with: full name, suburb, specific outcome, photo if possible
- Use specific results: "James improved from Band 4 to Band 5 in Chemistry"
- 4-6 client logos work better than 20
- Keep testimonials recent and relevant

**BEAM specifics:**
- Tutor credentials are strong (BHHS grads, 95+ HSC, med students) - show, don't tell
- Parent testimonials with specific outcomes
- Don't dilute with generic "best tutoring!" quotes

**Detection:**
- Would you believe this testimonial if you saw it?
- Can you verify the person exists?
- Is the claim specific enough to be credible?

**Severity:** MEDIUM - erodes trust instead of building it

---

### Pitfall 11: JavaScript That Blocks Rendering

**What goes wrong:** JavaScript loaded synchronously prevents page from rendering until downloaded and executed.

**Why it happens:**
- Adding scripts without `async` or `defer`
- Third-party widgets (chat, analytics) loaded early
- "Just add this script tag" without understanding impact

**Consequences:**
- Render-blocking JS can add seconds to initial load
- Analytics, chat widgets block main thread with long tasks
- LCP delayed until scripts execute

**Prevention:**
- All `<script>` tags should have `defer` (or `async` for independent scripts)
- Load third-party widgets after page load
- Inline critical JS only if <1kb
- Move non-critical JS to end of body

**Example:**
```html
<!-- Bad: blocks rendering -->
<script src="analytics.js"></script>

<!-- Good: deferred -->
<script src="analytics.js" defer></script>

<!-- Good: loaded after page load -->
<script>
  window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = 'analytics.js';
    document.body.appendChild(script);
  });
</script>
```

**Detection:**
- Chrome DevTools > Performance > look for long yellow bars (Script)
- Lighthouse > "Eliminate render-blocking resources"

**Severity:** MEDIUM - performance regression

---

## Minor Pitfalls

Mistakes that cause annoyance but are fixable without major rework.

### Pitfall 12: Inconsistent Visual Language

**What goes wrong:** New sections don't match existing design system. Different spacing, colors, typography weights create visual noise.

**Common drift:**
- Button styles vary between sections
- Inconsistent padding (40px here, 60px there)
- Color values slightly off (#8B5CF6 vs #9B6FF7)
- Font weights inconsistent

**Prevention:**
- Document design tokens: colors, spacing, typography
- Use CSS custom properties consistently
- Audit existing styles before adding new ones
- Copy-paste existing patterns, don't recreate

**Detection:**
- Side-by-side comparison of sections
- Inspect element to verify exact values match

**Severity:** LOW - creates visual noise, fixable

---

### Pitfall 13: Orphaned CSS After Changes

**What goes wrong:** Old CSS rules remain after HTML is removed or restructured. Dead code accumulates.

**Why it happens:**
- Fear of deleting "might be used somewhere"
- No easy way to track usage
- Incremental changes without cleanup

**Prevention:**
- Remove CSS immediately when removing HTML
- Use browser coverage tool to find unused CSS
- Comment CSS with what HTML it styles

**BEAM context:** v6 cleaned up 78 lines of dead CSS - maintain this discipline

**Detection:**
- Chrome DevTools > Coverage tab
- PurgeCSS or similar tools
- Manual audit when removing sections

**Severity:** LOW - technical debt, not user-facing

---

### Pitfall 14: Forgetting Hover/Focus/Active States

**What goes wrong:** Interactive elements don't respond to interaction. Buttons look clickable but give no feedback.

**Missing states:**
- `:hover` - desktop mouse over
- `:focus` - keyboard navigation
- `:focus-visible` - keyboard only (not click)
- `:active` - while clicking
- `:disabled` - when inactive

**Prevention:**
- Every interactive element needs at minimum `:hover` and `:focus`
- Use `:focus-visible` for focus rings that only show on keyboard
- Test with keyboard navigation

**Example:**
```css
.button {
  background: var(--purple-600);
  transition: background 0.15s ease;
}

.button:hover {
  background: var(--purple-700);
}

.button:focus-visible {
  outline: 2px solid var(--purple-400);
  outline-offset: 2px;
}

.button:active {
  transform: scale(0.98);
}
```

**Detection:**
- Hover every clickable element
- Tab through page with keyboard

**Severity:** LOW - UX polish

---

## Education/Service Site Specific Warnings

### Warning 1: Generic "Contact Us" for Pricing

**What it looks like:** Hiding pricing behind "Contact for a quote"

**Why it fails:** 75% of B2B buyers prefer self-serve. Parents assume hidden pricing = expensive or sales pressure.

**For BEAM:** Free trial is the offer. Make it clear there's NO payment required, no commitment. If you have pricing tiers, show starting prices.

---

### Warning 2: Testimonials From Wrong Persona

**What it looks like:** Testimonials from students when parents are the buyer

**Why it fails:** Parents making the payment decision need to hear from other parents, not students.

**For BEAM:** Lead with parent testimonials. Student testimonials are secondary. "Lisa Chen, Hurstville - mother of Year 12 student" is more relevant than "Great tutoring! - James, Year 12"

---

### Warning 3: Credentials Without Proof

**What it looks like:** "Expert tutors" with no verification

**Why it fails:** Every tutoring service claims expert tutors. Claims without proof are noise.

**For BEAM:** Show specific tutor profiles. "Sarah - BHHS Class of 2023, ATAR 98.5, Medicine at UNSW" with photo. The specificity IS the proof.

---

### Warning 4: Information Overload

**What it looks like:** Every feature, every detail, every FAQ on the landing page

**Why it fails:** Parents don't need all information to book a free trial. They need enough to trust and enough to understand the offer.

**For BEAM:** v6 already removed redundant content (CTA section, features strip, support bullets). Maintain this discipline. Every addition should pass the 5-question test:
1. Does it move visitor toward free trial?
2. Does it build trust/reduce uncertainty?
3. Does it reduce friction?
4. Is it essential?
5. Is the CTA clear?

---

## How to Test We're Not Making These Mistakes

### Before Every PR/Change

| Check | Tool | Threshold |
|-------|------|-----------|
| LCP | Lighthouse | < 2.5s (currently 0.9s - don't regress) |
| CLS | Lighthouse | < 0.1 |
| INP | Web Vitals extension | < 200ms |
| Mobile rendering | Chrome Device Toolbar | No horizontal scroll |
| Keyboard navigation | Manual Tab test | All interactive elements reachable |
| Animation smoothness | DevTools Performance | 60fps, no red Layout bars |

### Before Each Phase Completion

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| CTA count | Manual audit | 1 primary CTA type only |
| Form fields | Count | 4 or fewer |
| Trust signals | Count badges | 3 or fewer per section |
| Dead CSS | Coverage tool | No unused rules from changes |
| Mobile tap targets | Manual test | All buttons easily tappable |

### Before Milestone Completion

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Full Lighthouse audit | Lighthouse | Green scores maintained |
| Real device test | iPhone + Android | Renders correctly |
| Accessibility audit | axe DevTools | No new violations |
| Page weight | DevTools Network | Not significantly increased |
| Content audit | 5-question test | All content passes |

---

## Summary: Top 5 Rules for This Redesign

1. **Protect the 0.9s LCP** - Every change must be tested for performance impact
2. **Mobile-first, always** - Design for 375px first, enhance for desktop
3. **One primary CTA** - "Book Free Trial" everywhere, nothing competing
4. **Animate only transform/opacity** - Everything else causes jank
5. **Remove before adding** - Apply 5-question test to all new content

---

## Sources

### Performance & Core Web Vitals
- [web.dev - Core Web Vitals](https://web.dev/articles/vitals)
- [DebugBear - 2025 Web Performance Review](https://www.debugbear.com/blog/2025-in-web-performance)
- [HTTP Archive Web Almanac - Performance 2025](https://almanac.httparchive.org/en/2025/performance)
- [OWDT - How to Improve Core Web Vitals 2025](https://owdt.com/insight/how-to-improve-core-web-vitals/)

### Animation Performance
- [MDN - Animation Performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate)
- [SitePoint - CSS Animation Performance](https://www.sitepoint.com/check-css-animation-performance-with-the-browsers-dev-tools/)
- [KeyCDN - Animation Performance Tips](https://www.keycdn.com/blog/animation-performance)

### Landing Page Conversion
- [Moosend - Landing Page Mistakes 2025](https://moosend.com/blog/landing-page-mistakes/)
- [Zoho - 13 Landing Page Mistakes 2025](https://www.zoho.com/landingpage/landing-page-mistakes.html)
- [Landingi - UX for Landing Pages](https://landingi.com/conversion-optimization/ux/)
- [Unbounce - How to Increase Conversion Rate](https://unbounce.com/conversion-rate-optimization/how-to-increase-conversion-rate/)

### Mobile Design
- [Linear Design - Responsive Landing Page Tips 2025](https://lineardesign.com/blog/responsive-design-landing-page/)
- [OptinMonster - Mobile Landing Page Best Practices](https://optinmonster.com/mobile-landing-page-best-practices/)
- [Taktical - Responsive Landing Page Mistakes](https://taktical.co/blog/common-mistakes-to-avoid-when-designing-a-responsive-landing-page/)

### Trust & Social Proof
- [SlashExperts - Website Trust Signals 2025](https://www.slashexperts.com/post/website-trust-signals-the-hidden-elements-costing-you-sales)
- [TrustSignals - 77 Trust Signals](https://www.trustsignals.com/blog/77-trust-signals-to-increase-your-online-conversion-rate)
- [One Page Love - Testimonial Mistakes](https://onepagelove.com/testimonial-mistakes)
- [Senja - Testimonial Page Mistakes](https://senja.io/blog/testimonial-page-mistakes)

### Form Optimization
- [Smashing Magazine - UX in Contact Forms](https://www.smashingmagazine.com/2018/03/ux-contact-forms-essentials-conversions/)
- [Weply - Contact Form Pitfalls](https://www.weply.chat/blog/contact-form-7-pitfalls-to-avoid)
- [Formidable Forms - Contact Form Best Practices](https://formidableforms.com/research-based-tips-improve-contact-form-conversions/)
- [Growform - Lead Form Optimization](https://www.growform.co/lead-form-optimization/)

### Pricing Pages
- [Userpilot - Pricing Page Best Practices](https://userpilot.com/blog/pricing-page-best-practices/)
- [Monetizely - Bad Pricing Page UX](https://www.getmonetizely.com/articles/bad-pricing-page-ux-how-confusing-layouts-kill-conversions)
- [Hotjar - Pricing Page Optimization](https://www.hotjar.com/blog/pricing-page-optimization/)

### Education-Specific
- [Higher Education Marketing - Education Landing Page Mistakes](https://www.higher-education-marketing.com/blog/5-common-education-landing-page-mistakes-hurting-conversion-rate)
- [Finalsite - Landing Page Designs for Schools](https://www.finalsite.com/blog/p/~board/b/post/5-best-landing-page-designs-for-school-websites)
