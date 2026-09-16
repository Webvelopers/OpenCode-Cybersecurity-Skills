const path = require("path")
const {
  skillRoot,
  validSkillCategories,
  requiredSkillSections,
  requiredReferenceSections,
  requiredReferencePhrases,
  scaffoldPlaceholderPhrases,
  placeholderHosts,
  missingMarkdownSections,
  getSkillCategory,
  extractUrls,
  extractMarkdownSection,
} = require("./common")
const { validateSkillVersion } = require("./version")

function isPlaceholderValue(value) {
  if (value === undefined || value === null) return false
  const normalized = String(value).trim().replace(/[.]+$/g, "")
  return scaffoldPlaceholderPhrases.some((phrase) => normalized.includes(phrase))
}

function placeholderMessages(file, labeledValues) {
  const messages = []
  for (const [label, value] of Object.entries(labeledValues)) {
    if (isPlaceholderValue(value)) {
      messages.push(`${file}: ${label} contains scaffold placeholder ${JSON.stringify(value)}`)
    }
  }
  return messages
}

function scaffoldPlaceholderTextMessages(file, text) {
  return scaffoldPlaceholderPhrases
    .filter((phrase) => text.includes(phrase))
    .map((phrase) => `${file}: contains scaffold placeholder ${JSON.stringify(phrase)}`)
}

function isValidDateLiteral(date) {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return false

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const parsed = new Date(Date.UTC(year, month - 1, day))

  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  )
}

function urlValidationMessages(file, label, urls) {
  const messages = []
  for (const url of urls) {
    let parsed
    try {
      parsed = new URL(url)
    } catch (_error) {
      messages.push(`${file}: ${label} URL is invalid: ${url}`)
      continue
    }

    if (parsed.protocol !== "https:") {
      messages.push(`${file}: ${label} URL must use https: ${url}`)
    }

    const hostname = parsed.hostname.toLowerCase()
    if (placeholderHosts.has(hostname) || hostname.endsWith(".example.com")) {
      messages.push(`${file}: ${label} URL must not use placeholder host: ${url}`)
    }
  }
  return messages
}

function referenceTextErrors(file, text) {
  const messages = []

  for (const phrase of requiredReferencePhrases) {
    if (!text.includes(phrase)) messages.push(`${file}: missing ${phrase}`)
  }

  for (const section of missingMarkdownSections(text, requiredReferenceSections)) {
    messages.push(`${file}: missing required section ${section}`)
  }

  messages.push(...scaffoldPlaceholderTextMessages(file, text))

  const verified = text.match(/^Last verified:\s*([^\r\n]+)$/m)
  if (verified) {
    const date = verified[1].trim().replace(/[.]$/g, "")
    if (!isValidDateLiteral(date)) {
      messages.push(`${file}: Last verified must be a real YYYY-MM-DD date`)
    }
  }

  const officialSources = extractMarkdownSection(text, "## Official Sources")
  const officialUrls = extractUrls(officialSources)
  if (officialSources && officialUrls.length === 0) {
    messages.push(`${file}: Official Sources must include at least one https URL`)
  }
  messages.push(...urlValidationMessages(file, "Official Sources", officialUrls))

  return messages
}

function skillContentErrors(file, data, text) {
  const messages = []
  const metadata = data.metadata && typeof data.metadata === "object" ? data.metadata : {}

  messages.push(...placeholderMessages(file, {
    description: data.description,
    "metadata.framework": metadata.framework,
    "metadata.target_version": metadata.target_version,
    "metadata.source": metadata.source,
    "metadata.subdomain": metadata.subdomain,
    "metadata.tags": metadata.tags,
  }))
  messages.push(...scaffoldPlaceholderTextMessages(file, text))

  if (metadata.source) {
    const sourceUrls = extractUrls(metadata.source)
    if (sourceUrls.length === 0) {
      messages.push(`${file}: metadata.source must include at least one https URL`)
    }
    messages.push(...urlValidationMessages(file, "metadata.source", sourceUrls))
  }

  const officialSources = extractMarkdownSection(text, "## Official Sources")
  const officialUrls = extractUrls(officialSources)
  if (officialSources && officialUrls.length === 0) {
    messages.push(`${file}: Official Sources must include at least one https URL`)
  }
  messages.push(...urlValidationMessages(file, "Official Sources", officialUrls))

  return messages
}

