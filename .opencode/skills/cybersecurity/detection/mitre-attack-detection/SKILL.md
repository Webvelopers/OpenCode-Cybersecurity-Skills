---
name: mitre-attack-detection
description: "MITRE ATT&CK, detection engineering, threat hunting: Use when mapping behaviors to ATT&CK tactics, techniques, data sources and detections."
license: MIT
metadata:
  framework: "MITRE ATT&CK"
  target_version: "v19.1"
  source: "https://attack.mitre.org"
  domain: "cybersecurity"
  subdomain: "detection-engineering"
  tags: "mitre-attack,detection,threat-hunting,siem,telemetry"
  version: "0.0.2"
  author: "Webvelopers, Inc."
---

# MITRE ATT&CK Detection Engineering

Use this skill to convert suspicious behavior, logs, alerts, incidents, or threat scenarios into defensive detection and hunting coverage based on MITRE ATT&CK.

## When to Use

- When logs, alerts, telemetry gaps, detections, hunting hypotheses, or incident narratives need ATT&CK-based detection design.
- When the user needs SIEM, EDR, NDR, cloud, identity, email, network, endpoint, OT, or application telemetry requirements.
- When mapping should produce defensive analytics, false-positive guidance, validation tests, and response actions.
- When `mitre-attack-v19` has identified behaviors and the next step is detection coverage or hunting logic.

## Framework Scope

Target version: MITRE ATT&CK v19.1.

This skill uses ATT&CK tactics, techniques, data sources, data components, detection strategies, and analytics to design defensive detection coverage. It is narrower than `mitre-attack-v19`: use this skill for telemetry and analytics, and use `mitre-attack-v19` for broader adversary behavior mapping.

Detection engineering areas:

| Area | Examples |
|---|---|
| Behavior | Process, command line, identity, network, file, registry, cloud API, email, or application activity |
| Telemetry | Data source, data component, collection point, retention, enrichment, and correlation |
| Analytic | Detection logic, threshold, sequence, baseline, anomaly, or correlation rule |
| Quality | False positives, blind spots, precision, recall, severity, and response usefulness |
| Validation | Safe test, simulation, tabletop, log replay, or historical hunt |

## Workflow

1. Describe the observed behavior or threat scenario in terms of actions, assets, identities, processes, network, data, and time.
2. Map likely ATT&CK tactics and techniques by observable behavior, avoiding invented IDs when certainty is low.
3. Identify required data sources and data components: EDR, identity logs, DNS, proxy, firewall, cloud audit, endpoint, email, application, or OT telemetry.
4. Define defensive detection logic with conditions, thresholds, sequence, enrichment context, and expected false positives.
5. Define severity, triage workflow, investigation questions, containment options, and evidence preservation needs.
6. Propose hunting questions, controlled validation tests, log replay, coverage metrics, and telemetry improvements.

## Output Format

| Field | Expected content |
|---|---|
| ATT&CK mapping | Tactic, technique, and confidence |
| Behavior | Observable action being detected |
| Data sources | Required telemetry and collection prerequisites |
| Detection logic | Defensive query logic, conditions, thresholds, and context |
| False positives | Expected benign patterns and tuning guidance |
| Validation | Safe defensive test, log replay, or hunt method |
| Response | Triage, containment, escalation, and evidence actions |
| Gap | Missing logging, collection, enrichment, or process capability |

## Verification

- Detection maps to observable behavior, not tool name alone.
- Required telemetry and data components are explicit.
- False positives and tuning criteria are documented.
- Validation is safe, authorized, and does not require live compromise.

## Official Sources

- https://attack.mitre.org
- https://attack.mitre.org/detectionstrategies/
- https://attack.mitre.org/analytics/
- https://attack.mitre.org/datasources/
- https://attack.mitre.org/datacomponents/
- https://github.com/mitre-attack/attack-stix-data

## Safety Limits

Do not generate malware, intrusion commands, exploit payloads, evasion procedures, or offensive operational steps. Detections must be defensive and used only in authorized environments.
