import '../../sass/main.scss';
import '../../sass/swiper.css';
import './index.scss';
import 'normalize.css';
import 'core-js';

import ymaps from 'ymaps';
import Swiper from 'swiper'; // http://idangero.us/swiper/api/

import createMenu from '../../components/aside/aside';
import Modal from '../../components/modal/modal';
import Animation from './animate.js';

// Slider

var swiper = new Swiper('.swiper-container', {
    speed: 500,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
    },
});

// Высота секций в размер экрана

const setSectionHeight = () => {
    if (document.documentElement.clientWidth >= 1200) {
        let wheight = document.documentElement.clientHeight;
        const sections = document.querySelectorAll('section');
        [].map.call(sections, function(elem) {
            elem.style.height = wheight + 'px';
        });
        return sections;
    }
};

// Правки для Firefox

const get_name_browser = () => {  
    const ua = navigator.userAgent;
    if (ua.search(/Edge/) > 0) return 'Edge';
    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
    if (ua.search(/Trident/) > 0) return 'Trident';
    return 'Не определен';
};

if (get_name_browser() == 'Firefox') {
    const sliderImage = document.querySelectorAll('.swiper-slide');
    [].forEach.call(sliderImage, image => {
        image.children[0].style.width = 'unset';
    });    
}

// Карта

ymaps.load().then(maps => {
    const map = new maps.Map(document.getElementById('map'), {
        center: [60.699, 28.752],
        zoom: 14,
    });
    map.behaviors.disable('scrollZoom');
    const Placemark = new maps.Placemark([60.699, 28.752], { 
        hintContent: 'Вереск!', 
        balloonContent: '', 
    });

    map.geoObjects.add(Placemark);
}).catch(error => console.log('Failed to load Yandex Maps', error));  

// Анимации

const anim = new Animation;

$(window).ready(function() {
    setSectionHeight();
    if (document.documentElement.clientWidth >= 1200) {
        anim.description();
        anim.play();
    }
});

$(window).scroll(function () {
    if (document.documentElement.clientWidth >= 1200) {
        anim.play();
    }
});

$(window).resize(function () {
    setSectionHeight();
});
