const webpack = require('webpack');
const WebpackConfig = require('webpack-config');

const PATHS = require('./webpack.utils').PATHS;

const commonConfig = new WebpackConfig().extend('webpack.common.config');

const config = {
  debug: true,

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ].concat(...(commonConfig.entry.app || []))
  },

  output: {
    filename: '[name].js'
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

  devTool: 'eval',

  watch: true,

  module: {
    loaders: [
      {
        test: /\.ts(x)?$/,
        loaders: [
          'react-hot',
          'ts-loader?instance=jsx'
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
commonConfig.entry.app = [];
module.exports = commonConfig.merge(config);