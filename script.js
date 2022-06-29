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
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    }

    document.body.addEventListener('click', (event) => {
        let target = event.target
        console.dir(target)
        if(target.closest('.menu') || target.classList.contains('close-btn') ){handlerMenu();}
    
        if((target.localName === 'a' && target.parentNode.parentNode.parentNode.localName === "menu") || (target.localName === 'img' && target.parentNode.parentNode.localName === "main")) {
            target = target.closest('a')
            event.preventDefault()
            handlerMenu();
            const blockID = target.getAttribute('href').substr(1)
            console.log(blockID)
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    })
}

toogleMenu();

const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
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

    popup.addEventListener('click',  ()=>{
        let target = event.target

        if(target.classList.contains('popup-close')) {
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content')
        }
        if (!target) {
        
        }
    })
}

togglePopUp();

//табы

const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
    tab = tabHeader.querySelectorAll('.service-header-tab'),
    tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
        for(let i=0; i< tabContent.length; i++) {
            if(index === i) {
                tab[i].classList.add('active')
                tabContent[i].classList.remove('d-none');
            } else {
                tab[i].classList.remove('active')
                tabContent[i].classList.add('d-none');
            }
        }
    };

    tabHeader.addEventListener('click', (event) => {
        let target = event.target;
        if (target) {
        target = target.closest('.service-header-tab');
            tab.forEach((item, i) => {
                if(item === target) toggleTabContent(i)
            });
        }
    })
}

tabs();