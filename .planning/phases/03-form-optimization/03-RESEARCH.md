# Phase 3: Form Optimization - Research

**Researched:** 2026-01-20
**Domain:** Mobile form UX, HTML5 input attributes, conversion optimization
**Confidence:** HIGH

## Summary

The current contact form in `index.html` has **10 visible fields** (plus 4 hidden fields and 1 honeypot), far exceeding the target of 3-4 fields. The form already uses correct input types (`type="tel"` and `type="email"`) but lacks proper `autocomplete` and `inputmode` attributes that significantly improve mobile UX. The submit button styling is adequate but could be improved for mobile prominence.

The form is located at line 5313, after 7 major sections (Hero, About, Courses/Pricing, Why Us, Portal, Team, Testimonials, FAQ), requiring significant scrolling. However, the existing sticky CTA bar (implemented in Phase 2) provides a quick path to the form.

**Primary recommendation:** Reduce form to 4 fields (Name, Phone, Email optional, Year Level optional), add proper `autocomplete`/`inputmode` attributes, and ensure submit button has prominent mobile styling.

## Current State Analysis

### Current Form Fields (index.html:5313-5411)

| Field | Line | Type | Required | Keep/Remove |
|-------|------|------|----------|-------------|
| **Hidden: form-name** | 5314 | hidden | - | KEEP (Netlify) |
| **Hidden: package** | 5315 | hidden | - | KEEP (business logic) |
| **Hidden: subjects** | 5316 | hidden | - | KEEP (business logic) |
| **Hidden: price** | 5317 | hidden | - | KEEP (business logic) |
| **Honeypot: bot-field** | 5318 | text | - | KEEP (spam protection) |
| Parent Name | 5324 | text | required | KEEP (essential) |
| Parent Email | 5328 | email | required | MAKE OPTIONAL |
| Parent Phone | 5334 | tel | required | KEEP (essential) |
| Student Name | 5343 | text | required | REMOVE (can collect later) |
| Student Email | 5347 | email | optional | REMOVE |
| Student Phone | 5353 | tel | optional | REMOVE |
| Year Level | 5362 | select | required | KEEP (optional) |
| Subject | 5374 | select | required | REMOVE (can collect later) |
| Message | 5392 | textarea | optional | REMOVE |

**Rationale for field reduction:**
- Studies show reducing fields from 9 to 5 increases conversions by 34% (Marketo)
- Reducing from 4 to 3 fields can boost conversions by 50%
- Student details and subject preference can be collected during follow-up call
- Name + Phone is minimum viable for callback; Email provides backup contact

### Current Input Types Status (index.html)

| Field | Current Type | Current Autocomplete | Status |
|-------|-------------|---------------------|--------|
| parentName | `type="text"` | none | NEEDS: `autocomplete="name"` |
| parentEmail | `type="email"` | none | NEEDS: `autocomplete="email" inputmode="email"` |
| parentPhone | `type="tel"` | none | NEEDS: `autocomplete="tel" inputmode="tel"` |
| yearLevel | `<select>` | none | OK |

**Missing attributes that improve mobile UX:**
- `autocomplete` - enables browser autofill (faster completion)
- `inputmode` - ensures correct keyboard on all browsers
- `autocapitalize="off"` - prevents unwanted capitalization on email
- `autocorrect="off"` - prevents autocorrect mangling names/emails

### Current Submit Button (index.html:5396-5399)

```html
<button type="submit" class="btn btn-primary form-submit btn-trial" id="trialSubmitBtn" style="display: flex;">
    <span class="btn-text"><span id="submitBtnText">Book Free Trial</span> -></span>
    <span class="btn-loading"><span class="spinner"></span> Processing...</span>
</button>
```

**Current styling (index.html:4275-4290):**
- Width: 100%
- Padding: 1rem 2rem
- Font-size: 1.1rem
- min-height: 44px (from generic rule at line 191)

