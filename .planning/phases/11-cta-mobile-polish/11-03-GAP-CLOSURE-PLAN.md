---
phase: 11-cta-mobile-polish
plan: 03
type: execute
wave: 1
depends_on: []
files_modified:
  - C:/Users/bskim/Downloads/beamacademy-index.html
autonomous: false
gap_closure: true

must_haves:
  truths:
    - "CSS brace count is balanced (equal opening and closing braces)"
    - "Phase 9 tutor card styling applied (flexbox layout, circular images)"
    - "Phase 10 Support Section visible with Discord mockup"
    - "Phase 11 CTA copy says 'Get Your Free Diagnostic'"
    - "Phase 11 mobile CSS handles 375px viewport"
    - "Site renders correctly with all styling intact"
  artifacts:
    - path: "C:/Users/bskim/Downloads/beamacademy-index.html"
      provides: "Complete file with all Phase 9-11 changes"
      contains: "support-section"
  key_links:
    - from: "Support section CSS"
      to: "Support section HTML"
      via: "Class names (.support-section, .discord-mockup)"
      pattern: "support-section"
    - from: "CTA buttons"
      to: "#contact form"
      via: "href=#contact"
      pattern: "Get.*Free Diagnostic"
---

<objective>
Re-apply Phases 9-11 changes sequentially to the restored working file (9c3ad70) with brace verification after each CSS addition.

Purpose: Parallel execution corrupted CSS structure. Sequential application with verification prevents cascading failures.

Output: Complete beamacademy-index.html with all Phase 9 fix, Phase 10 Support Section, Phase 11 CTA copy, and Phase 11 mobile CSS applied correctly.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/Users/bskim/beamacademy-site/.planning/PROJECT.md
@C:/Users/bskim/beamacademy-site/.planning/ROADMAP.md
@C:/Users/bskim/beamacademy-site/.planning/phases/11-cta-mobile-polish/CSS-FIX-GAP.md

Target file (restored to 9c3ad70):
@C:/Users/bskim/Downloads/beamacademy-index.html

Git diffs for reference:
- Phase 9 fix: `git diff 9c3ad70 0c1d447 -- index.html`
- Phase 10 CSS: `git diff 9c3ad70 d5423e9 -- index.html`
- Phase 10 HTML: `git diff d5423e9 b79e4a9 -- index.html`
- Phase 10 UAT: `git show 06a4dc5:index.html` (includes mobile CSS)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Apply Phase 9 fix - tutor card CSS changes</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Apply the Phase 9 fix CSS changes from commit 0c1d447. These changes convert tutor cards from grid to flexbox layout.

**Get exact changes:**
```bash
cd C:/Users/bskim/beamacademy-site && git diff 9c3ad70 0c1d447 -- index.html
```

**Apply these specific changes:**

1. **Base .trust-tutors (~line 1395)** - Change from grid to flexbox:
   - `display: grid` -> `display: flex`
   - `grid-template-columns: repeat(3, 1fr)` -> remove
   - Add: `justify-content: center`
   - `gap: 32px` -> `gap: 24px`
   - `max-width: 1000px` -> `max-width: 900px`
   - `margin: 0 auto 48px` -> `margin: 0 auto 40px`
   - Add: `flex-wrap: wrap`

2. **Base .tutor-card** - Add flex sizing:
   - `padding: 28px` -> `padding: 36px`
   - Add: `flex: 0 1 400px`
   - Add: `max-width: 400px`

3. **Base .tutor-card:hover** - Adjust values:
   - `transform: translateY(-6px)` -> `translateY(-4px)`
   - `box-shadow: 0 16px 40px` -> `0 12px 32px`

4. **Base .tutor-image** - Change to circular:
   - `width: 100%` -> `width: 220px`
   - Add: `height: 220px`
   - `border-radius: 16px` -> `border-radius: 50%`
   - `margin-bottom: 20px` -> `margin: 0 auto 24px`
   - Adjust box-shadow

5. **Base .tutor-image img**:
   - `object-position: center 5%` -> `center 15%`

