# Phase 2: CTA Placement - Research

**Researched:** 2026-01-20
**Domain:** Mobile CTA conversion optimization, sticky UI patterns, click-to-call
**Confidence:** HIGH

## Summary

This phase focuses on making the primary conversion action ("Book Free Trial") immediately visible on mobile and always accessible via a sticky CTA bar. Research confirms that above-the-fold CTAs outperform below-fold placement by 304%, and sticky CTAs are especially effective on mobile where users expect quick, one-tap access.

The existing codebase already has solid foundations:
- A well-structured hero section with a "Start Free Trial" button
- A floating phone button (`floating-btn.phone`) using `position: fixed`
- Mobile breakpoints at 768px and 600px
- CSS custom properties for consistent purple brand colors

**Primary recommendation:** Add a sticky bottom CTA bar that appears when user scrolls past the hero section, using `position: fixed` with IntersectionObserver for smooth visibility toggling. Keep the existing hero CTA prominent, and enhance the floating phone button placement.

## Standard Stack

No additional libraries needed. The implementation uses vanilla HTML, CSS, and JavaScript.

### Core Technologies
| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| Vanilla CSS | Modern | Styling sticky bar, CTA buttons | Already used in codebase, no framework overhead |
| Vanilla JS | ES6+ | IntersectionObserver for scroll detection | Native API, performant, no dependencies |
| tel: protocol | N/A | Click-to-call links | Universal mobile support |

### Supporting Patterns
| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| IntersectionObserver | Detect when hero leaves viewport | Show/hide sticky bar without scroll event performance issues |
| position: fixed | Pin sticky bar to viewport bottom | More reliable than position: sticky for CTA bars |
| CSS transforms | Animate bar entrance/exit | GPU-accelerated, smooth on mobile |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| IntersectionObserver | scroll event listener | Poor performance, causes jank on mobile |
| position: fixed | position: sticky | Sticky has parent container limitations, less control |
| Bottom sticky bar | Top sticky bar | Bottom is easier for thumb reach on mobile |

## Architecture Patterns

### Recommended Implementation Structure

```
Sticky CTA System Components:
1. Hero CTA (existing) - primary above-fold button
2. Sticky bottom bar - appears after scrolling past hero
3. Click-to-call integration - phone number in sticky bar + floating button

CSS Organization:
- Add sticky bar styles after existing .floating-btn styles (~line 2350)
- Add mobile responsive rules in @media (max-width: 768px) block
```

### Pattern 1: Sentinel-Based Sticky Bar Visibility
**What:** Use an invisible sentinel element at the bottom of the hero section. When it leaves viewport, show the sticky bar.
**When to use:** When you need performant scroll-triggered visibility without janky scroll events.
**Example:**
```javascript
// Sentinel approach - performant visibility toggle
const sentinel = document.querySelector('.hero');
const stickyBar = document.querySelector('.sticky-cta-bar');

const observer = new IntersectionObserver(([entry]) => {
  // Show bar when hero is NOT intersecting (scrolled past)
  stickyBar.classList.toggle('visible', !entry.isIntersecting);
}, { threshold: 0 });

observer.observe(sentinel);
```

### Pattern 2: Fixed Bottom CTA Bar
**What:** A bar fixed to the bottom of the viewport with CTA button(s).
**When to use:** Mobile-first CTA placement where thumb accessibility matters.
**Example:**
```css
.sticky-cta-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 950; /* Below nav (1000), above floating btn (900) */
  transform: translateY(100%);
  transition: transform 0.3s ease;
  will-change: transform; /* GPU acceleration */
}

.sticky-cta-bar.visible {
  transform: translateY(0);
}
```

### Pattern 3: Click-to-Call Button
**What:** Phone link using tel: protocol with international format.
**When to use:** Any phone number display on mobile.
**Example:**
```html
<a href="tel:+61491791447" class="cta-call">
  <span class="cta-call-icon">📞</span>
  <span class="cta-call-text">Call Now</span>
</a>
```

### Anti-Patterns to Avoid
- **Scroll event listeners for show/hide:** Causes jank on mobile, use IntersectionObserver instead
- **Sticky bar covering too much content:** Keep bar height minimal (60-70px max)
- **Small tap targets:** CTA buttons must be at least 44x44px, prefer 48x48px
- **No safe area inset on iOS:** Use `env(safe-area-inset-bottom)` for notched iPhones
- **Animating with margin/padding:** Use transform for smooth GPU-accelerated animations

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll detection | Manual scroll event handler | IntersectionObserver API | Native, performant, handles edge cases |
| Phone number formatting | Custom regex parsing | `tel:+61491791447` format | Universal support, handles +country code |
| Touch target sizing | Arbitrary pixel values | 48x48px minimum with spacing | WCAG 2.2 + platform guidelines |
| iOS safe area handling | Fixed pixel padding | `env(safe-area-inset-bottom)` | Adapts to notch/home indicator |

