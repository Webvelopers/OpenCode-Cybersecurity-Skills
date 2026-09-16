const { normalizePath, parseFrontmatterText } = require("./common")

function parseVersion(version) {
  const match = version && version.match(/^(\d+)\.(\d+)\.(\d+)$/)
  if (!match) return null

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  }
}

function incrementPatchVersion(version) {
  const parsed = parseVersion(version)
  if (!parsed) return null
  return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`
}

function validateSkillVersion(ctx, file, version) {
  if (!version) return

  if (!parseVersion(version)) {
    ctx.fail(`${file}: metadata.version must be a semantic version, got ${version}`)
    return
  }

  if (!ctx.gitHeadExists) {
    if (ctx.projectVersionSemver && version !== ctx.projectVersion) {
      ctx.fail(`${file}: no Git HEAD found; initial skills must use metadata.version ${ctx.projectVersion}, got ${version}`)
    }
    return
  }

  const gitText = ctx.readGitText(file)
  if (!gitText) {
    if (ctx.projectVersionSemver && version !== ctx.projectVersion) {
      ctx.fail(`${file}: new skill files must start with metadata.version ${ctx.projectVersion}, got ${version}`)
    }
    return
  }

  const parsed = parseFrontmatterText(`${file} at HEAD`, gitText)
  for (const error of parsed.errors) ctx.fail(error)
  const gitVersion = parsed.data.metadata?.version
  if (!gitVersion) {
    ctx.fail(`${file}: Git version is missing metadata.version`)
    return
  }

  if (!parseVersion(gitVersion)) {
    ctx.fail(`${file}: Git metadata.version must be a semantic version, got ${gitVersion}`)
    return
  }

  const skillChanged = ctx.changedSkillFiles.has(normalizePath(file))
  const nextGitVersion = incrementPatchVersion(gitVersion)

  if (!skillChanged) {
    if (version !== gitVersion) {
      ctx.fail(`${file}: metadata.version ${version} differs from Git version ${gitVersion}, but this skill file has no git changes`)
    }
    return
  }

  if (version === gitVersion || version === nextGitVersion) return

  ctx.fail(`${file}: changed skill files must keep metadata.version ${gitVersion} or bump to immediate next patch ${nextGitVersion}, got ${version}`)
}

module.exports = {
  parseVersion,
  incrementPatchVersion,
  validateSkillVersion,
}
