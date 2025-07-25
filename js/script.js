document.addEventListener('DOMContentLoaded', () => {

    const whatsappNumber = '6285856618965';

    // --- WhatsApp Button Logic ---
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

    // --- Sticky Header Logic ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // --- NEW: Mobile Burger Menu Functionality ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // --- Close menu when a link is clicked (good for single-page apps, but useful here too) ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Scroll animation and FAQ logic can be added here if needed,
    // but the most critical part is the responsive navigation above.
});
