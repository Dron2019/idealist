
let buildCounter = getSliderCounter(".js-gallery-slider-counter");

$('.js-build-slider').on("init", function(slick, config) {
    buildCounter.total.innerHTML = config.slideCount;
    // console.log(some);
});


let buildSlider = $('.js-build-slider').slick({
slide:'img',
arrows:false,
});

buildSlider.on("afterChange", (slick, config, currentSlide) => {
    // console.log(some);
    buildCounter.current.textContent = currentSlide < 9 ? "0" + (currentSlide + 1) : currentSlide + 1;
    // galleryCounter.current.textContent.length <= 1 ?
    //     galleryCounter.current.textContent = '0' + galleryCounter.current.textContent : null
    console.log();
})

function getSliderCounter(selector) {
    let counter = document.querySelector(selector);
    return {
        elem: counter,
        current: counter.querySelector(".current"),
        total: counter.querySelector(".total")
    };
}


/**СТрелка переключатель в зависимости от положения на єкране */

function sideSwitchArrow(jQuerySlider, arrow, container) {

    const mediumCordValue = document.documentElement.clientWidth / 2;
    const headBlockYCordValue = 100;
    // const arrow = document.querySelector(".arrow");
    const mainScreen = document.querySelector(".main-screen");

    container.style.cursor = "none";
    arrow.style.cursor = "none";
    arrow.style.zIndex = 10;
    jQuerySlider.on("beforeChange", () => {
        // handleMsGlitch('on');
    });
    jQuerySlider.on("afterChange", () => {

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


    container.addEventListener("mousemove", desktopNavButtonHandler);
    container.addEventListener("mouseenter", function() {
        arrow.show()
    });
    container.addEventListener("mouseleave", function() {
        arrow.hide()
    });
    if (document.documentElement.clientWidth < 769) {
        window.removeEventListener("mousemove", desktopNavButtonHandler);
        arrow.remove();
    }

    /**Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
    /** ms ---> main-screen */


    function desktopNavButtonHandler(evt) {
        arrow.style.position = "fixed";
        arrow.style.left = evt.clientX - 18 + "px";
        arrow.style.top = evt.clientY - 18 + "px";

        // arrow.style.transform = `translateX(${evt.clientX- 18}px) translateY(${evt.clientY- 18}px)`;
        // arrow.style.transform = ``;

        getCursorSide(evt.clientX);
        handleArrowVisibility(evt);

    }





    function handleArrowVisibility(evt) {
        console.log(evt);
        if (evt.clientY < headBlockYCordValue) {
            arrow.hide();
            return
        } else {
            arrow.show();
        }
        // (evt.clientX > arrow.msActiveSlideButton.x1 &&
        //     evt.clientX < arrow.msActiveSlideButton.x2 &&
        //     evt.clientY > arrow.msActiveSlideButton.y1 &&
        //     evt.clientY < arrow.msActiveSlideButton.y2 ||
        //     evt.clientY < headBlockYCordValue
        // ) ? arrow.hide(): arrow.show();
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
        jQuerySlider.slick(navigate[side]);
        // return navigate.side;
    };

    function handleArrow() {
        // arrow.style.display = `none`;
    };


    function handleMsGlitch(action) {
        switch (action) {
            case "on":
                document.querySelector(".glitch").classList.add("active");
                break;
            case "off":
                document.querySelector(".glitch").classList.remove("active");
                break;
            default:
                break;
        }
    };
}
// sideSwitchArrow(
//         buildSlider,
//         document.querySelector(".arrow"),
//         document.querySelector(".js-build-slider"))
/**СТрелка переключатель в зависимости от положения на єкране END */





/**Кастомные селекты */
var selectors = document.querySelectorAll('.custom-select');


function changeCurrentValue(selector){
    selector.currentValue = selector.querySelectorAll('.custom-select__item')[0].dataset.value;
    selector.querySelectorAll('.custom-select__item').forEach(select=>{
        select.addEventListener('click',()=>{
            selector.querySelectorAll('.custom-select__item').forEach(el=>el.classList.remove('custom-select__item-current'))
            select.classList.add('custom-select__item-current');
            selector.currentValue = select.dataset.value;
            console.log(selector.currentValue);
        })
    })
};

changeCurrentValue(selectors[0])
changeCurrentValue(selectors[1])