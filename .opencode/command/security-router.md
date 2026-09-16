---
description: Recommend the best cybersecurity assessment command and skills for a requested scope without performing the full assessment.
agent: cybersecurity
---

Recommend the most relevant read-only cybersecurity assessment command and skills for the requested scope. Do not perform the full assessment unless the user explicitly asks for it after the recommendation.

User scope or instructions:

`$ARGUMENTS`

Router requirements:

1. Identify the primary assessment intent, likely assets, relevant frameworks, and ambiguity in the requested scope.
2. Recommend one primary command from `security-assessment`, `security-appsec`, `security-ai`, `security-supply-chain`, or `security-vuln-triage`.
3. Recommend the smallest useful skill set from the cybersecurity library.
4. Ask at most three clarifying questions only when the scope is too ambiguous to route confidently.
5. Do not inspect large parts of the repository, modify files, install dependencies, alter git state, or run mutating commands.
6. Do not provide exploit payloads, credential theft guidance, persistence, evasion, fraud execution guidance, destructive operations, or unauthorized scanning instructions.

Routing hints:

| User intent | Recommended command | Primary skills |
|---|---|---|
| Web, API, service, auth, authorization, input validation, secrets, mobile | `security-appsec` | `owasp-appsec`, `mobile-appsec`, `vulnerability-risk-prioritization` |
| LLM, RAG, model, agent, prompt, MCP, plugin, tool, AI data | `security-ai` | `owasp-genai-security`, `mitre-atlas-2026`, `nist-ai-rmf-10` |
| Dependencies, CI/CD, release, provenance, SBOM, artifact trust | `security-supply-chain` | `software-supply-chain-security`, `vulnerability-risk-prioritization`, `cis-hardening` |
| CVE, CWE, scanner finding, advisory, patch backlog, exploitability | `security-vuln-triage` | `vulnerability-risk-prioritization`, `software-supply-chain-security`, `owasp-appsec` |
| Broad posture, governance, controls, incident, detection, hardening | `security-assessment` | Choose from `nist-csf-20`, `nist-cyber-risk`, `mitre-attack-v19`, `mitre-attack-detection`, `cis-hardening`, `mitre-d3fend-countermeasures` |

Output format:

| Recommendation | Value |
|---|---|
| Primary command | Command name and example invocation with the user's scope |
| Primary skills | Skill names |
| Secondary skills | Skill names or `None` |
| Why this route | Short rationale |
| Clarifying questions | Questions or `None` |
