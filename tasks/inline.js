module.exports = function (gulp, $, browserSync) {
	let inlineCss = require('gulp-inline-css');
	gulp.task('inline-css', function () {

		return gulp.src([
			'./dist/*.html',
		])
		.pipe(inlineCss({
			applyStyleTags: true,
			applyLinkTags: true,
			removeStyleTags: true,
			removeLinkTags: true
	}))
		.pipe(gulp.dest('./dist'));
	});
};
