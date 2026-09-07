const fs = require("fs")
const path = require("path")
const childProcess = require("child_process")

const root = process.cwd()
const errors = []
const projectVersion = readProjectVersion()
const projectVersionSemver = projectVersion ? parseVersion(projectVersion) : null
const gitHeadExists = hasGitHead()
const changedSkillFiles = findChangedSkillFiles(".opencode/skills/cybersecurity")

function fail(message) {
  errors.push(message)
}

function readText(file) {
  return fs.readFileSync(path.join(root, file), "utf8")
}

function exists(file) {
  return fs.existsSync(path.join(root, file))
}

function readProjectVersion() {
  const file = path.join(root, "VERSION")
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, "utf8").trim()
}

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

function hasGitHead() {
  try {
    childProcess.execFileSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "ignore", "ignore"],
    })
    return true
  } catch (_error) {
    return false
  }
}

function normalizePath(file) {
  return file.replace(/\\/g, "/")
}

function parseGitStatusPath(line) {
  const value = line.slice(3).trim()
  const currentPath = value.includes(" -> ") ? value.split(" -> ").pop() : value
  return currentPath.replace(/^"|"$/g, "")
}

function findChangedSkillFiles(skillRoot) {
  const changed = new Set()

  try {
    const output = childProcess.execFileSync(
      "git",
      ["status", "--porcelain=v1", "--untracked-files=all", "--", skillRoot],
      { cwd: root, encoding: "utf8" },
    )

    for (const line of output.split(/\r?\n/)) {
      if (!line.trim()) continue

      changed.add(normalizePath(parseGitStatusPath(line)))
    }
  } catch (error) {
    fail(`${skillRoot}: unable to inspect git status for skill version policy: ${error.message}`)
  }

  return changed
}

function readGitText(file) {
  try {
    return childProcess.execFileSync("git", ["show", `HEAD:${normalizePath(file)}`], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
  } catch (_error) {
    return null
  }
}

function walk(dir, predicate, output = []) {
  const absolute = path.join(root, dir)
  if (!fs.existsSync(absolute)) return output

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const relative = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(relative, predicate, output)
    else if (!predicate || predicate(relative)) output.push(relative)
  }

  return output
}

function parseFrontmatter(file) {
  return parseFrontmatterText(file, readText(file))
}

