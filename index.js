// Import required libraries
import compress_images from 'compress-images';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

// Paths to input and output directories
const INPUT_path_to_your_images =
  'assets/images/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}';
const OUTPUT_path = 'assets/build/images/';

// Function to compress images
compress_images(
  INPUT_path_to_your_images,
  OUTPUT_path,
  {
    compress_force: false,
    statistic: true,
    autoupdate: true,
  },
  false,
  {
    jpg: { engine: 'mozjpeg', command: ['-quality', '60'] },
    png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] },
    svg: { engine: 'svgo', command: '--multipass' },
    gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] },
  },
  // Callback function to handle the result
  function (error, completed, statistic) {
    console.log('-------------');
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log('-------------');
  }
);

// Function to convert png/jpg images to webp format
(async () => {
  await imagemin(['assets/build/images/**/*.{jpg,png}'], {
    destination: 'assets/build/images/',
    plugins: [imageminWebp({ quality: 50 })],
  });

  console.log('Images optimized');
})();
