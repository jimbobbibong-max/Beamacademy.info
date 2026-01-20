# Requirements: BEAM Academy Mobile Conversion Redesign

**Defined:** 2026-01-20
**Core Value:** Convert Google Ads mobile traffic into free trial bookings

## v1 Requirements

Requirements for mobile conversion optimization. Each maps to roadmap phases.

### Viewport & Rendering

- [x] **VIEW-01**: Page renders correctly on mobile without requiring zoom or pan
- [x] **VIEW-02**: Form inputs have minimum 16px font size (prevents iOS auto-zoom)
- [x] **VIEW-03**: No horizontal scroll on any mobile screen size (320px-428px)
- [x] **VIEW-04**: All interactive elements have minimum 44x44px touch targets

### CTA Placement

- [x] **CTA-01**: Primary "Book Free Trial" CTA visible in hero without scrolling
- [x] **CTA-02**: Sticky floating CTA bar visible on mobile during scroll
- [x] **CTA-03**: Click-to-call button prominently placed and functional

### Form Optimization

- [ ] **FORM-01**: Contact form reduced to 3-4 essential fields
- [ ] **FORM-02**: Form inputs use correct types (tel, email) for mobile keyboards
- [ ] **FORM-03**: Form submit button has large tap target and clear CTA text
- [ ] **FORM-04**: Form is reachable without excessive scrolling

### Content Structure

- [ ] **CONT-01**: Hero section communicates value proposition clearly on mobile
- [ ] **CONT-02**: Pricing section displays cleanly on mobile without horizontal scroll
- [ ] **CONT-03**: Trust signals (testimonials, ratings) visible near form
- [ ] **CONT-04**: Mobile navigation works smoothly (hamburger menu)

### Performance

- [ ] **PERF-01**: Images optimized for mobile (compressed, lazy loaded)
- [ ] **PERF-02**: Above-fold content loads quickly (LCP target under 2.5s)
- [ ] **PERF-03**: No render-blocking resources delay first paint

## v2 Requirements

Deferred to future. Not in current roadmap.

### Advanced Conversion

- **ADV-01**: Multi-step form wizard for additional data collection
- **ADV-02**: Personalized CTAs based on ad source/campaign
- **ADV-03**: A/B testing framework for conversion optimization
- **ADV-04**: Exit-intent popup for mobile (scroll up detection)

### Enhancements

- **ENH-01**: Google Reviews widget integration
- **ENH-02**: Video testimonial on landing page
- **ENH-03**: Live chat widget for instant questions
- **ENH-04**: SMS opt-in for follow-up

## Out of Scope

| Feature | Reason |
|---------|--------|
| Desktop redesign | Focus is mobile conversion; desktop works acceptably |
| New pages | Optimize existing landing page first |
| Backend changes | Netlify Forms works; frontend is the blocker |
| Framework migration | Keep vanilla HTML/CSS for simplicity |
| Content rewrite | Same copy, better mobile presentation |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| VIEW-01 | Phase 1 | Complete |
| VIEW-02 | Phase 1 | Complete |
| VIEW-03 | Phase 1 | Complete |
| VIEW-04 | Phase 1 | Complete |
| CTA-01 | Phase 2 | Complete |
| CTA-02 | Phase 2 | Complete |
| CTA-03 | Phase 2 | Complete |
| FORM-01 | Phase 3 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| CONT-01 | Phase 4 | Pending |
| CONT-02 | Phase 4 | Pending |
| CONT-03 | Phase 4 | Pending |
| CONT-04 | Phase 4 | Pending |
| PERF-01 | Phase 5 | Pending |
| PERF-02 | Phase 5 | Pending |
| PERF-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0 ✓

---
*Requirements defined: 2026-01-20*
*Last updated: 2026-01-20 after Phase 2 completion*