**Assessment:** Button meets 44px touch target requirement. Text says "Book Free Trial" which is good but could be more action-oriented ("Book Your Free Trial" per requirements).

### Form Position Analysis

**Sections before form (line numbers):**
1. Hero (4375) - viewport height
2. About (4409) - ~60px padding
3. Courses/Pricing (4445) - substantial content
4. Why Us (4942)
5. Portal (4987)
6. Team (5052)
7. Testimonials (5119)
8. FAQ (5161)
9. **Contact/Form (5208)** - target destination

**Scroll distance estimate:** 7+ screen heights on mobile. This is mitigated by:
- Sticky CTA bar (implemented Phase 2) - provides instant navigation
- Hero CTA button links to #contact
- Multiple "Book Free Trial" links throughout page

**Assessment:** FORM-04 is satisfied by sticky CTA bar providing 1-tap access to form. Physical scroll distance is acceptable given navigation aids.

## Standard Stack

### Core (HTML5 Input Attributes)

| Attribute | Purpose | Why Standard |
|-----------|---------|--------------|
| `type="tel"` | Numeric phone keyboard | Native HTML5, universal support |
| `type="email"` | Email keyboard with @ | Native HTML5, universal support |
| `inputmode="tel"` | Explicit keyboard hint | Ensures correct keyboard on all browsers |
| `inputmode="email"` | Explicit keyboard hint | Ensures correct keyboard on all browsers |
| `autocomplete="name"` | Browser autofill | W3C standard, significant UX improvement |
| `autocomplete="tel"` | Phone autofill | W3C standard |
| `autocomplete="email"` | Email autofill | W3C standard |

### Supporting

| Attribute | Purpose | When to Use |
|-----------|---------|-------------|
| `autocapitalize="off"` | Prevent auto-caps | Email fields (iOS especially) |
| `autocorrect="off"` | Prevent autocorrect | Names, emails (prevents mangling) |
| `enterkeyhint="send"` | Keyboard action label | Submit button shows "Send" on mobile keyboard |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Removing student fields | Multi-step wizard | Complexity vs simplicity; defer to v2 |
| HTML5 validation | JS validation | HTML5 sufficient for this scope |
| Progressive disclosure | All fields visible | Could add later; keep simple for v1 |

## Architecture Patterns

### Recommended Form Structure

```html
<form action='/thank-you' class='contact-form' method='POST' name='trial'>
    <!-- Hidden fields for Netlify and business logic -->
    <input type="hidden" name="form-name" value="trial">
    <input type="hidden" name="package" id="hiddenPackage" value="">
    <input type="hidden" name="subjects" id="hiddenSubjects" value="">
    <input type="hidden" name="price" id="hiddenPrice" value="">

    <!-- Honeypot spam protection -->
    <p style="display:none">
        <label>Don't fill this out: <input name="bot-field"></label>
    </p>

    <!-- Minimal required fields -->
    <div class="form-group">
        <label for="parentName" class="form-label">Your Name *</label>
        <input type="text" id="parentName" name="parentName"
               class="form-input" required
               placeholder="Full name"
               autocomplete="name"
               autocorrect="off">
    </div>

    <div class="form-group">
        <label for="parentPhone" class="form-label">Phone *</label>
        <input type="tel" id="parentPhone" name="parentPhone"
               class="form-input" required
               placeholder="04XX XXX XXX"
               autocomplete="tel"
               inputmode="tel">
    </div>

    <div class="form-group">
        <label for="parentEmail" class="form-label">Email (optional)</label>
        <input type="email" id="parentEmail" name="parentEmail"
               class="form-input"
               placeholder="your@email.com"
               autocomplete="email"
               inputmode="email"
               autocapitalize="off"
               autocorrect="off">
    </div>

    <div class="form-group">
        <label for="yearLevel" class="form-label">Year Level (optional)</label>
        <select id="yearLevel" name="yearLevel" class="form-select">
            <option value="">Select year level</option>
            <option value="Year 7">Year 7</option>
            <!-- ... -->
        </select>
    </div>

    <button type="submit" class="btn btn-primary form-submit btn-trial">
        <span class="btn-text">Book Your Free Trial</span>
    </button>
</form>
```

