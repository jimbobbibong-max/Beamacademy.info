# Phase 23: Visual Polish & Motion - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Apply Frontend Design Skill critique recommendations to create bolder visual differentiation and add motion. Specifically: increased hero tilt, texture/accents to break purple monotony, grid-breaking elements, dramatic CTA styling, and page load animations with scroll reveals.

Source: Frontend Design Skill critique after Phase 21.1 completion.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion — Full Research Authority

User delegated all implementation decisions to Claude with research. The following areas should be researched and best approaches determined:

**1. Hero Tilt & Grid-Breaking**
- Critique suggests -6deg rotation for "Climb" (currently -2deg is "timid")
- Research: What rotation feels bold but readable?
- Research: Should hero mockup overflow container? How much?

**2. Background Texture & Color Accents**
- Critique suggests subtle grain/noise for depth
- Critique suggests breaking purple monotony with warm accent (gold #f59e0b or coral #f97316) OR a dark section
- Research: CSS techniques for subtle grain overlay
- Research: Where accent color would have most impact without clashing
- Note: Lime accent was previously rejected (see STATE.md decisions)

**3. Page Load Animation**
- Critique suggests: page load animation, scroll reveals, staggered entrances
- Research: Performance-conscious animation approaches
- Research: Intersection Observer vs CSS-only scroll animations
- Research: Appropriate timing/easing for editorial feel

**4. CTA Styling & Micro-Interactions**
- Critique suggests: White button with brutalist offset shadow instead of purple-on-purple
- Research: Brutalist shadow techniques that work with current design system
- Research: Hover state animations appropriate for conversion elements

</decisions>

<specifics>
## Specific Ideas

**From Frontend Design Skill Critique:**
1. "Increase hero 'Climb' rotation to -6deg (currently -2deg is timid)"
2. "Add warm accent (gold #f59e0b or coral #f97316) or dark section" — but user previously rejected lime, so warm tones only
3. "Subtle grain/noise to backgrounds for depth"
4. "Let hero mockup overflow container, asymmetric elements"
5. "White button with brutalist offset shadow instead of purple-on-purple"
6. "Page load animation, scroll reveals, staggered entrances"

**Existing Design System Constraints:**
- Fraunces + Bricolage Grotesque typography (Phase 21.1)
- Purple with glow CTAs established (lime rejected)
- Asymmetric trust-tutors grid already implemented (Phase 22)
- Mobile sticky CTA with contact form observer (Phase 22)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 23-visual-polish-motion*
*Context gathered: 2026-01-30*
