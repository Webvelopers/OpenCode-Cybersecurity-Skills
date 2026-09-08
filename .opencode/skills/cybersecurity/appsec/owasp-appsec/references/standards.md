# OWASP References

Target versions: Top 10 2021, API Security Top 10 2023, ASVS 5.0.0, SAMM 2.0.

Last verified: 2026-09-08.

Pinning rationale: These versions are the current stable or current project references verified during the 0.0.3 skill improvement pass. If OWASP releases newer guidance, keep this pin for repeatable analysis unless the user asks for latest.

## Official Sources

- OWASP: https://owasp.org
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP API Security: https://owasp.org/www-project-api-security/
- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- OWASP ASVS 5.0.0 source: https://github.com/OWASP/ASVS/tree/v5.0.0
- OWASP SAMM: https://owasp.org/www-project-samm/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/

## Scope Notes

Use OWASP for application and API security reviews, including authentication, authorization, input handling, output encoding, dependency risk, secrets, logging, monitoring, and secure design. Use `mobile-appsec` for MASVS/MASTG mobile-specific review and `owasp-genai-security` for GenAI/LLM-specific review.

## ID Conventions

- OWASP Top 10 categories use identifiers such as `A01:2021`.
- OWASP API Security Top 10 categories use identifiers such as `API1:2023`.
- ASVS 5.0.0 requirements should be cited as `v5.0.0-<chapter>.<section>.<requirement>`, for example `v5.0.0-1.2.5`.
- SAMM mappings should include business function, security practice, stream, and maturity level when precision is needed.

## Validation Guidance

Map findings to the most specific applicable OWASP project. Do not overstate ASVS level compliance without evidence. Confirm exact ASVS IDs against the v5.0.0 release when used in formal reporting.
