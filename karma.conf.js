module.exports = function(config) {
	config.set({


		basePath: '.',
		logLevel: config.LOG_INFO,
		frameworks: ['systemjs', 'mocha', 'chai', 'chai-as-promised', 'sinon-chai', 'fixture'],

		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-chai-plugins',
			'karma-systemjs',
			'karma-fixture',
			'karma-html2js-preprocessor',
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-spec-reporter'
		],

		systemjs: {
			configFile: 'config.js',
			testFileSuffix: 'Spec.js',
			files: [
				'src/js/common/shims/marionette-shim.js',
				'vendor/**/**',
				'test/**/*',
				'test/**/*Spec.js',
				'src/js/**/*.*'
			],
			config: {
				baseURL: "/",
				paths: {
					'es6-module-loader': 'vendor/es6-module-loader.js',
					'systemjs': 'vendor/system.js',
					"github:*": "vendor/github/*.js",
					"npm:*": "vendor/npm/*.js",
					'app/*': 'src/js/app/*',
					'common/*': 'src/js/common/*',
					'modules/*': 'src/js/modules/*'
				}
			}
		},


		preprocessors: {
			'test/fixtures/**/*.html': ['html2js']
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


		browsers: ['PhantomJS'],
		reporters: ['spec'],


		singleRun: false,
		colors: true,
		files: [],
		exclude: []

	});
};
