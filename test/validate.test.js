const test = require("node:test")
const assert = require("node:assert")
const fs = require("node:fs")
const path = require("node:path")
const {
  parseVersion,
  incrementPatchVersion,
  getSkillCategory,
  missingMarkdownSections,
  parsePermissionRules,
  parseFrontmatterText,
  stripQuotes,
  agentBashAllowlistErrors,
  referenceTextErrors,
  skillContentErrors,
  skillMetadataDocumentationErrors,
  catalogManifestErrors,
  workflowTextErrors,
  commandTextErrors,
} = require("../scripts/validate-opencode.js")
const { catalogFreshnessErrors, sections } = require("../scripts/skill-catalog.js")
const { issueCount, renderSkillHealthReport, reportStatus } = require("../scripts/skill-health.js")
const {
  forbiddenArtifactErrors,
  markdownLintErrorsForText,
  parseAddedLines,
  secretScanErrors,
  workflowLintErrors,
} = require("../scripts/quality-gates.js")

test("parseVersion parses semantic versions correctly", () => {
  assert.deepStrictEqual(parseVersion("0.0.1"), { major: 0, minor: 0, patch: 1 })
  assert.deepStrictEqual(parseVersion("1.2.3"), { major: 1, minor: 2, patch: 3 })
  assert.strictEqual(parseVersion("invalid"), null)
  assert.strictEqual(parseVersion("1.2"), null)
})

test("incrementPatchVersion increments patch version", () => {
  assert.strictEqual(incrementPatchVersion("0.0.1"), "0.0.2")
  assert.strictEqual(incrementPatchVersion("1.2.3"), "1.2.4")
  assert.strictEqual(incrementPatchVersion("bad"), null)
})

test("stripQuotes removes surrounding quotes", () => {
  assert.strictEqual(stripQuotes('"hello"'), "hello")
  assert.strictEqual(stripQuotes("'world'"), "world")
  assert.strictEqual(stripQuotes("plain"), "plain")
})

test("parseFrontmatterText parses yaml frontmatter correctly", () => {
  const content = "---\nname: test-skill\nversion: \"0.0.1\"\nmetadata:\n  domain: cybersecurity\n---\n# Body"
  const result = parseFrontmatterText("test.md", content)
  assert.strictEqual(result.data.name, "test-skill")
  assert.strictEqual(result.data.version, "0.0.1")
  assert.strictEqual(result.data.metadata.domain, "cybersecurity")
})

test("missingMarkdownSections returns sections that are not present as headings", () => {
  const content = "# Skill\n\n## When to Use\n\n## Workflow\n"
  assert.deepStrictEqual(missingMarkdownSections(content, ["## When to Use", "## Framework Scope", "## Workflow"]), [
    "## Framework Scope",
  ])
})

test("getSkillCategory returns the top-level cybersecurity skill category", () => {
  assert.strictEqual(
    getSkillCategory(".opencode/skills/cybersecurity/appsec/owasp-appsec/SKILL.md"),
    "appsec",
  )
  assert.strictEqual(getSkillCategory("docs/framework-crosswalk.md"), null)
})

test("parsePermissionRules extracts ordered tool rules", () => {
  const content = "permission:\n  bash:\n    \"*\": deny\n    \"git status*\": ask\n  edit: deny\n"
  assert.deepStrictEqual(parsePermissionRules(content, "bash"), [
    { pattern: "*", action: "deny" },
    { pattern: "git status*", action: "ask" },
  ])
})

test("skillContentErrors rejects scaffold placeholders in invalid skills", () => {
  const content = `---
name: example-skill
description: "Keywords and trigger phrase: Use when the agent should load this skill."
license: MIT
metadata:
  framework: "Framework Name"
  target_version: "1.0"
  source: "https://example.com"
  domain: "cybersecurity"
  subdomain: "appsec"
  tags: "example-skill,cybersecurity"
  version: "0.0.3"
  author: "Webvelopers, Inc."
---

# Title

Short purpose description of the skill.

## Official Sources

- Official framework documentation source.
`
  const parsed = parseFrontmatterText("example-skill/SKILL.md", content)
  const errors = skillContentErrors("example-skill/SKILL.md", parsed.data, parsed.text)

  assert(errors.some((error) => error.includes("metadata.framework contains scaffold placeholder")))
  assert(errors.some((error) => error.includes("metadata.source URL must not use placeholder host")))
  assert(errors.some((error) => error.includes("Official Sources must include at least one https URL")))
})

