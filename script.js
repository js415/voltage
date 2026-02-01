// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .about-content, .stat-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Toggle product specifications
function toggleSpecs(button) {
    const productCard = button.closest('.product-card');
    if (!productCard) {
        console.error('Product card not found');
        return;
    }
    
    const specsFull = productCard.querySelector('.specs-full');
    if (!specsFull) {
        console.error('Specs full element not found');
        return;
    }
    
    const isExpanded = specsFull.classList.contains('show');
    
    if (isExpanded) {
        // Collapse
        specsFull.classList.remove('show');
        button.textContent = 'Learn More →';
    } else {
        // Expand
        specsFull.classList.add('show');
        button.textContent = 'Show Less ←';
    }
}

// Make function globally available
window.toggleSpecs = toggleSpecs;

// Also initialize on DOM ready as backup
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all buttons are properly set up
    const productButtons = document.querySelectorAll('.product-link-btn');
    productButtons.forEach(button => {
        if (!button.onclick) {
            button.addEventListener('click', function() {
                toggleSpecs(this);
            });
        }
    });
});
