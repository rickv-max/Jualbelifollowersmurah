document.addEventListener('DOMContentLoaded', () => {

    const whatsappNumber = '6285856618965';

    // --- Mobile Burger Menu Functionality ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- WhatsApp Button Logic ---
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-pesan')) {
            const card = e.target.closest('.pricelist-card, .paket-hemat-card');
            const paket = card.dataset.paket;
            const harga = card.dataset.harga;
            const tipe = card.dataset.tipe;

            let pesan = `Halo Kios Sosmed,\n\nSaya mau pesan layanan berikut:\n- Nama Paket: ${paket}\n- Harga: ${harga}\n- Username IG/TikTok: [Isi username disini]`;
            if (tipe === 'likes' || tipe === 'views' || tipe.startsWith('paket')) {
                pesan += `\n- Link Postingan/Video: [Isi link disini]`;
            }
            pesan += `\n\nMohon info lanjut untuk pembayarannya. Terima kasih.`;
            const encodedPesan = encodeURIComponent(pesan);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedPesan}`;
            window.open(whatsappURL, '_blank');
        }
    });

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const wasActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!wasActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- Animated Counter on Scroll ---
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let current = 0;
                const updateCounter = () => {
                    const increment = target / 150;
                    if (current < target) {
                        current += increment;
                        counter.innerText = Math.ceil(current).toLocaleString('id-ID');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString('id-ID');
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.8 });

    document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

});
