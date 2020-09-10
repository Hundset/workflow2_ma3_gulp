const gulp = require('gulp');
const cache = require('gulp-cache');
const src = require('gulp');
const imagemin = require('gulp-imagemin');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();

function minify() {
    return gulp.src('./media/*')
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('./minimedia'));
}

function compileLess() {
    return gulp.src('./less/**/*.less')
        .pipe(less())
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        }
    });
    
    gulp.watch('./media/**', minify)
    gulp.watch('./less/**/*.less', compileLess)
    gulp.watch('./*.html').on('change', browserSync.reload)
}

exports.watch = watch;