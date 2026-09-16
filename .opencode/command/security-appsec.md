---
description: Run a read-only application, API, or mobile security assessment using OWASP-focused skills.
agent: cybersecurity
---

Run a read-only application security assessment for the requested application, API, service, or mobile scope.

User scope or instructions:

`$ARGUMENTS`

Required skills:

- `owasp-appsec`
- `mobile-appsec` when Android, iOS, hybrid, mobile API, or mobile privacy scope appears
- `vulnerability-risk-prioritization` when CVEs, dependency advisories, scanner findings, or CWE prioritization appear

Assessment requirements:

1. Confirm scope, authorization boundary, application trust boundaries, data sensitivity, and assumptions.
2. Inspect relevant routes, controllers, APIs, authentication, authorization, input handling, output handling, secrets, storage, dependencies, logging, and deployment configuration before drawing conclusions.
3. Map findings to OWASP Top 10, OWASP API Security, ASVS, SAMM, MASVS, MASWE, MASTG, CWE, or CVSS where applicable.
4. Do not modify files, install dependencies, write reports into the repository, alter git state, or run mutating commands.
5. Before requesting any shell command, state the exact command, why it is needed, and what security question it answers.
6. Report findings first, ordered by severity and exploitability.

Output format:

| Severity | Finding | Evidence | OWASP/CWE mapping | Impact | Recommendation | Validation | Residual risk |
|---|---|---|---|---|---|---|---|

If no findings are discovered, state that explicitly and list residual risks, assumptions, and testing gaps.
