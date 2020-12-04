/* beautify preserve:start */
@@include('../libs/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js')
@@include('../libs/gsap/dist/ScrollToPlugin.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/animation.gsap.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
/**https://mattboldt.com/demos/typed-js/ */
@@include('../../../../node_modules/typed.js/lib/typed.min.js')
/* beautify preserve:end */
    //Standart funcitons


function changeInnerHTML(el, text) {
    el.innerHTML = text;
}

function changeTextTypedEffect(el, text) {
    return new Typed(el, {
        showCursor: false,
        strings: ['', text],
        typeSpeed: 20
    });
}

function gsapScrollToEl(el) {
    gsap.to(window, { duration: 1, scrollTo: el, autoKill: false });
}
let changeTextTypedEffectDebounced = debounce(changeTextTypedEffect, 1000);
let changeInnerHTMLDebounced = debounce(changeInnerHTML, 0);
let gsapScrollToElDebounced = debounce(gsapScrollToEl, 1500);

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

//Standart funcitons END





/**SCREEN 2 SCroll Slider  */
// basic initialization
var controller = new ScrollMagic.Controller();
var scrollContainer = document.querySelector('.other-project-wrapper');
var fixedSlider = document.querySelector('.js-other-project-wrapper__right')
let scrollState = {
    position: 0,
    delta: 0,
};
let scrollSlides = Array.from(document.querySelectorAll('.js-other-project-slide__img'))
scrollSlides.forEach((slide, index, array) => {
    var tempScene = new ScrollMagic.Scene({
        duration: slide.getBoundingClientRect().height,
        triggerElement: slide,
        triggerHook: 0.5
    }) /*.addIndicators();*/
    controller.addScene(tempScene);

    let tl = new TimelineMax();
    // tl.fromTo(slide, { y: 35 }, { y: -35 });

    tempScene.setTween(tl);

    tempScene.on("enter", function(event) {
        console.log(index);

        changeTextTypedEffectDebounced(document.querySelector('.js-other-project-wrapper__right .title'), slide.dataset.title);
        changeInnerHTMLDebounced(document.querySelector('.js-other-projects-counter .slider-counter-type2__current'), index + 1);
        // if (controller.inSlide === true &&
        //     index > 0 &&
        //     index < array.length) gsapScrollToElDebounced(slide.querySelector('.glitch'));
        /**Отключение автоматического центрирования при быстром скролле */
        if (new Date().getTime() - window.lastSceneEntering > 1500) {
            // gsap.to(window, { duration: 1, scrollTo: slide.querySelector('.glitch'), autoKill: false });
            // console.log('ss');
        };
        window.lastSceneEntering = new Date().getTime();


        /**Отключение автоматического центрирования при быстром скролле END */
    });
    tempScene.on('progress', (e) => {
        // gsap.to(fixedSlider.querySelector('.title'), { y: e.progress * -20 })
        // gsap.to(slide, { y: e.progress * 80 })
    })
})

let scrollScene = new ScrollMagic.Scene({
    duration: scrollContainer.getBoundingClientRect().height,
    triggerElement: scrollContainer,
    triggerHook: 0
}).addIndicators().setPin(fixedSlider);

scrollScene.on('progress', (evt) => {
    if (evt.progress > 0.9) {
        controller.inSlide = false;
    } else {

        controller.inSlide = true;
    }
})
scrollScene.on('leave', () => {
    console.log('LEAVED');
    controller.inSlide = false;
})
scrollScene.on('enter', () => {
    console.log('ENTERED');
    controller.inSlide = true;
})
controller.addScene(scrollScene);


// scrollScene.addIndicators();


console.log();

if (document.documentElement.clientWidth < 576) {
    document.querySelector('.scrollmagic-pin-spacer').style.width = document.documentElement.clientWidth - document.querySelector('.other-project-wrapper__left').getBoundingClientRect().width + 'px'

}
scrollScene.on("enter", function(event) {
    // console.log(event);
    scrollContainer.scrollIntoView();
});
scrollScene.on("progress", function(event) {
    // console.log(event);
    // if (event.progress > 0.8) {
    //     fixedSlider.style.transform = `scale(${event.progress})`;
    // } else {

    //     fixedSlider.style.transform = `scale(${1})`;
    // }
});

/**SCREEN 2 SCroll Slider end   */