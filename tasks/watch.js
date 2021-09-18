module.exports = function (gulp, $, browserSync) {
	gulp.task('watch', function (done) {
		gulp.watch('./src/styles/**/*.sass', gulp.series('tao-sass'));
		gulp.watch('./src/styles/**/*.scss', gulp.series('tao-sass'));
		gulp.watch('./src/img/**/*.*', gulp.series('copy-img'));
		gulp.watch('./src/**/*.html', gulp.series('copy'));
		gulp.watch('./src/templates/**/*.pug', gulp.series('tao-html'));
		gulp.watch('./src/scripts/**/*.js', gulp.series('tao-js'));
		gulp.watch("./dist/**/*.*").on('change', browserSync.reload);
		done();
	});
};
