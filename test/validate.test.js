const test = require("node:test")
const assert = require("node:assert")
const {
  parseVersion,
  incrementPatchVersion,
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
  const content = "---\nname: test-skill\nversion: \"0.0.1\"\n---\n# Body"
  const result = parseFrontmatterText("test.md", content)
  assert.strictEqual(result.data.name, "test-skill")
  assert.strictEqual(result.data.version, "0.0.1")
})
