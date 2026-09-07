# Framework Crosswalk

This document maps the OpenCode cybersecurity skills to their source frameworks, assessment use cases, expected outputs, official sources, and version constraints.

Project version: `0.0.2`

Tracked skills listed here keep the `metadata.version` recorded in Git HEAD unless their `SKILL.md` file has git-detected changes. A changed `SKILL.md` may move only to the immediate next patch metadata version. Framework target versions are separate and remain documented per skill.

## Crosswalk

| Skill | Framework | Use when | Expected output | Official source | Version policy |
|---|---|---|---|---|---|
| `mitre-attack-v19` | MITRE ATT&CK | Mapping adversary behaviors, TTPs, incident evidence, or hunting hypotheses | Tactic, technique, evidence, confidence, telemetry, detection, mitigation, and gap | https://attack.mitre.org | Target v19.1 unless the user requests latest |
| `nist-csf-20` | NIST CSF | Assessing organizational cybersecurity posture, profiles, gaps, and priorities | Current profile, target profile, gaps, risks, owners, and actions | https://www.nist.gov/cyberframework | Target 2.0 |
| `mitre-atlas-2026` | MITRE ATLAS | Assessing adversarial threats to AI/ML, LLM, RAG, agentic AI, MCP, data, model, or tool systems | AI asset, ATLAS tactic, technique, evidence, mitigation, validation, and residual risk | https://atlas.mitre.org | Target 2026.07 unless the user requests latest |
| `mitre-d3fend-countermeasures` | MITRE D3FEND | Translating threats into defensive countermeasures | Threat, artifact, D3FEND countermeasure, mechanism, requirements, evidence, and residual risk | https://d3fend.mitre.org | Target v1.4.0 |
| `nist-ai-rmf-10` | NIST AI RMF | Managing trustworthy AI risks across the AI lifecycle | Risk, function, impact, evidence, control, measurement, owner, and residual risk | https://airc.nist.gov/AI_RMF_Knowledge_Base/AI_RMF | Target 1.0 |
| `mitre-f3-fraud-ttp` | MITRE Fight Fraud Framework | Assessing cyber-enabled financial fraud and monetization paths | Scenario, F3 tactic, technique, ATT&CK relationship, evidence, control, decision, and residual risk | https://ctid.mitre.org/fraud | Target v1.1 |
| `owasp-appsec` | OWASP | Reviewing application, API, authentication, authorization, input validation, secrets, and dependency risks | Finding, severity, OWASP mapping, remediation, and validation | https://owasp.org | Use current official OWASP project versions unless a target is specified |
| `nist-cyber-risk` | NIST RMF and cyber risk publications | Assessing governance, risk, compliance, controls, and incident response | Risk matrix, control gaps, recommendations, priorities, and evidence | https://csrc.nist.gov | Validate publication revisions for formal use |
| `cyber-kill-chain` | Cyber Kill Chain | Modeling adversary progression and defensive breakpoints | Stage-by-stage attack path, exposed surface, controls, signals, response, and residual risk | https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html | Public model |
| `mitre-attack-detection` | MITRE ATT&CK detection resources | Designing detections, hunting logic, and telemetry coverage | Tactic, technique, behavior, data source, logic, severity, false positives, response, and gap | https://attack.mitre.org | Target v19.1 unless the user requests latest |
| `cis-hardening` | CIS Controls and CIS Benchmarks | Reviewing secure configuration and baseline hardening | Control, objective, recommended configuration, priority, impact, evidence, validation, and exceptions | https://www.cisecurity.org | CIS Controls v8 and current benchmark for the exact platform |

## Selection Rules

- Use `owasp-appsec` first for application and API code security.
- Use `mitre-attack-v19` or `mitre-attack-detection` for adversary behavior, logs, detections, and threat hunting.
- Use `nist-csf-20` or `nist-cyber-risk` for governance, posture, compliance, and risk decisions.
- Use `mitre-atlas-2026` and `nist-ai-rmf-10` together for AI-enabled systems.
- Use `mitre-d3fend-countermeasures` after identifying a threat to recommend defensive controls.
- Use `mitre-f3-fraud-ttp` only when financial fraud, monetization, or abuse flows are part of the scenario.
- Use `cis-hardening` when the issue is secure configuration, hygiene, or baseline enforcement.
- Use `cyber-kill-chain` when stakeholders need a stage-based narrative of an attack path.

## Interoperability and Cross-Framework Mapping Matrix

| Primary Concern | Primary Skill | Secondary Skill (Defense / Hardening) | Governance / Risk Skill |
|---|---|---|---|
| Web & API Vulnerabilities | `owasp-appsec` | `cis-hardening` | `nist-cyber-risk` |
| Adversary TTPs & Logs | `mitre-attack-v19` | `mitre-attack-detection`, `mitre-d3fend-countermeasures` | `nist-csf-20` |
| AI / LLM / Agent Security | `mitre-atlas-2026` | `mitre-d3fend-countermeasures` | `nist-ai-rmf-10` |
| Financial Fraud & Abuse | `mitre-f3-fraud-ttp` | `owasp-appsec` | `nist-cyber-risk` |
| System Hardening | `cis-hardening` | `mitre-d3fend-countermeasures` | `nist-csf-20` |
| Attack Path Modeling | `cyber-kill-chain` | `mitre-attack-v19` | `nist-cyber-risk` |

## Reporting Rules

- Findings should be ordered by severity.
- Evidence must distinguish confirmed observations from assumptions.
- Exact framework IDs must be validated against the official source when used in formal reporting.
- Recommendations must be defensive, authorized, and safe.
