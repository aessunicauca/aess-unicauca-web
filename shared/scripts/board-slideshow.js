(() => {
    const slideshow = document.querySelector('#boardSlideshow');

    if (!slideshow) {
        return;
    }

    const images = [...slideshow.querySelectorAll('.slideshow-img')];
    const quotes = [...slideshow.querySelectorAll('.slideshow-quote')];
    const dots = [...slideshow.querySelectorAll('.slideshow-dot')];
    const previousButton = slideshow.querySelector('#boardPrev');
    const nextButton = slideshow.querySelector('#boardNext');
    const slideCount = Math.min(images.length, quotes.length, dots.length);

    if (!previousButton || !nextButton || slideCount === 0) {
        return;
    }

    let activeSlide = Math.max(0, images.findIndex((image) => image.classList.contains('is-active')));

    const showSlide = (index) => {
        activeSlide = (index + slideCount) % slideCount;

        images.forEach((image, imageIndex) => {
            image.classList.toggle('is-active', imageIndex === activeSlide);
        });
        quotes.forEach((quote, quoteIndex) => {
            quote.classList.toggle('is-active', quoteIndex === activeSlide);
        });
        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeSlide;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-pressed', String(isActive));
        });
    };

    previousButton.addEventListener('click', () => showSlide(activeSlide - 1));
    nextButton.addEventListener('click', () => showSlide(activeSlide + 1));
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
})();
