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
     Gallery Slideshow
  =========================== */

  const artImages = document.querySelectorAll('.art-box img');
  const slideshow = document.getElementById('slideshow');
  const slideshowImg = document.getElementById('slideshow-img');
  const closeBtn = document.querySelector('.close-btn');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  if (!slideshow || artImages.length === 0) return;

  let currentIndex = 0;
  const images = Array.from(artImages).map(img => img.src);

  function openSlideshow(index) {
    currentIndex = index;
    slideshowImg.src = images[currentIndex];
    slideshow.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeSlideshow() {
    slideshow.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    slideshowImg.src = images[currentIndex];
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    slideshowImg.src = images[currentIndex];
  }

  // Open slideshow
  artImages.forEach((img, index) => {
    img.addEventListener('click', () => openSlideshow(index));
  });

  // ONLY the X closes
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSlideshow);
  }

  // Arrow buttons
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

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (slideshow.style.display === 'flex') {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeSlideshow();
    }
  });

  /* ===========================
     Touch Swipe Support
  =========================== */

  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;

  slideshow.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slideshow.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance < 0) nextImage();
      else prevImage();
    }
  }

});