6. **Font size increases** (base styles):
   - .tutor-name: `1.2rem` -> `1.5rem`, margin `6px` -> `8px`
   - .tutor-role: `0.85rem` -> `1.1rem`, margin `16px` -> `20px`
   - .tutor-trifecta: gap `8px` -> `10px`, margin `16px` -> `20px`
   - .trifecta-badge: padding `4px 12px` -> `8px 16px`, font `0.75rem` -> `0.95rem`
   - .tutor-credentials: `0.85rem` -> `1.05rem`
   - .tutor-credentials li: margin `4px` -> `8px`

7. **Promise number** (base styles):
   - .promise-number: `3.5rem` -> `2.2rem`
   - .promise-number span: `1rem` -> `0.85rem`

8. **Mobile @media (max-width: 600px)** (~line 4040) - Replace trust-tutors rules:
   - Remove: `grid-template-columns: 1fr`
   - Change: `gap: 24px` -> `gap: 16px`
   - Add new rules for: .tutor-card, .tutor-image, .tutor-name, .tutor-trifecta, .trifecta-badge, .tutor-credentials

9. **REMOVE Trust Section Tablet Breakpoint** (~line 4072):
   - Delete entire `@media (max-width: 900px) and (min-width: 601px)` block
   - It's no longer needed with flexbox layout

10. **Add comparison table rows** (HTML ~line 5579):
    - Add row: "We keep our classes small" | "6-8 students max - that's our hard limit"
    - Add mobile card for same content (~line 5637)

11. **Remove trust-promise section** (HTML ~line 5687):
    - Delete the `<div class="trust-promise">` with 6-8 Max content
    - (This content moved to comparison table)

**CRITICAL:** Do NOT add any standalone CSS rules outside media queries. The bug occurred when rules were orphaned without proper media query wrappers.
  </action>
  <verify>
Verify Phase 9 fix applied:
- `grep -c "display: flex" C:/Users/bskim/Downloads/beamacademy-index.html` should show the trust-tutors uses flex
- `grep "Trust Section Tablet Breakpoint" C:/Users/bskim/Downloads/beamacademy-index.html` should return nothing (removed)
- `grep "6-8 students max" C:/Users/bskim/Downloads/beamacademy-index.html` should show content in comparison table
  </verify>
  <done>
Phase 9 fix changes applied - tutor cards use flexbox, tablet breakpoint removed, 6-8 max moved to comparison table.
  </done>
</task>

<task type="auto">
  <name>Task 2: Verify CSS brace balance after Phase 9 fix</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Count CSS braces to verify structural integrity:

```bash
# Get line number of </style>
grep -n "</style>" C:/Users/bskim/Downloads/beamacademy-index.html

# Count opening and closing braces in CSS section (from line 122 to style end)
# Replace STYLE_END with actual line number
STYLE_END=$(grep -n "</style>" C:/Users/bskim/Downloads/beamacademy-index.html | cut -d: -f1)

# Count in CSS section only
sed -n "122,${STYLE_END}p" C:/Users/bskim/Downloads/beamacademy-index.html | grep -o '{' | wc -l
sed -n "122,${STYLE_END}p" C:/Users/bskim/Downloads/beamacademy-index.html | grep -o '}' | wc -l
```

**Expected:** Opening braces = Closing braces

If counts don't match:
1. Look for orphaned rules (rules outside any selector/media query)
2. Look for missing closing braces
3. Look for extra closing braces

**Common locations of issues:**
- After removing tablet breakpoint media query
- Around mobile media query blocks
  </action>
  <verify>
Brace counts are equal. Document both counts.
  </verify>
  <done>
CSS brace balance verified: {X} opening, {X} closing braces in style section.
  </done>
</task>

<task type="auto">
  <name>Task 3: Apply Phase 10 Support Section CSS</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Add Support Section CSS from commit d5423e9.

**Get exact CSS:**
```bash
cd C:/Users/bskim/beamacademy-site && git show d5423e9:index.html | sed -n '1583,1790p'
```

**Insert location:** After `.parent-quote strong { ... }` block, before `/* About */` comment.

Find the exact line:
```bash
grep -n "parent-quote strong" C:/Users/bskim/Downloads/beamacademy-index.html
grep -n "/* About */" C:/Users/bskim/Downloads/beamacademy-index.html
```

