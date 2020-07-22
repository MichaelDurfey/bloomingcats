/* eslint-disable import/no-extraneous-dependencies */
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminSVGO = require('imagemin-svgo');

(async () => {
  await imagemin(['src/assets/*.{jpg,png}'], {
    destination: 'src/assets/optimized',
    plugins: [
      imageminPngquant({
        quality: [0.4, 0.5],
      }),
    ],
  });

  console.log('Images optimized');
})();

(async () => {
  await imagemin(['src/assets/*.svg'], {
    destination: 'src/assets/optimized',
    plugins: [
      imageminSVGO({
        plugins: [{ removeOffCanvasPaths: true }],
      }),
    ],
  });

  console.log('SVGs optimized');
})();
