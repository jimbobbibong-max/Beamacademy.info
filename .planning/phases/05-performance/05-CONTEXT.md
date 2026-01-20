# Phase 5: Performance - Context

**Gathered:** 2026-01-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Optimize page load speed and visual stability on mobile. This phase covers image optimization, critical CSS, lazy loading, and layout shift prevention. The goal is LCP under 2.5s on 4G and CLS under 0.1.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

User requested comprehensive research and best-practice implementation for all technical areas:

**Image handling:**
- Format choices (WebP, AVIF, fallbacks)
- Lazy loading threshold and strategy
- Placeholder approach (blur-up, LQIP, solid color)
- Above-fold vs below-fold treatment

**Critical CSS strategy:**
- What CSS is "above fold" for mobile
- Inline critical CSS approach
- Unused CSS handling
- CSS loading strategy

**Loading sequence:**
- Font loading strategy (swap, block, optional)
- Script deferral and async patterns
- Resource hints (preload, prefetch, preconnect)
- Priority ordering

**Layout stability:**
- Aspect ratio preservation
- Explicit dimension requirements
- Image/video placeholder dimensions
- Font fallback sizing

Claude should research current best practices (2025-2026) and implement the most appropriate solution for a single-page marketing site targeting mobile Google Ads traffic.

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard best-practice approaches.

Key constraints from existing work:
- Single HTML file structure (from previous phases)
- Mobile-first approach (320px-428px primary target)
- Google Ads traffic (fast mobile connections, but optimize for 4G baseline)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-performance*
*Context gathered: 2026-01-20*
