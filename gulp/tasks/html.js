import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(fileInclude())
		.pipe(app.plugins.replace(/@img\//g, "img/"))
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browserSync.stream())
}