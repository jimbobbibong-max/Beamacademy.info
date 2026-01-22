# Phase 8: Comparison Section - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Crystallize the difference between generic tutoring and BEAM in a single visual scan. Parents can compare and immediately understand why BEAM is different — through concrete contrasts, not claims.

**Requirements:**
- COMP-01: Generic vs BEAM side-by-side comparison table
- COMP-02: Specific contrasts shown (vague feedback vs precise data, same worksheets vs custom)

</domain>

<decisions>
## Implementation Decisions

### Comparison structure
- **Two-column table format** — Best for "us vs them" where the contrast is specificity vs vagueness
- **5 rows maximum** — Cognitive load research shows 5-7 rows max before overwhelming
- **"What You Hear" vs "What BEAM Shows You"** as column headers — Frames as helpful insight, not attack
- **Stacked cards on mobile** — Each contrast as standalone card, no accordion (visible by default)

### Contrast messaging
- **Row order by impact** (highest contrast first, anchoring effect):
  1. Feedback specificity: "Your child is doing fine" vs "78% overall - priority: trigonometry word problems"
  2. Materials personalization: "Same worksheets for everyone" vs "Custom worksheets targeting YOUR child's gaps"
  3. Progress tracking: "We'll work on weak areas" vs "Dashboard showing exactly which topics need work"
  4. Between-session support: "Wait until next lesson for help" vs "Discord support - stuck at 9pm, help by 10am"
  5. Trial deliverables: "One free lesson to try" vs "4 personalized PDFs + portal access (yours to keep)"
- **Use "Generic Tutoring" not competitor names** — Avoid combative tone
- **Specific numbers in BEAM column** — "78%", "15-20 questions" - specificity IS the comparison

### Visual treatment
- **Generic column:** Neutral gray background (#f5f5f5), muted text (#666), italic for vague statements
- **BEAM column:** Light purple tint (#f8f5ff), 2px purple border top, strong black text (#1a1a1a), bold for specific data
- **No red/negative colors on generic column** — Appears aggressive, erodes trust
- **Optional small checkmarks** — Green for BEAM specifics, but specificity of content is the real visual difference
- **No "Best Choice" or "Winner" badges** — Too salesy; "The BEAM Difference" as subtle label if needed

### Section context
- **Headline:** "Not All Tutoring is the Same"
- **Subhead:** "See why specific beats generic"
- **Position:** After Proof section (Phase 7), before Trust section (Phase 9) — Proof establishes what BEAM delivers, Comparison crystallizes why that's different
- **No CTA in this section** — Let comparison speak, CTA comes later

### Claude's Discretion
- Exact spacing and padding (minimum 16px)
- Zebra striping vs solid backgrounds
- Icon treatment (checkmarks optional)
- Animation (probably none — distracting per research)
- Exact mobile breakpoint for card switch

</decisions>

<specifics>
## Specific Ideas

- Let specificity speak for itself — "78% overall, weak on trig word problems" vs "doing well" IS the entire pitch
- Frame around BEAM strengths, not competitor weaknesses — helpful, not combative
- "What You Hear" column should be realistically generic (not strawman) — these are actual things tutors say
- Use "YOUR" to personalize ("YOUR child's gaps") in BEAM column
- No additional explanation needed after the table — the contrast is self-evident

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-comparison-section*
*Context gathered: 2026-01-23*
