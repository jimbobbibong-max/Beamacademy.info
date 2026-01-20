---
status: gaps_found
phase: 05-performance
source: [05-01-SUMMARY.md, 05-02-SUMMARY.md]
started: 2026-01-20T18:10:00Z
updated: 2026-01-20T19:42:00Z
---

## Current Test

[re-testing after 05-02 async fonts fix]

## Tests

### 1. No Layout Shift During Image Load
expected: Hard refresh on mobile. Images load without causing content jumps — text/buttons below images don't shift position.
result: pass

### 2. Hero Image Loads Quickly
expected: On hard refresh, the hero image (classroom photo) appears promptly — not last or noticeably delayed compared to text.
result: pass

### 3. Lighthouse LCP Under 2.5s
expected: Run Lighthouse mobile audit (Chrome DevTools > Lighthouse > Mobile). LCP metric shows green (under 2.5 seconds).
result: issue
reported: "LCP is 3.2s after async fonts fix (was 3.1s). Main bottlenecks: Style & Layout 1,658ms, images not in modern formats (35 KiB savings), logo oversized (854x788 displayed at 72x66)."
severity: major

### 4. Lighthouse CLS Under 0.1
expected: In same Lighthouse audit, CLS (Cumulative Layout Shift) metric shows green (under 0.1).
result: pass
notes: "CLS is 0 - excellent"

### 5. No Render-Blocking Resources
expected: In Lighthouse audit "Opportunities" section, no "Eliminate render-blocking resources" warning appears (or shows 0 items).
result: pass
notes: "Async fonts fix resolved this - no render-blocking warning for Google Fonts"

### 6. No Console Errors
expected: Browser console shows no JavaScript errors.
result: issue
reported: "SyntaxError: Invalid or unexpected token at line 5801"
severity: minor

### 7. Accessibility - No focusable children in aria-hidden
expected: Elements with aria-hidden=true should not contain focusable elements.
result: issue
reported: "Sticky CTA bar has aria-hidden=true but contains focusable links (phone, button)"
severity: minor

## Summary

total: 7
passed: 4
issues: 3
pending: 0
skipped: 0

## Observations (Non-Blocking)

- Performance score improved to 85 (up from ~80)
- FCP is good at 1.7s
- Speed Index good at 1.7s
- Main thread work 3.2s (Style & Layout dominates at 1,658ms)
- Google Tag Manager uses 120.6 KiB with 41.7 KiB unused JS
- CSS not minified (7 KiB savings available)

## Gaps

- truth: "Lighthouse mobile LCP is under 2.5 seconds on simulated 4G"
  status: failed
  reason: "LCP still 3.2s after async fonts fix. Remaining bottlenecks: images not optimized (35 KiB savings from WebP/AVIF), logo file oversized (854x788 displayed at 72x66 = 12.1 KiB waste), Style & Layout 1,658ms."
  severity: major
  test: 3
  root_cause: "Images not in modern formats (JPEG/PNG), logo file massively oversized for display size"
  artifacts:
    - path: "images/classroom-students.jpg"
      issue: "JPEG not WebP - 22.6 KiB potential savings"
    - path: "logo-star.png"
      issue: "854x788 file displayed at 72x66 - 12.1 KiB waste"
  missing:
    - "WebP/AVIF image formats"
    - "Properly sized logo image"

- truth: "No JavaScript console errors"
  status: failed
  reason: "SyntaxError: Invalid or unexpected token at line 5801"
  severity: minor
  test: 6
  root_cause: "JavaScript syntax error somewhere near line 5801"
  artifacts:
    - path: "index.html:5801"
      issue: "Syntax error in inline script"
  missing:
    - "Fix JavaScript syntax error"

- truth: "No accessibility violations with aria-hidden"
  status: failed
  reason: "Sticky CTA bar has aria-hidden=true but contains focusable phone link and button"
  severity: minor
  test: 7
  root_cause: "aria-hidden applied to container with clickable children"
  artifacts:
    - path: "index.html sticky-cta-bar"
      issue: "Contains a.sticky-cta-phone and a.sticky-cta-button"
  missing:
    - "Remove aria-hidden or remove focusable elements from hidden container"
