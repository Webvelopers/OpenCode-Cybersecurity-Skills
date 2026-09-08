---
name: nist-cyber-risk
description: "NIST CSF, RMF, 800-53, 800-30, 800-61: Use when assessing cybersecurity governance, risk, controls, compliance or incident response."
license: MIT
metadata:
  framework: "NIST RMF and cybersecurity risk publications"
  target_version: "CSF 2.0, SP 800-37 Rev 2, SP 800-53 Rev 5, SP 800-30 Rev 1, SP 800-61 Rev 3"
  source: "https://csrc.nist.gov"
  domain: "cybersecurity"
  subdomain: "governance-risk-compliance"
  tags: "nist,rmf,800-53,800-30,800-61,incident-response"
  version: "0.0.2"
  author: "Webvelopers, Inc."
---

# NIST Cybersecurity Risk

Use this skill to assess cybersecurity governance, risk, compliance, controls, incident response, maturity, and gaps with a NIST-oriented evidence model.

## When to Use

- When the user asks for governance, risk, compliance, control assessment, audit evidence, or incident response planning.
- When NIST RMF, NIST SP 800-53, NIST SP 800-30, NIST SP 800-61, or NIST CSF must be connected.
- When a risk matrix, control gap analysis, current/target profile, POA&M-style action plan, or evidence request list is needed.
- When legal, regulatory, or contractual obligations are in scope but need to be separated from assumptions.

## Framework Scope

Target versions: NIST CSF 2.0, SP 800-37 Rev. 2, SP 800-53 Rev. 5, SP 800-30 Rev. 1, and SP 800-61 Rev. 3.

NIST Cybersecurity Framework (CSF) 2.0 provides outcome-based posture assessment. NIST RMF provides lifecycle process structure for categorizing systems, selecting controls, implementing controls, assessing controls, authorizing systems, and monitoring risk. SP 800-53 provides control families. SP 800-30 provides risk assessment methods. SP 800-61 Rev. 3 supersedes Rev. 2 and aligns incident response recommendations with CSF 2.0.

Core assessment areas:

| Area | Primary NIST source |
|---|---|
| Organizational posture | NIST CSF 2.0 |
| Risk management lifecycle | SP 800-37 Rev. 2 |
| Control catalog and assessment evidence | SP 800-53 Rev. 5 |
| Risk assessment | SP 800-30 Rev. 1 |
| Incident response | SP 800-61 Rev. 3 |
| Secure software development | SP 800-218 when software supply chain is in scope |

## Workflow

1. Define scope, authorization boundary, system, data, dependencies, third parties, business objectives, and stakeholders.
2. Identify threats, vulnerabilities, predisposing conditions, impact, likelihood, inherent risk, and risk tolerance.
3. Map current capabilities to relevant NIST CSF functions, categories, outcomes, and NIST control families.
4. Identify gaps between current state, target profile, contractual obligations, regulatory obligations, and risk appetite.
5. Prioritize actions by risk reduction, urgency, dependency, cost, implementation effort, and audit value.
6. Define controls, owners, evidence, metrics, review cadence, residual risk, and acceptance criteria.
7. For incident response work, align preparation, detection, analysis, containment, eradication, recovery, and lessons learned with CSF 2.0 outcomes.

## Output Format

| Field | Expected content |
|---|---|
| Risk or control area | Scope item, control family, CSF outcome, or incident capability |
| Evidence | Policies, diagrams, logs, tickets, test results, procedures, or interviews |
| Gap | Missing or weak control, evidence, process, ownership, or metric |
| Impact and likelihood | Business and technical risk context |
| Recommendation | Defensive action, control improvement, or process change |
| Priority | Risk-based priority with rationale |
| Owner and evidence | Accountable party and artifacts needed for closure |
| Residual risk | Accepted, transferred, avoided, or mitigated risk remaining |

## Verification

- Exact control IDs and publication revisions are validated against official NIST sources for formal reports.
- Regulatory obligations are not assumed without documented applicability.
- Current state, target state, and recommended actions are clearly separated.
- Incident response recommendations use SP 800-61 Rev. 3 unless the user explicitly requests an older revision.

## Official Sources

- https://www.nist.gov/cyberframework
- https://doi.org/10.6028/NIST.CSWP.29
- https://csrc.nist.gov/projects/risk-management
- https://csrc.nist.gov/pubs/sp/800/37/r2/final
- https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
- https://csrc.nist.gov/pubs/sp/800/30/r1/final
- https://csrc.nist.gov/pubs/sp/800/61/r3/final
- https://csrc.nist.gov/pubs/sp/800/218/final

## Safety Limits

Do not claim certification, compliance, or legal sufficiency. Provide assessment support and evidence mapping only. Do not assume regulatory requirements without evidence.
