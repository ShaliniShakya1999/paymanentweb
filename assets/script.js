// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.feature-card, .service-card, .step-item, .service-item-card, .onboarding-step').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            if (target % 1 === 0) {
                element.textContent = Math.floor(start).toLocaleString();
            } else {
                element.textContent = start.toFixed(1);
            }
        }
    }, 16);
}

// Initialize counters when hero section is visible
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(heroStats);
}

// Initialize counters for Stats Section
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stats-card .stats-number[data-target]');
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsSectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsSectionObserver.observe(statsSection);
}

// Testimonials slider
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const navDots = document.querySelectorAll('.nav-dot');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    
    navDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Auto-play testimonials
let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Manual navigation
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    });
});

// Stagger animation for feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Stagger animation for service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// Stagger animation for service item cards
const serviceItemCards = document.querySelectorAll('.service-item-card');
serviceItemCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
});

// Stagger animation for onboarding steps
document.querySelectorAll('.onboarding-step').forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.12}s`;
});

// Stagger animation for steps
const stepItems = document.querySelectorAll('.step-item');
stepItems.forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.2}s`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Chart bar animation
const chartBars = document.querySelectorAll('.chart-bar');
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            chartBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'growBar 0.8s ease-out forwards';
                }, index * 100);
            });
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const demoChart = document.querySelector('.demo-chart');
if (demoChart) {
    chartObserver.observe(demoChart);
}

// Initialize on load
window.addEventListener('load', () => {
    // Show first testimonial
    if (testimonialCards.length > 0) {
        showTestimonial(0);
    }
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-stats');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    });
});

// Benefits Tabs Functionality
const tabsData = [
    {
        image: "image/AEPS.png",
        title: "Aadhaar Enabled Payment System",
        description: "Empowering Access. Simplifying Transactions. Paymanent's AEPS solution delivers secure, Aadhaar-authenticated banking services—enabling seamless cash withdrawals, balance inquiries, and fund transfers without a debit card.",
        features: ["Secure & Compliant", "Instant Processing", "24/7 Availability"]
    },
    {
        image: "image/Utility_Payments.png",
        title: "Smart Bill Payment Gateway",
        description: "Simplified Billing. Unified Platform. Paymanent's BBPS service offers a secure, integrated solution for hassle-free utility bill payments including electricity, water, gas, DTH, broadband and more.",
        features: ["Multi-Biller Support", "Real-time Confirmation", "Auto Payment"]
    },
    {
        image: "image/Payment_Collection.png",
        title: "QR Code Payment Suite",
        description: "Scan. Pay. Done. Unlock seamless transactions with Paymanent's QR Code Payment Suite—perfect for retail stores, restaurants, and all business scenarios requiring instant payment collection.",
        features: ["Instant Settlement", "Dynamic QR", "Multi-Platform"]
    },
    {
        image: "image/Money_Transfer.png",
        title: "Global Remittance Network",
        description: "Transfer Funds. Transcend Borders. Paymanent's Global Remittance Network enables fast, secure, and compliant cross-border money transfers with competitive exchange rates.",
        features: ["Low Fees", "Fast Transfer", "150+ Countries"]
    },
    {
        image: "image/Travel_Booking.png",
        title: "Smart Travel Solutions",
        description: "Plan, Book, and Embark with Confidence. Seamless travel booking services including flights, buses, and hotels with instant confirmation and competitive prices.",
        features: ["Best Prices", "Instant Booking", "24/7 Support"]
    }
];

const tabBtns = document.querySelectorAll('.tab-btn');
const tabServiceImg = document.getElementById('tabServiceImg');
const tabTitle = document.getElementById('tabTitle');
const tabDescription = document.getElementById('tabDescription');
const tabContentBox = document.querySelector('.tab-content-box');
const tabFeatures = document.getElementById('tabFeatures');

if (tabBtns.length > 0 && tabServiceImg && tabTitle && tabDescription) {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Get data index
            const index = parseInt(btn.getAttribute('data-index'));
            const data = tabsData[index];

            // Add animation class
            if (tabContentBox) {
                tabContentBox.classList.remove('fade-in');
                void tabContentBox.offsetWidth; // Trigger reflow
                tabContentBox.classList.add('fade-in');
            }

            // Update image
            tabServiceImg.src = data.image;
            tabServiceImg.alt = data.title;
            
            // Update content
            tabTitle.textContent = data.title;
            tabDescription.textContent = data.description;

            // Update features if element exists
            if (tabFeatures) {
                tabFeatures.innerHTML = data.features.map(feature => 
                    `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
                ).join('');
            }
        });
    });
}
