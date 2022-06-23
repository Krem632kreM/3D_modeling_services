window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function counterTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimerRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining,
                seconds,
                minutes,
                hours;

            if ((dateStop - dateNow) <= 0) {
                timeRemaining = 0;
                seconds = ('0' + 0);
                minutes = ('0' + 0);
                hours = ('0' + 0);
                clearInterval(key);
            } else {
                timeRemaining = (dateStop - dateNow) / 1000;

                let s = Math.floor(timeRemaining % 60),
                    m = Math.floor((timeRemaining / 60) % 60),
                    h = Math.floor(timeRemaining / 60 / 60);

                seconds = (s > 9 && s <= 60) ? s : ('0' + s);
                minutes = (m > 9 && m <= 60) ? m : ('0' + m);
                hours = (h > 9 && h <= 60) ? h : ('0' + h);

            }
            timerHours.textContent = hours;
            timerMinutes.textContent = minutes;
            timerSeconds.textContent = seconds;

        }
        getTimerRemaining();

    }

    const key = setInterval(counterTimer, 1000, '25 june 2022');
});

const toogleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
        menu = document.querySelector('menu'),
        closeBtn = document.querySelector('.close-btn'),
        menuItems = menu.querySelectorAll('ul > li');
    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    }
    btnMenu.addEventListener('click', handlerMenu);

    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));

    for (let menuItem of menuItems) {
        menuItem.addEventListener('click', function (e) {
            e.preventDefault()
            console.log(menuItem)

            const blockID = menuItem.querySelector('a').getAttribute('href').substr(1)

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }
}

document.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault()
    const blockID = document.querySelector('a').getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

toogleMenu();

const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close'),
        popupContent = popup.querySelector('.popup-content');


    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if (document.documentElement.clientWidth > 768) {
                let start = Date.now(); // запомнить время начала

                let timer = setInterval(function () {
                    let timePassed = Date.now() - start;

                    if (timePassed >= 750) {
                        clearInterval(timer);
                        return;
                    }

                    draw(timePassed);

                }, 20);

                function draw(timePassed) {
                    popupContent.style.left = timePassed / 0.75 + 'px';
                }
            } else {
                popupContent.style.top = `10px`;
            }
        })
    })

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    })
}

togglePopUp();