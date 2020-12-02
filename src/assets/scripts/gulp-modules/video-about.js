function videoAboutHandler() {
    let video = document.querySelector('video');
    let arrow = document.querySelector('.arrow');
    let interval = setInterval(() => {
        // console.log('ssss');
        arrow.querySelector('.progress-indecator').style.clipPath = (function() {
            return `polygon(0 0, 
                ${100 * (video.currentTime / video.duration)}% 0, 
                ${100 * (video.currentTime / video.duration)}% 100%, 0% 100%)`;
            return `calc(100% * ${video.currentTime / video.duration})`;
        })()
    }, 50);
    if (video.paused) {

        // arrow.style.transform = `translate(-50%,${document.documentElement.clientHeight / 2.2}px)`;

        // gsap.to(arrow, { y: document.documentElement.clientHeight / 2 });
        gsap.to(arrow, { y: document.documentElement.clientHeight - arrow.getBoundingClientRect().bottom - arrow.getBoundingClientRect().height });
        arrow.querySelector('.play').style.opacity = '0';
        arrow.querySelector('.pause').style.opacity = '1';
        // video.play();
        playVideo(video);
        // alert(video.paused)
    } else {
        clearInterval(interval);
        arrow.style.transform = `translate(-50%,-50%)`;
        arrow.querySelector('.play').style.opacity = '1';
        arrow.querySelector('.pause').style.opacity = '0';
        video.pause()
    }
    video.addEventListener('pause', function(evt) {
        clearInterval(interval);
    });
    video.addEventListener('ended', function(evt) {
        clearInterval(interval);
        arrow.style.transform = `translate(-50%,-50%)`;
        arrow.querySelector('.play').style.opacity = '1';
        arrow.querySelector('.pause').style.opacity = '0';
        arrow.querySelector('.progress-indecator').style.clipPath = 'polygon(0 0, 0% 0, 0% 0%, 0% 0%)';
    });
    video.addEventListener('error', (e) => {

    })
}



function playVideo(video) {
    try {
        video.play();
        video.classList.add("playing");
    } catch (err) {
        video.classList.remove("playing");
    }
}