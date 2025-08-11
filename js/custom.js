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

function recommend(type) {
  const services = {
    business: [
      {
        name: "Business Website",
        description: "Professional websites that drive results and showcase your brand effectively."
      },
      {
        name: "SEO Optimization", 
        description: "Boost your online visibility and rank higher on search engines."
      },
      {
        name: "Marketing Consultation",
        description: "Strategic marketing advice to grow your business and reach more customers."
      }
    ],
    home: [
      {
        name: "Home Repair",
        description: "Reliable repair services to keep your home in perfect condition."
      },
      {
        name: "Interior Design",
        description: "Transform your space with creative and functional design solutions."
      },
      {
        name: "Plumbing Services",
        description: "Expert plumbing solutions for all your residential needs."
      }
    ],
    design: [
      {
        name: "Logo Design",
        description: "Create a memorable brand identity with professional logo design."
      },
      {
        name: "UI/UX Services",
        description: "Design intuitive user experiences that engage and convert visitors."
      },
      {
        name: "Brand Kit",
        description: "Complete branding package including colors, fonts, and style guides."
      }
    ],
    other: [
      {
        name: "Custom Consultation",
        description: "Personalized advice tailored to your specific requirements and goals."
      },
      {
        name: "Talk to Support",
        description: "Get immediate help from our friendly customer support team."
      }
    ]
  };

  const results = services[type] || [];
  let html = '<div class="row">';

  results.forEach(service => {
    html += `
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${service.name}</h5>
            <p class="card-text">${service.description}</p>
            <a href="#" class="btn btn-sm btn-primary">Explore</a>
          </div>
        </div>
      </div>`;
  });


  html += '</div>';
  document.getElementById("recommendationResult").innerHTML = html;
}


