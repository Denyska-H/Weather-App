import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleansCss from 'gulp-clean-css';
import autoPrefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import sourcemaps from "gulp-sourcemaps";

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, {
			sourcemaps: app.isDev
		})
		.pipe(app.plugins.replace(/@img\//g, "../img/"))
		.pipe(sass({
			outputStyle: "expanded",
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoPrefixer({
					grid: true,
					overrideBrowserslist: ["last 3 versions"],
					cascade: true
				})
			)
		)
		// Dirty CSS
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleansCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(sourcemaps.write())
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browserSync.stream());
}