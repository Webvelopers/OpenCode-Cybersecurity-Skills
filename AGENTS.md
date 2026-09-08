# Agent Instructions

This repository contains project-scoped OpenCode cybersecurity skills, validation tooling, and documentation for authorized defensive security assessment workflows.

## Operating Scope

- Keep all work defensive, authorized, and documentation-focused unless explicitly asked to implement repository changes.
- Do not add exploit payloads, credential theft guidance, persistence steps, evasion steps, destructive operations, fraud execution guidance, or unauthorized scanning instructions.
- Preserve the read-only intent of the `cybersecurity` agent unless the user explicitly asks for configuration changes.

## Repository Standards

- Keep Markdown content ASCII-only unless there is a clear project need for non-ASCII text.
- Keep skill names stable because users may reference them directly.
- Each `SKILL.md` must live in a directory whose basename matches its `name` frontmatter field.
- Each skill must include `references/standards.md`.
- Update `docs/framework-crosswalk.md` when adding, removing, or renaming skills.
- Update `CHANGELOG.md` for notable changes.
- Update `docs/versioning.md` when changing versioning policy or release process.

## Validation

Run these checks after changing OpenCode config, agents, commands, skills, scripts, schemas, or documentation:

```bash
node --test test/validate.test.js
node scripts/validate-opencode.js
```

The validation script checks OpenCode configuration, agent permissions, skill metadata, required documentation, Markdown links, ASCII content, schema files, and version consistency.

## Versioning

- The root `VERSION` file is the project release version source of truth.
- `README.md`, `.opencode/skills/cybersecurity/README.md`, `docs/framework-crosswalk.md`, `docs/versioning.md`, and `CHANGELOG.md` must stay synchronized with the root version.
- New `SKILL.md` files must start with the current root `VERSION` value.
- Existing tracked skill metadata versions are validated against Git HEAD and may only move to the immediate next patch when the skill file changes.

## File Hygiene

- Do not commit dependency directories such as `.opencode/node_modules`.
- Do not commit generated Graphify output under `graphify-out`.
- Keep `TODO.md` tracked because CI validation requires it.
