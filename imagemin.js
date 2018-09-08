const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');

const PNGImages = 'images/*.png';
const JPEGImages = 'images/*.jpg';
const output = 'build/images';

const outputPNGImages = 'build/images/*.jpg';
const outputJPEGImages = 'build/images/*.jpg';

const optimiseJPEGImages = () => {
  return imagemin([JPEGImages], output, {
    plugins: [
      imageminMozjpeg({
        quality: 60,
      }),
    ]
  });
}

const optimisePNGImages = () => {	
  return imagemin([PNGImages], output, {
    plugins: [
      imageminPngquant({
      	quality: 60
      })
    ],
  });
}

const convertPNGToWebp = () => {
	return imagemin([outputPNGImages], output, {
		use: [
			imageminWebp({
				quality: 60
			})
		]
	})
}

const convertJPGToWebp = () => {
	return imagemin([outputJPEGImages], output, {
		use: [
			imageminWebp({
				quality: 60
			})
		]
	})
}


optimiseJPEGImages()
	.then(() => optimisePNGImages())
  .then(() => convertPNGToWebp())
  .then(() => convertJPGToWebp())
  .catch(error => console.log(error));

// (async () => {
//     const files = await imagemin(['images/*.{jpg,png}'], 'build/images', {
//         plugins: [
//             imageminMozjpeg({quality: 20, progressive: true}),
//             imageminPngquant({quality: '65-80'})
//         ]
//     });
 
//     console.log(files);
//     //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
// })();
