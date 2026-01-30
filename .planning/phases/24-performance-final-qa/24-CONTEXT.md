# Phase 24: Performance Verification & Final QA - Context

**Gathered:** 2026-01-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Verify that v7's comprehensive frontend redesign (Phases 20-23) didn't break performance, accessibility, or cross-browser compatibility. Final quality gate before shipping milestone v7.

This phase runs audits and tests — it does NOT add new features or refactor code. Issues found are either fixed or documented for future phases.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion (All Areas)

User requested best-practices approach for all QA decisions. Claude has full discretion to:

**Performance Thresholds:**
- Set Lighthouse score targets (industry standard: 90+ for Performance, Accessibility, Best Practices)
- Define Core Web Vitals targets (LCP < 2.5s, CLS < 0.1, FID < 100ms)
- Choose audit tools (Lighthouse, PageSpeed Insights, WebPageTest)

**Browser/Device Matrix:**
- Define which browsers must pass (Chrome, Safari, Firefox, Edge — latest 2 versions)
- Define mobile testing scope (iOS Safari, Android Chrome)
- Set viewport breakpoints for responsive testing (mobile 375px, tablet 768px, desktop 1280px+)

**Accessibility Scope:**
- Apply WCAG 2.1 AA standard (industry baseline)
- Prioritize: keyboard navigation, color contrast, semantic HTML, alt text
- Use axe DevTools or Lighthouse accessibility audit

**Issue Triage:**
- Blocker: Anything that breaks core conversion flow (CTA not clickable, form broken, payment broken)
- Blocker: WCAG AA failures on critical elements
- Blocker: Performance scores below 70
- Fix-later: Edge cases, minor visual glitches, browser-specific quirks that don't affect function
- Acceptable: Scores 70-89 with documented reason (e.g., external script impact)

</decisions>

<specifics>
## Specific Ideas

No specific requirements — Claude applies industry-standard best practices throughout.

Reference standards:
- Google's Core Web Vitals thresholds
- WCAG 2.1 AA compliance
- Modern browser support (last 2 versions, no IE11)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 24-performance-final-qa*
*Context gathered: 2026-01-30*
