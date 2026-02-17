// Mobile menu toggle + Gallery Slideshow with Swipe Support

document.addEventListener("DOMContentLoaded", function () {

  /* ===========================
     Mobile Menu Toggle
  =========================== */
  const toggle = document.querySelector(".main-menu-toggle");
  const menu = document.querySelector("nav ul");

  if (toggle) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
  }


  /* ===========================
     Dynamic Gallery Rendering
  =========================== */
  const artGrid = document.getElementById('art-grid');
  let images = [];
  let currentIndex = 0;

  // Only run on gallery page
  if (artGrid) {
    fetch('gallery-images.json')
      .then(response => response.json())
      .then(data => {
        // Support both array of filenames and array of objects
        if (typeof data[0] === 'string') {
          images = data.map(filename => ({ filename, title: '', medium: '', size: '', price: '', availability: '' }));
        } else {
          images = data;
        }
        // Render images
        images.forEach((imgObj, idx) => {
          const artBox = document.createElement('div');
          artBox.className = 'art-box';
          const img = document.createElement('img');
          img.src = `assets/images/${imgObj.filename}`;
          img.alt = imgObj.title || '';
          img.tabIndex = 0;
          img.addEventListener('click', () => openSlideshow(idx));
          artBox.appendChild(img);
          artGrid.appendChild(artBox);
        });
      });
  } else {
    // Fallback for other pages: try to get images from static HTML
    images = Array.from(document.querySelectorAll('.art-box img')).map(img => ({ filename: img.src.split('/').pop(), title: '', medium: '', size: '', price: '', availability: '' }));
  }

  // Slideshow elements
  const slideshow = document.getElementById('slideshow');
  const slideshowImg = document.getElementById('slideshow-img');
  const closeBtn = document.querySelector('.close-btn');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  // Helper to get a title from the image filename
  function getTitleFromFilename(filename) {
    const file = filename.split('.')[0];
    return file.replace(/[_-]+/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  // Add or update info label below the slideshow image (all info in one line)
  function updateSlideshowInfo() {
    let label = document.getElementById('slideshow-info-label');
    if (!label) {
      label = document.createElement('div');
      label.id = 'slideshow-info-label';
      label.style.fontFamily = 'inherit';
      label.style.fontSize = '1.1em';
      label.style.textAlign = 'center';
      label.style.padding = '16px 0 0 0';
      label.style.whiteSpace = 'normal';
      slideshowImg.insertAdjacentElement('afterend', label);
    }
    // Always clear and update label
    label.innerHTML = '';
    const imgObj = images[currentIndex];
    const title = imgObj.title && imgObj.title.trim() ? imgObj.title : getTitleFromFilename(imgObj.filename);
    const infoParts = [title];
    if (imgObj.medium && imgObj.medium.trim()) infoParts.push(imgObj.medium);
    if (imgObj.size && imgObj.size.trim()) infoParts.push(imgObj.size);
    if (imgObj.price && imgObj.price.trim()) infoParts.push(imgObj.price);
    if (imgObj.availability && imgObj.availability.trim()) infoParts.push(imgObj.availability);
    // Add purchase link at the end
    const infoLine = infoParts.join(', ');
    const purchaseLink = `<a href="contact.html" style="color:#fff;text-decoration:underline;font-size:1em;" target="_self">Info</a>`;
    label.innerHTML = infoLine + ' ' + purchaseLink;
    label.style.display = 'block';
  }

  function openSlideshow(index) {
    currentIndex = index;
    slideshowImg.src = `assets/images/${images[currentIndex].filename}`;
    slideshow.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Prevent background scroll on mobile
    if (slideshow) {
      slideshow.addEventListener('touchmove', preventScroll, { passive: false });
    }
    updateSlideshowInfo();
  }

  function preventScroll(e) {
    e.preventDefault();
  }

  function closeSlideshow() {
    slideshow.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Remove scroll lock on close
    if (slideshow) {
      slideshow.removeEventListener('touchmove', preventScroll, { passive: false });
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    slideshowImg.src = `assets/images/${images[currentIndex].filename}`;
    updateSlideshowInfo();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    slideshowImg.src = `assets/images/${images[currentIndex].filename}`;
    updateSlideshowInfo();
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSlideshow);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextImage();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevImage();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (slideshow && slideshow.style.display === 'flex') {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeSlideshow();
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;
  if (slideshow) {
    slideshow.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    slideshow.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  function handleSwipe() {
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) > swipeThreshold) {
      if (distance < 0) nextImage();
      else prevImage();
    }
  }

  // End Dynamic Gallery


});
