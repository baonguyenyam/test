module.exports = function (gulp, $, browserSync) {
	let replace = require('gulp-replace');
    let fs = require('fs');
	gulp.task('inline', function () {

		return gulp.src([
			'./dist/*.html',
		])
		.pipe(replace(/<link rel="stylesheet" href="(.*?)"[^>]*>/g, function(s, filename) {
			var style = fs.readFileSync(filename, 'utf8');
			return '<style>\n' + style + '\n</style>';
		}))
		.pipe(replace(/<script src="(.*?)"[^>]*><\/script>/g, function(s, filename) {
			var script = fs.readFileSync(filename, 'utf8');
			return '<script>\n' + script + '\n</script>';
		}))
		.pipe(gulp.dest('./dist'));
	});
};
