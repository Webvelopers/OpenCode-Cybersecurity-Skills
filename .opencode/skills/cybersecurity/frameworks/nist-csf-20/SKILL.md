---
name: nist-csf-20
description: "NIST CSF 2.0, Cybersecurity Framework, Govern Identify Protect Detect Respond Recover: Use when assessing organizational cybersecurity posture and risk outcomes."
license: MIT
metadata:
  framework: "NIST Cybersecurity Framework"
  target_version: "2.0"
  source: "https://www.nist.gov/cyberframework"
  domain: "cybersecurity"
  subdomain: "security-posture"
  tags: "nist-csf,govern,identify,protect,detect,respond,recover"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# NIST CSF 2.0 Posture Assessment

Use this skill to assess, communicate, and prioritize an organization's cybersecurity posture using NIST CSF 2.0. CSF is flexible, outcome-based, and does not prescribe specific tools.

## When to Use

- When a current cybersecurity profile and target cybersecurity profile need to be created.
- When the user asks to assess maturity, gaps, priorities, risk, suppliers, or compliance using NIST CSF.
- When risks and outcomes must be communicated to leadership, technical teams, business stakeholders, audit teams, or third parties.
- When controls, evidence, or initiatives need to be mapped to CSF functions, categories, and subcategories.

## Framework Scope

Target version: 2.0.

CSF 2.0 contains 6 functions, 22 categories, and 106 subcategories. The Govern function was added to elevate governance, roles, policies, risk strategy, and supply chain risk management to the same level as operational functions.

Categories by function:

| Function | Categories |
|---|---|
| Govern | GV.OC Organizational Context, GV.RM Risk Management Strategy, GV.RR Roles Responsibilities and Authorities, GV.PO Policy, GV.OV Oversight, GV.SC Cybersecurity Supply Chain Risk Management |
| Identify | ID.AM Asset Management, ID.RA Risk Assessment, ID.IM Improvement |
| Protect | PR.AA Identity Management Authentication and Access Control, PR.AT Awareness and Training, PR.DS Data Security, PR.PS Platform Security, PR.IR Technology Infrastructure Resilience |
| Detect | DE.CM Continuous Monitoring, DE.AE Adverse Event Analysis |
| Respond | RS.MA Incident Management, RS.AN Incident Analysis, RS.CO Incident Response Reporting and Communication, RS.MI Incident Mitigation |
| Recover | RC.RP Incident Recovery Plan Execution, RC.CO Incident Recovery Communication |

## Workflow

1. Define scope: units, assets, data, critical processes, third parties, jurisdictions, and business objectives.
2. Build the current profile: which CSF outcomes are currently achieved, with which controls, processes, and evidence.
3. Build the target profile: outcomes required by risk, regulation, contracts, threat landscape, and risk appetite.
4. Identify gaps by function, category, and subcategory, avoiding treatment of CSF as a single checklist.
5. Prioritize actions by risk reduction, dependency, cost, effort, operational impact, and urgency.
6. Define the risk treatment plan: mitigate, transfer, avoid, or accept risk.
7. Assign owners, evidence, metrics, target dates, and review cadence.
8. Integrate Informative References, Implementation Examples, or specific controls only when the user requires the implementation details.

## Output Format

| Field | Expected content |
|---|---|
| CSF function | GV, ID, PR, DE, RS, or RC |
| Category | Code and name |
| Outcome | Current and target state |
| Evidence | Policies, logs, procedures, tickets, architecture, or controls |
| Gap | Difference between current and target profile |
| Risk | Impact, likelihood, and criticality |
| Priority | High, medium, or low with justification |
| Action | Recommendation, owner, and closure criteria |

## Verification

- The assessment is based on Core outcomes, not on a fixed product list.
- Current and target profiles are separated.
- Priorities reflect mission, risk, tolerance, and resources.
- Legal or contractual requirements are not assumed without evidence.

## Official Sources

- https://www.nist.gov/cyberframework
- https://doi.org/10.6028/NIST.CSWP.29
- https://csrc.nist.gov/Projects/cybersecurity-framework/Filters#/csf/filters

## Safety Limits

Do not present CSF as a NIST certification. NIST does not certify CSF products, implementations, or services. Do not invent subcategories or regulatory obligations.
