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
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# Cyber Kill Chain Threat Modeling

Use this skill to model attack paths, exposures, controls, and detection opportunities using the Lockheed Martin Cyber Kill Chain.

## Framework Base

- Reconnaissance: gathering information, assets, and targets.
- Weaponization: preparing artifacts, documents, infrastructure, or capabilities.
- Delivery: delivery through email, web, network, third parties, or physical media.
- Exploitation: abusing vulnerabilities, configurations, or credentials.
- Installation: persistence, tool deployment, or unauthorized changes.
- Command and Control: communication with control infrastructure.
- Actions on Objectives: exfiltration, sabotage, fraud, lateral movement, or operational impact.

## Workflow

1. Define the scenario, target asset, likely actor, motivation, and constraints.
2. Map events, weaknesses, and controls to each kill chain stage.
3. Identify breakpoints where preventive or detective controls can interrupt the attack.
4. Propose telemetry, alerts, playbooks, and defensive validation exercises.
5. Prioritize controls that break multiple stages or reduce high impact with low effort.

## Expected Output

Provide a table by stage with threat hypothesis, exposed surface, preventive controls, detective signals, recommended response, and residual risk.

## Limits

Keep the analysis defensive. Do not create tactical instructions, payloads, bypasses, or procedures for executing intrusions.
