import replace from "gulp-replace"; // Replacer
import browserSync from "browser-sync"; // Live server
import newer from "gulp-newer"; // Checking for updates
import ifPlugin from "gulp-if"; // if

export const plugins = {
	replace: replace,
	browserSync: browserSync,
	newer: newer,
	if: ifPlugin,
}