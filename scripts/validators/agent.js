const { parsePermissionRules } = require("./common")

function validateAgent(ctx) {
  const file = ".opencode/agent/cybersecurity.md"
  if (!ctx.exists(file)) {
    ctx.fail(`${file}: missing`)
    return
  }

  const { data, text } = ctx.parseFrontmatter(file)
  if (data.name !== "cybersecurity") ctx.fail(`${file}: expected name cybersecurity`)
  if (data.mode !== "primary") ctx.fail(`${file}: expected mode primary`)

  const requiredPermissionLines = [
    "edit: deny",
    "task: deny",
    "external_directory: deny",
  ]

  for (const line of requiredPermissionLines) {
    if (!text.includes(line)) ctx.fail(`${file}: missing permission rule ${line}`)
  }

  for (const message of agentBashAllowlistErrors(file, text)) ctx.fail(message)
}

function agentBashAllowlistErrors(file, text) {
  const bashRules = parsePermissionRules(text, "bash")
  const requiredAskRules = [
    "git status*",
    "git diff*",
    "git log*",
    "git show *",
    "node --test test/validate.test.js",
    "node scripts/validate-opencode.js",
    "node scripts/generate-skill-catalog.js --check",
    "node scripts/skill-health.js --check",
    "npm audit --package-lock-only*",
  ]
  const messages = []

  if (bashRules.length === 0) {
    messages.push(`${file}: missing bash permission allowlist`)
    return messages
  }

  if (bashRules[0].pattern !== "*" || bashRules[0].action !== "deny") {
    messages.push(`${file}: first bash permission rule must be "*": deny`)
  }

  for (const rule of bashRules) {
    if (rule.action === "allow") messages.push(`${file}: bash rule ${rule.pattern} must not use allow`)
  }

  for (const pattern of requiredAskRules) {
    const rule = bashRules.find((candidate) => candidate.pattern === pattern)
    if (!rule || rule.action !== "ask") messages.push(`${file}: missing bash allowlist ask rule ${pattern}`)
  }

  return messages
}

module.exports = {
  validateAgent,
  agentBashAllowlistErrors,
}
