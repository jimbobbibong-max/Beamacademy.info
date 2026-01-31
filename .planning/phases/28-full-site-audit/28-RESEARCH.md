# Phase 28: Full Site Audit - Research

**Researched:** 2026-01-31
**Domain:** Website QA, Link Verification, Form Testing, Performance Auditing
**Confidence:** HIGH

## Summary

Phase 28 is a comprehensive quality assurance audit of the entire BEAM Academy website after completing v9 changes (Phases 26-27). The site now consists of 8 HTML pages plus supporting files. This audit verifies that all links work, mobile experience is consistent, forms submit correctly, images load, performance is acceptable, and no placeholder content remains.

Key audit areas:
1. **Link Integrity** - All navigation and footer links across 8 pages
2. **Mobile Responsiveness** - Touch targets, sticky CTA, viewport behavior
3. **Form Functionality** - Netlify form submission on Contact page
4. **Image Loading** - Tutor photos load correctly with proper paths
5. **Performance** - Lighthouse scores on new pages (About, Contact)
6. **Content Quality** - No placeholder text, consistent messaging

**Primary recommendation:** Create a systematic checklist-based audit. Run automated checks first (Lighthouse, link verification), then perform manual page-by-page review for items that require human judgment.

## Files to Audit

### Primary Pages (8 total)

| Page | File | Last Updated | Priority |
|------|------|--------------|----------|
| **Homepage** | `Downloads/beamacademy-index.html` | 2026-01-31 | P1 |
| **About** | `about.html` | 2026-01-31 | P1 |
| **Contact** | `contact.html` | 2026-01-31 | P1 |
| **Mathematics** | `mathematics.html` | 2026-01-31 | P2 |
| **English** | `english.html` | 2026-01-31 | P2 |
| **Physics** | `physics.html` | 2026-01-31 | P2 |
| **Chemistry** | `chemistry.html` | 2026-01-31 | P2 |
| **Results** | `results.html` | 2026-01-31 | P3 (unlisted) |

### Supporting Files

| File | Purpose | Check |
|------|---------|-------|
| `logo-star.png` | Logo image | Exists in both root and images/ |
| `favicon.ico` | Browser tab icon | Exists |
| `images/chris.jpg` | Tutor photo | Exists |
| `images/nathan.jpg` | Tutor photo | Exists |
| `images/john.jpg` | Tutor photo | Exists |
| `images/taehoon.jpg` | Tutor photo | Exists |
| `images/soiwon.jpg` | Tutor photo | Exists (note: filename typo preserved) |
| `netlify/functions/` | Serverless functions | Stripe checkout function |

**Source:** File system analysis, Phase 26-27 summaries

## Audit Area 1: Link Verification

### Link Types to Check

| Link Type | Pattern | Example | Pages |
|-----------|---------|---------|-------|
| **Internal page** | `href="*.html"` | `about.html` | All |
| **Anchor** | `href="#section"` | `#courses` | Homepage |
| **Cross-page anchor** | `href="page.html#section"` | `index.html#contact` | Inner pages |
| **Tel** | `href="tel:..."` | `tel:0491791447` | All |
| **Email** | `href="mailto:..."` | `mailto:admin@beamacademy.info` | All |
| **External** | `href="https://..."` | Student portal, Instagram | Footer |
| **JavaScript** | `onclick="..."` | Policy modals | Footer |

### Expected Link Inventory

