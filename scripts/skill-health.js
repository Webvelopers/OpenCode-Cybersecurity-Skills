const fs = require("fs")
const path = require("path")
const {
  skillRoot,
  requiredSkillSections,
  normalizePath,
  parseFrontmatterText,
  missingMarkdownSections,
} = require("./validators/common")
const { parseVersion } = require("./validators/version")
const {
  referenceTextErrors,
  skillContentErrors,
  skillMetadataDocumentationErrors,
} = require("./validators/skills")
const { catalogManifestErrors } = require("./validators/catalog")
const { loadCatalog, catalogFreshnessErrors } = require("./skill-catalog")

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

function walk(root, dir, predicate, output = []) {
  const absolute = path.join(root, dir)
  if (!fs.existsSync(absolute)) return output

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const relative = normalizePath(path.join(dir, entry.name))
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue
      walk(root, relative, predicate, output)
    } else if (!predicate || predicate(relative)) {
      output.push(relative)
    }
  }

  return output
}

function readText(root, file) {
  return fs.readFileSync(path.join(root, file), "utf8")
}

function exists(root, file) {
  return fs.existsSync(path.join(root, file))
}

function categoryForSkillFile(file) {
  const parts = normalizePath(file).slice(`${skillRoot}/`.length).split("/")
  return parts.length >= 3 ? parts[0] : "unknown"
}

function pushMissingMetadataIssues(issues, file, data) {
  const metadata = data.metadata && typeof data.metadata === "object" ? data.metadata : {}

  if (!data.name) issues.push(`${file}: missing name`)
  if (!data.description) issues.push(`${file}: missing description`)
  if (data.license !== "MIT") issues.push(`${file}: expected license MIT`)
  if (!data.metadata || typeof data.metadata !== "object") issues.push(`${file}: missing metadata map`)

  for (const key of requiredMetadata) {
    if (!metadata[key]) issues.push(`${file}: missing metadata.${key}`)
  }

  if (metadata.domain && metadata.domain !== "cybersecurity") {
    issues.push(`${file}: metadata.domain must be cybersecurity`)
  }

  if (metadata.version && !parseVersion(metadata.version)) {
    issues.push(`${file}: metadata.version must be a semantic version, got ${metadata.version}`)
  }
}

function collectSkillHealth(root) {
  const skillFiles = walk(root, skillRoot, (file) => path.basename(file) === "SKILL.md").sort()
  const metadataIssues = []
  const referenceIssues = []
  const bodyIssues = []
  const skillNames = []
  const skillRecords = []
  const categories = {}
  let referencesPresent = 0

  for (const file of skillFiles) {
    const parsed = parseFrontmatterText(file, readText(root, file))
    const { data, text } = parsed
    const metadata = data.metadata && typeof data.metadata === "object" ? data.metadata : {}
    const category = categoryForSkillFile(file)
    categories[category] = (categories[category] || 0) + 1

    metadataIssues.push(...parsed.errors)
    pushMissingMetadataIssues(metadataIssues, file, data)
    metadataIssues.push(...skillContentErrors(file, data, text))

    if (data.name) {
      skillNames.push(data.name)
      skillRecords.push({
        name: data.name,
        framework: metadata.framework,
        targetVersion: metadata.target_version,
        source: metadata.source,
      })
    }

    for (const section of missingMarkdownSections(text, requiredSkillSections)) {
      bodyIssues.push(`${file}: missing required section ${section}`)
    }

    const referenceFile = normalizePath(path.join(path.dirname(file), "references", "standards.md"))
    if (!exists(root, referenceFile)) {
      referenceIssues.push(`${file}: missing references/standards.md`)
    } else {
      referencesPresent += 1
      referenceIssues.push(...referenceTextErrors(referenceFile, readText(root, referenceFile)))
    }
  }

  return {
    skillFiles,
    skillNames,
    skillRecords,
    categories,
    referencesPresent,
    metadataIssues,
    referenceIssues,
    bodyIssues,
  }
}

function collectCatalogHealth(root, skillNames) {
  const issues = []
  let catalog = []

  try {
    catalog = loadCatalog(root)
  } catch (error) {
    issues.push(`scripts/skill-catalog.json: unable to read catalog: ${error.message}`)
  }

  const ctx = {
    exists: (file) => exists(root, file),
  }
  issues.push(...catalogManifestErrors(ctx, catalog))

  const catalogNames = new Set(catalog.map((entry) => entry.name).filter(Boolean))
  for (const name of skillNames) {
    if (!catalogNames.has(name)) issues.push(`scripts/skill-catalog.json: missing discovered skill ${name}`)
  }

  return { catalog, issues }
}

