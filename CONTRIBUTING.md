# Contributing

Contributions should preserve the project goal: safe, authorized, defensive cybersecurity assessment through OpenCode skills and a read-only evaluation agent.

## Contribution Scope

Accepted contributions include:

- New defensive cybersecurity skills.
- Updates to official framework references and version notes.
- Improvements to the `cybersecurity` agent evaluation workflow.
- Validation script improvements.
- Documentation, crosswalk, and changelog updates.
- Safety clarifications that reduce misuse risk.

Out of scope contributions include:

- Exploit payloads or operational intrusion instructions.
- Credential theft, persistence, evasion, fraud, or destructive guidance.
- Commands or permissions that make the `cybersecurity` agent modify repositories.
- Unvalidated framework IDs presented as authoritative references.

## Skill Requirements

Skill metadata version validation is based on Git. For tracked skills, unchanged `SKILL.md` files must keep the `metadata.version` from `HEAD`. A changed `SKILL.md` may keep the Git version or move to the immediate next patch version. New skills, and skills before the first commit, must start at the root `VERSION` value.

Every skill must follow the OpenCode skill layout:

```text
.opencode/skills/cybersecurity/<category>/<skill-name>/SKILL.md
.opencode/skills/cybersecurity/<category>/<skill-name>/references/standards.md
```

The skill directory basename must match the `name` field in `SKILL.md`.

Every `SKILL.md` must include:

- `name`
- `description`
- `license: MIT`
- `metadata.framework`
- `metadata.target_version`
- `metadata.source`
- `metadata.domain`
- `metadata.subdomain`
- `metadata.tags`
- `metadata.version`
- `metadata.author`

## Documentation Requirements

- Update `docs/framework-crosswalk.md` when a skill is added, removed, renamed, or significantly changed.
- Update `CHANGELOG.md` for notable changes.
- Update `README.md` if usage, layout, validation, or behavior changes.
- Keep Markdown ASCII-only unless there is a strong compatibility reason not to.
- Keep `README.md`, `CHANGELOG.md`, `docs/framework-crosswalk.md`, and skill metadata aligned with the per-skill version policy.

## Validation

Run this command before submitting changes:

```bash
node scripts/validate-opencode.js
```

The validation must pass before changes are considered ready.

## Safety Review

Before submitting a change, confirm that it:

- Keeps the `cybersecurity` agent read-only.
- Requires approval before shell commands.
- Does not introduce write-capable automation.
- Does not include offensive operational procedures.
- Clearly separates evidence, assumptions, and recommendations.
