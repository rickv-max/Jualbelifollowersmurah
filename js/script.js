document.addEventListener('DOMContentLoaded', () => {

    // --- Modern Navigation Handler (ENHANCED for Mobile UX) ---
    const header = document.querySelector('.modern-header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            // Toggle kelas 'active' untuk animasi tombol dan menu
            const isMenuOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // FOKUS RESPONSIVITAS: Mencegah body di-scroll saat menu terbuka
            if (isMenuOpen) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    // Add scrolled class to header (Fungsi asli dipertahankan)
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- FAQ Accordion Handler (Fungsi asli dipertahankan) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // --- AOS (Animate on Scroll) Handler (Fungsi asli dipertahankan) ---
    const aosElements = document.querySelectorAll('[data-aos]');
    if (aosElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        aosElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Animated Counter for Stats (Homepage) (Fungsi asli dipertahankan) ---
    const animatedCounters = document.querySelectorAll('.stat-number[data-target]');
    if (animatedCounters.length > 0) {
        const animateCounter = (el) => {
            const target = +el.getAttribute('data-target');
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    el.innerText = target.toLocaleString();
                } else {
                    el.innerText = Math.ceil(current).toLocaleString();
                }
            }, stepTime);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        animatedCounters.forEach(counter => {
           observer.observe(counter);
        });
    }

    // --- Loading Screen (Homepage only) (Fungsi asli dipertahankan) ---
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        const progressBar = loadingScreen.querySelector('.loading-progress');
        
        progressBar.style.width = '100%';

        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2500);
    }
});
