// ===================================
// DISHOOM-STYLE ANIMATIONS
// HIGH PERFORMANCE
// ===================================

// ===================================
// PAGE LOADER
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 500);
});

// ===================================
// NAVIGATION - APPEARS ON SCROLL
// ===================================
const nav = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Show nav after scrolling past hero
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        nav.classList.add('show-nav');
    } else {
        nav.classList.remove('show-nav');
    }
});

// Mobile menu toggle
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ===================================
// HORIZONTAL SCROLL FOR DISHES - HIGH PERFORMANCE
// ===================================
const dishesTrack = document.getElementById('dishesTrack');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');
const scrollContainer = document.querySelector('.dishes-scroll-container');

if (scrollLeftBtn && scrollRightBtn && dishesTrack) {
    let currentIndex = 0;
    const isMobile = window.innerWidth <= 768;
    let autoScrollInterval;
    
    const totalCards = 4;
    
    function updatePosition() {
        if (isMobile) {
            const cardWidth = window.innerWidth * 0.95;
            const offset = -(currentIndex * cardWidth);
            dishesTrack.style.transform = `translateX(${offset}px)`;
        } else {
            const cardWidth = 410;
            const offset = -(currentIndex * cardWidth);
            dishesTrack.style.transform = `translateX(${offset}px)`;
        }
    }
    
    scrollLeftBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updatePosition();
    });

    scrollRightBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updatePosition();
    });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// SCROLL REVEAL ANIMATIONS - INSTANT & HIGH PERFORMANCE
// ===================================
const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation for performance
            scrollRevealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px 0px 0px 0px'
});

// Observe all scroll-reveal elements
document.querySelectorAll('.scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up').forEach(element => {
    scrollRevealObserver.observe(element);
});

// ===================================
// CHEF VIDEO - PLAYS ON SCROLL INTO VIEW
// ===================================
const chefVideo = document.querySelector('.chef-video-container video');
const chefVideoContainer = document.getElementById('chefVideo');
const chefContent = document.getElementById('chefContent');

if (chefVideo && chefVideoContainer && chefContent) {
    const chefObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chefVideoContainer.classList.add('visible');
                chefContent.classList.add('visible');
                chefVideo.play().catch(err => console.log('Video play prevented:', err));
            } else {
                chefVideo.pause();
            }
        });
    }, { threshold: 0.3 });
    
    chefObserver.observe(chefVideoContainer);
}

// ===================================
// CARD HOVER - PLAY VIDEO (ALL CARDS)
// ===================================
document.querySelectorAll('.dish-card, .image-card-dishoom, .feature-image-large, .hero-nav-card, .card-image-wrapper').forEach(card => {
    const videos = card.querySelectorAll('video');
    videos.forEach(video => {
        if (!video.closest('.video-card-bg')) {
            card.addEventListener('mouseenter', () => {
                video.play().catch(err => console.log('Video play prevented:', err));
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
});

// ===================================
// COOK IMAGE - SLIDE IN ANIMATION
// ===================================
const cookImage = document.getElementById('cookImage');
const cookContent = document.getElementById('cookContent');

if (cookImage && cookContent) {
    const cookObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cookContent.classList.add('visible');
                cookImage.classList.add('visible');
                cookObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '50px 0px 0px 0px' });
    
    cookObserver.observe(cookImage);
}

// ===================================
// FEATURE GRAPHICS - MULTIPLE SLIDE INS
// ===================================
const tandooriFeature = document.getElementById('tandooriFeature');
const baltiFeature = document.getElementById('baltiFeature');
const lambFeature = document.getElementById('lambFeature');

[tandooriFeature, baltiFeature, lambFeature].forEach(element => {
    if (element) {
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0) scale(1)';
                    featureObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '50px 0px 0px 0px' });
        
        element.style.opacity = '0';
        element.style.transform = element.classList.contains('scroll-reveal-left') ? 
            'translateX(-100px) scale(0.95)' : 'translateX(100px) scale(0.95)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        featureObserver.observe(element);
    }
});

// ===================================
// PRELOAD CRITICAL RESOURCES
// ===================================
window.addEventListener('load', () => {
    const menuLink = document.createElement('link');
    menuLink.rel = 'prefetch';
    menuLink.href = 'menu.html';
    document.head.appendChild(menuLink);
    
    const blogLink = document.createElement('link');
    blogLink.rel = 'prefetch';
    blogLink.href = 'blog.html';
    document.head.appendChild(blogLink);
});

// ===================================
// STATS COUNTER ANIMATION - FAST
// ===================================
function animateCounter(element, target) {
    const duration = 1500;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent.replace(/[+,]/g, '');
                const value = parseInt(text);
                animateCounter(stat, value);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navLinks) {
            navLinks.classList.remove('active');
        }
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    }
});

// ===================================
// PERFORMANCE: PASSIVE EVENT LISTENERS
// ===================================
const passiveSupported = () => {
    let passiveSupported = false;
    try {
        const options = {
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
};

// ===================================
// REDUCE MOTION PREFERENCE
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// ===================================
// INTERSECTION OBSERVER POLYFILL CHECK
// ===================================
if (!('IntersectionObserver' in window)) {
    // Fallback: immediately show all elements
    document.querySelectorAll('.scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up').forEach(el => {
        el.classList.add('visible');
    });
}

// ===================================
// PERFORMANCE MONITORING
// ===================================
if ('performance' in window && window.location.hostname === 'localhost') {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
        }
    });
}
