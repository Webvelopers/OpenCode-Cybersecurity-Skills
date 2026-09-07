---
name: nist-cyber-risk
description: "NIST CSF, RMF, 800-53, 800-30, 800-61: Use when assessing cybersecurity governance, risk, controls, compliance or incident response."
license: MIT
metadata:
  framework: "NIST RMF and cybersecurity risk publications"
  target_version: "CSF 2.0, SP 800-37 Rev 2, SP 800-53 Rev 5, SP 800-30 Rev 1, SP 800-61 Rev 2"
  source: "https://csrc.nist.gov"
  domain: "cybersecurity"
  subdomain: "governance-risk-compliance"
  tags: "nist,rmf,800-53,800-30,800-61,incident-response"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# NIST Cybersecurity Risk

Use this skill to assess cybersecurity governance, risk, compliance, controls, response plans, maturity, and gaps with a NIST-oriented approach.

## Framework Base

- NIST Cybersecurity Framework for the Govern, Identify, Protect, Detect, Respond, and Recover functions.
- NIST Risk Management Framework for categorizing, selecting, implementing, assessing, authorizing, and monitoring controls.
- NIST SP 800-53 for the control catalog.
- NIST SP 800-30 for risk assessment.
- NIST SP 800-61 for incident handling.

## Workflow

1. Define scope, system, data, dependencies, third parties, and business objectives.
2. Identify threats, vulnerabilities, impact, likelihood, and inherent risk.
3. Map current capabilities to relevant NIST CSF functions and NIST control families.
4. Identify gaps between the current state, target profile, regulatory obligations, and risk appetite.
5. Prioritize actions by risk reduction, cost, urgency, dependency, and effort.
6. Define controls, owners, evidence, metrics, review cadence, and residual risk.

## Expected Output

Provide a matrix with risk, impact, likelihood, existing controls, gap, recommendation, priority, and required evidence.

For incident response work, structure the output as preparation, detection, analysis, containment, eradication, recovery, and lessons learned.

## Limits

Do not assume regulatory requirements without evidence. If exact controls or IDs are cited, validate them against official sources when accuracy is critical.
