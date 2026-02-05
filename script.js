// active year
document.getElementById("year").textContent = new Date().getFullYear();

// mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// close menu on link click (mobile)
document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// nav link active on scroll
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav__link");

function setActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    const isActive = scrollY >= top && scrollY < top + height;
    navItems.forEach(link => {
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.toggle("active", isActive);
      }
    });
  });
}
window.addEventListener("scroll", setActiveNav);

// simple scroll reveal
const animatedEls = document.querySelectorAll(".fade-in-up, .slide-in-left, .slide-in-right");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

animatedEls.forEach(el => observer.observe(el));

// project filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach(card => {
      const category = card.dataset.category;
      if (filter === "all" || category === filter) {
        card.style.display = "block";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// lightbox for achievement images
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImg && lightboxClose) {
  const zoomImages = document.querySelectorAll(".achievements__images img");

  zoomImages.forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("lightbox--show");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("lightbox--show");
    lightboxImg.src = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
}
