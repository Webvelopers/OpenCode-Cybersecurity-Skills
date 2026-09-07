# Changelog

All notable changes to this project will be documented in this file.

This project follows a simple human-readable changelog format. Dates use `YYYY-MM-DD`.

## [0.0.2] - 2026-09-07

Project improvements and enhancements based on Graphify codebase analysis and TODO planning.

### Added

- Architecture and internal component documentation at `docs/architecture.md`.
- Comprehensive unit test suite for the validation script at `test/validate.test.js`.
- GitHub Actions CI/CD automated validation workflow at `.github/workflows/validate.yml`.
- JSON Schema definition for OpenCode configuration at `schemas/opencode.schema.json` and schema validation in `validateConfig()`.
- Expanded interoperability and cross-framework mapping matrix in `docs/framework-crosswalk.md`.
- Skill scaffolding utility script at `scripts/scaffold-skill.js`.
- Extended security boundary and permission rule checks in `.opencode/agent/cybersecurity.md` and `validateAgent()`.
- Automated Markdown internal link and reference validation in `validateDocs()`.
- Robust Windows line-ending (`CRLF`) handling in frontmatter parsing.

### Fixed

- Removed `TODO.md` from `.gitignore` so that `TODO.md` is tracked in git and available in GitHub Actions CI/CD workflows, resolving the ENOENT validation error.

## [0.0.1] - 2026-09-07

Initial release and initial commit baseline for the OpenCode Cybersecurity Skills project.

### Added

- Project-scoped OpenCode configuration in `.opencode/opencode.json`.
- Read-only `cybersecurity` OpenCode agent for security evaluations.
- Cybersecurity skill library under `.opencode/skills/cybersecurity`.
- Framework skills for MITRE ATT&CK, NIST CSF, MITRE ATLAS, MITRE D3FEND, NIST AI RMF, and MITRE F3.
- Operational skills for OWASP AppSec, NIST cyber risk, Cyber Kill Chain, MITRE ATT&CK detection engineering, and CIS hardening.
- Official `references/standards.md` files for each skill.
- Categorized skill taxonomy under `frameworks`, `appsec`, `governance`, `detection`, `hardening`, and `threat-modeling`.
- Reusable OpenCode `security-assessment` command.
- Local validation script at `scripts/validate-opencode.js`.
- Framework crosswalk documentation at `docs/framework-crosswalk.md`.
- Root `README.md`, `TODO.md`, and MIT `LICENSE.md`.
- Root `VERSION` file set to `0.0.1` as the project release and initial skill metadata version.
- Standardized skill frontmatter with MIT license metadata and consistent source, domain, subdomain, tag, version, and author fields.
- Coordinated all initial skill `metadata.version` values with project version `0.0.1`.
- Git HEAD based validation policy that allows the next skill patch version only for git-detected `SKILL.md` changes.
- Hardened the `cybersecurity` agent permission block to deny common write-capable, dependency-changing, infrastructure-changing, and git-state-changing shell commands.

### Security

- Agent permissions deny repository edits and require user approval before shell command execution.
- Skill content is scoped to authorized defensive assessment, detection, governance, hardening, and risk reduction.
