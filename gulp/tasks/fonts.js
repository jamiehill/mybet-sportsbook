/**
 * @author    Jamie Hill
 */
'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import debug from 'gulp-debug';
import size from 'gulp-size';
import flatten from 'gulp-flatten';
import path from '../paths';
import {DEV} from '../const';

/**
 * Copies all fonts to the output folder
 *
 * @return {Stream}
 */
gulp.task('fonts', (cb) => {
	return gulp.src(path.app.fonts)
		.pipe(gulpif(DEV, debug({title: 'fonts:'})))
		.pipe(flatten())
		.pipe(gulp.dest(path.build.dist.fonts))
		.pipe(size({title: 'fonts'}));
});
