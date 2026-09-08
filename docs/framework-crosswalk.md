# Framework Crosswalk

This document maps the OpenCode cybersecurity skills to their source frameworks, assessment use cases, expected outputs, official sources, and version constraints.

Project version: `0.0.3`

Tracked skills listed here keep the `metadata.version` recorded in Git HEAD unless their `SKILL.md` file has git-detected changes. A changed `SKILL.md` may move only to the immediate next patch metadata version. Framework target versions are separate and remain documented per skill.

## Crosswalk

| Skill | Framework | Use when | Expected output | Official source | Version policy |
|---|---|---|---|---|---|
| `mitre-attack-v19` | MITRE ATT&CK | Mapping adversary behaviors, TTPs, incident evidence, or hunting hypotheses | Tactic, technique, evidence, confidence, telemetry, detection, mitigation, and gap | https://attack.mitre.org | Target v19.1 unless the user requests latest |
| `nist-csf-20` | NIST CSF | Assessing organizational cybersecurity posture, profiles, gaps, and priorities | Current profile, target profile, gaps, risks, owners, and actions | https://www.nist.gov/cyberframework | Target 2.0 |
| `mitre-atlas-2026` | MITRE ATLAS | Assessing adversarial threats to AI/ML, LLM, RAG, agentic AI, MCP, data, model, or tool systems | AI asset, ATLAS tactic, technique, evidence, mitigation, validation, and residual risk | https://atlas.mitre.org | Target 2026.07 unless the user requests latest |
| `mitre-d3fend-countermeasures` | MITRE D3FEND | Translating threats into defensive countermeasures | Threat, artifact, D3FEND countermeasure, mechanism, requirements, evidence, and residual risk | https://d3fend.mitre.org | Target v1.6.0 |
| `nist-ai-rmf-10` | NIST AI RMF | Managing trustworthy AI risks across the AI lifecycle | Risk, function, impact, evidence, control, measurement, owner, and residual risk | https://airc.nist.gov/AI_RMF_Knowledge_Base/AI_RMF | Target 1.0 |
| `mitre-f3-fraud-ttp` | MITRE Fight Fraud Framework | Assessing cyber-enabled financial fraud and monetization paths | Scenario, F3 tactic, technique, ATT&CK relationship, evidence, control, decision, and residual risk | https://ctid.mitre.org/fraud | Target v1.1 |
| `owasp-appsec` | OWASP | Reviewing application, API, authentication, authorization, input validation, secrets, and dependency risks | Finding, severity, OWASP mapping, remediation, and validation | https://owasp.org | Target Top 10 2021, API 2023, ASVS 5.0.0, SAMM 2.0 |
| `owasp-genai-security` | OWASP GenAI Security Project | Reviewing LLM, RAG, prompt, agent, tool, plugin, output handling, and GenAI application risks | GenAI asset, risk, evidence, impact, control, validation, and residual risk | https://genai.owasp.org | Target OWASP GenAI LLM Top 10 2026 |
| `mobile-appsec` | OWASP MASVS, MASWE, MASTG | Reviewing Android, iOS, hybrid, mobile API, storage, crypto, network, platform, code, resilience, and privacy risks | Mobile area, evidence, MASVS/MASWE/MASTG mapping, remediation, validation, and residual risk | https://mas.owasp.org | Use current official OWASP MAS documentation |
| `nist-cyber-risk` | NIST RMF and cyber risk publications | Assessing governance, risk, compliance, controls, and incident response | Risk matrix, control gaps, recommendations, priorities, and evidence | https://csrc.nist.gov | Target SP 800-61 Rev. 3 for incident response |
| `software-supply-chain-security` | NIST SSDF, SLSA, OpenSSF, SBOM | Assessing secure development, source control, CI/CD, dependencies, provenance, SBOM, releases, and artifact trust | Supply chain area, evidence, framework mapping, risk, recommendation, validation, and residual risk | https://csrc.nist.gov/pubs/sp/800/218/final | Target NIST SP 800-218, SLSA v1.2, OpenSSF Scorecard |
| `vulnerability-risk-prioritization` | CVSS, EPSS, CISA KEV, CWE, CVE, NVD | Prioritizing vulnerabilities, weaknesses, scanner findings, patches, exploitability, and remediation actions | Vulnerability, evidence, external signals, applicability, priority, action, validation, and residual risk | https://www.first.org/cvss/v4-0/ | Target CVSS v4.0 and live exploit intelligence sources |
| `cyber-kill-chain` | Cyber Kill Chain | Modeling adversary progression and defensive breakpoints | Stage-by-stage attack path, exposed surface, controls, signals, response, and residual risk | https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html | Public model |
| `mitre-attack-detection` | MITRE ATT&CK detection resources | Designing detections, hunting logic, and telemetry coverage | Tactic, technique, behavior, data source, logic, severity, false positives, response, and gap | https://attack.mitre.org | Target v19.1 unless the user requests latest |
| `cis-hardening` | CIS Controls and CIS Benchmarks | Reviewing secure configuration and baseline hardening | Control, objective, recommended configuration, priority, impact, evidence, validation, and exceptions | https://www.cisecurity.org | CIS Controls v8 and current benchmark for the exact platform |

