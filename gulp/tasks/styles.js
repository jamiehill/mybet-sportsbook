/**
 * @author    Jamie Hill
 */
'use strict';

import _ from 'underscore';
import gulp from 'gulp';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import debug from 'gulp-debug';
import util from 'gulp-util';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import changed from 'gulp-changed';
import minifyCss from 'gulp-minify-css';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import path from '../paths';
import {VERSION, DEV} from '../const';

/**
 * Compile scss files into the styles.css
 *
 * @return {Stream}
 */
gulp.task('sass', (cb) => {
	// add versioning or not
	const useVersion = !_.isEmpty(VERSION);
	const version = useVersion ? '-'+VERSION : '';
	// add minification extension or not
	const min = !DEV ? '.min' : '';

	return gulp.src(path.app.styles)
		.pipe(gulpif(DEV, debug({title: path.extensions.styles+':'})))
		.pipe(gulpif(DEV, changed(path.build.dist.styles, {extension: path.extensions.styles})))
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: DEV ? 'expanded' : 'compressed', errLogToConsole: DEV}))
		.pipe(autoprefixer('last 2 version'))
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulpif(useVersion, rename('styles'+version+min+'.css')))
		.pipe(gulp.dest(path.build.dist.styles))
		.pipe(size({title: 'styles'}))
		.pipe(filter('**/*.css')) // Filtering stream to only css files
		.pipe(browserSync.reload({stream:true}));
});
