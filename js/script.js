// js/script.js (REVAMPED)

document.addEventListener('DOMContentLoaded', () => {

    const whatsappNumber = '6285856618965';

    // --- WhatsApp Button Logic (Sama seperti sebelumnya) ---
    const orderButtons = document.querySelectorAll('.btn-pesan');
    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonEl = e.currentTarget;
            const paket = buttonEl.dataset.paket;
            const harga = buttonEl.dataset.harga;
            const tipe = buttonEl.dataset.tipe;

            let pesan = `Halo Kios Sosmed,\n\nSaya mau pesan layanan berikut:\n- Nama Paket: ${paket}\n- Harga: ${harga}\n- Username IG/TikTok: [Isi username disini]`;

            if (tipe === 'likes' || tipe === 'views' || tipe.startsWith('paket')) {
                pesan += `\n- Link Postingan/Video: [Isi link disini]`;
            }

            pesan += `\n\nMohon info lanjut untuk pembayarannya. Terima kasih.`;

            const encodedPesan = encodeURIComponent(pesan);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedPesan}`;
            window.open(whatsappURL, '_blank');
        });
    });

    // --- FAQ Accordion Logic (Sama seperti sebelumnya) ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-answer').style.maxHeight = 0;
            }
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });

    // --- NEW: Sticky Header with Glassmorphism Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- NEW: Scroll Animation using Intersection Observer ---
    const scrollElements = document.querySelectorAll('.scroll-animation');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after it's visible so it doesn't animate again
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

});
