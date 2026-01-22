# Phase 7: Proof Section - Context

**Gathered:** 2026-01-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Show parents concrete evidence of what they get from ONE free trial — 4 documents visualized with previews, "yours to keep" messaging, and topic gap analysis. This section proves the diagnostic value before asking for commitment.

</domain>

<decisions>
## Implementation Decisions

### The 4 Documents
The free trial produces these 4 documents:
1. **Diagnostic Worksheet** — the actual questions/problems to solve
2. **Answer Key** — quick answers for checking work (Q1-Q20 style list)
3. **Worked Solutions** — full explanations with step-by-step working
4. **Progress Report** — stats infographic (scores, trends, skill growth, topic breakdown)

### Document Presentation
- **Layout:** Hybrid 2x2 grid with expandable detail
  - All 4 documents visible at once (reinforces "4 from ONE trial" message)
  - Tap/click to expand for more detail
- **Thumbnail style:** Realistic mockups styled like actual PDF previews with visible content snippets
- **Content:** Real fabricated data — believable fake student data that feels authentic
  - Use the existing Progress Report template (87%, +22% improvement, topic breakdown)
  - Create representative worksheet/solutions/answer key previews

### Visual Hierarchy
- **Primary focus:** Documents grid is the visual centerpiece — "look at all this"
- **Headline style:** Outcome-focused — "See exactly where they're struggling" (connects to parent concerns from hero)
- **Section style:** Contained section with distinct background/card — clearly separates from hero and next section

### Topic Gap Insight
- **Key insight is TOPIC gaps, not MCQ vs Written** — where specifically are they weak?
- **Visualization:** Part of the Progress Report mockup itself (not a separate chart)
- **Callout:** "The gap most parents miss" positioned near Progress Report thumbnail
- **Data story:** Show BOTH current weak spots AND improvement trend
  - Example: "Proofs: 45% → 68%" shows gap identified AND fixed
  - Focus Areas section shows current targets
- **Gap size:** Realistic (15-20% differences between topics) — believable, not exaggerated

### "Yours to Keep" Messaging
- **Language:** Explicit "free trial" — "From ONE free trial" or similar
- **CTA:** Sticky CTA only — no separate section button (cleaner, less salesy)

### Claude's Discretion
- Expand behavior (modal/lightbox vs inline expand) — pick based on mobile UX
- Element order within section (headline → documents → reassurance, or other)
- "Yours to keep" prominence and tone (badge, headline integration, or footnote)
- Exact typography, spacing, colors to match existing design system

</decisions>

<specifics>
## Specific Ideas

- Progress Report mockup should use the existing `style4_infographic_returning_v4.pdf` template as reference — purple header, skill growth table, performance trend chart
- Answer Key mockup should show the Q1-Q20 style list format
- The "hidden gap" insight is about TOPICS (Calculus, Proofs, Probability) not question FORMAT (MCQ vs Written) — this is what makes BEAM's tracking valuable

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 07-proof-section*
*Context gathered: 2026-01-23*
