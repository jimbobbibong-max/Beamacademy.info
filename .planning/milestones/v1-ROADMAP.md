# Milestone v1: Mobile Conversion Redesign

**Status:** SHIPPED 2026-01-20
**Phases:** 1-5
**Total Plans:** 9

## Overview

Transform the BEAM Academy tutoring website from a broken mobile experience (24 clicks, 0 conversions) into a conversion-optimized landing page. Starting with emergency viewport fixes to make the page viewable, then progressively adding above-fold CTAs, optimizing the form, restructuring content for mobile conversion flow, and finally optimizing performance. Each phase builds on the previous, delivering measurable improvements toward the 5-8% conversion target.

## Phases

### Phase 1: Emergency Viewport Fix

**Goal**: Mobile users can view and interact with the page without zooming or panning
**Depends on**: Nothing (first phase)
**Requirements**: VIEW-01, VIEW-02, VIEW-03, VIEW-04
**Success Criteria** (what must be TRUE):
  1. User can read all text on iPhone without pinching to zoom
  2. User can tap form inputs without page auto-zooming (16px minimum font)
  3. Page has no horizontal scroll on any screen 320px-428px wide
  4. All buttons and links are easily tappable (44x44px minimum touch targets)
**Plans**: 1 plan

Plans:
- [x] 01-01-PLAN.md - Viewport meta and base CSS reset

**Completed:** 2026-01-20

### Phase 2: CTA Placement

**Goal**: Primary conversion action is always visible and accessible on mobile
**Depends on**: Phase 1
**Requirements**: CTA-01, CTA-02, CTA-03
**Success Criteria** (what must be TRUE):
  1. User sees "Book Free Trial" button immediately on page load (no scroll)
  2. User sees sticky CTA bar after scrolling past hero section
  3. User can tap phone number to call directly from any point on page
**Plans**: 1 plan

Plans:
- [x] 02-01-PLAN.md - Hero CTA optimization and sticky bottom CTA bar

**Completed:** 2026-01-20

### Phase 3: Form Optimization

**Goal**: Contact form completion requires minimal effort
**Depends on**: Phase 2
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04
**Success Criteria** (what must be TRUE):
  1. Form has maximum 4 fields (Name, Phone, Email optional, Year Level optional)
  2. Phone keyboard appears when tapping phone field; email keyboard for email
  3. Submit button is large, visible, and says "Book Your Free Trial"
  4. Form is reachable within 2-3 scroll gestures from page load
**Plans**: 1 plan

Plans:
- [x] 03-01-PLAN.md - Form field reduction and input optimization

**Completed:** 2026-01-20

### Phase 4: Content Structure

**Goal**: Page sections flow in optimal order for mobile conversion
**Depends on**: Phase 3
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. Hero section communicates "tutoring for Years 7-12" value prop clearly
  2. Pricing section displays without horizontal scroll on 320px screens
  3. At least one testimonial is visible near/before the form
  4. Mobile hamburger menu works smoothly (tap to open, tap to close)
**Plans**: 2 plans

Plans:
- [x] 04-01-PLAN.md - Hero content update and inline testimonial
- [x] 04-02-PLAN.md - Hamburger menu animation and pricing responsive fixes

**Completed:** 2026-01-20

### Phase 5: Performance

**Goal**: Page loads fast and displays stable layout on mobile
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. Images load lazily below the fold; above-fold images are optimized
  2. Largest Contentful Paint (LCP) is under 2.5 seconds on 4G
  3. Page does not flash or shift layout during load (CLS under 0.1)
**Plans**: 4 plans

Plans:
- [x] 05-01-PLAN.md - Image dimension fixes and LCP optimization
- [x] 05-02-PLAN.md - Async Google Fonts loading
- [x] 05-03-PLAN.md - JS syntax and accessibility fixes (gap closure)
- [x] 05-04-PLAN.md - Logo image optimization (gap closure)

**Completed:** 2026-01-20

---

## Milestone Summary

**Key Decisions:**

- CSS-001: Added text-size-adjust to existing html rule (cleaner than duplicate)
- CSS-002: Generic selectors for touch targets (covers future additions)
- CTA-JS-001: Use JS for floating button repositioning (CSS sibling selector won't work)
- FORM-JS-001: Remove studentName from payment JS validation
- MENU-CSS-001: Use visibility + opacity + transform for animations
- MENU-JS-001: Outside click and Escape key handlers for menu close
- CONTENT-001: Used Luke K's quote over Kane's (more specific and relatable)
- CONTENT-002: Location in description, not headline (keeps headline focused)
- PERF-IMG-001: Use exact pixel dimensions from file inspection
- PERF-FONT-001: Use preload+onload pattern for async font loading
- LOGO-LAZY-001: Use lazy loading for logo despite header visibility
- INERT-001: Use inert attribute instead of aria-hidden for sticky bar

**Issues Resolved:**

- Mobile viewport broken (zoom/pan required) → Fixed with overflow-x hidden, touch targets
- No CTA visible above fold → Added hero button + sticky bar
- Form had 10 fields → Reduced to 4 essential fields
- Content didn't communicate value prop → Updated hero headline + testimonial
- LCP was 3.2s → Optimized to 0.9s
- JavaScript syntax error → Fixed escaped backslash
- Accessibility violation (aria-hidden) → Fixed with inert attribute

**Issues Deferred:**

- Skip to main content button positioning (cosmetic)
- Form scroll anchor positioning refinement (UX polish)
- WebP image conversion (requires build tools)
- CSS minification (requires build tools)

**Technical Debt Incurred:**

- Some course-icons have aria-hidden with focusable children
- Some contrast issues flagged by Lighthouse
- Links without discernible names flagged by Lighthouse

---

**Final Metrics:**

- LCP: 0.9s (target <2.5s) ✓
- CLS: 0.014 (target <0.1) ✓
- Performance Score: 88/100
- Accessibility Score: 88/100
- SEO Score: 100/100

---

*For current project status, see .planning/ROADMAP.md*
*Archived: 2026-01-20*
