module.exports = function(config) {
	config.set({

		basePath: '.',
		frameworks: ['systemjs', 'jasmine'],

		jspm: {
			config: 'system.config.js',
			packages: 'vendor/',
			loadFiles: [
				'test/unit/**/*Spec.js'
			],
			serveFiles: [
				'app/**/**'
			]
		},

		systemjs: {
			configFile: 'system.config.js',
			testFileSuffix: 'Spec.js',
			files: [
				'app/**/**',
				'test/unit/**/*Spec.js'
			],
			config: {
				paths: {
					'es6-module-loader': '/vendor/es6-module-loader.js',
					'systemjs': '/vendor/system.js'
				}
			}
		},


		plugins: [
			'karma-systemjs',
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-spec-reporter',
			'karma-babel-preprocessor'
		],

		preprocessors: {
			'test/unit/**/*.js': ['babel']
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

		browsers: ['Chrome'],
		reporters: ['spec'],

		singleRun: false,
		colors: true,

		files: [],
		exclude: [],

		logLevel: config.LOG_DEBUG
	});
};
