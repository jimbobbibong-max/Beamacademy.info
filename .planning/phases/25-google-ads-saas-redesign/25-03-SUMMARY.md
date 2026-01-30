---
phase: 25-google-ads-saas-redesign
plan: 03
subsystem: frontend/landing-pages
tags: [google-ads, landing-pages, physics, chemistry, hsc, sitelinks]

requires:
  - 25-01 (utility bar and call tracking must exist)
provides:
  - Physics subject landing page
  - Chemistry subject landing page
  - Google Ads Sitelink Assets ready
affects:
  - 25-04: Polish phase may refine landing page styling

tech-stack:
  added: []
  patterns:
    - "Standalone subject landing pages"
    - "Shared design system from main site"
    - "Netlify form integration per subject"

key-files:
  created:
    - C:/Users/bskim/Downloads/physics.html (337 lines)
    - C:/Users/bskim/Downloads/chemistry.html (337 lines)
  modified: []

decisions:
  - id: years-11-12-only
    choice: "Science subjects show only Years 11-12 content"
    rationale: "BEAM Academy only offers Physics and Chemistry at senior level"
  - id: module-focused-content
    choice: "Display HSC Module numbers (Mod 5-8) prominently"
    rationale: "Students search by module; helps with ad relevance"
  - id: form-per-subject
    choice: "Separate Netlify forms (physics-trial, chemistry-trial)"
    rationale: "Track lead source by subject for Google Ads attribution"

metrics:
  duration: "5 minutes"
  completed: "2026-01-31"
---

# Phase 25 Plan 03: Physics + Chemistry Landing Pages Summary

**One-liner:** HSC-focused landing pages for Physics and Chemistry with module breakdowns, subject-specific testimonials, and shared design system.

## What Was Built

### Physics Landing Page (physics.html)
- **Hero**: "Make Physics Click" with tilted headline (-4deg)
- **Testimonial**: "The way they explained wave motion finally made sense. Went from 65% to 88%."
- **HSC Modules displayed**: Advanced Mechanics, Electromagnetism, Nature of Light, From the Universe to the Atom
- **Year 11 content**: Kinematics, Dynamics, Waves & Thermodynamics, Electricity & Magnetism
- **Approach section**: Visual explanations, problem-solving strategies, past HSC practice
- **Form**: physics-trial (Netlify form with subject=Physics hidden field)

### Chemistry Landing Page (chemistry.html)
- **Hero**: "Master the Science of Matter"
- **Testimonial**: "Finally understood stoichiometry! Jumped from struggling to top 10 in the cohort."
- **HSC Modules displayed**: Equilibrium & Acid Reactions, Acid/Base Reactions, Organic Chemistry, Applying Chemical Ideas
- **Year 11 content**: Properties of Matter, Quantitative Chemistry, Reactive Chemistry, Drivers of Reactions
- **Approach section**: Step-by-step problems, visual molecular models, HSC-style practice
- **Form**: chemistry-trial (Netlify form with subject=Chemistry hidden field)

### Shared Features (Both Pages)
- Utility bar with click-to-call (0491 791 447)
- Google Ads gtag with phone conversion tracking
- Same design system as main site (Fraunces + Bricolage fonts)
- Brutalist CTA buttons (4px offset shadow)
- Grain texture overlay
- Responsive design (mobile, tablet, desktop)
- Navigation links back to main site
- Footer with full contact details

## Verification Results

| Check | Physics | Chemistry |
|-------|---------|-----------|
| File exists | PASS (337 lines) | PASS (337 lines) |
| Utility bar present | PASS | PASS |
| Subject-specific headline | PASS | PASS |
| Years 11-12 only | PASS (no junior years) | PASS |
| Phone number visible | PASS | PASS |
| CTA links to #contact | PASS | PASS |
| Form has subject field | PASS | PASS |

## Files Created

| File | Location | Lines | Purpose |
|------|----------|-------|---------|
| physics.html | C:/Users/bskim/Downloads/ | 337 | Physics landing page |
| chemistry.html | C:/Users/bskim/Downloads/ | 337 | Chemistry landing page |

## Google Ads Sitelink Usage

After deployment, create Sitelinks in Google Ads:

| Sitelink Text | Final URL |
|---------------|-----------|
| HSC Physics Tutoring | beamacademy.info/physics.html |
| HSC Chemistry Tutoring | beamacademy.info/chemistry.html |

## Deviations from Plan

None - plan executed exactly as written.

## Next Phase Readiness

- **25-04 (Polish + Verification):** Ready to proceed
- All Wave 2 pages now complete (assuming 25-02 is also done)

---

*Completed: 2026-01-31*
