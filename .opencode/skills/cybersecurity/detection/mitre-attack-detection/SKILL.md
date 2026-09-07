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
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# MITRE ATT&CK Detection Engineering

Use this skill to convert suspicious behavior, logs, alerts, incidents, or threat scenarios into defensive coverage based on MITRE ATT&CK.

## Framework Base

- ATT&CK tactics for adversary objectives.
- Techniques and sub-techniques for observable behaviors.
- Data sources for required telemetry.
- Detections, hunting, defensive tests, and coverage gaps.

## Workflow

1. Describe the observed behavior or threat scenario in terms of actions, assets, identities, processes, network, and data.
2. Map likely ATT&CK tactics and techniques, avoiding invented IDs when there is no certainty.
3. Identify required data sources: EDR, identity logs, DNS, proxy, firewall, cloud audit, endpoint, email, or application telemetry.
4. Define defensive detection logic with conditions, thresholds, enrichment context, and expected false positives.
5. Propose hunting questions, controlled validation tests, and telemetry improvements.

## Expected Output

Provide tactic, technique, behavior, data source, detection logic, severity, false positives, response, and coverage gap.

## Limits

Do not generate malware, intrusion commands, or offensive procedures. Detections must be defensive and used only in authorized environments.
