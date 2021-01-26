/* beautify preserve:start */
@@include('../libs/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/animation.gsap.min.js')
@@include('../libs/scroll/scroll.js')
/**https://mattboldt.com/demos/typed-js/ */
@@include('../../../../node_modules/typed.js/lib/typed.min.js')
/* beautify preserve:end */







const mediumCordValue = document.documentElement.clientWidth / 2;
const headBlockYCordValue = 100;
const arrow = document.querySelector(".arrow");
const mainScreen = document.querySelector('.main-screen');
const mainScreenImgShowBlock = document.querySelector('.js-main-screen-slider-img-container');
$(".main-screen__slider").on('init', function() {
    calcButtonPosition(arrow);
})
let msSlider = $(".main-screen__slider").slick({
    slide: ".main-screen__slide",
    centerMode: "true",
    centerPadding: "100px",
    speed: 2000,
    arrows: false,
    infinite: false,
    easing: 'ease-out',
});




msSlider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    handleMsGlitch('on');
    console.log(slick);
    if (currentSlide === (slick.slideCount - 1) && nextSlide === 0) {
        console.log('EDGE');
        gsap.to(slick.$slider, { x: slick.slideWidth * -1, duration: slick.options.speed / 1000, clearProps: 'all' })
    }
    console.log(nextSlide);
    switchGlitchBlockImg(mainScreenImgShowBlock, slick.$slides[nextSlide].dataset.img)
});
msSlider.on('afterChange', () => {
    handleMsGlitch('off');

    calcButtonPosition(arrow);
});



window.addEventListener('preloaderOff', function(evt) {
    handleMsGlitch('on');
    console.log('off');
    document.querySelector('.main-screen__slider').classList.add('glitched-title')
    setTimeout(() => {
        handleMsGlitch('off');

    }, 750);
    setTimeout(() => {
        document.querySelector('.main-screen__slider').classList.remove('glitched-title')
    }, 1250);
});



arrow.__proto__.hide = function() {
    this.style.opacity = "0";
    this.style.pointerEvents = "none";
};
arrow.__proto__.show = function() {
    this.style.opacity = "1";
    this.style.pointerEvents = "auto";
};
arrow.dataset.side = "leftSide";


mainScreen.addEventListener("mousemove", desktopNavButtonHandler);
mainScreen.addEventListener('mouseenter', function() {
    arrow.show()
});
mainScreen.addEventListener('mouseleave', function() {
    setTimeout(() => {
        arrow.hide()
    }, 1000);
});
window.addEventListener('scroll', function(evt) { calcButtonPosition(arrow); });
if (document.documentElement.clientWidth < 769) {

    window.removeEventListener("mousemove", desktopNavButtonHandler);
    arrow.remove();
}



/**Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
/** ms ---> main-screen */
function calcButtonPosition(objectWhereToRecord) {
    let msActiveSlideButton = document.querySelector('.slick-active .main-screen__but').getBoundingClientRect();
    objectWhereToRecord.msActiveSlideButton = {
        x1: msActiveSlideButton.left,
        x2: msActiveSlideButton.right,
        y1: msActiveSlideButton.top,
        y2: msActiveSlideButton.bottom,
    }
}

function desktopNavButtonHandler(evt) {
    arrow.style.position = "fixed";
    arrow.style.left = evt.clientX - 18 + "px";
    arrow.style.top = evt.clientY - 18 + "px";
    getCursorSide(evt.clientX);
    handleArrowVisibility(evt);

}





function handleArrowVisibility(evt) {
    if ($('.main-screen')[0].getBoundingClientRect().bottom <= 150) {
        arrow.hide();
        return
    }
    (evt.clientX > arrow.msActiveSlideButton.x1 &&
        evt.clientX < arrow.msActiveSlideButton.x2 &&
        evt.clientY > arrow.msActiveSlideButton.y1 &&
        evt.clientY < arrow.msActiveSlideButton.y2 ||
        evt.clientY < headBlockYCordValue
    ) ? arrow.hide(): arrow.show();
}

function getCursorSide(x, y) {
    if (x < (mediumCordValue)) {
        arrow.classList.add("left-side");
        arrow.dataset.side = "leftSide";
        // switchGallerySlide('leftSide');
    } else {
        arrow.classList.remove("left-side");
        arrow.dataset.side = "rightSide";
        // switchGallerySlide('rightSide')
    }
};
arrow.addEventListener("click", function(evt) {
    switchGallerySlide(arrow.dataset.side);
});

