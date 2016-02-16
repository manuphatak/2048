import path from 'path';
import webpack from 'webpack';
import merge from 'lodash.merge';
import webpackMerge from 'webpack-merge';
import NpmInstallPlugin from 'npm-install-webpack-plugin';

// import ExtractTextPlugin from 'extract-text-webpack-plugin';

const dependencies = require('../package.json').dependencies;

const PATHS = {
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
  main: path.join(__dirname, '../src/app.tsx'),
  config: path.join(__dirname, '../src/config.js'),
  tools: path.join(__dirname, '../tools'),
  interfaces: path.join(__dirname, '../interfaces'),
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
]; // :on

const JS_LOADER = {
  test: /\.jsx?$/, include: INCLUDE_PATHS, loader: 'babel',
};

const JS_LOADER_DEV = merge({}, JS_LOADER, {
  query: { // :off
    presets: ['react-hmre'],
    cacheDirectory: true,
  }, // :on
});
const TS_LOADER = {
  test: /\.tsx?$/, include: INCLUDE_PATHS, loader: 'babel!ts',
};
const TS_LOADER_DEV = merge({}, TS_LOADER, {
  loader: 'babel?cacheDirectory&presets[]=react-hmre&compact=false!ts',
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

// Base configuration
const config = {
  output: { // :off
    path: PATHS.build,
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    publicPath: '/',
    sourcePrefix: '  ',
  },  // :on

  cache: WATCH,

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
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

  plugins: [ // :off
    ...(DEBUG || WATCH ? [
      new NpmInstallPlugin({
        save: true,
      }),
    ] : []),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      __DEV__: DEBUG,
    }),
  ],  // :on

  module: {
    loaders: [
      { test: /[\\\/]app\.tsx$/, loader: path.join(PATHS.tools, './lib/routes-loader.js'), include: [PATHS.main] },

      { test: /\.json$/, loader: 'json', include: INCLUDE_PATHS },

      { test: /\.txt$/, loader: 'raw', include: INCLUDE_PATHS },

      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url?limit=10000', include: INCLUDE_PATHS },

      { test: /\.(eot|ttf|wav|mp3)$/, loader: 'file', include: INCLUDE_PATHS },

    ],
  },

  postcss: function plugins(bundler) {
    return [ // :off
      require('postcss-import')({ addDependencyTo: bundler }),
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
      PATHS.main,
    ],  // :on

    vendor: [
      ...Object.keys(dependencies),
    ],
  },

  devtool: DEBUG ? 'eval-source-map' : false,

  plugins: [ // :off
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    ...(DEBUG
      ? [
      ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: VERBOSE },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]
    ),
    ...(WATCH
      ? [
        new webpack.HotModuleReplacementPlugin(),

        // new webpack.NoErrorsPlugin(),
      ] : []
    ),
  ],  // :on

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/, loaders: ['eslint', 'jscs'], include: INCLUDE_PATHS,
      },

      {
        test: /\.s?css$/, loader: 'stylelint', include: INCLUDE_PATHS,
      },
    ],

    loaders: [ // :off
      WATCH ? JS_LOADER_DEV : JS_LOADER,
      WATCH ? TS_LOADER_DEV : TS_LOADER,
      ...config.module.loaders,
      WATCH ? SCSS_LOADER_DEV : SCSS_LOADER,
    ],  // :on
  },

  stylelint: {
    configFile: path.resolve(__dirname, '../.stylelintrc'),
  },
});

// Configuration for server-side pre-rendering bundle
const pagesConfig = webpackMerge(config, {
  entry: {
    'app.node': [PATHS.main],
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

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ],

  module: {
    loaders: [// :off
      JS_LOADER,
      TS_LOADER,
      {
        test: /\.scss$/,
        loader: 'null',
        include: INCLUDE_PATHS,
      },
    ], // :on
  },
});

export default [
  appConfig, pagesConfig,
];
