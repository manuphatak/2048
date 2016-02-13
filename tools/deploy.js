import GitRepo from 'git-repository';
import task from './lib/task';

const reGithubPrefix = /^(?:git)?\+?(?:https?)?:\/\/github\.com\//;
const remote = { // :off
  name: 'github',
  url: require('../package.json').repository.url
                                 .replace(reGithubPrefix, 'git@github.com:'),
  branch: 'gh-pages',
};  // :on
console.log('remote.url', remote.url);
/**
 * Deploy the contents of the `/build` folder to GitHub Pages.
 */
export default task(async function deploy() {
  // Initialize a new Git repository inside the `/build` folder
  // if it doesn't exist yet
  const repo = await GitRepo.open('build', { init: true });
  await repo.setRemote(remote.name, remote.url);

  // Fetch the remote repository if it exists
  if ((await repo.hasRef(remote.url, remote.branch))) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/${remote.branch}`, { hard: true });
    await repo.clean({ force: true });
  }

  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  process.argv.push('release');
  await require('./build').default();

  // Push the contents of the build folder to the remote server via Git
  await repo.add('--all .');
  await repo.commit(`Update ${new Date().toISOString()}`);
  await repo.push(remote.name, `master:${remote.branch}`);
});
