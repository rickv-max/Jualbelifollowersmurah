// js/script.js (v3.0 - AI STUDIO EDITION)
document.addEventListener('DOMContentLoaded', () => {

    // SEMUA LOGIKA LAMA (WhatsApp, Header Scroll, Burger Menu) TETAP ADA
    // ... (salin logika ini dari file js responsif Anda sebelumnya) ...

    // --- NEW: Animated Counter ---
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let current = 0;
                
                const updateCounter = () => {
                    const increment = target / 150; // speed
                    if (current < target) {
                        current += increment;
                        counter.innerText = Math.ceil(current).toLocaleString('id-ID');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString('id-ID');
                    }
                };
                updateCounter();
                observer.unobserve(counter); // Animate only once
            }
        });
    }, { threshold: 0.8 });

    document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

    // --- NEW: Magnetic Buttons ---
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0,0)';
        });
    });

    // --- NEW: Glowing Card Effect ---
    document.querySelectorAll('.pricelist-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});
