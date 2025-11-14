// ===================================
// MENU FILTERING
// ===================================
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCategories = document.querySelectorAll('.menu-category');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter categories
        menuCategories.forEach(cat => {
            const catCategory = cat.getAttribute('data-category');
            
            if (category === 'all' || catCategory === category) {
                cat.classList.remove('hidden');
                // Add animation
                const items = cat.querySelectorAll('.menu-item');
                items.forEach((item, index) => {
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = `fadeInScale 0.2s ease ${index * 0.01}s both`;
                    }, 10);
                });
            } else {
                cat.classList.add('hidden');
            }
        });
        
        // Smooth scroll to first visible category
        setTimeout(() => {
            const firstVisible = document.querySelector('.menu-category:not(.hidden)');
            if (firstVisible && category !== 'all') {
                const yOffset = -120;
                const y = firstVisible.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 100);
    });
});

// ===================================
// SEARCH FUNCTIONALITY (Optional)
// ===================================
function searchMenu(query) {
    const searchTerm = query.toLowerCase();
    const allMenuItems = document.querySelectorAll('.menu-item');
    
    allMenuItems.forEach(item => {
        const itemName = item.querySelector('.item-name').textContent.toLowerCase();
        const itemDescription = item.querySelector('.item-description')?.textContent.toLowerCase() || '';
        
        if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
            item.style.display = 'block';
            item.classList.add('filtered');
        } else {
            item.style.display = 'none';
        }
    });
}

// ===================================
// DIETARY FILTER (Optional Enhancement)
// ===================================
function filterByDietary(type) {
    const allMenuItems = document.querySelectorAll('.menu-item');
    
    allMenuItems.forEach(item => {
        const tags = item.querySelectorAll('.tag');
        let hasTag = false;
        
        tags.forEach(tag => {
            if (tag.classList.contains(type)) {
                hasTag = true;
            }
        });
        
        if (type === 'all' || hasTag) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ===================================
// MENU ITEM CLICK (Optional - Show Details Modal)
// ===================================
const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Add subtle feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // You can add modal functionality here to show more details
        // or add to cart functionality
    });
});

// ===================================
// SMOOTH REVEAL ON SCROLL - INSTANT
// ===================================
const menuObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '50px 0px 0px 0px'
});

// Observe menu items - FAST
document.querySelectorAll('.menu-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(15px)';
    item.style.transition = `all 0.25s ease ${index * 0.01}s`;
    menuObserver.observe(item);
});

// Observe category headers - FAST
document.querySelectorAll('.category-header').forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(15px)';
    header.style.transition = 'all 0.25s ease';
    menuObserver.observe(header);
});

// ===================================
// HIGHLIGHT SPICE LEVELS
// ===================================
function highlightSpiceLevel() {
    const spicyTags = document.querySelectorAll('.tag.spicy');
    spicyTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
        });
    });
}

highlightSpiceLevel();

// ===================================
// PRINT MENU FUNCTIONALITY
// ===================================
function printMenu() {
    window.print();
}

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top glass-card';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    color: var(--gold);
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// LOADING STATE
// ===================================
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
});

