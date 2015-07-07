/**
 * @author    Jamie Hill
 */
'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import debug from 'gulp-debug';
import size from 'gulp-size';
import imagemin from 'gulp-imagemin';
import path from '../paths';
import {DEV} from '../const';

/**
 * Optimizes and copies images to the specified output folder
 *
 * @return {Stream}
 */
gulp.task('images', (cb) => {
	return gulp.src(path.app.images)
		.pipe(gulpif(DEV, debug({title: 'images:'})))
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.dist.images))
		.pipe(size({title: 'images'}));
});
