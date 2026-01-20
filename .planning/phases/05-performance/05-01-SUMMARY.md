---
plan: 05-01
title: Image Dimension Fixes and LCP Optimization
phase: 05-performance
subsystem: performance
tags: [lcp, cls, images, preload, fetchpriority]

dependency_graph:
  requires: [04-content-structure]
  provides: [image-dimensions, lcp-optimization, preconnect-hints]
  affects: []

tech_stack:
  added: []
  patterns: [resource-hints, image-optimization]

key_files:
  created: []
  modified:
    - index.html

decisions:
  - id: PERF-IMG-001
    choice: "Use exact pixel dimensions from file inspection"
    why: "Browser needs accurate dimensions for aspect ratio calculation"

metrics:
  duration: "~5 minutes"
  completed: "2026-01-20"
---

# Phase 5 Plan 1: Image Dimension Fixes and LCP Optimization Summary

**One-liner:** Added width/height to all 8 images plus preload/fetchpriority for hero image and preconnect for GTM.

## What Was Built

### Task 1: Image Dimensions
Added explicit width and height attributes to all 8 images in index.html:

| Image | Width | Height | Location |
|-------|-------|--------|----------|
| logo-star.png | 854 | 788 | Nav, Footer |
| classroom-teaching.jpg | 800 | 533 | Hero (LCP) |
| classroom-students.jpg | 800 | 533 | About section |
| chris.jpg | 400 | 400 | Team section |
| nathan.jpg | 400 | 400 | Team section |
| taehoon.jpg | 400 | 400 | Team section |
| john.jpg | 400 | 400 | Team section |

**Commit:** `96a4c55`

### Task 2: Hero Image Optimization
- Added `<link rel="preload" as="image" href="images/classroom-teaching.jpg">` in head
- Added `fetchpriority="high"` to hero img tag

**Commit:** `a876f19`

### Task 3: Google Tag Manager Preconnect
- Added `<link rel="preconnect" href="https://www.googletagmanager.com">`
- Placed before font preconnects for priority

**Commit:** `9e3cae2`

## Verification Results

- [x] All 8 img elements have explicit width and height attributes
- [x] Hero image has `fetchpriority="high"` attribute
- [x] Preload hint exists for hero image in head section
- [x] Preconnect hint exists for googletagmanager.com
- [ ] Page visually loads without layout shift on mobile viewport (requires visual test)
- [ ] Lighthouse reports 0 render-blocking resources (requires Lighthouse audit)
- [ ] Lighthouse mobile LCP is under 2.5 seconds (requires Lighthouse audit)

## Deviations from Plan

None - plan executed exactly as written.

## Technical Notes

1. **logo-star.png is actually WebP**: The file header shows it's a WebP image with .png extension. Dimensions: 854x788 (from RIFF header).

2. **Image dimensions obtained via `file` command**: Used `file images/*.jpg logo-star.png` to extract dimensions from file metadata.

3. **CSS already handles responsive**: The site has `img { max-width: 100%; height: auto; }` so adding explicit dimensions won't break responsive behavior.

## Commits

| Hash | Description |
|------|-------------|
| 96a4c55 | perf(05-01): add width/height attributes to all images |
| a876f19 | perf(05-01): add preload and fetchpriority for hero image |
| 9e3cae2 | perf(05-01): add preconnect for Google Tag Manager |

## Next Phase Readiness

**Blockers:** None

**Recommendations:**
1. Run Lighthouse mobile audit to measure actual LCP and CLS scores
2. Visual test on mobile to confirm no layout shift
3. Consider converting logo-star.png to proper PNG or renaming to .webp for clarity (low priority)
