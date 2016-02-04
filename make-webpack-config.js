const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkg = require('./package.json');

const PATHS = {
  app: path.join(__dirname, 'app'),
  index: path.join(__dirname, 'app', 'index.tsx'),
  build: path.join(__dirname, 'build')
};

var commonConfig = {
  entry: PATHS.index,
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
    loaders: [

      {
        test: /\.tsx?$/,
        loader: 'babel-loader!ts-loader',
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

var devConfig = {
  devServer: {
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
  module: {
    loaders: [
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
    new webpack.HotModuleReplacementPlugin()
  ],
  devTool: 'eval-source-map'
};

var prodConfig = {
  entry: {
    app: PATHS.index,
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
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
      'process.env.NODE_ENV': JSON.stringify('productions')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

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