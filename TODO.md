# TODO

Legend: [ ] pending | [-] on process | [x] completed

## GStack-Inspired Improvement Plan

### Priority 1 - CI and Framework Drift

- [x] 1. Fix `.opencode` dependency audit behavior so CI works from a clean checkout.
- [x] 2. Align README framework notes with the actual D3FEND target version.
- [x] 3. Add validation coverage for the CI lockfile preparation step.
- [x] 4. Run `node --test test/validate.test.js` and `node scripts/validate-opencode.js`.

### Priority 2 - Validation Hardening

- [x] 1. Reject scaffold placeholders such as `https://example.com`, `YYYY-MM-DD`, and generic framework values.
- [x] 2. Validate `Last verified` dates and official-source URLs in `references/standards.md`.
- [x] 3. Add consistency checks between skill metadata, `README.md`, `.opencode/skills/cybersecurity/README.md`, and `docs/framework-crosswalk.md`.
- [x] 4. Add negative fixture tests for invalid skills, invalid references, unsafe agent permissions, and broken CI assumptions.

### Priority 3 - Validator Maintainability

- [x] 1. Split `scripts/validate-opencode.js` into focused modules for config, agent, skills, docs, workflow, and version policy.
- [x] 2. Move filesystem and Git inspection into an explicit `main()` path instead of module-load side effects.
- [x] 3. Export pure validators for unit testing.

### Priority 4 - Catalog Generation

- [x] 1. Introduce a checked skill manifest or derived metadata model for skill catalog data.
- [x] 2. Generate crosswalk rows, skill README entries, and agent routing tables from one source of truth.
- [x] 3. Add a freshness check so generated docs cannot drift from skill metadata.

### Priority 5 - CI Quality Gates

- [x] 1. Add actionlint for GitHub Actions syntax and policy checks.
- [x] 2. Add secret scanning for changed text without printing secret values.
- [x] 3. Add a forbidden-artifacts gate for `node_modules`, `graphify-out`, and generated caches.
- [x] 4. Add markdown lint/link checks and dependency review or OSV scanning.

### Priority 6 - Security Assessment UX

- [x] 1. Add scoped assessment commands for appsec, AI security, supply chain, and vulnerability triage.
- [x] 2. Add a lightweight router command that recommends the right skill set from the requested scope.

### Priority 7 - Health Dashboard

- [x] 1. Add a read-only `skill:check`-style report for skills, references, metadata, doc coverage, and drift.
- [x] 2. Document optional Graphify health usage without committing generated Graphify output.
