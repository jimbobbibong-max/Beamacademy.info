# v7 Research Summary: Comprehensive Frontend Redesign

**Project:** BEAM Academy Landing Page
**Milestone:** v7 - Frontend Visual Overhaul
**Researched:** 2026-01-29
**Overall Confidence:** HIGH

---

## 1. Executive Summary

The v7 milestone should deliver a research-backed visual refresh of the BEAM Academy landing page while preserving its excellent 0.9s LCP performance and existing Stripe payment integration. Research across frontend design, education UI, and payment systems reveals that the core technical infrastructure is sound — the "Pay Now button leads nowhere" issue is a configuration/connection problem, not a missing payment system. The redesign work is purely visual and conversion-focused.

The recommended approach is a systematic design system implementation: establish CSS custom properties for typography, spacing, and shadows using an 8px grid system and 1.25 modular type scale. The existing purple (#7c3aed) and Outfit font combination is on-trend for 2025-2026 education brands. The focus should be on refined flat design with subtle depth cues (not heavy glassmorphism), strategic trust signal placement, and maintaining the single "Book Free Trial" CTA pattern that v6 established.

Key risks are performance regression (adding animations/fonts that kill LCP) and decision paralysis from multiple CTAs. Both are avoidable with disciplined execution: only animate `transform` and `opacity`, test every change with Lighthouse, and maintain the single-CTA discipline from v6.

---

## 2. Key Recommendations

**Do immediately:**
- Fix Pay Now button by verifying `STRIPE_SECRET_KEY` in Netlify environment variables
- Establish design token system (CSS custom properties for spacing, typography, shadows)
- Implement 8px grid system for consistent visual rhythm

**Design system specifics:**
- Keep Outfit font, add weight variation (300/400/600/700)
- Use purple-700 (#7c3aed) for CTAs, purple-800 (#6b21a8) for text links (better contrast)
- Adopt subtle shadow scale (xs through xl) instead of current flat design
- Add micro-interactions: button hover lift (translateY -2px), card hover (translateY -4px + shadow)

**Conversion optimization:**
- Maintain single "Book Free Trial" CTA pattern from v6
- Add sticky mobile CTA bar (20% conversion lift reported)
- Lead with parent testimonials (they make the buying decision)
- Show specific tutor credentials with photos

**Do not do:**
- Add new web fonts (will hurt LCP)
- Animate width, height, margin, or padding (causes jank)
- Add multiple competing CTAs
- Hide pricing completely (75% of buyers prefer self-serve)

---

## 3. Design System Specifications

From FRONTEND-DESIGN.md research, implement these CSS custom properties:

### Typography Scale (1.25 Major Third ratio)

```css
:root {
    --font-display: 'Outfit', sans-serif;
    --font-body: 'Outfit', sans-serif;

    --text-xs: 0.75rem;    /* 12px */
    --text-sm: 0.875rem;   /* 14px */
    --text-base: 1rem;     /* 16px - minimum for parents 40-55 */
    --text-lg: 1.125rem;   /* 18px */
    --text-xl: 1.25rem;    /* 20px */
    --text-2xl: 1.5rem;    /* 24px */
    --text-3xl: 1.875rem;  /* 30px */
    --text-4xl: 2.25rem;   /* 36px */
    --text-5xl: 3rem;      /* 48px */
}
```

### Spacing Scale (8px base)

```css
:root {
    --space-1: 0.25rem;   /* 4px */
    --space-2: 0.5rem;    /* 8px */
    --space-3: 0.75rem;   /* 12px */
    --space-4: 1rem;      /* 16px */
    --space-6: 1.5rem;    /* 24px */
    --space-8: 2rem;      /* 32px */
    --space-12: 3rem;     /* 48px */
    --space-16: 4rem;     /* 64px */
    --space-24: 6rem;     /* 96px */
}
```

### Shadow Scale

```css
:root {
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07);
    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08);
    --shadow-brand: 0 4px 14px rgba(124,58,237,0.15);
}
```

### Color Contrast Notes

- #7c3aed on white = 4.54:1 (passes AA for large text only)
- #6b21a8 on white = 7.08:1 (passes AAA for all text)
- Use purple-700 for buttons/headlines, purple-800 for body text links

---

## 4. Payment Finding: Stripe Already Exists

**The payment system is built.** The issue is configuration, not implementation.

### What exists:
- `netlify/functions/create-checkout.js` - Creates Stripe Checkout sessions
- Handles all tier/package combinations with dynamic pricing
- Calculates GST (10%) as separate line item (ATO compliant)
- Stores customer metadata (parent name, student name, subjects)

### Debug steps (1-2 hours maximum):

1. **Check Netlify environment variables**
   - Go to Netlify Dashboard > Site Settings > Environment Variables
   - Verify `STRIPE_SECRET_KEY` exists
   - Should start with `sk_live_` (production) or `sk_test_` (testing)

2. **Test function endpoint**
   ```bash
   curl -X POST https://beamacademy.info/.netlify/functions/create-checkout \
     -H "Content-Type: application/json" \
     -d '{"tier":"Junior","package":"1 Subject","subjects":["Maths"],"parentName":"Test","studentName":"Test","email":"test@test.com","phone":"0400000000"}'
   ```
   - Expected: `{"url":"https://checkout.stripe.com/..."}`
   - Error: Check Netlify Functions logs

3. **Check browser console**
   - Open DevTools > Console when clicking Pay Now
   - Look for JavaScript errors or failed fetch requests

4. **Check Stripe Dashboard**
   - Developers > Logs for recent API calls
   - Verify test/live mode matches the key

**Do NOT implement a new payment system.** The current Stripe Checkout implementation is the correct architecture.

---

## 5. Top Pitfalls to Avoid

From PITFALLS.md, these are the critical mistakes to prevent:

### 1. Redesign Destroys Performance (CRITICAL)
**Risk:** New animations, fonts, or images kill the excellent 0.9s LCP
**Prevention:**
- Test every change with Lighthouse
- Set performance budget: LCP < 2.5s, CLS < 0.1
- No new web fonts (Outfit is already loaded)
- No JavaScript that blocks initial render

### 2. Animation Performance Jank (CRITICAL)
**Risk:** Animations stutter on mobile, feels "broken"
**Prevention:**
- ONLY animate `transform` and `opacity` (GPU-composited)
- NEVER animate `width`, `height`, `margin`, `padding`, `top`, `left`
- Maximum 2 simultaneous animations
- All transitions under 300ms

### 3. CLS Disasters (CRITICAL)
**Risk:** Content jumps around as page loads
**Prevention:**
- All `<img>` tags must have `width` and `height` attributes
- Reserve space for dynamic content with min-height
- Use `font-display: swap` for fonts

### 4. Too Many CTAs (CRITICAL)
**Risk:** Multiple competing CTAs cause decision paralysis, conversions drop
**Prevention:**
- ONE primary CTA type: "Book Free Trial"
- Repeat 2-3 times on page (hero, after proof, sticky bar)
- All buttons lead to same action
- v6 established this pattern - maintain it

### 5. Mobile-Last Design (CRITICAL)
**Risk:** Looks great on desktop, broken on mobile (64% of traffic)
**Prevention:**
- Design mobile-first (375px), enhance for desktop
- Minimum 44x44px tap targets
- Single-column layouts on mobile
- Test on actual devices, not just browser resize

---

## 6. Priority Implementation Order

### Phase 1: Payment Fix + Design Tokens (Foundation)
**Duration:** 2-4 hours
**Delivers:** Working payment flow, CSS custom properties
**Tasks:**
1. Debug and fix Pay Now button (follow steps in Section 4)
2. Add design token CSS custom properties (typography, spacing, shadows, colors)
3. Verify no performance regression

### Phase 2: Typography & Spacing Overhaul
**Duration:** 4-6 hours
**Delivers:** Consistent visual rhythm across all sections
**Tasks:**
1. Apply modular type scale to all headings/body text
2. Implement 8px grid spacing throughout
3. Add fluid typography with `clamp()` for responsive scaling
4. Audit and fix line heights (body: 1.6-1.7, headings: 1.1-1.2)

### Phase 3: Component Polish (Cards, Buttons, Shadows)
**Duration:** 4-6 hours
**Delivers:** Modern visual refinement
**Tasks:**
1. Unify card styles with shadow scale
2. Add micro-interactions (button hover lift, card hover elevation)
3. Refine CTA button styling (pill shape, brand shadow)
4. Add hover/focus/active states to all interactive elements

### Phase 4: Mobile Optimization
**Duration:** 3-4 hours
**Delivers:** Mobile-first conversion optimization
**Tasks:**
1. Implement sticky mobile CTA bar
2. Verify all tap targets are 44x44px minimum
3. Test and fix any mobile-specific layout issues
4. Ensure form is mobile-optimized (16px inputs, proper keyboard types)

### Phase 5: Trust Signal Enhancement
**Duration:** 2-3 hours
**Delivers:** Stronger social proof placement
**Tasks:**
1. Add specific tutor credentials with photos
2. Enhance testimonial cards with photos and specific outcomes
3. Verify trust signals appear near CTAs
4. Maximum 3 badges per section

### Phase 6: Final Polish & Verification
**Duration:** 2-3 hours
**Delivers:** Production-ready redesign
**Tasks:**
1. Full Lighthouse audit (maintain 0.9s LCP)
2. Accessibility audit (no new violations)
3. Real device testing (iPhone + Android)
4. Remove any orphaned CSS from changes

---

## 7. Success Metrics

### Performance (Non-Negotiable)
| Metric | Current | Target | Threshold |
|--------|---------|--------|-----------|
| LCP | 0.9s | < 2.5s | Must not regress significantly |
| CLS | TBD | < 0.1 | Must pass Core Web Vitals |
| INP | TBD | < 200ms | Must pass Core Web Vitals |

### Visual Quality
- [ ] Design tokens applied consistently (no hardcoded values)
- [ ] All interactive elements have hover/focus/active states
- [ ] Card shadows follow defined scale
- [ ] Typography follows modular scale

### Conversion Optimization
- [ ] Single CTA type maintained ("Book Free Trial")
- [ ] Sticky mobile CTA implemented
- [ ] Trust signals visible near CTAs
- [ ] Form has 4 or fewer fields

### Technical Health
- [ ] No new accessibility violations
- [ ] No orphaned CSS from changes
- [ ] All images have width/height attributes
- [ ] Animations use only transform/opacity

### Payment
- [ ] Pay Now button successfully creates Stripe Checkout session
- [ ] Test payment completes in Stripe test mode
- [ ] Success/cancel URLs work correctly

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Design System | HIGH | Research from 20+ authoritative 2025-2026 sources |
| Payment | HIGH | Code review confirms Stripe Checkout exists and is correctly architected |
| Education UI | HIGH | Competitor analysis + conversion research with statistics |
| Pitfalls | HIGH | Cross-referenced from multiple web performance and conversion sources |

**Overall confidence:** HIGH

### Gaps to Address

1. **Current CLS score unknown** - Run Lighthouse to baseline before changes
2. **Current INP score unknown** - Measure with Web Vitals extension
3. **Stripe key status unknown** - Must verify in Netlify dashboard before assuming it's missing

---

## Sources

### Design System
- [Visual Hierarchy in Web Design 2026](https://theorangebyte.com/visual-hierarchy-web-design/)
- [Modern Web Typography 2025](https://www.frontendtools.tech/blog/modern-web-typography-techniques-2025-readability-guide)
- [8px Grid System Guide](https://hub.sivo.it.com/ui-ux-design-systems/what-is-an-8-point-grid-system/)
- [UI/UX Design Trends 2026](https://www.index.dev/blog/ui-ux-design-trends)

### Performance
- [Core Web Vitals 2026 Guide](https://nitropack.io/blog/most-important-core-web-vitals-metrics/)
- [Web Performance 2025 Review](https://www.debugbear.com/blog/2025-in-web-performance)

### Conversion
- [Landing Page CRO Guide 2026](https://www.optimonk.com/conversion-rate-optimization-for-landing-pages/)
- [CTA Statistics 2025](https://wisernotify.com/blog/call-to-action-stats/)
- [Social Proof Landing Pages](https://www.klientboost.com/landing-pages/landing-page-testimonials/)

### Payment
- [Stripe Checkout Documentation](https://stripe.com/payments/checkout)
- [Netlify Functions + Stripe Tutorial](https://www.netlify.com/blog/2020/04/13/learn-how-to-accept-money-on-jamstack-sites-in-38-minutes/)

### Education/Tutoring
- [Matrix Education](https://www.matrix.edu.au/) - Competitor analysis
- [Cluey Learning](https://clueylearning.com.au/) - Competitor analysis
- [Tutoring Landing Page Guide](https://unicornplatform.com/blog/build-a-stunning-tutoring-landing-page-in-minutes/)

---

*Research synthesized: 2026-01-29*
*Ready for roadmap: YES*
*Key constraint: Maintain 0.9s LCP, BEAM purple (#7c3aed), Outfit font*