**Add these CSS blocks:**

1. `/* ========== Support Section ========== */`
2. `.support-section { ... }` - base padding and background
3. `.support-badge { ... }` - badge styling (like trust-badge)
4. `.discord-mockup { ... }` - Discord container
5. `.discord-header { ... }` - Header styling
6. `.discord-channel { ... }` - Channel name
7. `.discord-hash { ... }` - Hash symbol
8. `.discord-messages { ... }` - Messages container
9. `.discord-message { ... }` - Individual message
10. `.discord-avatar { ... }` and variants - Avatar styling
11. `.discord-message-content { ... }` - Content wrapper
12. `.discord-message-header { ... }` - Header with name/time
13. `.discord-username { ... }` - Username styling
14. `.discord-tutor { ... }` - Tutor color variant
15. `.discord-role { ... }` - Role badge
16. `.discord-timestamp { ... }` - Timestamp
17. `.discord-message-text { ... }` - Message text
18. `.support-features { ... }` - Features list
19. `.support-feature { ... }` - Individual feature
20. `.support-feature-icon { ... }` - Icon container
21. `.support-feature-text { ... }` - Feature text
22. `@media (min-width: 900px) { .support-content { ... } }` - Desktop side-by-side

**CRITICAL:** The desktop media query `@media (min-width: 900px)` must be properly closed with `}`. This is a NEW media query block.
  </action>
  <verify>
Verify Support CSS added:
- `grep -c "support-section" C:/Users/bskim/Downloads/beamacademy-index.html` should be > 0
- `grep -c "discord-mockup" C:/Users/bskim/Downloads/beamacademy-index.html` should be > 0
  </verify>
  <done>
Phase 10 Support Section CSS added with all Discord mockup and feature styling.
  </done>
</task>

<task type="auto">
  <name>Task 4: Verify CSS brace balance after Phase 10 CSS</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Repeat brace count verification:

```bash
STYLE_END=$(grep -n "</style>" C:/Users/bskim/Downloads/beamacademy-index.html | cut -d: -f1)
sed -n "122,${STYLE_END}p" C:/Users/bskim/Downloads/beamacademy-index.html | grep -o '{' | wc -l
sed -n "122,${STYLE_END}p" C:/Users/bskim/Downloads/beamacademy-index.html | grep -o '}' | wc -l
```

**Expected:** Counts remain equal after adding Support Section CSS.

If unbalanced, the new Support Section CSS likely has a brace mismatch. Check:
- The `@media (min-width: 900px)` block has proper opening AND closing braces
- Each selector block is properly closed
  </action>
  <verify>
Brace counts are equal. Document both counts.
  </verify>
  <done>
CSS brace balance verified after Phase 10 CSS: {X} opening, {X} closing braces.
  </done>
</task>

<task type="auto">
  <name>Task 5: Apply Phase 10 Support Section HTML</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Add Support Section HTML from commit b79e4a9.

**Get exact HTML:**
```bash
cd C:/Users/bskim/beamacademy-site && git show b79e4a9:index.html | sed -n '5740,5857p'
```

**Insert location:** After Trust section `</section>`, before About section.

Find insertion point:
```bash
# Find the end of trust section
grep -n "trust-schools" C:/Users/bskim/Downloads/beamacademy-index.html
# Trust section ends a few lines after trust-testimonial closes
```

**Add complete Support Section HTML:**
- `<section class="support-section" id="support" aria-labelledby="support-title">`
- Container with section-header (badge, title, description)
- support-content div containing:
  - Discord mockup (header, messages with student + tutor)
  - Support features (3 features with icons)
- Close section

**Key content:**
- Badge: "24/7 Discord Community" with Discord icon
- Title: "Stuck at 9pm? Help by 10am."
- Description: About tutors responding in Discord
- Discord mockup: Sarah asks at 9:14 PM, Chris responds at 9:47 PM (33 min response)
- Features: "Responses within hours", "Private server", "Same tutors"
  </action>
  <verify>
