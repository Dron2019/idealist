/* beautify preserve:start */
@@include('../libs/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js')
@@include('../libs/gsap/dist/ScrollToPlugin.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/animation.gsap.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
/**https://mattboldt.com/demos/typed-js/ */
@@include('../../../../node_modules/typed.js/lib/typed.min.js')
gsap.registerPlugin(ScrollToPlugin);
/* beautify preserve:end */
/** this script plugins
 * gsap
 * ScrollMagic
 * gsap ScrollToPLugin
 * debug.addIndicators
 * typed.min
 */
const comSlider = {
        containerSelector: '.commercial-slider',
        container: document.querySelector('.commercial-slider'),
        slide: '.js-scrolling-screen-slide',
        slides: Array.from(document.querySelectorAll('.js-scrolling-screen-slide')),
        currentSection: null,
    }
    // window

function setCurrentSection(value) {
    comSlider.currentSection = value;
}

var controller = new ScrollMagic.Controller();

// define movement of panels

comSlider.slides.forEach((el, index) => {
    let scene = new ScrollMagic.Scene({
            triggerElement: el,
            triggerHook: 0.5,
            offset: 0,
            duration: el.getBoundingClientRect().height
        })
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    let tl = new TimelineMax();
    tl.fromTo(el.querySelector('*'), { skewX: -1 }, { skewX: 1 });
    tl.fromTo(el.querySelector('.commercial-slide__img'), { skewX: 1 }, { skewX: -1 });
    scene.setTween(tl);
    el.sceneDuration = scene.duration();
    scene.on('enter', function() {
        gsap.fromTo(el, { y: 50, autoAlpha: 0.5 }, { y: 0, autoAlpha: 1 });
        setCurrentSection(el);
        console.log();


    })
    scene.on('leave', function() {
        gsap.fromTo(el, { y: 0, autoAlpha: 1 }, { y: 50, autoAlpha: 0.5 });
        setCurrentSection(null)
    })
})

// create scene to pin and link animation



let bigScene = new ScrollMagic.Scene({
        triggerElement: comSlider.container,
        triggerHook: 0.5,
        offset: 0,
        duration: comSlider.container.getBoundingClientRect().height
    })
    // .setTween(wipeAnimation)
    .addIndicators() // add indicators (requires plugin)
    .addTo(controller);

bigScene.on('leave', () => setCurrentSection(null));

let goToDebounced = debounce(gotToSection, 1000);

bigScene.on('progress', () => {
    goToDebounced(comSlider.currentSection);
})

function gotToSection(section) {
    if (section === null) return;
    let offset = $(section).offset().top - (section.sceneDuration * 0.5);
    gsap.to(window, { duration: 0.5, scrollTo: { y: offset, x: 0 }, autoKill: false });
}

function debounce(f, t) {
    return function(args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && ((this.lastCall  -  previousCall) <= t)) {
            clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => f(args), t);
    }
}