### Anti-Patterns to Avoid

- **Requiring student details upfront:** Collect during follow-up call; reduces friction
- **Multiple phone/email fields:** One contact method is sufficient for lead capture
- **Required subject selection:** Can determine during consultation; adds cognitive load
- **Message textarea for simple lead form:** Barrier to completion; save for support forms

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Phone keyboard | Custom JS keyboard detection | `type="tel" inputmode="tel"` | Browser-native, reliable |
| Email keyboard | Custom input handling | `type="email" inputmode="email"` | Browser-native, accessible |
| Form autofill | Manual localStorage | `autocomplete` attributes | Browser-native, secure, cross-site |
| Spam protection | Complex JS validation | Netlify honeypot (existing) | Already works, proven |

## Common Pitfalls

### Pitfall 1: Breaking Netlify Forms Integration

**What goes wrong:** Removing/renaming fields breaks Netlify form submission
**Why it happens:** Netlify Forms requires specific attributes and field names
**How to avoid:**
- Keep `name="trial"` on form element
- Keep `<input type="hidden" name="form-name" value="trial">`
- Keep honeypot field exactly as-is
- Test submission after changes
**Warning signs:** 404 on submission, form not appearing in Netlify dashboard

### Pitfall 2: iOS Auto-Zoom on Input Focus

**What goes wrong:** iOS zooms page when focusing inputs with font-size < 16px
**Why it happens:** iOS accessibility feature to ensure readable input
**How to avoid:** Already fixed in Phase 1 (line 197: `font-size: 16px`)
**Warning signs:** Page zooms when tapping form fields

### Pitfall 3: Removing Business-Critical Hidden Fields

**What goes wrong:** Package selection flow breaks
**Why it happens:** Hidden fields (`package`, `subjects`, `price`) are populated by JS when user selects a pricing package
**How to avoid:** Keep all hidden fields; they're essential for the package selection → form flow
**Warning signs:** Form submissions missing package/subject data

### Pitfall 4: Breaking Dual-Mode Form (Trial vs Pay)

**What goes wrong:** The form has two submit buttons - trial and pay
**Why it happens:** Complex JS handles switching between "Book Free Trial" and "Pay Now" modes
**How to avoid:**
- Keep both submit buttons
- Keep `paySubmitBtn` and `trialSubmitBtn` IDs
- Keep associated JS functions unchanged
**Warning signs:** Payment flow broken, wrong button appears

## Code Examples

### Optimized Phone Input
```html
<!-- Source: Baymard Institute Touch Keyboard Types -->
<input type="tel"
       id="parentPhone"
       name="parentPhone"
       class="form-input"
       required
       placeholder="04XX XXX XXX"
       autocomplete="tel"
       inputmode="tel">
```

### Optimized Email Input
```html
<!-- Source: Baymard Institute Touch Keyboard Types -->
<input type="email"
       id="parentEmail"
       name="parentEmail"
       class="form-input"
       placeholder="your@email.com"
       autocomplete="email"
       inputmode="email"
       autocapitalize="off"
       autocorrect="off">
```

### Optimized Name Input
```html
<!-- Source: Baymard Institute Touch Keyboard Types -->
<input type="text"
       id="parentName"
       name="parentName"
       class="form-input"
       required
       placeholder="Full name"
       autocomplete="name"
       autocorrect="off">
```

