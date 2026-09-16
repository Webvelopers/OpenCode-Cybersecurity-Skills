# Health Dashboard

This repository includes a read-only skill health report for local checks and CI.

## Skill Health Report

Run the report without writing files:

```bash
node scripts/skill-health.js
```

Run it as a failing gate:

```bash
node scripts/skill-health.js --check
```

The report summarizes:

- Skill discovery and category counts.
- Required skill metadata and metadata source hygiene.
- Required skill body sections.
- `references/standards.md` presence, required reference sections, dates, and official-source URLs.
- Catalog manifest coverage.
- Documentation coverage across the agent routing table, skill README, and framework crosswalk.
- Generated catalog drift.

Use `--json` when another tool needs structured output:

```bash
node scripts/skill-health.js --json
```

## Optional Graphify Review

Graphify can be useful for visual inspection of documentation and skill relationships, but its generated output must not be committed.

Use a temporary output directory outside the repository when possible.

PowerShell example:

```powershell
$GraphifyOut = Join-Path $env:TEMP "skills-graphify"
graphify . --output "$GraphifyOut"
```

Bash example:

```bash
GRAPHIFY_OUT="$(mktemp -d)"
graphify . --output "$GRAPHIFY_OUT"
```

If a local run must write under the repository, use the ignored `/graphify-out` path, review the result locally, then delete it before final validation. The quality gates reject tracked `graphify-out` content and generated cache paths.
