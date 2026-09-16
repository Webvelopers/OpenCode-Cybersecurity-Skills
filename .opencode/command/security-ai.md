---
description: Run a read-only AI, LLM, RAG, agent, or model security assessment using AI security skills.
agent: cybersecurity
---

Run a read-only AI security assessment for the requested AI, ML, LLM, RAG, agent, plugin, tool, model, dataset, or evaluation scope.

User scope or instructions:

`$ARGUMENTS`

Required skills:

- `owasp-genai-security`
- `mitre-atlas-2026`
- `nist-ai-rmf-10`
- `software-supply-chain-security` when model, data, prompt, plugin, tool, CI/CD, dependency, or artifact provenance risk appears

Assessment requirements:

1. Confirm scope, authorization boundary, AI assets, users, tools, data sources, model dependencies, and assumptions.
2. Inspect prompts, system instructions, tool permissions, RAG retrieval paths, data handling, output controls, model configuration, evaluation approach, logging, and deployment controls before drawing conclusions.
3. Map findings to OWASP GenAI LLM Top 10, MITRE ATLAS, NIST AI RMF, NIST SSDF, SLSA, or OpenSSF where applicable.
4. Do not modify files, install dependencies, write reports into the repository, alter git state, or run mutating commands.
5. Do not generate exploit payloads, bypass instructions, credential theft guidance, persistence, evasion, or destructive steps.
6. Before requesting any shell command, state the exact command, why it is needed, and what security question it answers.
7. Report findings first, ordered by severity, likelihood, model/data impact, and exposure.

Output format:

| Severity | Finding | Evidence | AI security mapping | Impact | Recommendation | Validation | Residual risk |
|---|---|---|---|---|---|---|---|

If no findings are discovered, state that explicitly and list residual risks, assumptions, and testing gaps.
