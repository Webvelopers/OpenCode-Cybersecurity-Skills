---
name: owasp-appsec
description: "OWASP, Top 10, ASVS, SAMM, API Security: Use when reviewing web, API, service or application security for defensive findings and remediations."
license: MIT
metadata:
  framework: "OWASP"
  target_version: "Top 10 2021, API Security Top 10 2023, ASVS 4.0.3, SAMM 2.0"
  source: "https://owasp.org"
  domain: "cybersecurity"
  subdomain: "application-security"
  tags: "owasp,appsec,api-security,asvs,samm"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---

# OWASP Application Security

Use this skill to review application, API, web service, authentication, authorization, session management, input validation, error handling, secrets, dependency, and secure configuration risks.

## Framework Base

- OWASP Top 10 for common web application risks.
- OWASP API Security Top 10 for REST, GraphQL, RPC, and exposed services.
- OWASP ASVS for verifiable controls by maturity level.
- OWASP SAMM for application security program governance and maturity.

## Workflow

1. Identify assets, users, roles, sensitive data, trust boundaries, and exposed surfaces.
2. Review authentication, authorization, object-level and function-level access control, session management, and abuse protection.
3. Review input validation, output encoding, data queries, deserialization, SSRF, file uploads, and dependencies.
4. Map findings to OWASP Top 10, OWASP API Security, or ASVS when applicable.
5. Prioritize by impact, exploitability, exposure, data sensitivity, and ease of mitigation.
6. Propose concrete remediations, defensive tests, and acceptance criteria.

## Expected Output

For reviews, provide findings with severity, evidence, impact, OWASP mapping, remediation, and validation test.

For design work, provide preventive controls, detective controls, residual risks, and open questions.

## Limits

Keep the work in an authorized defensive context. Do not generate exploitable payloads, intrusion instructions, or operational steps to compromise systems.
