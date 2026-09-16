const path = require("path")

function asciiTextError(file, text) {
  for (let index = 0; index < text.length; index += 1) {
    if (text.charCodeAt(index) > 127) {
      return `${file}: non-ASCII character at offset ${index}`
    }
  }
  return null
}

function markdownLinkErrors(ctx, files) {
  const errors = []
  const linkRegex = /\[([^\]]+)\]\((?!https?:\/\/|mailto:)([^)#\s]+)(?:#[^\s)]+)?\)/g
  for (const file of files) {
    const text = ctx.readText(file)
    let match
    const dir = path.dirname(file)
    while ((match = linkRegex.exec(text)) !== null) {
      const target = match[2]
      if (!target) continue
      const resolved = path.join(ctx.root, dir, target)
      if (!ctx.existsAbsolute(resolved)) {
        errors.push(`${file}: broken internal link to ${target} (resolved to ${resolved})`)
      }
    }
  }
  return errors
}

function validateDocs(ctx) {
  const markdownFiles = [
    "README.md",
    "LICENSE.md",
    "TODO.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    ...ctx.walk("docs", (file) => file.endsWith(".md")),
    ...ctx.walk(".opencode", (file) => file.endsWith(".md")),
  ]
  const existingMarkdownFiles = markdownFiles.filter((file) => ctx.exists(file))
  for (const file of existingMarkdownFiles) {
    const error = asciiTextError(file, ctx.readText(file))
    if (error) ctx.fail(error)
  }
  for (const error of markdownLinkErrors(ctx, existingMarkdownFiles)) ctx.fail(error)

  for (const file of ["README.md", "LICENSE.md", "TODO.md", "CHANGELOG.md", "VERSION"]) {
    if (!ctx.exists(file)) ctx.fail(`${file}: missing`)
    else if (!ctx.readText(file).trim()) ctx.fail(`${file}: empty`)
  }

  if (!ctx.projectVersion) {
    ctx.fail("VERSION: missing project version")
    return
  }

  if (!/^\d+\.\d+\.\d+$/.test(ctx.projectVersion)) {
    ctx.fail(`VERSION: expected semantic version, got ${ctx.projectVersion}`)
  }

  const readme = ctx.exists("README.md") ? ctx.readText("README.md") : ""
  const changelog = ctx.exists("CHANGELOG.md") ? ctx.readText("CHANGELOG.md") : ""
  const skillReadme = ctx.exists(".opencode/skills/cybersecurity/README.md")
    ? ctx.readText(".opencode/skills/cybersecurity/README.md")
    : ""

  if (!readme.includes(`Project version: \`${ctx.projectVersion}\``)) {
    ctx.fail(`README.md: missing project version ${ctx.projectVersion}`)
  }

  if (!readme.includes(`Initial skill metadata version: \`${ctx.projectVersion}\``)) {
    ctx.fail(`README.md: missing initial skill metadata version ${ctx.projectVersion}`)
  }

  if (!skillReadme.includes(`Initial skill metadata version: \`${ctx.projectVersion}\``)) {
    ctx.fail(`.opencode/skills/cybersecurity/README.md: missing initial skill metadata version ${ctx.projectVersion}`)
  }

  if (!changelog.includes(`## [${ctx.projectVersion}]`)) {
    ctx.fail(`CHANGELOG.md: missing release ${ctx.projectVersion}`)
  }
}

module.exports = {
  validateDocs,
  asciiTextError,
  markdownLinkErrors,
}
