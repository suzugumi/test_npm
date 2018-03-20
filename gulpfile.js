// gulpフォルダまたはdistフォルダのjsファイルをgulpfileとして動かす

const requireDir = require('require-dir');
let TARGET = './gulp';
requireDir(TARGET);