let navigate = {
    "leftSide": "slickPrev",
    "rightSide": "slickNext",
};

function switchGallerySlide(side) {
    console.log(navigate[side]);
    console.log(msSlider);
    $(".main-screen__slider").slick(navigate[side]);
    // return navigate.side;
};

function handleArrow() {
    // arrow.style.display = `none`;
};


function handleMsGlitch(action) {
    switch (action) {
        case 'on':
            document.querySelector('.glitch').classList.add('active');
            break;
        case 'off':
            document.querySelector('.glitch').classList.remove('active');
            break;
        default:
            break;
    }
};



function switchGlitchBlockImg(block, src) {
    let reversedImages = Array.from(block.querySelectorAll('.glitch__img')).reverse();
    reversedImages.forEach((el, index) => {
        setTimeout(() => {
            el.style.cssText = src;
        }, index * 500);
    })
}

/**Main screen button moveTo second screen */
document.querySelectorAll('.main-screen__but').forEach(el => {
        el.onclick = () => {
            document.querySelector('.js-scrolling-screen').scrollIntoView({ behavior: 'smooth' })
        }
    })
    /**Main screen button moveTo second screen END*/


/**SCREEN 2 SCroll Slider  */
// basic initialization


function mainScreenFixedSliderEffects() {
    var controller = new ScrollMagic.Controller();
    var scrollContainer = document.querySelector('.js-scrolling-screen');
    var fixedSlider = document.querySelector('.scroller-slide-fixed');
    let scrollSlides = Array.from(document.querySelectorAll('.scrolling-screen-slide'));
    let delimiter = document.querySelector('.js-scroller-slide-fixed .delimiter');
    let currentSlideView = document.querySelector('.js-scroller-slides-current');


    scrollSlides.forEach((slide, index) => {
        var tempScene = new ScrollMagic.Scene({
            duration: slide.getBoundingClientRect().height,
            triggerElement: slide,
            triggerHook: 0.5
        }) /*.addIndicators()*/ ;
        let slideImg = slide.querySelector('img'),
            slideText = slide.querySelector('.scrolling-screen-slide__text-block');

        gsap.set(slideImg, { y: 50, autoAlpha: 0.5 });
        gsap.set(slideText, { y: 100, autoAlpha: 0.5 });

        let tl = new TimelineMax();
        tl.fromTo(slideImg, { y: 0 }, { y: 30 });
        tl.fromTo(slideText, { y: 0 }, { y: -50 });
        tempScene.setTween(tl);

        controller.addScene(tempScene);
        tempScene.on("enter", function(event) {
            currentSlideView.innerHTML = index + 1;

            //еффект печати текста
            new Typed(fixedSlider.querySelector('.title'), {
                showCursor: false,
                strings: ['', slide.querySelector('.scrolling-screen-slide__title').innerText],
                typeSpeed: 20
            });

            //Одноразовій запуск появления
            if (slideImg.wasEffect !== true) {
                slideImg.wasEffect = true;
                gsap.fromTo(slideImg, { autoAlpha: 0.5, y: 50 }, { autoAlpha: 1, y: 0 })
                gsap.fromTo(slideText, { autoAlpha: 0.5, y: 100 }, { autoAlpha: 1, y: 0 })
            }
            tempScene.on('progress', (evt) => {
                delimiter.style.transform = `scaleX(${evt.progress})`
            })
        });

        scrollContainer.style.height = scrollSlides.length * slide.getBoundingClientRect().height + 'px';
    });

    let scrollScene = new ScrollMagic.Scene({
        duration: document.querySelector('.js-scrolling-screen').getBoundingClientRect().height,
        triggerElement: document.querySelector('.js-scrolling-screen'),
        triggerHook: 0

    }).setPin('.scrolling-screen__left');
    controller.addScene(scrollScene);

    // scrollScene.addIndicators()
    scrollScene.on("enter", function(event, target) {

        document.querySelector('.js-scrolling-screen').scrollIntoView();

    });
}
if (document.documentElement.clientWidth > 575) mainScreenFixedSliderEffects();
/**SCREEN 2 SCroll Slider end   */


