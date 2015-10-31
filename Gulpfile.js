var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var webpack = require('webpack-stream');
var webpack_config = require('./webpack.config.js');

gulp.task('clean', function () {
    return del([
        'dist/**/*.js*'
    ]);
});

gulp.task('build', function () {
    return gulp.src('./main/app.tsx')
        .pipe(webpack(webpack_config))
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
    return gulp.src('./node_modules/todomvc-app-css/index.css').pipe(gulp.dest('dist/css/'));
});

gulp.task('clean-build', function(callback) {
    runSequence('clean', 'build', callback);
});

gulp.task('default', ['clean-build', 'css']);
