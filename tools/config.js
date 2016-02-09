import path from 'path';
import webpack from 'webpack';
import merge from 'lodash.merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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

const JS_LOADER = {
  test: /\.jsx?$/,
  include: [
    path.resolve(__dirname, '../components'),
    path.resolve(__dirname, '../lib'),
    path.resolve(__dirname, '../pages'),
    path.resolve(__dirname, '../app'),
    path.resolve(__dirname, '../app.js'),
    path.resolve(__dirname, '../config.js'),
  ],
  loader: 'babel',
};

const JS_LOADER_DEV = Object.assign({}, JS_LOADER, {
  query: {
    // Wraps all React components into arbitrary transforms
    // https://github.com/gaearon/babel-plugin-react-transform
    presets: ['react-hmre'],
  },
});

const SCSS_LOADER = {
  test: /\.scss$/,
  loaders: [
    'style',
    'css?minimize',
    'postcss',
    'sass',
  ],
};

const SCSS_LOADER_DEV = {
  test: /\.scss$/,
  loaders: [
    'style?sourceMap',
    'css',
    'postcss?sourceMap',
    'sass?sourceMap',
  ],
};

// Base configuration
const config = {
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/',
    sourcePrefix: '  ',
  },
  cache: DEBUG,

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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG
        ? '"development"'
        : '"production"',
      __DEV__: DEBUG,
    }),
  ],
  module: {
    loaders: [
      {
        test: /[\\\/]app\.js$/,
        loader: path.join(__dirname, './lib/routes-loader.js'),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.txt$/,
        loader: 'raw',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url?limit=10000',
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file',
      },
    ],
  },
  postcss: function plugins() {
    return [
      require('precss')(),
      require('autoprefixer')({
        browsers: AUTOPREFIXER_BROWSERS,
      }),
    ];
  },
};

const productionPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: VERBOSE,
    },
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
];

// Configuration for the client-side bundle
const appConfig = merge({}, config, {
  entry: [
    'babel-polyfill',
    ...(WATCH
      ? ['webpack-hot-middleware/client']
      : []),
    './app.js',
  ],
  output: {
    filename: 'app.js',
  },

  devtool: DEBUG
    ? 'cheap-module-eval-source-map'
    : false,
  plugins: [
    ...config.plugins,
    ...(DEBUG
      ? []
      : productionPlugins),
    ...(!WATCH
      ? []
      : [  // :off
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ]),  // :on
  ],
  module: {
    loaders: [
      WATCH
        ? JS_LOADER_DEV
        : JS_LOADER,
      ...config.module.loaders,
      DEBUG ? SCSS_LOADER_DEV : SCSS_LOADER,
    ],
  },
});

// Configuration for server-side pre-rendering bundle
const pagesConfig = merge({}, config, {
  entry: [
    'babel-polyfill',
    './app.js',
  ],
  output: {
    filename: 'app.node.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  externals: /^[a-z][a-z\.\-\/0-9]*$/i,
  plugins: config.plugins.concat([
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
  ]),
  module: {
    loaders: [
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
    ],
  },
});

export default [
  appConfig,
  pagesConfig,
];
