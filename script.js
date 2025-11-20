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
// NAVIGATION
// ===================================
const nav = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

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
    
    // Duplicate dishes for infinite scroll effect on desktop
    if (!isMobile && dishesTrack) {
        const dishes = dishesTrack.innerHTML;
        dishesTrack.innerHTML += dishes;
    }
    
    const totalCards = 4;
    
    function updatePosition() {
        if (isMobile) {
            const cardWidth = window.innerWidth * 0.95;
            const offset = -(currentIndex * cardWidth);
            dishesTrack.style.transform = `translateX(${offset}px)`;
        } else {
            scrollContainer.scrollBy({
                left: currentIndex > 0 ? 400 : -400,
                behavior: 'smooth'
            });
        }
    }
    
    // Auto-scroll on mobile every 2 seconds
    if (isMobile) {
        autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updatePosition();
        }, 2000);
    }
    
    scrollLeftBtn.addEventListener('click', () => {
        if (isMobile) {
            clearInterval(autoScrollInterval);
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updatePosition();
            setTimeout(() => {
                autoScrollInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updatePosition();
                }, 2000);
            }, 5000);
        } else {
            scrollContainer.scrollBy({ left: -400, behavior: 'smooth' });
        }
    });

    scrollRightBtn.addEventListener('click', () => {
        if (isMobile) {
            clearInterval(autoScrollInterval);
            currentIndex = (currentIndex + 1) % totalCards;
            updatePosition();
            setTimeout(() => {
                autoScrollInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updatePosition();
                }, 2000);
            }, 5000);
        } else {
            scrollContainer.scrollBy({ left: 400, behavior: 'smooth' });
        }
    });

    // Pause auto-scroll on hover (desktop only)
    if (!isMobile && dishesTrack) {
        dishesTrack.addEventListener('mouseenter', () => {
            dishesTrack.style.animationPlayState = 'paused';
        });
        dishesTrack.addEventListener('mouseleave', () => {
            dishesTrack.style.animationPlayState = 'running';
        });
    }
    
    // Touch swipe support for mobile
    if (isMobile) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        dishesTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoScrollInterval);
        });
        
        dishesTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            setTimeout(() => {
                autoScrollInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updatePosition();
                }, 2000);
            }, 5000);
        });
        
        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                currentIndex = (currentIndex + 1) % totalCards;
                updatePosition();
            }
            if (touchEndX - touchStartX > 50) {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                updatePosition();
            }
        }
    }
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
