/**
 * @author    Jamie Hill
 */
'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import debug from 'gulp-debug';
import htmlhint from 'gulp-htmlhint';
import path from '../paths';
import {DEV} from '../const';

/**
 * Hints at potential problems across all of our HTML files
 *
 * @return {Stream}
 */
gulp.task('htmlhint', (cb) => {
	return gulp.src([path.app.html])
		.pipe(gulpif(DEV, debug({title: 'html:'})))
		.pipe(htmlhint({htmlhintrc: path.htmlhintrc}))
		.pipe(htmlhint.reporter())
		.pipe(htmlhint.failReporter())
		//.on('end', cb)
});
