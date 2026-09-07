---
name: mitre-f3-fraud-ttp
description: "MITRE F3 v1.1, Fight Fraud Framework, financial fraud TTPs: Use when mapping cyber-enabled financial fraud behaviors to tactics and controls."
license: MIT
metadata:
  framework: "MITRE Fight Fraud Framework"
  target_version: "v1.1"
  source: "https://ctid.mitre.org/fraud"
  domain: "cybersecurity"
  subdomain: "fraud-risk"
  tags: "mitre-f3,fraud,financial-crime,bec,account-takeover"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# MITRE F3 v1.1 Fight Fraud Framework

Use this skill to analyze cyber-enabled financial fraud with an ATT&CK-compatible taxonomy, separating the technical intrusion from the process that converts access into financial loss.

## When to Use

- When the scenario includes account takeover, BEC, payment fraud, card fraud, mule activity, crypto off-ramp, refund abuse, KYC or identity fraud, scam operations, or banking malware.
- When ATT&CK explains how the adversary entered or operated, but does not fully explain how financial loss materialized.
- When fraud, cyber defense, SOC, IAM, payments, risk operations, AML, compliance, and incident response need to align.
- When the user asks for MITRE F3, Fight Fraud Framework, fraud TTPs, or cyber-enabled financial fraud.

## Framework Scope

Target version: v1.1, with the 2026-04-09 reference date from the requested table and the `Anthropic-Cybersecurity-Skills` reference.

MITRE F3 is a curated knowledge base of TTPs used by financial fraud actors, derived from real-world observations of cyber fraud incidents. It references ATT&CK techniques where applicable and adds a common structure for describing material fraud events.

Requested table scope: 8 tactics, 123 techniques, and 94 fraud-relevant skills in the reference.

F3 v1.1 tactics:

| Tactic | ID | Origin | Use |
|---|---|---|---|
| reconnaissance | TA0043 | Re-contextualized ATT&CK | Understand the victim, account, institution, or financial process |
| resource-development | TA0042 | Re-contextualized ATT&CK | Prepare infrastructure, identities, accounts, or fraud resources |
| initial-access | TA0001 | Re-contextualized ATT&CK | Obtain fraud-relevant initial access |
| stealth | TA0005 | Re-contextualized ATT&CK | Hide activity or appear legitimate |
| positioning | FA0001 | F3 new | Prepare the fraud after access |
| execution | TA0002 | Re-contextualized ATT&CK | Execute actions that enable fraud |
| monetization | FA0002 | F3 new | Convert stolen or manipulated assets into usable value |
| defense-impairment | TA0112 | Re-contextualized ATT&CK | Degrade controls, monitoring, or response |

Technique conventions:

| ID | Meaning |
|---|---|
| F1XXX | Fraud-specific technique introduced by F3 |
| T1XXX | ATT&CK technique reused inside F3 |
| F1XXX.### or T1XXX.### | Sub-technique using dot notation |

## Workflow

1. Define the financial product, channel, customer, account, beneficiary, transaction, asset, and authorization flow.
2. Separate the cyber intrusion or abuse from fraud positioning and monetization.
3. Map technical behavior to ATT&CK when appropriate and fraud-specific behavior to F3.
4. Identify the F3 stage: reconnaissance, resource-development, initial-access, stealth, positioning, execution, monetization, or defense-impairment.
5. Document signals: device, session, identity, network, geography, beneficiary, amount, velocity, history, KYC, behavior, and customer support activity.
6. Propose controls: step-up authentication, risk scoring, transaction monitoring, behavioral analytics, beneficiary cooling period, mule detection, device binding, case management, and response playbooks.
7. Prioritize by potential loss, monetization speed, reversibility, volume, regulatory exposure, and evidence confidence.
8. Validate exact IDs against the official F3 v1.1 STIX bundle if formal references are required.

## Output Format

| Field | Expected content |
|---|---|
| Scenario | Fraud type and channel |
| F3 tactic | Name and ID |
| F3 technique | F1XXX/T1XXX ID and name when validated |
| ATT&CK relationship | Related cyber TTP when applicable |
| Evidence | Account, session, device, transaction, logs, or alert |
| Control | Prevention, detection, friction, response, or recovery |
| Decision | Block, hold, step-up, investigate, report, or accept |
| Residual risk | Loss, recurrence, false positives, or operational gap |

## Verification

- The output differentiates technical access, positioning, and monetization.
- Recommendations reduce loss and false positives without enabling abuse.
- Replicable fraud procedures are not described.
- Exact F3 IDs were verified if used as formal references.

## Official Sources

- https://ctid.mitre.org/fraud
- https://github.com/center-for-threat-informed-defense/fight-fraud-framework
- https://github.com/center-for-threat-informed-defense/fight-fraud-framework/blob/main/public/f3-stix-v1.1.json

## Safety Limits

Do not create fraud guides, KYC evasion procedures, mule recruitment guidance, cash-out instructions, operational BEC instructions, or transactional abuse guidance. Keep the work focused on prevention, detection, investigation, response, and authorized control design.
