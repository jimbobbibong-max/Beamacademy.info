# ⚠️ MANDATORY: RELATIVE PATHS ONLY ⚠️

**Claude MUST use RELATIVE paths for ALL Read and Edit operations. Absolute paths cause "file unexpectedly modified" errors.**

```
✅ CORRECT (relative to working directory):
   .planning/ROADMAP.md
   index.html
   assets/images/logo.png

❌ WRONG (absolute paths - WILL CAUSE ERRORS):
   C:/Users/bskim/beamacademy-site/index.html
   C:/Users/bskim/beamacademy-site/.planning/ROADMAP.md
```

**Rules:**
1. NEVER use `C:/Users/...` paths in Read or Edit tools
2. ALWAYS use paths relative to the current working directory
3. Use the EXACT same relative path for both Read and Edit
4. If you get "file unexpectedly modified" error, re-read with relative path

**Why this matters:** Absolute paths with forward slashes on Windows cause file handle conflicts that trigger the "file has been modified since read" error repeatedly. Using relative paths eliminates this issue.

---

# BEAM Academy Site - Development Guide for AI Assistants

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

---

## MANDATORY: Use Bash for File Writes

**NEVER use the Write tool. It causes persistent "file not read" errors.**

Always use Bash with heredoc instead:

```bash
cat > path/to/file.js << 'ENDOFFILE'
file contents here
ENDOFFILE
```

For files with backticks or complex syntax, use a node script:
```bash
node -e "require('fs').writeFileSync('path/to/file.js', \`content here\`)"
```

This applies to creating new files AND overwriting existing files.
