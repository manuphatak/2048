import glob from 'glob';
import { join } from 'path';

module.exports = function routesLoader(source) {
  this.cacheable();
  const target = this.target;
  const callback = this.async();

  if (target === 'node') {
    source = source.replace('import \'babel/polyfill\';', ''); // eslint-disable-line no-param-reassign
  }

  glob('**/*.{js,jsx}', { cwd: join(__dirname, '../../src/pages') }, (err, files) => {
    if (err) {
      return callback(err);
    }

    const lines = files.map(file => {
      let path = `/${file}`;

      // noinspection IfStatementWithTooManyBranchesJS
      if (path === '/index.js' || path === '/index.jsx') {
        path = '/';
      }
      else if (path.endsWith('/index.js')) {
        path = path.substr(0, path.length - 9);
      }
      else if (path.endsWith('/index.jsx')) {
        path = path.substr(0, path.length - 10);
      }
      else if (path.endsWith('.js')) {
        path = path.substr(0, path.length - 3);
      }
      else if (path.endsWith('.jsx')) {
        path = path.substr(0, path.length - 4);
      }

      if (target === 'node' || path === '/404' || path === '/500') {
        return `  '${path}': () => require('./pages/${file}').default,`;
      }

      return `  '${path}': () => new Promise(resolve => require(['./pages/${file}'], resolve)),`;
    });

    if (lines.length) {
      return callback(null, source.replace(' routes = {', ` routes = {\n${lines.join('')}`));
    }

    // noinspection JSClosureCompilerSyntax
    return callback(new Error('Cannot find any routes.'));
  });
};
