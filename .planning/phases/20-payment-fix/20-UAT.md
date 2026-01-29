---
status: complete
phase: 20-payment-fix
source: 20-01-SUMMARY.md, 20-02-SUMMARY.md
started: 2026-01-29T11:00:00Z
updated: 2026-01-29T11:10:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Package Selection Opens Modal
expected: Click any package opens modal with subject selection, price display, Continue button
result: pass

### 2. Subject Selection in Modal
expected: Checkboxes work, can select up to package limit, count updates, Continue enables when valid selection made
result: pass

### 3. Continue to Form
expected: Clicking Continue scrolls to form, shows "Pay & Enrol" toggle option alongside "Free Diagnostic"
result: pass

### 4. Pay & Enrol Toggle
expected: Clicking "Pay & Enrol" button shows payment path with 5% discount, switches form to show "Pay Now & Save 5%" button
result: pass

### 5. Pay Now Triggers Checkout
expected: Filling form and clicking "Pay Now & Save 5%" shows loading spinner, then redirects to Stripe Checkout
result: pass

### 6. Stripe Shows Correct Amount
expected: Stripe Checkout page shows correct package price with GST line item
result: pass

### 7. Payment Completes Successfully
expected: Completing payment with test card redirects to thank-you page showing confirmation
result: pass

## Summary

total: 7
passed: 7
issues: 0
pending: 0
skipped: 0

## Observations (Non-Blocking)

1. **Modal styling:** "Step 2 of 2 Complete Your Booking" has awkward white box around it. TODO: Remove white box styling from modal.

2. **Price display confusing:** Shows "$80/wk → $84/wk inc. GST" which looks like a price increase. Should show original GST price ($88) → discounted GST price ($84) to make the savings clear.

## Gaps

[none - all tests passed]
