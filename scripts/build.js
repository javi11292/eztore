import { spawnSync } from 'child_process';
import fs from 'fs-extra';

const {
  name, version, description, repository, license, dependencies, peerDependencies, sideEffects,
} = fs.readJSONSync('package.json');

fs.removeSync('lib');
spawnSync('tsc -b jsconfig.json', { stdio: 'inherit', shell: true });

fs.copySync('src/index.d.ts', 'lib/index.d.ts');
fs.copySync('README.md', 'lib/README.md');

fs.writeJsonSync('lib/package.json', {
  name, version, description, repository, license, dependencies, peerDependencies, sideEffects,
}, { spaces: 2 });
