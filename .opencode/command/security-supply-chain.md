---
description: Run a read-only software supply chain assessment for dependencies, CI/CD, provenance, SBOM, and release integrity.
agent: cybersecurity
---

Run a read-only software supply chain security assessment for the requested repository, package ecosystem, build pipeline, dependency set, release process, artifact, or SBOM scope.

User scope or instructions:

`$ARGUMENTS`

Required skills:

- `software-supply-chain-security`
- `vulnerability-risk-prioritization` when dependency advisories, CVEs, OSV findings, scanner results, or patch prioritization appear
- `cis-hardening` when runner, build host, container, or platform hardening appears

Assessment requirements:

1. Confirm scope, authorization boundary, package ecosystems, build/release assets, trust boundaries, and assumptions.
2. Inspect package manifests, lockfiles, CI workflows, dependency update configuration, artifact generation, release signing, provenance, SBOM, secrets handling, and runner permissions before drawing conclusions.
3. Map findings to NIST SSDF, SLSA, OpenSSF Scorecard, SBOM practices, SPDX, CycloneDX, OSV, CVSS, EPSS, CISA KEV, CIS, or CWE where applicable.
4. Do not modify files, install dependencies, write reports into the repository, alter git state, or run mutating commands.
5. Before requesting any shell command, state the exact command, why it is needed, and what security question it answers.
6. Report findings first, ordered by supply chain impact, exploitability, blast radius, and remediation urgency.

Output format:

| Severity | Finding | Evidence | Supply chain mapping | Impact | Recommendation | Validation | Residual risk |
|---|---|---|---|---|---|---|---|

If no findings are discovered, state that explicitly and list residual risks, assumptions, and testing gaps.
