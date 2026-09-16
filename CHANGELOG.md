# Changelog

All notable changes to this project will be documented in this file.

This project follows a simple human-readable changelog format. Dates use `YYYY-MM-DD`.

## [0.0.4] - 2026-09-16

### Added

- Recorded the gstack-inspired repository improvement plan in `TODO.md`.
- Added negative validation tests for scaffold placeholders, reference metadata, agent bash permissions, workflow audit ordering, and documentation drift.
- Split OpenCode validation into focused modules for config, agent, workflow, skills, docs, and version policy.
- Added a checked skill catalog manifest and generator for agent routing, skill README entries, and framework crosswalk rows.
- Added CI quality gates for actionlint, changed-text secret scanning with suppressed values, forbidden tracked artifacts, Markdown hygiene, and dependency audit coverage.
- Added scoped OpenCode assessment commands for appsec, AI security, supply chain, vulnerability triage, and a lightweight security router.
- Added a read-only skill health report and optional Graphify health documentation that keeps generated output untracked.

### Fixed

- Aligned the README MITRE D3FEND framework note with the skill target version `v1.6.0`.
- Added deterministic `.opencode` package-lock preparation before the CI dependency audit.
- Hardened validation for scaffold placeholders, `Last verified` dates, official-source URLs, and skill metadata consistency across repository docs.
- Moved validation filesystem and Git inspection into an explicit `main()` context instead of module-load side effects.
- Added generated catalog freshness validation to prevent manual drift in catalog surfaces.
- Hardened command validation so assessment commands must route to the `cybersecurity` agent, accept user scope, preserve read-only boundaries, and reference required skills.
- Added CI and agent allowlist coverage for the skill health check.

## [0.0.3] - 2026-09-08

Versioning documentation and validation hardening release.

### Added

- Documented project versioning policy and release checklist in `docs/versioning.md`.
- Updated version references across `VERSION`, `README.md`, `.opencode/skills/cybersecurity/README.md`, `docs/framework-crosswalk.md`, and `docs/versioning.md`.
- Added root `AGENTS.md` with repository operating scope, validation rules, versioning policy, and file hygiene guidance for AI agents.
- Added `software-supply-chain-security` skill for NIST SSDF, SLSA, OpenSSF Scorecard, SBOM, dependency, CI/CD, provenance, and artifact trust reviews.
- Added `vulnerability-risk-prioritization` skill for CVSS v4.0, EPSS, CISA KEV, CWE, CVE, NVD, OSV, and vendor advisory triage.
- Added `owasp-genai-security` skill for OWASP GenAI LLM Top 10 2026, LLM, RAG, prompt, agent, tool, and output handling reviews.
- Added `mobile-appsec` skill for OWASP MASVS, MASWE, MASTG, Android, iOS, hybrid, and mobile API reviews.

### Fixed

- Documented and preserved validation hardening for dependency directories and missing required documentation files.
- Strengthened validation for skill body sections, reference metadata sections, valid skill categories, framework crosswalk coverage, catalog coverage, and agent routing coverage.
- Updated existing skill references with last-verified dates, pinning rationale, ID conventions, and validation guidance.
- Updated cybersecurity agent routing, the skill catalog, and the framework crosswalk for new skills and boundary rules.
- Hardened the `cybersecurity` agent bash permissions from broad approval to a deny-by-default read-only allowlist.
- Hardened GitHub Actions with minimal token permissions, pinned action SHAs, Dependabot update coverage, and a high-severity npm audit check.
- Tightened the project OpenCode schema and validation rules for unexpected config keys and semantic bash permission ordering.
- Updated the skill scaffold template so generated skills match current validation requirements.

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
- Versioning documentation at `docs/versioning.md` covering project releases, skill metadata policy, release checklist, and validation commands.

### Fixed

- Removed `TODO.md` from `.gitignore` so that `TODO.md` is tracked in git and available in GitHub Actions CI/CD workflows, resolving the ENOENT validation error.
- Excluded `node_modules` directories from repository Markdown validation so third-party package documentation is not checked for project ASCII or internal-link rules.
- Hardened documentation validation to skip ASCII and link checks for missing files, reporting required missing files through controlled validation errors instead of throwing `ENOENT`.

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
