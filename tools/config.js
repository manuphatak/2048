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

const INCLUDE_PATHS = [
  path.resolve(__dirname, '../components'),
  path.resolve(__dirname, '../lib'),
  path.resolve(__dirname, '../pages'),
  path.resolve(__dirname, '../app'),
  path.resolve(__dirname, '../app.js'),
  path.resolve(__dirname, '../config.js'),
];

const JS_LOADER = { test: /\.jsx?$/, include: INCLUDE_PATHS, loader: 'babel' };

const JS_LOADER_DEV = Object.assign({}, JS_LOADER, {
  query: {
    presets: ['react-hmre'],
  },
});

const SCSS_LOADER = {
  test: /\.scss$/, loaders: ['style', 'css?minimize', 'postcss', 'sass'], include: INCLUDE_PATHS,
};

const SCSS_LOADER_DEV = {
  test: /\.scss$/, loaders: ['style?sourceMap', 'css', 'postcss?sourceMap', 'sass?sourceMap'], include: INCLUDE_PATHS,
};

// Base configuration
const config = {
  output: {  // :off
    path: path.join(__dirname, '../build'),
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
    new webpack.optimize.OccurenceOrderPlugin(),  // :off
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      __DEV__: DEBUG,
    }),
  ],  // :on

  module: {
    loaders: [
      { test: /[\\\/]app\.js$/, loader: path.join(__dirname, './lib/routes-loader.js'), include: ['../'] },

      { test: /\.json$/, loader: 'json', include: INCLUDE_PATHS },

      { test: /\.txt$/, loader: 'raw', include: INCLUDE_PATHS },

      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/, loader: 'url?limit=10000', include: INCLUDE_PATHS },

      { test: /\.(eot|ttf|wav|mp3)$/, loader: 'file', include: INCLUDE_PATHS },
    ],
  },

  postcss: function plugins() {
    return [  // :off
      require('precss')(),
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
    ];  // :on
  },
};

const productionPlugins = [  // :off
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: VERBOSE },
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
];  // :on

// Configuration for the client-side bundle
const appConfig = merge({}, config, {
  entry: [  // :off
    'babel-polyfill',
    ...(WATCH ? ['webpack-hot-middleware/client'] : []),
    './app.js',
  ],  // :on

  output: { filename: 'app.js' },

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  plugins: [  // :off
    ...config.plugins, ...(DEBUG ? [] : productionPlugins),
    ...(!WATCH ? [] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]),
  ],  // :on

  module: {
    loaders: [  // :off
      WATCH ? JS_LOADER_DEV : JS_LOADER,
      ...config.module.loaders,
      DEBUG ? SCSS_LOADER_DEV : SCSS_LOADER,
    ],  // :on
  },
});

// Configuration for server-side pre-rendering bundle
const pagesConfig = merge({}, config, {
  entry: ['babel-polyfill', './app.js'],

  output: { filename: 'app.node.js', libraryTarget: 'commonjs2' },

  target: 'node',

  node: {  // :off
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },  // :on

  externals: /^[a-z][a-z\.\-\/0-9]*$/i,

  plugins: config.plugins.concat([  // :off
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
