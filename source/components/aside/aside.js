import './aside.scss';
import 'normalize.css';
import Animation from '../../libs/animate.js';
import MicroModal from 'micromodal';


var mainMenu = document.querySelector('.main-menu');
var collapseTrigger = mainMenu.querySelector('.collapse-trigger');
var menuCollapse = mainMenu.querySelector('.products-menu');
var menuItem = mainMenu.querySelectorAll('.products-menu__item');





for(var i = 0; i < menuItem.length; i++) {
	menuItem[i].addEventListener('mouseover', function (e) {
		this.style.backgroundColor = '#0e0ab3';
		var prodMenuLink = this.children[0];
		prodMenuLink.style.color = '#fff';
	});

	menuItem[i].addEventListener('mouseout', function (e) {
		this.style.backgroundColor = '#6d75ff';
		var prodMenuLink = this.children[0];
		prodMenuLink.style.color = '';
	});
	menuItem[i].addEventListener('click', function (e) {
		e.stopPropagation();
	});
}

var productsLink = document.getElementById('products');
productsLink.addEventListener('click', function(e) {
	e.preventDefault();
});

// Stop menu folding on category click

var vafliLink = document.getElementById('vafli');
var tubesLink = document.getElementById('tubes');
var tortsLink = document.getElementById('torts');
var dietsLink = document.getElementById('diets');

vafliLink.addEventListener('click', function(e) {
	e.stopPropagation();
});

tubesLink.addEventListener('click', function(e) {
 	e.stopPropagation();
});

tortsLink.addEventListener('click', function(e) {
 	e.stopPropagation();
});

dietsLink.addEventListener('click', function(e) {
 	e.stopPropagation();
});

collapseTrigger.addEventListener('click', function(e) {
	$(menuCollapse).slideToggle(500);
});



 //scroll to section

 function Scroll(elem, section) {
	 elem.click(function() {
	    var offset = 20; //Offset of 20px

	    $('html, body').animate({
	        scrollTop: section.offset().top + offset
	    }, 1000);
	});	
 }

var mainLink = $('.main-menu__link[href = "index.html#main"]');
var aboutLink = $('.main-menu__link[href = "index.html#about"]');
var contactsLink = $('.main-menu__link[href = "index.html#contacts"]');

Scroll(mainLink, $('#main'));
Scroll(aboutLink, $('#about'));
Scroll(contactsLink, $('#contacts'));

//toggle hamburger menu

$('#hamburger-9').on('click', function(){
  $(this).toggleClass("is-active");
  $('.aside').toggleClass("is-open");
});


// export default function (menuObj, className) {
//     var menu = document.createElement("ul");    
//     menu.className = className;
//     var listItems = '';
//     var menuParsed = JSON.stringify(menuObj);
//     console.log(menuParsed);
// 	var keys = Object.keys(menuObj);
// 	for(let i =0; i < keys.length; i++) {
// 	 let key = keys[i];
// 	}
//     for (var key in menuObj) {
//     	var menuLink = menuObj[key];
// 		listItems += `<li><a href = "${key}">` + menuObj[key] + '</a></li>';
//     }
//     menu.innerHTML = listItems;
//     return menu;
// }
