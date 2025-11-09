// ============================================
// PREDAIOT Website - Scroll Animations
// ============================================

class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.setupObserver();
        // Initial check for elements already in viewport
        this.checkElements();
    }

    setupObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    // Optional: Stop observing after animation
                    // this.observer.unobserve(entry.target);
                }
            });
        }, options);

        this.animatedElements.forEach(el => {
            this.observer.observe(el);
        });
    }

    checkElements() {
        this.animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            if (isVisible) {
                el.classList.add('aos-animate');
            }
        });
    }
}

// Navbar scroll effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar'); // Use class, not ID
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Counter animation for stats
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        if (this.counters.length === 0) return;

        const options = {
            threshold: 0.7,
            once: true // Only animate once
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, options);

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const targetText = element.getAttribute('data-target') || element.textContent.trim();
        const numberMatch = targetText.match(/[\d,.]+/);
        if (!numberMatch) return;

        const rawNumber = numberMatch[0].replace(/,/g, '');
        const targetNumber = parseFloat(rawNumber);
        if (isNaN(targetNumber)) return;

        const prefix = targetText.split(numberMatch[0])[0]; // e.g., "$", "+", "OMR "
        const suffix = targetText.includes('%') ? '%' : (targetText.includes('B') ? 'B' : (targetText.includes('M') ? 'M' : ''));

        const duration = 2200;
        const steps = 60;
        const increment = targetNumber / steps;
        const stepDuration = duration / steps;

        let current = 0;
        const isCurrency = prefix.includes('$') || prefix.includes('OMR');

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
            }

            let displayValue = this.formatNumber(current, isCurrency);
            element.textContent = prefix + displayValue + suffix;
        }, stepDuration);

        // Start with 0
        element.textContent = prefix + '0' + suffix;
    }

    formatNumber(num, isCurrency) {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else {
            return isCurrency ? num.toFixed(0) : Math.floor(num).toLocaleString();
        }
    }
}

// Mobile Menu Toggle (Hamburger)
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) return;

        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new NavbarScroll();
    new CounterAnimation();
    new MobileMenu();
});