const webpack = require('webpack');
const WebpackConfig = require('webpack-config');

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const PATHS = require('./webpack.utils').PATHS;
const commonConfig = new WebpackConfig().extend('webpack.common.config');

const config = {

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ]
  },

  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map?[hash]',
    publicPath: 'assets/[hash]/'
  },

  resolve: {
    extensions: [
      '.dev.tsx',
      '.dev.ts'
    ]
  },

  devServer: {
    historyApiFallback: true,
    inline: true,
    progress: true,
    colors: true,
    hot: true,
    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT
  },

  devTool: 'eval-source-map',

  watch: true,

  module: {
    loaders: [
      {
        test: /\.ts(x)?$/,
        loaders: [
          'react-hot',
          'awesome-typescript?instance=jsx'
        ],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'postcss',
          'sass'
        ],
        include: PATHS.app
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor',
        'manifest'
      ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = commonConfig.merge(config);