/**
 * Переадресация для дальнейшей навигации
 * (предотвращает перезагрузку при первом клике на меню)
 */
window.location.href = 'index.html#main';

/**
 * Импорт стилей
 */
import '../../sass/main.scss';
import '../../sass/swiper.css';
import './index.scss';
import 'normalize.css';

/**
 * @todo импорт расширений babel  
 */
// import 'core-js';
// import 'babel-polyfill';
// import 'babel-preset-es2015-ie';
// import 'es6-shim';
// import 'babel-plugin-transform-es2015-arrow-functions';


/**
 * Импорт компонентов карты, слайдера, модального окна и класса анимации
 */
import ymaps from 'ymaps';
import Swiper from 'swiper/dist/js/swiper.js'; // http://idangero.us/swiper/api/
import createMenu from '../../components/aside/aside';
import Modal from '../../components/modal/modal';
import Animation from './animate.js';


/**
 * Инициализация и установка параметров слайдера
 */
const initSwiper = () => {
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
};

/**
 * Функция установки высоты секции слайдера в размер экрана
 * @return {Element} [первая секция]
 */
const setSectionHeight = () => {
    if (document.documentElement.clientWidth >= 1200) {
        const wheight = document.documentElement.clientHeight;
        let sections = document.querySelectorAll('section')[0];
        [].map.call(sections, elem => {elem.style.height = wheight + 'px'});
        return sections;
    }
};

/**
 * Инициализация и настройка параметров Яндекс карты
 */

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

/**
 * Инициализация класса анимаций
 */
const anim = new Animation;

/*********************************************************************/
/**********************  При загрузке страницы **********************/
/********************************************************************/ 

$(window).ready(function() {
    setSectionHeight();    
    initSwiper();
    /**
     * Инициализация и запуск класса анимации для десктопов
     */
    if (document.documentElement.clientWidth >= 576) {
        anim.description();
        anim.play();
    }
});

/*********************************************************************/
/**********************  При прокрутке страницы **********************/
/********************************************************************/

$(window).scroll(function () {
    /**
     * Запуск анимации при прокрутке
     */
    if (document.documentElement.clientWidth >= 576) {
        anim.play();
    }
});