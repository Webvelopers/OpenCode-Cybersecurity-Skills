# OpenCode Cybersecurity Skills

Project-scoped OpenCode configuration for cybersecurity assessment workflows. This repository provides a curated set of defensive cybersecurity skills and a read-only `cybersecurity` agent for evaluating codebases, architecture, dependencies, controls, AI systems, fraud risk, and security posture.

Project version: `0.0.3`

Initial skill metadata version: `0.0.3`

Release status: stable release with versioning documentation and validation hardening.

## Purpose

The project helps OpenCode perform structured security evaluations without modifying the target codebase. It focuses on authorized defensive work, risk analysis, detection, governance, hardening, AI security, fraud risk analysis, and framework-based reporting.

## Repository Layout

| Path | Purpose |
|---|---|
| `.opencode/opencode.json` | Project OpenCode configuration that loads the cybersecurity skill path |
| `.opencode/agent/cybersecurity.md` | Read-only security evaluation agent |
| `.opencode/command/security-assessment.md` | Reusable command prompt for security assessments |
| `.opencode/skills/cybersecurity` | Cybersecurity skill library |
| `.opencode/skills/cybersecurity/frameworks` | Framework-level mapping and risk assessment skills |
| `.opencode/skills/cybersecurity/appsec` | Application and API security skills |
| `.opencode/skills/cybersecurity/governance` | Governance, risk, compliance, and incident response skills |
| `.opencode/skills/cybersecurity/detection` | Detection engineering and threat hunting skills |
| `.opencode/skills/cybersecurity/hardening` | Secure configuration and baseline hardening skills |
| `.opencode/skills/cybersecurity/threat-modeling` | Attack-path and adversary progression modeling skills |
| `docs/framework-crosswalk.md` | Framework-to-skill crosswalk |
| `docs/architecture.md` | Architecture and internal component documentation |
| `docs/versioning.md` | Project release and skill metadata versioning policy |
| `scripts/validate-opencode.js` | Local validation script |
| `TODO.md` | Refactor checklist and execution status |
| `CHANGELOG.md` | Project change history |
| `LICENSE.md` | MIT License |
| `VERSION` | Single source of truth for the project release and initial skill metadata version |

## Cybersecurity Frameworks

The skills are based on recognized security frameworks and official references:

- MITRE ATT&CK v19.1 for adversary behavior and TTP mapping.
- NIST Cybersecurity Framework 2.0 for organizational security posture.
- MITRE ATLAS 2026.07 for AI/ML adversarial threats.
- MITRE D3FEND v1.4.0 for defensive countermeasures.
- NIST AI RMF 1.0 for AI risk management.
- MITRE Fight Fraud Framework v1.1 for cyber-enabled financial fraud TTPs.
- OWASP guidance for application and API security.
- CIS Controls and CIS Benchmarks for hardening and secure configuration.
- Cyber Kill Chain for attack-path modeling and defensive breakpoints.

## Agent Behavior

The `cybersecurity` agent is designed to evaluate, not modify.

- Reads and analyzes project files.
- Uses the cybersecurity skills as assessment playbooks.
- Maps findings to relevant frameworks.
- Produces prioritized security findings and recommendations.
- Denies file edits.
- Requires user approval before running shell commands.
- Explicitly denies common mutating commands such as dependency installation, git state changes, infrastructure apply/destroy operations, and destructive file operations.

## Installation

1. Place this repository content at the root of the project where OpenCode should load the cybersecurity configuration.
2. Keep `.opencode/opencode.json` in the project root or ensure OpenCode starts from a descendant of this directory.
3. Restart OpenCode after cloning or changing this configuration because OpenCode loads configuration at startup.

## Usage

Select or invoke the `cybersecurity` agent for security assessments.

Example prompts:

- Review this project for OWASP application security risks.
- Map suspicious behavior in these logs to MITRE ATT&CK.
- Evaluate this AI agent design using MITRE ATLAS and NIST AI RMF.
- Assess organizational controls using NIST CSF 2.0.
- Recommend defensive countermeasures using MITRE D3FEND.
- Assess this payment flow for cyber-enabled fraud risk using MITRE F3.

## Security Assessment Command

The project includes an OpenCode command at `.opencode/command/security-assessment.md`.

Use it when you want a consistent, findings-first assessment format routed to the `cybersecurity` agent. Provide the scope after the command, such as a subsystem, feature, architecture document, dependency set, or incident narrative.

## Validation

Run the local validation script after changing OpenCode config, agents, commands, skills, or documentation:

```bash
node scripts/validate-opencode.js
```

The validation script checks:

- `.opencode/opencode.json` JSON validity and skill path configuration.
- `cybersecurity` agent discovery and read-only permission expectations.
- Skill discovery under `.opencode/skills/cybersecurity`.
- Skill `name` and folder-name matching.
- Required skill metadata fields.
- Per-skill metadata version policy against Git HEAD and git-detected `SKILL.md` changes.
- Required `references/standards.md` files.
- Command routing for `.opencode/command/security-assessment.md`.
- Required root documentation files.
- ASCII-only Markdown content.

## Maintenance

- Keep skill names stable because users may reference them directly.
- Keep each `SKILL.md` in a directory whose basename matches its `name` field.
- Add official source and version notes to `references/standards.md` when framework content changes.
- Update `docs/framework-crosswalk.md` when adding, removing, or renaming skills.
- Update `CHANGELOG.md` for notable changes.
- Run `node scripts/validate-opencode.js` before committing changes.

## Framework Version Policy

See `docs/versioning.md` for the full project release and skill metadata versioning policy.

Skill metadata version validation is based on Git. For tracked skills, the validator reads the current version from `HEAD:<SKILL.md>`. If the working `SKILL.md` has no git changes, `metadata.version` must match the Git version. If the working `SKILL.md` has git changes, it may keep the Git version or move to the immediate next patch, such as `0.0.1` to `0.0.2`. New skills, and skills before the first commit, must start at the root `VERSION` value.

Framework target versions are separate from the project release version. They follow each skill's `metadata.target_version` field and the crosswalk. If a live official source publishes a later framework version, keep the target framework version for analysis consistency unless the user explicitly asks for the latest version.

Exact framework IDs should be validated against official sources before formal reporting.

## Releases

Release `0.0.3` documents versioning policy and validation hardening updates.

Release `0.0.2` adds Graphify-based project improvements, automated validation, unit tests, CI/CD, scaffolding, stronger documentation validation, and GitHub Actions fixes.

The first documented release is `0.0.1`, representing the initial commit baseline for the OpenCode cybersecurity skill library, read-only `cybersecurity` agent, validation tooling, and project documentation.

## Safety Scope

This project is for authorized defensive security work only. It should not be used to generate exploit payloads, bypasses, persistence steps, credential theft instructions, fraud instructions, destructive operations, or unauthorized scanning guidance.

## License

This project is licensed under the MIT License. See `LICENSE.md` for details.
