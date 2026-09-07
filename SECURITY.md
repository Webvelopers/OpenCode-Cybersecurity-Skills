# Security Policy

## Supported Scope

This project contains OpenCode configuration, a read-only cybersecurity agent, cybersecurity assessment skills, and supporting documentation.

Security issues in scope include:

- Agent permissions that could allow unintended project modification.
- Skill content that enables unsafe or unauthorized activity.
- Validation bypasses that allow malformed or unsafe OpenCode configuration.
- Documentation that could mislead users about certification, compliance, or safety boundaries.
- Accidental exposure of sensitive values in examples or docs.

## Reporting a Security Issue

Do not open public issues containing secrets, credentials, private infrastructure details, or exploit instructions.

Report security concerns privately to the project maintainer or repository owner. If no private channel is available, open a minimal public issue that states a security concern exists without disclosing sensitive details.

## Expected Response

Maintainers should triage reports by impact and likelihood, then update configuration, skills, validation, or documentation as needed.

## Safety Boundaries

This project is for authorized defensive security work only. It should not be used to generate exploit payloads, bypasses, persistence steps, credential theft instructions, fraud instructions, destructive operations, or unauthorized scanning guidance.

## Secret Handling

If a secret is discovered while using this project:

- Do not print or copy the secret value into reports.
- Record only the file path, secret type, and context needed for remediation.
- Rotate or revoke the secret through the owning system.
- Investigate exposure history where appropriate.

## Compliance Note

This project supports assessment and evidence mapping only. It does not provide legal advice, audit certification, or official compliance certification.