function collectCoverageHealth(root, skillNames, skillRecords) {
  const issues = []
  const coverageFiles = [
    ".opencode/agent/cybersecurity.md",
    ".opencode/skills/cybersecurity/README.md",
    "docs/framework-crosswalk.md",
  ]

  for (const file of coverageFiles) {
    if (!exists(root, file)) {
      issues.push(`${file}: missing coverage target`)
      continue
    }

    const text = readText(root, file)
    for (const skillName of skillNames) {
      if (!text.includes(`\`${skillName}\``)) issues.push(`${file}: missing coverage for skill ${skillName}`)
    }
  }

  const docs = {
    readme: exists(root, "README.md") ? readText(root, "README.md") : "",
    skillReadme: exists(root, ".opencode/skills/cybersecurity/README.md")
      ? readText(root, ".opencode/skills/cybersecurity/README.md")
      : "",
    crosswalk: exists(root, "docs/framework-crosswalk.md") ? readText(root, "docs/framework-crosswalk.md") : "",
  }
  issues.push(...skillMetadataDocumentationErrors(skillRecords, docs))

  return issues
}

function collectDriftHealth(root) {
  return catalogFreshnessErrors(
    root,
    (file) => readText(root, file),
    (file) => exists(root, file),
  )
}

function collectWarnings(root) {
  const warnings = []
  if (exists(root, "graphify-out")) {
    warnings.push("graphify-out exists locally; keep it ignored and do not commit generated Graphify output")
  }
  return warnings
}

function buildSkillHealthReport(root = process.cwd()) {
  const skills = collectSkillHealth(root)
  const catalog = collectCatalogHealth(root, skills.skillNames)
  const coverageIssues = collectCoverageHealth(root, skills.skillNames, skills.skillRecords)
  const driftIssues = collectDriftHealth(root)
  const warnings = collectWarnings(root)

  const sections = [
    { name: "Skill metadata", issues: skills.metadataIssues },
    { name: "Skill body sections", issues: skills.bodyIssues },
    { name: "References", issues: skills.referenceIssues },
    { name: "Catalog manifest", issues: catalog.issues },
    { name: "Documentation coverage", issues: coverageIssues },
    { name: "Generated catalog drift", issues: driftIssues },
  ]

  return {
    summary: {
      skillCount: skills.skillFiles.length,
      catalogCount: catalog.catalog.length,
      referencesPresent: skills.referencesPresent,
      categories: skills.categories,
    },
    sections,
    warnings,
  }
}

function issueCount(report) {
  return report.sections.reduce((total, section) => total + section.issues.length, 0)
}

function reportStatus(report) {
  return issueCount(report) === 0 ? "PASS" : "FAIL"
}

function renderCategories(categories) {
  const entries = Object.entries(categories).sort(([left], [right]) => left.localeCompare(right))
  return entries.length === 0 ? "none" : entries.map(([name, count]) => `${name}=${count}`).join(", ")
}

function renderSkillHealthReport(report) {
  const lines = [
    "Skill Health Report",
    `Status: ${reportStatus(report)}`,
    `Skills: ${report.summary.skillCount}`,
    `Catalog entries: ${report.summary.catalogCount}`,
    `References: ${report.summary.referencesPresent}/${report.summary.skillCount}`,
    `Categories: ${renderCategories(report.summary.categories)}`,
    "",
    "Checks:",
  ]

  for (const section of report.sections) {
    lines.push(`- ${section.name}: ${section.issues.length === 0 ? "PASS" : `FAIL (${section.issues.length})`}`)
  }

  const issues = report.sections.flatMap((section) => section.issues.map((issue) => ({ section: section.name, issue })))
  if (issues.length > 0) {
    lines.push("", "Issues:")
    for (const item of issues) lines.push(`- ${item.section}: ${item.issue}`)
  }

  if (report.warnings.length > 0) {
    lines.push("", "Warnings:")
    for (const warning of report.warnings) lines.push(`- ${warning}`)
  }

  return `${lines.join("\n")}\n`
}

if (require.main === module) {
  const flags = new Set(process.argv.slice(2))
  const report = buildSkillHealthReport()
  if (flags.has("--json")) console.log(JSON.stringify(report, null, 2))
  else process.stdout.write(renderSkillHealthReport(report))

  if (flags.has("--check") && issueCount(report) > 0) process.exit(1)
}

module.exports = {
  buildSkillHealthReport,
  issueCount,
  reportStatus,
  renderSkillHealthReport,
}
