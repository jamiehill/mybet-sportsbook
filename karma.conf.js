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
				//'src/js/common/shims/marionette-shim.js',
				'vendor/**/**',
				'vendor/github/*',
				'vendor/npm/*',
				//'vendor/github/components/jquery@2.1.4/*',
				//'vendor/github/floatdrop/plugin-jsx@1.1.0/*',
				//'vendor/github/marionettejs/backbone.marionette@2.4.1/lib/*',
				//'vendor/github/systemjs/plugin-json@0.1.0/*',
				//'vendor/github/systemjs/plugin-text@0.0.2/*',
				//'vendor/npm/babel-core@5.5.6/*',
				//'vendor/npm/backbone@1.1.2/*',
				//'vendor/npm/di-lite@0.3.3/*',
				//'vendor/npm/lodash@3.9.3/*',
				//'vendor/npm/react@0.14.0-alpha3/*',
				'test/**/*',
				'test/**/*Spec.js',
				'src/js/**/*.*'
			],
			config: {
				baseURL: "/",
				paths: {
					//'src/js/common/shims/marionette-shim': 'src/js/common/shims/marionette-shim.js',
					'es6-module-loader': 'vendor/es6-module-loader.js',
					'systemjs': 'vendor/system.js',
					"github:*": "vendor/github/*.js",
					"npm:*": "vendor/npm/*.js",
					'app*': 'src/js/app*',
					'common*': 'src/js/common*',
					'modules*': 'src/js/modules*'
				},
				"meta": {
					"github:marionettejs/backbone.marionette@2.4.1/lib/core/backbone.marionette": {
						"format": "amd",
						"deps": [ "src/js/common/shims/marionette-shim" ]
					},
					"github:carhartl/jquery-cookie@1.4.1": {
						"deps": [ "jquery" ]
					},
					"npm:underscore.string@^3.1.1": {
						"deps": [ "underscore" ]
					},
					"di-lite": {
						"format": [ "global" ]
					}
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
