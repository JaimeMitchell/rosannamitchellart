// This script scans the assets/images directory and generates a gallery-images.json file listing all image files.
// Run this script before deploying to GitHub Pages to keep your gallery in sync.

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');
const outputJson = path.join(__dirname, '../../gallery-images.json');

const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    process.exit(1);
  }
  const images = files.filter(file => validExtensions.includes(path.extname(file).toLowerCase()));
  fs.writeFileSync(outputJson, JSON.stringify(images, null, 2));
  console.log(`Found ${images.length} images. List written to gallery-images.json.`);
});
