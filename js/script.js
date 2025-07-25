// ===== KIOS SOSMED - ULTRA MODERN JAVASCRIPT =====

// === CONFIGURATION ===
const CONFIG = {
whatsappNumber: ‘6285856618965’,
animationDuration: 300,
scrollThreshold: 100,
counterSpeed: 2000,
loadingDuration: 2500
};

// === UTILITIES ===
class Utils {
static debounce(func, wait) {
let timeout;
return function executedFunction(…args) {
const later = () => {
clearTimeout(timeout);
func(…args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}

```
static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

static easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

static animateValue(obj, start, end, duration, callback) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = Utils.easeOutQuart(progress);
        const currentValue = Math.floor(easedProgress * (end - start) + start);
        obj.textContent = currentValue.toLocaleString('id-ID');
        if (callback) callback(currentValue);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

static generateWhatsAppMessage(paket, harga, tipe) {
    let message = `🚀 *Halo Kios Sosmed!*\n\n`;
    message += `Saya tertarik untuk memesan layanan berikut:\n\n`;
    message += `📦 *Paket:* ${paket}\n`;
    message += `💰 *Harga:* ${harga}\n`;
    message += `📱 *Username/Handle:* [Silakan isi username Anda]\n`;
    
    if (tipe === 'likes' || tipe === 'views' || tipe.includes('paket')) {
        message += `🔗 *Link Post/Video:* [Silakan isi link konten Anda]\n`;
    }
    
    message += `\n✨ Mohon informasi lebih lanjut mengenai proses pembayaran.\n`;
    message += `Terima kasih! 🙏`;
    
    return message;
}
```

}

// === LOADING SCREEN MANAGER ===
class LoadingManager {
constructor() {
this.loadingScreen = document.getElementById(‘loadingScreen’);
this.loadingProgress = document.querySelector(’.loading-progress’);
this.init();
}

```
init() {
    if (!this.loadingScreen) return;
    
    // Animate loading progress
    setTimeout(() => {
        if (this.loadingProgress) {
            this.loadingProgress.style.width = '100%';
        }
    }, 500);

    // Hide loading screen after animation
    setTimeout(() => {
        this.hide();
    }, CONFIG.loadingDuration);
}

hide() {
    if (this.loadingScreen) {
        this.loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        
        // Remove element after transition
        setTimeout(() => {
            if (this.loadingScreen && this.loadingScreen.parentNode) {
                this.loadingScreen.remove();
            }
        }, 500);
    }
}
```

}

// === NAVIGATION MANAGER ===
class NavigationManager {
constructor() {
this.header = document.querySelector(’.modern-header’);
this.navToggle = document.getElementById(‘navToggle’);
this.navMenu = document.getElementById(‘navMenu’);
this.navLinks = document.querySelectorAll(’.nav-link’);
this.lastScrollY = window.scrollY;

```
    this.init();
}

init() {
    this.bindEvents();
    this.handleScroll();
}

bindEvents() {
    // Mobile menu toggle
    if (this.navToggle && this.navMenu) {
        this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Close mobile menu when clicking on links
    this.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
            this.closeMobileMenu();
        }
    });

    // Scroll handling with throttle
    window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 16));

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', this.handleSmoothScroll);
    });
}

toggleMobileMenu() {
    const isActive = this.navToggle.classList.contains('active');
    
    if (isActive) {
        this.closeMobileMenu();
    } else {
        this.openMobileMenu();
    }
}

openMobileMenu() {
    this.navToggle.classList.add('active');
    this.navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate menu items
    this.navLinks.forEach((link, index) => {
        link.style.animation = `slideInRight 0.3s ease-out ${index * 0.1}s both`;
    });
}

closeMobileMenu() {
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = 'visible';
    
    // Reset animations
    this.navLinks.forEach(link => {
        link.style.animation = '';
    });
}

handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScrollY > CONFIG.scrollThreshold) {
        this.header.classList.add('scrolled');
    } else {
        this.header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (currentScrollY > this.lastScrollY && currentScrollY > CONFIG.scrollThreshold) {
        this.header.style.transform = 'translateY(-100%)';
    } else {
        this.header.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
}

handleSmoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        const headerHeight = document.querySelector('.modern-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
```

}

// === ANIMATION MANAGER ===
class AnimationManager {
constructor() {
this.observedElements = new Set();
this.init();
}

```
init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.addCustomAnimations();
}

setupIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
                this.animateElement(entry.target);
                this.observedElements.add(entry.target);
            }
        });
    }, options);

    // Observe elements with animation attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        this.observer.observe(el);
    });
}

setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .stat-item');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        
        if (!el.hasAttribute('data-aos')) {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', (index * 100).toString());
            this.observer.observe(el);
        }
    });
}

animateElement(element) {
    const animationType = element.getAttribute('data-aos') || 'fade-up';
    const delay = parseInt(element.getAttribute('data-aos-delay')) || 0;

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add('aos-animate');
    }, delay);
}

addCustomAnimations() {
    // Add hover effects for cards
    document.querySelectorAll('.feature-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Floating animation for hero cards
    document.querySelectorAll('.floating-card').forEach((card, index) => {
        const delay = index * 2000;
        setInterval(() => {
            card.style.transform = `translateY(-20px) rotate(${Math.random() * 4 - 2}deg)`;
            setTimeout(() => {
                card.style.transform = 'translateY(0) rotate(0deg)';
            }, 1000);
        }, 6000 + delay);
    });
}
```

}

// === COUNTER MANAGER ===
class CounterManager {
constructor() {
this.counters = document.querySelectorAll(’.stat-number, .counter’);
this.init();
}

```
init() {
    if (this.counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateCounter(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    this.counters.forEach(counter => {
        this.observer.observe(counter);
    });
}

animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target')) || 0;
    const duration = CONFIG.counterSpeed;
    
    counter.textContent = '0';
    
    Utils.animateValue(counter, 0, target, duration, (currentValue) => {
        // Add special formatting for certain counters
        if (counter.closest('.stat-item')) {
            if (counter.textContent.includes('%')) {
                counter.textContent = currentValue + '%';
            } else if (target < 10) {
                counter.textContent = currentValue;
            } else {
                counter.textContent = currentValue.toLocaleString('id-ID');
            }
        }
    });
}
```

}

// === WHATSAPP MANAGER ===
class WhatsAppManager {
constructor() {
this.init();
}

```
init() {
    this.bindEvents();
}

bindEvents() {
    // Handle order buttons with event delegation
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn-pesan, .service-btn[href*="instagram"], .service-btn[href*="tiktok"]')) {
            e.preventDefault();
            this.handleOrderClick(e.target);
        }
    });
}

handleOrderClick(button) {
    let paket, harga, tipe;
    
    // Check if it's a service button
    if (button.classList.contains('service-btn')) {
        const serviceCard = button.closest('.service-card');
        if (serviceCard.classList.contains('instagram-service')) {
            paket = 'Layanan Instagram Premium';
            harga = 'Lihat Pricelist';
            tipe = 'service';
        } else if (serviceCard.classList.contains('tiktok-service')) {
            paket = 'Layanan TikTok Premium';
            harga = 'Lihat Pricelist';
            tipe = 'service';
        }
    } else {
        // Handle pricing card buttons
        const card = button.closest('.pricelist-card, .paket-hemat-card, .price-card');
        if (card) {
            paket = card.dataset.paket || card.querySelector('h3').textContent;
            harga = card.dataset.harga || card.querySelector('.harga, .price').textContent;
            tipe = card.dataset.tipe || 'general';
        }
    }

    if (paket && harga) {
        this.openWhatsApp(paket, harga, tipe);
    }
}

openWhatsApp(paket, harga, tipe) {
    const message = Utils.generateWhatsAppMessage(paket, harga, tipe);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
    
    // Add loading state to button
    const activeButton = document.querySelector('.btn-pesan:active, .service-btn:active');
    if (activeButton) {
        activeButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            activeButton.style.transform = '';
        }, 200);
    }
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Track event (if analytics is available)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'event_category': 'engagement',
            'event_label': paket,
            'value': harga
        });
    }
}
```

}

// === FAQ MANAGER ===
class FAQManager {
constructor() {
this.faqItems = document.querySelectorAll(’.faq-item’);
this.init();
}

```
init() {
    if (this.faqItems.length === 0) return;
    this.bindEvents();
}

bindEvents() {
    this.faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => this.toggleFAQ(item, answer));
        }
    });
}

toggleFAQ(item, answer) {
    const isActive = item.classList.contains('active');
    
    // Close all other FAQ items
    this.faqItems.forEach(faqItem => {
        if (faqItem !== item) {
            faqItem.classList.remove('active');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            if (faqAnswer) {
                faqAnswer.style.maxHeight = null;
            }
        }
    });
    
    // Toggle current item
    if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
    }
}
```

}

// === THEME MANAGER ===
class ThemeManager {
constructor() {
this.themeToggle = document.getElementById(‘toggle-theme’);
this.currentTheme = localStorage.getItem(‘theme’) || ‘light’;
this.init();
}

```
init() {
    this.applyTheme(this.currentTheme);
    if (this.themeToggle) {
        this.bindEvents();
    }
}

bindEvents() {
    this.themeToggle.addEventListener('click', () => {
        this.toggleTheme();
    });
}

toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
}

applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (this.themeToggle) {
        this.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}
```

}

// === PERFORMANCE MANAGER ===
class PerformanceManager {
constructor() {
this.init();
}

```
init() {
    this.lazyLoadImages();
    this.optimizeAnimations();
    this.addIntersectionObservers();
}

lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--transition-slow', '0.3s ease-out');
        document.documentElement.style.setProperty('--transition-normal', '0.2s ease-out');
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const particles = document.querySelectorAll('.particle');
        if (document.hidden) {
            particles.forEach(particle => {
                particle.style.animationPlayState = 'paused';
            });
        } else {
            particles.forEach(particle => {
                particle.style.animationPlayState = 'running';
            });
        }
    });
}

addIntersectionObservers() {
    // Pause expensive animations when not in viewport
    const expensiveElements = document.querySelectorAll('.floating-card, .particle');
    
    const expensiveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { rootMargin: '100px' });

    expensiveElements.forEach(el => expensiveObserver.observe(el));
}
```

}

// === MAIN APPLICATION ===
class KiosSosmedApp {
constructor() {
this.managers = {};
this.init();
}

```
async init() {
    // Wait for DOM to be ready
    await this.waitForDOM();
    
    // Initialize all managers
    this.initializeManagers();
    
    // Setup global event listeners
    this.setupGlobalEvents();
    
    // Initialize AOS (Animate On Scroll) if available
    this.initializeAOS();
    
    console.log('🚀 Kios Sosmed App initialized successfully!');
}

waitForDOM() {
    return new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    });
}

initializeManagers() {
    this.managers.loading = new LoadingManager();
    this.managers.navigation = new NavigationManager();
    this.managers.animation = new AnimationManager();
    this.managers.counter = new CounterManager();
    this.managers.whatsapp = new WhatsAppManager();
    this.managers.faq = new FAQManager();
    this.managers.theme = new ThemeManager();
    this.managers.performance = new PerformanceManager();
}

setupGlobalEvents() {
    // Handle form submissions
    document.addEventListener('submit', (e) => {
        if (e.target.matches('form')) {
            this.handleFormSubmit(e);
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            this.managers.navigation.closeMobileMenu();
        }
    });

    // Handle resize events
    window.addEventListener('resize', Utils.debounce(() => {
        this.handleResize();
    }, 250));

    // Handle scroll events for additional features
    window.addEventListener('scroll', Utils.throttle(() => {
        this.handleScroll();
    }, 16));
}

initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-quart',
            once: true,
            offset: 100
        });
    }
}

handleFormSubmit(e) {
    e.preventDefault();
    // Add form handling logic here
    console.log('Form submitted:', e.target);
}

handleResize() {
    // Handle responsive adjustments
    if (window.innerWidth > 768) {
        this.managers.navigation.closeMobileMenu();
    }
}

handleScroll() {
    // Additional scroll handling
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
}
```

}

// === INITIALIZE APPLICATION ===
const app = new KiosSosmedApp();

// === EXPORT FOR MODULES (if needed) ===
if (typeof module !== ‘undefined’ && module.exports) {
module.exports = { KiosSosmedApp, Utils };
}