function parseFrontmatterText(file, text) {
  if (!text.startsWith("---\n")) {
    fail(`${file}: missing opening frontmatter delimiter`)
    return { data: {}, text }
  }

  const end = text.indexOf("\n---\n", 4)
  if (end === -1) {
    fail(`${file}: missing closing frontmatter delimiter`)
    return { data: {}, text }
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
      fail(`${file}: unsupported frontmatter line: ${line}`)
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

  return { data, text }
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

function validateAscii(file) {
  const text = readText(file)
  for (let index = 0; index < text.length; index += 1) {
    if (text.charCodeAt(index) > 127) {
      fail(`${file}: non-ASCII character at offset ${index}`)
      return
    }
  }
}

function validateConfig() {
  const file = ".opencode/opencode.json"
  if (!exists(file)) {
    fail(`${file}: missing`)
    return
  }

  let config
  try {
    config = JSON.parse(readText(file))
  } catch (error) {
    fail(`${file}: invalid JSON: ${error.message}`)
    return
  }

  if (config.$schema !== "https://opencode.ai/config.json") {
    fail(`${file}: missing or invalid $schema`)
  }

  const paths = config.skills && Array.isArray(config.skills.paths) ? config.skills.paths : []
  if (!paths.includes(".opencode/skills/cybersecurity")) {
    fail(`${file}: skills.paths must include .opencode/skills/cybersecurity`)
  }
}

function validateAgent() {
  const file = ".opencode/agent/cybersecurity.md"
  if (!exists(file)) {
    fail(`${file}: missing`)
    return
  }

  const { data, text } = parseFrontmatter(file)
  if (data.name !== "cybersecurity") fail(`${file}: expected name cybersecurity`)
  if (data.mode !== "primary") fail(`${file}: expected mode primary`)

  const requiredPermissionLines = [
    "edit: deny",
    "task: deny",
    "external_directory: deny",
    '"*": ask',
    '"rm *": deny',
    '"git commit *": deny',
    '"npm install *": deny',
  ]

  for (const line of requiredPermissionLines) {
    if (!text.includes(line)) fail(`${file}: missing permission rule ${line}`)
  }
}

function validateSkills() {
  const skillFiles = walk(".opencode/skills/cybersecurity", (file) => path.basename(file) === "SKILL.md")
  if (skillFiles.length === 0) fail(".opencode/skills/cybersecurity: no SKILL.md files found")

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
    const { data } = parseFrontmatter(file)
    const folderName = path.basename(path.dirname(file))

    if (!data.name) fail(`${file}: missing name`)
    if (data.name !== folderName) fail(`${file}: name does not match folder ${folderName}`)
    if (!data.description) fail(`${file}: missing description`)
    if (data.license !== "MIT") fail(`${file}: expected license MIT`)
    if (!data.metadata || typeof data.metadata !== "object") fail(`${file}: missing metadata map`)

    validateSkillVersion(file, data.metadata && data.metadata.version)

    for (const key of requiredMetadata) {
      if (!data.metadata || !data.metadata[key]) fail(`${file}: missing metadata.${key}`)
    }

    const references = path.join(path.dirname(file), "references", "standards.md")
    if (!exists(references)) fail(`${file}: missing references/standards.md`)
  }
}

function validateSkillVersion(file, version) {
  if (!version) return

  if (!parseVersion(version)) {
    fail(`${file}: metadata.version must be a semantic version, got ${version}`)
    return
  }

  if (!gitHeadExists) {
    if (projectVersionSemver && version !== projectVersion) {
      fail(`${file}: no Git HEAD found; initial skills must use metadata.version ${projectVersion}, got ${version}`)
    }
    return
  }

  const gitText = readGitText(file)
  if (!gitText) {
    if (projectVersionSemver && version !== projectVersion) {
      fail(`${file}: new skill files must start with metadata.version ${projectVersion}, got ${version}`)
    }
    return
  }

  const gitVersion = parseFrontmatterText(`${file} at HEAD`, gitText).data.metadata?.version
  if (!gitVersion) {
    fail(`${file}: Git version is missing metadata.version`)
    return
  }

  if (!parseVersion(gitVersion)) {
    fail(`${file}: Git metadata.version must be a semantic version, got ${gitVersion}`)
    return
  }

  const skillChanged = changedSkillFiles.has(normalizePath(file))
  const nextGitVersion = incrementPatchVersion(gitVersion)

  if (!skillChanged) {
    if (version !== gitVersion) {
      fail(`${file}: metadata.version ${version} differs from Git version ${gitVersion}, but this skill file has no git changes`)
    }
    return
  }

  if (version === gitVersion || version === nextGitVersion) return

  fail(`${file}: changed skill files must keep metadata.version ${gitVersion} or bump to immediate next patch ${nextGitVersion}, got ${version}`)
}

function validateCommand() {
  const file = ".opencode/command/security-assessment.md"
  if (!exists(file)) return

  const { data, text } = parseFrontmatter(file)
  if (data.agent !== "cybersecurity") fail(`${file}: expected agent cybersecurity`)
  if (!data.description) fail(`${file}: missing description`)
  if (!text.split("\n---\n")[1].trim()) fail(`${file}: missing command template body`)
}

function validateDocs() {
  const markdownFiles = [
    "README.md",
    "LICENSE.md",
    "TODO.md",
    "CHANGELOG.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    ...walk("docs", (file) => file.endsWith(".md")),
    ...walk(".opencode", (file) => file.endsWith(".md")),
  ]
  for (const file of markdownFiles) validateAscii(file)

  for (const file of ["README.md", "LICENSE.md", "TODO.md", "CHANGELOG.md", "VERSION"]) {
    if (!exists(file)) fail(`${file}: missing`)
    else if (!readText(file).trim()) fail(`${file}: empty`)
  }

  if (!projectVersion) {
    fail("VERSION: missing project version")
    return
  }

  if (!/^\d+\.\d+\.\d+$/.test(projectVersion)) {
    fail(`VERSION: expected semantic version, got ${projectVersion}`)
  }

  const readme = exists("README.md") ? readText("README.md") : ""
  const changelog = exists("CHANGELOG.md") ? readText("CHANGELOG.md") : ""
  const skillReadme = exists(".opencode/skills/cybersecurity/README.md")
    ? readText(".opencode/skills/cybersecurity/README.md")
    : ""

  if (!readme.includes(`Project version: \`${projectVersion}\``)) {
    fail(`README.md: missing project version ${projectVersion}`)
  }

  if (!readme.includes(`Initial skill metadata version: \`${projectVersion}\``)) {
    fail(`README.md: missing initial skill metadata version ${projectVersion}`)
  }

  if (!skillReadme.includes(`Initial skill metadata version: \`${projectVersion}\``)) {
    fail(`.opencode/skills/cybersecurity/README.md: missing initial skill metadata version ${projectVersion}`)
  }

  if (!changelog.includes(`## [${projectVersion}]`)) {
    fail(`CHANGELOG.md: missing release ${projectVersion}`)
  }
}

validateConfig()
validateAgent()
validateSkills()
validateCommand()
validateDocs()

if (errors.length > 0) {
  console.error("Validation failed:")
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log("OpenCode cybersecurity configuration is valid.")