## Selection Rules

- Use `owasp-appsec` first for application and API code security.
- Use `owasp-genai-security` for GenAI, LLM, RAG, agent, prompt, tool, plugin, and output-handling security.
- Use `mobile-appsec` for Android, iOS, hybrid, MASVS, MASWE, and MASTG reviews.
- Use `mitre-attack-v19` or `mitre-attack-detection` for adversary behavior, logs, detections, and threat hunting.
- Use `nist-csf-20` or `nist-cyber-risk` for governance, posture, compliance, and risk decisions.
- Use `mitre-atlas-2026` and `nist-ai-rmf-10` together for AI-enabled systems.
- Use `software-supply-chain-security` for source control, CI/CD, provenance, SBOM, dependency, and release integrity reviews.
- Use `vulnerability-risk-prioritization` for CVE/CWE/scanner triage, CISA KEV, EPSS, CVSS, exposure, and remediation priority.
- Use `mitre-d3fend-countermeasures` after identifying a threat to recommend defensive controls.
- Use `mitre-f3-fraud-ttp` only when financial fraud, monetization, or abuse flows are part of the scenario.
- Use `cis-hardening` when the issue is secure configuration, hygiene, or baseline enforcement.
- Use `cyber-kill-chain` when stakeholders need a stage-based narrative of an attack path.

## Interoperability and Cross-Framework Mapping Matrix

| Primary Concern | Primary Skill | Secondary Skill (Defense / Hardening) | Governance / Risk Skill |
|---|---|---|---|
| Web & API Vulnerabilities | `owasp-appsec` | `cis-hardening` | `nist-cyber-risk` |
| Adversary TTPs & Logs | `mitre-attack-v19` | `mitre-attack-detection`, `mitre-d3fend-countermeasures` | `nist-csf-20` |
| AI / LLM / Agent Security | `owasp-genai-security`, `mitre-atlas-2026` | `mitre-d3fend-countermeasures` | `nist-ai-rmf-10` |
| Financial Fraud & Abuse | `mitre-f3-fraud-ttp` | `owasp-appsec` | `nist-cyber-risk` |
| System Hardening | `cis-hardening` | `mitre-d3fend-countermeasures` | `nist-csf-20` |
| Attack Path Modeling | `cyber-kill-chain` | `mitre-attack-v19` | `nist-cyber-risk` |
| Software Supply Chain | `software-supply-chain-security` | `vulnerability-risk-prioritization`, `cis-hardening` | `nist-cyber-risk` |
| Vulnerability Management | `vulnerability-risk-prioritization` | `software-supply-chain-security`, `cis-hardening` | `nist-csf-20` |
| Mobile Application Security | `mobile-appsec` | `owasp-appsec`, `vulnerability-risk-prioritization` | `nist-cyber-risk` |

## Skill Boundary Rules

| If the user asks about | Prefer | Add when needed |
|---|---|---|
| Adversary behavior mapping | `mitre-attack-v19` | `mitre-attack-detection` for telemetry and analytics |
| Detection logic or hunting | `mitre-attack-detection` | `mitre-d3fend-countermeasures` for defensive controls |
| Posture profiles | `nist-csf-20` | `nist-cyber-risk` for controls, RMF, audit, and IR evidence |
| Formal risk/control assessment | `nist-cyber-risk` | `nist-csf-20` for outcome profiles |
| AI adversary TTPs | `mitre-atlas-2026` | `owasp-genai-security` for LLM app risks and `nist-ai-rmf-10` for governance |
| GenAI app design | `owasp-genai-security` | `mitre-atlas-2026` for adversary TTPs |
| Dependency or build pipeline trust | `software-supply-chain-security` | `vulnerability-risk-prioritization` for CVE triage |
| Scanner findings or CVE backlog | `vulnerability-risk-prioritization` | `software-supply-chain-security` for dependency governance |

## Reporting Rules

- Findings should be ordered by severity.
- Evidence must distinguish confirmed observations from assumptions.
- Exact framework IDs must be validated against the official source when used in formal reporting.
- Recommendations must be defensive, authorized, and safe.
