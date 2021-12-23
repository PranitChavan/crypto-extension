const { src, dest, watch } = require('gulp');
const minifyJs = require('gulp-uglify');

const bundleJS = () => {
  return src('./src/js/**/*.js').pipe(minifyJs()).pipe(dest('./dist/'));
};

const devWatch = () => {
  watch('./src/js/**/*.js', bundleJS);
};

exports.bundleJS = bundleJS;
exports.devWatch = devWatch;
