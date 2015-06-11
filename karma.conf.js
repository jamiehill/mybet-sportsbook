module.exports = function(config) {
	config.set({


		basePath: '.',
		frameworks: ['systemjs', 'jasmine', 'fixture'],
		logLevel: config.LOG_INFO,


		systemjs: {
			configFile: 'system.config.js',
			testFileSuffix: 'Spec.js',
			files: [
				'marionette-shim.js',
				'vendor/**/**',
				'test/spec/**/*Spec.js',
				'test/spec/fixtures/**/*',
				'app/**/*.*'
			],
			config: {
				paths: {
					'es6-module-loader': '/vendor/es6-module-loader.js',
					'systemjs': '/vendor/system.js'
				}
			}
		},


		preprocessors: {
			'test/unit/**/*.js': ['babel'],
			'app/**/*.js': ['babel'],
			'test/unit/fixtures/**/*.html': ['html2js']
		},


		'babelPreprocessor': {
			options: {
				sourceMap: 'inline',
				modules: 'system'
			}
		},


		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},


		plugins: [
			'karma-systemjs',
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-spec-reporter',
			'karma-babel-preprocessor',
			'karma-html2js-preprocessor',
			'karma-fixture'
		],


		browsers: ['PhantomJS'],
		reporters: ['spec'],


		singleRun: false,
		colors: true,
		files: [],
		exclude: []

	});
};
