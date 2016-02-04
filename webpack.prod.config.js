const webpack = require('webpack');
const WebpackConfig = require('webpack-config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const PATHS = require('./webpack.utils.js').PATHS;

const commonConfig = new WebpackConfig().extend('webpack.common.config');

const config = {
  devTool: 'source-map',

  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },

  resolve: {
    extensions: [
      '.prod.tsx',
      '.prod.ts'
    ]
  },

  module: {
    loaders: [
      {
        test: /\.ts(x)?$/,
        loader: 'awesome-typescript',
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css', 'postcss', 'sass'),
        include: PATHS.app
      }
    ]
  },

  plugins: [
    new CleanPlugin([PATHS.build], {
      verbose: false
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('styles.[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: [
        'vendor',
        'manifest'
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
//commonConfig.resolve.extensions = [];

module.exports = commonConfig.merge(config);