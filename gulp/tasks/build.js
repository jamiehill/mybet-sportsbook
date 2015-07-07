/**
 * @author    Jamie Hill
 */
'use strict';

import _ from 'underscore';
import rev from 'gulp-rev';
import gulp from 'gulp';
import util from 'gulp-util';
import size from 'gulp-size';
import replace from 'gulp-html-replace';
import debug from 'gulp-debug';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import usemin from 'gulp-usemin';
import inject from 'gulp-inject';
import cdnizer from 'gulp-cdnizer';
import bytediff from 'gulp-bytediff';
import minifyHtml from 'gulp-minify-html';
import runSequence from 'run-sequence';
import async from 'async';
import path from '../paths';
import {VERSION, BANNER, CDN_URL, ENV, DEV, LOG, COLOURS, HAS_CDN, SFX} from '../const';


if(!ENV.match(new RegExp(/prod|dev|test/i))) {
	LOG(COLOURS.red(`Error: The argument 'env' has incorrect value ${ENV}! Usage: --env=(DEV|TEST|PROD)`));
	process.exit(1);
}

LOG("Environment: "+COLOURS.red(ENV));
LOG("PackageType: "+COLOURS.red(SFX ? 'SFX' : 'Bundle'));


/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted perentage
 */
function formatPercent(num, precision){
	return (num * 100).toFixed(precision);
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
	const difference = (data.savings > 0) ? ' smaller.' : ' larger.';
	return COLOURS.yellow(data.fileName + ' went from ' +
		(data.startSize / 1000).toFixed(2) + ' kB to ' +
		(data.endSize / 1000).toFixed(2) + ' kB and is ' +
		formatPercent(1 - data.percent, 2) + '%' + difference);
}

/* -------------------------------------------- */


/**
 * Updates index.html with eth correct css/js tags
 *
 *  @return {Stream}
 */
gulp.task('index', ['htmlhint', 'sass', 'bundle'], (cb) => {
	// add versioning or not
	const useVersion = !_.isEmpty(VERSION);
	const version = useVersion ? '-'+VERSION : '';
	// add minification extension or not
	const min = !DEV ? '.min' : '';

	var scripts = ['<script src="js/build'+version+min+'.js"></script>'];
	if (!SFX) {
		scripts.unshift('<script src="js/config.js"></script>');
		scripts.unshift('<script src="js/system.js"></script>');
		scripts.unshift('<script src="js/es6-module-loader.js"></script>');
	}

	return gulp.src(path.app.html)
		.pipe(gulpif(DEV, debug({title: 'compile:'})))
		.pipe(replace({
			'js':  scripts.join('\n'),
			'css': '<link rel="stylesheet" type="text/css" href="css/styles'+version+min+'.css"/>'
		}))
		.pipe(gulp.dest(path.build.dist.basePath))
});


/**
 * The 'copy' task just copies files from A to B. We use it here
 * to copy our files that haven't been copied by other tasks
 * e.g. (favicon, etc.) into the `build/dist` directory.
 *
 * @return {Stream}
 */
gulp.task('extras', (cb) => {
	return gulp.src([path.app.basePath + '*.{ico,png,txt}'])
		.pipe(gulpif(DEV, debug({title: 'extras:'})))
		.pipe(gulp.dest(path.build.dist.basePath))
});


/*

 'es6-module-loader': 'vendor/es6-module-loader.js',
 'systemjs': 'vendor/system.js',

 */

/**
 * Copy SystemJS to js folder
 *
 * @return {Stream}
 */
gulp.task('systemJs', (cb) => {
	var files = [
		path.systemJs,
		path.moduleLoader,
		path.jspmConf
	];
	return gulp.src(files)
		.pipe(gulpif(DEV, debug({title: 'vendor:'})))
		.pipe(gulp.dest(path.build.dist.scripts))
});


/**
 * The 'build' task gets app ready for deployment by processing files
 * and put them into directory ready for production.
 *
 * @param {Function} done - callback when complete
 */
gulp.task('default', (cb) => {
	var parallel = ['index', 'extras', 'images', 'fonts'];
	//if (!SFX) parallel.push('systemJs');
	runSequence('clean', parallel, cb);
});
