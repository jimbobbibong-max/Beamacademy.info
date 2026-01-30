---
phase: 27
plan: 01
subsystem: content
tags: [about, tutors, data, profiles]
dependency-graph:
  requires: [26-01]
  provides: [real-tutor-data]
  affects: []
tech-stack:
  added: []
  patterns: []
key-files:
  created: []
  modified: [about.html]
decisions: []
metrics:
  duration: 2 minutes
  completed: 2026-01-31
---

# Phase 27 Plan 01: Update About Page with Real Tutor Data Summary

**One-liner:** Replace placeholder tutor cards with 5 real tutors from homepage data

## Completed Tasks

| Task | Description | Status |
|------|-------------|--------|
| 1 | Replace placeholder tutor cards with real data | DONE |
| 2 | Update hero section gold badge | DONE |
| 3 | Verify and commit | DONE |

## What Was Built

### Real Tutor Data (5 tutors)

1. **Chris Kim** - Head of Mathematics & Physics
   - BHHS Graduate | 97 Maths Ext1 | Medicine @ Newcastle
   - 93 Maths Ext2, 95 Physics, 98th %ile UCAT

2. **Nathan You** - Tutor
   - BHHS Graduate | 95 Maths Ext1 | Medicine @ Newcastle
   - 95 Maths Ext2, 99th %ile UCAT

3. **John Park** - Tutor
   - BHHS Graduate | 95 English Adv | Medicine @ UNSW
   - 96 Maths Ext1, 96 Maths Ext2

4. **Taehoon Kim** - Tutor & Head Admin
   - BHHS Graduate | 95 Maths Ext1 | Optometry @ UNSW
   - 1540 SAT, 4 years experience

5. **Sowon Lee** - Head of English
   - BHHS Graduate | 96 English Adv | Law @ UNSW
   - 3rd in Baulko English, 20+ students mentored

### Hero Badge Update

Changed from: "All tutors achieved 95%+ in HSC Mathematics"
To: "All tutors achieved 95%+ in their HSC subjects"

(More accurate since includes English tutors)

## Deviations from Plan

None - plan executed exactly as written.

## Commits

| Hash | Message |
|------|---------|
| aea6507 | feat(27-01): replace placeholder tutors with real tutor data |

## Verification

- [x] 5 real tutor cards with correct data
- [x] Photos reference existing images (images/chris.jpg, etc.)
- [x] Trifecta badges show school, HSC score, university
- [x] Credentials list matches homepage
- [x] Hero badge updated
- [x] Committed with atomic commit
- [x] Copied to Downloads for preview

## Next Steps

Phase 27 complete (single plan). Ready for verification.
