// ===================================
// NAVIGATION
// ===================================
const nav = document.getElementById('mainNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect for nav
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
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

// ===================================
// HORIZONTAL SCROLL FOR DISHES
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
    
    // Get all dish cards
    const dishCards = dishesTrack.querySelectorAll('.dish-card');
    const totalCards = 4; // Always 4 dishes
    
    function updatePosition() {
        if (isMobile) {
            const cardWidth = window.innerWidth * 0.95; // 90vw + 5vw gap
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
    
    // Scroll left
    scrollLeftBtn.addEventListener('click', () => {
        if (isMobile) {
            // Clear auto-scroll when user manually controls
            clearInterval(autoScrollInterval);
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updatePosition();
            // Restart auto-scroll after 5 seconds
            setTimeout(() => {
                autoScrollInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updatePosition();
                }, 2000);
            }, 5000);
        } else {
            scrollContainer.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        }
    });

    // Scroll right
    scrollRightBtn.addEventListener('click', () => {
        if (isMobile) {
            // Clear auto-scroll when user manually controls
            clearInterval(autoScrollInterval);
            currentIndex = (currentIndex + 1) % totalCards;
            updatePosition();
            // Restart auto-scroll after 5 seconds
            setTimeout(() => {
                autoScrollInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updatePosition();
                }, 2000);
            }, 5000);
        } else {
            scrollContainer.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
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
            // Pause auto-scroll during touch
            clearInterval(autoScrollInterval);
        });
        
        dishesTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            // Restart auto-scroll after swipe
            setTimeout(() => {
                autoScrollInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalCards;
                    updatePosition();
                }, 2000);
            }, 5000);
        });
        
        function handleSwipe() {
            if (touchStartX - touchEndX > 50) {
                // Swipe left
                currentIndex = (currentIndex + 1) % totalCards;
                updatePosition();
            }
            
            if (touchEndX - touchStartX > 50) {
                // Swipe right
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
// INTERSECTION OBSERVER FOR ANIMATIONS - INSTANT
// ===================================
const observerOptions = {
    threshold: 0.05,
    rootMargin: '50px 0px 0px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all glass cards - FAST animations
document.querySelectorAll('.glass-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(15px)';
    card.style.transition = `all 0.25s ease ${index * 0.01}s`;
    observer.observe(card);
});

// ===================================
// VIDEO BACKGROUND OPTIMIZATION
// ===================================
const video = document.getElementById('bgVideo');

// Optimize video for performance
if (video) {
    // Reduce quality on mobile for better performance
    if (window.innerWidth < 768) {
        video.playbackRate = 1;
        video.setAttribute('preload', 'metadata');
    } else {
        video.setAttribute('preload', 'auto');
    }

    // Pause video when not in viewport (mobile optimization)
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });

    videoObserver.observe(video);

    // Ensure video plays on load
    video.play().catch(err => {
        console.log('Video autoplay prevented:', err);
    });
}

// ===================================
// LAZY LOADING IMAGES
// ===================================
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    // You can use this for a progress bar if needed
    // document.getElementById('progressBar').style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ===================================
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

// ===================================
// PAGE LOADER - HIDE AFTER CONTENT LOADS
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    // Hide loader after 500ms
    setTimeout(() => {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 500);
});

// ===================================
// PRELOAD CRITICAL RESOURCES
// ===================================
window.addEventListener('load', () => {
    // Preload menu page
    const menuLink = document.createElement('link');
    menuLink.rel = 'prefetch';
    menuLink.href = 'menu.html';
    document.head.appendChild(menuLink);
    
    // Preload blog page
    const blogLink = document.createElement('link');
    blogLink.rel = 'prefetch';
    blogLink.href = 'blog.html';
    document.head.appendChild(blogLink);
});

// ===================================
// STATS COUNTER ANIMATION
// ===================================
function animateCounter(element, target) {
    const duration = 2000;
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

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const value = parseInt(stat.textContent);
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
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    });
}

// ===================================
// SERVICE WORKER REGISTRATION (PWA Ready)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

