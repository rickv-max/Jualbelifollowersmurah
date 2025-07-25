// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

// Dark mode toggle
const themeToggle = document.getElementById("toggle-theme");
const htmlTag = document.documentElement;

themeToggle?.addEventListener("click", () => {
  const currentTheme = htmlTag.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  htmlTag.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Load saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    htmlTag.setAttribute("data-theme", savedTheme);
  }
});

// Responsive menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu on scroll
window.addEventListener("scroll", () => {
  navLinks?.classList.remove("show");
});
