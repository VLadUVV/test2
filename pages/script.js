document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if (hamburger && mobileMenu && mobileMenuClose) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    const infoBtn = document.querySelector('.info-button');
    const infoModal = document.getElementById('infoModal');
    const modalClose = document.getElementById('modalClose');
    function openModal() {
        if (infoModal) {
            infoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    function closeModal() {
        if (infoModal) {
            infoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    infoBtn && infoBtn.addEventListener('click', openModal);
    modalClose && modalClose.addEventListener('click', closeModal);
    infoModal && infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            mobileMenu && mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    (function initMobileSlider() {
        const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
        const sliderSection = document.querySelector('.slider-section.mobile-only');
        
        if (!isMobile() || !sliderSection) return;

        const slides = [
            '../assets/images/plash.svg',
            '../assets/images/plash1.svg'
        ];

        let index = 0;

        const imgEl = sliderSection.querySelector('.slider-image');
        const navPrev = sliderSection.querySelector('.slider-nav .prev');
        const navNext = sliderSection.querySelector('.slider-nav .next');
        
        if (!imgEl || !navPrev || !navNext) return;

        function updateSlide(newIndex) {
            imgEl.style.opacity = '0';

            setTimeout(() => {
                imgEl.src = slides[newIndex];

                imgEl.style.opacity = '1';
            }, 300);
        }
        
        function next() {
            index = (index + 1) % slides.length;
            updateSlide(index);
        }
        
        function prev() {
            index = (index - 1 + slides.length) % slides.length;
            updateSlide(index);
        }

        navNext.addEventListener('click', next);
        navPrev.addEventListener('click', prev);

        let startX = 0;
        let isSwiping = false;

        sliderSection.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        }, { passive: true });

        sliderSection.addEventListener('touchend', e => {
            if (!isSwiping) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) {
                if (dx < 0) {
                    next();
                } else {
                    prev();
                }
            }
            isSwiping = false;
        });

        // Начальное состояние
        updateSlide(index);
    })();
});