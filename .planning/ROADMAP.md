# Roadmap: BEAM Academy Landing Page

## Milestones

- **v1 Mobile Conversion** — Phases 1-5 (shipped 2026-01-20) | [Archive](milestones/v1-ROADMAP.md)
- **v2 Messaging Overhaul** — Phases 6-11 (shipped 2026-01-23) | [Archive](milestones/v2-ROADMAP.md)
- **v3 Content Cleanup** — Phases 12-13 (shipped 2026-01-23) | [Archive](milestones/v3-ROADMAP.md)
- **v4 Courses Section Redesign** — Phases 14-16 (shipped 2026-01-24) | [Archive](milestones/v4-ROADMAP.md)
- **v5 Courses Section Overhaul** — Phases 17-18 (shipped 2026-01-24) | [Archive](milestones/v5-ROADMAP.md)
- **v6 Content Reduction & QA** — Phase 19 (shipped 2026-01-29) | [Archive](milestones/v6-ROADMAP.md)
- **v7 Comprehensive Frontend Redesign** — Phases 20-24 (in progress)

---

## v7: Comprehensive Frontend Redesign

**Goal:** Apply Anthropic Frontend Design Skill + BEAM brand principles + best practices research to create a distinctive, non-generic landing page that converts.

### Synthesis Approach

| Layer | Source | Contribution |
|-------|--------|--------------|
| Frontend Design Skill | Anthropic official | Bold aesthetic, distinctive typography, intentional motion |
| BEAM Brand | Existing identity | Solid purple, pastel accents, hard colors (not gradients) |
| Best Practices | Research | Performance, conversion, accessibility, mobile-first |

---

### Phases

- [x] **Phase 20: Payment Fix** — Debug existing Stripe Checkout integration ✓

**Goal:** Fix "Pay Now" button — Stripe already exists in codebase, just needs debugging
**Requirements:** PAY-01, PAY-02, PAY-03, PAY-04
**Plans:** 2 plans (complete)

Plans:
- [x] 20-01-PLAN.md — Verify Netlify env vars and test Stripe function endpoint
- [x] 20-02-PLAN.md — Connect frontend Pay Now button to checkout flow

---

- [ ] **Phase 21: Design System & Typography Foundation** — Establish distinctive visual foundation

**Goal:** Apply Frontend Design Skill typography principles + create CSS design tokens
**Requirements:** TYP-01, TYP-02, TYP-03, TYP-04, DES-01, DES-02, DES-03, DES-04, VIS-01, VIS-02, VIS-03

**Plans:**
- 21-01: Research and select distinctive font pairing (not Inter/Roboto/Arial)
- 21-02: Implement CSS custom properties for spacing, colors, shadows, typography
- 21-03: Apply new typography across all sections
- 21-04: Define and implement ONE memorable visual differentiator

---

- [ ] **Phase 22: Layout, Mobile & Conversion** — Intentional spatial composition + mobile optimization

**Goal:** Apply asymmetric/bold layouts where appropriate, ensure mobile excellence, optimize conversion elements
**Requirements:** VIS-04, MOB-01, MOB-02, MOB-03, MOB-04, CONV-01, CONV-02, CONV-03, CONV-04

**Plans:**
- 22-01: Audit and refine section layouts for intentional composition
- 22-02: Mobile optimization pass (tap targets, sticky CTA, forms)
- 22-03: Trust signal and conversion element enhancement

---

- [ ] **Phase 23: Motion & Micro-interactions** — High-impact animation moments

**Goal:** Implement one well-orchestrated page load + hover states
**Requirements:** MOT-01, MOT-02, MOT-03, MOT-04

**Plans:**
- 23-01: Design and implement page load animation with staggered reveals
- 23-02: Add hover states and micro-interactions to interactive elements

---

- [ ] **Phase 24: Performance Verification & Final QA** — Ensure redesign didn't break anything

**Goal:** Verify LCP, CLS, accessibility, and overall quality
**Requirements:** PERF-01, PERF-02, PERF-03, PERF-04

**Plans:**
- 24-01: Lighthouse audit and performance verification
- 24-02: Cross-browser and device testing
- 24-03: Final accessibility and QA pass

---

## Progress

| Phase | Milestone | Goal | Status | Completed |
|-------|-----------|------|--------|-----------|
| 1-5 | v1 | Mobile Conversion | Complete | 2026-01-20 |
| 6-11 | v2 | Messaging Overhaul | Complete | 2026-01-23 |
| 12-13 | v3 | Content Cleanup | Complete | 2026-01-23 |
| 14-16 | v4 | Courses Redesign | Complete | 2026-01-24 |
| 17-18 | v5 | Courses Overhaul | Complete | 2026-01-24 |
| 19 | v6 | Content Reduction & QA | Complete | 2026-01-29 |
| 20 | v7 | Payment Fix | Complete | 2026-01-29 |
| 21 | v7 | Design System & Typography | Pending | - |
| 22 | v7 | Layout, Mobile & Conversion | Pending | - |
| 23 | v7 | Motion & Micro-interactions | Pending | - |
| 24 | v7 | Performance & Final QA | Pending | - |

---

*Last updated: 2026-01-29 — Phase 20 complete*