test("referenceTextErrors rejects placeholder dates and source URLs", () => {
  const content = `# References

Target version: 1.0.

Last verified: YYYY-MM-DD.

Pinning rationale: Placeholder.

## Official Sources

- Example: https://example.com

## Scope Notes

Scope.

## ID Conventions

- IDs.

## Validation Guidance

Validate.
`
  const errors = referenceTextErrors("references/standards.md", content)

  assert(errors.some((error) => error.includes("YYYY-MM-DD")))
  assert(errors.some((error) => error.includes("Last verified must be a real YYYY-MM-DD date")))
  assert(errors.some((error) => error.includes("Official Sources URL must not use placeholder host")))
})

test("agentBashAllowlistErrors rejects unsafe agent bash permissions", () => {
  const content = `permission:
  bash:
    "*": deny
    "git status*": ask
    "npm install *": allow
`
  const errors = agentBashAllowlistErrors("cybersecurity.md", content)

  assert(errors.some((error) => error.includes("must not use allow")))
  assert(errors.some((error) => error.includes("missing bash allowlist ask rule git diff*")))
})

test("workflowTextErrors rejects dependency audit before lockfile preparation", () => {
  const content = `permissions:
  contents: read

jobs:
  validate:
    steps:
    - name: Audit OpenCode Plugin Dependencies
      run: npm audit --package-lock-only --audit-level=high
    - name: Prepare OpenCode Plugin Lockfile
      run: npm install --package-lock-only --ignore-scripts
`
  const errors = workflowTextErrors("validate.yml", content)

  assert(errors.some((error) => error.includes("package-lock preparation must run before dependency audit")))
})

test("workflowTextErrors requires priority 5 quality gates", () => {
  const content = `permissions:
  contents: read

jobs:
  validate:
    steps:
    - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262
    - name: Prepare OpenCode Plugin Lockfile
      run: npm install --package-lock-only --ignore-scripts
    - name: Audit OpenCode Plugin Dependencies
      run: npm audit --package-lock-only --audit-level=high
`
  const errors = workflowTextErrors("validate.yml", content)

  assert(errors.some((error) => error.includes("missing pinned actionlint")))
  assert(errors.some((error) => error.includes("missing CI quality gates")))
  assert(errors.some((error) => error.includes("fetch-depth: 0")))
})

test("workflowTextErrors requires skill health check", () => {
  const content = `permissions:
  contents: read

jobs:
  validate:
    steps:
    - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262
      with:
        fetch-depth: 0
    - name: Run actionlint
      run: npx --yes @kjanat/actionlint@1.17.0
    - name: Run CI Quality Gates
      env:
        BASE_SHA: before
        HEAD_SHA: head
      run: node scripts/quality-gates.js --workflows --secrets --artifacts --markdown --dependencies
    - name: Prepare OpenCode Plugin Lockfile
      run: npm install --package-lock-only --ignore-scripts
    - name: Audit OpenCode Plugin Dependencies
      run: npm audit --package-lock-only --audit-level=high
`
  const errors = workflowTextErrors("validate.yml", content)

  assert(errors.some((error) => error.includes("missing read-only skill health check")))
})

test("skill health renderer summarizes failures", () => {
  const report = {
    summary: {
      skillCount: 1,
      catalogCount: 1,
      referencesPresent: 0,
      categories: { appsec: 1 },
    },
    sections: [
      { name: "Skill metadata", issues: ["example issue"] },
      { name: "References", issues: [] },
    ],
    warnings: ["example warning"],
  }

  assert.strictEqual(issueCount(report), 1)
  assert.strictEqual(reportStatus(report), "FAIL")
  const rendered = renderSkillHealthReport(report)
  assert(rendered.includes("Status: FAIL"))
  assert(rendered.includes("Skill metadata: FAIL (1)"))
  assert(rendered.includes("example warning"))
})

test("commandTextErrors rejects unsafe or incomplete assessment commands", () => {
  const content = `---
description: Bad command
agent: build
---

Run an assessment.
`
  const parsed = parseFrontmatterText(".opencode/command/security-appsec.md", content)
  const errors = commandTextErrors(".opencode/command/security-appsec.md", parsed.data, parsed.text, {
    requiredSkills: ["owasp-appsec"],
    requiredPhrases: ["application security assessment"],
  })

  assert(errors.some((error) => error.includes("expected agent cybersecurity")))
  assert(errors.some((error) => error.includes("must include $ARGUMENTS")))
  assert(errors.some((error) => error.includes("read-only assessment scope")))
  assert(errors.some((error) => error.includes("missing required skill owasp-appsec")))
  assert(errors.some((error) => error.includes("missing required phrase application security assessment")))
})

