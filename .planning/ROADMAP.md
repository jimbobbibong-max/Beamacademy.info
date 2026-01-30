# Roadmap: BEAM Academy Landing Page

## Milestones

- **v1 Mobile Conversion** — Phases 1-5 (shipped 2026-01-20) | [Archive](milestones/v1-ROADMAP.md)
- **v2 Messaging Overhaul** — Phases 6-11 (shipped 2026-01-23) | [Archive](milestones/v2-ROADMAP.md)
- **v3 Content Cleanup** — Phases 12-13 (shipped 2026-01-23) | [Archive](milestones/v3-ROADMAP.md)
- **v4 Courses Section Redesign** — Phases 14-16 (shipped 2026-01-24) | [Archive](milestones/v4-ROADMAP.md)
- **v5 Courses Section Overhaul** — Phases 17-18 (shipped 2026-01-24) | [Archive](milestones/v5-ROADMAP.md)
- **v6 Content Reduction & QA** — Phase 19 (shipped 2026-01-29) | [Archive](milestones/v6-ROADMAP.md)
- **v7 Comprehensive Frontend Redesign** — Phases 20-24 (shipped 2026-01-31)
- **v8 Google Ads Optimization** — Phase 25 (shipped 2026-01-31)
- **v9 Additional Pages** — Phase 26 (in progress)

---

## v7: Comprehensive Frontend Redesign (SHIPPED)

**Goal:** Apply Anthropic Frontend Design Skill + BEAM brand principles + best practices research to create a distinctive, non-generic landing page that converts.

### Synthesis Approach

| Layer | Source | Contribution |
|-------|--------|--------------|
| Frontend Design Skill | Anthropic official | Bold aesthetic, distinctive typography, intentional motion |
| BEAM Brand | Existing identity | Solid purple, pastel accents, hard colors (not gradients) |
| Best Practices | Research | Performance, conversion, accessibility, mobile-first |

---

### Phases

- [x] **Phase 20: Payment Fix** — Debug existing Stripe Checkout integration

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
**Plans:** 3 plans

Plans:
- [ ] 21-01-PLAN.md — Design tokens foundation (spacing, colors, shadows, radius, transitions)
- [ ] 21-02-PLAN.md — Typography system (Geist font, fluid type scale, base element styles)
- [ ] 21-03-PLAN.md — Visual differentiator (diagonal/angled section elements)

---

- [x] **Phase 21.1: Alternative Design System (Frontend Design Skill)**

**Goal:** Bold editorial design system with Fraunces + Bricolage Grotesque typography, tilted hero headline differentiator, purple glow CTAs.
**Approach:** Design Thinking first (editorial magazine aesthetic), then implementation
**Plans:** 4 plans in 3 waves (complete)

Plans:
- [x] 21.1-01-PLAN.md — CSS design tokens foundation (colors, spacing, shadows, borders, transitions)
- [x] 21.1-02-PLAN.md — Typography system (Fraunces + Bricolage, fluid scale, base styles)
- [x] 21.1-03-PLAN.md — Hero transformation (tilted headline, purple glow CTA, editorial layout)
- [x] 21.1-04-PLAN.md — Section updates (apply design system consistently throughout)

**User decision:** Lime accent rejected, purple with glow used instead

---

- [x] **Phase 22: Layout, Mobile & Conversion** — Intentional spatial composition + mobile optimization

**Goal:** Apply asymmetric/bold layouts where appropriate, ensure mobile excellence, optimize conversion elements
**Requirements:** VIS-04, MOB-01, MOB-02, MOB-03, MOB-04, CONV-01, CONV-02, CONV-03, CONV-04
**Plans:** 3 plans in 2 waves (complete)

Plans:
- [x] 22-01-PLAN.md — Asymmetric Trust section layout (staggered tutor cards)
- [x] 22-02-PLAN.md — Mobile optimization pass (tap targets, sticky CTA, contrast)
- [x] 22-03-PLAN.md — Conversion element enhancement (CTAs, trust signals, hierarchy)

---

- [x] **Phase 23: Visual Polish & Motion** — Frontend Design Skill enhancements

**Goal:** Apply Frontend Design Skill critique: bolder differentiators, visual texture, grid-breaking elements, motion
**Requirements:** MOT-01, MOT-02, MOT-03, MOT-04 + SKILL-CRITIQUE
**Plans:** 4 plans in 2 waves (complete)

