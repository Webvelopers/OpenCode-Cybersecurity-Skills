const fs = require("fs")
const path = require("path")
const childProcess = require("child_process")

const root = process.cwd()
const textExtensions = new Set([
  ".js",
  ".json",
  ".md",
  ".yml",
  ".yaml",
  ".toml",
  ".txt",
])

const forbiddenArtifactPatterns = [
  /(^|\/)node_modules\//,
  /(^|\/)graphify-out\//,
  /(^|\/)\.graphify_/,
  /(^|\/)\.gstack\//,
]

const secretPatterns = [
  { name: "AWS access key", pattern: /\bA(?:KIA|SIA)[0-9A-Z]{16}\b/ },
  { name: "GitHub token", pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/ },
  { name: "Slack token", pattern: /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/ },
  { name: "Private key", pattern: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/ },
  { name: "Generic assigned secret", pattern: /\b(?:api[_-]?key|secret|token|password)\b\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{24,}/i },
]

function execGit(args) {
  return childProcess.execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
}

function trackedFiles() {
  return execGit(["ls-files"]).split(/\r?\n/).filter(Boolean)
}

function isTextFile(file) {
  return textExtensions.has(path.extname(file).toLowerCase())
}

function trackedTextLines() {
  return trackedFiles()
    .filter(isTextFile)
    .flatMap((file) => fs.readFileSync(path.join(root, file), "utf8").split(/\r?\n/).map((line, index) => ({ file, line: index + 1, text: line })))
}

