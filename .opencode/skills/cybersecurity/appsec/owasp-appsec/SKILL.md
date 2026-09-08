---
name: owasp-appsec
description: "OWASP, Top 10, ASVS, SAMM, API Security: Use when reviewing web, API, service or application security for defensive findings and remediations."
license: MIT
metadata:
  framework: "OWASP"
  target_version: "Top 10 2021, API Security Top 10 2023, ASVS 5.0.0, SAMM 2.0"
  source: "https://owasp.org"
  domain: "cybersecurity"
  subdomain: "application-security"
  tags: "owasp,appsec,api-security,asvs,samm"
  version: "0.0.2"
  author: "Webvelopers, Inc."
---

# OWASP Application Security

Use this skill to review application, API, web service, authentication, authorization, session management, input validation, output handling, error handling, secrets, dependency, and secure configuration risks.

## When to Use

- When reviewing web applications, APIs, services, authentication, authorization, sessions, input handling, output encoding, secrets, dependency risk, logging, or secure design.
- When findings need mapping to OWASP Top 10, OWASP API Security Top 10, ASVS, SAMM, or OWASP Cheat Sheet guidance.
- When the user needs defensive remediation guidance, verification criteria, or secure SDLC recommendations.
- When mobile or GenAI-specific concerns appear, route those parts to `mobile-appsec` or `owasp-genai-security` if available.

## Framework Scope

Target versions: OWASP Top 10 2021, OWASP API Security Top 10 2023, OWASP ASVS 5.0.0, and OWASP SAMM 2.0.

OWASP provides community-driven guidance for application security risks, verifiable security requirements, secure development maturity, and API-specific weaknesses. ASVS 5.0.0 identifiers should be cited with a version prefix when used formally, such as `v5.0.0-1.2.5`.

Core review areas:

| Area | Examples |
|---|---|
| Access control | Broken object-level authorization, function-level authorization, privilege checks, tenancy boundaries |
| Identity and session | Authentication flows, MFA, credential recovery, session fixation, token lifecycle |
| Input and output | Injection, deserialization, SSRF, file uploads, template rendering, output encoding |
| API security | BOLA, BFLA, mass assignment, rate limiting, schema validation, excessive data exposure |
| Software design | Threat modeling, secure defaults, abuse cases, logging, monitoring, SDLC maturity |
| Dependencies and secrets | Known vulnerable components, exposed secrets, insecure package configuration |

## Workflow

1. Identify assets, users, roles, sensitive data, trust boundaries, exposed endpoints, and abuse cases.
2. Review authentication, authorization, object-level and function-level access control, session management, and abuse protection.
3. Review input validation, output encoding, data queries, deserialization, SSRF, file uploads, templates, and dependency handling.
4. Map findings to the most specific OWASP source: Top 10, API Security Top 10, ASVS requirement, SAMM practice, or Cheat Sheet.
5. Prioritize by impact, exploitability, exposure, data sensitivity, business context, and ease of mitigation.
6. Propose concrete remediations, defensive tests, acceptance criteria, owner, and residual risk.

## Output Format

| Field | Expected content |
|---|---|
| Finding | Concise application security issue |
| Evidence | File, endpoint, config, dependency, test, log, or design observation |
| OWASP mapping | Top 10/API/ASVS/SAMM/Cheat Sheet reference when validated |
| Impact | Confidentiality, integrity, availability, privacy, fraud, or business effect |
| Remediation | Defensive change, design control, test, or process improvement |
| Validation | Unit, integration, security, or review test to confirm closure |
| Residual risk | Remaining exposure, assumption, or monitoring need |

## Verification

- Findings are tied to observable code, configuration, dependency, architecture, or behavior.
- ASVS identifiers include the target version when used as formal requirements.
- API findings distinguish authentication, object authorization, function authorization, rate limiting, and schema validation.
- Recommendations remain defensive and include testable acceptance criteria.

## Official Sources

- https://owasp.org/www-project-top-ten/
- https://owasp.org/www-project-api-security/
- https://owasp.org/www-project-application-security-verification-standard/
- https://github.com/OWASP/ASVS/tree/v5.0.0
- https://owasp.org/www-project-samm/
- https://cheatsheetseries.owasp.org/

## Safety Limits

Keep the work in an authorized defensive context. Do not generate exploitable payloads, intrusion instructions, bypass procedures, credential theft guidance, or operational steps to compromise systems.
