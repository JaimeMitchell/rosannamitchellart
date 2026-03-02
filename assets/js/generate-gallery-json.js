// This script scans the assets/images directory, generates thumbnails for the gallery grid,
// and updates gallery-images.json with any NEW images only. Existing entries are never modified.
// Run this script before deploying to GitHub Pages to keep your gallery in sync.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '../images');
const thumbnailsDir = path.join(__dirname, '../thumbnails');
const outputJson = path.join(__dirname, '../../gallery-images.json');
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Files in the images folder that are NOT gallery artwork (e.g. artist portrait)
const EXCLUDED_FILES = ['Rosanna-Mitchell-Artist.jpg', 'Rosanna-Mitchell-Artist-optimized.jpg'];

// Thumbnail settings: 800px wide, high quality — industry standard for gallery grids
const THUMB_WIDTH = 800;
const JPEG_QUALITY = 82;

// Ensure thumbnails directory exists
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

// Read existing gallery-images.json if it exists
let existingData = [];
if (fs.existsSync(outputJson)) {
  try {
    const parsed = JSON.parse(fs.readFileSync(outputJson, 'utf8'));
    if (Array.isArray(parsed)) existingData = parsed;
  } catch (e) {
    console.error('Could not parse existing gallery-images.json:', e);
  }
}

(async () => {
  let files;
  try {
    files = fs.readdirSync(imagesDir);
  } catch (err) {
    console.error('Error reading images directory:', err);
    process.exit(1);
  }

  const images = files.filter(file =>
    validExtensions.includes(path.extname(file).toLowerCase()) &&
    !EXCLUDED_FILES.includes(file)
  );

  // Build a set of existing filenames for fast lookup
  const existingFilenames = new Set(existingData.map(img => img.filename));

  // Only create new entries for images not already in JSON
  const newImageObjects = [];
  for (const file of images) {
    if (!existingFilenames.has(file)) {
      const name = path.parse(file).name.replace(/[_-]+/g, ' ');
      const title = name.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
      newImageObjects.push({
        filename: file,
        title: title,
        medium: "",
        size: "",
        price: "",
        availability: ""
      });
    }
  }

  // Append new entries only — never modify existing entries
  const updatedData = existingData.concat(newImageObjects);
  fs.writeFileSync(outputJson, JSON.stringify(updatedData, null, 2));
  console.log(
    `gallery-images.json: ${updatedData.length} total (${newImageObjects.length} new added, ${existingData.length} existing preserved).`
  );

  // Generate thumbnails for all images in the JSON if thumbnail is missing
  const jsonFilenames = new Set(updatedData.map(img => img.filename));
  let thumbCreated = 0;
  let thumbExisted = 0;

  for (const file of images) {
    if (!jsonFilenames.has(file)) continue; // skip images not in gallery JSON

    const srcPath = path.join(imagesDir, file);
    const thumbPath = path.join(thumbnailsDir, file);

    if (fs.existsSync(thumbPath)) {
      thumbExisted++;
      continue;
    }

    try {
      const ext = path.extname(file).toLowerCase();
      let pipeline = sharp(srcPath).resize({ width: THUMB_WIDTH, withoutEnlargement: true });

      if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true });
      } else if (ext === '.png') {
        pipeline = pipeline.png({ quality: JPEG_QUALITY });
      } else if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: JPEG_QUALITY });
      }

      await pipeline.toFile(thumbPath);
      thumbCreated++;
      console.log(`  Thumbnail created: ${file}`);
    } catch (e) {
      console.error(`  Thumbnail error for ${file}:`, e.message);
    }
  }

  console.log(`Thumbnails: ${thumbCreated} new created, ${thumbExisted} already existed.`);
})();
