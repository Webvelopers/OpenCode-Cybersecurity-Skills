---
name: cyber-kill-chain
description: "Cyber Kill Chain, attack path, threat modeling: Use when mapping adversary stages to defensive controls, detections and response actions."
license: MIT
metadata:
  framework: "Lockheed Martin Cyber Kill Chain"
  target_version: "public model"
  source: "https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html"
  domain: "cybersecurity"
  subdomain: "threat-modeling"
  tags: "kill-chain,attack-path,threat-modeling,detection,response"
  version: "0.0.2"
  author: "Webvelopers, Inc."
---

# Cyber Kill Chain Threat Modeling

Use this skill to model attack paths, exposures, controls, and detection opportunities using the Lockheed Martin Cyber Kill Chain.

## When to Use

- When stakeholders need a stage-based narrative of an attack path, intrusion scenario, or defensive control strategy.
- When controls, telemetry, response actions, or ownership must be mapped to attack progression stages.
- When ATT&CK mappings are too detailed for executive communication and a lifecycle view is needed.
- When identifying breakpoints that interrupt multiple adversary stages is the main goal.

## Framework Scope

Target version: public Lockheed Martin Cyber Kill Chain model.

The Cyber Kill Chain is a stage-based model for describing adversary progression and identifying opportunities to prevent, detect, contain, or recover from attacks. It should be used as a defensive narrative model and can be cross-referenced with ATT&CK for technique detail and D3FEND for countermeasures.

Stages:

| Stage | Defensive focus |
|---|---|
| Reconnaissance | External exposure, asset discovery, brand abuse, leaked data, threat intelligence |
| Weaponization | Malware analysis, exploit readiness, lure analysis, supplier and artifact risk |
| Delivery | Email, web, removable media, third-party, network, and cloud delivery paths |
| Exploitation | Vulnerabilities, misconfigurations, credential abuse, unsafe parsing, exposed services |
| Installation | Unauthorized change, persistence, tool staging, endpoint and workload integrity |
| Command and Control | Egress monitoring, DNS/proxy telemetry, beaconing, control channel disruption |
| Actions on Objectives | Data theft, fraud, impact, lateral movement, sabotage, business process abuse |

## Workflow

1. Define the scenario, target asset, likely actor, motivation, assumptions, and constraints.
2. Map events, exposures, weaknesses, controls, and evidence to each kill chain stage.
3. Identify preventive, detective, responsive, and recovery breakpoints for each stage.
4. Cross-reference ATT&CK techniques, D3FEND countermeasures, and relevant business risks where useful.
5. Propose telemetry, alerts, playbooks, validation exercises, owners, and response timelines.
6. Prioritize controls that break multiple stages or reduce high-impact risk with low operational burden.

## Output Format

| Field | Expected content |
|---|---|
| Stage | Cyber Kill Chain stage |
| Threat hypothesis | What the adversary may attempt at this stage |
| Evidence | Current observations, assumptions, or missing data |
| Preventive controls | Controls that reduce likelihood or exposure |
| Detective signals | Telemetry, alert, or hunt opportunity |
| Response | Triage, containment, communication, or recovery action |
| Residual risk | Remaining exposure after controls |

## Verification

- Each stage distinguishes confirmed evidence from assumptions.
- Recommendations map to defensive controls, telemetry, response, or recovery.
- ATT&CK and D3FEND references are used for precision when needed.
- The output does not become an operational intrusion guide.

## Official Sources

- https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html
- https://attack.mitre.org
- https://d3fend.mitre.org

## Safety Limits

Keep the analysis defensive. Do not create tactical instructions, payloads, bypasses, persistence steps, evasion procedures, or procedures for executing intrusions.
