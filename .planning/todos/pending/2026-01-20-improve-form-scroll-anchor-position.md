---
created: 2026-01-20T13:13
title: Improve form scroll anchor position
area: ui
files:
  - index.html
---

## Problem

During UAT for Phase 2, when tapping "Book Free Trial" in the sticky CTA bar, the page scrolls to the contact form but the positioning is slightly off - the form appears "a little bit underneath" with information showing directly under the heading.

The scroll anchor may not account for the sticky bar height, causing the form to be partially obscured or awkwardly positioned.

## Solution

TBD - Options to consider:
- Add scroll-margin-top to #contact section to account for sticky elements
- Adjust the anchor target point
- Use JavaScript scrollIntoView with offset