test("quality gate workflow lint rejects unpinned actions and unsafe triggers", () => {
  const content = `name: Bad
on:
  pull_request_target:
permissions:
  contents: read
jobs:
  test:
    steps:
    - uses: actions/checkout@v4
`
  const errors = workflowLintErrors("bad.yml", content)

  assert(errors.some((error) => error.includes("must be pinned to a 40-character commit SHA")))
  assert(errors.some((error) => error.includes("pull_request_target is not allowed")))
})

test("quality gate secret scan suppresses detected secret values", () => {
  const token = "ghp_" + "A".repeat(24)
  const errors = secretScanErrors([{ file: "README.md", line: 1, text: `token=${token}` }])

  assert(errors.some((error) => error.includes("GitHub token")))
  for (const error of errors) {
    assert(error.includes("value suppressed"))
    assert(!error.includes(token))
  }
})

test("quality gate artifact and markdown checks reject repository hygiene issues", () => {
  assert.deepStrictEqual(forbiddenArtifactErrors([".opencode/node_modules/pkg/index.js", "README.md"]), [
    ".opencode/node_modules/pkg/index.js: forbidden generated or dependency artifact must not be tracked",
  ])

  const errors = markdownLintErrorsForText("README.md", "#Bad\nlink [missing](docs/missing.md)  \n", () => false)
  assert(errors.some((error) => error.includes("heading must include a space")))
  assert(errors.some((error) => error.includes("trailing whitespace")))
  assert(errors.some((error) => error.includes("broken internal link")))
})

test("quality gate diff parser extracts added lines without deleted secret leakage", () => {
  const diff = `diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
-old
+new
+another
`

  assert.deepStrictEqual(parseAddedLines(diff), [
    { file: "README.md", line: 1, text: "new" },
    { file: "README.md", line: 2, text: "another" },
  ])
})

test("skillMetadataDocumentationErrors rejects metadata drift across docs", () => {
  const skillRecords = [
    {
      name: "mitre-d3fend-countermeasures",
      framework: "MITRE D3FEND",
      targetVersion: "v1.6.0",
      source: "https://d3fend.mitre.org",
    },
  ]
  const docs = {
    readme: "- MITRE D3FEND v1.4.0 for defensive countermeasures.",
    skillReadme: "| `mitre-d3fend-countermeasures` | v1.4.0 | Defensive knowledge graph | Defensive countermeasures |",
    crosswalk: "| `mitre-d3fend-countermeasures` | MITRE D3FEND | Use | Output | https://d3fend.mitre.org | Target v1.4.0 |",
  }
  const errors = skillMetadataDocumentationErrors(skillRecords, docs)

  assert(errors.some((error) => error.includes("docs/framework-crosswalk.md")))
  assert(errors.some((error) => error.includes(".opencode/skills/cybersecurity/README.md")))
  assert(errors.some((error) => error.includes("README.md")))
})

test("catalogManifestErrors rejects duplicate and incomplete catalog entries", () => {
  const ctx = {
    exists: () => false,
  }
  const errors = catalogManifestErrors(ctx, [
    { name: "owasp-appsec", category: "appsec", group: "operational" },
    { name: "owasp-appsec", category: "appsec", group: "bad-group" },
  ])

  assert(errors.some((error) => error.includes("duplicate skill owasp-appsec")))
  assert(errors.some((error) => error.includes("missing framework")))
  assert(errors.some((error) => error.includes("invalid group bad-group")))
})

test("catalogFreshnessErrors detects stale generated catalog blocks", () => {
  const root = path.resolve(__dirname, "..")
  const originalReadText = (file) => fs.readFileSync(path.join(root, file), "utf8")
  const readText = (file) => {
    const text = originalReadText(file)
    if (file === sections.agentRouting.file) return text.replace("mitre-attack-v19", "stale-skill")
    return text
  }
  const exists = (file) => fs.existsSync(path.join(root, file))
  const errors = catalogFreshnessErrors(root, readText, exists)

  assert(errors.some((error) => error.includes("generated catalog block agent-routing is stale")))
})
