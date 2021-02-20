const fs = require("fs-extra")
const { spawnSync } = require("child_process")

const options = { stdio: "inherit", shell: true }
const { name, version, description, repository, license, dependencies, peerDependencies, sideEffects } = require("../package.json")

fs.removeSync("lib")
spawnSync("babel src --out-dir lib", options)
spawnSync("tsc --allowJs --declaration --emitDeclarationOnly  --removeComments  --skipLibCheck  --outDir lib src/index", options)

fs.writeJsonSync("lib/package.json", { name, version, description, repository, license, dependencies, peerDependencies, sideEffects }, { spaces: 2 })