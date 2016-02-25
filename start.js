global.watch = true;

const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const bundler = webpack(webpackConfig);

browserSync({
  server: {
    baseDir: 'src',

    middleware: [
      webpackDevMiddleware(bundler, { // :off
        publicPath: webpackConfig.output.publicPath,
        stats: webpackConfig.stats,
        noInfo: webpackConfig.noInfo,
      }), // :on

      webpackHotMiddleware(bundler),
    ],
  },

  files: ['src/*.html'],

  open: false,
});
