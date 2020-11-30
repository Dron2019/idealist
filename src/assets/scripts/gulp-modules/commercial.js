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





let scaleValueOnMobile = (document.documentElement.clientWidth < 575) ? 0.25 : 1;
var controller = new ScrollMagic.Controller();

// define movement of panels

comSlider.slides.forEach((el, index) => {
    let scene = new ScrollMagic.Scene({
            triggerElement: el,
            triggerHook: 0.5,
            offset: 0,
            duration: el.getBoundingClientRect().height
        })
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    let tl = new TimelineMax();
    tl.fromTo(el.querySelector('*'), { skewX: -1, y: -30 * scaleValueOnMobile }, { skewX: 1, y: 30 * scaleValueOnMobile });
    tl.fromTo(el.querySelector('.commercial-slide__img'), { skewX: 1, y: -30 * scaleValueOnMobile }, { skewX: -1, y: 30 * scaleValueOnMobile });

    scene.setTween(tl);
    el.sceneDuration = scene.duration();
    scene.on('enter', function(event) {
        // gsap.fromTo(el, { y: 50, autoAlpha: 0.5 }, { y: 0, autoAlpha: 1 });
        console.log(event);
        if (event.scrollDirection === 'FORWARD') {

            setCurrentSection(el);
        }
        console.log();


    })
    scene.on('leave', function() {
        // gsap.fromTo(el, { y: 0, autoAlpha: 1 }, { y: 50, autoAlpha: 0.5 });
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
    //.addIndicators() // add indicators (requires plugin)
    .addTo(controller);

bigScene.on('leave', () => setCurrentSection(null));

let goToDebounced = debounce(gotToSection, 1000);

bigScene.on('progress', () => {
    goToDebounced(comSlider.currentSection);
})

function gotToSection(section) {
    if (section === null) return;
    if (document.documentElement.clientWidth < 575) return;
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
};

class Smooth {
    constructor({ element = window, strength = 20, acceleration = 1.1, deceleration = 0.95, ignore = '' } = {}) {
        this.self = this;
        this.element = element;
        this.distance = strength;
        this.acceleration = acceleration;
        this.deceleration = deceleration;
        this.running = false;
        this.ignore = ignore;
        this.element.addEventListener('wheel', this.scrollHandler.bind(this));
        this.element.addEventListener('mousewheel', this.scrollHandler.bind(this));
        this.scroll = this.scroll.bind(this);

        document.addEventListener('mousedown', function(e) {

            function clickedOnScrollbar(mouseX) {
                if (document.documentElement.clientWidth <= mouseX) { return true }
                return false;
            }
            if (clickedOnScrollbar(e.clientX)) this.running = false;
        }.bind(this));

        window.addEventListener('DOMContentLoaded', disableScroll);
    };

    scrollHandler(e) {
        var scroll = true;
        if (this.ignore && $(e.path).closest(this.ignore).length !== 0 || window.isKeyDown()) {
            scroll = false;
        }

        if (!this.running && scroll) {
            this.top = this.element.pageYOffset || this.element.scrollTop || 0;
            this.running = true;
            this.currentDistance = e.deltaY > 0 ? 0.1 : -0.1;
            this.isDistanceAsc = true;
            this.scroll();
        } else {
            this.isDistanceAsc = false;
            this.currentDistance = e.deltaY > 0 ? this.distance : -this.distance;
        }
    }

    scroll() {
        if (this.running) {
            Math.abs(this.currentDistance) >= Math.abs(this.distance) ? this.isDistanceAsc = false : 1;
            this.top += this.currentDistance;
            this.element.scrollTo(0, this.top);

            this.currentDistance *= this.isDistanceAsc === true ? this.acceleration : this.deceleration;
            ((Math.abs(this.currentDistance) < 0.1) && this.isDistanceAsc === false) ||
            this.top > ($(document).height() - window.innerHeight) ||
                this.top <= 0 ? this.running = false : 1;
            requestAnimationFrame(this.scroll);
        }
    }

    key() {
        var keyDown = false;
        window.isKeyDown = function() { return keyDown; };
        var addEvent = function(type, handler) {
            window.document.addEventListener(type, function() {
                event = (event) ? event : window.event;
                var keyCode = (event.charCode) ? event.charCode : event.keyCode;
                if (keyCode === 18 || keyCode === 17) {
                    keyDown = handler;
                }
            }, false)
        };
        addEvent('keydown', true);
        addEvent('keyup', false);
    }
};
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
let body;
// document.addEventListener('DOMContentLoaded',function () {


if (/Mac os x/i.test(navigator.appVersion) === false) {

    body = new Smooth({ ignore: '#map' });
    body.key();
}
// });

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
};

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
};

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
};

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
};;;;;;;