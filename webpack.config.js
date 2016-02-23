/* eslint prefer-rest-params:0, default-case:0 */
require('babel-polyfill');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NPMInstallPlugin = require('npm-install-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

// const TEST = 'test'; // TODO setup

const ENV = DEVELOPMENT; // TODO make this more programmatic
const DEBUG = !process.argv.includes('release');
const VERBOSE = process.argv.includes('verbose');
const WATCH = global.watch;

const unipath = base => function _unipath(/*paths*/) {
  return path.resolve(path.join.apply(null, [base].concat(Array.from(arguments))));
};

const PATHS = { // :off
  src: unipath('src'),
  build: unipath('build'),
  modules: unipath('node_modules'),
  base: unipath(),
}; // :on

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
    loaders: getLoaders(ENV),
  },

  resolve: {
    extensions: ['', '.json', '.js', '.jsx'],
  },

  cache: DEBUG,

  debug: DEBUG,

  devtool: PRODUCTION ? 'source-map' : 'inline-source-map',

  plugins: getPlugins(ENV),

  target: 'web',

  progress: true,

  watch: WATCH,

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

function getEntry(env) {
  const entry = [];

  switch (env) {
    case DEVELOPMENT:
      entry.push('babel-polyfill');
      entry.push('webpack-hot-middleware/client?http://localhost:3000');
      entry.push('webpack/hot/only-dev-server'); // TODO ??
      break;
  }

  entry.push(PATHS.src('index.jsx'));
  return entry;
}

function getLoaders(env) {
  const loaders = [
    {
      test: /\.jsx?$/,
      include: PATHS.src(),
      loaders: ['babel?cacheDirectory', 'eslint', 'jscs'],
    },
    {
      test: /\.json$/,
      include: [PATHS.src()],
      loader: 'json',
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      include: [PATHS.src()],
      loader: 'url?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      include: [PATHS.src()],
      loader: 'url?limit=10000&mimetype=application/font-woff',
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      include: [PATHS.src()],
      loader: 'url?limit=10000&mimetype=application/octet-stream',
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      include: [PATHS.src()],
      loader: 'file',
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      include: [PATHS.src()],
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'url?limit=10000',
    },
    {
      test: /\.(wav|mp3)$/,
      loader: 'file',
    },
  ];

  switch (env) {
    case PRODUCTION:
      loaders.push({// :off
        test: /\.s?css$/,
        include: PATHS.src(),
        loader: ExtractTextPlugin.extract((
          'css'
          + '?minimize'
          + '&sourceMap'
          + '&modules'
          + '&localIdentName=[hash:base64:4]'
          + '&importLoaders=2'
          + '!'
          + 'postcss'
          + '?sourceMap'
          + '&parser=postcss-scss'
        )),
      });// :on
      break;
    case DEVELOPMENT:
      loaders.push({ // :off
        test: /\.s?css$/,
        include: PATHS.src(),
        loaders: [
          'style'
          + '?sourceMap',
          'css'
          + '?sourceMap'
          + '&modules'
          + '&localIdentName=[name]__[local]__[hash:base64:3]'
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
