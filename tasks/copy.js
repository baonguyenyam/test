module.exports = function (gulp, $, browserSync) {
	gulp.task('copy', function () {
		return gulp.src([
				'./src/data/**.*',
			])
			.pipe(gulp.dest('./dist/data'));
	});
	gulp.task('copy-css', function () {
		return gulp.src([
				'./src/css/**.*',
			])
			.pipe(gulp.dest('./dist/css'));
	});
};