### Mobile-Optimized Submit Button CSS
```css
/* Ensure prominent submit button on mobile */
.form-submit.btn-trial {
    width: 100%;
    min-height: 52px;  /* Exceeds 44px minimum */
    padding: 16px 24px;
    font-size: 1.125rem;
    font-weight: 600;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Just `type="tel"` | `type="tel" + inputmode="tel" + autocomplete="tel"` | HTML5.1 (2017) | Reliable keyboard + autofill |
| Many fields "just in case" | Minimal fields, collect rest in follow-up | 2020s CRO research | 34-50% conversion increase |
| Generic "Submit" button | Action-specific CTA ("Book Your Free Trial") | CRO best practices | Higher click-through |

**Current best practices (2025):**
- Single-column forms outperform multi-column by 15.4 seconds completion time
- 3-4 fields optimal for lead capture
- `autocomplete` attributes enable 1-tap form completion on many fields

## Implementation Checklist

Based on research, these changes are needed for Phase 3:

### FORM-01: Reduce to 3-4 Fields
- [ ] Remove Student Name field (line 5340-5344)
- [ ] Remove Student Email field (line 5345-5348)
- [ ] Remove Student Phone field (line 5350-5356)
- [ ] Remove Subject dropdown (line 5372-5388) - keep for package flow
- [ ] Remove Message textarea (line 5391-5393)
- [ ] Make Email optional (remove `required`)
- [ ] Make Year Level optional (remove `required`)
- [ ] Update "Parent/Guardian Details" section label

### FORM-02: Add Mobile Keyboard Attributes
- [ ] Add `autocomplete="name" autocorrect="off"` to parentName (line 5324)
- [ ] Add `autocomplete="email" inputmode="email" autocapitalize="off" autocorrect="off"` to parentEmail (line 5328)
- [ ] Add `autocomplete="tel" inputmode="tel"` to parentPhone (line 5334)

### FORM-03: Submit Button Enhancement
- [ ] Update button text from "Book Free Trial" to "Book Your Free Trial" (line 5397)
- [ ] Verify min-height is at least 44px (currently satisfied)
- [ ] Consider increasing to 52px for more prominence

### FORM-04: Form Reachability
- [ ] Verified: Sticky CTA bar (Phase 2) provides 1-tap access
- [ ] No additional changes needed

### Preservation Requirements
- [ ] Keep all hidden fields (form-name, package, subjects, price)
- [ ] Keep honeypot field (bot-field)
- [ ] Keep both submit buttons (trial + pay)
- [ ] Keep year level dropdown (needed when no package selected)
- [ ] Preserve Netlify Forms integration

## Open Questions

1. **Subject dropdown for no-package flow:**
   - Current: Required when user visits form directly (no package selected)
   - Question: Remove entirely or keep for this flow?
   - Recommendation: Keep Year Level, remove Subject - can determine subject during callback

2. **Phone number format:**
   - Current: Placeholder shows "04XX XXX XXX" (Australian mobile format)
   - Question: Add input masking or pattern validation?
   - Recommendation: No masking for v1 - iOS doesn't allow special characters with tel keyboard; validate on backend

## Sources

### Primary (HIGH confidence)
- index.html analysis (lines 5313-5411) - Current form structure
- index.html analysis (lines 5314-5318) - Hidden fields and spam protection
- index.html analysis (lines 191-199) - Existing touch target rules

### Secondary (MEDIUM confidence)
- [Baymard Institute Touch Keyboard Types](https://baymard.com/labs/touch-keyboard-types) - Input attribute recommendations
- [MDN input type="tel"](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/tel) - HTML5 specifications
- [MDN autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete) - Autocomplete values

### Tertiary (MEDIUM confidence - multiple sources agree)
- Multiple CRO studies (Marketo, Baymard) - Field reduction impact
- [Mobile Form Best Practices](https://ivyforms.com/blog/mobile-form-best-practices/) - 2025 form optimization
- [Omniconvert CRO for Mobile](https://www.omniconvert.com/blog/cro-for-mobile/) - Mobile conversion research

## Metadata

**Confidence breakdown:**
- Current state analysis: HIGH - direct code inspection
- Input attributes: HIGH - W3C/MDN documentation
- Field reduction recommendations: MEDIUM - CRO research consensus
- Pitfalls: HIGH - identified from actual code dependencies

**Research date:** 2026-01-20
**Valid until:** 2026-02-20 (stable HTML5 standards)
