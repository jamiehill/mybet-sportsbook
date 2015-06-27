module.exports = function(config) {
	config.set({


		basePath: '.',
		logLevel: config.LOG_INFO,
		frameworks: ['systemjs', 'mocha'],

		plugins: [
			'karma-mocha',
			'karma-systemjs',
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-spec-reporter'
		],

		systemjs: {
			configFile: 'config.js',
			testFileSuffix: 'Spec.js',
			files: [
				'test/setupSpec.js',
				'vendor/**/**',
				'test/lib/**/*',
				'test/spec/**/*.js',
				'app/js/**/*.*',
				'modules/**/*'
			],
			config: {
				baseURL: "/",
				defaultJSExtensions: true,
				paths: {
					'es6-module-loader': 'vendor/es6-module-loader.js',
					'systemjs': 'vendor/system.js',
					"github:*": "vendor/github/*.js",
					"npm:*": "vendor/npm/*.js",
					'core*': 'modules/core-module/src/js/core*.js',
					'highlights*': 'modules/highlights-module/src/js/highlights*'
				},

				"meta": {
					"github:marionettejs/backbone.marionette@2.4.1/lib/core/backbone.marionette": {
						"format": "amd",
						"deps": [ "modules/core-module/src/js/core/system/shims/marionette-shim" ]
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


		browsers: ['Chrome'],
		reporters: ['spec'],


		singleRun: false,
		colors: true,
		files: [],
		exclude: []

	});
};
