    // <!-- Script NAV -->
        const btnMenu = document.getElementById('btnMenu');
        const btnClose = document.getElementById('btnClose');
        const menuMobile = document.getElementById('menuMobile');
        const overlay = document.getElementById('overlay');

    function openMenu() {
        menuMobile.classList.remove("translate-x-full");
        overlay.classList.remove("hidden");
        document.body.classList.add("overflow-hidden");
        document.getElementById("pageContent").classList.add("blur-content");
        setTimeout(() => overlay.classList.remove("opacity-0"), 10);
        btnMenu.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        menuMobile.classList.add("translate-x-full");
        overlay.classList.add("opacity-0");
        document.body.classList.remove("overflow-hidden");
        document.getElementById("pageContent").classList.remove("blur-content");
        setTimeout(() => overlay.classList.add("hidden"), 300);
        btnMenu.setAttribute("aria-expanded", "false");
    }
        btnMenu.addEventListener('click', openMenu);
        btnClose.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);



            // Autoplay del carrusel
            const carousel = document.getElementById("carousel");
            let scrollAmount = 0;

            function autoScroll() {
                const itemWidth = carousel.querySelector("figure").offsetWidth + 24; // ancho + gap
                if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                    scrollAmount = 0; // reinicia al inicio
                } else {
                    scrollAmount += itemWidth;
                }
                carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
            }

            setInterval(autoScroll, 4000); // cada 4 segundos


                        // Contadores animados con IntersectionObserver
            const counters = document.querySelectorAll('.counter');
            if (counters.length) {
                const animate = el => {
                    const target = Number(el.getAttribute('data-target')) || 0;
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 120));
                    const tick = () => {
                        current += step;
                        if (current >= target) { el.textContent = target.toLocaleString('es-EC'); return; }
                        el.textContent = current.toLocaleString('es-EC');
                        requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                };
                const io = new IntersectionObserver((entries, obs) => {
                    entries.forEach(e => {
                        if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
                    });
                }, { threshold: 0.4 });
                counters.forEach(c => io.observe(c));
            }

            // Newsletter: validación básica
            const form = document.getElementById('form-news');
            const email = document.getElementById('email');
            const msg = document.getElementById('msg-news');
            form?.addEventListener('submit', (ev) => {
                ev.preventDefault();
                msg.textContent = '';
                if (!email.checkValidity()) {
                    msg.textContent = 'Por favor, ingresa un correo válido.';
                    msg.className = 'text-red-600';
                    email.focus();
                    return;
                }
                // Acciones
                msg.textContent = '¡Listo! Revisa tu bandeja para descargar la guía.';
                msg.className = 'text-green-700';
                form.reset();
            });


        //<!-- Script auto-scroll + botones + indicadores -->

    const certCarousel = document.getElementById("certCarousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const indicators = document.querySelectorAll("#carouselIndicators span");

    let currentIndex = 0;
    const totalSlides = indicators.length;

    let autoScrollInterval;
    let isUserInteracting = false;

    function updateIndicators(index) {
        indicators.forEach((dot, i) => {
            dot.classList.toggle("bg-primary", i === index);
            dot.classList.toggle("bg-gray-300", i !== index);
        });
    }

    function scrollToSlide(index) {
        const slideWidth = certCarousel.querySelector("div").offsetWidth + 24; // ancho + gap
        certCarousel.scrollTo({ left: slideWidth * index, behavior: "smooth" });
        currentIndex = index;
        updateIndicators(index);
    }

    function scrollNext() {
        if (!isUserInteracting) {
            currentIndex = (currentIndex + 1) % totalSlides;
            scrollToSlide(currentIndex);
        }
    }

    function scrollPrev() {
        if (!isUserInteracting) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            scrollToSlide(currentIndex);
        }
    }

    function startAutoScroll() {
        stopAutoScroll(); // evita duplicados
        autoScrollInterval = setInterval(scrollNext, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Eventos botones
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            scrollNext();
            restartAutoScroll();
        });
        prevBtn.addEventListener("click", () => {
            scrollPrev();
            restartAutoScroll();
        });
    }

    // Eventos de interacción usuario (desktop + mobile)
    certCarousel.addEventListener("mousedown", () => {
        isUserInteracting = true;
        stopAutoScroll();
    });
    certCarousel.addEventListener("touchstart", () => {
        isUserInteracting = true;
        stopAutoScroll();
    });

    certCarousel.addEventListener("mouseup", () => {
        isUserInteracting = false;
        startAutoScroll();
    });
    certCarousel.addEventListener("touchend", () => {
        isUserInteracting = false;
        startAutoScroll();
    });

    // Actualiza el índice actual al terminar de scrollear manualmente
    certCarousel.addEventListener("scroll", () => {
        const slideWidth = certCarousel.querySelector("div").offsetWidth + 24;
        const newIndex = Math.round(certCarousel.scrollLeft / slideWidth);
        currentIndex = newIndex;
        updateIndicators(newIndex);
    });

    // Clic en indicadores
    indicators.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            scrollToSlide(i);
            restartAutoScroll();
        });
    });

    function restartAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }

    // Iniciar
    updateIndicators(currentIndex);
    startAutoScroll();
