---
created: 2026-01-20T13:13
title: Fix skip to main content button styling
area: ui
files:
  - index.html
---

## Problem

During UAT for Phases 1-2, user noted the "Skip to main content" accessibility button is "halfway there" on mobile - appears to be partially visible or incorrectly positioned when it should be hidden until focused.

This is a standard accessibility pattern where the button should be visually hidden but appear when keyboard users tab to it.

## Solution

TBD - Review the skip link CSS:
- Should be positioned off-screen by default
- Should become visible on :focus
- Check if mobile styles are interfering with the hidden state