Verify Support HTML added:
- `grep -c "support-section" C:/Users/bskim/Downloads/beamacademy-index.html` should show HTML matches
- `grep "Stuck at 9pm" C:/Users/bskim/Downloads/beamacademy-index.html` should find title
- `grep "Sarah" C:/Users/bskim/Downloads/beamacademy-index.html` should find Discord message
  </verify>
  <done>
Phase 10 Support Section HTML added with Discord mockup and 33-min response time proof.
  </done>
</task>

<task type="auto">
  <name>Task 6: Apply Phase 10 Support Section Mobile CSS</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Add Support Section mobile CSS from commit 06a4dc5 (UAT-passed version).

**Get exact mobile CSS:**
```bash
cd C:/Users/bskim/beamacademy-site && git show 06a4dc5:index.html | grep -n "Support Section Mobile" -A 45
```

**Insert location:** In the existing `@media (max-width: 768px)` block, OR as a new mobile block if 768px doesn't exist for this content.

Find appropriate location:
```bash
grep -n "@media (max-width: 768px)" C:/Users/bskim/Downloads/beamacademy-index.html
```

**Add mobile CSS block:**
```css
/* Support Section Mobile */
@media (max-width: 768px) {
    .discord-mockup {
        border-radius: 12px;
    }

    .discord-avatar {
        width: 32px;
        height: 32px;
        font-size: 0.875rem;
    }

    .discord-message {
        gap: 12px;
    }

    .discord-message-text {
        font-size: 0.9rem;
    }

    .discord-timestamp {
        font-size: 0.7rem;
    }

    .support-features {
        gap: 16px;
    }

    .support-feature-icon {
        width: 40px;
        height: 40px;
    }

    .support-feature-icon svg {
        width: 20px;
        height: 20px;
    }

    .support-feature-text {
        font-size: 0.9rem;
    }
}
```

**CRITICAL:** This is a new @media block. Ensure it has matching opening and closing braces.
  </action>
  <verify>
Verify mobile CSS added:
- `grep -c "Support Section Mobile" C:/Users/bskim/Downloads/beamacademy-index.html` should be 1
- Brace balance still correct
  </verify>
  <done>
Phase 10 Support Section mobile CSS added for 768px and below viewport.
  </done>
</task>

<task type="auto">
  <name>Task 7: Verify CSS brace balance after Phase 10 complete</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Final Phase 10 brace verification:

```bash
STYLE_END=$(grep -n "</style>" C:/Users/bskim/Downloads/beamacademy-index.html | cut -d: -f1)
OPEN=$(sed -n "122,${STYLE_END}p" C:/Users/bskim/Downloads/beamacademy-index.html | grep -o '{' | wc -l)
CLOSE=$(sed -n "122,${STYLE_END}p" C:/Users/bskim/Downloads/beamacademy-index.html | grep -o '}' | wc -l)
echo "Opening: $OPEN, Closing: $CLOSE"
```

**Expected:** Equal counts.

If unbalanced, check the Support Section Mobile CSS block just added.
  </action>
  <verify>
Document final brace counts. Counts must be equal to proceed.
  </verify>
  <done>
Phase 10 complete with verified CSS integrity: {X} opening, {X} closing braces.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
Phases 9-10 re-applied: Tutor card flexbox styling, comparison table with 6-8 max, Support Section with Discord mockup.
  </what-built>
  <how-to-verify>
**Open C:/Users/bskim/Downloads/beamacademy-index.html in browser:**

1. **CSS loads correctly** - Page should have full styling (not plain text)

2. **Trust section (scroll down):**
   - Tutor cards are centered with flexbox (not grid)
   - Tutor images are circular
   - Cards have proper spacing

3. **Comparison section:**
   - Has "6-8 students max" row in table
   - Mobile cards include this comparison

4. **Support section (after Trust):**
   - Discord mockup visible
   - Shows Sarah asking at 9:14 PM
   - Shows Chris responding at 9:47 PM
   - Features list visible (3 items)

5. **Mobile view (F12 -> responsive -> 375px):**
   - Discord mockup readable
   - Tutor cards stack properly
   - No horizontal scroll
  </how-to-verify>
  <resume-signal>
Type "approved" if styling works and Phases 9-10 content visible.
If issues found, describe what's broken.
  </resume-signal>
</task>

