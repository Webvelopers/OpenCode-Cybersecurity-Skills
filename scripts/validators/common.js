const skillRoot = ".opencode/skills/cybersecurity"

const validSkillCategories = new Set([
  "appsec",
  "detection",
  "frameworks",
  "governance",
  "hardening",
  "threat-modeling",
])

const requiredSkillSections = [
  "## When to Use",
  "## Framework Scope",
  "## Workflow",
  "## Output Format",
  "## Verification",
  "## Official Sources",
  "## Safety Limits",
]

const requiredReferenceSections = [
  "## Official Sources",
  "## Scope Notes",
  "## ID Conventions",
  "## Validation Guidance",
]

const requiredReferencePhrases = ["Last verified:", "Pinning rationale:"]

const scaffoldPlaceholderPhrases = [
  "https://example.com",
  "YYYY-MM-DD",
  "Framework Name",
  "Official framework documentation source",
  "Core reference framework items",
  "Short purpose description of the skill",
  "Keywords and trigger phrase",
]

const placeholderHosts = new Set(["example.com", "example.org", "example.net"])

function normalizePath(file) {
  return file.replace(/\\/g, "/")
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function missingMarkdownSections(text, sections) {
  return sections.filter((section) => {
    const pattern = new RegExp(`^${escapeRegExp(section)}\\s*$`, "m")
    return !pattern.test(text)
  })
}

function getSkillCategory(file) {
  const normalized = normalizePath(file)
  const prefix = `${skillRoot}/`
  if (!normalized.startsWith(prefix)) return null

  const parts = normalized.slice(prefix.length).split("/")
  return parts.length >= 3 && parts[1] ? parts[0] : null
}

function parsePermissionRules(text, key) {
  const lines = text.split(/\r?\n/)
  const start = lines.findIndex((line) => line === `  ${key}:`)
  if (start === -1) return []

  const rules = []
  for (const line of lines.slice(start + 1)) {
    if (!line.startsWith("    ")) break

    const match = line.match(/^\s{4}"([^"]+)":\s*(allow|ask|deny)$/)
    if (match) rules.push({ pattern: match[1], action: match[2] })
  }

  return rules
}

function parseGitStatusPath(line) {
  const value = line.slice(3).trim()
  const currentPath = value.includes(" -> ") ? value.split(" -> ").pop() : value
  return currentPath.replace(/^"|"$/g, "")
}

function parseFrontmatterText(file, rawText) {
  const text = rawText.replace(/\r\n/g, "\n")
  const errors = []
  if (!text.startsWith("---\n")) {
    errors.push(`${file}: missing opening frontmatter delimiter`)
    return { data: {}, text, errors }
  }

  const end = text.indexOf("\n---\n", 4)
  if (end === -1) {
    errors.push(`${file}: missing closing frontmatter delimiter`)
    return { data: {}, text, errors }
  }

  const data = {}
  let currentMap = null
  const frontmatter = text.slice(4, end).split(/\r?\n/)

  for (const line of frontmatter) {
    if (!line.trim()) continue

    const nested = line.match(/^\s{2}([A-Za-z0-9_-]+):\s*(.*)$/)
    if (nested && currentMap) {
      currentMap[nested[1]] = stripQuotes(nested[2])
      continue
    }

    const top = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!top && /^\s+/.test(line)) continue
    if (!top) {
      errors.push(`${file}: unsupported frontmatter line: ${line}`)
      continue
    }

    const [, key, value] = top
    if (value === "") {
      data[key] = {}
      currentMap = data[key]
    } else {
      data[key] = stripQuotes(value)
      currentMap = null
    }
  }

  return { data, text, errors }
}

function stripQuotes(value) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function trimUrl(url) {
  return url.replace(/[.,;]+$/g, "")
}

function extractUrls(text) {
  const matches = text.match(/https?:\/\/[^\s)]+/g) || []
  return matches.map(trimUrl)
}

function extractMarkdownSection(text, heading) {
  const lines = text.split(/\r?\n/)
  const start = lines.findIndex((line) => line.trim() === heading)
  if (start === -1) return ""

  const section = []
  for (const line of lines.slice(start + 1)) {
    if (/^##\s+/.test(line)) break
    section.push(line)
  }

  return section.join("\n")
}

module.exports = {
  skillRoot,
  validSkillCategories,
  requiredSkillSections,
  requiredReferenceSections,
  requiredReferencePhrases,
  scaffoldPlaceholderPhrases,
  placeholderHosts,
  normalizePath,
  missingMarkdownSections,
  getSkillCategory,
  parsePermissionRules,
  parseGitStatusPath,
  parseFrontmatterText,
  stripQuotes,
  extractUrls,
  extractMarkdownSection,
}
