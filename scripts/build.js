const fs = require("fs-extra")
const { spawnSync } = require("child_process")

const options = { stdio: "inherit", shell: true }
const packageJson = require("../package.json")

fs.removeSync("lib")
spawnSync("babel src --source-maps --out-dir lib", options)
spawnSync(
  "tsc --diagnostics --allowJs --declaration --emitDeclarationOnly  --removeComments  --skipLibCheck  --outDir lib src/index",
  options
)

delete packageJson.devDependencies
fs.writeJsonSync("lib/package.json", packageJson)