/* beautify preserve:start */
@@include('../libs/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js')
@@include('../libs/ScrollMagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
/**https://mattboldt.com/demos/typed-js/ */
@@include('../../../../node_modules/typed.js/lib/typed.min.js')
/* beautify preserve:end */







const mediumCordValue = document.documentElement.clientWidth / 2;
const headBlockYCordValue = 100;
const arrow = document.querySelector(".arrow");
const mainScreen = document.querySelector('.main-screen');
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

msSlider.on('beforeChange', () => {
    handleMsGlitch('on');
});
msSlider.on('afterChange', () => {
    handleMsGlitch('off');
    calcButtonPosition(arrow);
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

/**Main screen button moveTo second screen */
document.querySelectorAll('.main-screen__but').forEach(el => {
        el.onclick = () => {
            document.querySelector('.js-scrolling-screen').scrollIntoView({ behavior: 'smooth' })
        }
    })
    /**Main screen button moveTo second screen END*/


/**SCREEN 2 SCroll Slider  */
// basic initialization
var controller = new ScrollMagic.Controller();
var scrollContainer = document.querySelector('.js-scrolling-screen');
var fixedSlider = document.querySelector('.scroller-slide-fixed')
let scrollState = {
    position: 0,
    delta: 0,
};
let scrollSlides = Array.from(document.querySelectorAll('.scrolling-screen-slide'))
scrollSlides.forEach((slide, index) => {
    var tempScene = new ScrollMagic.Scene({
        duration: slide.getBoundingClientRect().height,
        triggerElement: slide,
        triggerHook: 0.5
    }).addIndicators();
    controller.addScene(tempScene);
    tempScene.on("enter", function(event) {
        document.querySelector('.js-scroller-slides-current').innerHTML = index + 1;
        new Typed(fixedSlider.querySelector('.title'), {
            showCursor: false,
            strings: ['', slide.querySelector('.scrolling-screen-slide__title').innerText],
            typeSpeed: 20
        });

        // document.querySelector('.scrolling-screen__left .title').innerHTML = Math.random() + index + 1
    });
    scrollContainer.style.height = scrollSlides.length * slide.getBoundingClientRect().height + 'px';
})

let scrollScene = new ScrollMagic.Scene({
    duration: document.querySelector('.js-scrolling-screen').getBoundingClientRect().height,
    triggerElement: document.querySelector('.js-scrolling-screen'),
    triggerHook: 0

}).setPin('.scrolling-screen__left');
controller.addScene(scrollScene);


scrollScene.addIndicators()
scrollScene.on("enter", function(event) {
    // console.log(event);
    document.querySelector('.js-scrolling-screen').scrollIntoView();

});
scrollScene.on("progress", function(event) {
    console.log(event);
    // if (event.progress > 0.8) {
    //     fixedSlider.style.transform = `scale(${event.progress})`;
    // } else {

    //     fixedSlider.style.transform = `scale(${1})`;
    // }
});
/**SCREEN 2 SCroll Slider end   */


/**HorizontalScroll */

class Scroller {
    constructor(selector) {
        this.selectorName = selector;
        this.scrollElement = document.querySelector(selector);
        this.i = 1;
        this.delta = 5;
        this.lastScrollTop = 0;
        this.speed = 10;

    }
    setSpeed() {
        if (/Android|webOS|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|iPhone|iPad|iPod/.test(window.navigator.userAgent)) this.speed = 1.2;
    }
    styling() {
        this.moveValue = window.screen.height * this.delta / parseInt(getComputedStyle(this.scrollElement).width.replace('px', '')) * this.speed;
        this.elemHeight = parseInt(getComputedStyle(this.scrollElement).blockSize);
        this.scrollElement.style.transition = '.8s';
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
                this.resetPosition();
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