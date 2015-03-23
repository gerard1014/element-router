var gulp = require('gulp');
var less = require('gulp-less-sourcemap');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

gulp.task('watch', function() {
    gulp.watch('src/**', ['default']);
});

gulp.task('default', function() {

  var jsStream = gulp.src(['src/ngModel.js','src/*.js'])
    .pipe(plumber())
    .pipe(concat('ngFileModel.js'))
    .pipe(gulp.dest('dist'));

  var minJsStream = jsStream
    .pipe(uglify('ngFileModel.min.js', { outSourceMap: true }))
    .pipe(gulp.dest('dist'));

  var lessStream = gulp.src('src/main.less')
    .pipe(plumber())
    .pipe(rename('ngFileModel.less'))
    .pipe(gulp.dest('dist'));

  var cssStream = lessStream
    .pipe(less({ sourceMap: { sourceMapFileInline: false } }))
    .pipe(gulp.dest('dist'));

    //move streams to demo folder
    jsStream.pipe(gulp.dest('demo/js/vendor/ngFileModel'));
    minJsStream.pipe(gulp.dest('demo/js/vendor/ngFileModel'));

    lessStream.pipe(gulp.dest('demo/css/vendor/ngFileModel'));
    cssStream.pipe(gulp.dest('demo/css/vendor/ngFileModel'));

});
