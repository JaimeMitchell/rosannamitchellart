Website for artist Rosanna Mitchell, built with HTML, CSS, and JavaScript, and hosted on GitHub Pages at
https://jaimemitchell.github.io/rosannamitchellart/



# Dynamic Gallery for GitHub Pages

This project uses a simple, DRY workflow for a dynamic image gallery and slideshow:

## How to Use

1. **Add or Remove Images**
   - Place new images in `assets/images`.
   - Remove unwanted images from `assets/images`.


2. **Sync and Edit the Image List**
    - Run:
       ```sh
       node assets/js/generate-gallery-json.js
       ```
    - This updates `gallery-images.json` to match your images folder. Existing metadata (title, medium, size, price, availability) is preserved.
    - **Edit `gallery-images.json` manually in your code editor to add, update, or remove info for each image.**
       - Each image is an object with these fields:
          - `filename`: The exact name of the image file in `assets/images` (do not change unless you rename the file).
          - `title`: The artwork title (appears first in the slideshow label).
          - `medium`: (Optional) The medium, e.g., "Oil on canvas".
          - `size`: (Optional) The size, e.g., "12\"x12\" in".
          - `price`: (Optional) The price, e.g., "$1000".
          - `availability`: (Optional) e.g., "Available", "Sold", etc.
       - Example:
          ```json
          {
             "filename": "Brendas_Garden.jpg",
             "title": "Brendas Garden",
             "medium": "Charcoal on paper",
             "size": "12\"x12\" in",
             "price": "$1000",
             "availability": "Available"
          }
          ```
       - **To add a label:** Fill in or edit any of the fields for an image object. Leave a field blank if you do not want it to appear.
       - **To remove a label:** Delete the value for that field (e.g., set "medium": "").
       - **Order matters:** The order of objects in `gallery-images.json` determines the order of images in the gallery and slideshow.
       - **Do not remove the filename field or change its value unless you rename the actual image file.**

3. **Deploy**
   - Commit and push your changes (including `gallery-images.json`) to GitHub.
   - Your gallery and slideshow will update automatically on your site.

## How It Works

- `gallery-images.json` is the single source of truth for your gallery images and their info.
- `assets/js/generate-gallery-json.js` keeps your JSON in sync with your images folder, without erasing your metadata.
- `assets/js/script.js` is the only gallery JavaScript. It:
  - Renders the grid from `gallery-images.json`.
  - Shows all image info in the slideshow overlay (one line, plus a contact link).

## Tips
- Only edit `gallery-images.json` for image info—no need to touch HTML or JS for content changes.
- Always rerun the script after adding/removing images, then update metadata as needed.
- To change supported image types, edit `validExtensions` in the script.
- You only need `script.js` for gallery logic—no other gallery scripts are required.

---

For help, open an issue on the repository.
