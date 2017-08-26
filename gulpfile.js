'use strict';

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var autopolyfiller = require('gulp-autopolyfiller');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pump = require('pump');
var del = require('del');
var run = require('run-sequence');

gulp.task('style', function() {
  gulp.src('css/style.css')
      .pipe(plumber())
      .pipe(postcss([
        autoprefixer({browsers: [
            'last 2 versions'
        ]})
      ]))
      .pipe(gulp.dest('css'))
      .pipe(gulp.dest('build/css'))
      .pipe(minify())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('build/css'));
});

gulp.task('minify', function() {
  return gulp.src('*.html')
      .pipe(htmlmin({
        collapseWhitespace: true
      }))
      .pipe(gulp.dest('build'));
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('js/*.js'),
        uglify(),
        gulp.dest('build/js')
      ],
      cb
  );
});

gulp.task('images', function() {
  return gulp.src(['img/**/*.{png,jpg,gif}', '!img/svg/**/*'])
      .pipe(imagemin([
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.jpegtran({progressive: true})
          ]))
      .pipe(gulp.dest('build/img'));
});

gulp.task('svgmin', function() {
  return gulp.src('img/svg/*.svg')
      .pipe(svgmin())
      .pipe(gulp.dest('build/img/svg'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('build', function(fn) {
  run('clean',
      [
        'minify',
        'style',
        'images',
        'compress',
        'svgmin',
      ],
      fn);
});