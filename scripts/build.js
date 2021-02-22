const fs = require("fs-extra")
const { spawnSync } = require("child_process")

const options = { stdio: "inherit", shell: true }
const { name, version, description, repository, license, dependencies, peerDependencies, sideEffects } = require("../package.json")

fs.removeSync("lib")
spawnSync("tsc", options)
fs.copySync("src/index.d.ts", "lib/index.d.ts")
fs.copySync("README.md", "lib/README.md")

fs.writeJsonSync("lib/package.json", { name, version, description, repository, license, dependencies, peerDependencies, sideEffects }, { spaces: 2 })