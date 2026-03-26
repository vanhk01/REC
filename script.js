/* ========================================
   REC MEDIA — JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // === HEADER SCROLL EFFECT ===
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // === HAMBURGER MENU ===
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // === SCROLL REVEAL ANIMATION ===
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // === COUNTER ANIMATION ===
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // === SMOOTH SCROLL FOR ANCHOR LINKS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offsetTop = targetEl.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === TIMECODE ANIMATION ===
    const timecodeEl = document.querySelector('.cam-value');
    const timecodeElements = document.querySelectorAll('.cam-value');
    
    // Find the timecode element
    timecodeElements.forEach(el => {
        if (el.textContent.includes('00:00:00:00')) {
            let frame = 0;
            setInterval(() => {
                frame++;
                const f = frame % 25;
                const s = Math.floor(frame / 25) % 60;
                const m = Math.floor(frame / 1500) % 60;
                const h = Math.floor(frame / 90000) % 24;
                el.textContent = 
                    String(h).padStart(2, '0') + ':' +
                    String(m).padStart(2, '0') + ':' +
                    String(s).padStart(2, '0') + ':' +
                    String(f).padStart(2, '0');
            }, 40);
        }
    });

    // === PORTFOLIO HOVER PARALLAX ===
    document.querySelectorAll('.portfolio__item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const img = item.querySelector('.portfolio__item-img');
            if (img) {
                img.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('.portfolio__item-img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

});
