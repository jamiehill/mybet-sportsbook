/**
 * @author    Jamie Hill
 */
'use strict';

import _ from 'underscore';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import steal from 'gulp-steal';
import debug from 'gulp-debug';
import babel from 'gulp-babel';
import jshint from 'gulp-jshint';
import preprocess from 'gulp-preprocess';
import path from '../paths';
import Builder from 'systemjs-builder';
import {VERSION, DEV, SFX} from '../const';

/**
 * The 'jshint' task defines the rules of our hinter as well as which files
 * we should check. It helps to detect errors and potential problems in our
 * JavaScript code.
 *
 * @return {Stream}
 */
gulp.task('jshint', (cb) => {
	return gulp.src(path.app.scripts.concat(path.gulpfile))
		.pipe(jshint(`${path.root}/.jshintrc`))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});

// TODO: (martin) remove this task once problem with conditional import for systemjs-builder will be fixed
gulp.task('js-preprocess', (cb) => {
	return gulp.src(path.app.scripts.concat([path.app.templates, path.app.json]))
		.pipe(preprocess())
		.pipe(gulp.dest(path.tmp.scripts + 'app'));
});


/**
 * compile all ES6 modules to ES5 and register modules via SystemJS
 */
gulp.task('transpile', function () {
	return gulp.src(path.app.scripts)
		.pipe(gulpif(DEV, debug({title: 'transpile:'})))
		.pipe(babel({modules: 'system'}))
		.pipe(gulp.dest(path.build.dist.scripts));
});


gulp.task('steal', function() {
	return gulp.src(path.app.scripts)
		.pipe(gulpif(DEV, debug({title: 'steal:'})))
		.pipe(steal({config: path.stealConf}))
		.pipe(gulp.dest(path.build.dist.scripts));
})


/**
 * Create JS production bundle.
 *
 * @param {Function} done - callback when complete
 */
gulp.task('bundle', ['transpile'], (cb) => {
	const version = _.isEmpty(VERSION) ? '' : '-'+VERSION;
	const min = !DEV ? '.min' : '';
    //
    const builder = new Builder();
    const inputPath = path.app.baseJsPath+'app/App.js';
    const outputFile = path.build.dist.output+version+min+'.js';

    const method = SFX ? 'buildSFX' : 'build';
    return builder.loadConfig(path.jspmConf)
		.then(function() {
			builder.build(inputPath, outputFile,
				{ minify: !DEV, mangle: !DEV, sourceMaps: true, lowResSourceMaps: true }
			);

			//builder.build('app/js/app/**/* - [app/js/app/**/*]', 'build/dist/js/common.js', { minify: true, sourceMaps: true })
		});


	//const builder = new Builder();
	//builder.loadConfig('../../config.js')
    //
    //.then(function() {
		//builder.build('app/js/app/view/footer/**/* - [app/js/app/view/footer/**/*]', 'build/dist/js/common.js', { minify: true, sourceMaps: true })
	//})


	//const builder = new Builder();

	//return builder.loadConfig(path.jspmConf)
	//	.then(function() {
	//		builder.buildSFX(inputPath, outputFile,
	//			{ minify: !DEV, mangle: !DEV, sourceMaps: true, lowResSourceMaps: true }
	//		);
	//	});


	//builder.buildSFX('../app/js/app/App.js', 'build/dist/js/main.js').then(function() {
	//	console.log('Build complete');
	//})
	//.catch(function(err) {
	//	console.log('Build error');
	//	console.log(err);
	//});
});
