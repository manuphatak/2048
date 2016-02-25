/* eslint no-console: 0 */
import fsp from 'fs-promise';
import del from 'del';
import webpack from 'webpack';
import config from './webpack.config';
import express from 'express';
import path from 'path';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import ProgressBar from 'progress';
import chalk from 'chalk';

const SERVE = process.argv.includes('serve');
const PORT = 3002;

// ===========================================================================
// Run
// ===========================================================================
try {
  (async() => {
    await task(clean)();
    await task(copy)();
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
  await fsp.mkdirp('build');
}

async function copy() {
  await fsp.copy('static', 'build', true);
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
    console.log(`${formatTime(start)} Starting '${chalk.green.bold(func.name)}'...`);
    await func();
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(`${formatTime(end)} Finished '${chalk.green.bold(func.name)}' after ${elapsed(time)}`);
  };

  function elapsed(time) {
    return chalk.white.bold(`${time}ms`);
  }

  function formatTime(time) {
    return chalk.dim(`[${time.toLocaleTimeString()}]`);
  }
}

function runWebpack() {
  const WIDTH = process.stdout.columns - 10;
  const barTemplate = ':message → :bar :etas';
  const progress = new ProgressBar(barTemplate, { // :off
    total: 100,
    width: 20,
    complete: chalk.magenta('█'),
    incomplete: chalk.dim.gray('░'),
  }); // :on

  return new Promise((resolve, reject) => {
    const bundler = webpack(config);
    bundler.apply(new ProgressPlugin((percentage, message) => {
      progress.width = WIDTH - message.length;
      progress.update(percentage, { message });
    }));
    bundler.run((err, stats) => err ? reject(err) : resolve(stats));
  });
}
