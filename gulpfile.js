var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ camelize: true, lazy: false });
var Builder = require('systemjs-builder');
var path = require('path');
var del = require('del');
var _ = require('underscore');
var async = require('async');


/* ----------------------------------------- */


var PROD    = $.util.env.type === 'production',
	VERSION = $.util.env.build;


/* ----------------------------------------- */


gulp.task('default', function (cb) {
	chain.apply(null, [clean, systemjs, index]);
});


/* ----------------------------------------- */


/**
 * Cleans the specified location and/or file/s
 * @param string path path to folder/files to clean
 * @param function cb async sequencial callback method
 */
function clean(cb) {
	$.util.log('Cleaning: ' + $.util.colors.blue('./dist'));
	del(['./dist/**'], function() {
		copy('./app/index.html', './dist', cb);
	});
}


/**
 * Copy files to somewhere else
 * @param src
 * @param dest
 * @param options
 */
function copy(src, dest, cb, newName) {
	$.util.log('Copying: ' + $.util.colors.blue(path.resolve(src)) +' to '+$.util.colors.blue(path.resolve(dest)));
	gulp.src(src)
		.pipe($.if(!_.isEmpty(newName), $.rename(newName)))
		.pipe(gulp.dest(dest))

		.on('end', cb)
		.on('error', $.util.log);
}


/**
 * @param cb
 * @returns {Promise.<T>}
 */
function systemjs(cb) {
	var builder = new Builder();
	return builder.loadConfig('./config-gulp.js')
		.then(function(){
			//builder.buildSFX('./app/js/app/App', 'dist/js/app.js', { minify: PROD, sourceMaps: !PROD, DEBUG: true })
			//	.then(function(){
			//		cb();
			//	});

			//builder.build('app/js/app/view/footer/**/* - [app/js/app/view/footer/**/*]', 'build/dist/js/common.js', { minify: true, sourceMaps: true })

			Promise.all([
				builder.trace('app/**/*'),
				builder.trace('../../modules/core-module/**/*')
			])
			.then(function(trees) {
				var appMinusSub2 = builder.subtractTrees(trees[0], trees[1]);
				return Promise.all([
					//builder.buildTree(builder.subtractTrees(appMinusSub2, trees[2]), 'dist/js/app.js'),
					builder.buildTree(trees[0], 'dist/js/app.js'),
					builder.buildTree(trees[1], 'dist/js/core-module.js')
				]);
			})
		})
};


/**
 * Constructs index.html, injecting production version app.js
 * @param function cb async sequencial callback method
 */
function index(cb) {
	gulp.src('./dist/index.html')
		.pipe($.htmlReplace({
			'import':  '<script src="js/app.js"></script>',
			'js':  ''
		}))
		.pipe(gulp.dest('./dist'))

		.on('end', cb)
		.on('error', $.util.log);
}


/* ----------------------------------------- */

function chain() {
	var tasks = Array.prototype.slice.call(arguments);
	async.eachSeries(tasks, invoke);
}


function invoke(func, cb) {
	var name = func.name.charAt(0).toUpperCase() + func.name.slice(1);
	$.util.log('Invoke: ' + $.util.colors.red(name + ' -------------------'));

	if (!_.isFunction(cb)) return;
	func.apply(this, [cb]);
}
