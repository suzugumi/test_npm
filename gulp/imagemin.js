(function() {
    'use strict';
    const gulp = require('gulp');
    const rename = require("gulp-rename");
    const changed = require('gulp-changed');
    const image_imagemin = require("gulp-imagemin");
    const imagemin_jpg = require('imagemin-jpeg-recompress');
    const imagemin_gif = require('imagemin-gifsicle');
    const imagemin_png = require("imagemin-pngquant");
    const imagemin_svg = require("gulp-svgmin");


    gulp.task('img', () => {

        let TARGET = './images/food0.jpg';
        let LOCATION = './dist';
        gulp.src(TARGET)
            .pipe(image_imagemin(
                [imagemin_png({
                    quality: '65-80',
                    speed: 1,
                    floyd: 0
                })]
            ))
            .pipe(image_imagemin(
                [imagemin_jpg({
                    quality: '65-80',
                    speed: 1,
                    floyd: 0
                })]
            ))

        .pipe(rename((path) => {
                path.basename += '.min';
            }))
            .pipe(gulp.dest(LOCATION))
    });




}());