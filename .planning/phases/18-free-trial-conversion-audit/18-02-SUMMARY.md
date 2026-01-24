---
phase: 18-free-trial-conversion-audit
plan: 02
subsystem: conversion-optimization
tags: [CRO, CTA, hero-optimization, navigation, risk-reversal]
dependency-graph:
  requires: [18-01-audit]
  provides: [optimized-hero, strategic-ctas, simplified-navigation]
  affects: [conversion-rate, user-flow, 18-03-content-optimization]
tech-stack:
  added: []
  patterns: [section-cta-component, risk-reversal-messaging]
key-files:
  modified:
    - C:/Users/bskim/Downloads/beamacademy-index.html
decisions:
  - id: hero-headline
    choice: "Watch Their Grades Climb (outcome) over Tutoring That Adapts (feature)"
    rationale: "8-second rule - parents want results, not mechanism"
  - id: first-person-cta
    choice: "Get MY Free Diagnostic instead of Get Your"
    rationale: "Research shows +90% conversion with first-person copy"
  - id: parent-testimonial
    choice: "Parent quote (68% to 89%) over student quote"
    rationale: "Parents are decision-makers; address their concerns"
  - id: section-ctas
    choice: "Subtle link-style CTAs after Proof/Comparison/Trust sections"
    rationale: "Capture interest at peak moments without hard-sell disruption"
  - id: student-portal-footer
    choice: "Move Student Portal to footer only"
    rationale: "External links create conversion leaks; keep accessible but not prominent"
metrics:
  duration: 9m
  completed: 2026-01-24
---

# Phase 18 Plan 02: Quick CTA Wins Summary

**One-liner:** Implemented outcome-focused hero with risk reversal, added 3 strategic section CTAs, and simplified navigation

## What Was Built

Implemented Group 1 (Quick CTA Wins) from the conversion audit, targeting high-impact/low-effort improvements:

### Task 1: Hero Section Optimization

**Before:**
- Headline: "Tutoring That Adapts to Their Weak Spots" (feature-focused)
- CTA: "Get Your Free Diagnostic" (second-person)
- Testimonial: Luke K, Year 8 (student)
- No risk reversal text above fold

**After:**
- Headline: "Watch Their Grades Climb" (outcome-focused)
- CTA: "Get My Free Diagnostic" (first-person, +90% research impact)
- Testimonial: "His Maths improved from 68% to 89%" - Parent, BHHS Year 11 (decision-maker)
- Risk reversal: "Free lesson. No payment required. Keep the diagnostic either way."

### Task 2: Strategic CTA Placement

Added 3 section CTAs at natural decision points:

| Location | CTA Copy | Risk Reversal |
|----------|----------|---------------|
| After Proof | "Get Your 4 Documents Free" | "Free lesson. Keep the documents either way." |
| After Comparison | "Experience the Difference" | "Try a free lesson. No strings attached." |
| After Trust | "Meet Our Tutors in a Free Lesson" | "No payment required. No obligation." |

Created `.section-cta` component with subtle link-style design that doesn't disrupt reading flow.

### Task 3: Navigation Simplification

**Before:** About, Courses & Pricing, FAQ, Student Portal, Pay Now, Free Diagnostic
**After:** About, Courses & Pricing, FAQ, Pay Now, Free Diagnostic

- Removed Student Portal from main nav (external link created conversion leak)
- Removed Student Portal from mobile nav
- Student Portal remains accessible in footer for existing students
- Primary CTA (Free Diagnostic) is now more prominent

## Commits

| Hash | Description |
|------|-------------|
| 1c9b152 | feat(18-02): optimize hero section for conversion |
| 192e688 | feat(18-02): add strategic CTAs at decision points |
| 08d10ba | feat(18-02): simplify navigation to reduce conversion leaks |

## Verification Results

| Criteria | Status |
|----------|--------|
| Hero has outcome-focused headline | PASS |
| Risk reversal visible near hero CTA | PASS |
| CTAs exist after Proof section | PASS |
| CTAs exist after Comparison section | PASS |
| CTAs exist after Trust section | PASS |
| Navigation simplified or hierarchy clarified | PASS |
| Mobile navigation also updated | PASS |
| Page still functions correctly | PASS |

## Deviations from Plan

None - plan executed exactly as written.

## Research Basis

All changes aligned with 18-AUDIT.md and 18-RESEARCH.md findings:

| Change | Research Support |
|--------|-----------------|
| Outcome headline | 8-second rule; "what's in it for me" |
| Risk reversal | +32% conversions with trust signals near CTA |
| Section CTAs | CTAs at decision points capture peak interest |
| Nav simplification | External link removal = +100% (VWO study) |
| First-person CTA | +90% conversion with first-person copy |

## Expected Impact

Based on research benchmarks:
- **Hero optimization:** 10-15% improvement potential
- **Section CTAs:** 5-10% improvement potential
- **Navigation simplification:** 5-10% improvement potential

**Combined expected lift:** 15-25%

## Files Modified

1. `C:/Users/bskim/Downloads/beamacademy-index.html`
   - Hero section content
   - Added `.hero-risk-reversal` CSS
   - Added `.section-cta` component CSS
   - Added 3 section CTAs in HTML
   - Removed Student Portal from nav

## Next Phase Readiness

Phase 18 Plan 03 (Content Optimization) can proceed. This plan addressed:
- [F1] CTA after Proof section - COMPLETE
- [F2] Hero risk reversal - COMPLETE
- [F3] External nav link - COMPLETE
- [F4] Outcome-focused headline - COMPLETE
- [F5] Parent testimonial - COMPLETE
- [F8] CTA after Comparison - COMPLETE

Remaining from audit for 18-03:
- Content length optimization
- Testimonial repositioning near form

---

*Completed: 2026-01-24*
*Duration: 9 minutes*
*Tasks: 3/3*
