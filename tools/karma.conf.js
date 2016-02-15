const webpack = require('webpack');

module.exports = function karmaConfig(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'mocha'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-spec-reporter',
      'karma-coverage',
      'sinon-chai',
    ],

    // list of files / patterns to load in the browser
    files: [ // :off
      '../node_modules/phantomjs-polyfill/bind-polyfill.js',
      '../test/main.js',
    ], // :on

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: { // :off
      '../test/main.js': ['webpack', 'sourcemap'],
    }, // :on

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    coverageReporter: { // :off
      dir: '../build/test/coverage/',
      type: 'html',
    }, // :on

    webpack: {
      devtool: 'inline-source-map',

      module: {
        preLoaders: [
          {
            test: /\.jsx?$/, loaders: ['isparta-instrumenter'], include: '../src',
          },
        ],

        loaders: [

          {
            exclude: /node_modules/, loader: 'babel?cacheDirectory', test: /\.jsx?$/,
          },

        ],
      },

      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
      },

      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"',

          __DEV__: false,

        }),
      ],
    },

    webpackMiddleware: {
      noInfo: true,
    },

  });
};
