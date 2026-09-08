# Versioning

This project uses semantic versioning for repository releases and a Git-aware metadata version policy for individual skills.

Current project version: `0.0.3`

Initial skill metadata version: `0.0.3`

## Version Sources

| File | Purpose |
|---|---|
| `VERSION` | Single source of truth for the current project release version. |
| `README.md` | Human-readable project version and release status. |
| `.opencode/skills/cybersecurity/README.md` | Skill library metadata baseline and skill catalog notes. |
| `CHANGELOG.md` | Human-readable release history and notable changes. |
| `SKILL.md` frontmatter | Per-skill `metadata.version`, validated against Git state. |

## Project Release Version

The root `VERSION` file defines the project release version. For release `0.0.3`, the project includes versioning documentation updates and validation hardening for dependency directories and missing required documentation files.

When publishing a new project release:

1. Update `VERSION` to the next semantic version.
2. Update `README.md` project version and release status.
3. Update `.opencode/skills/cybersecurity/README.md` when the skill metadata baseline changes.
4. Add a new `CHANGELOG.md` release entry with `Added`, `Changed`, `Fixed`, or `Security` sections as needed.
5. Run `node --test test/validate.test.js`.
6. Run `node scripts/validate-opencode.js`.

## Skill Metadata Version Policy

Each `SKILL.md` file has a `metadata.version` field. The validator compares skill versions with Git HEAD:

- An unchanged tracked `SKILL.md` must keep the version recorded in Git HEAD.
- A changed tracked `SKILL.md` may keep the Git HEAD version or bump only to the immediate next patch version.
- A new `SKILL.md` must start with the current root `VERSION` value.
- Framework target versions are separate from project release versions and remain in `metadata.target_version`.

This keeps repository releases and skill content revisions coordinated without forcing every existing skill to change metadata version on every project release.

## Release `0.0.3` Changes

Release `0.0.3` documents and validates the following project-level changes:

- Documented the project versioning policy and release checklist.
- Documented release source files and skill metadata version rules.
- Hardened Markdown validation to ignore dependency documentation under `node_modules`.
- Hardened required-document validation to avoid uncontrolled `ENOENT` failures.

## Release `0.0.2` Changes

Release `0.0.2` documents and validates the following project-level changes:

- Added architecture and internal component documentation.
- Added validation script unit tests.
- Added GitHub Actions CI/CD validation workflow.
- Added OpenCode JSON Schema documentation and validation checks.
- Expanded framework crosswalk interoperability guidance.
- Added skill scaffolding automation.
- Extended agent permission validation checks.
- Added Markdown internal-link validation for project documentation.
- Normalized CRLF frontmatter parsing for Windows compatibility.
- Ensured `TODO.md` is tracked so CI/CD can validate required documentation.
- Excluded `.opencode/node_modules` from repository validation and Git tracking.

## Validation Commands

Use these commands before committing release or validation changes:

```bash
node --test test/validate.test.js
node scripts/validate-opencode.js
```
