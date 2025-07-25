// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    const whatsappNumber = '6285856618965';

    // --- WhatsApp Button Functionality ---
    const orderButtons = document.querySelectorAll('.btn-pesan');

    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonEl = e.currentTarget;
            const paket = buttonEl.dataset.paket;
            const harga = buttonEl.dataset.harga;
            const tipe = buttonEl.dataset.tipe;

            let pesan = `Halo Kios Sosmed,

Saya mau pesan layanan berikut:
- Nama Paket: ${paket}
- Harga: ${harga}
- Username IG/TikTok: [Isi username disini]`;

            // Add extra field for likes/views/packages
            if (tipe === 'likes' || tipe === 'views' || tipe.startsWith('paket')) {
                pesan += `\n- Link Postingan/Video: [Isi link disini]`;
            }

            pesan += `

Mohon info lanjut untuk pembayarannya. Terima kasih.`;

            // Encode message for URL
            const encodedPesan = encodeURIComponent(pesan);
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedPesan}`;

            // Open in new tab
            window.open(whatsappURL, '_blank');
        });
    });


    // --- FAQ Accordion Functionality ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            item.classList.toggle('active');
        });
    });

});
