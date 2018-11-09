/**
 * Импорт стилей
 */
import './aside.scss';
import 'normalize.css';
/**
 * Импорт компонента модального окна
 */
import Modal from '../modal/modal';

/**
 * Функция окрашивает пункты меню при наведении
 * а также предотвращает распространение события нажатия
 */
const colorizeMenu = () => {
  const menuItems = document.querySelectorAll('.products-menu__item');
  for (let menuItem of menuItems) {
    menuItem.addEventListener('mouseover', function() {
      this.style.backgroundColor = '#0e0ab3';
      let prodMenuLink = this.children[0];
      prodMenuLink.style.color = '#fff';
      // this.style.backgroundColor = (e.type === 'mouseover') ? '#0e0ab3' : '#6d75ff';
    });

    menuItem.addEventListener('mouseout', function() {
      this.style.backgroundColor = '#6d75ff';
      let prodMenuLink = this.children[0];
      prodMenuLink.style.color = '';
    });
    menuItem.addEventListener('click', e => e.stopPropagation());
  }
};

/**
 * Функция предотвращает складывание меню при нажатии на ссылку (предотвращает всплывание)
 * и окрашивает нажатую ссылку
 */
const preventLinks = () => {
  let categoryLinks = document.querySelectorAll('.products-menu__link');
  for (let categoryLink of categoryLinks) {
    categoryLink.addEventListener('click', e => {
      e.stopPropagation();

      // В обход делегирования

      const getSiblings = n =>
        [...n.parentElement.parentElement.children].filter(c => c.nodeType == 1 && c != n);
      let siblings = getSiblings(categoryLink);
      for (let sibling of siblings) {
        sibling.classList.remove('products-menu__item--active');
      }
      e.target.parentElement.classList.add('products-menu__item--active');
    });
  }
};

/**
 * Функция прокрутки окна к определенной секции
 * @param  {Element} elem    [ссылка для нажатия]
 * @param  {Element} section [секция страницы]
 */
const scrollTo = (elem, section) => {
  elem.click(() => {
    const offset = 20; //Offset of 20px

    $('html, body').animate(
      {
        scrollTop: section.offset().top + offset,
      },
      1000,
    );
  });
};

/**
 * Функция открытия/закрытия мобильного меню
 */
const toggleMenu = () => {
  const menuToggler = document.querySelector('#hamburger-9');
  const menuBlock = document.querySelector('.aside');
  menuToggler.addEventListener('touchstart', function(e) {
    e.preventDefault();
    e.target.classList.toggle('is-active');
    menuBlock.classList.toggle('is-open');
  });
};

/*********************************************************************/
/**********************  При загрузке модуля *************************/
/********************************************************************/

$(document).ready(function() {
  colorizeMenu();
  preventLinks();
  /**
   * Предотвращение перехода по ссылке при нажатии на пункт меню
   */
  const productsLink = document.getElementById('products');
  productsLink.addEventListener('click', e => e.preventDefault());

  /**
   * Обработчик открытия/закрытия меню с товарами
   */
  const collapseTrigger = document.querySelector('.collapse-trigger');
  const menuCollapse = document.querySelector('.products-menu');

  collapseTrigger.addEventListener('click', () => $(menuCollapse).slideToggle(500));

  /**
   * Вызов функций прокрутки к секциям
   */
  const mainLink = $('.main-menu__link[href = "index.html#main"]');
  const aboutLink = $('.main-menu__link[href = "index.html#about"]');
  const contactsLink = $('.main-menu__link[href = "index.html#contacts"]');

  scrollTo(mainLink, $('#main'));
  scrollTo(aboutLink, $('#about'));
  scrollTo(contactsLink, $('#contacts'));

  /**
   * Вызываем функцию мобильного меню
   */
  toggleMenu();
});
