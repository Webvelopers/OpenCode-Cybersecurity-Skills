const path = require("path")
const { skillRoot } = require("./common")
const { loadCatalog, catalogFreshnessErrors } = require("../skill-catalog")

const requiredCatalogFields = [
  "name",
  "category",
  "group",
  "framework",
  "targetVersion",
  "agentUseWhen",
  "crosswalkUseWhen",
  "expectedOutput",
  "officialSource",
  "versionPolicy",
]

function catalogManifestErrors(ctx, catalog) {
  const messages = []
  const names = new Set()

  for (const entry of catalog) {
    const label = entry.name || "<missing name>"
    for (const field of requiredCatalogFields) {
      if (!entry[field]) messages.push(`scripts/skill-catalog.json: ${label} missing ${field}`)
    }

    if (entry.name) {
      if (names.has(entry.name)) messages.push(`scripts/skill-catalog.json: duplicate skill ${entry.name}`)
      names.add(entry.name)
    }

    if (entry.category && entry.name) {
      const skillFile = path.join(skillRoot, entry.category, entry.name, "SKILL.md")
      if (!ctx.exists(skillFile)) messages.push(`scripts/skill-catalog.json: ${entry.name} points to missing ${skillFile}`)
    }

    if (entry.group === "framework") {
      for (const field of ["scope", "maps"]) {
        if (!entry[field]) messages.push(`scripts/skill-catalog.json: ${label} missing ${field}`)
      }
    } else if (entry.group === "operational") {
      if (!entry.readmeDescription) messages.push(`scripts/skill-catalog.json: ${label} missing readmeDescription`)
    } else if (entry.group) {
      messages.push(`scripts/skill-catalog.json: ${label} has invalid group ${entry.group}`)
    }
  }

  return messages
}

function validateCatalog(ctx) {
  let catalog
  try {
    catalog = loadCatalog(ctx.root)
  } catch (error) {
    ctx.fail(`scripts/skill-catalog.json: unable to read catalog: ${error.message}`)
    return
  }

  for (const message of catalogManifestErrors(ctx, catalog)) ctx.fail(message)

  for (const message of catalogFreshnessErrors(ctx.root, ctx.readText, ctx.exists)) {
    ctx.fail(message)
  }
}

module.exports = {
  validateCatalog,
  catalogManifestErrors,
}
