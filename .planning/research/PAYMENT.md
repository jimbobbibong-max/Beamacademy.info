# Payment Integration Research: BEAM Academy

**Researched:** 2026-01-29
**Domain:** Tutoring landing page payment/booking integration
**Current State:** Static HTML site on Netlify, Australia-based tutoring service
**Overall Confidence:** HIGH

---

## Executive Summary

**BEAM Academy already has a Stripe Checkout integration built.** The site has a functional `create-checkout.js` Netlify Function that creates Stripe Checkout sessions with dynamic pricing, GST calculation, and customer metadata. The "Pay Now button leads nowhere" issue is likely a configuration or frontend connection problem, not a missing payment system.

**Recommendation:** Debug and verify the existing Stripe Checkout integration rather than implementing a new solution. The current architecture is the correct choice for this use case.

---

## 1. Recommendation

### Primary: Fix/Verify Existing Stripe Checkout Integration

**Why Stripe Checkout is correct for BEAM:**

| Factor | Stripe Checkout | Payment Links | Booking Systems |
|--------|-----------------|---------------|-----------------|
| Dynamic pricing tiers | Yes (via API) | No (fixed prices) | Varies |
| Custom form data | Yes (metadata) | No | Limited |
| GST compliance | Yes (built-in) | Yes | Varies |
| Static site compatible | Yes (Netlify Functions) | Yes (no backend) | Yes (embed) |
| Already implemented | **Yes** | No | No |
| Conversion optimization | High (7%+ lift with Link) | Medium | Medium |

**The existing implementation:**
- `netlify/functions/create-checkout.js` - Creates Stripe Checkout sessions
- Handles all pricing tiers (Junior/Intermediate/Senior, 1-4 subjects + All Access)
- Calculates GST (10%) as separate line item
- Passes customer metadata (parent name, student name, phone, subjects)
- Redirects to success/cancel URLs correctly

**What needs verification:**
1. `STRIPE_SECRET_KEY` environment variable set in Netlify
2. Frontend form submits correctly to `/.netlify/functions/create-checkout`
3. Stripe Dashboard has products/prices configured (or using dynamic price_data)
4. Success/cancel URLs working

### Alternative Considered: Stripe Payment Links

If the existing integration proves problematic, Payment Links would be the fallback:

**Pros:**
- Zero code - create in Stripe Dashboard
- Just embed link/button on page
- Still handles GST, receipts, etc.

**Cons:**
- Fixed prices per link (need one link per tier/package combo = 13+ links)
- No dynamic metadata (parent name, student name, subjects)
- Less professional (redirects to generic Stripe page)
- Lose the integrated form experience

**Verdict:** Only consider if Checkout integration can't be fixed. Would require significant UX redesign.

---

## 2. Comparison Table: All Options Evaluated

| Solution | Setup Complexity | Cost | Customization | Best For |
|----------|------------------|------|---------------|----------|
| **Stripe Checkout + Netlify Functions** | Medium (already done) | 1.75% + 30c/transaction | High | Dynamic pricing, custom forms |
| Stripe Payment Links | Low (no code) | 1.75% + 30c/transaction | Limited | Simple fixed-price products |
| Calendly + Payments | Low | $12-20/mo + payment fees | Medium | Scheduling-focused |
| Acuity Scheduling | Low | $16-49/mo | High | Service businesses |
| TidyCal | Low | $39 lifetime | Medium | Budget-conscious |
| Square Appointments | Low | Free (2.6% + 15c) | Limited | In-person services |

### Why Not Booking Systems?

BEAM's current flow is:
1. Parent selects package/tier on landing page
2. Fills out contact form with student details
3. Either submits free trial request OR pays directly

A booking system like Calendly/Acuity would:
- Require rebuilding the form flow into their widget
- Add scheduling complexity when BEAM handles scheduling separately
- Add monthly costs ($16-49/mo vs. pay-per-transaction)
- Lose the custom form fields and pricing structure

**Verdict:** Booking systems solve scheduling + payment together. BEAM only needs payment (scheduling is handled operationally). Stripe Checkout is the right tool.

---

## 3. Implementation Complexity Assessment

### Current State Analysis

**What exists:**

