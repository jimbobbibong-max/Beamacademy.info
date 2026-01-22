# Phase 10: Support Section - Research

**Researched:** 2026-01-23
**Domain:** Support callout section, Discord mockup UI, availability messaging
**Confidence:** HIGH

## Summary

Phase 10 creates a dedicated Support Section that differentiates BEAM through 24/7 Discord availability. The existing codebase already mentions Discord support in three places: the Comparison table (line 5599: "Discord support - stuck at 9pm, help by 10am"), the Why Us section (line 6284: "24/7 Academic Support"), and the About features (line 5766: "Discord community"). This phase elevates the Discord support from a bullet point to a featured section with visual proof.

The key implementation challenge is creating a convincing Discord mockup that shows a real exchange without requiring an actual screenshot image. Research shows pure CSS Discord mockups are well-established, with existing patterns using dark theme colors (`#36393E` chat background, `#202225` sidebar) and flexbox message layouts. The existing codebase's mockup patterns (hero portal mockup, proof section document mockups) provide excellent scaffolding.

**Primary recommendation:** Create a new `.support-section` after the Trust section (line 5737) featuring: (1) A prominent "Stuck at 9pm? Help by 10am." headline, (2) A pure CSS Discord chat mockup showing a realistic student-tutor exchange with visible timestamps, and (3) Supporting copy that addresses parent concerns about between-class support. Use the existing dark mockup styling pattern from the hero portal.

## Current State Analysis

### Page Structure (Section Order)
```
5369  Hero (#home)
5442  Proof Section (#proof)        <- Document mockups pattern
5568  Comparison Section (#comparison) <- Mentions Discord
5651  Trust Section (#trust)        <- SUPPORT GOES AFTER THIS
5739  About Section (#about)        <- Mentions Discord community
5775  Courses & Pricing (#courses)
6272  Why Us (#why-us)              <- Has 24/7 support feature card
...
```

**Insertion point:** After line 5737 (`</section>` closing trust section), before line 5738 (`<!-- About Section -->`).

### Existing Discord Mentions
| Location | Current Copy | Line |
|----------|--------------|------|
| Comparison Table | "Discord support - stuck at 9pm, **help by 10am**" | 5599 |
| Comparison Cards | Same as above | 5633 |
| About Features | "Discord community" (bullet) | 5766 |
| Why Us | "24/7 Academic Support" with paragraph | 6284 |
| Footer | Discord link (discord.gg/Y4Y8uTun) | 6748 |

### Existing Mockup Patterns to Reuse

