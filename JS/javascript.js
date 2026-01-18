// ============================================
        // SCROLL HORIZONTAL CON GSAP
        // ============================================
        
        // Solo activar en desktop (pantallas mayores a 768px)
        if (window.innerWidth > 768) {
            const container = document.querySelector('.horizontal-scroll-container');
            const panels = gsap.utils.toArray('.panel');
            
            // Calcular el ancho total
            const totalWidth = panels.length * window.innerWidth;
            
            // Crear la animación de scroll horizontal
            gsap.to(container, {
                x: () => -(totalWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: ".horizontal-scroll-wrapper",
                    start: "top top",
                    end: () => `+=${totalWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });
        }

        // ============================================
        // CARRUSEL SWIPER
        // ============================================
        
        const swiper = new Swiper('.skillsSwiper', {
            // Número de slides visibles
            slidesPerView: 1,
            spaceBetween: 30,
            
            // Loop infinito
            loop: true,
            
            // Autoplay
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            
            // Paginación
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            
            // Navegación
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Responsive breakpoints
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        });

        // ============================================
        // ACTUALIZAR AL CAMBIAR TAMAÑO DE VENTANA
        // ============================================
        
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });