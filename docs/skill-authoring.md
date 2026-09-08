# Skill Authoring Guide

This guide defines the standard for cybersecurity skills in this repository.

Skill metadata version validation is based on Git. For tracked skills, the validator compares the working `metadata.version` with the version in `HEAD:<SKILL.md>`. An unchanged `SKILL.md` must keep the Git version. A changed `SKILL.md` may keep the Git version or move to the immediate next patch version, such as `0.0.1` to `0.0.2`. New skills, and skills before the first commit, must start at the root `VERSION` value.

See `docs/versioning.md` for the full project release and skill metadata versioning policy.

## File Layout

Use this layout for every skill:

```text
.opencode/skills/cybersecurity/<category>/<skill-name>/SKILL.md
.opencode/skills/cybersecurity/<category>/<skill-name>/references/standards.md
```

Valid categories are:

- `frameworks`
- `appsec`
- `governance`
- `detection`
- `hardening`
- `threat-modeling`

## Frontmatter Standard

Use only OpenCode-safe top-level skill fields and a string-valued `metadata` map:

```yaml
---
name: example-skill
description: "Keywords and trigger phrase: Use when the agent should load this skill."
license: MIT
metadata:
  framework: "Framework name"
  target_version: "Target version"
  source: "https://official-source.example"
  domain: "cybersecurity"
  subdomain: "subdomain-name"
  tags: "comma,separated,tags"
  version: "0.0.1"
  author: "Webvelopers, Inc."
---
```

The `name` value must match the skill directory basename.

## Body Standard

Use this section order unless a skill has a strong reason to differ:

1. Title
2. Short purpose paragraph
3. `## When to Use`
4. `## Framework Scope` or `## Framework Base`
5. `## Workflow`
6. `## Output Format` or `## Expected Output`
7. `## Verification`
8. `## Official Sources`
9. `## Safety Limits`

## Reference Standard

Each `references/standards.md` file should include:

- Target version.
- Official sources.
- Scope notes.
- ID conventions when applicable.
- Validation guidance.

## Safety Standard

Skills must remain defensive and authorized. Do not include:

- Exploit payloads.
- Credential theft instructions.
- Persistence or evasion procedures.
- Fraud execution guidance.
- Destructive operations.
- Unauthorized scanning instructions.

## Validation

Run the validator after authoring or modifying a skill:

```bash
node scripts/validate-opencode.js
```