function workflowLintErrors(file, text) {
  const errors = []
  const lines = text.split(/\r?\n/)

  if (/\t/.test(text)) errors.push(`${file}: workflow must not contain tab indentation`)
  if (!/^name:\s*.+$/m.test(text)) errors.push(`${file}: missing workflow name`)
  if (!/^on:\s*$/m.test(text)) errors.push(`${file}: missing top-level on block`)
  if (!/^jobs:\s*$/m.test(text)) errors.push(`${file}: missing top-level jobs block`)
  if (!/^permissions:\s*\n\s{2}contents:\s*read\s*$/m.test(text)) {
    errors.push(`${file}: missing minimal permissions contents: read`)
  }

  const usesRegex = /^\s*-?\s*uses:\s*([^\s#]+).*$/gm
  let match
  while ((match = usesRegex.exec(text)) !== null) {
    const value = match[1]
    const atIndex = value.lastIndexOf("@")
    if (atIndex === -1) {
      errors.push(`${file}: ${value} must be pinned to a 40-character commit SHA`)
      continue
    }

    const name = value.slice(0, atIndex)
    const ref = value.slice(atIndex + 1)
    if (!/^[0-9a-f]{40}$/.test(ref)) {
      errors.push(`${file}: ${name} must be pinned to a 40-character commit SHA`)
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (/^\s+-\s+name:\s*$/.test(line)) errors.push(`${file}:${index + 1}: step name must not be empty`)
    if (/pull_request_target\s*:/.test(line)) errors.push(`${file}:${index + 1}: pull_request_target is not allowed`)
  }

  return errors
}

function lintWorkflows() {
  const workflowDir = path.join(root, ".github", "workflows")
  if (!fs.existsSync(workflowDir)) return [".github/workflows: missing"]
  const files = fs.readdirSync(workflowDir).filter((file) => /\.ya?ml$/.test(file)).sort()
  return files.flatMap((file) => {
    const relative = path.join(".github", "workflows", file).replace(/\\/g, "/")
    return workflowLintErrors(relative, fs.readFileSync(path.join(root, relative), "utf8"))
  })
}

function forbiddenArtifactErrors(files) {
  return files
    .filter((file) => forbiddenArtifactPatterns.some((pattern) => pattern.test(file.replace(/\\/g, "/"))))
    .map((file) => `${file}: forbidden generated or dependency artifact must not be tracked`)
}

function lintForbiddenArtifacts() {
  return forbiddenArtifactErrors(trackedFiles())
}

function markdownLintErrorsForText(file, text, exists) {
  const errors = []
  const lines = text.split(/\r?\n/)
  const linkRegex = /\[([^\]]+)\]\((?!https?:\/\/|mailto:)([^)#\s]+)(?:#[^\s)]+)?\)/g

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (/[ \t]+$/.test(line)) errors.push(`${file}:${index + 1}: trailing whitespace`)
    if (/^#{1,6}[^#\s]/.test(line)) errors.push(`${file}:${index + 1}: heading must include a space after #`)
  }

  let match
  const dir = path.dirname(file)
  while ((match = linkRegex.exec(text)) !== null) {
    const target = match[2]
    const resolved = path.join(root, dir, target)
    if (!exists(resolved)) errors.push(`${file}: broken internal link to ${target}`)
  }

  return errors
}

function lintMarkdown() {
  return trackedFiles()
    .filter((file) => file.endsWith(".md"))
    .flatMap((file) => markdownLintErrorsForText(file, fs.readFileSync(path.join(root, file), "utf8"), fs.existsSync))
}

function changedAddedLines() {
  const base = process.env.BASE_SHA
  const head = process.env.HEAD_SHA || "HEAD"
  const candidates = []

  if (base && /^0+$/.test(base)) return trackedTextLines()
  if (base) candidates.push([base, head])
  candidates.push(["HEAD", "--"])

  for (const candidate of candidates) {
    try {
      const args = candidate.length === 2 && candidate[1] === "--"
        ? ["diff", "--unified=0", "--no-color", "HEAD", "--", "."]
        : ["diff", "--unified=0", "--no-color", candidate[0], candidate[1], "--", "."]
      return parseAddedLines(execGit(args))
    } catch (_error) {
      // Try the next strategy, then fall back to scanning tracked text files.
    }
  }

  return trackedTextLines()
}

function parseAddedLines(diff) {
  const lines = []
  let currentFile = null
  let newLine = 0

  for (const line of diff.split(/\r?\n/)) {
    const fileMatch = line.match(/^\+\+\+ b\/(.+)$/)
    if (fileMatch) {
      currentFile = fileMatch[1]
      continue
    }

    const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/)
    if (hunkMatch) {
      newLine = Number(hunkMatch[1])
      continue
    }

    if (!currentFile || currentFile === "/dev/null") continue
    if (line.startsWith("+") && !line.startsWith("+++")) {
      lines.push({ file: currentFile, line: newLine, text: line.slice(1) })
      newLine += 1
    } else if (!line.startsWith("-")) {
      newLine += 1
    }
  }

  return lines
}

function secretScanErrors(addedLines) {
  const errors = []
  for (const item of addedLines) {
    for (const secret of secretPatterns) {
      if (secret.pattern.test(item.text)) {
        errors.push(`${item.file}:${item.line}: possible ${secret.name} in added text (value suppressed)`)
      }
    }
  }
  return errors
}

function scanSecrets() {
  return secretScanErrors(changedAddedLines())
}

function dependencyGateErrors() {
  const errors = []
  if (!fs.existsSync(path.join(root, ".opencode", "package.json"))) {
    errors.push(".opencode/package.json: missing dependency manifest")
  }
  return errors
}

function runSelected(flags) {
  const errors = []
  if (flags.has("--all") || flags.has("--workflows")) errors.push(...lintWorkflows())
  if (flags.has("--all") || flags.has("--secrets")) errors.push(...scanSecrets())
  if (flags.has("--all") || flags.has("--artifacts")) errors.push(...lintForbiddenArtifacts())
  if (flags.has("--all") || flags.has("--markdown")) errors.push(...lintMarkdown())
  if (flags.has("--all") || flags.has("--dependencies")) errors.push(...dependencyGateErrors())
  return errors
}

if (require.main === module) {
  const flags = new Set(process.argv.slice(2))
  if (flags.size === 0) flags.add("--all")
  const errors = runSelected(flags)
  if (errors.length > 0) {
    console.error("Quality gates failed:")
    for (const error of errors) console.error(`- ${error}`)
    process.exit(1)
  }
  console.log("Quality gates passed.")
}

module.exports = {
  workflowLintErrors,
  forbiddenArtifactErrors,
  markdownLintErrorsForText,
  parseAddedLines,
  secretScanErrors,
  dependencyGateErrors,
  runSelected,
}
