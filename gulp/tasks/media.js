export const media = () => {
	return app.gulp.src(app.path.src.media)
		.pipe(app.gulp.dest(app.path.build.media))
		.pipe(app.plugins.browserSync.stream());
}