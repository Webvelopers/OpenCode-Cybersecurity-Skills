const fs = require("fs")
const path = require("path")
const childProcess = require("child_process")
const {
  skillRoot,
  normalizePath,
  parseGitStatusPath,
  parseFrontmatterText,
  missingMarkdownSections,
  getSkillCategory,
  parsePermissionRules,
  stripQuotes,
} = require("./validators/common")
const { validateConfig, validateCommand, commandTextErrors } = require("./validators/config")
const { validateAgent, agentBashAllowlistErrors } = require("./validators/agent")
const { validateWorkflow, validateDependabot, workflowTextErrors } = require("./validators/workflow")
const {
  validateSkills,
  referenceTextErrors,
  skillContentErrors,
  skillMetadataDocumentationErrors,
} = require("./validators/skills")
const { validateCatalog, catalogManifestErrors } = require("./validators/catalog")
const { validateDocs } = require("./validators/docs")
const { parseVersion, incrementPatchVersion } = require("./validators/version")

function readProjectVersion(root) {
  const file = path.join(root, "VERSION")
  if (!fs.existsSync(file)) return null
  return fs.readFileSync(file, "utf8").trim()
}

function hasGitHead(root) {
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

function findChangedSkillFiles(root, targetSkillRoot) {
  const changed = new Set()
  const errors = []

  try {
    const output = childProcess.execFileSync(
      "git",
      ["status", "--porcelain=v1", "--untracked-files=all", "--", targetSkillRoot],
      { cwd: root, encoding: "utf8" },
    )

    for (const line of output.split(/\r?\n/)) {
      if (!line.trim()) continue

      changed.add(normalizePath(parseGitStatusPath(line)))
    }
  } catch (error) {
    errors.push(`${targetSkillRoot}: unable to inspect git status for skill version policy: ${error.message}`)
  }

  return { changed, errors }
}

function walk(root, dir, predicate, output = []) {
  const absolute = path.join(root, dir)
  if (!fs.existsSync(absolute)) return output

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const relative = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue
      walk(root, relative, predicate, output)
    }
    else if (!predicate || predicate(relative)) output.push(relative)
  }

  return output
}

function createContext(root = process.cwd()) {
  const errors = []
  const projectVersion = readProjectVersion(root)
  const projectVersionSemver = projectVersion ? parseVersion(projectVersion) : null
  const gitHeadExists = hasGitHead(root)
  const changedSkillFilesResult = findChangedSkillFiles(root, skillRoot)
  errors.push(...changedSkillFilesResult.errors)

  const ctx = {
    root,
    errors,
    projectVersion,
    projectVersionSemver,
    gitHeadExists,
    changedSkillFiles: changedSkillFilesResult.changed,
    fail(message) {
      errors.push(message)
    },
    readText(file) {
      return fs.readFileSync(path.join(root, file), "utf8")
    },
    exists(file) {
      return fs.existsSync(path.join(root, file))
    },
    existsAbsolute(file) {
      return fs.existsSync(file)
    },
    walk(dir, predicate) {
      return walk(root, dir, predicate)
    },
    parseFrontmatter(file) {
      const parsed = parseFrontmatterText(file, ctx.readText(file))
      for (const error of parsed.errors) ctx.fail(error)
      return parsed
    },
    readGitText(file) {
      try {
        return childProcess.execFileSync("git", ["show", `HEAD:${normalizePath(file)}`], {
          cwd: root,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        })
      } catch (_error) {
        return null
      }
    },
  }

  return ctx
}

function runValidation(ctx) {
  validateConfig(ctx)
  validateAgent(ctx)
  validateWorkflow(ctx)
  validateDependabot(ctx)
  validateSkills(ctx)
  validateCatalog(ctx)
  validateCommand(ctx)
  validateDocs(ctx)

  return ctx.errors
}

function main(root = process.cwd()) {
  const ctx = createContext(root)
  return runValidation(ctx)
}

if (require.main === module) {
  const errors = main()

  if (errors.length > 0) {
    console.error("Validation failed:")
    for (const error of errors) console.error(`- ${error}`)
    process.exit(1)
  }

  console.log("OpenCode cybersecurity configuration is valid.")
}

module.exports = {
  createContext,
  runValidation,
  main,
  parseVersion,
  incrementPatchVersion,
  getSkillCategory,
  missingMarkdownSections,
  parsePermissionRules,
  parseFrontmatterText,
  stripQuotes,
  agentBashAllowlistErrors,
  referenceTextErrors,
  skillContentErrors,
  skillMetadataDocumentationErrors,
  catalogManifestErrors,
  workflowTextErrors,
  commandTextErrors,
}
