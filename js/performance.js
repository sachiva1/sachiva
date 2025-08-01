// Performance Optimization Script for Sachiva Website
// Implements lazy loading, service worker registration, and performance monitoring

document.addEventListener('DOMContentLoaded', function() {
  // Initialize performance optimizations
  initPerformanceOptimizations();
});

function initPerformanceOptimizations() {
  // Register service worker
  registerServiceWorker();
  
  // Initialize lazy loading
  initLazyLoading();
  
  // Optimize images
  optimizeImages();
  
  // Monitor performance
  monitorPerformance();
  
  // Preload critical resources
  preloadCriticalResources();
}

// Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('ServiceWorker registered successfully:', registration.scope);
        })
        .catch(function(error) {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }
}

// Lazy Loading Implementation
function initLazyLoading() {
  // Intersection Observer for lazy loading
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    });
  }
}

// Image Optimization
function optimizeImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(function(img) {
    // Add loading attribute for native lazy loading
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add error handling
    img.addEventListener('error', function() {
      console.warn('Failed to load image:', img.src);
      // Optionally set a fallback image
      // img.src = '/images/placeholder.jpg';
    });
    
    // Add load event for performance tracking
    img.addEventListener('load', function() {
      img.classList.add('loaded');
    });
  });
}

// Performance Monitoring
function monitorPerformance() {
  // Web Vitals monitoring
  if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver(function(entryList) {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver(function(entryList) {
      const entries = entryList.getEntries();
      entries.forEach(function(entry) {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Monitor Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver(function(entryList) {
      const entries = entryList.getEntries();
      entries.forEach(function(entry) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }

  // Navigation timing
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart);
      console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.fetchStart);
      console.log('First Paint:', performance.getEntriesByType('paint')[0]?.startTime);
    }, 0);
  });
}

// Preload Critical Resources
function preloadCriticalResources() {
  const criticalResources = [
    '/css/bootstrap.css',
    '/js/jquery-3.4.1.min.js',
    '/images/logo_blue.png'
  ];

  criticalResources.forEach(function(resource) {
    const link = document.createElement('link');
    link.rel = 'preload';
    
    if (resource.endsWith('.css')) {
      link.as = 'style';
    } else if (resource.endsWith('.js')) {
      link.as = 'script';
    } else if (resource.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
      link.as = 'image';
    }
    
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Resource Hints for External Resources
function addResourceHints() {
  const externalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdnjs.cloudflare.com'
  ];

  externalDomains.forEach(function(domain) {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = '//' + domain;
    document.head.appendChild(link);
  });
}

// Call resource hints
addResourceHints();

// Page Visibility API for performance optimization
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    // Page is hidden, pause non-critical operations
    console.log('Page hidden - pausing non-critical operations');
  } else {
    // Page is visible, resume operations
    console.log('Page visible - resuming operations');
  }
});

// Connection type optimization
if ('connection' in navigator) {
  const connection = navigator.connection;
  
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    // Optimize for slow connections
    document.body.classList.add('slow-connection');
    console.log('Slow connection detected - optimizing experience');
  }
}

// Error handling for performance script
window.addEventListener('error', function(event) {
  console.error('Performance script error:', event.error);
});

// Export functions for potential use in other scripts
window.SachivaPerformance = {
  initLazyLoading: initLazyLoading,
  optimizeImages: optimizeImages,
  monitorPerformance: monitorPerformance
};
