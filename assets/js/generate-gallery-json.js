// This script scans the assets/images directory and generates a gallery-images.json file listing all image files.
// Run this script before deploying to GitHub Pages to keep your gallery in sync.

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../images');
const outputJson = path.join(__dirname, '../../gallery-images.json');
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// Read existing gallery-images.json if it exists
let existingData = [];
if (fs.existsSync(outputJson)) {
  try {
    existingData = JSON.parse(fs.readFileSync(outputJson, 'utf8'));
  } catch (e) {
    console.error('Could not parse existing gallery-images.json:', e);
  }
}

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    process.exit(1);
  }
  const images = files.filter(file => validExtensions.includes(path.extname(file).toLowerCase()));
  const imageObjects = images.map(file => {
    // Try to preserve existing metadata
    const existing = existingData.find(img => img.filename === file);
    if (existing) {
      return {
        filename: file,
        title: existing.title || path.parse(file).name.replace(/[_-]+/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
        medium: existing.medium || "",
        size: existing.size || "",
        price: existing.price || "",
        availability: existing.availability || ""
      };
    } else {
      // New image, default fields
      const name = path.parse(file).name.replace(/[_-]+/g, ' ');
      const title = name.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
      return {
        filename: file,
        title: title,
        medium: "",
        size: "",
        price: "",
        availability: ""
      };
    }
  });
  fs.writeFileSync(outputJson, JSON.stringify(imageObjects, null, 2));
  console.log(`gallery-images.json updated: ${imageObjects.length} images, metadata preserved.`);
});
