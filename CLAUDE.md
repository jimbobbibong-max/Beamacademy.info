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

## Project Structure

- **Main file**: `C:\Users\bskim\Downloads\beamacademy-index.html` (user previews from Downloads)
- **Planning**: `C:\Users\bskim\beamacademy-site\.planning\`
- **Working dir**: `C:\Users\bskim\beamacademy-site\`

Always edit the Downloads copy for the main site file.
