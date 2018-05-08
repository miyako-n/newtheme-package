require('es6-promise').polyfill();

var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var wait = require('gulp-wait'); //発火時間をずらす
var plumber = require('gulp-plumber'); //エラーでwatchを止めないようにする

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pleeease = require('gulp-pleeease'); //sassの最適化

var imagemin = require('gulp-imagemin'); //画像を圧縮
var pngquant = require('imagemin-pngquant'); //画像最適化png
var mozjpeg = require('imagemin-mozjpeg'); //画像最適化jpg

var setting = require('./buildsettings.js'); //初期設定ファイル

//追加・更新のあったphpファイルをコピー
gulp.task('copyfile', function() {
  return gulp.src('src/**/*.php')
  .pipe(gulp.dest('../app/public/wp-content/themes/' + setting.themaFolder))
});

//Sass
gulp.task('sass', function() {
  gulp.src('src/**/*.sass')
  .pipe(wait(500))
  .pipe(plumber())
  .pipe(sass())
  .pipe(pleeease({
    'minifire': true
  }))
  .pipe(gulp.dest('../app/public/wp-content/themes/' + setting.themaFolder))
});

//ImageMin：画像の圧縮と最適化
gulp.task('imageMin', function() {
  return gulp.src('./src/assets/img/**/*')
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
  .pipe(gulp.dest('../app/public/wp-content/themes/' + setting.themaFolder + '/assets/img/'))
});

//BrowserSync
gulp.task('browserSync',function() {
  browserSync.init({
    proxy: setting.themeDomein
  });
});

//ファイルの監視
gulp.task('watch', function(){
  gulp.watch('src/**/*.php', ['copyfile']);
  gulp.watch('src/**/*.sass', ['sass']);
  gulp.watch('src/**/img/**/*', ['imageMin']);
});

//Default
gulp.task('default',[
  'browserSync',
  'watch'
]);