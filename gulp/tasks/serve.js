/**
 * @author    Jamie Hill
 */
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import path from '../paths';


function startBrowserSync(baseDir, files, browser) {
	browserSync({
		files: files || 'default',
		open: true,
		port: 8000,
		notify: false,
		browser: browser || 'default',
		server: {
			baseDir: baseDir
		}
	});
}


gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: path.build.dist.basePath
		}
	});
});
