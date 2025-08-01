/* Mobile Interactions and Touch Gestures - Issue #41 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Enhancement
    function initMobileNavigation() {
        const navToggler = document.querySelector('.navbar-toggler');
        const navCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Enhanced mobile menu toggle
        if (navToggler && navCollapse) {
            navToggler.addEventListener('click', function() {
                const isExpanded = navToggler.getAttribute('aria-expanded') === 'true';
                
                // Add smooth animation
                if (!isExpanded) {
                    navCollapse.style.display = 'block';
                    setTimeout(() => {
                        navCollapse.classList.add('show');
                    }, 10);
                } else {
                    navCollapse.classList.remove('show');
                    setTimeout(() => {
                        navCollapse.style.display = 'none';
                    }, 300);
                }
            });
            
            // Close menu when clicking nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        navCollapse.classList.remove('show');
                        setTimeout(() => {
                            navCollapse.style.display = 'none';
                        }, 300);
                        navToggler.setAttribute('aria-expanded', 'false');
                    }
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && 
                    !navToggler.contains(e.target) && 
                    !navCollapse.contains(e.target) &&
                    navCollapse.classList.contains('show')) {
                    navCollapse.classList.remove('show');
                    setTimeout(() => {
                        navCollapse.style.display = 'none';
                    }, 300);
                    navToggler.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    // Touch Gesture Support for Carousels
    function initTouchGestures() {
        const carousel = document.querySelector('.owl-carousel');
        if (!carousel) return;
        
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        });
        
        carousel.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Prevent vertical scrolling when swiping horizontally
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
            }
        });
        
        carousel.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Minimum swipe distance
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    triggerCarouselNext();
                } else {
                    // Swipe right - previous slide
                    triggerCarouselPrev();
                }
            }
            
            isDragging = false;
        });
        
        function triggerCarouselNext() {
            const nextBtn = carousel.querySelector('.owl-next');
            if (nextBtn) nextBtn.click();
        }
        
        function triggerCarouselPrev() {
            const prevBtn = carousel.querySelector('.owl-prev');
            if (prevBtn) prevBtn.click();
        }
    }
    
    // Enhanced Floating Menu for Mobile
    function initFloatingMenu() {
        const floatingMenu = document.getElementById('floatingMenu');
        const menuToggle = document.getElementById('menuToggle');
        
        if (!floatingMenu || !menuToggle) return;
        
        let isMenuOpen = false;
        
        menuToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                floatingMenu.classList.add('active');
                menuToggle.style.transform = 'rotate(45deg)';
                
                // Add haptic feedback on supported devices
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            } else {
                floatingMenu.classList.remove('active');
                menuToggle.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!floatingMenu.contains(e.target) && isMenuOpen) {
                floatingMenu.classList.remove('active');
                menuToggle.style.transform = 'rotate(0deg)';
                isMenuOpen = false;
            }
        });
        
        // Close menu when clicking menu items
        const floatingItems = floatingMenu.querySelectorAll('.floating-item');
        floatingItems.forEach(item => {
            item.addEventListener('click', () => {
                floatingMenu.classList.remove('active');
                menuToggle.style.transform = 'rotate(0deg)';
                isMenuOpen = false;
            });
        });
    }
    
    // Form Enhancement for Mobile
    function initMobileFormEnhancements() {
        const formInputs = document.querySelectorAll('.modern-form input, .modern-form textarea');
        
        formInputs.forEach(input => {
            // Add focus/blur animations
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                
                // Add gentle haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
            });
            
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                const isValid = this.checkValidity();
                this.parentElement.classList.toggle('valid', isValid && this.value.trim());
                this.parentElement.classList.toggle('invalid', !isValid && this.value.trim());
            });
        });
        
        // Form submission with loading state
        const submitBtn = document.querySelector('.submit-btn');
        const form = document.querySelector('.modern-form');
        
        if (form && submitBtn) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Show loading state
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Haptic feedback for successful submission
                if (navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }
                
                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                    submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                        
                        // Remove validation classes
                        formInputs.forEach(input => {
                            input.parentElement.classList.remove('focused', 'valid', 'invalid');
                        });
                    }, 2000);
                }, 1500);
            });
        }
    }
    
    // Smooth Scroll Enhancement for Mobile
    function initSmoothScrolling() {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header_section').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Haptic feedback
                    if (navigator.vibrate) {
                        navigator.vibrate(40);
                    }
                }
            });
        });
    }
    
    // Mobile Performance Optimizations
    function initMobileOptimizations() {
        // Lazy loading for images on mobile
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Optimize touch events
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
        } catch(err) {}
        
        const passiveOption = passiveSupported ? { passive: true } : false;
        
        // Add passive event listeners for better scroll performance
        document.addEventListener('touchstart', function() {}, passiveOption);
        document.addEventListener('touchmove', function() {}, passiveOption);
    }
    
    // Device Orientation Handler
    function initOrientationHandler() {
        function handleOrientationChange() {
            // Force redraw after orientation change
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
                
                // Recalculate carousel if present
                const owlCarousel = $('.owl-carousel');
                if (owlCarousel.length && typeof owlCarousel.trigger === 'function') {
                    owlCarousel.trigger('refresh.owl.carousel');
                }
            }, 300);
        }
        
        window.addEventListener('orientationchange', handleOrientationChange);
        screen.orientation?.addEventListener('change', handleOrientationChange);
    }
    
    // Mobile Accessibility Enhancements
    function initMobileAccessibility() {
        // Add focus indicators for keyboard navigation
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.classList.add('keyboard-focus');
            });
            
            element.addEventListener('blur', function() {
                this.classList.remove('keyboard-focus');
            });
            
            // Remove focus class on mouse down
            element.addEventListener('mousedown', function() {
                this.classList.remove('keyboard-focus');
            });
        });
        
        // Announce page changes for screen readers
        const headings = document.querySelectorAll('h1, h2');
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        // Intersection observer for announcing sections
        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        const heading = entry.target.querySelector('h1, h2');
                        if (heading) {
                            announcer.textContent = `Now viewing: ${heading.textContent}`;
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            document.querySelectorAll('section').forEach(section => {
                sectionObserver.observe(section);
            });
        }
    }
    
    // Check if device is mobile
    function isMobileDevice() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Initialize all mobile enhancements
    if (isMobileDevice()) {
        initMobileNavigation();
        initTouchGestures();
        initFloatingMenu();
        initMobileFormEnhancements();
        initSmoothScrolling();
        initMobileOptimizations();
        initOrientationHandler();
        initMobileAccessibility();
        
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        console.log('Mobile responsiveness enhancements initialized');
    }
    
    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (isMobileDevice() && !document.body.classList.contains('mobile-device')) {
                location.reload(); // Reload if switching to mobile
            } else if (!isMobileDevice() && document.body.classList.contains('mobile-device')) {
                location.reload(); // Reload if switching to desktop
            }
        }, 250);
    });
});
