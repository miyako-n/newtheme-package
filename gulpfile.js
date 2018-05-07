require('es6-promise').polyfill();

var base = require('buildsettings.js');
var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-mozjpeg');
var mozjpeg = require('imagemin-mozjpeg');

//Publish
gulp.task('publish', function() {
  return gulp.src(./)
  .pipe(gulp.dest('../app/public/wp-content/themes/' + base.themaFolder))
});

//Sass
gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.sass')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('../app/public/wp-content/themes/newtheme'))
});

//ImageMin
gulp.task('imageMin', function() {
  return gulp.src('./assets/images/**/*')
  .pipe(imageMin([
    pngquant({
      quality: '65-80',
      speed: 1,
      floyd: 0
    }),
    mozjpeg({
      quality: 85,
      progressive: true
    }),
    imagemin.svgo(),
    imagemin.optipng(),
    imagemin.gifsicle()
  ]))
  .pipe(gulp.dest('../app/public/wp-content/themes/newtheme')) //保存場所
});

//BrowserSync
gulp.task('watch',function() {
  browserSync.init({
    proxy: 'http://newtheme.test'
  });
});

//Default
gulp.task('default',[
  'publish',
  'sass',
  'watch'
]);