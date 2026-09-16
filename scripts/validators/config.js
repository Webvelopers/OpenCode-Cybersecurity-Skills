const { normalizePath } = require("./common")

function validateConfig(ctx) {
  const file = ".opencode/opencode.json"
  if (!ctx.exists(file)) {
    ctx.fail(`${file}: missing`)
    return
  }

  const schemaFile = "schemas/opencode.schema.json"
  if (!ctx.exists(schemaFile)) {
    ctx.fail(`${schemaFile}: missing JSON schema`)
  }

  let config
  try {
    config = JSON.parse(ctx.readText(file))
  } catch (error) {
    ctx.fail(`${file}: invalid JSON: ${error.message}`)
    return
  }

  if (config.$schema !== "https://opencode.ai/config.json") {
    ctx.fail(`${file}: missing or invalid $schema`)
  }

  if (!config.skills || typeof config.skills !== "object" || !Array.isArray(config.skills.paths)) {
    ctx.fail(`${file}: missing or invalid skills.paths structure`)
  }

  const allowedConfigKeys = new Set(["$schema", "skills"])
  for (const key of Object.keys(config)) {
    if (!allowedConfigKeys.has(key)) ctx.fail(`${file}: unexpected top-level key ${key}`)
  }

  const paths = config.skills.paths
  if (!paths.includes(".opencode/skills/cybersecurity")) {
    ctx.fail(`${file}: skills.paths must include .opencode/skills/cybersecurity`)
  }

  if (ctx.exists(schemaFile) && ctx.readText(schemaFile).includes('"additionalProperties": true')) {
    ctx.fail(`${schemaFile}: root additionalProperties must be false for this project schema`)
  }
}

const expectedCommands = [
  {
    file: ".opencode/command/security-assessment.md",
    requiredPhrases: ["Run a read-only cybersecurity assessment", "Load and apply the most relevant cybersecurity skills"],
  },
  {
    file: ".opencode/command/security-appsec.md",
    requiredSkills: ["owasp-appsec", "mobile-appsec", "vulnerability-risk-prioritization"],
    requiredPhrases: ["application security assessment", "OWASP Top 10", "OWASP API Security"],
  },
  {
    file: ".opencode/command/security-ai.md",
    requiredSkills: ["owasp-genai-security", "mitre-atlas-2026", "nist-ai-rmf-10", "software-supply-chain-security"],
    requiredPhrases: ["AI security assessment", "OWASP GenAI", "MITRE ATLAS", "NIST AI RMF"],
  },
  {
    file: ".opencode/command/security-supply-chain.md",
    requiredSkills: ["software-supply-chain-security", "vulnerability-risk-prioritization", "cis-hardening"],
    requiredPhrases: ["software supply chain security assessment", "NIST SSDF", "SLSA", "OpenSSF"],
  },
  {
    file: ".opencode/command/security-vuln-triage.md",
    requiredSkills: ["vulnerability-risk-prioritization", "software-supply-chain-security", "owasp-appsec"],
    requiredPhrases: ["vulnerability triage", "CVSS", "EPSS", "CISA KEV"],
  },
  {
    file: ".opencode/command/security-router.md",
    requiredSkills: [
      "owasp-appsec",
      "owasp-genai-security",
      "software-supply-chain-security",
      "vulnerability-risk-prioritization",
    ],
    requiredPhrases: [
      "Recommend the most relevant read-only cybersecurity assessment command",
      "security-appsec",
      "security-ai",
      "security-supply-chain",
      "security-vuln-triage",
    ],
  },
]

function validateCommand(ctx) {
  const commandFiles = ctx.walk(".opencode/command", (file) => file.endsWith(".md")).map(normalizePath)
  const expectedFiles = new Set(expectedCommands.map((command) => command.file))

  for (const file of expectedFiles) {
    if (!ctx.exists(file)) ctx.fail(`${file}: missing security assessment command`)
  }

  for (const file of commandFiles) {
    if (!expectedFiles.has(file)) ctx.fail(`${file}: unexpected OpenCode command; add it to expectedCommands or remove it`)
  }

  for (const expected of expectedCommands) {
    if (!ctx.exists(expected.file)) continue

    const { data, text } = ctx.parseFrontmatter(expected.file)
    for (const message of commandTextErrors(expected.file, data, text, expected)) ctx.fail(message)
  }
}

function commandBody(text) {
  const marker = "\n---\n"
  const index = text.indexOf(marker)
  return index === -1 ? "" : text.slice(index + marker.length).trim()
}

function commandTextErrors(file, data, text, expected) {
  const messages = []
  const body = commandBody(text)

  if (data.agent !== "cybersecurity") messages.push(`${file}: expected agent cybersecurity`)
  if (!data.description) messages.push(`${file}: missing description`)
  if (!body) messages.push(`${file}: missing command template body`)
  if (!body.includes("$ARGUMENTS")) messages.push(`${file}: command template must include $ARGUMENTS`)
  if (!body.includes("read-only")) messages.push(`${file}: command must preserve read-only assessment scope`)
  if (!body.includes("Do not modify") && !body.includes("Do not inspect large parts")) {
    messages.push(`${file}: command must prohibit repository modification or overbroad action`)
  }

  for (const skill of expected.requiredSkills || []) {
    if (!body.includes(`\`${skill}\``)) messages.push(`${file}: missing required skill ${skill}`)
  }

  for (const phrase of expected.requiredPhrases || []) {
    if (!body.includes(phrase)) messages.push(`${file}: missing required phrase ${phrase}`)
  }

  return messages
}

module.exports = {
  validateConfig,
  validateCommand,
  commandTextErrors,
  expectedCommands,
}
