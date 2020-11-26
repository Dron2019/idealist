let buildCounter = getSliderCounter(".js-gallery-slider-counter");

$('.js-build-slider').on("init", function(slick, config) {
    buildCounter.total.innerHTML = config.slideCount;
    // console.log(some);
});


let buildSlider = $('.js-build-slider').slick({
    slide: 'img',
    arrows: false,
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
//func
function sideSwitchArrow(jQuerySlider, arrow, container, dontShowArrowBlock) {
    let isShowing = true;
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
        if (isShowing !== true) {
            arrow.hide();
            return
        }
        if (evt.clientY < headBlockYCordValue) {
            arrow.hide();
            return
        } else {
            arrow.show();
        }

        let buildNav = document.querySelector('.build-progress-nav-wrap').getBoundingClientRect();
        (evt.clientX > buildNav.left &&
            evt.clientX < buildNav.right &&
            evt.clientY > buildNav.top &&
            evt.clientY < buildNav.bottom ||
            evt.clientY < headBlockYCordValue
        ) ? arrow.hide(): /*arrow.show()*/ null;
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
    }

    function handleArrow() {
        // arrow.style.display = `none`;
    }


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
    }
    if (dontShowArrowBlock !== undefined) {

        dontShowArrowBlock.addEventListener('mouseenter', function(evt) {
            isShowing = false;
        });
        dontShowArrowBlock.addEventListener('mouseleave', function(evt) {
            isShowing = true;
        });
        // document.querySelectorAll('.custom-select').forEach(select => {
        //     select.addEventListener('change', function(evt) {
        //         isShowing = true;
        //     });
        // })
    }
}

//func

/**СТрелка переключатель в зависимости от положения на єкране END */
sideSwitchArrow(
    buildSlider,
    document.querySelector(".arrow"),
    document.querySelector(".js-build-slider"),
    document.querySelector(".build-progress-nav-wrap"));






/**Кастомные селекты */
var selectors = document.querySelectorAll('.custom-select');
let event = new Event('change');
var buildProgressConfig = {
    action: 'construct',

};

function changeCurrentValue(selector) {
    selector.currentValue = selector.querySelectorAll('.custom-select__item')[0].dataset.value;
    selector.querySelectorAll('.custom-select__item').forEach(select => {
        select.addEventListener('click', () => {
            selector.querySelectorAll('.custom-select__item').forEach(el => el.classList.remove('custom-select__item-current'))
            select.classList.add('custom-select__item-current');
            if (selector.currentValue !== select.dataset.value) {
                selector.currentValue = select.dataset.value;
                selector.dispatchEvent(event);

            }
            // console.log(selector.currentValue);
        })
    });
    selector.addEventListener('change', function(evt) {
        // console.log(evt);
        buildProgressConfig[evt.target.dataset.name] = evt.target.currentValue;
        // console.log(buildProgressConfig);
        fetch('static/val.php')
            .then((response) => response.json())
            .then((res => reInitSlider(buildSlider, res)))
    });
};

changeCurrentValue(selectors[0])
changeCurrentValue(selectors[1])


/**
 * 
 * 
 * пример ответа JSON
    [
	'./assets/images/watch-more1.jpg',
	'./assets/images/watch-more2.jpg',
	'./assets/images/build-progrees-test.jpg',
    ];
 * 
 */
function reInitSlider(jquerySlider, response) {
    jquerySlider.slick('unslick');
    jquerySlider[0].querySelectorAll('img').forEach(deleteEl);
    // gsap.to(jquerySlider[0], { autoAlpha: 0 })
    response.forEach(el => jquerySlider[0].insertAdjacentHTML('beforeend', `<img src="${el}">`));
    jquerySlider.slick({
        slide: 'img',
        arrows: false,
    });
    // gsap.to(jquerySlider[0], { autoAlpha: 1 })
    console.log(jquerySlider[0]);
};


function deleteEl(el) {
    el.remove();
};



// document.querySelector('.build-progress-nav-wrap').addEventListener('mousemove', function(evt) {
//     arrow.hide();
// });