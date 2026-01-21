// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background when scrolling down
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.post-card, .category-card, .laptop-review').forEach(el => {
    observer.observe(el);
});

// Newsletter Form Submission
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            // Show success message
            showNotification('Thanks for subscribing! You\'ll receive weekly tech deals.', 'success');
            this.reset();
        }
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            // Simulate form submission
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        background: ${type === 'success' ? 'hsl(120 100% 40%)' : type === 'error' ? 'hsl(0 100% 60%)' : 'hsl(180 100% 50%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Reading Progress Bar (for article pages)
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, hsl(180 100% 50%), hsl(330 100% 70%));
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const article = document.querySelector('.article-body');
        if (article) {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            const progress = Math.min(
                Math.max((scrollTop - articleTop + windowHeight / 2) / articleHeight * 100, 0),
                100
            );
            
            progressBar.style.width = `${progress}%`;
        }
    });
}

// Search Functionality (Basic)
function initSearch() {
    const searchBtn = document.createElement('button');
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    searchBtn.className = 'search-btn';
    searchBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, hsl(180 100% 50%), hsl(330 100% 70%));
        border: none;
        color: white;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 255, 255, 0.3);
        z-index: 1000;
        transition: transform 0.2s ease;
    `;
    
    searchBtn.addEventListener('mouseenter', () => {
        searchBtn.style.transform = 'scale(1.1)';
    });
    
    searchBtn.addEventListener('mouseleave', () => {
        searchBtn.style.transform = 'scale(1)';
    });
    
    searchBtn.addEventListener('click', () => {
        showNotification('Search functionality coming soon!', 'info');
    });
    
    document.body.appendChild(searchBtn);
}

// Table of Contents Auto-highlight
function initTOCHighlight() {
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const sections = document.querySelectorAll('section[id]');
    
    if (tocLinks.length === 0 || sections.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.color = 'hsl(180 100% 50%)';
                link.style.fontWeight = '600';
            } else {
                link.style.color = '';
                link.style.fontWeight = '';
            }
        });
    });
}

// Copy to Clipboard for Share URLs
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = window.location.href;
            const title = document.title;
            
            if (btn.classList.contains('whatsapp')) {
                window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
            } else if (btn.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            } else if (btn.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
            } else if (btn.classList.contains('linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
            }
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        imageObserver.observe(img);
    });
}

// Dark Mode Toggle (Additional feature)
function initDarkModeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    toggleBtn.className = 'dark-mode-toggle';
    toggleBtn.style.cssText = `
        position: fixed;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: hsl(218 23% 15%);
        border: 1px solid hsl(218 23% 20%);
        color: hsl(180 100% 50%);
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        toggleBtn.innerHTML = document.body.classList.contains('light-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        showNotification(
            document.body.classList.contains('light-mode') 
                ? 'Switched to light mode' 
                : 'Switched to dark mode', 
            'info'
        );
    });
    
    document.body.appendChild(toggleBtn);
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize reading progress for article pages
    if (document.querySelector('.article-body')) {
        initReadingProgress();
        initTOCHighlight();
    }
    
    // Initialize share buttons
    initShareButtons();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize search
    initSearch();
    
    // Initialize dark mode toggle
    initDarkModeToggle();
    
    // Add loading animation to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.href.includes(window.location.hostname)) {
                link.style.opacity = '0.7';
                setTimeout(() => {
                    link.style.opacity = '1';
                }, 200);
            }
        });
    });
    
    // Performance optimization - preload critical images
    const criticalImages = [
        'https://via.placeholder.com/600x400/1a1a1a/00ffff?text=Budget+Tech+for+Students',
        'https://via.placeholder.com/400x250/2a2a2a/00ffff?text=Budget+Laptops+2025'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error Handling for Images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'https://via.placeholder.com/400x250/2a2a2a/666666?text=Image+Not+Found';
        e.target.alt = 'Image not available';
    }
}, true);

// Analytics Event Tracking (placeholder)
function trackEvent(category, action, label) {
    // This would integrate with Google Analytics or other analytics services
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track important user interactions
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('Button', 'Click', 'Primary CTA');
    }
    if (e.target.closest('.post-card')) {
        trackEvent('Content', 'Click', 'Blog Post Card');
    }
    if (e.target.closest('.category-card')) {
        trackEvent('Navigation', 'Click', 'Category Card');
    }
});

// Scroll depth tracking
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
            trackEvent('Scroll', 'Depth', `${maxScroll}%`);
        }
    }
});
