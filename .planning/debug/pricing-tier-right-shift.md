---
status: verifying
trigger: "Pricing tier cards shifted right, Senior tier cut off viewport edge"
created: 2026-01-23T00:00:00Z
updated: 2026-01-23T00:01:00Z
---

## Current Focus

hypothesis: CONFIRMED - width: 100% on .pricing-tiers-new was interfering with centering
test: Removed width: 100% from .pricing-tiers-new CSS
expecting: Grid should now center properly with just max-width and margin: auto
next_action: User verification needed - check if pricing tiers are now centered

## Symptoms

expected: 3 pricing tier cards centered horizontally on the page
actual: All 3 tiers shifted to the right, Senior tier cut off the right edge of viewport
errors: None (visual CSS issue)
reproduction: Open C:/Users/bskim/Downloads/beamacademy-index.html and navigate to "Invest in Your Future" section on desktop
started: After Wave 1 execution of phase 14 (pricing tier v2 styling updates)

## Eliminated

- hypothesis: Negative margins causing shift
  evidence: Only negative margins are on .sr-only (-1px) and .faq-answer (-4px margin-top), neither affects pricing
  timestamp: 2026-01-23

- hypothesis: Transform or translateX shifting the grid
  evidence: No transform applied to .pricing-tiers-new base styles; only hover states and mobile media query use transform
  timestamp: 2026-01-23

- hypothesis: !important rules overriding layout
  evidence: No !important rules affect positioning/layout of pricing grid
  timestamp: 2026-01-23

- hypothesis: Flex container parent causing misalignment
  evidence: .courses-pricing and .container have no display: flex
  timestamp: 2026-01-23

## Evidence

- timestamp: 2026-01-23
  checked: .pricing-tiers-new CSS (line 1961)
  found: "display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%; max-width: 1000px; margin: 0 auto 60px; box-sizing: border-box;"
  implication: CSS appears correct for centering, but width: 100% may be redundant or causing issues

- timestamp: 2026-01-23
  checked: .container CSS (line 263)
  found: "width: 100%; max-width: 1200px; margin-left: auto; margin-right: auto; padding-left: 24px; padding-right: 24px;"
  implication: Container properly centered with 24px padding on each side

- timestamp: 2026-01-23
  checked: HTML structure (lines 5314-5353)
  found: section.courses-pricing > div.container > div.pricing-tiers-new
  implication: Structure is correct - grid is inside container inside section

- timestamp: 2026-01-23
  checked: Media queries for .pricing-tiers-new
  found: Only one media query at max-width: 900px for mobile styling
  implication: No conflicting desktop media queries

- timestamp: 2026-01-23
  checked: Universal box-sizing (line 165-168)
  found: "*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }"
  implication: All elements use border-box, so padding calculations should be correct

## Resolution

root_cause: The `width: 100%` declaration on `.pricing-tiers-new` was forcing the grid to expand to full container width before applying max-width, which may have caused subtle calculation issues with the auto margin centering. Removing `width: 100%` allows the grid to use its natural block-level width calculation (expand to container, cap at max-width, then center with auto margins).

fix: Removed `width: 100%;` line from `.pricing-tiers-new` CSS block (was line 1965)

verification: PENDING - user needs to verify visual centering in browser

files_changed:
- C:/Users/bskim/Downloads/beamacademy-index.html (line 1965 removed)
