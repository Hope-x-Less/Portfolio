// Interactive navigation and UI behaviors
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");
const backToTop = document.getElementById("back-to-top");
const loader = document.getElementById("loader");
const siteHeader = document.querySelector(".site-header");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Toggle mobile menu
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("nav__menu--open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("nav__menu--open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("nav__menu--open")) {
      navMenu.classList.remove("nav__menu--open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    }
  });
}

// Typing effect in hero section
const typedText = document.getElementById("typed");
const phrases = [
  "Flutter development",
  "modern web design",
  "AI creativity",
  "responsive UI",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typedText) return;
  const current = phrases[phraseIndex];
  if (isDeleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }
  typedText.textContent = current.substring(0, charIndex);

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  const delay = isDeleting ? 40 : 90;
  setTimeout(typeLoop, delay);
}

if (typedText) {
  if (prefersReducedMotion) {
    typedText.textContent = phrases[0];
  } else {
    typeLoop();
  }
}

// Scroll reveal animations
const revealItems = document.querySelectorAll(".reveal");
if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add("reveal--visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Active navigation highlighting
const sections = document.querySelectorAll("main section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => link.classList.remove("is-active"));
        const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("is-active");
        }
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Back to top button
window.addEventListener("scroll", () => {
  if (siteHeader) {
    siteHeader.classList.toggle("site-header--scrolled", window.scrollY > 10);
  }
  if (window.scrollY > 600) {
    backToTop.classList.add("back-to-top--visible");
  } else {
    backToTop.classList.remove("back-to-top--visible");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

// Loading animation removal
window.addEventListener("load", () => {
  if (!loader) return;
  loader.classList.add("loader--hidden");
  setTimeout(() => loader.remove(), 600);
});
