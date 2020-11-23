$('.js-philosophy-slider').on('init', () => document.querySelector('.prev').style.opacity = `0`);
$('.js-philosophy-slider').slick({
    slidesToShow: 1.33,
    slide: 'img',
    infinite: false,
    nextArrow: '.next',
    prevArrow: '.prev',
});

$('.js-philosophy-slider').on('afterChange', (slick, config) => {
    if (config.currentSlide === 0) {
        temporaryAddClass('.prev', 'glitched-title', 500);
        setTimeout(() => {
            document.querySelector('.prev').style.opacity = `0`;
        }, 500);
    } else {
        if (getComputedStyle(document.querySelector('.prev')).opacity === '0') temporaryAddClass('.prev', 'glitched-title', 500);
        document.querySelector('.prev').style.opacity = `1`;
    }


    if (config.currentSlide + 1 === config.slideCount) {
        temporaryAddClass('.next', 'glitched-title', 500);
        setTimeout(() => {
            document.querySelector('.next').style.opacity = `0`;
        }, 500);

    } else {
        document.querySelector('.next').style.opacity = `1`;
        // document.querySelector('.next').style.opacity = `1`;
    }
    console.log(config);
})

function temporaryAddClass(el, className, time) {
    let elem = document.querySelector(el);
    elem.classList.add(className);
    setTimeout(() => elem.classList.remove(className), time);
}