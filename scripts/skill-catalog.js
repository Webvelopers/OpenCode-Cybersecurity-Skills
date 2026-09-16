const fs = require("fs")
const path = require("path")

const markerPrefix = "generated:skill-catalog"
const sections = {
  agentRouting: {
    file: ".opencode/agent/cybersecurity.md",
    id: "agent-routing",
  },
  skillReadmeFrameworks: {
    file: ".opencode/skills/cybersecurity/README.md",
    id: "skill-readme-frameworks",
  },
  skillReadmeOperational: {
    file: ".opencode/skills/cybersecurity/README.md",
    id: "skill-readme-operational",
  },
  frameworkCrosswalk: {
    file: "docs/framework-crosswalk.md",
    id: "framework-crosswalk",
  },
}

function loadCatalog(root = process.cwd()) {
  return JSON.parse(fs.readFileSync(path.join(root, "scripts", "skill-catalog.json"), "utf8"))
}

function startMarker(id) {
  return `<!-- ${markerPrefix}:${id}:start -->`
}

function endMarker(id) {
  return `<!-- ${markerPrefix}:${id}:end -->`
}

function generatedBlock(id, body) {
  return [
    startMarker(id),
    "<!-- Do not edit manually. Run `node scripts/generate-skill-catalog.js --write`. -->",
    body.trimEnd(),
    endMarker(id),
  ].join("\n")
}

function replaceGeneratedBlock(text, id, body) {
  const start = startMarker(id)
  const end = endMarker(id)
  const startIndex = text.indexOf(start)
  const endIndex = text.indexOf(end)
  const replacement = generatedBlock(id, body)

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error(`missing generated block markers for ${id}`)
  }

  return `${text.slice(0, startIndex)}${replacement}${text.slice(endIndex + end.length)}`
}

function readmePath(entry) {
  return `${entry.category}/${entry.name}`
}

function renderAgentRouting(catalog) {
  return [
    "| Skill | Use when |",
    "|---|---|",
    ...catalog.map((entry) => `| \`${entry.name}\` | ${entry.agentUseWhen} |`),
  ].join("\n")
}

function renderSkillReadmeFrameworks(catalog) {
  const entries = catalog.filter((entry) => entry.group === "framework")
  return [
    "| Skill | Target version | Scope | What it maps |",
    "|---|---:|---|---|",
    ...entries.map((entry) => `| \`${entry.name}\` | ${entry.targetVersion} | ${entry.scope} | ${entry.maps} |`),
  ].join("\n")
}

function renderSkillReadmeOperational(catalog) {
  return catalog
    .filter((entry) => entry.group === "operational")
    .map((entry) => `- \`${entry.name}\` (\`${readmePath(entry)}\`): ${entry.readmeDescription}.`)
    .join("\n")
}

function renderFrameworkCrosswalk(catalog) {
  return [
    "| Skill | Framework | Use when | Expected output | Official source | Version policy |",
    "|---|---|---|---|---|---|",
    ...catalog.map((entry) => `| \`${entry.name}\` | ${entry.framework} | ${entry.crosswalkUseWhen} | ${entry.expectedOutput} | ${entry.officialSource} | ${entry.versionPolicy} |`),
  ].join("\n")
}

function renderCatalogSections(catalog) {
  return {
    [sections.agentRouting.id]: renderAgentRouting(catalog),
    [sections.skillReadmeFrameworks.id]: renderSkillReadmeFrameworks(catalog),
    [sections.skillReadmeOperational.id]: renderSkillReadmeOperational(catalog),
    [sections.frameworkCrosswalk.id]: renderFrameworkCrosswalk(catalog),
  }
}

function catalogOutputPlan(catalog) {
  const rendered = renderCatalogSections(catalog)
  return [
    sections.agentRouting,
    sections.skillReadmeFrameworks,
    sections.skillReadmeOperational,
    sections.frameworkCrosswalk,
  ].map((section) => ({ ...section, body: rendered[section.id] }))
}

function applyCatalogToText(text, catalog, file) {
  let output = text
  for (const section of catalogOutputPlan(catalog).filter((candidate) => candidate.file === file)) {
    output = replaceGeneratedBlock(output, section.id, section.body)
  }
  return output
}

function catalogFreshnessErrors(root, readText, exists) {
  const catalog = loadCatalog(root)
  const messages = []

  for (const section of catalogOutputPlan(catalog)) {
    if (!exists(section.file)) {
      messages.push(`${section.file}: missing generated catalog target`)
      continue
    }

    let expected
    try {
      expected = replaceGeneratedBlock(readText(section.file), section.id, section.body)
    } catch (error) {
      messages.push(`${section.file}: ${error.message}`)
      continue
    }

    if (expected !== readText(section.file)) {
      messages.push(`${section.file}: generated catalog block ${section.id} is stale; run node scripts/generate-skill-catalog.js --write`)
    }
  }

  return messages
}

module.exports = {
  sections,
  loadCatalog,
  generatedBlock,
  replaceGeneratedBlock,
  renderAgentRouting,
  renderSkillReadmeFrameworks,
  renderSkillReadmeOperational,
  renderFrameworkCrosswalk,
  renderCatalogSections,
  catalogOutputPlan,
  applyCatalogToText,
  catalogFreshnessErrors,
}
