'use strict';
// Gọi thư viện sử dụng vào
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ lazy: true });
var browserSync = require('browser-sync').create();
var taskPath = './tasks/';
var taskList = require('fs').readdirSync(taskPath);
// Load tất cả các task
taskList.forEach(function (taskFile) {
    require(taskPath + taskFile)(gulp, plugins, browserSync);
});

// Lệnh mặc định của Gulp
gulp.task('default', gulp.series(
		'clean',
		// 'copy',
		// 'copy-css',
		'copy-img',
		'copy-fonts',
		'copy-webfonts',
		// 'copy-favicon',
		'concat-css',
		'concat-js',
		'tao-sass',
		'tao-js',
		'tao-html',
		// 'inline',
		// 'inline-css',
		'watch',
		'browser-sync',
		function (done) {
			done();
		})
);
gulp.task('build', gulp.series(
		'clean',
		// 'copy',
		// 'copy-css',
		'copy-img',
		'copy-fonts',
		'copy-webfonts',
		// 'copy-favicon',
		'concat-css',
		'concat-js',
		'tao-sass',
		'tao-js',
		'tao-html',
		// Xử lý Production
		'html-min',
		'css-min',
		'js-min',
		'autoprefixer',
		// 'inline',
		// 'inline-css',
		'browser-sync',
		function (done) {
			done();
		})
);