/**HorizontalScroll */

class Scroller {
    constructor(selector) {
        this.selectorName = selector;
        this.scrollElement = document.querySelector(selector);
        this.i = 1;
        this.delta = 1;
        this.lastScrollTop = 0;
        this.speed = 10;

    }
    setSpeed() {
        if (/Android|webOS|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|iPhone|iPad|iPod/.test(window.navigator.userAgent)) this.speed = 1.2;
    }
    styling() {
        this.moveValue = window.screen.height * this.delta / parseInt(getComputedStyle(this.scrollElement).width.replace('px', '')) * this.speed;
        this.elemHeight = parseInt(getComputedStyle(this.scrollElement).blockSize);
        // this.scrollElement.style.transition = '.8s';
        this.scrollElement.style.transition = 'none';
    }
    onScroll(e) {
        var top = window.pageYOffset;
        if (this.lastScrollTop > top) {
            console.log('top');
            this.lastScrollTop = top;
            return 'up';
        } else if (this.lastScrollTop < top) {
            this.lastScrollTop = top;
            return 'down';
            console.log('down');
        }
    }
    isDevice() {
        if (/Android|webOS|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|iPhone|iPad|iPod/.test(window.navigator.userAgent)) this.delta = 3;

    };
    init() {
        // console.log(this.selectorName);
        this.setSpeed();
        this.isDevice();
        if (this.scrollElement == undefined) {
            console.error(`${this.selectorName} is ${undefined}`);
            return
        }
        this.styling();
        window.addEventListener('scroll', (evt) => {
            if ((this.scrollElement.getBoundingClientRect().top + +this.elemHeight) > 0 &&
                this.scrollElement.getBoundingClientRect().top < window.screen.height &&
                this.scrollElement.getBoundingClientRect().bottom - +this.elemHeight > 0 &&
                this.scrollElement.getBoundingClientRect().bottom < window.screen.height) {
                this.moving(this.onScroll());
            } else {
                // this.resetPosition();
            }

        });
    }
    resetPosition() {
        this.scrollElement.style.transform = 'none';
        this.i = 0;
    }
    scroll() {
        // this.init();
        this.styling();
        // console.log(parseInt(getComputedStyle(this.scrollElement)));
    }
    moving(direction) {
        if (direction == 'up') {
            this.i += this.moveValue;
        } else if (direction == 'down') {
            this.i -= this.moveValue;
        }
        // console.log(this.i);

        this.scrollElement.style.transform = `translateX(${this.i}px)`;
    }
    show() {
        // console.log(this.scrollElement.offsetTop);
    }

};
let scroller1 = new Scroller('.scroll-element-js');
scroller1.init();
/**HorizontalScroll END*/




/**Infra block glitches handler */
let infraBlocksWithImages = document.querySelectorAll('.infra-block-part .glitch');
infraBlocksWithImages.forEach(el => {
    el.addEventListener('mouseenter', function(evt) {
        el.classList.add('active')
    });
    el.addEventListener('mouseleave', function(evt) {
        el.classList.remove('active')
    });
})


/**Infra block glitches handler END */

document.addEventListener('freeze', (event) => {
    // The page is now frozen.
    console.log(event);
});




function getBetweenDistance(elem1, elem2, eachSideDistance) {
    // get the bounding rectangles
    var el1 = elem1.getBoundingClientRect();
    var el2 = elem2.getBoundingClientRect();

    // get div1's center point
    var div1x = el1.left + el1.width / 2;
    var div1y = el1.top + el1.height / 2;

    // get div2's center point
    var div2x = el2.left + el2.width / 2;
    var div2y = el2.top + el2.height / 2;

    // calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
    var distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
    var distance = Math.sqrt(distanceSquared);

    console.log(Math.abs(div1x - div2x), 'X');
    console.log(Math.abs(div1y - div2y), 'Y');

    const speed = 0.5;
    let tl = gsap.timeline({ ease: Power4.easeInOut });

    tl.to(elem2, { x: div1x - div2x, duration: speed })
    tl.to(elem2, { y: div1y - div2y, duration: speed / 2 }, `-=${speed/2}`)
    tl.set(elem2, { x: 0, y: 0 })
    console.log(div2x, 'X2');
    return distance;
}