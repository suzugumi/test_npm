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