# Roadmap: BEAM Academy Mobile Conversion Redesign

## Overview

Transform the BEAM Academy tutoring website from a broken mobile experience (24 clicks, 0 conversions) into a conversion-optimized landing page. Starting with emergency viewport fixes to make the page viewable, then progressively adding above-fold CTAs, optimizing the form, restructuring content for mobile conversion flow, and finally optimizing performance. Each phase builds on the previous, delivering measurable improvements toward the 5-8% conversion target.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Emergency Viewport Fix** - Make page viewable on mobile without zoom/pan
- [x] **Phase 2: CTA Placement** - Get primary CTA visible above fold and always accessible
- [x] **Phase 3: Form Optimization** - Minimize friction on contact form
- [x] **Phase 4: Content Structure** - Reorder sections for mobile conversion flow
- [ ] **Phase 5: Performance** - Fast loading, no layout shift

## Phase Details

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

### Phase 5: Performance
**Goal**: Page loads fast and displays stable layout on mobile
**Depends on**: Phase 4
**Requirements**: PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. Images load lazily below the fold; above-fold images are optimized
  2. Largest Contentful Paint (LCP) is under 2.5 seconds on 4G
  3. Page does not flash or shift layout during load (CLS under 0.1)
**Plans**: 1 plan

Plans:
- [ ] 05-01-PLAN.md - Image dimension fixes and LCP optimization

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Emergency Viewport Fix | 1/1 | Complete | 2026-01-20 |
| 2. CTA Placement | 1/1 | Complete | 2026-01-20 |
| 3. Form Optimization | 1/1 | Complete | 2026-01-20 |
| 4. Content Structure | 2/2 | Complete | 2026-01-20 |
| 5. Performance | 0/1 | Planned | - |

---
*Roadmap created: 2026-01-20*
