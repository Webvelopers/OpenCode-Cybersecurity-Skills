# Architecture and Internal Components

This document describes the internal architecture, validation script modules, configuration schema, and file system helpers of the project, improving component documentation and graph connectivity.

## Core Components

### 1. Validation Engine (`scripts/validate-opencode.js` and `scripts/validators/`)
The validation entrypoint builds an explicit runtime context in `main()`, then delegates structural, frontmatter, version, and security checks to focused modules. Filesystem and Git inspection happen through that context instead of at module load time.
- `scripts/validators/config.js`: Validates `.opencode/opencode.json`, the local schema expectations, and command routing.
- `scripts/validators/agent.js`: Ensures `.opencode/agent/cybersecurity.md` exists, defines the `cybersecurity` primary agent, and enforces read-only security permissions.
- `scripts/validators/workflow.js`: Validates GitHub Actions permissions, pinned actions, dependency audit preparation, dependency audit execution, and Dependabot coverage.
- `scripts/validators/skills.js`: Recursively validates skill frontmatter, required sections, references, placeholder rejection, source URLs, documentation coverage, and metadata consistency.
- `scripts/validators/catalog.js`: Validates `scripts/skill-catalog.json` and generated catalog block freshness.
- `scripts/validators/version.js`: Enforces semantic versioning and Git HEAD diff versioning rules for modified and new skills.
- `scripts/validators/docs.js`: Validates required documentation files, ASCII content, internal links, and release/version text.
- `scripts/validators/common.js`: Provides shared pure helpers such as `parseFrontmatterText()`, `missingMarkdownSections()`, skill category parsing, URL extraction, and permission rule parsing.

### 2. CI Quality Gates (`scripts/quality-gates.js`)
The quality gate script runs CI-focused repository hygiene checks without adding project dependencies:
- Workflow lint and policy checks for pinned actions, minimal permissions, and unsafe triggers.
- Changed-text secret scanning that reports only file, line, and secret type with values suppressed.
- Forbidden tracked artifact checks for dependency directories, Graphify output, and generated caches.
- Markdown whitespace, heading, and internal-link checks.
- Dependency manifest presence checks, paired in CI with `.opencode` high-severity `npm audit`.

### 3. Skill Catalog Generator (`scripts/skill-catalog.json`, `scripts/skill-catalog.js`, `scripts/generate-skill-catalog.js`)
The checked catalog manifest is the source of truth for generated catalog surfaces:
- `.opencode/agent/cybersecurity.md` skill routing table.
- `.opencode/skills/cybersecurity/README.md` framework and operational skill entries.
- `docs/framework-crosswalk.md` crosswalk rows.

Run `node scripts/generate-skill-catalog.js --write` after catalog changes and `node scripts/generate-skill-catalog.js --check` to verify freshness.

### 4. Skill Health Report (`scripts/skill-health.js`)
The read-only health report summarizes skill discovery, metadata, references, documentation coverage, catalog manifest coverage, and generated catalog drift. It is safe to run locally with `node scripts/skill-health.js` and as a failing gate with `node scripts/skill-health.js --check`.

### 5. OpenCode Configuration (`.opencode/opencode.json`)
The OpenCode project configuration links the workspace to cybersecurity assessment skills:
- `$schema`: Points to the official OpenCode configuration schema (`https://opencode.ai/config.json`).
- `skills`: Defines array of skill search paths (`paths`), including `.opencode/skills/cybersecurity`.

### 6. Security Assessment Commands (`.opencode/command/`)
The command suite provides user-facing entrypoints that route to the read-only `cybersecurity` agent:
- `security-router`: Recommends the best assessment command and smallest useful skill set.
- `security-assessment`: Runs a broad framework-mapped assessment.
- `security-appsec`: Focuses on application, API, service, and mobile security.
- `security-ai`: Focuses on AI, LLM, RAG, agent, prompt, tool, model, and dataset security.
- `security-supply-chain`: Focuses on dependencies, CI/CD, provenance, SBOM, release integrity, and artifact trust.
- `security-vuln-triage`: Focuses on CVEs, CWEs, advisories, scanner findings, exploitability, and remediation priority.

### 7. Cybersecurity Agent (`.opencode/agent/cybersecurity.md`)
Defines the read-only agent configuration, operating rules, and strict permission rule set (denying edit, task, external directory access, and destructive commands).

### 8. Skill Library (`.opencode/skills/cybersecurity`)
Organized into subdirectories (`frameworks`, `appsec`, `governance`, `detection`, `hardening`, `threat-modeling`), containing modular SKILL.md files and `references/standards.md` compliance notes.
