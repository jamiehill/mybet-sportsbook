/**
 * @author    Jamie Hill
 */
'use strict';

import path from 'path';

const root = path.dirname(__dirname);
const paths = {
	root: root,

	/**
	 * NB // to use es6 string tokens, you must use ` not '.
	 */

	/**
	 * Application specific files
	 */
	systemJs:	  `${root}/vendor/system.js`,
	moduleLoader: `${root}/vendor/es6-module-loader.js`,
	gulpfile:     [`${root}/gulpfile.js`, `${root}/gulp/**/*.js`],
	jspmConf:     `${root}/config.js`,
	stealConf:     `${root}/steal.config.js`,
	htmlhintrc:   `${root}/.htmlhintrc`,
	jshintrc:     `${root}/.jshintrc`,

	/**
	 * Extension modifiers. For exmaple, when using sass, use .scss instead
	 */
	extensions: {
		styles: ".scss"
	},

	/**
	 * All file patterns associated with the application
	 */
	app: {
		basePath:       `${root}/app/`,
		baseJsPath:     `${root}/app/js/`,
		fonts:          [`${root}/app/fonts/**/*.{eot,svg,ttf,woff,woff2}`, `${root}/vendor/**/*.{eot,svg,ttf,woff,woff2}`],
		styles:         `${root}/app/styles/**/*.scss`,
		images:         `${root}/app/images/**/*.{png,gif,jpg,jpeg}`,
		config: {
			dev:        `${root}/src/app/core/config/core.config.dev.js`,
			test:       `${root}/src/app/core/config/core.config.test.js`,
			prod:       `${root}/src/app/core/config/core.config.prod.js`
		},
		scripts:        [`${root}/app/js/**/*.js`],
		html:           `${root}/app/index.html`,
		templates:      `${root}/app/js/**/*.html`,
		json:           `${root}/app/js/**/*.json`
	},

	/**
	 * The tmp folder is where all transpiled js, html templates
	 * and other pre-processed files, are staged before being bundled
	 * accordingly, into the final distribution output folder. (dist)
	 */
	tmp: {
		basePath:       `${root}/_tmp/`,
		styles:         `${root}/_tmp/styles/`,
		scripts:        `${root}/_tmp/js/`
	},

	/**
	 * The 'build' folder is where our app resides once it's
	 * completely built.
	 */
	build: {
		basePath:       `${root}/build/`,
		dist: {
			basePath:   `${root}/build/dist/`,
			output:     `${root}/build/dist/js/app`,
			fonts:      `${root}/build/dist/fonts/`,
			images:     `${root}/build/dist/images/`,
			styles:     `${root}/build/dist/css/`,
			scripts:    `${root}/build/dist/js/`,
			maps:    	`../maps/`
		},
		docs:           `${root}/build/docs/`
	}
};

export default paths;
