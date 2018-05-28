/**
 * Импорт стилей
 */
import '../../sass/main.scss';
import './products.scss';
import 'normalize.css';

/**
 * Импорт компонента меню, объекта категорий и функции рендеринга продукции
 */
import createMenu from '../../components/aside/aside';
import { renderProducts, PRODUCT_CATEGORIES } from './renderProducts.js';
// import loadProduction from './load';

// --------------------------------------------------------------------------------------------------------------------------------------

/**
 * Подключаем API contentful
 */
import * as contentful from 'contentful';
const client = contentful.createClient({
  space: '8wup12v4ck67', //fvwpxwob4rjn
  accessToken: '489e656b6e4ca98d652374f643e13ed299ae2a97daf145491cf5092dc24f231f', //9dd7bfbe40eb7ddc918a402442cc428ef8da74747746bea8945c1c653417878d
});

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
    if (productHeight >= productBlockHeight) {
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
    e.preventDefault();
    let item = this.closest('.product-item');
    let $modalW = $(item).find('.product-modal__overlay');
    $('html, body').css('overflow-y', 'hidden');
    $modalW.fadeIn(500);
  });
  modalClose.on('click', function() {
    let itemToClose = this.closest('.product-modal__overlay');
    $(itemToClose).fadeOut(500);
    $('html, body').css('overflow-y', 'auto');
  });

  $(document).keyup(function(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      let itemToClose = $('.product-modal__overlay');
      $(itemToClose).fadeOut(500);
      $('html, body').css('overflow-y', 'auto');
    }
  });
};

/**
 * Функция оставяет меню открытым при переходе по категориям
 */
const menuOpen = () => {
  const mainMenu = document.querySelector('.main-menu');
  const collapseTrigger = mainMenu.querySelector('.collapse-trigger');
  const menuCollapse = mainMenu.querySelector('.products-menu');
  const event = new Event('loadClick');
  // prettier-ignore
  collapseTrigger.addEventListener( 'loadClick', () => { menuCollapse.classList.remove('hidden');}, false);
  collapseTrigger.dispatchEvent(event);
};

/**
 * Функция меняет товары категории при нажатии на соответствующий пункт меню
 */
const changeCategory = () => {
  const vafliLink = document.getElementById('vafli');
  const tubesLink = document.getElementById('tubes');
  const tortsLink = document.getElementById('torts');
  const dietsLink = document.getElementById('diets');

  vafliLink.addEventListener('click', e => {
    changeProduction(e, PRODUCT_CATEGORIES.products.id, '#vafli');
  });
  tubesLink.addEventListener('click', e => {
    changeProduction(e, PRODUCT_CATEGORIES.tubes.id, '#tubes');
  });
  tortsLink.addEventListener('click', e => {
    changeProduction(e, PRODUCT_CATEGORIES.torts.id, '#torts');
  });
  dietsLink.addEventListener('click', e => {
    changeProduction(e, PRODUCT_CATEGORIES.diets.id, '#diets');
  });
};

/**
 * Функция, обнуляет контейнер для товров и заполняет его вновь созданным списком
 * @param {Object} data [данные, полученные от сервера]
 */
const fillProducts = data => {
  let container = document.querySelector('.products-wrapper');
  container.innerHTML = '';
  let fragment = document.createDocumentFragment();

  data.items.forEach(function(item) {
    fragment.appendChild(renderProducts(item));
  });
  container.appendChild(fragment);
};

/**
 * Функция-promise получения объекта с товарами соответственной категории,
 * и вызова функций, формирующих список товаров
 * @param {String} id [id категории]
 */
const loadProduction = function(category_id) {
  client
    .getEntries({
      content_type: category_id,
      order: 'fields.order',
    })
    .then(function(entries) {
      fillProducts(entries);
    })
    .then(function() {
      correctHeights();
      emitModal();
    });
};

/**
 * Функция подгрузки товаров соответствующей категории, вставляем на страницу
 * отрендеренный блок с товарами и стилизуем соответствующую ссылку в меню
 */
const renderProductList = () => {
  let hash = window.location.hash;
  let categoryLinks = document.querySelectorAll('.products-menu__link');
  if (hash === '#vafli') {
    loadProduction(PRODUCT_CATEGORIES.products.id);
    categoryLinks[0].parentElement.classList.add('products-menu__item--active');
  } else if (hash === '#tubes') {
    loadProduction(PRODUCT_CATEGORIES.tubes.id);
    categoryLinks[1].parentElement.classList.add('products-menu__item--active');
  } else if (hash === '#torts') {
    loadProduction(PRODUCT_CATEGORIES.torts.id);
    categoryLinks[1].parentElement.classList.add('products-menu__item--active');
  } else if (hash === '#diets') {
    loadProduction(PRODUCT_CATEGORIES.diets.id);
    categoryLinks[1].parentElement.classList.add('products-menu__item--active');
  }
};

/**
 * Функция загрузки страницы с товарами при нажатии на пункт меню, с вызовом прокрутки вверх
 * @param  {Object} evt
 * @param  {number} idx  [индекс категории]
 * @param  {String} hash [хеш строки ввода]
 */
const changeProduction = (evt, id, hash) => {
  evt.preventDefault();
  window.location.hash = hash;
  loadProduction(id);
  $('html, body').animate({ scrollTop: 0 }, 1000);
};

/*********************************************************************/
/**********************  При загрузке страницы **********************/
/********************************************************************/

$(document).ready(function() {
  /**
   * Устанавливаем фоновую картику в меню
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
  menuOpen();
  /**
   * При смене категории
   */
  changeCategory();
});
