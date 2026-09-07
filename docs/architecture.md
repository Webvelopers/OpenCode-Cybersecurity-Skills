# Architecture and Internal Components

This document describes the internal architecture, validation script modules, configuration schema, and file system helpers of the project, improving component documentation and graph connectivity.

## Core Components

### 1. Validation Engine (`scripts/validate-opencode.js`)
The validation script enforces structural, frontmatter, version, and security requirements across the repository. Key functions include:
- `validateConfig()`: Validates `.opencode/opencode.json` schema (`$schema`) and skill paths (`paths`).
- `validateAgent()`: Ensures `.opencode/agent/cybersecurity.md` exists, defines the `cybersecurity` primary agent, and enforces read-only security permissions.
- `validateSkills()`: Recursively walks skill directories (`.opencode/skills/cybersecurity`), validates frontmatter metadata, and checks version policy.
- `validateSkillVersion()`: Enforces semantic versioning and Git HEAD diff versioning rules for modified and new skills.
- `parseFrontmatterText()`: Parses YAML frontmatter headers from Markdown files.
- File system helpers (`fs`, `path`, `root`, `walk()`): Interacts with project root files securely.

### 2. OpenCode Configuration (`.opencode/opencode.json`)
The OpenCode project configuration links the workspace to cybersecurity assessment skills:
- `$schema`: Points to the official OpenCode configuration schema (`https://opencode.ai/config.json`).
- `skills`: Defines array of skill search paths (`paths`), including `.opencode/skills/cybersecurity`.

### 3. Cybersecurity Agent (`.opencode/agent/cybersecurity.md`)
Defines the read-only agent configuration, operating rules, and strict permission rule set (denying edit, task, external directory access, and destructive commands).

### 4. Skill Library (`.opencode/skills/cybersecurity`)
Organized into subdirectories (`frameworks`, `appsec`, `governance`, `detection`, `hardening`, `threat-modeling`), containing modular SKILL.md files and `references/standards.md` compliance notes.
