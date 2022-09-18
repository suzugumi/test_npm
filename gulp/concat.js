(function() {
    'use strict';
    // js/cssを全て１つにまとめる distファイルへ。
    const gulp = require('gulp');
    const concat = require('gulp-concat');
    const changed = require('gulp-changed');


    gulp.task('concat_js', () => {
        let TARGET = './gulp/*.js';
        let RESULT_NAME = 'script2.js'
        let LOCATION = './dist';
        gulp.src([TARGET])
            .pipe(changed(LOCATION))
            .pipe(concat(RESULT_NAME))
            .pipe(gulp.dest(LOCATION))

    });
    // !マークをつかうと対象外にできる
}());

(function() {
    'use strict';
    // js/cssを全て１つにまとめる
    const gulp = require('gulp');
    const concat = require('gulp-concat');
    const changed = require('gulp-changed');

    gulp.task('concat_css', () => {
        let TARGET = './style/css/*.css';
        let RESULT_NAME = 'script4.css'
        let LOCATION = './dist';

        gulp.src([TARGET])
            .pipe(changed(LOCATION))
            .pipe(concat(RESULT_NAME))
            .pipe(gulp.dest(LOCATION))

    });
    // !マークをつかうと対象外にできる
}());