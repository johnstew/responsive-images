'use strict';

var gulp     = require('gulp');
var sass     = require('gulp-sass');
var connect  = require('gulp-connect');
var watch    = require('gulp-watch');
var batch    = require('gulp-batch');

var config = {
	dev: {
		sass: 'public/sass/**/*.scss'
	},
	prod: {
		css: './public/css',
    html: './public/'
	}
};

gulp.task('connect', function(){
  connect.server({
    root: config.prod.html,
    livereload: true
  });
});

gulp.task('html', function(){
  gulp.src(config.prod.html+'*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function(){
  gulp.src(config.dev.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.prod.css));
});
 
gulp.task('watch', function(){
  watch(config.dev.sass, batch(function (events, done) {
    gulp.start('sass', done);
  }));  
  watch([config.prod.html+'*.html',config.prod.css+'/main.css'], batch(function (events, done) {
    gulp.start('html', done);
  }));
});

gulp.task('default', ['sass','connect','watch']);