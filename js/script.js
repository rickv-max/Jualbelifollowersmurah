document.addEventListener('DOMContentLoaded', () => {

    // --- FOKUS: PENGATURAN WHATSAPP ---
    // Nomor WhatsApp Anda telah dimasukkan di sini.
    const nomorWhatsAppAdmin = '6285856618965'; 
    // --- AKHIR PENGATURAN ---


    // --- FOKUS: Fungsi untuk mengarahkan ke WhatsApp ---
    const semuaTombolPesan = document.querySelectorAll('.btn-pesan');
    
    semuaTombolPesan.forEach(tombol => {
        tombol.addEventListener('click', () => {
            // Ambil nama paket dari atribut data-paket
            const namaPaket = tombol.getAttribute('data-paket');
            
            if (namaPaket) {
                // Buat template pesan
                const templatePesan = `Halo Kios Sosmed, saya mau pesan paket: *${namaPaket}*. Mohon informasinya. Terima kasih.`;
                
                // Encode pesan agar valid di URL
                const pesanEncoded = encodeURIComponent(templatePesan);
                
                // Buat URL lengkap ke WhatsApp
                const urlWhatsApp = `https://wa.me/${nomorWhatsAppAdmin}?text=${pesanEncoded}`;
                
                // Buka URL di tab baru
                window.open(urlWhatsApp, '_blank');
            } else {
                console.error('Tombol tidak memiliki atribut data-paket:', tombol);
            }
        });
    });


    // --- Modern Navigation Handler (Fungsi asli dipertahankan) ---
    const header = document.querySelector('.modern-header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isMenuOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll', isMenuOpen);
        });
    }
    
    // Add scrolled class to header (Fungsi asli dipertahankan)
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- FAQ Accordion Handler (Fungsi asli dipertahankan) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                if (!isActive) item.classList.add('active');
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
        }, { threshold: 0.1 });
        aosElements.forEach(el => observer.observe(el));
    }

    // --- Animated Counter for Stats (Fungsi asli dipertahankan) ---
    const animatedCounters = document.querySelectorAll('.stat-number[data-target]');
    if (animatedCounters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = +el.getAttribute('data-target');
                    let current = 0;
                    const increment = target / 100; // Animate in 100 steps
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            el.innerText = target.toLocaleString();
                        } else {
                            el.innerText = Math.ceil(current).toLocaleString();
                        }
                    }, 20); // Update every 20ms
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        animatedCounters.forEach(counter => observer.observe(counter));
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
