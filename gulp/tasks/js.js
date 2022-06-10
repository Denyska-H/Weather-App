import webpack from "webpack-stream";
import sourcemaps from "gulp-sourcemaps";

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			output: {
				filename: 'script.min.js',
			}
		}))
		.pipe(sourcemaps.write())
		.pipe(app.gulp.dest(app.path.build.js))	
		.pipe(app.plugins.browserSync.stream());
}