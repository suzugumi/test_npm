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
        let RESULT_NAME = 'script3.css'
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
    //    rename ファイルをコピーし改名して任意の場所に移動
    const gulp = require('gulp');
    const rename = require('gulp-rename')


    gulp.task('rename', () => {
        let TARGET = './gulpfile.js';
        let LOCATION = './dist'

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


    gulp.task('default', () => {
        let WATCH = ['./style/scss/*.scss'];
        let TARGET = './style/scss/*.scss';
        let BROWSER_SET = ['ios_saf >= 8', 'Android >= 4'];
        let LOCATION = './style/css';

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


    gulp.task('browser', () => {
        let TARGET = './';
        let TARGET_WATCH = ['./*', './style/scss/*.scss'];

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
    const changed = require('gulp-changed');
    const image_imagemin = require("gulp-imagemin");
    const imagemin_jpg = require('imagemin-jpeg-recompress');
    const imagemin_gif = require('imagemin-gifsicle');
    const imagemin_png = require("imagemin-pngquant");
    const imagemin_svg = require("gulp-svgmin");


    gulp.task('img', () => {

        let TARGET = './images/food3.jpg';
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
(function() {
    'use strict';
    // スプライシートを作る
    const gulp = require("gulp");
    const spritesmith = require("gulp.spritesmith");

    gulp.task("sprite", function() {
        var spriteData = gulp.src("./images/*")
            .pipe(spritesmith({
                imgName: "spritesheet.png", // スプライトシート名
                cssName: "_spritesheet.scss", // スプライトシート用のSassの変数
                imgPath: "../../images/spritesheet.png", // CSSからスプライトシートまでのパス
                cssFormat: "scss", // Sass(SCSS)で変数を出力
                cssVarMap: function(sprite) {
                    // sprite-(個別パーツ名)で変数を使うための設定
                    sprite.name = "sprite-" + sprite.name;
                }
            }));

        // スプライトシート書き出し
        spriteData.img.pipe(gulp.dest("./images"));
        // スプライトシート用変数の書き出し
        spriteData.css.pipe(gulp.dest("./style/scss"));
    });

}());