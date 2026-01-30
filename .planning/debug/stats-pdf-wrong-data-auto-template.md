---
status: investigating
trigger: "Auto-template submission showing completely wrong data in Stats PDF, Worksheet, and Answer Key"
created: 2026-01-24T00:00:00Z
updated: 2026-01-24T01:00:00Z
---

## Current Focus

hypothesis: THREE DISTINCT ROOT CAUSES CONFIRMED - see Evidence section
test: Code analysis complete
expecting: N/A - root causes found
next_action: Return checkpoint with root causes and recommended fixes

## Symptoms

expected:
1. Stats PDF: Should show 0% for all topics since student submitted a blank paper (scored 0/100)
2. Worksheet: Should show 4U (Extension 2) subskills as weaknesses, not Y8/Y10 algebra subskills
3. Answer Key: Should show working out from QuestionBank2 for the questions pulled into the worksheet

actual:
1. Stats PDF shows: "Inverse Functions 100% Mastered, One-to-One Functions 100% Mastered, Inverse Verification 100% Mastered..." etc - completely wrong percentages for a blank submission
2. Worksheet contains Y8 algebra subskills, Y10 subskills mixed in - completely wrong year level/course
3. Answer key not showing working from QuestionBank2

errors: No visible errors - just wrong data being displayed
reproduction: View Stats PDF for submission PP-1769214446454-3l2ogi (Minseok's blank 2025 4U paper)
started: Auto-template submission - data appears to be pulled from wrong source

## Key Context

- Submission ID: PP-1769214446454-3l2ogi
- Student: Minseok Kim (BEAM-K8MX-9WNP)
- Paper: 2025-hsc-maths-extension-2 (blank submission, 0/100)
- The stats being shown appear to be from DIFFERENT submissions or student's overall profile
- Google Sheets ID: 1FlLFpCGThDe_vOTi4Jt9Cvn9pynAAnH_aZVC-_pe8rM

## Eliminated

(none - all hypotheses confirmed)

## Evidence

### Evidence 1: Stats PDF - Wrong Topic Scores Source
- timestamp: 2026-01-24T01:00:00Z
- checked: `C:/Users/bskim/beam-portal/netlify/functions/view-maths-paper-stats-pdf.js` lines 1096-1138
- found: The function fetches topic scores from `_DetailedScores` sheet but filters ONLY by `studentCode`, NOT by `submissionId`:
  ```javascript
  const studentRecords = scoresRows.slice(1).filter(row => row[0] === studentCode);
  ```
  This pulls ALL scores for that student across ALL their submissions, not just THIS submission's scores.
- implication: If the student has done other papers and scored well on those, those scores are being shown. The "100% Mastered" stats are from Minseok's OTHER submissions, not this blank 2025 4U paper.

### Evidence 2: Worksheet - Correct Filter BUT Topic Matching Issue
- timestamp: 2026-01-24T01:00:00Z
- checked: `C:/Users/bskim/beam-portal/netlify/functions/view-maths-paper-worksheet-pdf.js` lines 340-395
- found: The worksheet DOES filter `_QuestionPartScores` correctly by both `studentCode` AND `submissionId` (line 342-343):
  ```javascript
  const submissionParts = partsRows.slice(1).filter(row =>
    row[0] === studentCode && row[1] === submissionId
  );
  ```
  HOWEVER, the `getQuestionsForWorksheet` function in `notion-helpers.js` uses the OLD QuestionBank database (line 4):
  ```javascript
  const QUESTION_BANK_DATABASE_ID = 'df5531ff-4a59-4f91-b90d-e3497b68ec69'  // Legacy database!
  ```
  And the topic matching (lines 458-473) uses bidirectional matching that can match Y8 "Algebraic Techniques" to Extension 2 topics if the SubskillCodes from the template don't have exact matches in QuestionBank.
- implication: The worksheet is fetching from the LEGACY QuestionBank (not QuestionBank2) and the topic matching is too broad, pulling wrong year level questions.

### Evidence 3: Answer Key - Shows Template Answers, Not QuestionBank2 WorkingOut
- timestamp: 2026-01-24T01:00:00Z
- checked: `C:/Users/bskim/beam-portal/netlify/functions/view-paper-answer-key.js` lines 293-335
- found: The answer key is designed to show the original paper answers from `_PaperTemplates.AnswerKey` (the Opus self-solving output), NOT the WorkingOut from QuestionBank2 for the worksheet questions. It fetches:
  1. `_VisionProcessingJobs` to get `templateId`
  2. `_PaperTemplates.AnswerKey` (column H) for the original paper's answer key
  This is by design for the PAPER answer key, but the user expects the WORKSHEET answer key (with WorkingOut from QuestionBank2).
- implication: There are TWO different answer keys needed:
  1. Paper Answer Key (current) - shows answers to the original paper questions
  2. Worksheet Answer Key (missing) - should show WorkingOut from QuestionBank2 for the pulled questions

### Evidence 4: Generate-Adaptive-Worksheet Uses Correct QuestionBank2
- timestamp: 2026-01-24T01:00:00Z
- checked: `C:/Users/bskim/beam-portal/netlify/functions/generate-adaptive-worksheet.js` and `notion-helpers.js` lines 676-888
- found: The `getQuestionsForSubskills` function (lines 821-888) correctly uses QuestionBank2:
  ```javascript
  const QUESTION_BANK_2_DATABASE_ID = '42676c7609fb41cd9dfd0a8870ca3e44'
  ```
  BUT `getQuestionsForWorksheet` (called by view-maths-paper-worksheet-pdf.js) uses the LEGACY QuestionBank.
- implication: There's a mismatch - generate-adaptive-worksheet uses QuestionBank2, but view-maths-paper-worksheet-pdf uses the legacy QuestionBank via getQuestionsForWorksheet.

## Resolution

root_cause: THREE DISTINCT BUGS:

1. **Stats PDF (view-maths-paper-stats-pdf.js line 1108):**
   - `_DetailedScores` query filters only by `studentCode`, not `submissionId`
   - Shows cumulative stats across ALL student submissions instead of THIS submission only

2. **Worksheet (view-maths-paper-worksheet-pdf.js via notion-helpers.js):**
   - `getQuestionsForWorksheet` uses LEGACY QuestionBank database, not QuestionBank2
   - Topic matching is too broad, allowing cross-year-level matches

3. **Answer Key (view-paper-answer-key.js):**
   - Shows original paper answer key (from template), not worksheet answer key
   - Worksheet questions don't have their WorkingOut displayed anywhere

fix: (pending user decision on fix approach)

verification: (pending)

files_changed: []
