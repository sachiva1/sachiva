document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header_section");
  const themeToggle = document.getElementById("theme-toggle");

  // Apply Scroll Shadow
  function applyScrollShadow() {
    if (window.scrollY > 10) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }

  // Load Theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle?.setAttribute("checked", "true");
  } else {
    document.body.classList.remove("dark-mode");
    themeToggle?.removeAttribute("checked");
  }

  // Toggle Theme
  themeToggle?.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
    applyScrollShadow();
  });

  // Scroll Shadow
  window.addEventListener("scroll", applyScrollShadow);
  applyScrollShadow();
});
