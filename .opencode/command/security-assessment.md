---
description: Run a read-only cybersecurity assessment using the cybersecurity agent and framework-mapped skills.
agent: cybersecurity
---

Run a read-only cybersecurity assessment for the requested scope.

User scope or instructions:

`$ARGUMENTS`

Assessment requirements:

1. Confirm the assessment scope, assumptions, and authorization boundary.
2. Inspect the relevant code, configuration, documentation, dependencies, and OpenCode files before drawing conclusions.
3. Load and apply the most relevant cybersecurity skills from `.opencode/skills/cybersecurity`.
4. Map findings to relevant frameworks such as OWASP, MITRE ATT&CK, NIST CSF, MITRE ATLAS, MITRE D3FEND, NIST AI RMF, MITRE F3, CIS, or Cyber Kill Chain.
5. Do not modify project files, install dependencies, alter git state, write reports into the repository, or run mutating commands.
6. Before requesting any shell command, state the exact command, why it is needed, and what security question it answers.
7. Report findings first, ordered by severity.

Output format:

| Severity | Finding | Evidence | Impact | Framework mapping | Recommendation | Validation | Residual risk |
|---|---|---|---|---|---|---|---|

If no findings are discovered, state that explicitly and list residual risks, assumptions, and testing gaps.
