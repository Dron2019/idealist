const sliderImage = document.querySelector('.double-part-section__img');
const glitch = sliderImage.querySelector('.glitch');
const nextArrow = document.querySelector('.facilities-slider__arrows .next');
const prevArrow = document.querySelector('.facilities-slider__arrows .prev');
const dotsContainer = document.querySelector('.facilities-slider__dots-row')


$('.facilities-slick').on('init', function(event, slickObject, current, next) {
    initSlickCustomDots(slickObject, dotsContainer);
});
$('.facilities-slick').on('beforeChange', function(event, slickObject, current, next) {
    switchSlickActiveDot(slickObject, current, next)
})
$('.facilities-slick').slick({
    arrows: false,
    fade: true,
})


function enableGlitch() {
    glitch.classList.add('active');
}

function disableGlitch() {
    glitch.classList.remove('active');
}

function changeImage(src) {
    sliderImage.querySelectorAll('.glitch__img').forEach(image => {
        image.style.background = `url(${src}) no-repeat 50% 0`;
    })
}


/** Slick custom DOTS */
function initSlickCustomDots(slickObject, destination) {
    renderSlickCustomDots(slickObject.$slides, destination);
    console.log();
    slickObject.customDots = $(`.${destination.classList[0]} .facilities-slider__navigation-dot`);
    slickObject.customDots.each(function(dot, index) {
        if (dot === null) slickObject.customDots[0].classList.add('active')
        this.addEventListener('click', function() {
            console.log(slickObject.$slides[dot]);
            this.classList.add('active');
            enableGlitch();
            setTimeout(() => {
                changeImage(slickObject.$slides[dot].dataset.src)
                $('.facilities-slick').slick('slickGoTo', this.dataset.index);

            }, 1000);
            setTimeout(() => {
                disableGlitch();
            }, 1500);

        })
    });
}

function renderSlickCustomDots($slides, renderDestination) {
    $slides.each((slide, index) => {
        console.log(slide);
        renderDot(slide, renderDestination);
    })
}

function renderDot(index, container) {
    let customDot = `
    <svg data-index="${index}" class="facilities-slider__navigation-dot" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect class="facilities-slider__navigation-dot-border" x="13" y="0.707107" width="17.3848" height="17.3848" transform="rotate(45 13 0.707107)"/>
        <rect class="facilities-slider__navigation-dot-inner" x="13.209" y="3.99927" width="13" height="13" transform="rotate(45.1014 13.209 3.99927)" />
        </svg>
    `;
    container.insertAdjacentHTML('beforeend', customDot);
}

function switchSlickActiveDot(slickObject, prev, next) {
    slickObject.customDots[prev].classList.remove('active');
    slickObject.customDots[next].classList.add('active');
};


/** Slick custom DOTS END */