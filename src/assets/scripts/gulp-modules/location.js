$('.location-vert-slider').slick({
    vertical: true,
    slide: '.slide',
    speed: 1500,
    slidesToShow: 1,
    nextArrow: '.vertical-arrows .next',
    prevArrow: '.vertical-arrows .prev',
});


$('.location-vert-slider').on('beforeChange', () => {
    document.querySelector('.location-vert-slider').classList.add('glitched-title');
})
$('.location-vert-slider').on('afterChange', () => {
    document.querySelector('.location-vert-slider').classList.remove('glitched-title');
})



/**mobile elements moving */

if (document.documentElement.clientWidth < 576) {

    var sticker = document.querySelector('.location-sticker');
    document.querySelector('.double-part-section').insertAdjacentElement('beforeend', sticker);
    document.querySelector('.double-part-section').style.paddingBottom = sticker.getBoundingClientRect().height + 'px';
    document.querySelector('.double-part-section').style.position = 'relative';
}
/**mobile elements moving END */