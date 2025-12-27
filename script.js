// FargoRate fetching
// Note: FargoRate.com doesn't have a public API, so direct fetching will face CORS issues.
// Options:
// 1. Update manually by changing the values below
// 2. Set up a backend proxy/server to fetch and cache the data
// 3. Use a service like CORS proxy (not recommended for production)

async function fetchFargoRate() {
  const _membershipId = "9900005871555";
  const _playerName = "Erika Alban";

  // Try to fetch from FargoRate (will likely fail due to CORS)
  // You would need a backend proxy for this to work
  try {
    // Example: If you set up a backend endpoint
    // const response = await fetch(`/api/fargorate/${membershipId}`);
    // const data = await response.json();
    // updateFargoDisplay(data);

    // For now, using static values
    updateFargoDisplay({
      rating: 511,
      robustness: 3271,
      lastUpdated: new Date().toLocaleDateString(),
    });
  } catch (error) {
    console.log("Using static FargoRate data");
    // Fallback to static values
    updateFargoDisplay({
      rating: 511,
      robustness: 3271,
      lastUpdated: new Date().toLocaleDateString(),
    });
  }
}

function updateFargoDisplay(data) {
  const ratingEl = document.getElementById("fargo-rating");
  const updateDateEl = document.getElementById("fargo-update-date");

  if (ratingEl) {
    ratingEl.textContent = data.rating;
  }
  if (updateDateEl) {
    updateDateEl.textContent = data.lastUpdated;
  }
}

// Initialize on page load
fetchFargoRate();

// Titles and Achievements Filtering
function initTitlesFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".cards-container .card");

  // Check if elements exist
  if (filterButtons.length === 0 || cards.length === 0) {
    console.warn("Filter buttons or cards not found");
    return;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Filter cards
      cards.forEach((card) => {
        if (filterValue === "all") {
          card.classList.remove("hidden");
        } else {
          const cardFilter = card.getAttribute("data-filter");
          if (cardFilter === filterValue) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });
}

// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      hamburger.setAttribute(
        "aria-expanded",
        hamburger.classList.contains("active")
      );
    });

    // Close menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !hamburger.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Hide previous messages
      formMessage.className = "form-message";
      formMessage.style.display = "none";

      try {
        // Get form data
        const formData = new FormData(contactForm);

        // Submit to FormSubmit.co
        // Note: FormSubmit.co doesn't support CORS properly, so we use no-cors mode
        // This means we can't read the response, but the email will still send
        await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          mode: "no-cors", // Required for FormSubmit.co
        });

        // Since we can't read the response with no-cors, we assume success
        // FormSubmit.co will send the email if the submission is valid
        formMessage.className = "form-message success";
        formMessage.textContent =
          "Thanks! Your message has been sent. I'll get back to you soon!";
        formMessage.style.display = "block";
        formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

        // Reset form
        contactForm.reset();
      } catch (error) {
        console.error("Form submission error:", error);
        formMessage.className = "form-message error";
        formMessage.textContent =
          "Oops! Something went wrong. Please try again or email me directly at erikalban12@gmail.com";
        formMessage.style.display = "block";
        formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});