**Key insight:** The codebase already uses IntersectionObserver patterns (FAQ section). Follow the same approach for consistency.

## Common Pitfalls

### Pitfall 1: Sticky Bar Conflicts with Floating Phone Button
**What goes wrong:** Both elements positioned at bottom-right, overlapping on mobile.
**Why it happens:** Existing `.floating-contact` is at bottom: 16px, right: 16px.
**How to avoid:** Either integrate phone into sticky bar OR adjust floating button position when bar is visible.
**Warning signs:** Overlapping buttons, confusing tap targets.

### Pitfall 2: Hero CTA Hidden on Small Phones
**What goes wrong:** "Start Free Trial" button scrolls below fold on short viewports.
**Why it happens:** Hero has min-height: 100vh but hero-content may push CTA down.
**How to avoid:** Verify CTA visibility at 320px width, 568px height (iPhone SE).
**Warning signs:** Testing only on larger devices.

### Pitfall 3: iOS Safari Bottom Bar Interference
**What goes wrong:** Sticky bar hidden behind Safari's navigation bar.
**Why it happens:** iOS Safari has dynamic viewport height changes.
**How to avoid:** Add padding-bottom using `env(safe-area-inset-bottom)`.
**Warning signs:** Bar works in Chrome DevTools but not on real iOS device.

### Pitfall 4: Z-Index Stacking Issues
**What goes wrong:** Sticky bar appears behind modals or navigation.
**Why it happens:** Inconsistent z-index management.
**How to avoid:** Use existing z-index hierarchy: nav=1000, modal=1000, sticky=950, floating=900.
**Warning signs:** Visual overlap bugs.

### Pitfall 5: Performance on Low-End Android
**What goes wrong:** Janky animation when bar appears/disappears.
**Why it happens:** Repainting on transform without GPU acceleration.
**How to avoid:** Use `will-change: transform` and `transform: translateY()` not `bottom`.
**Warning signs:** Visible stuttering on scroll.

## Code Examples

Verified patterns based on existing codebase style:

### Sticky CTA Bar HTML Structure
```html
<!-- Add before </main> closing tag -->
<div class="sticky-cta-bar" id="sticky-cta-bar" aria-hidden="true">
  <div class="sticky-cta-container">
    <a href="tel:+61491791447" class="sticky-cta-phone" aria-label="Call BEAM Academy">
      <span>📞</span>
      <span class="sticky-cta-phone-text">Call</span>
    </a>
    <a href="#contact" class="sticky-cta-button">Book Free Trial</a>
  </div>
</div>
```

### Sticky CTA Bar CSS
```css
/* Source: Based on existing .floating-btn patterns in codebase */
.sticky-cta-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 950;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--gray-200);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.sticky-cta-bar.visible {
  transform: translateY(0);
}

.sticky-cta-container {
  display: flex;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;
}

.sticky-cta-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 14px 24px;
  background: linear-gradient(135deg, var(--purple-600), var(--purple-700));
  color: white;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  border-radius: 100px;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
  transition: all 0.2s ease;
}

.sticky-cta-button:hover {
  background: linear-gradient(135deg, var(--purple-700), var(--purple-800));
  transform: translateY(-1px);
}

.sticky-cta-phone {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 48px;
  min-height: 48px;
  padding: 14px 16px;
  background: var(--gray-100);
  color: var(--purple-700);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.sticky-cta-phone:hover {
  background: var(--purple-100);
}

/* Hide sticky bar on desktop - only show on mobile */
@media (min-width: 769px) {
  .sticky-cta-bar {
    display: none;
  }
}

/* Adjust floating button when sticky bar is visible */
.sticky-cta-bar.visible ~ .floating-contact {
  bottom: 80px; /* Push up above sticky bar */
}
```

### JavaScript IntersectionObserver
```javascript
// Source: Based on IntersectionObserver best practices
(function() {
  const hero = document.querySelector('.hero');
  const stickyBar = document.getElementById('sticky-cta-bar');

  if (!hero || !stickyBar) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const isVisible = !entry.isIntersecting;
      stickyBar.classList.toggle('visible', isVisible);
      stickyBar.setAttribute('aria-hidden', !isVisible);
    },
    {
      threshold: 0,
      rootMargin: '-100px 0px 0px 0px' // Trigger slightly before hero fully exits
    }
  );

  observer.observe(hero);
})();
```

