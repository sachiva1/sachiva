// Get Current Year
function getCurrentYear() {
    var d = new Date();
    var year = d.getFullYear();
    document.querySelector("#displayDateYear").innerText = year;
}
getCurrentYear()

//client section owl carousel
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

// Theme Toggle Functionality
const toggleCheckbox = document.getElementById('theme-toggle');
console.log("clicked");
const currentTheme = localStorage.getItem('theme') || 'light';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    toggleCheckbox.checked = (theme === 'dark');
  }

applyTheme(currentTheme);

toggleCheckbox.addEventListener('change', () => {
    const theme = toggleCheckbox.checked ? 'dark' : 'light';
    applyTheme(theme);
});

window.onscroll = function () {
  const btn = document.getElementById("backToTop");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

document.getElementById("backToTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