**Hero Portal Mockup (lines 801-919, 5388-5435):**
- Dark background: `var(--gray-900)` (#18181b)
- macOS-style header with dots
- Rows with labels and color-coded values
- Clean flexbox layout

**Proof Section Mockups (lines 1013-1288):**
- Paper document style (white background)
- Dashboard style (dark background)
- Consistent border-radius: 24px
- Shadow: `0 4px 20px rgba(0, 0, 0, 0.06)`

## Standard Stack

No external libraries needed. This phase uses existing CSS patterns and creates new Discord-specific styling.

### Core CSS Classes to Reuse
| Class | Purpose | Source |
|-------|---------|--------|
| `.section-header` | Standard section header | Various |
| `.section-title` | Heading typography | Various |
| `.section-description` | Description styling | Various |
| `.report-mockup` | Dark mockup container | Lines 1085-1100 |
| `.hero-mockup-header` | macOS window header pattern | Lines 801-830 |
| `.trust-badge` | Badge styling pattern | Lines 1376-1393 |

### Design System Variables
```css
/* Existing site colors */
--purple-50: #faf5ff;
--purple-100: #f3e8ff;
--purple-700: #7c3aed;
--gray-900: #18181b;

/* Discord colors (to add) */
--discord-bg: #36393F;       /* Chat background */
--discord-darker: #2F3136;   /* Sidebar/header */
--discord-darkest: #202225;  /* Server list */
--discord-text: #DCDDDE;     /* Primary text */
--discord-muted: #8E9297;    /* Timestamps, muted text */
--discord-brand: #5865F2;    /* Discord blurple */
--discord-green: #3BA55D;    /* Online status */
```

## Architecture Patterns

### Recommended Section Structure

```html
<!-- Support Section - Insert after Trust section (line 5737), before About -->
<section class="support-section" id="support" aria-labelledby="support-title">
  <div class="container">
    <header class="section-header">
      <div class="support-badge">
        <svg class="support-badge-icon" aria-hidden="true"><!-- Discord icon --></svg>
        24/7 Discord Community
      </div>
      <h2 class="section-title" id="support-title">Stuck at 9pm? Help by 10am.</h2>
      <p class="section-description">
        Your child isn't alone between classes. Our tutors respond to homework questions
        in our private Discord - usually within hours, always by the next morning.
      </p>
    </header>

    <div class="support-content">
      <!-- Discord Mockup -->
      <div class="discord-mockup">
        <div class="discord-header">
          <div class="discord-channel">
            <span class="discord-hash" aria-hidden="true">#</span>
            maths-help
          </div>
        </div>
        <div class="discord-messages" aria-hidden="true">
          <!-- Student message -->
          <div class="discord-message">
            <div class="discord-avatar discord-avatar-student">S</div>
            <div class="discord-message-content">
              <div class="discord-message-header">
                <span class="discord-username">Sarah</span>
                <span class="discord-timestamp">Today at 9:14 PM</span>
              </div>
              <div class="discord-message-text">
                Can someone help with integration by parts? The one with ln(x) - stuck on Q3 of this week's worksheet
              </div>
            </div>
          </div>
          <!-- Tutor response -->
          <div class="discord-message">
            <div class="discord-avatar discord-avatar-tutor">
              <img src="images/chris.jpg" alt="">
            </div>
            <div class="discord-message-content">
              <div class="discord-message-header">
                <span class="discord-username discord-tutor">Chris</span>
                <span class="discord-role">Tutor</span>
                <span class="discord-timestamp">Today at 9:47 PM</span>
              </div>
              <div class="discord-message-text">
                For integration by parts with ln(x), set u = ln(x) and dv = x dx. I'll send you the worked solution - check your DMs!
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Supporting Points -->
      <div class="support-features">
        <div class="support-feature">
          <span class="support-feature-icon" aria-hidden="true"><!--clock icon--></span>
          <span class="support-feature-text">Responses within hours, not days</span>
        </div>
        <div class="support-feature">
          <span class="support-feature-icon" aria-hidden="true"><!--lock icon--></span>
          <span class="support-feature-text">Private server - BEAM students only</span>
        </div>
        <div class="support-feature">
          <span class="support-feature-icon" aria-hidden="true"><!--users icon--></span>
          <span class="support-feature-text">Same tutors who teach your classes</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Discord Mockup CSS Pattern

Based on research from [wc-discord-message](https://github.com/Danktuary/wc-discord-message) and [CodePen Discord Mockup](https://codepen.io/odensc/pen/vxpMPp), here's the recommended styling:

```css
/* Discord Mockup Container */
.discord-mockup {
  background: #36393F;
  border-radius: 16px;
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  font-family: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* Discord Header */
.discord-header {
  background: #2F3136;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.discord-channel {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 1rem;
}

.discord-hash {
  color: #8E9297;
  font-size: 1.2rem;
}

/* Messages Container */
.discord-messages {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Individual Message */
.discord-message {
  display: flex;
  gap: 16px;
}

.discord-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
}

.discord-avatar-student {
  background: #5865F2;  /* Discord blurple */
  color: white;
}

.discord-avatar-tutor {
  background: linear-gradient(135deg, var(--purple-600), var(--purple-700));
  overflow: hidden;
}

.discord-avatar-tutor img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Message Content */
.discord-message-content {
  flex: 1;
  min-width: 0;
}

.discord-message-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.discord-username {
  color: #FFFFFF;
  font-weight: 500;
  font-size: 1rem;
}

.discord-tutor {
  color: var(--purple-400); /* Or use Discord role color */
}

.discord-role {
  background: rgba(124, 58, 237, 0.3);
  color: var(--purple-300);
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 600;
}

.discord-timestamp {
  color: #72767D;
  font-size: 0.75rem;
}

.discord-message-text {
  color: #DCDDDE;
  font-size: 1rem;
  line-height: 1.375;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .discord-mockup {
    border-radius: 12px;
  }

  .discord-avatar {
    width: 32px;
    height: 32px;
  }

  .discord-message-text {
    font-size: 0.95rem;
  }
}
```

### Phone Frame Option (Alternative)

Based on [Flowbite Device Mockups](https://flowbite.com/docs/components/device-mockups/), if a phone frame is desired:

```css
.phone-mockup {
  position: relative;
  width: 280px;
  height: 560px;
  margin: 0 auto;
}

.phone-frame {
  width: 100%;
  height: 100%;
  border: 14px solid var(--gray-900);
  border-radius: 2.5rem;
  background: var(--gray-900);
  position: relative;
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 24px;
  background: var(--gray-900);
  border-radius: 0 0 16px 16px;
  z-index: 10;
}

.phone-screen {
  width: 100%;
  height: 100%;
  border-radius: 1.75rem;
  overflow: hidden;
}
```

**Recommendation:** Use the simpler Discord mockup without phone frame. The existing portal mockup uses a browser-style window (macOS dots), which sets a consistent pattern. Adding a phone frame would introduce visual complexity without adding conversion value.

### Section Background Strategy

Following the existing pattern:
- Proof Section: `var(--purple-50)` (light purple)
- Comparison Section: `var(--white)`
- Trust Section: `var(--white)`
- **Support Section:** `var(--gray-50)` (light gray - creates visual break)
- About Section: `var(--gray-50)`

```css
.support-section {
  background: var(--gray-50);
  position: relative;
}
```

### Supporting Features Grid

```css
.support-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 700px;
  margin: 48px auto 0;
}

.support-feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.support-feature-icon {
  width: 48px;
  height: 48px;
  background: var(--purple-100);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--purple-700);
}

