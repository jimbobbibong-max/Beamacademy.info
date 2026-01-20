---
phase: 05-performance
plan: 02
subsystem: performance
tags: [fonts, async-loading, render-blocking, LCP]
gap_closure: true

dependency-graph:
  requires: [05-01]
  provides: [async-google-fonts, non-blocking-render]
  affects: []

tech-stack:
  added: []
  patterns: [preload-onload-pattern, noscript-fallback]

key-files:
  created: []
  modified: [index.html]

decisions:
  - id: PERF-FONT-001
    choice: preload+onload pattern over media="print" trick
    reason: More explicit, better browser support, cleaner semantics

metrics:
  duration: ~3 minutes
  completed: 2026-01-20
---

# Phase 5 Plan 02: Async Google Fonts Loading Summary

**One-liner:** Converted Google Fonts from render-blocking to async loading using preload+onload pattern

## What Was Built

Eliminated render-blocking Google Fonts CSS by implementing async loading pattern:

### Implementation Details

**Before (line 121):**
```html
<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">
```

**After (lines 121-122):**
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?..." as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?..."></noscript>
```

### How It Works

1. `rel="preload" as="style"` - Browser fetches CSS without blocking render
2. `onload="this.onload=null;this.rel='stylesheet'"` - Activates stylesheet when loaded
3. `this.onload=null` - Prevents onload firing twice in some browsers
4. `<noscript>` fallback - Users without JS still get fonts

### Preserved

- Existing preconnect hints at lines 118-119 (connection warmup)
- `display=swap` in URL (ensures text visible during font load)

## Verification Results

| Check | Result |
|-------|--------|
| Blocking font stylesheet outside noscript | None found (PASS) |
| Async preload pattern present | Line 121 (PASS) |
| Noscript fallback present | Line 122 (PASS) |
| Preconnect hints unchanged | Lines 118-119 (PASS) |

## Files Modified

| File | Change |
|------|--------|
| index.html | Replaced blocking font stylesheet with async pattern |

## Commits

| Hash | Message |
|------|---------|
| f3ea6a3 | perf(05-02): convert Google Fonts to async loading |

## Deviations from Plan

None - plan executed exactly as written.

## Expected Impact

- **LCP improvement:** Font CSS no longer blocks render, allowing paint earlier
- **Lighthouse:** "Eliminate render-blocking resources" should show 0 for fonts
- **User experience:** May see brief FOUT (Flash of Unstyled Text) - this is expected and correct
- **Accessibility:** noscript fallback ensures fonts work without JavaScript

## Next Steps

Run Lighthouse audit to confirm:
1. LCP under 2.5s target
2. No render-blocking resources warning
3. Font loading works correctly (brief FOUT acceptable)
