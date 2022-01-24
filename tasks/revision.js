module.exports = function (gulp, $, browserSync) {
	let rev = require('gulp-rev');
	let revReplace = require('gulp-rev-replace');
	gulp.task('revision', function () {
		return gulp.src([
				'./dist/**/*.css',
				'./dist/**/*.js',
			])
			.pipe(rev())
			.pipe(gulp.dest('./dist'))
			.pipe(rev.manifest())
			.pipe(gulp.dest('./dist'))
	});

	gulp.task("revreplace", function() {
		var manifest = gulp.src("./dist/rev-manifest.json");
		return gulp.src([
			'./dist/*.html',
		])
			.pipe(revReplace({manifest: manifest}))
			.pipe(gulp.dest('./dist'))
	});

};