function versionCandidates(targetVersion) {
  const value = String(targetVersion || "").trim()
  if (!/^(v?\d+(?:\.\d+)+|\d{4}\.\d{2})$/.test(value)) return []

  const withoutV = value.replace(/^v/i, "")
  return Array.from(new Set([value, withoutV, `v${withoutV}`])).map((candidate) => candidate.toLowerCase())
}

function includesAnyVersion(text, candidates) {
  const lower = text.toLowerCase()
  return candidates.some((candidate) => lower.includes(candidate))
}

function significantFrameworkTokens(framework) {
  const ignored = new Set([
    "and",
    "application",
    "cybersecurity",
    "framework",
    "mobile",
    "project",
    "publications",
    "risk",
    "security",
    "the",
  ])
  return String(framework || "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 3)
    .filter((token) => !ignored.has(token.toLowerCase()))
}

function rowMatchesFramework(row, framework) {
  if (row.includes(framework)) return true
  const lower = row.toLowerCase()
  return significantFrameworkTokens(framework).some((token) => lower.includes(token.toLowerCase()))
}

function sourceHosts(source) {
  return extractUrls(source).map((url) => {
    try {
      return new URL(url).hostname.toLowerCase()
    } catch (_error) {
      return ""
    }
  }).filter(Boolean)
}

function rowMatchesSource(row, source) {
  const lower = row.toLowerCase()
  return sourceHosts(source).some((hostname) => lower.includes(hostname))
}

function markdownTableRowForSkill(text, skillName) {
  return text.split(/\r?\n/).find((line) => line.includes(`| \`${skillName}\``)) || ""
}

function skillMetadataDocumentationErrors(skillRecords, docs) {
  const messages = []
  const readme = docs.readme || ""
  const skillReadme = docs.skillReadme || ""
  const crosswalk = docs.crosswalk || ""

  for (const skill of skillRecords) {
    const crosswalkRow = markdownTableRowForSkill(crosswalk, skill.name)
    if (!crosswalkRow) {
      messages.push(`docs/framework-crosswalk.md: missing crosswalk row for skill ${skill.name}`)
    } else {
      if (!rowMatchesFramework(crosswalkRow, skill.framework)) {
        messages.push(`docs/framework-crosswalk.md: ${skill.name} row missing framework ${skill.framework}`)
      }
      if (!rowMatchesSource(crosswalkRow, skill.source)) {
        messages.push(`docs/framework-crosswalk.md: ${skill.name} row missing source ${skill.source}`)
      }
      const candidates = versionCandidates(skill.targetVersion)
      if (candidates.length > 0 && !includesAnyVersion(crosswalkRow, candidates)) {
        messages.push(`docs/framework-crosswalk.md: ${skill.name} row missing target version ${skill.targetVersion}`)
      }
    }

    const skillReadmeLine = skillReadme.split(/\r?\n/).find((line) => line.includes(`\`${skill.name}\``)) || ""
    if (!skillReadmeLine) {
      messages.push(`.opencode/skills/cybersecurity/README.md: missing catalog entry for skill ${skill.name}`)
    } else if (skillReadmeLine.startsWith("|") && versionCandidates(skill.targetVersion).length > 0) {
      const candidates = versionCandidates(skill.targetVersion)
      if (!includesAnyVersion(skillReadmeLine, candidates)) {
        messages.push(`.opencode/skills/cybersecurity/README.md: ${skill.name} row missing target version ${skill.targetVersion}`)
      }
    }

    const candidates = versionCandidates(skill.targetVersion)
    if (candidates.length > 0 && readme.includes(skill.framework) && !includesAnyVersion(readme, candidates)) {
      messages.push(`README.md: framework ${skill.framework} is listed without target version ${skill.targetVersion}`)
    }
  }

  return messages
}

function validateSkills(ctx) {
  const skillFiles = ctx.walk(skillRoot, (file) => path.basename(file) === "SKILL.md")
  if (skillFiles.length === 0) ctx.fail(`${skillRoot}: no SKILL.md files found`)

  const skillNames = []
  const skillRecords = []

  const requiredMetadata = [
    "framework",
    "target_version",
    "source",
    "domain",
    "subdomain",
    "tags",
    "version",
    "author",
  ]

  for (const file of skillFiles) {
    const { data, text } = ctx.parseFrontmatter(file)
    const folderName = path.basename(path.dirname(file))
    const category = getSkillCategory(file)

    if (!data.name) ctx.fail(`${file}: missing name`)
    if (data.name !== folderName) ctx.fail(`${file}: name does not match folder ${folderName}`)
    if (!data.description) ctx.fail(`${file}: missing description`)
    if (data.license !== "MIT") ctx.fail(`${file}: expected license MIT`)
    if (!data.metadata || typeof data.metadata !== "object") ctx.fail(`${file}: missing metadata map`)
    if (data.name) skillNames.push(data.name)
    if (!category || !validSkillCategories.has(category)) ctx.fail(`${file}: invalid skill category ${category || "unknown"}`)
    if (data.metadata?.domain && data.metadata.domain !== "cybersecurity") {
      ctx.fail(`${file}: metadata.domain must be cybersecurity`)
    }

    for (const message of skillContentErrors(file, data, text)) ctx.fail(message)

    validateSkillVersion(ctx, file, data.metadata && data.metadata.version)

    for (const key of requiredMetadata) {
      if (!data.metadata || !data.metadata[key]) ctx.fail(`${file}: missing metadata.${key}`)
    }

    if (data.name && data.metadata && requiredMetadata.every((key) => data.metadata[key])) {
      skillRecords.push({
        name: data.name,
        framework: data.metadata.framework,
        targetVersion: data.metadata.target_version,
        source: data.metadata.source,
      })
    }

    for (const section of missingMarkdownSections(text, requiredSkillSections)) {
      ctx.fail(`${file}: missing required section ${section}`)
    }

    const references = path.join(path.dirname(file), "references", "standards.md")
    if (!ctx.exists(references)) {
      ctx.fail(`${file}: missing references/standards.md`)
    } else {
      validateSkillReferences(ctx, references)
    }
  }

  validateSkillDocumentationCoverage(ctx, skillNames)
  validateSkillMetadataDocumentationCoverage(ctx, skillRecords)
}

function validateSkillReferences(ctx, file) {
  const text = ctx.readText(file)
  for (const message of referenceTextErrors(file, text)) ctx.fail(message)
}

function validateSkillDocumentationCoverage(ctx, skillNames) {
  const coverageFiles = [
    ".opencode/agent/cybersecurity.md",
    ".opencode/skills/cybersecurity/README.md",
    "docs/framework-crosswalk.md",
  ]

  for (const file of coverageFiles) {
    if (!ctx.exists(file)) continue

    const text = ctx.readText(file)
    for (const skillName of skillNames) {
      if (!text.includes(`\`${skillName}\``)) ctx.fail(`${file}: missing coverage for skill ${skillName}`)
    }
  }
}

function validateSkillMetadataDocumentationCoverage(ctx, skillRecords) {
  const docs = {
    readme: ctx.exists("README.md") ? ctx.readText("README.md") : "",
    skillReadme: ctx.exists(".opencode/skills/cybersecurity/README.md")
      ? ctx.readText(".opencode/skills/cybersecurity/README.md")
      : "",
    crosswalk: ctx.exists("docs/framework-crosswalk.md") ? ctx.readText("docs/framework-crosswalk.md") : "",
  }

  for (const message of skillMetadataDocumentationErrors(skillRecords, docs)) ctx.fail(message)
}

module.exports = {
  validateSkills,
  referenceTextErrors,
  skillContentErrors,
  skillMetadataDocumentationErrors,
}
