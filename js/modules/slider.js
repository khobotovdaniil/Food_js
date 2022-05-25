function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
    const slider = document.querySelector(container),
        slidesWrapper = slider.querySelector(wrapper),
        slidesField = slidesWrapper.querySelector(field),
        slides = slidesWrapper.querySelectorAll(slide),
        prevSlide = slider.querySelector(prevArrow),
        nextSlide = slider.querySelector(nextArrow),
        currentSlide = slider.querySelector(currentCounter),
        totalSlides = slider.querySelector(totalCounter),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideindex = 1;
    let offset = 0;

    const showCurrentSlideNumber = () => {
        if (slideindex < 10) {
            currentSlide.textContent = `0${slideindex}`;
        } else {
            currentSlide.textContent = slideindex;
        }
    };

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
    } else {
        totalSlides.textContent = slides.length;
    }

    showCurrentSlideNumber();

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    const modifyDots = () => {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideindex - 1].style.opacity = 1;
    };

    const transformSlideField = (x) => {
        slidesField.style.transform = `translateX(-${x}px)`;
    };

    const deleteNotDigits = str => {
        return +str.replace(/\D/g, '');
    };

    nextSlide.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        transformSlideField(offset);

        if (slideindex == slides.length) {
            slideindex = 1;
        } else {
            slideindex++;
        }

        showCurrentSlideNumber();
        modifyDots();
    });

    prevSlide.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        transformSlideField(offset);

        if (slideindex == 1) {
            slideindex = slides.length;
        } else {
            slideindex--;
        }

        showCurrentSlideNumber();
        modifyDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideindex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            transformSlideField(offset);

            showCurrentSlideNumber();
            modifyDots();
        });
    });
}

export default slider;