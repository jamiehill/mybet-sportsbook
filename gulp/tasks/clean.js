/**
 * @author    Jamie Hill
 */
'use strict';

import gulp from 'gulp';
import debug from 'gulp-debug';
import del from 'del';
import path from '../paths';
import {LOG, COLOURS} from '../const';

/**
 * The 'clean' task delete 'build' and '.tmp' directories.
 *
 * @param {Function} cb - callback when complete
 */
gulp.task('clean', (cb) => {
	const files = [].concat(path.build.basePath, path.tmp.basePath);
	LOG('Cleaning: ' + COLOURS.blue(files));
	del(files, {force: true}, cb);
});
