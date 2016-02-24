/* eslint prefer-rest-params:0, default-case:0, no-console: 0 */
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
require('babel-polyfill');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NPMInstallPlugin = require('npm-install-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

// ENV Setup
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const TEST = 'test';
const ENV = getEnv(TARGET);
console.log('ENV', ENV);

const DEBUG = !process.argv.includes('release');
const VERBOSE = process.argv.includes('verbose');
const WATCH = global.watch || process.argv.includes('watch') || process.argv.includes('--auto-watch');

const unipath = base => function _unipath(/*paths*/) {
  return path.resolve(path.join.apply(null, [base].concat(Array.from(arguments))));
};

const PATHS = { // :off
  src: unipath('src'),
  build: unipath('build'),
  modules: unipath('node_modules'),
  base: unipath('.'),
}; // :on
const LOADER_INCLUDES = [PATHS.src(), PATHS.base('tests.webpack.js')];

module.exports = {
  entry: getEntry(ENV),

  output: { // :off
    path: PATHS.build(),
    publicPath: '/',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    sourcePrefix: '  ',
  }, // :on

  module: {
    preLoaders: getPreLoaders(ENV),

    loaders: getLoaders(ENV),
  },

  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
  },

  cache: DEBUG,

  debug: DEBUG,

  devtool: getDevtool(ENV),

  plugins: getPlugins(ENV),

  target: 'web',

  progress: true,

  watch: WATCH,

  noInfo: !VERBOSE,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  postcss(bundler) {
    return [
      require('colorguard')(),
      require('postcss-import')({ addDependencyTo: bundler }),
      require('precss')(),
      require('autoprefixer')({ browsers: ['last 2 versions'] }),
    ];
  },
};

function getEntry(env) {
  const entry = [];

  switch (env) {
    case DEVELOPMENT:
      entry.push('babel-polyfill');
      entry.push('webpack-hot-middleware/client?http://localhost:3000');
      entry.push('webpack/hot/only-dev-server'); // TODO ??
      entry.push(PATHS.src('index.jsx'));
      break;
    case PRODUCTION:
      entry.push(PATHS.src('index.jsx'));
      break;
    case TEST:
      entry.push('babel-polyfill');
      break;
  }

  return entry;
}

function getPreLoaders(env) {
  const preLoaders = [];

  switch (env) {
    case PRODUCTION:
      preLoaders.push({
        test: /\.jsx?$/, include: LOADER_INCLUDES, loaders: ['eslint', 'jscs'],
      });
      break;

    case DEVELOPMENT:
      preLoaders.push({
        test: /\.jsx?$/, include: LOADER_INCLUDES, loaders: ['eslint', 'jscs'],
      });
      break;

    case TEST:
      preLoaders.push({
        test: /\.jsx?$/, include: LOADER_INCLUDES, loader: 'babel-istanbul',
      });
      break;
  }
  return preLoaders;
}

function getDevtool(env) {
  switch (env) {
    case PRODUCTION:
      return 'source-map';
    case DEVELOPMENT:
      return 'inline-source-map';
    case TEST:
      return 'inline-source-map';
    default:
      return false;
  }
}

function getLoaders(env) {
  const JS_LOADER = { // :off
    test: /\.jsx?$/,
    include: LOADER_INCLUDES,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      presets: [],
    },
  }; // :on
  const loaders = [
    JS_LOADER,
    {
      test: /\.json$/,
      include: LOADER_INCLUDES,
      loader: 'json',
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      include: LOADER_INCLUDES,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      include: LOADER_INCLUDES,
      loader: 'url?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      include: LOADER_INCLUDES,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      include: LOADER_INCLUDES,
      loader: 'file',
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      include: LOADER_INCLUDES,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      include: LOADER_INCLUDES,
      loader: 'url?limit=10000',
    },
    {
      test: /\.(wav|mp3)$/,
      include: LOADER_INCLUDES,
      loader: 'file',
    },
  ];

  switch (env) {
    case PRODUCTION:
      loaders.push({// :off
        test: /\.s?css$/,
        include: LOADER_INCLUDES,
        loader: ExtractTextPlugin.extract((
          ''
          + 'css'
          + '?minimize'
          + '&sourceMap'
          + '&modules'
          + '&localIdentName=[hash:base64:4]'
          + '&importLoaders=2'
          + '!'
          + 'postcss'
          + '?sourceMap'
          + '&parser=postcss-scss'
          + '!'
          + 'sass'
          + '?sourceMap'
        )),
      });// :on
      break;
    case DEVELOPMENT:
      loaders.push({ // :off
        test: /\.s?css$/,
        includes: LOADER_INCLUDES,
        loaders: [
          'style'
          + '?sourceMap',
          'css'
          + '?sourceMap'
          + '&modules'
          + '&localIdentName=[name]__[local]__[hash:base64:5]'
          + '&importLoaders=2',
          'postcss'
          + '?sourceMap'
          + '&parser=postcss-scss',
          'sass'
          + '?sourceMap',
        ],
      }); // :on
      JS_LOADER.query.presets.push('react-hmre');
      break;
    case TEST:
      loaders.push({ // :off
        test: /\.s?css$/,
        include: LOADER_INCLUDES,
        loaders: [
          'style'
          + '?sourceMap',
          'css'
          + '?sourceMap'
          + '&modules'
          + '&localIdentName=[name]__[local]__[hash:base64:5]'
          + '&importLoaders=2',
          'postcss'
          + '?sourceMap'
          + '&parser=postcss-scss',
        ],
      }); // :on
      break;
  }

  return loaders;
}

function getPlugins(env) {
  const plugins = [ // :off
    new NPMInstallPlugin({ save: true }),
    new HTMLPlugin({
      inject: false,
      template: PATHS.modules('html-webpack-template', 'index.ejs'),
      appMountId: 'app',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      __DEV__: env === DEVELOPMENT,
      __DEVTOOLS__: DEBUG,
    }),
  ]; // :on

  switch (env) {
    case PRODUCTION:
      plugins.push(new ExtractTextPlugin('main.css'));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
      break;
    case DEVELOPMENT:
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
  }
  return plugins;
}

function getEnv(target) {
  if (global.test) {return TEST;}

  switch (target) {
    case 'test':
      return TEST;
    case 'start':
      return DEVELOPMENT;
    default:
      throw Error(`unknown target ${target}`);
  }
}
