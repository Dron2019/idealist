// document.querySelector("header").style.border = "1px solid yellow"
const SCREEN_WIDTH = window.screen.width;
let menuCall = document.querySelector(".js-menu-call");

function headerMenuButtonAnimate(event) {
    let bigLineWidth = this.querySelector("line").x2.baseVal.value;
    let lineToAnim = this.querySelectorAll("line")[1];
    lineToAnim.x2 = bigLineWidth;
    if (event.type === "mouseleave") {
        gsap.to(lineToAnim, { attr: { x2: lineToAnim.dataset.base_value } })
    } else if (event.type === "mouseenter") {
        lineToAnim.dataset.base_value = lineToAnim.x2.baseVal.value;
        gsap.to(lineToAnim, { attr: { x2: bigLineWidth } })
    } else if (event.type === "click") {
        this.classList.toggle("opened");
    }
}

const observerConfig = {
    attributes: true,
    childList: true,
    subtree: true
};

function switchMenuButtonState(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
        if (mutation.target.tagName === "BUTTON") {
            var button = mutation.target;
            if (mutation.target.classList.contains("opened")) {
                button.querySelector(".header__menu-button-text").textContent = mutation.target.dataset.text2;
            } else {
                button.querySelector(".header__menu-button-text").textContent = mutation.target.dataset.text1;

            }
        }
    })

}
let menuCallObserver = new MutationObserver(switchMenuButtonState);
menuCallObserver.observe(menuCall, observerConfig);
menuCall.addEventListener("click", headerMenuButtonAnimate);
menuCall.addEventListener("mouseenter", headerMenuButtonAnimate);
menuCall.addEventListener("mouseleave", headerMenuButtonAnimate);

const mediumCordValue = document.documentElement.clientWidth / 2;
const headBlockYCordValue = 100;
const arrow = document.querySelector(".arrow");

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

$(".main-screen__slider").on('beforeChange', () => {
    handleMsGlitch('on');
});
$(".main-screen__slider").on('afterChange', () => {
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

window.addEventListener("mousemove", desktopNavButtonHandler);
if (document.documentElement.clientWidth < 769) {

    window.removeEventListener("mousemove", desktopNavButtonHandler);
    arrow.remove();
}



/**Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
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
    (evt.clientX > arrow.msActiveSlideButton.x1 &&
        evt.clientX < arrow.msActiveSlideButton.x2 &&
        evt.clientY > arrow.msActiveSlideButton.y1 &&
        evt.clientY < arrow.msActiveSlideButton.y2 || evt.clientY < headBlockYCordValue) ? arrow.hide(): arrow.show();
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


document.querySelectorAll('.product-card').forEach(el => {
    for (item in el.dataset) {

        window.cardFilters.add(el.dataset[item]);
    }
})