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
const PROFILE = process.argv.includes('profile');
const PORT = 3002;
const HOST = 'localhost';

// ===========================================================================
// Run
// ===========================================================================

(async function main() {
  try {
    await task(clean)();
    await task(copy)();
    const stats = await task(bundle)();

    if (PROFILE) {
      await task(profile.bind(null, stats))();
    }

    if (SERVE) {
      serve();
    }
  }
  catch (err) {
    console.error(err.stack);
  }
}());

// ===========================================================================
// Tasks
// ===========================================================================

/**
 * Delete 'build' directory contents.
 *
 * @returns {void}
 */
async function clean() {
  await del(['build/*', '!build/.git'], { dot: true });
  await fsp.mkdirp('build');
}

/**
 * Copy 'static' into build
 *
 * @returns {void}
 */
async function copy() {
  await fsp.copy('static', 'build', true);
}

/**
 * Run webpack.
 *
 * @returns {object} webpack stats object
 */
async function bundle() {
  if (PROFILE) { config.profile = true;}

  const stats = await runWebpack(config);

  // print webpack output
  console.error(stats.toString(config.stats));

  return stats;
}

/**
 * Save webpack profile data to 'stats.json'.
 *
 * @param {object} stats - webpack stats object
 * @returns {void}
 */
async function profile(stats) {
  const statsFile = path.join(__dirname, 'stats.json');
  await fsp.outputJson(statsFile, stats.toJson());
}

/**
 * Serve 'build' directory.
 *
 * @returns {void}
 */
function serve() {
  const publicPath = config.output.publicPath;
  const app = express();

  app.use(publicPath, express.static(path.join(__dirname, 'build')));
  app.listen(PORT, () => {
    console.error(`Serving build at http://${HOST}:${PORT}${publicPath}`);
  });
}

// ===========================================================================
// Utils
// ===========================================================================
/**
 * Decorator. Run task with log reports of run details.
 *
 * @param {Function} func
 * @returns {taskRunner} Decorated async function.
 */
function task(func) {
  return taskRunner;

  /**
   * Log task name, and time details.
   *
   * @param {...*} args - arguments for task
   * @returns {*} - task results
   */
  async function taskRunner(...args) {
    const start = new Date();
    console.error(`${formatTime(start)} Starting '${chalk.green.bold(func.name)}'...`);

    const results = await func(...args);

    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.error(`${formatTime(end)} Finished '${chalk.green.bold(func.name)}' after ${elapsed(time)}`);

    return results;
  }

  /**
   * Colorize and humanize time readout.
   *
   * @param {number} time
   * @returns {string}
   */
  function elapsed(time) {
    return chalk.white.bold(`${time}ms`);
  }

  /**
   * Format time as a log entry prefix.
   *
   * @param {Date} time
   * @returns {string}
   */
  function formatTime(time) {
    return chalk.dim(`[${time.toLocaleTimeString()}]`);
  }
}

/**
 * Convert 'webpack.run' into a promise, with a progress bar.
 *
 * @param {object} webpackConfig
 * @returns {Promise}
 */
function runWebpack(webpackConfig) {
  // terminal width
  const WIDTH = process.stdout.columns - 11;
  const barTemplate = ':message → :bar :elapseds';

  // create a ProgressBar object handle
  const progress = new ProgressBar(barTemplate, { // :off
    total: 100,
    complete: chalk.magenta('█'),
    incomplete: chalk.dim.gray('░'),
    clear: true,
  }); // :on

  return new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfig);

    // subscribe to webpack progress
    bundler.apply(new ProgressPlugin(updateProgress));

    // run the build;
    bundler.run((error, stats) => {
      // use progress callback to resolve promise
      progress.callback = () => error ? reject(error) : resolve(stats);

      // complete progress bar
      updateProgress(1, 'Complete');
    });
  });

  /**
   * Set progress bar % complete and message.
   *
   * @param {number} percentage
   * @param {string} message
   * @returns {void}
   */
  function updateProgress(percentage, message) {
    progress.width = WIDTH - message.length;
    progress.update(percentage, { message });
  }
}