**Homepage (beamacademy-index.html):**
- Header nav: About, Courses (#courses), Contact, Free Diagnostic (#contact)
- Mobile nav: Same as header
- In-page CTAs: All point to #contact
- Footer Quick Links: About, Contact, Courses, Pay Now, Student Portal
- Footer Subjects: Mathematics, English, Chemistry, Physics
- Footer Contact: Phone (tel:), Email (mailto:)
- Footer Legal: Privacy, Terms, Refund (modal)

**Inner Pages (about, contact, subject pages):**
- Header nav: Home (index.html), Courses (index.html#courses), Contact, CTA (index.html#contact)
- Logo: Links to index.html (not #)
- Footer: Same as homepage

### Verification Method

**Automated (can be done by Claude):**
```bash
# Count links to each internal page
for page in index.html about.html contact.html mathematics.html english.html chemistry.html physics.html; do
  echo "$page references:"
  grep -c "$page" Downloads/beamacademy-index.html about.html contact.html mathematics.html english.html chemistry.html physics.html 2>/dev/null
done
```

**Manual (requires human):**
- Click each link and verify destination
- Verify anchor links scroll to correct section
- Verify external links open in new tab
- Verify tel: links trigger phone dialer

### Pass/Fail Criteria

| Check | Pass | Fail |
|-------|------|------|
| Internal links | File exists, page loads | 404 error |
| Anchor links | Scrolls to section | No scroll, element missing |
| Tel links | Opens phone dialer | Nothing happens |
| Email links | Opens email client | Nothing happens |
| External links | Opens correct URL | 404, wrong URL |

**Confidence:** HIGH - Based on file system analysis and Phase 26-04 navigation update

## Audit Area 2: Mobile Responsiveness

### Check Points

| Element | Check | Method |
|---------|-------|--------|
| **Viewport meta** | Present on all pages | grep viewport |
| **Touch targets** | Min 44x44px | DevTools inspect |
| **Sticky CTA** | Present on all pages | Visual check mobile |
| **Mobile nav** | Opens/closes, all links work | Manual tap test |
| **Hero section** | Readable, no horizontal scroll | Visual check |
| **Forms** | Input fields usable, 16px font | Manual input test |
| **Images** | Scale correctly, no overflow | Visual check |

### Viewport Check (Automated)

```bash
# Verify all pages have viewport meta tag
for file in Downloads/beamacademy-index.html about.html contact.html mathematics.html english.html chemistry.html physics.html; do
  echo "$file:"
  grep -c "viewport" "$file"
done
```

Expected: All pages return 1

### Device Sizes to Test

| Device | Width | Priority |
|--------|-------|----------|
| iPhone SE | 375px | P1 |
| iPhone 14 | 390px | P1 |
| iPad | 768px | P2 |
| Desktop | 1280px+ | P1 |

### Pass/Fail Criteria

| Check | Pass | Fail |
|-------|------|------|
| No horizontal scroll | Page fits viewport | Content overflows |
| Touch targets | Min 44x44px | Smaller targets |
| Sticky CTA visible | Fixed to bottom | Not present/hidden |
| Mobile nav works | Menu toggles properly | Doesn't open/close |
| Forms usable | Input works, no zoom | Auto-zoom on focus |

**Confidence:** HIGH - Based on Phase 22 mobile optimization work

## Audit Area 3: Form Functionality

### Contact Page Form

**Form configuration (from contact.html):**
```html
<form class="contact-form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
```

### Required Fields

| Field | Name | Type | Required |
|-------|------|------|----------|
| Name | `name` | text | Yes |
| Email | `email` | email | Yes |
| Phone | `phone` | tel | No |
| Subject | `subjects[]` | checkbox | No |
| Year Level | `yearLevel` | select | Yes |
| Message | `message` | textarea | Yes |

### Test Cases

| Test | Input | Expected Result |
|------|-------|-----------------|
| Valid submission | All required fields | Success message, submission in Netlify |
| Missing name | Empty name | Form validation error |
| Invalid email | "notanemail" | HTML5 validation error |
| Honeypot filled | bot-field has value | Submission rejected (spam) |

### Verification Method

**Manual test required:**
1. Go to live contact page (https://beamacademy.info/contact.html)
2. Fill form with test data
3. Submit
4. Check Netlify Forms dashboard for submission
5. Delete test submission

### Pass/Fail Criteria

| Check | Pass | Fail |
|-------|------|------|
| Form submits | Data appears in Netlify | Error or no submission |
| Validation works | Errors on invalid input | Accepts invalid data |
| Success feedback | User sees confirmation | No feedback |

**Confidence:** HIGH - Netlify forms is well-documented, form config verified in code

## Audit Area 4: Image Loading

### Tutor Images

| Image | Path | Used On |
|-------|------|---------|
| chris.jpg | images/chris.jpg | Homepage, About |
| taehoon.jpg | images/taehoon.jpg | Homepage, About |
| soiwon.jpg | images/soiwon.jpg | Homepage, About (note: filename has typo) |
| nathan.jpg | images/nathan.jpg | About only |
| john.jpg | images/john.jpg | About only |

### Verification Method (Automated)

```bash
# Check all tutor images exist
ls -la images/chris.jpg images/taehoon.jpg images/soiwon.jpg images/nathan.jpg images/john.jpg
```

### Visual Checks (Manual)

| Check | Method | Pass |
|-------|--------|------|
| Images load | View page | No broken image icons |
| Aspect ratio | Visual inspection | Not stretched/squished |
| Object-fit | Inspect CSS | Covers container properly |
| Alt text | Inspect element | Meaningful alt or aria-hidden |

### Pass/Fail Criteria

| Check | Pass | Fail |
|-------|------|------|
| File exists | 200 response | 404 error |
| Renders correctly | Image visible | Broken icon |
| Correct image | Right person shown | Wrong image |

**Confidence:** HIGH - File existence verified, paths match in HTML

## Audit Area 5: Performance

### Lighthouse Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Performance | 90+ | Desktop preset |
| Accessibility | 90+ | WCAG 2.1 AA |
| Best Practices | 90+ | Security, modern APIs |
| SEO | 90+ | Meta, structure |

### Pages to Audit

| Page | Priority | Reason |
|------|----------|--------|
| Homepage | P1 | Main landing page |
| About | P1 | New page, heavy images |
| Contact | P1 | New page, form + map |
| Mathematics | P2 | Representative subject page |

### Lighthouse CLI Commands

```bash
# Install if needed
npm install -g lighthouse

# Desktop audits (recommended)
lighthouse https://beamacademy.info --preset=desktop --output=html --output-path=./audit/homepage-desktop.html
lighthouse https://beamacademy.info/about.html --preset=desktop --output=html --output-path=./audit/about-desktop.html
lighthouse https://beamacademy.info/contact.html --preset=desktop --output=html --output-path=./audit/contact-desktop.html
```

### Key Metrics to Check

| Metric | Tool | Target |
|--------|------|--------|
| LCP | Lighthouse | < 2.5s (mobile), < 1.5s (desktop) |
| CLS | Lighthouse | < 0.1 |
| FCP | Lighthouse | < 1.8s (mobile), < 1.0s (desktop) |
| TBT | Lighthouse | < 200ms |

### Pass/Fail Criteria

| Check | Pass | Fail |
|-------|------|------|
| Performance score | 70+ acceptable, 90+ ideal | < 70 |
| Accessibility score | 90+ | < 90 |
| No critical issues | 0 critical in report | Any critical issues |

**Confidence:** HIGH - Phase 24 research provides detailed methodology

## Audit Area 6: Content Quality

### Placeholder Patterns to Search

```bash
# Search for common placeholder patterns
grep -i -r "lorem\|placeholder\|TODO\|FIXME\|XXX\|TBD\|coming soon\|\[.*\]" \
  Downloads/beamacademy-index.html about.html contact.html \
  mathematics.html english.html chemistry.html physics.html
```

**Expected:** Only form placeholder attributes, no actual placeholder content

### Content Consistency Checks

| Check | What to Verify |
|-------|---------------|
| Business name | "BEAM Academy" consistently used |
| Phone number | 0491 791 447 everywhere |
| Email | admin@beamacademy.info everywhere |
| Address | Suite 206, 2 Pembroke St, Epping |
| Tagline | Consistent messaging |

### Tutor Information Accuracy

| Tutor | Correct Info (from Phase 27) |
|-------|------------------------------|
| Chris Kim | Head of Maths & Physics, 97 Maths Ext1, Medicine @ Newcastle |
| Nathan You | Tutor, 95 Maths Ext1, Medicine @ Newcastle |
| John Park | Tutor, 95 English Adv, Medicine @ UNSW |
| Taehoon Kim | Tutor & Head Admin, 95 Maths Ext1, Optometry @ UNSW |
| Sowon Lee | Head of English, 96 English Adv, Law @ UNSW |

### Pass/Fail Criteria

| Check | Pass | Fail |
|-------|------|------|
| No placeholder text | Only form placeholders | Lorem ipsum, [brackets], etc. |
| Contact info consistent | Same everywhere | Conflicting info |
| Tutor info accurate | Matches Phase 27 data | Wrong names/credentials |

**Confidence:** HIGH - Content verified against Phase 27 decisions

## Automation Strategy

### What Can Be Automated (Claude can run)

| Check | Command | Expected |
|-------|---------|----------|
| File existence | `ls -la` all HTML and image files | All exist |
| Link counting | `grep` for href patterns | Expected counts |
| Viewport meta | `grep viewport` all pages | 1 per page |
| Placeholder search | `grep` for placeholder patterns | Only form placeholders |
| Console errors | Browser DevTools check | No errors |

### What Requires Human Judgment

| Check | Why Manual |
|-------|-----------|
| Visual appearance | Subjective quality |
| Mobile UX | Touch interaction feel |
| Form submission | Requires live site, Netlify verification |
| Link destination | Need to verify correct page loads |
| Content accuracy | Need to verify meaning, not just presence |

## Recommended Audit Workflow

### Wave 1: Automated Checks (Claude)
1. Verify all files exist
2. Check link counts and patterns
3. Search for placeholder content
4. Verify viewport meta tags
5. Check image file existence

### Wave 2: Lighthouse Audits (Claude with live site)
1. Run Lighthouse on 4 priority pages
2. Document scores
3. Flag any failures or critical issues

### Wave 3: Manual Verification (Human + Claude)
1. Click-test all navigation links
2. Test contact form submission
3. Verify mobile experience on real device
4. Visual review of each page
5. Content accuracy spot-check

## Common Pitfalls

### 1. Results Page Status
**Issue:** Results page was created but removed from navigation (data not verified)
**Action:** Verify results.html still loads, even if not linked. Document status.

### 2. Relative vs Absolute Paths
**Issue:** Subject pages may have different path depths
**Check:** Verify `images/` paths work from root-level pages
**Expected:** All pages at root level, paths should work

### 3. Navigation Inconsistency
**Issue:** Each page may have slight navigation differences
**Check:** Compare nav HTML across all pages
**Expected:** Identical structure, different active states

### 4. Form Honeypot
**Issue:** Netlify honeypot field must be hidden but present
**Check:** `data-netlify-honeypot="bot-field"` present, hidden input exists

### 5. Mobile Sticky CTA Z-Index
**Issue:** Sticky CTA might be hidden behind modals or nav
**Check:** CTA visible after scrolling, above all content

## Don't Hand-Roll

| Problem | Use Instead | Why |
|---------|-------------|-----|
| Link checking | Manual + grep | No reliable local tool |
| Performance audit | Lighthouse CLI | Industry standard |
| Accessibility audit | Lighthouse + axe | Catches 30-57% of issues |
| Cross-browser | Manual + DevTools | Static site doesn't need Playwright |

## Tools Needed

### Required
| Tool | Purpose | Install |
|------|---------|---------|
| Chrome DevTools | Inspect, mobile emulation | Built-in |
| Lighthouse CLI | Performance audit | `npm install -g lighthouse` |
| grep/bash | File content verification | Built-in |

### Recommended
| Tool | Purpose | Install |
|------|---------|---------|
| axe DevTools | Accessibility deep-dive | Chrome extension |
| Real mobile device | Touch testing | Physical device |

## Sources

### Primary (HIGH confidence)
- Phase 24 Research (`.planning/phases/24-performance-final-qa/24-RESEARCH.md`) - Lighthouse methodology
- Phase 26-27 Plans and Summaries - Page structure, navigation, tutor data
- File system analysis - Actual files present

### Secondary (MEDIUM confidence)
- [The Complete Website Audit Checklist for 2026](https://redrattlercreative.com/complete-website-audit-checklist-2026/) - General QA methodology
- [Website QA Testing: Complete Guide](https://bugherd.com/blog/website-qa-testing-complete-guide-to-quality-assurance) - Testing categories
- [Lighthouse CLI Documentation](https://github.com/GoogleChrome/lighthouse) - CLI usage

### Tertiary (LOW confidence)
- [marker.io Website QA Checklist](https://marker.io/blog/website-qa-checklist) - General checklist items

## Metadata

**Confidence breakdown:**
- File inventory: HIGH - Direct file system analysis
- Link verification: HIGH - grep patterns verified against actual HTML
- Form testing: HIGH - Netlify forms well-documented, config verified
- Performance testing: HIGH - Reuses Phase 24 research
- Content quality: HIGH - Verified against Phase 27 data

**Research date:** 2026-01-31
**Valid until:** 2026-02-28 (site structure unlikely to change rapidly)
