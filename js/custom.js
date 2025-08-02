// Get Current Year
function getCurrentYear() {
    var d = new Date();
    var year = d.getFullYear();
    document.querySelector("#displayDateYear").innerText = year;
}
getCurrentYear()

//client section owl carousel with accessibility
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        '<i class="fa fa-long-arrow-left" aria-hidden="true"></i><span class="sr-only">Previous</span>',
        '<i class="fa fa-long-arrow-right" aria-hidden="true"></i><span class="sr-only">Next</span>'
    ],
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
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
    },
    onInitialized: function() {
        // Add ARIA labels to carousel navigation
        $('.owl-prev').attr('aria-label', 'Previous testimonial');
        $('.owl-next').attr('aria-label', 'Next testimonial');
        $('.owl-carousel').attr('role', 'region').attr('aria-label', 'Client testimonials');
    }
});

// Theme Toggle Functionality with accessibility and error handling
document.addEventListener('DOMContentLoaded', function() {
    const toggleCheckbox = document.getElementById('theme-toggle');
    if (!toggleCheckbox) {
        console.warn('Theme toggle checkbox not found');
        return;
    }
    
    const currentTheme = localStorage.getItem('theme') || 'light';

    function applyTheme(theme) {
        try {
            document.documentElement.setAttribute('data-theme', theme);
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            toggleCheckbox.checked = (theme === 'dark');
            
            // Update theme switch label for screen readers
            const themeDescription = document.getElementById('theme-description');
            if (themeDescription) {
                themeDescription.textContent = theme === 'dark' ? 
                    'Switch to light theme' : 'Switch to dark theme';
            }
            
            // Update aria-label for the switch
            const themeSwitch = toggleCheckbox.closest('.theme-switch');
            if (themeSwitch) {
                const label = themeSwitch.querySelector('label') || themeSwitch.parentElement.querySelector('label');
                if (label) {
                    label.setAttribute('aria-label', theme === 'dark' ? 
                        'Toggle dark mode (currently dark)' : 'Toggle dark mode (currently light)');
                }
            }
            
            // Announce theme change to screen readers
            announceToScreenReader(`Theme changed to ${theme} mode`);
        } catch (error) {
            console.error('Error applying theme:', error);
        }
    }

    // Apply the saved theme on page load
    applyTheme(currentTheme);

    // Add event listener for theme toggle
    toggleCheckbox.addEventListener('change', function() {
        const theme = this.checked ? 'dark' : 'light';
        applyTheme(theme);
    });

    // Add keyboard support for space key on the slider
    const slider = toggleCheckbox.nextElementSibling;
    if (slider) {
        slider.addEventListener('keydown', function(e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleCheckbox.click();
            }
        });
    }
});

// Enhanced Back to Top with accessibility
window.onscroll = function () {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
        btn.setAttribute('aria-hidden', 'false');
    } else {
        btn.style.display = "none";
        btn.setAttribute('aria-hidden', 'true');
    }
};

document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus management - return focus to top of page
    document.querySelector('h1, .skip-link').focus();
});

// Form validation with accessibility
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
        
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('form-error');
            field.setAttribute('aria-invalid', 'true');
            
            if (errorElement) {
                errorElement.textContent = `${field.placeholder || field.name} is required`;
                errorElement.style.display = 'block';
            }
        } else {
            field.classList.remove('form-error');
            field.setAttribute('aria-invalid', 'false');
            
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.classList.add('form-error');
                field.setAttribute('aria-invalid', 'true');
                
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.style.display = 'block';
                }
            }
        }
    });
    
    return isValid;
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('contactForm')) {
                const statusElement = document.getElementById('form-status');
                if (statusElement) {
                    statusElement.className = 'status-message status-success';
                    statusElement.textContent = 'Thank you! Your message has been sent successfully.';
                    statusElement.style.display = 'block';
                    
                    // Clear form
                    contactForm.reset();
                    
                    // Announce success to screen readers
                    announceToScreenReader('Form submitted successfully');
                }
            } else {
                const statusElement = document.getElementById('form-status');
                if (statusElement) {
                    statusElement.className = 'status-message status-error';
                    statusElement.textContent = 'Please correct the errors above and try again.';
                    statusElement.style.display = 'block';
                    
                    // Focus first error field
                    const firstError = contactForm.querySelector('.form-error');
                    if (firstError) {
                        firstError.focus();
                    }
                }
            }
        });
    }
    
    // Add skip link functionality
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Keyboard navigation for mobile menu
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    if (navToggler && navCollapse) {
        navToggler.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                // Focus first navigation link when menu opens
                setTimeout(() => {
                    const firstNavLink = navCollapse.querySelector('.nav-link');
                    if (firstNavLink) firstNavLink.focus();
                }, 100);
            }
        });
    }
});

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navCollapse = document.querySelector('.navbar-collapse.show');
        const navToggler = document.querySelector('.navbar-toggler');
        
        if (navCollapse && navToggler) {
            navToggler.click();
            navToggler.focus();
        }
    }
});

// Ensure all images have proper loading states
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.alt = 'Image failed to load';
            this.style.opacity = '0.5';
        });
    });
});
