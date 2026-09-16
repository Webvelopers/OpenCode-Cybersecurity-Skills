const fs = require("fs")
const path = require("path")
const { loadCatalog, catalogOutputPlan, replaceGeneratedBlock } = require("./skill-catalog")

const root = process.cwd()
const write = process.argv.includes("--write")
const check = process.argv.includes("--check") || !write
const catalog = loadCatalog(root)
const files = new Map()
let stale = false

for (const section of catalogOutputPlan(catalog)) {
  const filePath = path.join(root, section.file)
  const current = files.has(section.file) ? files.get(section.file) : fs.readFileSync(filePath, "utf8")
  const next = replaceGeneratedBlock(current, section.id, section.body)
  files.set(section.file, next)
}

for (const [file, next] of files.entries()) {
  const filePath = path.join(root, file)
  const current = fs.readFileSync(filePath, "utf8")
  if (current !== next) {
    stale = true
    if (write) {
      fs.writeFileSync(filePath, next, "utf8")
      console.log(`UPDATED: ${file}`)
    } else {
      console.log(`STALE: ${file}`)
    }
  } else {
    console.log(`FRESH: ${file}`)
  }
}

if (check && stale) process.exit(1)
