const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = require('./webpack.utils.js').PATHS;
const dependencies = require('./package.json').dependencies;

module.exports = {
  entry: {
    app: [PATHS.index],
    vendor: Object.keys(dependencies)
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      {
        test: /\.ts(x)?$/,
        loader: 'tslint',
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.(jpg|png|jpg|png|woff|eot|ttf|svg|gif)$/,
        loader: "file-?name=[name].[ext]",
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.ejs',
      title: '2048',
      appMountId: 'app',
      inject: false
    })
  ],
  postcss: function() {
    return [
      require('autoprefixer'),
      require('precss')
    ]
  }
};
