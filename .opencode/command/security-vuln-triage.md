---
description: Run a read-only vulnerability triage for CVEs, CWEs, scanner findings, advisories, patches, and exploitability.
agent: cybersecurity
---

Run a read-only vulnerability triage for the requested CVEs, CWEs, scanner findings, dependency advisories, package versions, affected components, or remediation backlog.

User scope or instructions:

`$ARGUMENTS`

Required skills:

- `vulnerability-risk-prioritization`
- `software-supply-chain-security` when vulnerable dependencies, package provenance, or dependency update risk appears
- `owasp-appsec` when the vulnerability is application, API, authentication, authorization, input validation, or service behavior related

Assessment requirements:

1. Confirm scope, authorization boundary, affected assets, versions, exposure, business context, and assumptions.
2. Inspect relevant manifests, lockfiles, configuration, scanner output supplied by the user, code paths, reachable components, and compensating controls before drawing conclusions.
3. Prioritize using applicability, reachability, exploitability, exposure, asset criticality, patch availability, CVSS, EPSS, CISA KEV, CWE, NVD, OSV, and vendor advisory signals where available.
4. Do not modify files, install dependencies, write reports into the repository, alter git state, or run mutating commands.
5. Do not provide exploit payloads or step-by-step exploit execution guidance.
6. Before requesting any shell command, state the exact command, why it is needed, and what security question it answers.
7. Report triage decisions first, ordered by remediation priority.

Output format:

| Priority | Vulnerability | Evidence | Applicability | External signals | Impact | Recommended action | Validation | Residual risk |
|---|---|---|---|---|---|---|---|---|

If no actionable vulnerability is confirmed, state that explicitly and list residual risks, assumptions, and missing evidence.
