---
name: mitre-atlas-2026
description: "MITRE ATLAS 2026.07, AI security, ML threats, LLM, agentic AI, AML techniques: Use when mapping adversarial threats against AI/ML systems."
license: MIT
metadata:
  framework: "MITRE ATLAS"
  target_version: "2026.07"
  source: "https://atlas.mitre.org"
  domain: "cybersecurity"
  subdomain: "ai-security"
  tags: "mitre-atlas,ai-security,ml,llm,agentic-ai,rag"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# MITRE ATLAS 2026.07 AI Threat Mapping

Use this skill to analyze adversarial threats against AI/ML systems, including predictive models, generative AI, RAG, agents, tools, MCP, datasets, pipelines, inference, prompts, model weights, and AI artifact supply chains.

## When to Use

- When the assessed system uses AI, ML, LLMs, RAG, autonomous agents, MCP servers, agent tools, or training/inference pipelines.
- When threats such as prompt injection, tool poisoning, data poisoning, model theft, model evasion, artifact poisoning, or agentic abuse need to be mapped.
- When ATLAS case studies, techniques, mitigations, and AI security controls need to be connected.
- When assessing an incident, design, threat model, or detection in AI-enabled systems.

## Framework Scope

Target version: 2026.07.

ATLAS is a public knowledge base of adversary TTPs against AI systems. The requested table lists the 2026.07 release as containing 101 techniques and 77 sub-techniques. The official `mitre-atlas/atlas-data` repository states that ATLAS uses monthly content versioning and distributes data as YAML, STIX, Navigator, and Excel artifacts.

ID conventions:

| Type | Pattern | Example |
|---|---|---|
| Tactic | AML.TA#### | AML.TA0002 |
| Technique | AML.T#### | AML.T0051 |
| Sub-technique | AML.T####.### | AML.T0051.001 |
| Mitigation | AML.M#### | AML.M0024 |
| Case study | AML.CS#### | AML.CS0053 |

Official data model objects and relationships:

| Object | Use |
|---|---|
| matrix | Tactic sequence |
| tactics | Adversary objectives against AI |
| techniques | Adversary behaviors |
| mitigations | Controls and risk reduction |
| case-studies | Observed incidents or exercises |
| relationships | sequences, achieves, specializes, mitigates, employs |

## Workflow

1. Define the AI system: model, data, prompts, tools, agents, infrastructure, users, privileges, and dependencies.
2. Identify the platform: Predictive AI, Generative AI, Agentic AI, or Enterprise when applicable.
3. Separate threats against AI from threats using AI to support a traditional attack.
4. Map ATLAS tactics and techniques by observable behavior or defensive scenario.
5. Connect techniques to mitigations, telemetry, owners, and business risks.
6. Assess the AI supply chain: datasets, models, templates, tools, repositories, dependencies, and runtime.
7. Assess agentic AI: tool scope, permissions, context, memory, instructions, external channels, and human-in-the-loop safeguards.
8. For exact IDs, validate against `dist/v6/ATLAS-2026.07.yaml` or the official site.

## Output Format

| Field | Expected content |
|---|---|
| AI asset | Model, dataset, pipeline, agent, tool, or service |
| ATLAS tactic | ID and name when validated |
| ATLAS technique | ID, name, and sub-technique when applicable |
| Risk | Integrity, confidentiality, availability, safety, abuse, or fraud |
| Evidence | Logs, configuration, prompt, tool call, dataset, artifact, case, or alert |
| Mitigation | Technical control, process, evaluation, or monitoring |
| Validation | Defensive test or acceptance criteria |
| Residual risk | What remains after controls |

## Verification

- The analysis distinguishes AI system target from AI-enabled attacker capability.
- Controls cover data, model, application, agent, infrastructure, and supply chain.
- Recommendations include monitoring and continuous evaluation, not only point-in-time blocking.
- Exact AML IDs were verified if the output uses them as authoritative references.

## Official Sources

- https://atlas.mitre.org
- https://github.com/mitre-atlas/atlas-data
- https://raw.githubusercontent.com/mitre-atlas/atlas-data/main/dist/manifest.yaml
- https://raw.githubusercontent.com/mitre-atlas/atlas-data/main/CHANGELOG.md

## Safety Limits

Do not create jailbreaks, malicious prompts, exfiltration instructions, tool poisoning instructions, or bypasses. Frame testing as controlled, authorized defensive evaluation.
