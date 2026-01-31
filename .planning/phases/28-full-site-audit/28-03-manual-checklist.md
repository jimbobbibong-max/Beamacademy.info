# Manual Verification Checklist

**Site:** https://beamacademy.info
**Date:** 2026-01-31
**Tester:** [Name]

---

## 1. Link Testing (Click each link, verify destination)

### Homepage Navigation
- [ ] Logo → refreshes homepage
- [ ] About → about.html loads
- [ ] Courses → scrolls to #courses section
- [ ] Contact → contact.html loads
- [ ] Free Diagnostic CTA → scrolls to #contact section

### Inner Page Navigation (test on About page)
- [ ] Logo → index.html loads
- [ ] Home → index.html loads
- [ ] Courses → index.html#courses (homepage + scroll)
- [ ] Contact → contact.html loads
- [ ] CTA button → index.html#contact

### Footer Links (test on any page)
- [ ] Quick Links: About → about.html
- [ ] Quick Links: Contact → contact.html
- [ ] Quick Links: Courses → #courses section
- [ ] Quick Links: Pay Now → external payment link
- [ ] Quick Links: Student Portal → external portal link
- [ ] Subject Links: Mathematics → mathematics.html
- [ ] Subject Links: English → english.html
- [ ] Subject Links: Physics → physics.html
- [ ] Subject Links: Chemistry → chemistry.html
- [ ] Contact: Phone → opens dialer (tel: link)
- [ ] Contact: Email → opens mail client (mailto: link)
- [ ] Legal: Privacy → modal opens
- [ ] Legal: Terms → modal opens
- [ ] Legal: Refund → modal opens

### External Links
- [ ] Student Portal → correct external URL
- [ ] Instagram link (if present) → correct URL

**Link Testing Notes:**
_______________________________________________________

---

## 2. Form Testing

### Contact Form (contact.html)
- [ ] Form fields display correctly (Name, Email, Phone, Message)
- [ ] Required field validation works (try empty submit)
- [ ] Email validation works (try invalid email format)
- [ ] Successful submission shows confirmation message
- [ ] Submission appears in Netlify Forms dashboard
- [ ] Delete test submission from Netlify after verification

**Form Testing Notes:**
_______________________________________________________

---

## 3. Mobile Testing (Chrome DevTools or real device)

### Test at 375px width (iPhone SE)
- [ ] Homepage: No horizontal scroll
- [ ] Homepage: Text is readable without zooming
- [ ] Homepage: Mobile nav hamburger opens/closes correctly
- [ ] Homepage: Sticky CTA visible and functional
- [ ] About: Tutor cards stack vertically
- [ ] Contact: Form fields usable (no zoom on focus)
- [ ] Subject pages: Content readable

### Test at 768px width (Tablet)
- [ ] Layout adjusts appropriately (2-column where applicable)
- [ ] Touch targets large enough (min 44x44px)

**Mobile Testing Notes:**
_______________________________________________________

---

## 4. Visual Quality Check

### Per-Page Inspection
- [ ] Homepage: Hero looks correct, tilted headline readable
- [ ] Homepage: Tutor preview cards display properly
- [ ] About: Tutor photos load correctly (all 5)
- [ ] About: Cards look professional
- [ ] Contact: Map displays (or placeholder if no API key)
- [ ] Contact: Form styled correctly
- [ ] Subject pages: Consistent design with homepage
- [ ] Results: Page loads (even though unlisted)

### Cross-Page Consistency
- [ ] Navigation looks the same on all pages
- [ ] Footer looks the same on all pages
- [ ] Typography consistent (font family, sizes)
- [ ] Colors consistent (purple theme, gold accents)

**Visual Quality Notes:**
_______________________________________________________

---

## 5. Performance Testing (Lighthouse)

### About Page (about.html)
- [ ] Performance score: ____ (target: 90+)
- [ ] Accessibility score: ____ (target: 90+)
- [ ] Best Practices score: ____ (target: 90+)
- [ ] SEO score: ____ (target: 90+)

### Contact Page (contact.html)
- [ ] Performance score: ____ (target: 90+)
- [ ] Accessibility score: ____ (target: 90+)
- [ ] Best Practices score: ____ (target: 90+)
- [ ] SEO score: ____ (target: 90+)

### Homepage (index.html)
- [ ] Performance score: ____ (target: 90+)
- [ ] Accessibility score: ____ (target: 90+)
- [ ] Best Practices score: ____ (target: 90+)
- [ ] SEO score: ____ (target: 90+)

**Lighthouse Issues (scores below 90):**
_______________________________________________________

---

## Summary

### Test Results

| Category | PASS | FAIL | Notes |
|----------|------|------|-------|
| Link Testing | /21 | | |
| Form Testing | /6 | | |
| Mobile (375px) | /7 | | |
| Mobile (768px) | /2 | | |
| Visual Quality | /12 | | |
| Performance | /12 | | |
| **TOTAL** | /60 | | |

### Lighthouse Scores Summary

| Page | Perf | Access | BP | SEO |
|------|------|--------|-----|-----|
| About | | | | |
| Contact | | | | |
| Homepage | | | | |

### Issues Found

| # | Category | Description | Severity |
|---|----------|-------------|----------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### Overall Result

- [ ] **PASS** - All tests pass, no issues
- [ ] **PASS WITH NOTES** - All critical tests pass, minor issues logged
- [ ] **FAIL** - Critical issues found requiring fixes

**Tester Signature:** ___________________________
**Date Completed:** ___________________________
