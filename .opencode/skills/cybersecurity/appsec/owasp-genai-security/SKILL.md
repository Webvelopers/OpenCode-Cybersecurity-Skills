---
name: owasp-genai-security
description: "OWASP GenAI, LLM Top 10, prompt injection, agentic AI: Use when reviewing generative AI, LLM, RAG, agent, plugin, tool, or model application risks."
license: MIT
metadata:
  framework: "OWASP GenAI Security Project"
  target_version: "OWASP GenAI LLM Top 10 2026"
  source: "https://genai.owasp.org"
  domain: "cybersecurity"
  subdomain: "genai-application-security"
  tags: "owasp-genai,llm,rag,agentic-ai,prompt-injection,ai-security"
  version: "0.0.3"
  author: "Webvelopers, Inc."
---

# OWASP GenAI Security

Use this skill to review generative AI, LLM, RAG, agentic AI, tool/plugin, model, prompt, context, and output handling risks using OWASP GenAI guidance.

## When to Use

- When assessing an LLM application, chatbot, RAG workflow, AI agent, tool/plugin integration, MCP server, prompt chain, model gateway, or GenAI workflow.
- When risks include prompt injection, sensitive information disclosure, insecure output handling, excessive agency, supply chain weakness, model theft, data poisoning, or overreliance.
- When the user needs application-level GenAI controls that complement MITRE ATLAS and NIST AI RMF.
- When defensive validation, guardrails, human-in-the-loop controls, tool scoping, logging, or governance are required.

## Framework Scope

Target version: OWASP GenAI LLM Top 10 2026.

OWASP GenAI Security Project provides current community guidance for generative AI application security. This skill focuses on application and system design risks, while `mitre-atlas-2026` maps adversarial AI TTPs and `nist-ai-rmf-10` covers AI governance and lifecycle risk management.

Core review areas:

| Area | Examples |
|---|---|
| Prompt and context | Prompt injection, context poisoning, retrieval manipulation, instruction hierarchy |
| Tool and agent control | Excessive agency, unsafe tools, privilege boundaries, approval gates, auditability |
| Data protection | Sensitive information disclosure, training data exposure, logs, memory, embeddings |
| Output safety | Insecure output handling, unsafe code, downstream injection, decision support risk |
| Supply chain | Model, dataset, plugin, tool, prompt, dependency, and artifact provenance |
| Governance | Human oversight, evaluation, monitoring, incident response, abuse handling |

## Workflow

1. Define the GenAI architecture: model, prompts, system instructions, context sources, tools, agents, memory, users, permissions, and outputs.
2. Identify trust boundaries between user input, retrieved content, model output, tools, external systems, and human approval.
3. Map risks to OWASP GenAI LLM Top 10 2026 categories and related controls.
4. Assess tool permissions, output handling, data retention, prompt/context integrity, logging, monitoring, and human-in-the-loop safeguards.
5. Cross-reference ATLAS techniques and NIST AI RMF functions when threat mapping or lifecycle governance is needed.
6. Recommend defensive controls, evaluation tests, abuse monitoring, rollback, and residual risk treatment.

## Output Format

| Field | Expected content |
|---|---|
| GenAI asset | Model, prompt, RAG source, agent, tool, memory, output, or workflow |
| Risk | OWASP GenAI category and risk description |
| Evidence | Architecture, prompt flow, tool permission, log, policy, dataset, or config |
| Impact | Data exposure, unsafe action, integrity failure, availability, fraud, or safety concern |
| Control | Guardrail, permission boundary, validation, monitoring, or governance action |
| Validation | Safe defensive test, red-team simulation boundary, eval, log review, or policy check |
| Residual risk | Remaining dependency, model limitation, monitoring gap, or business acceptance |

## Verification

- GenAI risks are tied to architecture and trust boundaries, not generic AI concern lists.
- Tool and agent permissions are scoped and auditable.
- Defensive tests avoid harmful payloads and are described as controlled validation.
- ATLAS and NIST AI RMF are used when TTP or lifecycle governance mapping is needed.

## Official Sources

- https://genai.owasp.org/
- https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/
- https://github.com/GenAI-Security-Project/GenAI-LLM-Top10
- https://owasp.org/www-project-top-10-for-large-language-model-applications/

## Safety Limits

Do not create jailbreak payloads, prompt injection payloads, data exfiltration steps, tool abuse instructions, model theft guidance, or bypass procedures. Keep testing framed as controlled defensive evaluation.
