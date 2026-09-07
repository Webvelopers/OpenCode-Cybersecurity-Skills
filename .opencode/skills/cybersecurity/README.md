# Cybersecurity Skills

This folder contains defensive OpenCode skills based on official cybersecurity frameworks and the operational style of `mukul975/Anthropic-Cybersecurity-Skills`.

Initial skill metadata version: `0.0.2`

This version is coordinated with the root project version in `VERSION` as the initial release baseline. Tracked skills keep the `metadata.version` recorded in Git HEAD unless their `SKILL.md` file has git-detected changes. A changed `SKILL.md` may move only to the immediate next patch metadata version. Framework target versions are tracked separately inside each skill as `metadata.target_version`.

## Framework Skills

| Skill | Target version | Scope | What it maps |
|---|---:|---|---|
| `mitre-attack-v19` | v19.1 | 15 tactics, Enterprise/Mobile/ICS | Adversary behaviors and TTPs |
| `nist-csf-20` | 2.0 | 6 functions, 22 categories, 106 subcategories | Organizational security posture |
| `mitre-atlas-2026` | 2026.07 | 101 techniques, 77 sub-techniques | Adversarial AI/ML threats |
| `mitre-d3fend-countermeasures` | v1.4.0 | 270 techniques | Defensive countermeasures |
| `nist-ai-rmf-10` | 1.0 | Govern, Map, Measure, Manage | AI risk management |
| `mitre-f3-fraud-ttp` | v1.1 | 8 tactics, 123 techniques | Cyber-enabled financial fraud TTPs |

## Folder Layout

- `frameworks/`: framework-level mapping and risk assessment skills.
- `appsec/`: application and API security skills.
- `governance/`: governance, risk, compliance, and incident response skills.
- `detection/`: detection engineering and threat hunting skills.
- `hardening/`: secure configuration and baseline hardening skills.
- `threat-modeling/`: attack-path and adversary progression modeling skills.

## Existing Operational Skills

- `appsec/owasp-appsec`: application, API, and service security review using OWASP Top 10, API Security, ASVS, and SAMM.
- `governance/nist-cyber-risk`: governance, risk, controls, and incident response using NIST CSF, RMF, SP 800-53, SP 800-30, and SP 800-61.
- `threat-modeling/cyber-kill-chain`: attack-path modeling and defensive controls using the Lockheed Martin Cyber Kill Chain.
- `detection/mitre-attack-detection`: detection engineering, threat hunting, and defensive coverage using MITRE ATT&CK.
- `hardening/cis-hardening`: hardening and control prioritization using CIS Controls and CIS Benchmarks.

## Official Sources Used

- MITRE ATT&CK: https://attack.mitre.org
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
- MITRE ATLAS data: https://github.com/mitre-atlas/atlas-data
- MITRE D3FEND: https://d3fend.mitre.org
- NIST AI RMF: https://airc.nist.gov/AI_RMF_Knowledge_Base/AI_RMF
- MITRE Fight Fraud Framework: https://ctid.mitre.org/fraud and https://github.com/center-for-threat-informed-defense/fight-fraud-framework

## Usage Notes

The target versions follow the requested table. If a live official source publishes a later version, keep the target version for analysis consistency unless the user explicitly asks for the latest version.

All skills are oriented toward authorized defensive work, governance, detection, response, risk reduction, and security posture improvement.
