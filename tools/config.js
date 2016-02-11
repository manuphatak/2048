import path from 'path';
import webpack from 'webpack';
import merge from 'lodash.merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NpmInstallPlugin from 'npm-install-webpack-plugin';

const dependencies = require('../package.json').dependencies;

const PATHS = {
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
  main: path.join(__dirname, '../src/app.js'),
  config: path.join(__dirname, '../src/config.js'),
  tools: path.join(__dirname, '../tools'),
};

const DEBUG = !process.argv.includes('release');
const VERBOSE = process.argv.includes('verbose');
const WATCH = global.watch;
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

const INCLUDE_PATHS = [ // :off
  path.resolve(PATHS.src),
  path.resolve(PATHS.main),
  path.resolve(PATHS.config),
]; // :on

const JS_LOADER = { test: /\.jsx?$/, include: INCLUDE_PATHS, loader: 'babel' };

const JS_LOADER_DEV = Object.assign({}, JS_LOADER, {
  query: {
    presets: ['react-hmre'],
  },

  cacheDirectory: true,
});

const SCSS_LOADER = { // :off
  test: /\.scss$/,
  loaders: ['style', 'css?minimize', 'postcss', 'sass'],
  include: INCLUDE_PATHS,
}; // :on

const SCSS_LOADER_DEV = { // :off
  test: /\.scss$/,
  loaders: ['style?sourceMap', 'css', 'postcss?sourceMap', 'sass?sourceMap'],
  include: INCLUDE_PATHS,
}; // :on

const developmentPlugins = [
  new NpmInstallPlugin({
    save: true,
  }),
];

const productionPlugins = [ // :off
  new webpack.optimize.DedupePlugin(),

  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: VERBOSE },
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
];  // :on

// Base configuration
const config = {
  output: { // :off
    path: PATHS.build,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[file].map',
    publicPath: '/',
    sourcePrefix: '  ',
  },  // :on

  cache: DEBUG,

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },

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

  plugins: [

    new webpack.optimize.OccurenceOrderPlugin(), // :off
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      __DEV__: DEBUG,
    }),
  ],  // :on

  module: {
    loaders: [
      { test: /[\\\/]app\.js$/, loader: path.join(PATHS.tools, './lib/routes-loader.js'), include: [PATHS.main] },

      { test: /\.json$/, loader: 'json', include: INCLUDE_PATHS },

      { test: /\.txt$/, loader: 'raw', include: INCLUDE_PATHS },

      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url?limit=10000', include: INCLUDE_PATHS },

      { test: /\.(eot|ttf|wav|mp3)$/, loader: 'file', include: INCLUDE_PATHS },

    ],
  },

  postcss: function plugins() {
    return [ // :off
      require('precss')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
    ];  // :on
  },
};

// Configuration for the client-side bundle
const appConfig = merge({}, config, {
  entry: {
    app: [ // :off
      'babel-polyfill',
      ...(WATCH ? ['webpack-hot-middleware/client'] : []),
      './src/app.js',
    ],  // :on
    vendor: Object.keys(dependencies),
  },

  devtool: DEBUG ? 'source-map' : false,

  plugins: [ // :off
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    ...config.plugins, ...(DEBUG ? developmentPlugins : productionPlugins),
    ...(!WATCH ? [] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]),
  ],  // :on

  module: {
    loaders: [ // :off
      WATCH ? JS_LOADER_DEV : JS_LOADER,
      ...config.module.loaders,
      DEBUG ? SCSS_LOADER_DEV : SCSS_LOADER,
    ],  // :on
  },
});

// Configuration for server-side pre-rendering bundle
const pagesConfig = merge({}, config, {
  entry: {
    'app.node': ['babel-polyfill', './src/app.js'],
  },

  output: { libraryTarget: 'commonjs2' },

  target: 'node',

  node: { // :off
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },  // :on

  externals: /^[a-z][a-z\.\-\/0-9]*$/i,

  plugins: config.plugins.concat([ // :off
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
  ]),  // :on

  module: {
    loaders: [// :off
      JS_LOADER,
      ...config.module.loaders,
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css'
          + '?modules'
          + '&importLoaders=1'
          + `${DEBUG ? '' : '&minify'}`
          + '!postcss'
          + '!sass'
        ),
      },
    ], // :on
  },
});

export default [
  appConfig, pagesConfig,
];
