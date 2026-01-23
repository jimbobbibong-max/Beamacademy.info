# Milestone v2: Messaging Overhaul

**Status:** SHIPPED 2026-01-23
**Phases:** 6-11
**Total Plans:** 9

## Overview

Rewrite the landing page so visitors understand BEAM's differentiator (custom materials based on score tracking) within 3 seconds — without reading every word.

**Core insight:** The differentiator is invisible. Show, don't tell. Portal screenshots and document previews communicate value faster than any headline.

## Phases

### Phase 6: Hero Overhaul

**Goal:** Visitors immediately understand what BEAM is (HSC tutoring) and why it's different (custom materials based on tracking).

**Dependencies:** None (starting point)

**Plans:** 2 plans

Plans:
- [x] 06-01-PLAN.md — Hero text content (category label, headline, subheadline, single CTA)
- [x] 06-02-PLAN.md — Hero visual (portal mockup with score tracking)

**Requirements:**
- HERO-01: Headline communicates category + differentiator
- HERO-02: Portal screenshot visible showing score tracking
- HERO-03: Category label clearly visible without scrolling
- HERO-04: Single primary CTA
- HERO-05: Subheadline explains hook in plain English

---

### Phase 7: Proof Section

**Goal:** Parents see concrete evidence of what they get from ONE free trial.

**Dependencies:** Phase 6 (hero establishes context)

**Plans:** 1 plan

Plans:
- [x] 07-01-PLAN.md — Proof section with 4 document mockups, "Yours to Keep" messaging, topic gap insight

**Requirements:**
- PROOF-01: 4 documents from ONE trial visualized
- PROOF-02: "Yours to keep" messaging prominently displayed
- PROOF-03: Documents shown with visual previews
- PROOF-04: Topic gap insight shown (specific topics, not just overall score)

---

### Phase 8: Comparison Section

**Goal:** Crystallize the difference between generic tutoring and BEAM.

**Dependencies:** Phase 7 (proof provides context for comparison)

**Plans:** 1 plan

Plans:
- [x] 08-01-PLAN.md — Comparison table (desktop) and cards (mobile) with 5 specific contrasts

**Requirements:**
- COMP-01: Generic vs BEAM side-by-side comparison table
- COMP-02: Specific contrasts shown

---

### Phase 9: Trust Section

**Goal:** Build credibility through tutor profiles and social proof.

**Dependencies:** Phase 8 (comparison sets up "why trust this?" question)

**Plans:** 1 plan

Plans:
- [x] 09-01-PLAN.md — Tutor profiles with trifecta badges + parent testimonial

**Requirements:**
- TRUST-01: Tutor profiles with real photos
- TRUST-02: Credibility combo per tutor (Baulko + 95+ HSC + Med)
- TRUST-03: Parent testimonials with specific outcomes
- TRUST-04: Small group size (6-8 max) prominently visible
- TRUST-05: School-specific matching mentioned

---

### Phase 10: Support Section

**Goal:** Differentiate BEAM with 24/7 Discord support between classes.

**Dependencies:** Phase 9 (trust established, now show ongoing support)

**Plans:** 1 plan

Plans:
- [x] 10-01-PLAN.md — Discord mockup with 24/7 support callout and availability framing

**Requirements:**
- SUPP-01: Discord 24/7 support callout section
- SUPP-02: "Stuck at 9pm? Get help by 10am." framing
- SUPP-03: Discord screenshot showing real exchange

---

### Phase 11: CTA & Mobile Polish

**Goal:** Optimize final conversion path and ensure all new content works on mobile.

**Dependencies:** Phases 6-10 (all content exists to test)

**Plans:** 3 plans

Plans:
- [x] 11-01-PLAN.md — Outcome-focused CTA copy
- [x] 11-02-PLAN.md — Mobile CSS polish (superseded by 11-03)
- [x] 11-03-GAP-CLOSURE-PLAN.md — Re-apply Phases 9-11 with CSS verification

**Requirements:**
- CTA-01: Outcome-focused CTA copy
- CTA-02: Form fields remain optimized (3-4 fields)
- MOB-01: All new sections render correctly on mobile
- MOB-02: Images optimized for mobile loading
- MOB-03: Sticky CTA bar still functional

---

## Milestone Summary

**Key Decisions:**

| Decision | Rationale |
|----------|-----------|
| "Custom materials" as hook | Score tracking is HOW, personalization is VALUE |
| Show don't tell | Visual comprehension 60,000x faster than text |
| 4 documents from ONE trial | Concrete proof beats abstract claims |
| Comparison table | Crystallizes difference in single scan |
| Parent-outcome headline | "Where they're struggling" speaks to parent concerns |
| Badge-style category label | Visual prominence for "HSC Tutoring" identification |
| CSS mockups for documents | Preserves LCP performance (no image loads) |
| Pure CSS Discord mockup | Faster loads than screenshot, no privacy concerns |
| 33-min response time proof | Specific timestamps beat vague claims |
| Nav CTA shortened to "Free Diagnostic" | Full text caused button overflow |

**Issues Resolved:**

- CSS corruption from parallel execution (gap closure plan fixed)
- Navigation button overflow (shortened CTA text)
- Tutor cards tablet layout issues (switched to flexbox)

**Issues Deferred:**

- Nav doesn't link to v2 sections (design decision - acceptable)
- CTA section copy could be more outcome-focused (polish item)
- Q4 in diagnostic worksheet replacement (cosmetic)

**Technical Debt Incurred:**

- v1 accessibility issues carried forward (aria-hidden, contrast, links)

---

*For current project status, see .planning/ROADMAP.md*