```
beamacademy-site/
  netlify/functions/
    create-checkout.js     # Stripe session creation (EXISTS)
  netlify.toml             # Functions configured (EXISTS)
  package.json             # stripe dependency (EXISTS)
  index.html               # Form with payment flow (EXISTS)
```

**The Netlify Function:**
- Creates Stripe Checkout sessions with `price_data` (dynamic pricing)
- Handles all tier/package combinations
- Adds 10% GST as separate line item (ATO compliant)
- Stores customer info in session metadata
- Redirects to thank-you.html on success

**Frontend integration (from index.html grep):**
- Form has "Pay Now & Save 5%" button
- Calls `/.netlify/functions/create-checkout` endpoint
- Has loading state (`payment-loading` class)
- Shows "Redirecting to Checkout..." during processing

### What Needs Verification

| Item | How to Verify | Expected Result |
|------|---------------|-----------------|
| Stripe secret key | Netlify Dashboard > Site > Environment Variables | `STRIPE_SECRET_KEY` exists |
| Function deployment | Visit `/.netlify/functions/create-checkout` | Returns 405 (method not allowed for GET) |
| Frontend POST | Browser DevTools > Network | 200 response with checkout URL |
| Stripe Dashboard | Check Payments section | Test payments appear |

### Potential Issues

1. **Environment variable not set** - Function returns 500 "Payment system not configured"
2. **CORS issues** - Function needs proper headers (currently has `Content-Type` only)
3. **Form data mismatch** - Frontend sending different field names than function expects
4. **Stripe mode** - Using test key in production or vice versa

---

## 4. Specific Steps to Verify/Fix

### Step 1: Check Netlify Environment Variables

```bash
# In Netlify Dashboard:
# Site Settings > Environment Variables
# Verify STRIPE_SECRET_KEY exists
# Should start with sk_live_ (production) or sk_test_ (testing)
```

### Step 2: Test Function Endpoint

```bash
# Test that function is deployed and responding
curl -X POST https://beamacademy.info/.netlify/functions/create-checkout \
  -H "Content-Type: application/json" \
  -d '{"tier":"Junior","package":"1 Subject","subjects":["Maths"],"parentName":"Test","studentName":"Test","email":"test@test.com","phone":"0400000000"}'

# Expected: {"url":"https://checkout.stripe.com/..."}
# Error: {"error":"..."} with details
```

### Step 3: Check Frontend Integration

Look for the payment form submission code in index.html. The grep showed:
- `payBtn.classList.add('payment-loading')` - Loading state
- `fetch('/.netlify/functions/create-checkout'...)` - API call
- Error handling with `alert()`

### Step 4: Verify Stripe Dashboard

1. Log into Stripe Dashboard
2. Check Developers > Logs for recent API calls
3. Check Payments for test/live transactions
4. Verify webhook configuration (if using webhooks)

### Step 5: If Everything Looks Correct But Still Failing

1. Check browser console for JavaScript errors
2. Check Netlify Functions logs in Netlify Dashboard
3. Test with Stripe CLI locally: `stripe listen --forward-to localhost:8888/.netlify/functions/create-checkout`

---

## 5. GST Compliance Notes

The current implementation handles GST correctly:

```javascript
// From create-checkout.js
const gstAmount = Math.round(basePrice * 0.10);
const totalPrice = basePrice + gstAmount;

// Separate line items for tax invoice compliance
line_items: [
  { /* Base price */ },
  {
    price_data: {
      product_data: {
        name: 'GST (10%)',
        description: 'Goods and Services Tax',
      },
      unit_amount: Math.round(gstAmount * 100),
    },
  }
]
```

**ATO Compliance checklist:**
- [x] GST shown as separate amount
- [x] 10% rate correctly applied
- [x] AUD currency used
- [ ] Tax invoice label on receipt (Stripe handles)
- [ ] ABN displayed (should add to Stripe account settings)

**Recommendation:** Add ABN to Stripe account settings and enable automatic receipt emails.

---

## 6. Alternative: If Starting Fresh

If the decision were made to start over (NOT recommended), here's the priority order:

### Option A: Stripe Payment Links (Simplest)

