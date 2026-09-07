---
name: mitre-attack-v19
description: "MITRE ATT&CK v19.1, ATTACK, TTP, tactics, techniques: Use when mapping adversary behavior to ATT&CK for detection, hunting, controls or reporting."
license: MIT
metadata:
  framework: "MITRE ATT&CK"
  target_version: "v19.1"
  source: "https://attack.mitre.org"
  domain: "cybersecurity"
  subdomain: "ttp-mapping"
  tags: "mitre-attack,ttp,tactics,techniques,threat-hunting"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# MITRE ATT&CK v19.1 TTP Mapping

Use this skill to map observed or hypothetical adversary behaviors to MITRE ATT&CK, prioritize detections, explain coverage gaps, and produce defensive reports with tactics, techniques, required data, and mitigations.

## When to Use

- When logs, alerts, IOCs, incident narratives, or threat hunting hypotheses need to be translated into ATT&CK tactics and techniques.
- When SIEM, EDR, NDR, identity, cloud, endpoint, mobile, or ICS coverage must be assessed against adversary behaviors.
- When observed evidence, analytical inference, and threat intelligence assumptions must be separated.
- When a detection, Sigma/YARA/SIEM rule, playbook, or control needs traceability to TTPs.

## Framework Scope

Target version: v19.1, based on the requested table.

ATT&CK is a global knowledge base of adversary tactics and techniques based on real-world observations. For this skill, the scope includes Enterprise, Mobile, and ICS, with Enterprise as the default operational focus unless the user specifies another domain.

Reference Enterprise tactics:

| ID | Tactic | Adversary objective |
|---|---|---|
| TA0043 | Reconnaissance | Gather information to plan future operations |
| TA0042 | Resource Development | Establish resources to support operations |
| TA0001 | Initial Access | Gain entry into the target environment |
| TA0002 | Execution | Run malicious code |
| TA0003 | Persistence | Maintain presence |
| TA0004 | Privilege Escalation | Gain higher-level permissions |
| TA0005 | Stealth | Hide or disguise activity |
| TA0112 | Defense Impairment | Break or degrade defensive mechanisms |
| TA0006 | Credential Access | Steal credentials |
| TA0007 | Discovery | Understand the environment |
| TA0008 | Lateral Movement | Move through the environment |
| TA0009 | Collection | Gather data of interest |
| TA0011 | Command and Control | Communicate with compromised systems |
| TA0010 | Exfiltration | Steal data |
| TA0040 | Impact | Manipulate, interrupt, or destroy systems and data |

## Workflow

1. Define the applicable ATT&CK domain: Enterprise, Mobile, or ICS.
2. Extract observable behaviors, not tool names: process, identity, network, file, cloud API, email, endpoint, OT, or mobile activity.
3. Map the tactic first by asking why the adversary would perform the action.
4. Map the technique or sub-technique only when evidence supports the official ID and name.
5. Mark each mapping as observed, inferred, or hypothetical.
6. Add data sources, data components, detections, mitigations, and telemetry gaps.
7. Prioritize by impact, prevalence, attack stage, asset criticality, and response capability.
8. If exact IDs or strict versioning are required, validate against the official site or official STIX before finalizing.

## Output Format

| Field | Expected content |
|---|---|
| Tactic | ATT&CK ID and name |
| Technique | ID, name, and sub-technique when applicable |
| Evidence | Logs, alert, event, file, process, identity, or network activity |
| Confidence | Observed, inferred, or hypothetical |
| Data sources | Telemetry needed to confirm or detect |
| Detection | Defensive logic, threshold, context, and false positives |
| Mitigation | Preventive or corrective controls |
| Gap | Missing telemetry, coverage, process, or control |

## Verification

- The IDs used exist in the target version or were validated against the requested official version.
- Techniques were not mapped by tool name alone without observable behavior.
- The output separates evidence from inference.
- Recommendations are defensive and actionable.

## Official Sources

- https://attack.mitre.org
- https://attack.mitre.org/resources/versions/
- https://attack.mitre.org/tactics/enterprise/
- https://github.com/mitre-attack/attack-stix-data

## Safety Limits

Do not produce payloads, bypasses, intrusion instructions, persistence procedures, exfiltration procedures, or evasion guidance. Keep the work focused on detection, response, analysis, hardening, and authorized activities.
