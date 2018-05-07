require('es6-promise').polyfill();

var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

//Sass
gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.sass')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('./'))
});

//BrowserSync
gulp.task('watch',function() {
  browserSync.init({
    proxy: 'http://newtheme.test'
  });
});

//Default
gulp.task('default',['sass','watch']);