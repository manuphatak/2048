const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

var commonConfig = {
  entry: path.join(PATHS.app, 'index.tsx'),
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
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css'
        ],
        include: PATHS.app
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: PATHS.app
      }
    ]
  }
};

var devConfig = {
  devServer: {
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    colors: true,
    watchPoll: true,

    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devTool: 'eval-source-map'
};

var prodConfig = {};

module.exports = function(env) {
  switch(env) {
    case 'DEVELOPMENT':
      return merge(commonConfig, devConfig);
    case 'PRODUCTION':
      return merge(commonConfig, prodConfig);
    default:
      return commonConfig;
  }
};