<task type="auto">
  <name>Task 9: Apply Phase 11-01 CTA copy changes</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Update all CTA buttons from action-focused to outcome-focused copy. Reference 11-01-PLAN.md for exact replacements.

**Search and replace operations:**

1. **"Book Free Trial" -> "Get Your Free Diagnostic"** (5+ instances)
   - Nav CTA
   - Mobile nav
   - Hero button
   - Sticky CTA bar

2. **"Book Your Free Trial" -> "Get Your Free Diagnostic"** (1 instance)
   - Contact section title

3. **"Book Your Free Trial" -> "Get My Free Diagnostic"** (form submit)
   - Form submit button (personal ownership)
   - JavaScript dynamic text

4. **"Start Your Free Trial" -> "Get Your Free Diagnostic"** (1 instance)
   - Bottom CTA section

5. **"Start Free Trial" -> "Start Free"** (3 instances)
   - Pricing tier CTAs

6. **"Book Trial" -> "Try Free"** (22 instances)
   - Course card CTAs

7. **"Book Free Trial" -> "Skip to Form"** (1 instance)
   - Skip link in package modal

8. **"Continue to Book Trial" -> "Continue"** (1 instance)
   - Modal continue button

9. **JavaScript (~line 7656, 7676):**
   - `'Book Your Free Trial'` -> `'Get My Free Diagnostic'`
   - `'Book Your ' + currentPkg + ' Trial'` -> `'Start ' + currentPkg + ' Trial'`

**Do NOT change:**
- "Pay Now" buttons
- Footer links
- Form labels
  </action>
  <verify>
Run grep to verify:
- `grep -c "Get Your Free Diagnostic" C:/Users/bskim/Downloads/beamacademy-index.html` should be 6+
- `grep -c "Get My Free Diagnostic" C:/Users/bskim/Downloads/beamacademy-index.html` should be 2
- `grep -c "Book Free Trial" C:/Users/bskim/Downloads/beamacademy-index.html` should be 0
- `grep -c "Book Your Free Trial" C:/Users/bskim/Downloads/beamacademy-index.html` should be 0
  </verify>
  <done>
CTA-01 satisfied: All CTAs updated to outcome-focused copy. No "Book" patterns remain.
  </done>
</task>

<task type="auto">
  <name>Task 10: Apply Phase 11-02 mobile CSS (375px breakpoint)</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Add 375px ultra-narrow mobile breakpoint from 11-02-PLAN.md.

**Add new media query block** after existing 600px breakpoint:

```css
/* Ultra-narrow mobile (iPhone SE and similar) */
@media (max-width: 375px) {
    /* Proof section - prevent text from being too small */
    .paper-mockup {
        font-size: 0.65rem;
    }

    .proof-badge {
        font-size: 0.7rem;
        padding: 0.4rem 0.8rem;
    }

    /* Hero mockup - ensure weak tags don't overflow */
    .weak-tag {
        font-size: 0.65rem;
        padding: 0.2rem 0.4rem;
    }

    /* Trust section - smaller badges */
    .trifecta-badges span {
        font-size: 0.6rem;
    }

    /* Ensure sticky bar buttons remain tappable */
    .sticky-cta-button {
        min-height: 44px;
        font-size: 0.9rem;
    }
}
```

**Insert location:** After existing mobile media queries (600px, 768px blocks), before any desktop-only media queries.

Find insertion point:
```bash
grep -n "@media (max-width: 600px)" C:/Users/bskim/Downloads/beamacademy-index.html | tail -1
```

**CRITICAL:** Ensure the media query has proper opening and closing braces.
  </action>
  <verify>
- `grep -c "@media (max-width: 375px)" C:/Users/bskim/Downloads/beamacademy-index.html` should be 1
- Verify brace balance still correct
  </verify>
  <done>
Phase 11-02 mobile CSS added with 375px breakpoint for ultra-narrow devices.
  </done>
</task>

<task type="auto">
  <name>Task 11: Final CSS brace balance verification</name>
  <files>C:/Users/bskim/Downloads/beamacademy-index.html</files>
  <action>
Complete brace verification after all changes:

