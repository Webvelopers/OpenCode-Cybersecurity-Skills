---
name: nist-ai-rmf-10
description: "NIST AI RMF 1.0, AI risk management, Govern Map Measure Manage: Use when assessing trustworthy AI risks and controls across the AI lifecycle."
license: MIT
metadata:
  framework: "NIST AI Risk Management Framework"
  target_version: "1.0"
  source: "https://airc.nist.gov/AI_RMF_Knowledge_Base/AI_RMF"
  domain: "cybersecurity"
  subdomain: "ai-risk-management"
  tags: "nist-ai-rmf,ai-governance,trustworthy-ai,risk-management"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# NIST AI RMF 1.0 Risk Management

Use this skill to manage AI system risks across the lifecycle, incorporating trustworthiness, responsibility, security, resilience, privacy, fairness, transparency, and continuous measurement.

## When to Use

- When assessing risks for AI, ML, LLMs, generative AI, autonomous agents, decisioning, copilots, RAG, or AI-enabled systems.
- When an AI risk register, controls, owners, evidence, or trustworthiness profile must be created.
- When AI risks need to be connected to corporate governance, privacy, cybersecurity, operational safety, or compliance.
- When the user asks for NIST AI RMF, AI RMF Playbook, trustworthy AI, or AI governance.

## Framework Scope

Target version: 1.0.

NIST AI RMF 1.0 is voluntary and is intended to improve the ability to incorporate trustworthiness considerations into the design, development, use, and evaluation of AI products, services, and systems.

Core functions:

| Function | Purpose |
|---|---|
| Govern | Establish culture, policies, roles, responsibilities, oversight, and accountability for AI risk |
| Map | Contextualize the system, actors, uses, impacts, data, dependencies, and risks |
| Measure | Analyze, evaluate, test, monitor, and quantify risks and trustworthiness characteristics |
| Manage | Prioritize, respond to, treat, monitor, and communicate AI risks |

Trustworthy AI characteristics to consider:

| Characteristic | Defensive question |
|---|---|
| Valid and reliable | Does the system work consistently in its intended context |
| Safe | Does it avoid reasonably foreseeable harm |
| Secure and resilient | Does it resist attacks, failures, and abuse |
| Accountable and transparent | Are roles, decisions, and limitations traceable |
| Explainable and interpretable | Can outputs and relevant factors be understood in context |
| Privacy-enhanced | Are personal and sensitive data protected |
| Fair with harmful bias managed | Are harmful biases identified and managed |

## Workflow

1. Define context: use case, AI actors, affected users, data, model, tools, environment, dependencies, and lifecycle phase.
2. Apply Govern: roles, policies, approvals, acceptable risks, audit, third parties, incidents, and escalation.
3. Apply Map: benefits, impacts, assumptions, limitations, sensitive data, affected populations, and external dependencies.
4. Apply Measure: metrics, tests, benchmarks, human evaluations, security, privacy, bias, robustness, and monitoring.
5. Apply Manage: risk treatment, controls, owners, communication, continuous monitoring, and pause or retirement criteria.
6. For generative AI, consider the NIST AI 600-1 profile when the user asks for GenAI-specific risks.
7. Integrate findings with NIST CSF, ATLAS, or internal controls when the risk involves cybersecurity or adversarial threats.

## Output Format

| Field | Expected content |
|---|---|
| AI risk | Clear description and scenario |
| AI RMF function | Govern, Map, Measure, or Manage |
| Impact | Individuals, organization, society, security, privacy, or operations |
| Evidence | Data, evaluations, logs, documentation, tests, or incidents |
| Control | Policy, process, test, guardrail, monitoring, or technical change |
| Measurement | Metric, method, threshold, and frequency |
| Responsible party | Risk owner and control owner |
| Residual risk | Accepted, mitigated, transferred, or pending risk |

## Verification

- The analysis covers the full lifecycle, not only the model.
- Impacts consider individuals, the organization, and society when applicable.
- Recommendations include measurement and owners.
- General AI risks, GenAI risks, and ATLAS adversarial threats are distinguished.

## Official Sources

- https://www.nist.gov/itl/ai-risk-management-framework
- https://airc.nist.gov/AI_RMF_Knowledge_Base/AI_RMF
- https://doi.org/10.6028/NIST.AI.100-1
- https://doi.org/10.6028/NIST.AI.600-1

## Safety Limits

Do not use the assessment to optimize abuse, evasion, fraud, or manipulation. Keep AI testing in authorized environments, with permitted data and appropriate safeguards.
