/* eslint-disable no-undef */
const sliderImage = document.querySelector(".double-part-section__img");
const glitch = sliderImage.querySelector(".glitch");
const nextArrow = document.querySelector(".facilities-slider__arrows .next");
const prevArrow = document.querySelector(".facilities-slider__arrows .prev");
const dotsContainer = document.querySelector(".facilities-slider__dots-row")

function getSliderCounter(selector) {
    let counter = document.querySelector(selector);
    return {
        elem: counter,
        current: counter.querySelector(".current"),
        total: counter.querySelector(".total")
    };
}
let facilitiesCounter = getSliderCounter(".js-facilities-slider-counter");
$(".facilities-slick").on("init", function(event, slickObject, current, next) {
    initSlickCustomDots(slickObject, dotsContainer);
    facilitiesCounter.total.innerHTML = slickObject.slideCount < 9 ? "0" + (slickObject.slideCount) : slickObject.slideCount;
    Array.from(slickObject.customDots).forEach((dot, index) => {
        handleGlitchChanging(dot, index, slickObject);
    })
    console.log(Array.from(slickObject.customDots));
});
$(".facilities-slick").on("beforeChange", function(event, slickObject, current, next) {
    switchSlickActiveDot(slickObject, current, next);
    switchGlitchSlide(slickObject.customDots[next], next, slickObject);
    glitchTitleEffect(current, next, slickObject);
})


function glitchTitleEffect(current, next, slickObject) {
    slickObject.$slides[current].querySelector('.title').classList.add('glitched-title');
    setTimeout(() => {
        slickObject.$slides[current].querySelector('.title').classList.remove('glitched-title')
    }, 500);
    slickObject.$slides[next].querySelector('.title').classList.add('glitched-title');
    setTimeout(() => {
        slickObject.$slides[next].querySelector('.title').classList.remove('glitched-title')
    }, 1500);
}
$(".facilities-slick").on("afterChange", function(event, slickObject, current, next) {
    facilitiesCounter.current.textContent = current < 9 ? "0" + (current + 1) : current + 1;

})
$(".facilities-slick").slick({
    arrows: false,
    infinite: false,
    fade: true,
})
nextArrow.addEventListener("click", function(evt) {
    $(".facilities-slick").slick("slickNext");
});
prevArrow.addEventListener("click", function(evt) {
    $(".facilities-slick").slick("slickPrev");
});

function enableGlitch() {
    glitch.classList.add("active");
}

function disableGlitch() {
    glitch.classList.remove("active");
}

function changeImage(src) {
    sliderImage.querySelectorAll(".glitch__img").forEach((image, index) => {
        setTimeout(() => {
            image.style.background = `url(${src}) no-repeat 50% 0`;
        }, index * 500);
    })
}



function handleGlitchChanging(dot, index, slickObject) {
    dot.addEventListener("click", function() {
        switchGlitchSlide(dot, index, slickObject);
    })
}

function switchGlitchSlide(dot, index, slickObject) {
    // console.log(dot, "dot");
    // console.log(index, "index");
    // console.log(slickObject, "slickObject");
    // this.classList.add('active');
    console.log(slickObject.$slides[index + 1]);

    enableGlitch();
    setTimeout(() => {
        changeImage(slickObject.$slides[index].dataset.src)
        $(".facilities-slick").slick("slickGoTo", dot.dataset.index);
    }, 1000);
    setTimeout(() => {
        disableGlitch();

    }, 1500);
}
/** Slick custom DOTS */
function initSlickCustomDots(slickObject, destination) {
    renderSlickCustomDots(slickObject.$slides, destination);
    console.log();
    slickObject.customDots = $(`.${destination.classList[0]} .facilities-slider__navigation-dot`);
    slickObject.customDots.each(function(dot, index) {
        if (dot === null || dot === 0) slickObject.customDots[0].classList.add("active");
        this.addEventListener("click", function() {
            this.classList.add("active");

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
    container.insertAdjacentHTML("beforeend", customDot);
}

function switchSlickActiveDot(slickObject, prev, next) {
    slickObject.customDots[prev].classList.remove("active");
    slickObject.customDots[next].classList.add("active");
}


/** Slick custom DOTS END */


//mobile screen1 slider sizing

var screen1 = document.querySelector('.js-facilities-screen1');
var headerHeight = document.querySelector('.header').getBoundingClientRect().height;
var footerFixedHeight = document.querySelector('.fixed-footer').getBoundingClientRect().height;
var textBlockHeight = screen1.querySelector('.double-part-section__text').getBoundingClientRect().height;


if (document.documentElement.clientWidth < 576) {

    screen1.querySelector('picture').style.height = (document.documentElement.clientHeight - textBlockHeight - headerHeight) + 'px';
}