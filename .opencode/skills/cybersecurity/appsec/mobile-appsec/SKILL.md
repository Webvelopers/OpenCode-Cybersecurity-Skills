---
name: mobile-appsec
description: "OWASP MASVS, MASWE, MASTG, mobile appsec: Use when reviewing Android, iOS, mobile API, storage, crypto, auth, network, platform, code, resilience, or privacy risks."
license: MIT
metadata:
  framework: "OWASP Mobile Application Security"
  target_version: "Current MASVS, MASWE, and MASTG"
  source: "https://mas.owasp.org/MASVS/"
  domain: "cybersecurity"
  subdomain: "mobile-application-security"
  tags: "owasp-masvs,mastg,maswe,mobile,android,ios"
  version: "0.0.3"
  author: "Webvelopers, Inc."
---

# Mobile Application Security

Use this skill to review Android and iOS application risks using OWASP Mobile Application Security Verification Standard, Mobile Application Security Weakness Enumeration, and Mobile Application Security Testing Guide.

## When to Use

- When reviewing Android, iOS, hybrid, or cross-platform mobile applications.
- When risks involve local storage, cryptography, authentication, authorization, network communication, platform interaction, code quality, resilience, privacy, or mobile API usage.
- When the user provides mobile manifests, entitlements, deep links, WebViews, mobile storage, network security config, build settings, or app store release concerns.
- When mobile-specific findings need MASVS, MASWE, or MASTG mapping.

## Framework Scope

Target versions: current OWASP MASVS, MASWE, and MASTG documentation.

OWASP MASVS defines mobile security controls. MASWE enumerates mobile weakness patterns. MASTG provides testing guidance, knowledge, and platform-specific checks for Android and iOS.

Core review areas:

| Area | Examples |
|---|---|
| Storage | Sensitive data, backups, logs, screenshots, key storage, app sandbox |
| Cryptography | Randomness, key generation, key storage, algorithms, signatures |
| Authentication and authorization | Biometrics, step-up auth, sessions, local auth, sensitive actions |
| Network | TLS, certificate validation, cleartext traffic, pinning, trust stores |
| Platform interaction | Deep links, intents, URL schemes, WebViews, IPC, permissions |
| Code and resilience | Build settings, debug flags, dynamic loading, tamper resistance, runtime integrity |
| Privacy | Tracking, consent, permissions, data minimization, disclosures |

## Workflow

1. Identify platform, framework, release channel, target SDK, build type, permissions, entitlements, data flows, and backend/API dependencies.
2. Map scope to MASVS categories and relevant MASWE weakness entries.
3. Review storage, crypto, auth, network, platform, code, resilience, and privacy controls.
4. Use MASTG test references to propose safe verification steps and evidence requirements.
5. Prioritize by data sensitivity, exploitability, device exposure, user impact, fraud risk, and remediation effort.
6. Recommend defensive fixes, mobile regression tests, release gates, and residual risk tracking.

## Output Format

| Field | Expected content |
|---|---|
| Mobile area | MASVS domain or mobile platform concern |
| Evidence | Manifest, entitlement, code, config, dependency, build setting, or test observation |
| Mapping | MASVS control, MASWE weakness, MASTG test, or related OWASP source |
| Impact | Data exposure, auth bypass, tampering, fraud, privacy, or availability impact |
| Remediation | Defensive change, platform control, build setting, or release gate |
| Validation | MASTG-aligned test, code review, config check, or regression test |
| Residual risk | Platform dependency, exception, or monitoring need |

## Verification

- Findings distinguish Android, iOS, hybrid, and backend/API concerns.
- MASVS/MASWE/MASTG identifiers are validated against current OWASP mobile sources.
- Testing guidance remains authorized and defensive.
- Resilience recommendations avoid bypass instructions and focus on defensive assurance.

## Official Sources

- https://mas.owasp.org/MASVS/
- https://mas.owasp.org/MASWE/
- https://mas.owasp.org/MASTG/
- https://github.com/OWASP/owasp-mastg

## Safety Limits

Do not provide mobile exploitation procedures, bypass steps, tampering instructions, jailbreak/root bypass guidance, or credential theft guidance. Keep analysis focused on defensive review and verification.
