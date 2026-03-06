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

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Ensure all product buttons are properly set up
    const productButtons = document.querySelectorAll('.product-link-btn');
    productButtons.forEach(button => {
        if (!button.onclick) {
            button.addEventListener('click', function() {
                toggleSpecs(this);
            });
        }
    });
});

// Chatbot
(function() {
    const panel = document.getElementById('chatbot-panel');
    const toggle = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');
    const messagesEl = document.getElementById('chatbot-messages');

    const replies = {
        stabilizer: 'We offer AC stabilizers (TDI, DV, WM, LS series), refrigerator stabilizers (AM series), mainline & double phase stabilizers up to 20 KVA, and servo voltage stabilizers (2–500 KVA). For 1.5 ton AC we recommend TDI 4000 or DV 480. Check the Products section for details and MRP.',
        ac: 'For 1.5 ton AC: TDI 4000 (₹6,490), DV 480 (₹9,990), WM 4000 (₹2,890), LS 4000 (₹4,990). For 2 ton: TDI 5000, DV 580, LS 5000. Choose 80V–300V range if you face low voltage often.',
        cooler: 'Our air coolers: WINDSOR (75L), MAXCOOL (100L), VICTORIA (100L), CRYSTA Glass Top (110L), HAMMER Commercial (120L), MAHARAJA (150L). All have honey comb, ice chamber, oscillating louvers, and castor wheels. See Products → Air Coolers.',
        contact: 'Contact JSE Classic: Phone +91 91403 30041, +91 94510 53945, +91 93359 87539, +91 96218 15538. Email: gsiddharth833@gmail.com, Contact@classicappl.in. Address: 36/5/C, Minto Road, Prayagraj (U.P.). Website: www.classicappl.in',
        warranty: 'We offer a replacement policy on stabilizers. For exact warranty and replacement terms, please call or email us—we’ll be happy to help.',
        price: 'Stabilizer MRPs are on the website (e.g. TDI 4000 ₹6,490, DV 480 ₹9,990). Cooler specs and details are under Products. For latest prices and offers, call or email us.',
        default: 'Thanks for your message. For product details, check our Products section. For contact: call +91 91403 30041 or email Contact@classicappl.in. You can also ask me about "stabilizer", "cooler", "contact", or "warranty".'
    };

    function getReply(text) {
        const t = text.toLowerCase().trim();
        if (/\b(stabilizer|stabiliser|voltage)\b/.test(t)) return replies.stabilizer;
        if (/\b(ac|air conditioner|1\.5 ton|2 ton)\b/.test(t)) return replies.ac;
        if (/\b(cooler|coolers|air cooler)\b/.test(t)) return replies.cooler;
        if (/\b(contact|phone|email|address|call)\b/.test(t)) return replies.contact;
        if (/\b(warranty|replacement|repair)\b/.test(t)) return replies.warranty;
        if (/\b(price|cost|mrp|rate)\b/.test(t)) return replies.price;
        return replies.default;
    }

    function appendMsg(content, isUser) {
        const div = document.createElement('div');
        div.className = 'chatbot-msg ' + (isUser ? 'user' : 'bot');
        const p = document.createElement('p');
        p.textContent = content;
        div.appendChild(p);
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function send() {
        const text = (input.value || '').trim();
        if (!text) return;
        appendMsg(text, true);
        input.value = '';
        setTimeout(() => {
            appendMsg(getReply(text), false);
        }, 400);
    }

    function openPanel() {
        if (panel) {
            panel.classList.add('open');
            panel.setAttribute('aria-hidden', 'false');
            input.focus();
        }
    }

    function closePanel() {
        if (panel) {
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
        }
    }

    if (toggle) toggle.addEventListener('click', openPanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (sendBtn) sendBtn.addEventListener('click', send);
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') send();
        });
    }
})();
