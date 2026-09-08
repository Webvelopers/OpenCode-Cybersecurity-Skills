---
name: cis-hardening
description: "CIS Controls, CIS Benchmarks, hardening: Use when prioritizing secure configuration, baseline hardening and security hygiene improvements."
license: MIT
metadata:
  framework: "CIS Controls and CIS Benchmarks"
  target_version: "Controls v8.1, current benchmarks by platform"
  source: "https://www.cisecurity.org/controls and https://www.cisecurity.org/cis-benchmarks"
  domain: "cybersecurity"
  subdomain: "hardening"
  tags: "cis,hardening,secure-configuration,baseline,benchmarks"
  version: "0.0.2"
  author: "Webvelopers, Inc."
---

# CIS Hardening

Use this skill to define hardening, secure configuration, baselines, technical hygiene, and control prioritization using CIS Controls and CIS Benchmarks.

## When to Use

- When the user asks for secure configuration, baseline hardening, control prioritization, or technical hygiene.
- When CIS Controls, CIS Benchmarks, Implementation Groups, benchmark profiles, evidence, or exceptions need to be applied.
- When a system, platform, container, cloud service, database, network device, endpoint, or application needs defensive configuration guidance.
- When recommendations must balance security value, operational impact, automation potential, and exceptions.

## Framework Scope

Target versions: CIS Controls v8.1 and current CIS Benchmarks for the exact platform and product version.

CIS Controls v8.1 is a prioritized and simplified set of safeguards for improving cybersecurity posture. CIS Benchmarks provide vendor-neutral secure configuration guidance for specific platforms. Implementation Groups IG1, IG2, and IG3 scale recommended safeguards by risk, resources, and maturity.

Core hardening areas:

| Area | Examples |
|---|---|
| Inventory | Enterprise assets, software, cloud resources, accounts, and dependencies |
| Configuration | Secure baselines, benchmark profiles, drift detection, exceptions |
| Identity | Account management, least privilege, MFA, privileged access |
| Vulnerability hygiene | Patch cadence, exposure, known exploited vulnerabilities, remediation windows |
| Logging and recovery | Audit logging, monitoring, backups, recovery validation |
| Platform hardening | OS, cloud, containers, databases, network devices, and applications |

## Workflow

1. Identify the platform, product version, scope, criticality, data, exposure, and operational constraints.
2. Select the relevant CIS Controls safeguards and exact CIS Benchmark for the technology.
3. Assess inventory, configuration, identities, privileges, vulnerabilities, logs, backups, malware defenses, and recovery posture.
4. Propose a minimum baseline and a target baseline using IG1, IG2, or IG3 depending on risk and maturity.
5. Prioritize controls by impact, effort, dependency, operational risk, automation potential, and evidence quality.
6. Define validation steps, evidence, exceptions, compensating controls, review cadence, and rollback considerations.

## Output Format

| Field | Expected content |
|---|---|
| Control or benchmark area | CIS Control, safeguard, benchmark profile, or configuration domain |
| Current state | Observed setting, process, evidence, or unknown state |
| Target state | Recommended baseline and rationale |
| Priority | IG level, risk, exposure, effort, and dependency rationale |
| Evidence | Commands, configs, screenshots, tickets, logs, or policy artifacts |
| Validation | Safe read-only check or audit method |
| Exception | Accepted deviation, owner, expiration, and compensating control |

## Verification

- Benchmark recommendations match the exact platform and product version.
- Recommendations distinguish assessment, verification, and implementation.
- Exceptions include owner, rationale, compensating control, and review date.
- Hardening actions avoid destructive changes unless explicitly approved and planned.

## Official Sources

- https://www.cisecurity.org/controls
- https://www.cisecurity.org/controls/v8-1
- https://www.cisecurity.org/cis-benchmarks
- https://workbench.cisecurity.org/

## Safety Limits

Do not apply destructive changes without explicit confirmation. Do not provide bypass guidance. Distinguish recommendations from execution and include rollback or exception handling for operationally sensitive controls.
