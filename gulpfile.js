'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'), //concat
    uglify = require('gulp-uglify'), //minify
    rename = require('gulp-rename'), 
    sass = require('gulp-sass'), //gulp-sass
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    concatCss = require('gulp-concat-css');

gulp.task("concatScripts", function () { // concat scripts into main.js // *** gulp concatScripts
   return gulp.src([
            'js/jquery.bxslider.min.js',
            'js/jq1uery.js', 
            'js/sticky/jquery.sticky.js', 
            'js/main.js'
            ])
   .pipe(maps.init())
   .pipe(concat('app.js'))
   .pipe(maps.write('./'))
   .pipe(gulp.dest("js"));
});

gulp.task('concatCss', function () {
  return gulp.src('css/**/*.css')
    .pipe(concatCss("app.css"))
    .pipe(gulp.dest('css'));
});

gulp.task("minifyScripts", function () { // *** gulp minifyScripts
     return gulp.src("js/app.js") 
    .pipe(uglify()) 
    .pipe(rename('app.min.js')) // change directory name
    .pipe(gulp.dest("js"));
});

gulp.task('compileSass', function() { // *** gulp compileSass
    return gulp.src("scss/application.scss")
    .pipe(maps.init()) // source map to see scss code
    .pipe(sass()) 
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css')); 
});

gulp.task('watchFiles', function() {
    gulp.watch('scss/**/*.scss', ['compileSass']); 
//  gulp.watch('js/main.js', ['concatScripts']); 
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
	return gulp.src(["css/application.css", "js/app.min.js",'index.html',
	"img/**", "fonts/**"], {base: './'})
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', function() { // clear dir directory
    del('dist');
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
    gulp.start(["build"]); // clean then build dir
});

