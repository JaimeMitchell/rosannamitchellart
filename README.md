# Dynamic Gallery Image Rendering for GitHub Pages


This project uses a single, DRY workflow for your gallery:

- `gallery-images.json` is the only file you need to maintain for your image list and metadata (title, medium, size, price, availability).
- `assets/js/generate-gallery-json.js` is a helper script to auto-generate a basic `gallery-images.json` (with filenames and auto-titles) by scanning your images folder. Run this when you add/remove images, then fill in or edit metadata as needed.
- `assets/js/script.js` is the only JavaScript loaded on your gallery page. It handles all dynamic rendering for both the grid and the slideshow info.

**You do not need any other gallery scripts.**

## How It Works


1. **Image List & Metadata**
   - Maintain all your image info in `gallery-images.json` (array of objects: filename, title, medium, size, price, availability).
   - When you add or remove images, run `node assets/js/generate-gallery-json.js` to refresh the list, then fill in or edit metadata as needed.

2. **Dynamic Rendering**
   - The gallery grid is rendered from `gallery-images.json` by `assets/js/script.js`.
   - The slideshow overlay displays all metadata for each image, but the grid remains clean.

## Usage Instructions

### 1. Add or Remove Images
- Place new image files in `assets/images`.
- Remove any images you no longer want from the same folder.


### 2. Generate or Refresh the Image List
- Open a terminal in your project root.
- Run:
   ```sh
   node assets/js/generate-gallery-json.js
   ```
- This will create or update `gallery-images.json` with the current image filenames and auto-generated titles. You can then fill in or edit the metadata fields as needed.

### 3. Deploy to GitHub Pages
- Commit and push your changes (including `gallery-images.json`) to your repository.
- Your gallery will now reflect the updated images on your GitHub Pages site.


## Notes
- You must have Node.js installed to run the script.
- Always rerun the script after adding or removing images before deploying, and update metadata in `gallery-images.json` as needed.
- If you want to change the supported image types, edit the `validExtensions` array in the script.
- Only `script.js` is used for gallery logic—no other gallery scripts are needed.

---

For any issues, please open an issue on the repository.
