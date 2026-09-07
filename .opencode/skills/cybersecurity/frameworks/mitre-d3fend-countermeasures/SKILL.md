---
name: mitre-d3fend-countermeasures
description: "MITRE D3FEND v1.4.0, defensive countermeasures, D3FEND techniques: Use when mapping ATT&CK or observed threats to defensive controls."
license: MIT
metadata:
  framework: "MITRE D3FEND"
  target_version: "v1.4.0"
  source: "https://d3fend.mitre.org"
  domain: "cybersecurity"
  subdomain: "defensive-countermeasures"
  tags: "mitre-d3fend,countermeasures,defense,controls,artifacts"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# MITRE D3FEND v1.4.0 Countermeasure Mapping

Use this skill to translate threats, TTPs, or control failures into defensive countermeasures using MITRE D3FEND. D3FEND is a countermeasure knowledge graph that models how a defense addresses an offensive technique through artifacts, events, capabilities, and engineering relationships.

## When to Use

- When the question is which defense interrupts this adversary behavior.
- When ATT&CK, ATLAS, Mobile, ICS, or SPARTA techniques must be mapped to defensive controls.
- When architecture controls, hardening, detection, isolation, deception, eviction, or recovery need to be designed.
- When a defensive investment needs technical traceability to threats and digital artifacts.

## Framework Scope

Target version: v1.4.0, based on the requested table.

D3FEND v1.4.0, published in the official ontology changelog on 2026-03-31, expands space and SDR modeling, timer and clock artifacts, Control Flow Integrity, Radiation Hardening, Bus Message Authentication, Boot ROM countermeasures, and ATT&CK restrictions for cloud changes, MFA, certificates, logs, firewalls, data encryption, and recovery inhibition.

The requested table lists the scope as 270 techniques. D3FEND organizes countermeasures into defensive categories such as Model, Harden, Detect, Isolate, Deceive, Evict, and Restore.

## Workflow

1. Define the offensive behavior or risk scenario in observable terms.
2. Identify the affected digital artifact: process, credential, file, configuration, network, identity, cloud, firmware, OT, or AI artifact.
3. Map the threat to ATT&CK, ATLAS, ICS, Mobile, or another offensive framework when applicable.
4. Identify D3FEND countermeasures that act on the relevant artifact, event, or capability.
5. Classify the defense as preventive, detective, corrective, deceptive, isolating, evicting, or restorative.
6. Evaluate applicability: prerequisites, coverage, false positives, operational impact, telemetry dependency, and residual bypass risk.
7. Propose defensive implementation with verifiable evidence and success criteria.
8. Validate exact `D3-*` IDs against the official site or ontology artifacts when required.

## Output Format

| Field | Expected content |
|---|---|
| Threat | Offensive behavior or technique |
| Artifact | Affected digital object, event, or component |
| D3FEND countermeasure | Name and ID when validated |
| Defense type | Model, Harden, Detect, Isolate, Deceive, Evict, or Restore |
| Mechanism | How it interrupts, detects, or reduces risk |
| Requirements | Telemetry, configuration, agents, integrations, or processes |
| Evidence | Signals of operation and compliance |
| Residual risk | Weaknesses, likely evasions, or remaining gaps |

## Verification

- Each countermeasure is linked to an artifact or behavior, not only to a generic label.
- The recommendation explains how the defense works and under what conditions.
- Prerequisites and limitations are documented.
- Exact D3FEND IDs are not invented.

## Official Sources

- https://d3fend.mitre.org
- https://d3fend.mitre.org/about/
- https://d3fend.mitre.org/changelog/
- https://d3fend.mitre.org/ontology

## Safety Limits

Do not turn defensive mapping into offensive instructions. Do not provide control bypasses. If an offensive technique is discussed, keep it analytical and defense-oriented.
