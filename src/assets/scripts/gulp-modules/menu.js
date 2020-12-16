/* beautify preserve:start */
@@include('../libs/headroom/headroom.js')
/* beautify preserve:end */
    /**fixed footer handler */



/**
 * 
 * std function
 * 
 */



const throttle = (func, limit) => {
    let inThrottle
    return function() {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

function showHeadMouseHandle(evt) {

    header.classList.add('headroom--pinned');
    header.classList.remove('headroom--unpinned');

}
let showHeadMouseHandleTrottled = throttle(showHeadMouseHandle, 500);





const fixedFooter = document.querySelector('.fixed-footer');

function fixedFooterTranslateOnPageBottom() {
    /**Процент прогреса скролла страницы, после которого идет слежка за футером */
    const coef = 0.9;
    let isNearBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight * coef;
    if (!isNearBottom) return;
    let footerHeight = document.querySelector('.footer-bottom').getBoundingClientRect().height;
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        fixedFooter.style.transform = `translateY(${footerHeight*-1}px)`;
    } else {
        fixedFooter.style.transform = `none`;
    }
}
window.addEventListener('scroll', fixedFooterTranslateOnPageBottom);
/**fixed footer handler END */

function windowScrollHandler(action) {
    let actions = {
        off: '',
        on: 'hidden'
    };
    document.documentElement.style.overflow = actions[action];
}
// document.querySelector("header").style.border = "1px solid yellow"
// const SCREEN_WIDTH = window.screen.width;
let header = document.querySelector('.header');
header.currentTheme = '';
let menuCall = document.querySelector(".js-menu-call");
let topMenu = document.querySelector('.js-top-menu');
let headerThemes = ['light', 'dark'];

function switchTheme(elem, theme) {
    headerThemes.forEach(el => elem.classList.remove(el));
    elem.classList.add(theme);
    elem.currentTheme = theme;
    // console.log(elem);
    // console.log('---------');
    // console.log(elem.currentTheme);
}

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
        menuOpeningHandler(topMenu);
        this.classList.toggle("opened");
    }
}



function menuOpeningHandler(menu) {
    menu.classList.toggle("opened");
    header.classList.toggle('opened');
    if (menu.classList.contains('opened')) {
        switchTheme(header, headerThemes[1]);
        let tl = new TimelineLite();
        tl.fromTo('.top-menu__left', { y: '-100%' }, { y: '0' });
        tl.fromTo('.top-menu__right', { y: '100%' }, { y: '0' }, '<');
        tl.fromTo('.top-menu__group', { y: 50, autoAlpha: 0.5 }, { y: 0, ease: Power4.easeOut, autoAlpha: 1, duration: 1, stagger: 0.2 }, '-=0.5')
    } else {
        switchTheme(header, headerThemes[0]);
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
                windowScrollHandler('on');
            } else {
                button.querySelector(".header__menu-button-text").textContent = mutation.target.dataset.text1;
                windowScrollHandler('off');

            }
        }
    })

}
let menuCallObserver = new MutationObserver(switchMenuButtonState);
menuCallObserver.observe(menuCall, observerConfig);
menuCall.addEventListener("click", headerMenuButtonAnimate);
menuCall.addEventListener("mouseenter", headerMenuButtonAnimate);
menuCall.addEventListener("mouseleave", headerMenuButtonAnimate);



/**Включения ефекта помех при наведении на елементы*/
document.querySelectorAll('.watch-more__block').forEach(el => {
    el.addEventListener('mouseenter', function(evt) {
        this.querySelector('.glitch').classList.add('active')
    });
    el.addEventListener('mouseleave', function(evt) {
        this.querySelector('.glitch').classList.remove('active')
    });
});


//светлый хедер

var whiteHeader = ['build-progress', 'video-about', 'gallery', 'index'];
var pageId = document.querySelector('.page__inner').getAttribute('id');

if (whiteHeader.includes(pageId) && document.documentElement.clientWidth > 575) {
    header.classList.add('light');
    window.addEventListener('scroll', function(evt) {
        if (document.documentElement.scrollTop > document.documentElement.clientHeight * 0.8) {
            header.classList.remove('light');
        } else {
            header.classList.add('light');
        }
    });
}




/**Мобильный перенос елементов */

if (document.documentElement.clientWidth < 769) {
    dqsA('.js-footer-contact-row').forEach(el => {
        el.style.marginTop = `var(--gap)`;
        document.querySelector('.js-footer__social-group').insertAdjacentElement('beforebegin', el);
    })

}


function dqsA(selector) {
    return document.querySelectorAll(selector);
}
/**Мобильный перенос елементов END */


/**Скрытие Хедера при скролле вниз */
new Headroom(header, { offset: 500, }).init();

document.body.addEventListener('mousemove', (evt) => {
    if (evt.clientY > 350) return;
    showHeadMouseHandleTrottled(evt)
})