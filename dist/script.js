(function() {
    'use strict';
    // js/cssを全て１つにまとめる
    const gulp = require('gulp');
    const concat = require('gulp-concat');
    const changed = require('gulp-changed');

    let TARGET = './gulp/*.js';
    let RESULT_NAME = 'script.js'
    let LOCATION = './dist';

    gulp.task('concat', () => {
        gulp.src([TARGET])
            .pipe(changed(LOCATION))
            .pipe(concat(RESULT_NAME))
            .pipe(gulp.dest(LOCATION))

    });
    // !マークをつかうと対象外にできる
}());
(function() {
    'use strict';
    //    rename ファイルをコピーし改名して任意の場所に移動
    const gulp = require('gulp');
    const rename = require('gulp-rename')
    let TARGET = './gulpfile.js';
    let LOCATION = './dist'

    gulp.task('rename', () => {
        gulp.src(TARGET)
            // .pipe(rename('fuga.css'))
            .pipe(rename((path) => {
                path.basename += '.min';
            }))
            .pipe(gulp.dest(LOCATION))
    });
}());

(function() {
    'use strict';
    //gulp   sassコンパイルとsourcemapの保存と自動的にベンダープレフィックスを書く
    const gulp = require('gulp');
    const changed = require('gulp-changed');
    const sass = require('gulp-sass');
    const sourcemaps = require("gulp-sourcemaps");
    const autoprefixer = require('gulp-autoprefixer');

    let WATCH = ['./style/scss/*.scss'];
    let TARGET = './style/scss/*.scss';
    let BROWSER_SET = ['ios_saf >= 8', 'Android >= 4'];
    let LOCATION = './style/css';

    gulp.task('default', () => {
        gulp.watch(WATCH, () => {
            gulp.src(TARGET)
                .pipe(changed(LOCATION))
                .pipe(sourcemaps.init())
                .pipe(sass({ outputStyle: 'expanded' }))
                .pipe(autoprefixer({
                    browsers: BROWSER_SET
                }))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(LOCATION))
            console.log('変更されました');
        });
    });
}());



(function() {
    'use strict';
    //browser ブラウザをライブ更新
    const gulp = require('gulp');
    const browser_sync = require('browser-sync').create();
    let TARGET = './';
    let TARGET_WATCH = ['./*', './style/scss/*.scss'];

    gulp.task('browser', () => {
        browser_sync.init({
            server: {
                baseDir: TARGET
            }
        });
        gulp.watch(TARGET_WATCH, () => {
            browser_sync.reload();
        });
    });
}());


(function() {
    'use strict';
    //    copy ファイルを指定して任意の場所にコピー
    const gulp = require('gulp');
    const del = require('del');
    let COPY_TARGET = './images/food1.jpg';
    let COPY_LOCATION = 'dist';
    gulp.task('copy', () => {
        return gulp.src(COPY_TARGET)
            .pipe(gulp.dest(COPY_LOCATION));
    });

    //    clean ファイルを指定して削除
    let DELEET_TARGET = './images/food1.jpg';
    gulp.task('clean', () => {
        del(DELEET_TARGET)
    });
}());


// gulp.task('move', ['copy', 'clean']);


// gulp.task('sass', () => {
//     return gulp.watch('style/scss/*.scss', () => {
//         gulp.src('style/scss/*.scss')
//             .pipe(sass())
//             .pipe(gulp.dest('style/css'))
//         console.log('変更されました');
//     });
// });


// gulp.task('autofix', () => {
//     return gulp.src('./style/css/*.css')
//         .pipe(autoprefixer({
//             browsers: ['ios_saf >= 8', 'Android >= 4'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('style/css'))
// });
(function() {
    'use strict';
    const gulp = require('gulp');
    const rename = require("gulp-rename");
    const image_min = require("gulp-imagemin");
    const imagemin_gif = require('imagemin-gifsicle');
    const pngquant = require("imagemin-pngquant");


    gulp.task('img', () => {
        gulp.src('./images/MAINBACK.png')
            .pipe(image_min(
                [pngquant({ quality: '65-80', speed: 1 })]
            ))

        .pipe(rename((path) => {
                path.basename += '.min';
            }))
            .pipe(gulp.dest('./images'))
    });

}());