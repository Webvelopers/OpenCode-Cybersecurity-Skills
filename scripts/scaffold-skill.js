const fs = require("fs")
const path = require("path")

const args = process.argv.slice(2)
if (args.length < 2) {
  console.error("Usage: node scripts/scaffold-skill.js <category> <skill-name>")
  console.error("Categories: frameworks, appsec, governance, detection, hardening, threat-modeling")
  process.exit(1)
}

const [category, skillName] = args
const validCategories = ["frameworks", "appsec", "governance", "detection", "hardening", "threat-modeling"]

if (!validCategories.includes(category)) {
  console.error(`Invalid category: ${category}. Choose from: ${validCategories.join(", ")}`)
  process.exit(1)
}

if (!/^[a-z0-9-]+$/.test(skillName)) {
  console.error("Skill name must be lowercase kebab-case (e.g., my-new-skill)")
  process.exit(1)
}

const root = process.cwd()
const versionFile = path.join(root, "VERSION")
const projectVersion = fs.existsSync(versionFile) ? fs.readFileSync(versionFile, "utf8").trim() : "0.0.1"

const skillDir = path.join(root, ".opencode", "skills", "cybersecurity", category, skillName)
const refsDir = path.join(skillDir, "references")

if (fs.existsSync(skillDir)) {
  console.error(`Skill directory already exists: ${skillDir}`)
  process.exit(1)
}

fs.mkdirSync(refsDir, { recursive: true })

const skillMarkdown = `---
name: ${skillName}
description: "Keywords and trigger phrase: Use when the agent should load this skill."
license: MIT
metadata:
  framework: "Framework Name"
  target_version: "1.0"
  source: "https://example.com"
  domain: "cybersecurity"
  subdomain: "${category}"
  tags: "${skillName},cybersecurity"
  version: "${projectVersion}"
  author: "Webvelopers, Inc."
---

# Title

Short purpose description of the skill.

## When to Use

Use this skill when assessing or planning defensive controls for ${skillName}.

## Framework Base

- Core reference framework items.

## Workflow

1. Step 1: Analyze scope.
2. Step 2: Evaluate controls.
3. Step 3: Propose defensive mitigations.

## Expected Output

Provide structured findings, evidence, impact, remediation, and verification tests.

## Official Sources

- Official framework documentation source.

## Safety Limits

Keep work in an authorized defensive context. Do not generate exploit payloads or operational instructions to compromise systems.
`

const standardsMarkdown = `---
target_version: "1.0"
official_sources:
  - "https://example.com"
scope_notes:
  - "Scope and applicability notes for ${skillName}."
id_conventions:
  - "Standard ID format when applicable."
validation_guidance:
  - "Verify findings against official source specifications."
---

# Standards Reference: ${skillName}

Reference documentation and official source mappings.
`

fs.writeFileSync(path.join(skillDir, "SKILL.md"), skillMarkdown, "utf8")
fs.writeFileSync(path.join(refsDir, "standards.md"), standardsMarkdown, "utf8")

console.log(`Successfully scaffolded skill ${skillName} in category ${category}.`)
console.log(`Path: ${skillDir}`)
