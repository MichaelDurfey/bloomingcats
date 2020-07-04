/* eslint-disable import/no-extraneous-dependencies */
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

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
