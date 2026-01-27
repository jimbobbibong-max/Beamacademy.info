# ⚠️ WINDOWS PATH RULE (MANDATORY - EVERY FILE OPERATION)

**Use complete absolute Windows paths with drive letters and backslashes for ALL file operations.**

✅ `C:\Users\bskim\beamacademy-site\index.html`
❌ `./index.html` | `index.html` | `/index.html`

Applies to: Read, Write, Edit, MultiEdit, Create, Delete, Move, Copy

---

# BEAM Academy Site - Development Guide for AI Assistants

## CRITICAL: Windows Path Format for File Operations

**Always use complete absolute Windows paths with drive letters and backslashes for ALL file operations.**

Example:
- ✓ `C:\Users\bskim\beamacademy-site\index.html`
- ✗ `index.html`
- ✗ `./index.html`

This prevents the "File has been unexpectedly modified" bug in Claude Code.

---

## CRITICAL: Never Use 8.8.8.8

**NEVER use 8.8.8.8 (Google DNS) in any scripts, commands, or network checks.** This crashes the user's machine.

---

## Codebase Navigation: Codemap

**Use `/codemap:codemap` for efficient codebase exploration.**

Codemap creates structural indexes that reduce token consumption by 60-80%. Use it when:
- Finding symbol definitions (classes, functions, sections)
- Exploring file structure
- Locating code by name

```
/codemap:codemap "find pricing section"
/codemap:codemap "where is the hero component"
/codemap:codemap "list all CSS classes"
```

Prefer codemap over manual Grep/Glob chains for exploration tasks.

---

## Project Structure

- **Main file**: `C:\Users\bskim\Downloads\beamacademy-index.html` (user previews from Downloads)
- **Planning**: `C:\Users\bskim\beamacademy-site\.planning\`
- **Working dir**: `C:\Users\bskim\beamacademy-site\`

Always edit the Downloads copy for the main site file.