.support-feature-text {
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: var(--gray-700);
  font-weight: 500;
}

@media (max-width: 768px) {
  .support-features {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .support-feature {
    flex-direction: row;
    text-align: left;
  }
}
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Discord styling | Real Discord screenshot | Pure CSS mockup | Faster loads, consistent quality, no privacy concerns |
| Chat animation | Typing indicators, live updates | Static mockup | Complexity without conversion benefit |
| Phone frame | Custom SVG phone | Simple container | Portal mockup doesn't use phone; stay consistent |
| Timestamp logic | Real date/time | Static "9:14 PM" / "9:47 PM" | Shows realistic 33-min response time |
| Avatar images | Generic stock photos | Actual tutor photo (chris.jpg) | Builds recognition from Trust section |

**Key insight:** The mockup should look authentic enough to communicate "this is Discord" but doesn't need to be pixel-perfect. The message content and visible response time (33 minutes) are what matter.

## Common Pitfalls

### Pitfall 1: Making the Discord Screenshot Look Fake
**What goes wrong:** CSS mockup uses wrong colors, spacing, or fonts that feel "off"
**Why it happens:** Guessing Discord's styling instead of researching
**How to avoid:** Use established Discord colors (`#36393F`, `#DCDDDE`), proper message spacing (16px gap), and realistic username patterns
**Warning signs:** Visitors don't recognize it as Discord

### Pitfall 2: Generic Support Messaging
**What goes wrong:** "We have Discord support" instead of "Stuck at 9pm? Help by 10am."
**Why it happens:** Describing feature instead of benefit
**How to avoid:** Lead with the parent concern (child stuck at night), then show the solution
**Warning signs:** Copy reads like a feature list instead of problem-solution

### Pitfall 3: Missing Response Time Proof
**What goes wrong:** Mockup shows conversation but no timestamps
**Why it happens:** Focusing on content over proof
**How to avoid:** Include visible timestamps: "9:14 PM" question, "9:47 PM" response (33-min turnaround)
**Warning signs:** Parents can't see how fast responses actually are

### Pitfall 4: Overly Long Conversation
**What goes wrong:** Showing 5+ messages to prove activity
**Why it happens:** Wanting to show depth of support
**How to avoid:** Two messages is enough: question + helpful answer. Quality over quantity
**Warning signs:** Mockup requires scrolling, dilutes the quick-response message

### Pitfall 5: Anonymous Tutor Response
**What goes wrong:** Tutor avatar is generic/placeholder
**Why it happens:** Not connecting to Trust section
**How to avoid:** Use actual tutor photo (chris.jpg) and name from Trust section
**Warning signs:** Mockup feels disconnected from rest of page

### Pitfall 6: Section Placement Too Late
**What goes wrong:** Support section after Courses/Pricing
**Why it happens:** Treating it as supplementary feature
**How to avoid:** Place after Trust section - completes the "who + how they help" story
**Warning signs:** Visitors miss it before reaching contact form

## Code Examples

### Support Badge (adapt from trust-badge)
```css
/* Source: Adapt from lines 1376-1393 */
.support-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--purple-100);
  color: var(--purple-700);
  padding: 10px 24px;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.support-badge-icon {
  width: 20px;
  height: 20px;
}
```

### Discord Icon SVG
```html
<!-- Discord Logo (simplified) -->
<svg class="support-badge-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
</svg>
```

### Message Exchange Content Recommendation

Based on CONTEXT.md guidance to show math help:

**Student Message:**
```
Can someone help with integration by parts? The one with ln(x) - stuck on Q3 of this week's worksheet
```

**Tutor Response:**
```
For integration by parts with ln(x), set u = ln(x) and dv = x dx. I'll send you the worked solution - check your DMs!
```

**Why this content works:**
1. Mentions specific topic (integration by parts) - shows tutors can help with real HSC content
2. References "this week's worksheet" - connects to custom worksheets feature
3. Response offers actionable help, not just "I'll help later"
4. "Check your DMs" shows personalized follow-up

### Responsive Grid Layout
```css
.support-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 900px) {
  .support-content {
    flex-direction: row;
    justify-content: center;
    gap: 60px;
    align-items: flex-start;
  }

  .discord-mockup {
    flex: 0 1 500px;
  }

  .support-features {
    flex: 0 1 300px;
    margin-top: 0;
  }
}
```

## Messaging Recommendations

### Headline Options
| Option | Rationale |
|--------|-----------|
| "Stuck at 9pm? Help by 10am." | Parent concern + concrete promise (per CONTEXT.md) |
| "Never Let Your Child Stay Stuck" | Emotional appeal, parent protection instinct |
| "Homework Help, Any Hour" | Functional but less compelling |

**Recommendation:** "Stuck at 9pm? Help by 10am." - it's specific, memorable, and creates a testable claim.

### Supporting Copy
```
Your child isn't alone between classes. Our tutors respond to homework questions
in our private Discord - usually within hours, always by the next morning.
```

**Key elements:**
- "Your child isn't alone" - addresses parent's emotional concern
- "between classes" - clarifies it's not replacing lessons
- "usually within hours" - honest about typical response
- "always by the next morning" - hard guarantee (the 10am promise)
- "private Discord" - security reassurance

### Feature Points
1. **Responses within hours, not days** - differentiates from email support
2. **Private server - BEAM students only** - security, exclusivity
3. **Same tutors who teach your classes** - not outsourced, continuity

## Section Placement Rationale

**Position: After Trust Section, Before About**

Narrative flow:
1. **Trust:** "Who are these tutors?" -> Baulko grads, 95%+, Medicine students
2. **Support:** "How do they help beyond class?" -> Discord availability
3. **About:** "What is BEAM?" -> Company overview

This positions Discord support as an extension of the tutor relationship established in Trust, rather than as a standalone feature.

**Alternative considered:** After Comparison Section

Rationale against: The Comparison table already mentions Discord (line 5599). Placing the Support section immediately after would feel repetitive. Better to let Trust section establish tutor credibility first.

## Open Questions

1. **Real vs. Representative Exchange**
   - What we know: Need to show realistic help exchange
   - What's unclear: Should we use a real conversation from Discord?
   - Recommendation: Use representative content (the integration by parts example). Real conversations may have typos, unclear context, or privacy concerns. Representative content can be crafted for clarity.

2. **Tutor in Mockup**
   - What we know: Should use real tutor photo for authenticity
   - What's unclear: Which tutor?
   - Recommendation: Chris Kim (Head of Mathematics) - highest profile tutor, photo already optimized (19KB)

3. **Discord Link Placement**
   - What we know: Footer has Discord link (line 6748)
   - What's unclear: Should Support section have its own Discord CTA?
   - Recommendation: No direct Discord link. Section drives to Book Free Trial CTA. Discord access comes after enrollment.

## Sources

### Primary (HIGH confidence)
- `C:\Users\bskim\beamacademy-site\index.html` - Direct file analysis (existing mockup patterns lines 801-919, section structure, Discord mentions)
- `C:\Users\bskim\beamacademy-site\.planning\phases\10-support-section\10-CONTEXT.md` - User decisions and requirements
- `C:\Users\bskim\beamacademy-site\.planning\phases\07-proof-section\07-RESEARCH.md` - Design system reference
- `C:\Users\bskim\beamacademy-site\.planning\phases\09-trust-section\09-RESEARCH.md` - Section pattern reference

### Secondary (MEDIUM confidence)
- [wc-discord-message GitHub](https://github.com/Danktuary/wc-discord-message) - Discord message component structure and styling patterns
- [CodePen Discord Mockup](https://codepen.io/odensc/pen/vxpMPp) - Discord CSS color variables and layout patterns
- [Flowbite Device Mockups](https://flowbite.com/docs/components/device-mockups/) - Phone frame CSS patterns (considered but not recommended)
- [Landing Page Best Practices 2026](https://www.involve.me/blog/landing-page-best-practices) - Support section design principles
- [daisyUI Phone Mockup](https://daisyui.com/components/mockup-phone/) - Alternative phone frame approach

### Tertiary (LOW confidence - general patterns)
- [Instapage Tutoring Landing Pages](https://instapage.com/en/functionality/create-your-landing-page-for-tutoring-centers) - Tutoring page section recommendations
- [Unicorn Platform Education Templates](https://unicornplatform.com/blog/stunning-landing-page-templates-for-education/) - Education landing page patterns

## Metadata

**Confidence breakdown:**
- CSS patterns: HIGH - Existing codebase patterns analyzed, Discord colors verified
- Section structure: HIGH - Follows established patterns from phases 7-9
- Content recommendations: MEDIUM - Based on requirements and best practices
- Placement decision: HIGH - Logical narrative flow verified

**Research date:** 2026-01-23
**Valid until:** Stable (static HTML site, Discord UI rarely changes)

---
*Research completed: 2026-01-23*
