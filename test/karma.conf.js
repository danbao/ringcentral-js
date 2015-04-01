var path = require('path');

module.exports = function(config) {

    config.set({

        basePath: '../',

        frameworks: [
            'mocha',
            'cajon',
            'chai',
            'sinon-chai'
        ],

        files: [
            // specify but not include files
            {pattern: './build/**/*.js', included: false},
            {pattern: './test/**/*.js', included: false},
            {pattern: './lib/**/*.js', included: false},
            {pattern: './bower_components/crypto-js/**/*.js', included: false},
            {pattern: './bower_components/pubnub/web/*.*', included: false},
            {pattern: './bower_components/es6-promise-polyfill/*.*', included: false},
            // include files
            {pattern: './lib/requirejs-config.js', included: true},
            {pattern: './test/karma.js', included: true}
        ],

        exclude: [
            './lib/requirejs-wrap.js'
        ],

        reporters: [
            //'html',
            'coverage',
            'mocha'
        ],

        htmlReporter: {
            outputDir: './build/karma'
        },

        coverageReporter: {
            type: 'lcov',
            dir: './build/karma'
        },

        logLevel: config.LOG_ERROR, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG

        preprocessors: {
            './lib/browser.js': ['coverage'],
            './lib/RCSDK.js': ['coverage'],
            './lib/*/**/!(*spec).js': ['coverage']
        },

        browsers: [
            //'Chrome',
            'PhantomJS'
        ],

        plugins: [
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-html-reporter',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-cajon',
            'karma-chai-plugins'
        ],

        singleRun: true,
        captureTimeout: 5000,
        browserNoActivityTimeout: 5000,
        requireJsShowNoTimestampsError: false

    });

};