**Frontend Design Skill Recommendations (from critique) — All Implemented:**
1. **Bolder tilt** — Hero rotation increased to -4deg (middle ground)
2. **Break purple monotony** — Gold #f59e0b accent on trust elements
3. **Break the grid** — Hero visual overflows container by -40px
4. **Dramatic CTA** — Brutalist offset shadow (4px 4px 0, no blur)
5. **Motion** — Page load animation, scroll reveals, hover states

Plans:
- [x] 23-01-PLAN.md — Visual differentiators (bolder tilt, grid-breaking, texture) [Wave 1]
- [x] 23-02-PLAN.md — CTA and accent color refinement [Wave 1]
- [x] 23-03-PLAN.md — Page load animation with staggered reveals [Wave 2]
- [x] 23-04-PLAN.md — Hover states and micro-interactions [Wave 2]

---

- [x] **Phase 24: Performance Verification & Final QA** — Ensure redesign didn't break anything

**Goal:** Verify LCP, CLS, accessibility, and overall quality
**Requirements:** PERF-01, PERF-02, PERF-03, PERF-04
**Plans:** 3 plans in 2 waves

Plans:
- [x] 24-01-PLAN.md — Lighthouse audit and performance verification [Wave 1]
- [x] 24-02-PLAN.md — Cross-browser and device testing [Wave 1]
- [x] 24-03-PLAN.md — Final accessibility and QA pass [Wave 2]

---

## v8: Google Ads Optimization (SHIPPED)

**Goal:** Implement Google Ads specialist (POP) recommendations for improved conversion tracking and landing page structure.

---

- [x] **Phase 25: Google Ads Website Optimization** — Implement POP recommendations

**Goal:** Apply Google Ads specialist recommendations to improve conversion tracking and landing page structure
**Source:** Google POP call (2026-01-30) with Rustie Villarisco
**Plans:** 4 plans in 3 waves (complete)

Website Changes Delivered:
1. **Click-to-call phone number** — Bottom sticky CTA with tracking (utility bar removed - too cluttered)
2. **"Calls from Website" conversion action** — Google Ads call tracking script configured
3. **Subject landing pages** — Mathematics, English, Physics, Chemistry for Sitelink Assets
4. **Cross-linking** — All pages linked via footer Subjects section

Plans:
- [x] 25-01-PLAN.md — Call tracking setup [Wave 1]
- [x] 25-02-PLAN.md — Mathematics and English landing pages [Wave 2]
- [x] 25-03-PLAN.md — Physics and Chemistry landing pages [Wave 2]
- [x] 25-04-PLAN.md — Polish, cross-linking, and verification [Wave 3]

**Deviation:** Utility bar at top removed after user feedback (cluttered with existing bottom sticky CTA). Call tracking moved to bottom bar.

---

## v9: Additional Pages

**Goal:** Audit site for additional pages needed, create with Anthropic Frontend Design Skill aesthetic while maintaining BEAM brand (purples, pastel purples).

---

- [ ] **Phase 26: Pages Audit & Creation** — Identify and build additional pages

**Goal:** Full audit of what additional pages the site needs, then create them using Frontend Design Skill with BEAM brand colors
**Approach:** Frontend Design Skill (bold, distinctive, editorial) + BEAM purples/pastels
**Plans:** TBD (requires discussion/planning)

Potential Pages:
- Team/About Us — Tutor profiles, credentials, trust-building
- Results/Testimonials — Dedicated success stories
- Location/Contact — Map, directions, parking
- Others TBD from audit

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
| 21 | v7 | Design System & Typography | Skipped (21.1 used) | - |
| 21.1 | v7 | Alt Design System (Skill-Driven) | Complete | 2026-01-30 |
| 22 | v7 | Layout, Mobile & Conversion | Complete | 2026-01-30 |
| 23 | v7 | Motion & Micro-interactions | Complete | 2026-01-30 |
| 24 | v7 | Performance & Final QA | Complete | 2026-01-31 |
| 25 | v8 | Google Ads Optimization | Complete | 2026-01-31 |
| 26 | v9 | Additional Pages | **In Progress** | - |

---

*Last updated: 2026-01-31 — v8 shipped, Phase 26 started*
