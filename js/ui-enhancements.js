// Modern UI Enhancements for Sachiva Website
// Adds interactive elements, animations, and improved user experience

document.addEventListener('DOMContentLoaded', function() {
    initUIEnhancements();
});

function initUIEnhancements() {
    // Initialize all UI components
    initScrollIndicator();
    initFloatingMenu();
    initSmoothScrolling();
    initParallaxEffects();
    initLoadingAnimations();
    initFormEnhancements();
    initCardAnimations();
    initHeaderEffects();
    initThemeTransitions();
}

// Scroll Progress Indicator
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// Floating Action Menu
function initFloatingMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const floatingMenu = document.getElementById('floatingMenu');
    
    if (!menuToggle || !floatingMenu) return;

    let isMenuOpen = false;

    menuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        floatingMenu.classList.toggle('active', isMenuOpen);
        
        const icon = menuToggle.querySelector('i');
        if (isMenuOpen) {
            icon.style.transform = 'rotate(45deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!floatingMenu.contains(e.target) && isMenuOpen) {
            isMenuOpen = false;
            floatingMenu.classList.remove('active');
            menuToggle.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header_section').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effects (Disabled - was causing fast scrolling issues)
function initParallaxEffects() {
    // Parallax effect disabled to prevent images moving too fast during scroll
    // If needed, can be re-enabled with gentler settings
    return;
    
    /*
    const parallaxElements = document.querySelectorAll('.img-box img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1; // Much gentler rate
        
        parallaxElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    });
    */
}

// Loading Animations with Intersection Observer
function initLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.box, .detail-box, .client_text, .footer-column');
    animateElements.forEach(el => observer.observe(el));
}

// Form Enhancements
function initFormEnhancements() {
    const form = document.querySelector('.modern-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add validation effects
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Form submission with animation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
                
                // Remove focused classes
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
            }, 3000);
        }, 2000);
    });
}

// Card Hover Animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.modern-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
            
            const arrow = this.querySelector('.service-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(10px)';
                arrow.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
            
            const arrow = this.querySelector('.service-arrow');
            if (arrow) {
                arrow.style.transform = 'translateX(0)';
                arrow.style.opacity = '0';
            }
        });
    });
}

// Header Scroll Effects
function initHeaderEffects() {
    const header = document.querySelector('.header_section');
    if (!header) return;

    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Theme Transition Effects
function initThemeTransitions() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('change', function() {
        document.body.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
}

// Utility Functions
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function validateField(field) {
    const value = field.value.trim();
    const parent = field.parentElement;
    
    // Remove existing validation classes
    parent.classList.remove('valid', 'invalid');
    
    if (!value) return;
    
    let isValid = true;
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (field.type === 'tel') {
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        isValid = phoneRegex.test(value.replace(/\s/g, ''));
    } else if (field.required) {
        isValid = value.length >= 2;
    }
    
    parent.classList.add(isValid ? 'valid' : 'invalid');
}

// WhatsApp Button Enhancement
function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (!whatsappBtn) return;

    // Add ripple effect on click
    whatsappBtn.addEventListener('click', function(e) {
        const ripple = this.querySelector('.ripple-effect');
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        setTimeout(() => {
            ripple.style.animation = '';
        }, 600);
    });

    // Pulse animation every 5 seconds
    setInterval(() => {
        whatsappBtn.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            whatsappBtn.style.animation = '';
        }, 1000);
    }, 5000);
}

// Initialize WhatsApp button
document.addEventListener('DOMContentLoaded', initWhatsAppButton);

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close floating menu
        const floatingMenu = document.getElementById('floatingMenu');
        if (floatingMenu && floatingMenu.classList.contains('active')) {
            floatingMenu.classList.remove('active');
            document.getElementById('menuToggle').querySelector('i').style.transform = 'rotate(0deg)';
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll event logic here
}, 10));

// Export functions for potential external use
window.SachivaUI = {
    initUIEnhancements,
    initScrollIndicator,
    initFloatingMenu,
    validateField
};
