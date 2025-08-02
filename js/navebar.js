document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header_section");
  const themeToggle = document.getElementById("theme-toggle");

  // ✅ Apply Scroll Shadow
  function applyScrollShadow() {
    if (window.scrollY > 10) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }

  // ✅ Listen for scroll
  window.addEventListener("scroll", applyScrollShadow);

  // ✅ Load Theme from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.checked = true;
  }

  // ✅ Toggle Theme
  if (themeToggle) {
    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
      applyScrollShadow(); // recheck shadow instantly
    });
  }

  //  Run shadow check on page load
  applyScrollShadow();
});


