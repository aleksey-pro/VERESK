/**
 * Импорт стилей
 */
import '../../sass/main.scss';
import './products.scss';
import 'normalize.css';

/**
 * Импорт компонентов меню, рендеринга продуктов и функции работы с сервером
 */
import createMenu from '../../components/aside/aside';
import {fillProducts} from './renderProducts.js';
import loadProduction from './load';

/**
 * Функция корректироки высоты блока с фотогорафиями продукции.
 * Наблюдается в некоторых браузерах - картинка вылезает за блок
 */
const correctHeights = () => {	    
    const productBlocks = document.querySelectorAll('.product-item__image');

    [].forEach.call(productBlocks, productBlock => {
        let productBlockHeight = productBlock.offsetHeight;
        let productImage = productBlock.children[0];
        let productHeight = productImage.offsetHeight;
        if(productHeight >= productBlockHeight) {
            productImage.style.height = '100%';
        }
    });    
};

/**
 * Функция открытия модального окна при нажатии на фото,
 * и закрытия по кнопке или ESC
 */

const emitModal = () => {
    const ENTER_KEYCODE = 27; 
    const modalLinks = $('.big-image-link');
    const modalClose = $('.modal__close');

    modalLinks.on('click', function(e) {
        console.log('click');
        e.preventDefault();
        let item = this.closest('.product-item');
        let $modalW = $(item).find('.product-modal__overlay');
        $modalW.fadeIn(500);
    });    
    modalClose.on('click', function() {
        let itemToClose = this.closest('.product-modal__overlay');    
        $(itemToClose).fadeOut(500);
    });

    $(document).keyup(function(e) {
        if (e.keyCode === ENTER_KEYCODE) {
            let itemToClose = $('.product-modal__overlay'); 
            $(itemToClose).fadeOut(500);
        }
    });
};

/**
 * Вызов 2 функций в коллбеке onLoadEnd
 */
const composeCallbacks = () => {
    correctHeights();
    emitModal();
};


/**
 * Функция подгрузки товаров соответствующей категории, вставляем на страницу
 * отрендеренный блок с товарами и стилизуем соответствующую ссылку в меню
 */
const renderProductList = () => {
    let hash = window.location.hash;
    let categoryLinks = document.querySelectorAll('.products-menu__link');
    if(hash === '#vafli') {
        loadProduction(0, fillProducts, composeCallbacks);
        categoryLinks[0].parentElement.classList.add('products-menu__item--active');
    }else if (hash === '#tubes') {
        loadProduction(1, fillProducts, composeCallbacks);
        categoryLinks[1].parentElement.classList.add('products-menu__item--active');
    }else if (hash === '#torts') {
        loadProduction(2, fillProducts, composeCallbacks);
        categoryLinks[2].parentElement.classList.add('products-menu__item--active');
    }else if (hash === '#diets') {
        loadProduction(3, fillProducts, composeCallbacks);
        categoryLinks[3].parentElement.classList.add('products-menu__item--active');
    }        
};

/**
 * Функция загрузки страницы с товарами и прокрутки вверх
 * @param  {Object} evt 
 * @param  {number} idx  [индекс категории]
 * @param  {String} hash [хеш строки ввода]
 */
const changeProduction = (evt, idx, hash) => {
    evt.preventDefault();
    window.location.hash = hash;
    loadProduction(idx, fillProducts, composeCallbacks);
    $('html, body').animate({scrollTop: 0}, 1000);
};

/*********************************************************************/
/**********************  При загрузке страницы **********************/
/********************************************************************/

$(document).ready(function() {
    /**
     * Устанавливаем фоновую картику 
     */
    const leftImage = document.querySelector('.aside');
    leftImage.style.backgroundImage = 'url(images/menu_bg_1.jpg)';	
    /**
     * Подгружаем товары категории, по которой перешли на страницу
     */
    renderProductList();    

    /**
     * Заставляем меню оставаться открытым при загрузке страницы с товарами
     */
    const mainMenu = document.querySelector('.main-menu');
    const collapseTrigger = mainMenu.querySelector('.collapse-trigger');
    const menuCollapse = mainMenu.querySelector('.products-menu');
    const event = new Event('loadClick');

    collapseTrigger.addEventListener('loadClick', () => { 
        menuCollapse.classList.remove('hidden');        
    }, false);
    collapseTrigger.dispatchEvent(event);

    /**
     * Меняем товары соответствующей категории при нажатии на соответствующий пункт меню
     */
    const vafliLink = document.getElementById('vafli');
    const tubesLink = document.getElementById('tubes');
    const tortsLink = document.getElementById('torts');
    const dietsLink = document.getElementById('diets');

    vafliLink.addEventListener('click', e => {
        changeProduction(e, 0, '#vafli');
    });
    tubesLink.addEventListener('click', e => {
        changeProduction(e, 1, '#tubes');
    });
    tortsLink.addEventListener('click', e => {
        changeProduction(e, 2, '#torts');
    });
    dietsLink.addEventListener('click', e => {
        changeProduction(e, 3, '#diets');
    });

    emitModal();

});