/* beautify preserve:start */
@@include('../libs/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js')
@@include('../libs/gsap/dist/ScrollToPlugin.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/animation.gsap.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
/**https://mattboldt.com/demos/typed-js/ */
@@include('../../../../node_modules/typed.js/lib/typed.min.js')
/* beautify preserve:end */
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
scrollSlides.forEach((slide, index) => {
    var tempScene = new ScrollMagic.Scene({
        duration: slide.getBoundingClientRect().height,
        triggerElement: slide,
        triggerHook: 0.5
    }).addIndicators();
    controller.addScene(tempScene);

    let tl = new TimelineMax();
    // tl.fromTo(slide, { y: 35 }, { y: -35 });

    tempScene.setTween(tl);
    tempScene.on("enter", function(event) {
        document.querySelector('.js-other-projects-counter .slider-counter-type2__current').innerHTML = index + 1;
        new Typed(document.querySelector('.js-other-project-wrapper__right .title'), {
            showCursor: false,
            strings: ['', slide.dataset.title],
            typeSpeed: 20
        });
        /**Отключение автоматического центрирования при быстром скролле */
        if (new Date().getTime() - window.lastSceneEntering > 1500) {
            console.log('ss');
            gsap.to(window, { duration: 1, scrollTo: slide.querySelector('.glitch'), autoKill: false });
        };
        window.lastSceneEntering = new Date().getTime()
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
}).setPin(fixedSlider);
controller.addScene(scrollScene);


scrollScene.addIndicators()
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