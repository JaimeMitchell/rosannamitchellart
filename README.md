# Dynamic Gallery Image Rendering for GitHub Pages

This project uses a Node.js script to automatically generate a list of all images in the `assets/images` folder, allowing your gallery to update dynamically when images are added or removed. This ensures your site always displays the current set of images after each deployment.

## How It Works

1. **Image List Generation**
   - The script `assets/js/generate-gallery-json.js` scans the `assets/images` directory and creates a `gallery-images.json` file in the project root.
   - This JSON file contains an array of all image filenames in the folder.

2. **Dynamic Rendering**
   - Your gallery page JavaScript fetches `gallery-images.json` and renders all images listed there.
   - When you add or remove images from `assets/images`, simply rerun the script and redeploy.

## Usage Instructions

### 1. Add or Remove Images
- Place new image files in `assets/images`.
- Remove any images you no longer want from the same folder.

### 2. Generate the Image List
- Open a terminal in your project root.
- Run:
  ```sh
  node assets/js/generate-gallery-json.js
  ```
- This will create or update `gallery-images.json` with the current image filenames.

### 3. Deploy to GitHub Pages
- Commit and push your changes (including `gallery-images.json`) to your repository.
- Your gallery will now reflect the updated images on your GitHub Pages site.

## Notes
- You must have Node.js installed to run the script.
- Always rerun the script after adding or removing images before deploying.
- If you want to change the supported image types, edit the `validExtensions` array in the script.

---

For any issues, please open an issue on the repository.