1. Create products in Stripe Dashboard for each tier/package
2. Generate Payment Links for each
3. Replace form with buttons linking to each Payment Link
4. Add `?client_reference_id=...` for tracking

**Drawback:** Lose custom form fields, need 13+ separate links, poor UX.

### Option B: Stripe Checkout (Current - Best)

Keep current implementation, just debug/verify.

### Option C: Booking System (Acuity/TidyCal)

Only if BEAM wants to combine payment + scheduling:
1. Sign up for Acuity ($16/mo) or TidyCal ($39 lifetime)
2. Create booking types for each tier
3. Set pricing within booking system
4. Embed widget on landing page

**Drawback:** Requires rebuilding form flow, adds scheduling complexity.

---

## 7. Sources

### Stripe Documentation
- [Payment Links Overview](https://docs.stripe.com/payment-links) - Payment Links allow accepting payments without code
- [Stripe Checkout](https://stripe.com/payments/checkout) - Pre-built, conversion-optimized checkout page
- [Australia GST Collection](https://docs.stripe.com/tax/supported-countries/asia-pacific/australia) - GST calculation for Australian businesses
- [Australia Invoicing Best Practices](https://docs.stripe.com/invoicing/australia-invoicing) - ATO-compliant invoice setup

### Netlify + Stripe Tutorials
- [Netlify: Accept Money on Jamstack Sites](https://www.netlify.com/blog/2020/04/13/learn-how-to-accept-money-on-jamstack-sites-in-38-minutes/) - Official guide for serverless Stripe
- [FreeCodeCamp: Serverless Online Payments](https://www.freecodecamp.org/news/serverless-online-payments/) - Netlify Functions + Stripe tutorial
- [egghead.io: Stripe Checkout with Netlify Functions](https://egghead.io/courses/sell-products-using-stripe-checkout-and-netlify-functions-25f6) - Video course

### Comparison Resources
- [Stripe: Choosing Between Payment Options](https://support.stripe.com/questions/choosing-between-payment-links-invoicing-checkout-and-payment-element) - Official comparison
- [Calendly vs Acuity](https://zapier.com/blog/calendly-vs-acuity/) - Booking system comparison
- [Flowclass: Payment Guide for Tutoring](https://flowclass.io/online-tutoring/accepting-payments-in-tutoring-services/) - Industry-specific guidance

### Australian Tax Compliance
- [Stripe: GST for Small Businesses](https://stripe.com/resources/more/gst-for-small-businesses-in-australia-a-guide) - GST requirements
- [Stripe: Tax Invoice Requirements](https://stripe.com/en-be/resources/more/tax-invoice-vs-receipt-in-australia) - Invoice vs receipt in Australia

---

## 8. Confidence Assessment

| Area | Confidence | Reason |
|------|------------|--------|
| Recommendation (use existing) | HIGH | Code review confirms implementation exists and is correct |
| GST compliance | HIGH | Implementation matches ATO requirements per Stripe docs |
| Stripe Checkout vs alternatives | HIGH | Multiple official sources confirm it's the best option for dynamic pricing |
| Debugging steps | MEDIUM | Standard approaches; actual issue unknown until tested |
| Booking system comparison | MEDIUM | Based on WebSearch; tutoring-specific data limited |

---

## 9. Roadmap Implications

### For v7 Milestone

The "Pay Now" button work should be:

1. **Phase: Payment Verification** (1-2 hours)
   - Verify environment variables
   - Test function endpoint
   - Check frontend integration
   - Debug any issues found

2. **NOT a major implementation phase** - The code exists

### Flags for Implementation

- **LOW RISK:** Stripe Checkout is well-documented, widely used
- **TESTING NEEDED:** Use Stripe test mode before going live
- **DEPENDENCY:** Requires Stripe account with API keys configured

---

## Summary

**Do not build a new payment system.** BEAM Academy already has a well-architected Stripe Checkout integration via Netlify Functions. The work needed is:

1. Verify the existing implementation is deployed and configured
2. Debug any issues preventing it from working
3. Test the full payment flow with Stripe test mode
4. Go live with confidence

The current implementation is the correct technical choice for a static tutoring site with dynamic pricing tiers and custom form data.
