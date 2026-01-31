/**
 * Maison Doré - Fine Dining Restaurant
 * Premium Animations with GSAP + Lenis
 */

(function() {
    'use strict';

    // ============== DOM Elements ==============
    const preloader = document.getElementById('preloader');
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // ============== Lenis Smooth Scroll ==============
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // ============== Register GSAP Plugins ==============
    gsap.registerPlugin(ScrollTrigger);

    // ============== Custom Cursor ==============
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let cursorX = 0, cursorY = 0, dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        gsap.to(cursorDot, { x: cursorX, y: cursorY, duration: 0.1, ease: 'power2.out' });
    });

    gsap.ticker.add(() => {
        dotX += (cursorX - dotX) * 0.15;
        dotY += (cursorY - dotY) * 0.15;
        cursor.style.transform = `translate(${dotX - 20}px, ${dotY - 20}px)`;
    });

    // Cursor hover effects
    document.querySelectorAll('a, button, .gallery-item, .dish-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });

    // Gallery items get special cursor
    document.querySelectorAll('.gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-view'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-view'));
    });

    // ============== Preloader ==============
    window.addEventListener('load', () => {
        const tl = gsap.timeline();
        tl.to('.preloader-logo', { scale: 1.1, duration: 0.3, ease: 'power2.in' })
          .to('.preloader-logo', { scale: 0, opacity: 0, duration: 0.5, ease: 'back.in(2)' })
          .to('.preloader-text', { y: 20, opacity: 0, duration: 0.3 }, '-=0.3')
          .to(preloader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete: () => {
              preloader.style.display = 'none';
              document.body.style.overflow = '';
              initHeroAnimations();
          }});
    });

    document.body.style.overflow = 'hidden';

    // ============== Hero Animations ==============
    function initHeroAnimations() {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }});

        heroTl
            .from('.hero-subtitle', { y: 40, opacity: 0, duration: 1, delay: 0.2 })
            .from('.hero-title-line', { y: 80, opacity: 0, duration: 1.2, stagger: 0.2 }, '-=0.6')
            .from('.hero-description', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
            .from('.hero-buttons .btn', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4')
            .from('.hero-scroll', { opacity: 0, y: -20, duration: 0.6 }, '-=0.2');

        // Hero parallax on scroll
        gsap.to('.hero-image', {
            yPercent: 30,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            }
        });

        // Hero overlay darkens on scroll
        gsap.to('.hero-overlay', {
            opacity: 0.9,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });

        // Hero content fades on scroll
        gsap.to('.hero-content', {
            y: -100,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: '20% top',
                end: '60% top',
                scrub: true,
            }
        });
    }

    // ============== Header Scroll Effect ==============
    ScrollTrigger.create({
        start: 50,
        onUpdate: (self) => {
            if (self.scroll() > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // ============== Mobile Navigation ==============
    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isActive);

        if (!isActive) {
            lenis.stop();
            gsap.from('.nav-link', { x: 50, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' });
        } else {
            lenis.start();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            lenis.start();
        });
    });

    // ============== Smooth Scroll for Anchor Links ==============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                lenis.scrollTo(targetElement, { offset: -80 });
            }
        });
    });

    // ============== Section Reveal Animations ==============

    // About section
    gsap.from('.about-content .section-subtitle', {
        scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
        x: -50, opacity: 0, duration: 0.8
    });

    gsap.from('.about-content .section-title', {
        scrollTrigger: { trigger: '.about-content', start: 'top 75%' },
        y: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.about-text p', {
        scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2
    });

    gsap.from('.about-feature', {
        scrollTrigger: { trigger: '.about-features', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15
    });

    // About images with parallax
    gsap.from('.about-image--main', {
        scrollTrigger: { trigger: '.about-images', start: 'top 80%' },
        x: 80, opacity: 0, duration: 1.2, ease: 'power3.out'
    });

    gsap.from('.about-image--secondary', {
        scrollTrigger: { trigger: '.about-images', start: 'top 70%' },
        x: -60, y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.3
    });

    gsap.to('.about-image--main img', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: '.about-images', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });

    gsap.to('.about-image--secondary img', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.about-images', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });

    // Animated counters for about-feature-number
    document.querySelectorAll('.about-feature-number').forEach(el => {
        const text = el.textContent.trim();
        const num = parseInt(text);
        const suffix = text.replace(/\d+/, '');

        if (!isNaN(num)) {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.from(el, {
                        textContent: 0,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            el.textContent = Math.round(parseFloat(el.textContent)) + suffix;
                        }
                    });
                }
            });
        }
    });

    // ============== Dishes Section ==============
    gsap.from('.dishes .section-subtitle', {
        scrollTrigger: { trigger: '.dishes', start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.8
    });

    gsap.from('.dishes .section-title', {
        scrollTrigger: { trigger: '.dishes', start: 'top 75%' },
        y: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.dishes .section-description', {
        scrollTrigger: { trigger: '.dishes', start: 'top 70%' },
        y: 30, opacity: 0, duration: 0.8
    });

    gsap.from('.dish-card', {
        scrollTrigger: { trigger: '.dishes-grid', start: 'top 80%' },
        y: 80, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out'
    });

    // Dish card image parallax
    document.querySelectorAll('.dish-card').forEach(card => {
        const img = card.querySelector('.dish-card-image img');
        gsap.to(img, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
    });

    // ============== Chef Section ==============
    gsap.from('.chef-image', {
        scrollTrigger: { trigger: '.chef-grid', start: 'top 75%' },
        x: -80, opacity: 0, duration: 1.2, ease: 'power3.out'
    });

    gsap.from('.chef-image-accent', {
        scrollTrigger: { trigger: '.chef-grid', start: 'top 70%' },
        x: -100, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out'
    });

    gsap.from('.chef-content .section-subtitle', {
        scrollTrigger: { trigger: '.chef-content', start: 'top 80%' },
        x: 50, opacity: 0, duration: 0.8
    });

    gsap.from('.chef-content .section-title', {
        scrollTrigger: { trigger: '.chef-content', start: 'top 75%' },
        y: 50, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.chef-quote', {
        scrollTrigger: { trigger: '.chef-quote', start: 'top 85%' },
        x: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.chef-bio p', {
        scrollTrigger: { trigger: '.chef-bio', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.2
    });

    gsap.from('.chef-award', {
        scrollTrigger: { trigger: '.chef-awards', start: 'top 90%' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.15
    });

    // ============== Gallery Section ==============
    gsap.from('.gallery-header .section-subtitle', {
        scrollTrigger: { trigger: '.gallery-header', start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.8
    });

    gsap.from('.gallery-header .section-title', {
        scrollTrigger: { trigger: '.gallery-header', start: 'top 75%' },
        y: 50, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.gallery-item', {
        scrollTrigger: { trigger: '.gallery-grid', start: 'top 85%' },
        scale: 0.85, opacity: 0, duration: 0.8, stagger: { amount: 0.6, from: 'random' }, ease: 'power3.out'
    });

    // Gallery hover magnetic effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
            gsap.to(item.querySelector('img'), { x, y, duration: 0.4, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('img'), { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
    });

    // ============== Reservation Section ==============
    gsap.from('.quick-reserve .section-subtitle', {
        scrollTrigger: { trigger: '.quick-reserve', start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.8
    });

    gsap.from('.quick-reserve .section-title', {
        scrollTrigger: { trigger: '.quick-reserve', start: 'top 75%' },
        y: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.reserve-widget', {
        scrollTrigger: { trigger: '.reserve-widget', start: 'top 85%' },
        y: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // ============== Testimonials Section ==============
    gsap.from('.testimonials .section-subtitle', {
        scrollTrigger: { trigger: '.testimonials', start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.8
    });

    gsap.from('.testimonials .section-title', {
        scrollTrigger: { trigger: '.testimonials', start: 'top 75%' },
        y: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' },
        y: 60, opacity: 0, rotateY: 15, duration: 1, stagger: 0.2, ease: 'power3.out'
    });

    // ============== Contact Section ==============
    gsap.from('.contact-info', {
        scrollTrigger: { trigger: '.contact', start: 'top 80%' },
        x: -60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.contact-map', {
        scrollTrigger: { trigger: '.contact', start: 'top 75%' },
        x: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    // ============== Footer ==============
    gsap.from('.footer-grid > *', {
        scrollTrigger: { trigger: '.footer', start: 'top 90%' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1
    });

    // ============== Active Navigation Link ==============
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
                if (self.isActive) {
                    const id = section.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            }
        });
    });

    // ============== Gallery Lightbox ==============
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.style.cursor = 'none';
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `<img src="${img.src.replace('w=600', 'w=1600').replace('w=800', 'w=1600').replace('w=1200', 'w=1920')}" alt="${img.alt}">`;

            document.body.appendChild(lightbox);
            lenis.stop();

            gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.4 });
            gsap.fromTo(lightbox.querySelector('img'), { scale: 0.85, y: 40 }, { scale: 1, y: 0, duration: 0.6, ease: 'power3.out' });

            lightbox.addEventListener('click', () => {
                gsap.to(lightbox, { opacity: 0, duration: 0.3, onComplete: () => {
                    document.body.removeChild(lightbox);
                    lenis.start();
                }});
            });
        });
    });

    // ============== Magnetic Buttons ==============
    document.querySelectorAll('.btn, .nav-link--cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        });
    });

    // ============== Gold Line Decorators ==============
    document.querySelectorAll('.section-title').forEach(title => {
        const line = document.createElement('div');
        line.className = 'title-gold-line';
        title.parentNode.insertBefore(line, title.nextSibling);

        gsap.from(line, {
            scrollTrigger: { trigger: title, start: 'top 75%' },
            scaleX: 0, duration: 1.2, ease: 'power3.out', delay: 0.5
        });
    });

    // ============== Form Validation ==============
    const newsletterForm = document.querySelector('.footer-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                const btn = newsletterForm.querySelector('.footer-submit');
                const originalText = btn.textContent;
                gsap.to(btn, {
                    scale: 0.95, duration: 0.1, yoyo: true, repeat: 1,
                    onComplete: () => {
                        btn.textContent = 'Danke!';
                        btn.style.background = '#4CAF50';
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.style.background = '';
                            newsletterForm.reset();
                        }, 2000);
                    }
                });
            }
        });
    }

    // ============== Lazy Loading ==============
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.src = img.src; });
    }

    // ============== Console ==============
    console.log(
        '%c Maison Doré ',
        'background: linear-gradient(135deg, #c9a961 0%, #b8923f 100%); color: #000; padding: 10px 20px; font-size: 20px; font-family: Georgia, serif;'
    );

    // ============== Quick Reservation Widget ==============
    const reserveWidget = document.getElementById('reserve-widget');
    if (reserveWidget) {
        const state = { guests: 2, date: null, time: null };
        const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
        const closedDays = [0, 1];

        const dateContainer = document.getElementById('date-container');
        if (dateContainer) {
            for (let i = 0; i < 21; i++) {
                const d = new Date();
                d.setDate(d.getDate() + i);
                const isClosed = closedDays.includes(d.getDay());

                const btn = document.createElement('button');
                btn.className = 'date-btn' + (isClosed ? ' disabled' : '');
                btn.dataset.date = d.toISOString().split('T')[0];
                btn.innerHTML = `
                    <span class="date-day">${days[d.getDay()]}</span>
                    <span class="date-num">${d.getDate()}</span>
                    <span class="date-month">${months[d.getMonth()]}</span>
                `;
                if (!isClosed) {
                    btn.addEventListener('click', () => selectDate(btn, d));
                }
                dateContainer.appendChild(btn);
            }
        }

        const steps = document.querySelectorAll('.reserve-step');
        const panels = document.querySelectorAll('.reserve-panel');

        function goToStep(num) {
            steps.forEach((s, i) => {
                s.classList.remove('active');
                if (i + 1 < num) s.classList.add('completed');
                if (i + 1 === num) s.classList.add('active');
            });
            panels.forEach((p, i) => {
                const isActive = i + 1 === num;
                p.classList.toggle('active', isActive);
                if (isActive) {
                    gsap.from(p, { opacity: 0, x: 20, duration: 0.4, ease: 'power2.out' });
                }
            });
        }

        steps.forEach(step => {
            step.addEventListener('click', () => goToStep(parseInt(step.dataset.step)));
        });

        document.querySelectorAll('.guest-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.guest-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.guests = parseInt(btn.dataset.guests);
                document.getElementById('sum-guests').textContent = state.guests + ' Gäste';
                gsap.from(btn, { scale: 0.9, duration: 0.3, ease: 'back.out(2)' });
                setTimeout(() => goToStep(2), 250);
                updateSubmitState();
            });
        });

        function selectDate(btn, d) {
            document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            state.date = d;
            document.getElementById('sum-date').textContent = `${days[d.getDay()]} ${d.getDate()}. ${months[d.getMonth()]}`;
            gsap.from(btn, { scale: 0.9, duration: 0.3, ease: 'back.out(2)' });
            setTimeout(() => goToStep(3), 250);
            updateSubmitState();
        }

        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.time = btn.dataset.time;
                document.getElementById('sum-time').textContent = state.time + ' Uhr';
                gsap.from(btn, { scale: 0.9, duration: 0.3, ease: 'back.out(2)' });
                updateSubmitState();
            });
        });

        const inputs = document.querySelectorAll('.r-input');
        const submitBtn = document.getElementById('r-submit');

        function updateSubmitState() {
            const name = document.getElementById('r-name')?.value.trim();
            const email = document.getElementById('r-email')?.value.trim();
            const phone = document.getElementById('r-phone')?.value.trim();
            const isComplete = state.guests && state.date && state.time && name && email && phone;
            if (submitBtn) submitBtn.disabled = !isComplete;
        }

        inputs.forEach(input => input.addEventListener('input', updateSubmitState));

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const name = document.getElementById('r-name').value;
                const email = document.getElementById('r-email').value;
                const phone = document.getElementById('r-phone').value;

                console.log('Reservation:', { ...state, name, email, phone });

                gsap.to('#reserve-widget', {
                    scale: 0.95, opacity: 0, duration: 0.4, ease: 'power2.in',
                    onComplete: () => {
                        document.getElementById('reserve-widget').style.display = 'none';
                        const success = document.getElementById('reserve-success');
                        success.style.display = 'block';
                        gsap.from(success, { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.5)' });
                        gsap.from('.success-icon', { scale: 0, rotation: -180, duration: 0.8, ease: 'back.out(2)', delay: 0.2 });
                    }
                });
            });
        }
    }

})();