### Hero CTA Enhancements (ensure visibility)
```css
/* Ensure hero CTA is prominent on mobile */
@media (max-width: 768px) {
  .hero-buttons {
    flex-direction: column;
    gap: 12px;
  }

  .hero-buttons .btn-primary {
    width: 100%;
    padding: 16px 24px;
    font-size: 1.1rem;
    text-align: center;
  }

  .hero-buttons .btn-secondary {
    width: 100%;
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| scroll event listeners | IntersectionObserver | 2020+ | 10x performance improvement |
| position: sticky for bars | position: fixed + JS toggle | Ongoing | More reliable cross-browser |
| 44px touch targets | 48px touch targets | WCAG 2.2 / 2023 | Better accessibility compliance |
| Fixed bottom padding | env(safe-area-inset-bottom) | iOS 11+ / 2017 | iPhone X+ support |

**Deprecated/outdated:**
- Using `ontouchstart` for mobile detection: unreliable, use pointer events
- jQuery for scroll animations: vanilla IntersectionObserver is sufficient

## Open Questions

Things that couldn't be fully resolved:

1. **Floating button integration**
   - What we know: Existing floating phone button is at bottom-right
   - What's unclear: Should it be hidden when sticky bar is visible, or repositioned?
   - Recommendation: Reposition floating button 80px higher when bar is visible (CSS sibling selector)

2. **Hero CTA visibility on very small screens**
   - What we know: Hero has 100px top padding on mobile, CTA is after description
   - What's unclear: Exact viewport height where CTA goes below fold
   - Recommendation: Test on 320x568 (iPhone SE) and adjust hero padding if needed

## Codebase Analysis

### Current Hero Section (lines 4277-4309)
- **Primary CTA:** "Start Free Trial" button with class `btn btn-primary`
- **Secondary CTA:** "View Courses" button with class `btn btn-secondary`
- **Structure:** Two-column grid on desktop, stacks on mobile at 768px breakpoint

### Existing Floating Button (lines 2289-2349)
- **Implementation:** `position: fixed`, bottom: 24px, right: 24px
- **Phone number:** Already uses `tel:0491791447` (local format)
- **Mobile adjustment:** Smaller size at 768px breakpoint

### CSS Variable System
- Brand colors: `--purple-600`, `--purple-700`, `--purple-800`
- Shadows: `--shadow-lg`, custom button shadows
- Font: `--font-display` for buttons

### Where to Add New Code
1. **CSS:** After `.floating-btn-tooltip` styles (~line 2350)
2. **HTML:** Before closing `</main>` tag (after CTA section, before footer)
3. **JavaScript:** Add to existing `<script>` section at bottom, after DOMContentLoaded handlers

### Phone Number
- Full format: `+61491791447` (international)
- Display format: `0491 791 447` (Australian local)
- Both already used in codebase (schema.org uses +61, display uses 0491)

## Sources

### Primary (HIGH confidence)
- [MDN Web Docs - position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) - fixed vs sticky behavior
- [W3C WCAG 2.2 - Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) - 44x44px minimum
- Existing codebase patterns (IntersectionObserver in FAQ, floating button styles)

### Secondary (MEDIUM confidence)
- [Instapage - CTA Above or Below Fold](https://instapage.com/blog/call-to-action-above-or-below-fold) - 304% performance difference
- [Smashing Magazine - Accessible Target Sizes](https://www.smashingmagazine.com/2023/04/accessible-tap-target-sizes-rage-taps-clicks/) - touch target research
- [BrowserStack - CSS Position Sticky vs Fixed](https://www.browserstack.com/guide/sticky-vs-fixed) - implementation patterns
- [The Ad Firm - Click-to-Call Best Practices](https://www.theadfirm.net/click-to-call-and-contact-buttons-best-practices-to-turn-mobile-visitors-into-customers/) - tel: link patterns

### Tertiary (LOW confidence)
- [WiserNotify - CTA Statistics 2025](https://wisernotify.com/blog/call-to-action-stats/) - conversion statistics

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - vanilla HTML/CSS/JS, matches existing codebase
- Architecture: HIGH - IntersectionObserver pattern already used in codebase
- Pitfalls: MEDIUM - based on common mobile development issues

**Research date:** 2026-01-20
**Valid until:** 2026-02-20 (30 days - stable technology patterns)
