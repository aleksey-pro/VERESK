import './aside.scss';
import 'normalize.css';

const mainMenu = document.querySelector('.main-menu');
const collapseTrigger = mainMenu.querySelector('.collapse-trigger');
const menuCollapse = mainMenu.querySelector('.products-menu');
const menuItems = mainMenu.querySelectorAll('.products-menu__item');
import Modal from '../modal/modal';

collapseTrigger.addEventListener('click', () => $(menuCollapse).slideToggle(500));

// Menu hover effects

for(let menuItem of menuItems) {
  menuItem.addEventListener('mouseover', function() {
	this.style.backgroundColor = '#0e0ab3';
	let prodMenuLink = this.children[0];
	prodMenuLink.style.color = '#fff';
 });

  menuItem.addEventListener('mouseout', function() {
	this.style.backgroundColor = '#6d75ff';
	let prodMenuLink = this.children[0];
	prodMenuLink.style.color = '';
});
  menuItem.addEventListener('click', e => e.stopPropagation());
}

const productsLink = document.getElementById('products');
productsLink.addEventListener('click', e => e.preventDefault());

// Stop menu folding on category click and colorize links

let categoryLinks = document.querySelectorAll('.products-menu__link');
for(let categoryLink of categoryLinks) {
  categoryLink.addEventListener('click', e => {
		e.stopPropagation();

		// В обход делегирования

		const getSiblings = n => [...n.parentElement.parentElement.children].filter(c => c.nodeType == 1 && c != n);
		let siblings = 	getSiblings(categoryLink);
		for(let sibling of siblings) {
			sibling.classList.remove('products-menu__item--active');
		}	
		e.target.parentElement.classList.add('products-menu__item--active');
  });
}

// scroll to section

const Scroll = (elem, section) => {
  elem.click(() => {
    const offset = 20; //Offset of 20px

    $('html, body').animate({
        scrollTop: section.offset().top + offset
    }, 1000);
  });
}

const mainLink = $('.main-menu__link[href = "index.html#main"]');
const aboutLink = $('.main-menu__link[href = "index.html#about"]');
const contactsLink = $('.main-menu__link[href = "index.html#contacts"]');

Scroll(mainLink, $('#main'));
Scroll(aboutLink, $('#about'));
Scroll(contactsLink, $('#contacts'));

// toggle hamburger menu

const menuToggler = document.querySelector('#hamburger-9');
const menuBlock = document.querySelector('.aside');
menuToggler.addEventListener('touchstart', function(e) {
	e.preventDefault();
    e.target.classList.toggle("is-active");
    menuBlock.classList.toggle("is-open");
});
