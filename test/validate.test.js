const test = require("node:test")
const assert = require("node:assert")
const {
  parseVersion,
  incrementPatchVersion,
  getSkillCategory,
  missingMarkdownSections,
  parsePermissionRules,
  parseFrontmatterText,
  stripQuotes,
} = require("../scripts/validate-opencode.js")

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
