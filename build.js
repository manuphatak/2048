/* eslint no-console: 0 */
import { mkdirp, copy } from 'fs-promise';
import del from 'del';
import webpack from 'webpack';
import config from './webpack.config';
import express from 'express';
import path from 'path';

const SERVE = process.argv.includes('serve');
const PORT = 3002;

// ===========================================================================
// Run
// ===========================================================================
try {
  (async() => {
    await task(clean)();
    await task(copyStatic)();
    await task(bundle)();
    if (SERVE) {
      serve();
    }
  })();
}
catch (err) {
  console.error(err.stack);
}

// ===========================================================================
// Tasks
// ===========================================================================

async function clean() {
  await del(['build/*', '!build/.git'], { dot: true });
  await mkdirp('build');
}

async function copyStatic() {
  await copy('static', 'build', true);
}

async function bundle() {
  const stats = await runWebpack();
  console.log(stats.toString(config.stats));
}

function serve() {
  const publicPath = config.output.publicPath;
  const app = express();

  app.use(publicPath, express.static(path.join(__dirname, 'build')));
  app.listen(PORT, () => {
    console.log(`Serving build at http://localhost:${PORT}${publicPath}`);
  });
}

// ===========================================================================
// Utils
// ===========================================================================

function task(func) {
  return async() => {
    const start = new Date();
    console.log(`[${start.toLocaleTimeString()}] Starting '${func.name}'...`);
    await func();
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(`[${end.toLocaleTimeString()}] Finished '${func.name}' after ${time}ms`);
  };
}

function runWebpack() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(config);
    bundler.run((err, stats) => err ? reject(err) : resolve(stats));
  });
}
