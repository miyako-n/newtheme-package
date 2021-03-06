require('es6-promise').polyfill(); //autoprefixerに必要らしいのでとりあえず読み込んでいる

var gulp = require('gulp');

var runSequence = require('run-sequence'); //タスクの順番を並列・直列処理させる

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var wait = require('gulp-wait'); //発火時間をずらす
var plumber = require('gulp-plumber'); //エラーでwatchを止めないようにする

var sass = require('gulp-sass'); //sass
var autoprefixer = require('gulp-autoprefixer'); //ベンダープレフィックス
var pleeease = require('gulp-pleeease'); //sassの最適化

var uglify = require('gulp-uglify'); //js圧縮
var concat = require('gulp-concat'); //ファイルをまとめる

var imagemin = require('gulp-imagemin'); //画像を圧縮
var pngquant = require('imagemin-pngquant'); //画像最適化png
var mozjpeg = require('imagemin-mozjpeg'); //画像最適化jpg

var insert = require('gulp-insert'); //差し込むやつ
var setting = require('./buildsettings.js'); //初期設定ファイルの読み込み

//themeフォルダ用の署名雛形
var themeSign = ( '/*\n'
                + 'Theme Name: '
                + setting.themeName
                + '\nTheme URL: '
                + setting.themeURL
                + '\nAuthor: '
                + setting.themeAuthor
                + '\nVersion: '
                + setting.themeVersion
                + '\n*/\n\n' );
var langCode = '@charset "utf-8";\n\n';

//themeフォルダを初期化
gulp.task('clean',function(callback){
  return del(['../app/public/wp-content/themes/' + setting.themeFolder + '/*'], callback);
});

//phpファイルをコピー
gulp.task('copyfile', function() {
  return gulp.src('src/**/*.php')
  .pipe(gulp.dest('../app/public/wp-content/themes/' + setting.themeFolder))
});

//Sass
gulp.task('sass', function() {
  return gulp.src('src/assets/sass/**/*.{sass,scss}')
  .pipe(wait(500)) //連続更新するとsassがエラーを吐くので対策に入れている
  .pipe(plumber())
  .pipe(sass())
  .pipe(pleeease({
    autoprefixer: {
        browsers: ["last 4 versions", "> 1% in JP"]
      },
    sass: true,
    rem: false, //2系はバグがあるらしく設定しない方がいい
    minifier: false,
  }))
  .pipe(insert.prepend(themeSign + langCode))
  .pipe(gulp.dest('../app/public/wp-content/themes/' + setting.themeFolder))
  .pipe(browserSync.stream())
});

//js
gulp.task('js', function() {
  return gulp.src('src/assets/js/**/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('../app/public/wp-content/themes/' + setting.themeFolder + '/assets/js/'))
  .pipe(browserSync.stream())
});

//ImageMin：画像の圧縮と最適化
gulp.task('imageMin', function() {
  return gulp.src('src/assets/img/**/*')
  .pipe(plumber())
  .pipe(imagemin([
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
  .pipe(gulp.dest('../app/public/wp-content/themes/' + setting.themeFolder + '/assets/img/'))
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
  gulp.watch('src/**/*.{sass,scss}', ['sass']);
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/assets/img/**/*', ['imageMin']);
});

//Default
gulp.task('default', function() {
  runSequence(
   ['copyfile','sass','js','imageMin'],
  'browserSync',
  'watch'
  )
});