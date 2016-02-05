const webpack = require('webpack');
const PATHS = require('./webpack.utils').PATHS;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
module.exports = {

  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts',
      '.tsx',
      '.prod.tsx',
      '.prod.ts'
    ]
  },

  devTool: 'inline-source-map',

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: [
          'awesome-typescript?forkCheckerSilent=true&doTypeCheck=false'
        ],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'sass'
        ],
        include: PATHS.app
      }
    ]
  },
  webpackMiddleware: {
    noInfo: true
  },
  plugins: [
    new ForkCheckerPlugin(),
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.ejs',
      title: '2048',
      appMountId: 'app',
      inject: false
    })
  ]

};
