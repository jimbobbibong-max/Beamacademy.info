---
status: diagnosed
trigger: "Diagnose root cause of LCP performance issue for Phase 5 UAT. LCP is 3.1s, target is 2.5s. Google Fonts render-blocking (870ms)."
created: 2026-01-20T10:00:00Z
updated: 2026-01-20T10:05:00Z
symptoms_prefilled: true
goal: find_root_cause_only
---

## Current Focus

hypothesis: CONFIRMED - LCP delay caused by render-blocking Google Fonts stylesheet (no async loading)
test: Verified font loading method in index.html
expecting: Found standard blocking stylesheet link
next_action: Return root cause analysis

## Symptoms

expected: LCP should be under 2.5s
actual: LCP is 3.1s (600ms over target)
errors: Google Fonts render-blocking causing 870ms delay
reproduction: Load homepage, measure LCP with Lighthouse/DevTools
started: Phase 5 performance testing

## Eliminated

(none - root cause found on first hypothesis)

## Evidence

- timestamp: 2026-01-20T10:02:00Z
  checked: Hero image file (images/classroom-teaching.jpg)
  found: 48KB JPEG, 800x533 pixels, baseline encoding
  implication: Image is well-optimized (48KB is reasonable), has preload and fetchpriority="high" - NOT the primary issue

- timestamp: 2026-01-20T10:03:00Z
  checked: Google Fonts loading at index.html line 121
  found: Standard blocking stylesheet: <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&display=swap" rel="stylesheet">
  implication: This is a RENDER-BLOCKING request - browser waits for fonts before painting LCP element

- timestamp: 2026-01-20T10:03:30Z
  checked: Preconnect hints at lines 118-119
  found: preconnect for fonts.googleapis.com and fonts.gstatic.com present
  implication: Connection setup is optimized, but the stylesheet itself still blocks render

- timestamp: 2026-01-20T10:04:00Z
  checked: Hero image tag at line 4621
  found: <img src="images/classroom-teaching.jpg" ... loading="eager" width="800" height="533" fetchpriority="high">
  implication: Image loading is properly optimized with fetchpriority, eager loading, and dimensions

- timestamp: 2026-01-20T10:04:30Z
  checked: Fonts being loaded
  found: Loading 6 weights of Outfit (300-800) and 3 weights of Source Serif 4
  implication: Heavy font payload - 9 font variants total, possibly loading fonts not needed for above-fold content

## Resolution

root_cause: Google Fonts loaded via standard render-blocking stylesheet (line 121). The browser must download and parse the font CSS before it can render the LCP element (hero image). The 870ms font blocking time directly contributes to the 3.1s LCP. Additionally, loading 9 font variants (6 Outfit + 3 Source Serif) when fewer are needed above-fold adds unnecessary download time.

fix: (recommendations below - not applied per goal)
verification: (not performed - diagnosis only)
files_changed: []