```bash
# Full file brace count
echo "Full file:"
grep -c "{" C:/Users/bskim/Downloads/beamacademy-index.html
grep -c "}" C:/Users/bskim/Downloads/beamacademy-index.html

# CSS section only
STYLE_END=$(grep -n "</style>" C:/Users/bskim/Downloads/beamacademy-index.html | cut -d: -f1)
echo "CSS section (lines 122-$STYLE_END):"
OPEN=$(sed -n "122,${STYLE_END}p" C:/Users/bskim/Downloads/beamacademy-index.html | grep -o '{' | wc -l)
CLOSE=$(sed -n "122,${STYLE_END}p" C:/Users/bskim/Downloads/beamacademy-index.html | grep -o '}' | wc -l)
echo "Opening: $OPEN, Closing: $CLOSE"

if [ "$OPEN" -eq "$CLOSE" ]; then
  echo "BALANCED - CSS is valid"
else
  echo "UNBALANCED - CSS has brace mismatch!"
fi
```

**If unbalanced:** Do not proceed. Find and fix the mismatch before final verification.
  </action>
  <verify>
CSS brace counts are equal. Document final counts.
  </verify>
  <done>
Final CSS brace verification passed: {X} opening, {X} closing braces. CSS structure intact.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
Complete gap closure: All Phases 9-11 changes applied with verified CSS integrity.
  </what-built>
  <how-to-verify>
**Complete verification checklist:**

**1. CSS Loads (most critical)**
- Page has full styling, not plain text
- No browser console CSS errors

**2. Phase 9 - Trust Section**
- Tutor cards use flexbox (centered, wrap on mobile)
- Circular tutor images
- Comparison table has "6-8 students max" row

**3. Phase 10 - Support Section**
- Discord mockup visible
- Sarah question at 9:14 PM
- Chris answer at 9:47 PM (33 min response proof)
- Three support features listed

**4. Phase 11-01 - CTA Copy**
- Hero CTA: "Get Your Free Diagnostic"
- Sticky bar: "Get Your Free Diagnostic"
- Form submit: "Get My Free Diagnostic"
- No "Book Free Trial" text visible

**5. Phase 11-02 - Mobile (test at 320px, 375px)**
- All sections render without horizontal scroll
- Text readable (not too small)
- Sticky CTA bar functional
- Touch targets adequate (buttons tappable)

**6. Sticky CTA Test**
- Scroll past hero
- Bar appears at bottom
- Tap CTA -> smooth scroll to form
- Tap phone -> opens dialer
  </how-to-verify>
  <resume-signal>
Type "approved" if all verifications pass.
If issues found, describe which phase/section has problems.
  </resume-signal>
</task>

</tasks>

<verification>
After completing all tasks:

1. **CSS Integrity:**
   - Brace balance verified at multiple checkpoints
   - No orphaned rules outside selectors/media queries
   - All media queries properly closed

2. **Phase 9 - Trust Section:**
   - Flexbox layout for tutor cards
   - Circular images
   - 6-8 max in comparison table (not standalone promise box)

3. **Phase 10 - Support Section:**
   - CSS: 200+ lines of Discord/support styling
   - HTML: Complete section with mockup and features
   - Mobile CSS: 768px responsive rules

4. **Phase 11-01 - CTA Copy:**
   - 0 instances of "Book Free Trial"
   - 0 instances of "Book Your Free Trial"
   - 6+ instances of "Get Your Free Diagnostic"
   - 2 instances of "Get My Free Diagnostic"

5. **Phase 11-02 - Mobile CSS:**
   - 375px breakpoint exists
   - Ultra-narrow device handling
</verification>

<success_criteria>
1. CSS brace balance verified (equal opening/closing braces)
2. Site renders with full styling (not plain text)
3. Phase 9 tutor card styling applied and comparison table updated
4. Phase 10 Support Section visible with Discord mockup
5. Phase 11-01 CTA copy all outcome-focused
6. Phase 11-02 375px mobile breakpoint added
7. Human verification confirms visual correctness at desktop and mobile viewports
8. No horizontal scroll at 320px, 375px, or 428px
</success_criteria>

<output>
After completion, create `.planning/phases/11-cta-mobile-polish/11-03-SUMMARY.md`
</output>
