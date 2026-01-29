# Requirements: BEAM Academy v7 Comprehensive Frontend Redesign

**Defined:** 2026-01-29
**Core Value:** Distinctive, non-generic frontend that converts parents to free trial signups

## Synthesis Approach

v7 combines three layers:
1. **Anthropic Frontend Design Skill** — Bold aesthetic, distinctive typography, intentional motion
2. **BEAM Brand Principles** — Solid purple (#7c3aed), pastel accents, consistent hard colors
3. **Best Practices Research** — Performance, conversion, accessibility, mobile-first

---

## v7 Requirements

### Payment Fix (Debug Existing)

- [ ] **PAY-01**: Verify `STRIPE_SECRET_KEY` configured in Netlify environment
- [ ] **PAY-02**: Test Stripe Checkout function returns valid session
- [ ] **PAY-03**: Pay Now button triggers checkout flow successfully
- [ ] **PAY-04**: Complete test mode purchase end-to-end

### Frontend Design Skill — Typography

- [ ] **TYP-01**: Replace generic fonts with distinctive, characterful typeface choices
- [ ] **TYP-02**: Pair display font (headings) with refined body font
- [ ] **TYP-03**: Implement fluid type scale using clamp() for responsive sizing
- [ ] **TYP-04**: Ensure readability for parent audience (40-55 age range)

### Frontend Design Skill — Visual Identity

- [ ] **VIS-01**: Commit to bold aesthetic direction (not safe/generic)
- [ ] **VIS-02**: Use BEAM solid purple as dominant with sharp accents (not gradients)
- [ ] **VIS-03**: Define ONE memorable visual differentiator for the page
- [ ] **VIS-04**: Apply intentional spatial composition (asymmetry, overlap, or grid-breaking where appropriate)

### Frontend Design Skill — Motion & Polish

- [ ] **MOT-01**: Implement one well-orchestrated page load animation with staggered reveals
- [ ] **MOT-02**: Add high-impact hover states on interactive elements
- [ ] **MOT-03**: CSS-only animations (no JS animation libraries)
- [ ] **MOT-04**: Animation timing 150-300ms with appropriate easing

### Design System Foundation

- [ ] **DES-01**: CSS custom properties for spacing scale (8, 16, 24, 32, 48, 64, 96px)
- [ ] **DES-02**: CSS custom properties for color palette (purple, accents, neutrals)
- [ ] **DES-03**: CSS custom properties for shadow scale (sm, md, lg, xl)
- [ ] **DES-04**: CSS custom properties for typography scale

### Mobile & Accessibility

- [ ] **MOB-01**: All tap targets ≥44x44px
- [ ] **MOB-02**: Mobile sticky CTA persists on scroll
- [ ] **MOB-03**: Touch-friendly form with proper input types
- [ ] **MOB-04**: Color contrast ratio ≥4.5:1 on all text

### Performance Guard Rails

- [ ] **PERF-01**: LCP stays ≤1.0s (currently 0.9s)
- [ ] **PERF-02**: CLS stays ≤0.1 (currently 0.014)
- [ ] **PERF-03**: No render-blocking resources added
- [ ] **PERF-04**: All animations use transform/opacity only (no layout thrashing)

### Conversion & Trust

- [ ] **CONV-01**: Single primary CTA pattern maintained ("Get Your Free Diagnostic")
- [ ] **CONV-02**: Trust signals prominent (tutor credentials, testimonials)
- [ ] **CONV-03**: Specific stats displayed (not generic claims)
- [ ] **CONV-04**: Clear visual hierarchy guiding to CTA

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| New pages | Focus on landing page redesign |
| Backend changes | Frontend-only milestone |
| Framework migration | Keep vanilla HTML/CSS/JS |
| Full rebrand | Keep BEAM purple identity |
| Glassmorphism/neumorphism | Skill advises against trendy effects that age poorly |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PAY-01 | Phase 20 | Pending |
| PAY-02 | Phase 20 | Pending |
| PAY-03 | Phase 20 | Pending |
| PAY-04 | Phase 20 | Pending |
| TYP-01 | Phase 21 | Pending |
| TYP-02 | Phase 21 | Pending |
| TYP-03 | Phase 21 | Pending |
| TYP-04 | Phase 21 | Pending |
| VIS-01 | Phase 21 | Pending |
| VIS-02 | Phase 21 | Pending |
| VIS-03 | Phase 21 | Pending |
| VIS-04 | Phase 22 | Pending |
| MOT-01 | Phase 23 | Pending |
| MOT-02 | Phase 23 | Pending |
| MOT-03 | Phase 23 | Pending |
| MOT-04 | Phase 23 | Pending |
| DES-01 | Phase 21 | Pending |
| DES-02 | Phase 21 | Pending |
| DES-03 | Phase 21 | Pending |
| DES-04 | Phase 21 | Pending |
| MOB-01 | Phase 22 | Pending |
| MOB-02 | Phase 22 | Pending |
| MOB-03 | Phase 22 | Pending |
| MOB-04 | Phase 22 | Pending |
| PERF-01 | Phase 24 | Pending |
| PERF-02 | Phase 24 | Pending |
| PERF-03 | Phase 24 | Pending |
| PERF-04 | Phase 24 | Pending |
| CONV-01 | Phase 22 | Pending |
| CONV-02 | Phase 22 | Pending |
| CONV-03 | Phase 22 | Pending |
| CONV-04 | Phase 22 | Pending |

**Coverage:**
- v7 requirements: 32 total
- Mapped to phases: 32
- Unmapped: 0 ✓

---
*Requirements defined: 2026-01-29*
