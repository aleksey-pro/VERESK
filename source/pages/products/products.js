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
// import { fillProducts } from './renderProducts.js';
// import loadProduction from './load';

// --------------------------------------------------------------------------------------------------------------------------------------

const contentful = require('contentful');

const client = contentful.createClient({
  space: 'fvwpxwob4rjn',
  accessToken: '9dd7bfbe40eb7ddc918a402442cc428ef8da74747746bea8945c1c653417878d',
});

const PRODUCT_CATEGORIES = {
  products: { id: 'product', title: 'ВАФЛИ' },
  tubes: { id: 'tubes', title: 'ВАФЕЛЬНЫЕ ТРУБОЧКИ' },
  torts: { id: 'torts', title: 'ТОРТЫ' },
  diets: { id: 'diets', title: 'ДИЕТИЧЕСКАЯ ПРОДУКЦИЯ' },
};

const loadProduction = function(category_id) {
  client
    .getEntries({
      content_type: category_id,
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
 * Вспомогательная функция извлечения значения из строки, заполняемой
 * характеристиками товара
 * @param {String} item [запись в массиве характеристик товара]
 * @return {String}
 */
const extractVal = item => {
  const resArr = item.split(' ');
  const lastRes = resArr[resArr.length - 1];
  return lastRes;
};

const renderProducts = item => {
  const productsTemplate = document.querySelector('template').content;
  const product = productsTemplate.cloneNode(true);

  let catTitle = product.querySelector('.products-heading');
  if (item.sys.contentType.sys.id === 'products') {
    catTitle.textContent = PRODUCT_CATEGORIES.products.title;
  } else if (item.sys.contentType.sys.id === 'tubes') {
    catTitle.textContent = PRODUCT_CATEGORIES.tubes.title;
  } else if (item.sys.contentType.sys.id === 'torts') {
    catTitle.textContent = PRODUCT_CATEGORIES.torts.title;
  } else if (item.sys.contentType.sys.id === 'diets') {
    catTitle.textContent = PRODUCT_CATEGORIES.diets.title;
  }

  if (item.fields.title)
    product.querySelector('.product-desc__title').textContent = item.fields.title;
  if (item.fields.description)
    product.querySelector('.product-desc__text').textContent = item.fields.description;
  if (item.fields.image.fields.file.url)
    product.querySelector('.main-image').src = item.fields.image.fields.file.url;
  if (item.fields.bigImage.fields.file.url)
    product.querySelector('.big-image').src = item.fields.bigImage.fields.file.url;
  // prettier-ignore
  if (item.fields.chars[0]) product.querySelector('.desc-param__value--before').textContent = extractVal(item.fields.chars[0]);
  // prettier-ignore
  if (item.fields.chars[1]) product.querySelector('.desc-param__value--fasovka').textContent = extractVal(item.fields.chars[1]);
  // prettier-ignore
  if (item.fields.chars[2]) product.querySelector('.desc-param__value--numPerBox').textContent = extractVal(item.fields.chars[2]);
  // prettier-ignore
  if (item.fields.chars[3]) product.querySelector('.desc-param__value--weight').textContent = extractVal(item.fields.chars[3]);
  // prettier-ignore
  if (item.fields.chars[4]) product.querySelector('.desc-param__value--box').textContent = extractVal(item.fields.chars[4]);

  return product;
};

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
 * Функция загрузки страницы с товарами при нажатии на пункт меню, с вызовом прокрутки вверх
 * @param  {Object} evt
 * @param  {number} idx  [индекс категории]
 * @param  {String} hash [хеш строки ввода]
 */
const changeProduction = (evt, id, hash) => {
  evt.preventDefault();
  window.location.hash = hash;
  loadProduction(id); //fillProducts
  $('html, body').animate({ scrollTop: 0 }, 1000);
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
  // prettier-ignore
  collapseTrigger.addEventListener( 'loadClick', () => { menuCollapse.classList.remove('hidden');}, false);
  collapseTrigger.dispatchEvent(event);

  /**
   * Меняем товары соответствующей категории при нажатии на соответствующий пункт меню
   */
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

  emitModal();
});
