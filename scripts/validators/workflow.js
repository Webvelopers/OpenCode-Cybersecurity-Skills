function validateWorkflow(ctx) {
  const file = ".github/workflows/validate.yml"
  if (!ctx.exists("scripts/quality-gates.js")) {
    ctx.fail("scripts/quality-gates.js: missing CI quality gate script")
  }

  if (!ctx.exists("scripts/skill-health.js")) {
    ctx.fail("scripts/skill-health.js: missing skill health report script")
  }

  if (!ctx.exists(file)) {
    ctx.fail(`${file}: missing`)
    return
  }

  const text = ctx.readText(file)
  for (const message of workflowTextErrors(file, text)) ctx.fail(message)
}

function workflowTextErrors(file, text) {
  const messages = []

  if (!/^permissions:\s*\n\s{2}contents:\s*read\s*$/m.test(text)) {
    messages.push(`${file}: missing minimal permissions contents: read`)
  }

  const actionRefRegex = /^\s*-?\s*uses:\s*(actions\/[^@\s]+)@([^\s#]+).*$/gm
  let match
  while ((match = actionRefRegex.exec(text)) !== null) {
    if (!/^[0-9a-f]{40}$/.test(match[2])) {
      messages.push(`${file}: ${match[1]} must be pinned to a 40-character commit SHA`)
    }
  }

  const auditCommand = "npm audit --package-lock-only --audit-level=high"
  const lockPrepareCommand = "npm install --package-lock-only --ignore-scripts"
  const qualityGateCommand = "node scripts/quality-gates.js --workflows --secrets --artifacts --markdown --dependencies"
  const actionlintCommand = "npx --yes @kjanat/actionlint@1.17.0"
  const skillHealthCommand = "node scripts/skill-health.js --check"
  const auditIndex = text.indexOf(auditCommand)
  const lockPrepareIndex = text.indexOf(lockPrepareCommand)
  const qualityGateIndex = text.indexOf(qualityGateCommand)
  const actionlintIndex = text.indexOf(actionlintCommand)
  const skillHealthIndex = text.indexOf(skillHealthCommand)

  if (actionlintIndex === -1) {
    messages.push(`${file}: missing pinned actionlint workflow syntax check`)
  }

  if (qualityGateIndex === -1) {
    messages.push(`${file}: missing CI quality gates for workflows, secrets, artifacts, markdown, and dependencies`)
  }

  if (skillHealthIndex === -1) {
    messages.push(`${file}: missing read-only skill health check`)
  }

  if (!text.includes("fetch-depth: 0")) {
    messages.push(`${file}: checkout must use fetch-depth: 0 so changed-text secret scanning can diff the base revision`)
  }

  if (qualityGateIndex !== -1 && (!text.includes("BASE_SHA:") || !text.includes("HEAD_SHA:"))) {
    messages.push(`${file}: quality gates must define BASE_SHA and HEAD_SHA for changed-text secret scanning`)
  }

  if (auditIndex === -1) {
    messages.push(`${file}: missing high-severity dependency audit for .opencode package lock`)
  }

  if (lockPrepareIndex === -1) {
    messages.push(`${file}: missing deterministic .opencode package-lock preparation before dependency audit`)
  } else if (auditIndex !== -1 && lockPrepareIndex > auditIndex) {
    messages.push(`${file}: .opencode package-lock preparation must run before dependency audit`)
  }

  return messages
}

function validateDependabot(ctx) {
  const file = ".github/dependabot.yml"
  if (!ctx.exists(file)) {
    ctx.fail(`${file}: missing dependency update configuration`)
    return
  }

  const text = ctx.readText(file)
  if (!text.includes('package-ecosystem: "github-actions"')) {
    ctx.fail(`${file}: missing GitHub Actions updates`)
  }

  if (!text.includes('package-ecosystem: "npm"') || !text.includes('directory: "/.opencode"')) {
    ctx.fail(`${file}: missing npm updates for /.opencode`)
  }
}

module.exports = {
  validateWorkflow,
  validateDependabot,
  workflowTextErrors,
}
