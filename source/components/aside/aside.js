import './aside.scss';
import 'normalize.css';
import Animation from '../../libs/animate.js';


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
		prodMenuLink.style.color = '#000';
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
	// e.preventDefault();
	e.stopPropagation();
	// loadProduction(0);	
});

tubesLink.addEventListener('click', function(e) {
 	// e.preventDefault();
 	e.stopPropagation();
 	// loadProduction(1);
});

tortsLink.addEventListener('click', function(e) {
 	// e.preventDefault();
 	e.stopPropagation();
 	// loadProduction(2);
});

dietsLink.addEventListener('click', function(e) {
 	// e.preventDefault();
 	e.stopPropagation();
 	// loadProduction(4);
});

collapseTrigger.addEventListener('click', function(e) {
	menuCollapse.classList.toggle('hidden');
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
 var contactsLink = $('.main-menu__link[href = "index.html#contacts"]')

Scroll(mainLink, $('#main'));
Scroll(aboutLink, $('#about'));
Scroll(contactsLink, $('#contacts'));




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