// PhotoSwipe Gallery Implementation
const initPhotoGallery = async () => {
  // Array of photo filenames from photos directory
  const photoFilenames = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
  ];

  // Get gallery container
  const galleryContainer = document.getElementById("photography-gallery");
  if (!galleryContainer) {
    console.log("Photography gallery container not found");
    return;
  }

  // Function to get image dimensions
  const getImageDimensions = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        resolve({ width: 800, height: 600 }); // fallback dimensions
      };
      img.src = src;
    });
  };

  // Build gallery items
  for (let i = 0; i < photoFilenames.length; i++) {
    const filename = photoFilenames[i];
    const fullImagePath = `images/photos/${filename}`;

    // Get dimensions for PhotoSwipe
    const dimensions = await getImageDimensions(fullImagePath);

    // Create gallery item element
    const galleryItem = document.createElement("a");
    galleryItem.href = fullImagePath;
    galleryItem.className = "gallery-item";
    galleryItem.setAttribute("data-pswp-width", dimensions.width);
    galleryItem.setAttribute("data-pswp-height", dimensions.height);

    // Create thumbnail image for display
    const img = document.createElement("img");
    img.alt = `Erika Alban - ${filename}`;
    img.src = fullImagePath;

    // Lazy load images after the first 8
    if (i >= 8) {
      img.loading = "lazy";
    }

    galleryItem.appendChild(img);
    galleryContainer.appendChild(galleryItem);
  }

  // Flag to track if PhotoSwipe is available
  let photoSwipeAvailable = false;

  // Initialize PhotoSwipe
  try {
    const { default: Lightbox } =
      await import("https://unpkg.com/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.js");

    const lightbox = new Lightbox({
      gallery: "#photography-gallery",
      children: "a",
      pswpModule: () =>
        import("https://unpkg.com/photoswipe@5.4.4/dist/photoswipe.esm.js"),
      bgOpacity: 0.95,
      showHideAnimationType: "zoom",
      showAnimationDuration: 333,
      hideAnimationDuration: 333,
      allowPanToNext: false,
      zoom: {
        start: "fit",
        max: 3,
      },
      keyboard: {
        enable: true,
      },
      tapAction: "close",
      doubleTapAction: "zoom",
      padding: { top: 20, bottom: 40, left: 100, right: 100 },
    });

    lightbox.init();
    photoSwipeAvailable = true;

    console.log(
      `PhotoSwipe gallery initialized with ${photoFilenames.length} photos`
    );
  } catch (error) {
    console.error("Failed to initialize PhotoSwipe:", error);
    photoSwipeAvailable = false;
  }

  // Add click handlers - fallback if PhotoSwipe fails
  galleryContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      const galleryItem = e.target.closest(".gallery-item");
      if (galleryItem && !photoSwipeAvailable) {
        e.preventDefault();
        createSimpleLightbox(galleryItem.href, e.target.alt);
      }
    }
  });

  // Simple lightbox fallback
  const createSimpleLightbox = (src, alt) => {
    const lightbox = document.createElement("div");
    lightbox.className = "simple-lightbox";
    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    lightbox.innerHTML = `
      <div style="position: relative; max-width: 90%; max-height: 90%;">
        <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 90vh; display: block;">
        <button style="position: absolute; top: -40px; right: 0; background: white; border: none; font-size: 30px; cursor: pointer; padding: 5px 15px; border-radius: 4px;">&times;</button>
      </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";

    const close = () => {
      document.body.removeChild(lightbox);
      document.body.style.overflow = "";
    };

    lightbox.querySelector("button").addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener(
      "keydown",
      function escapeHandler(e) {
        if (e.key === "Escape") {
          close();
          document.removeEventListener("keydown", escapeHandler);
        }
      },
      { once: true }
    );
  };

  // Add arrow key scrolling for the gallery
  const addGalleryKeyboardNavigation = () => {
    document.addEventListener("keydown", (e) => {
      const mediaSection = document.querySelector("#media");
      if (mediaSection && isElementInViewport(mediaSection)) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          galleryContainer.scrollBy({ left: -310, behavior: "smooth" });
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          galleryContainer.scrollBy({ left: 310, behavior: "smooth" });
        }
      }
    });
  };

  // Helper function to check if element is in viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Initialize keyboard navigation
  addGalleryKeyboardNavigation();
};

// Initialize the photo gallery when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPhotoGallery);
} else {
  initPhotoGallery();
}

// Google Analytics 4 Event Tracking
document.addEventListener("DOMContentLoaded", () => {
  // Helper function to send GA4 events
  const trackEvent = (eventName, eventParams = {}) => {
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, eventParams);
    }
  };

  // Track navigation link clicks
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const section = link.getAttribute("href").replace("#", "") || "home";
      trackEvent("navigation_click", {
        section: section,
        link_text: link.textContent.trim(),
      });
    });
  });

  // Track contact form submissions
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      trackEvent("contact_form_submit", {
        form_location: "contact_section",
      });
    });
  }

  // Track photo gallery interactions
  const galleryContainer = document.getElementById("photography-gallery");
  if (galleryContainer) {
    galleryContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG") {
        const imgSrc = e.target.src;
        const photoNumber = imgSrc.match(/(\d+)\.jpg/)?.[1] || "unknown";
        trackEvent("photo_click", {
          photo_number: photoNumber,
          photo_src: imgSrc.split("/").pop(),
        });
      }
    });
  }

  // Track hamburger menu toggles
  const hamburger = document.querySelector(".hamburger");
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.contains("active");
      trackEvent("menu_toggle", {
        action: isOpen ? "open" : "close",
      });
    });
  }

  // Initialize titles filter
  initTitlesFilter();

  // Track scroll depth (optional - tracks when users scroll 25%, 50%, 75%, 100%)
  let scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };
  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );

    [25, 50, 75, 100].forEach((depth) => {
      if (scrollPercent >= depth && !scrollDepthTracked[depth]) {
        scrollDepthTracked[depth] = true;
        trackEvent("scroll_depth", {
          depth: depth,
        });
      }
    });
  });
});
