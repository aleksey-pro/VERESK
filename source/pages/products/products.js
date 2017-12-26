import '../../sass/main.scss';
import './products.scss';
import 'normalize.css';

import createMenu from '../../components/aside/aside';

var renderProducts = function (item, headTitle) {
	var productsTemplate = document.querySelector('template').content;
	var product = productsTemplate.cloneNode(true);
	product.querySelector('.heading--products').textContent = headTitle;
	product.querySelector('.product-item__desc-title').textContent = item.title;
	product.querySelector('.product-item__desc-text').textContent = item.desc;
	product.querySelector('.desc-param__value--before').textContent = item.before;
	product.querySelector('.desc-param__value--weight').textContent = item.weight;
	product.querySelector('.desc-param__value--box').textContent = item.boxSize;
	product.querySelector('.desc-param__value--fasovka').textContent = item.fasovka;
	product.querySelector('.desc-param__value--numPerBox').textContent = item.numPerBox;
	product.querySelector('img').src = 'images/products/' + item.url;
  return product;
};

var fillProducts = function (data, idx) {
  var container = document.querySelector('.products__wrapper');
  container.innerHTML = '';
  var fragment = document.createDocumentFragment();
    for(var keys in data[idx]) {
  	var category = data[idx][keys];
		var catName = keys;
		for(var u = 0; u < category.length; u++) {
			var productsArr = category[u];
			fragment.appendChild(renderProducts(productsArr, catName));
		}
  }
  container.appendChild(fragment);
};


// Correct height of goods

var correctHeights = function () {	
	var productBlocks = document.querySelectorAll('.product-item__image');	
	[].forEach.call(productBlocks, function (productBlock){
		var productBlockHeight = productBlock.offsetHeight;
		var productImage = productBlock.children[0];
		var productHeight = productImage.offsetHeight;
		if(productHeight >= productBlockHeight) {
			productImage.style.height = '100%';
		}		
	});
}

function loadProduction(idx) {

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      fillProducts(xhr.response, idx); // https://icons8.com/preloaders/en/circular
    }
  });
  xhr.addEventListener('error', function () {
    console.log(xhr.status + ' Произошла ошибка загрузки');
  });

  xhr.addEventListener('loadend', function () {  
  window.setTimeout(function(){
	correctHeights();
  }, 2000);	
  });

  xhr.responseType = 'json';
  xhr.open('GET', 'http://agropiter.com/data.json '); //
  xhr.send(); // https://raw.githubusercontent.com/davegahn/VERESK/master/source/js/data.json
};




$(document).ready(function() {

	// Set backgroundImage

	var leftImage = document.querySelector('.aside');
	leftImage.style.backgroundImage = 'url(images/menu_bg_1.jpg)';

	// Load Products

	var hash = window.location.hash;
	if(hash === '#vafli') {
		loadProduction(0);
	}else if (hash === '#tubes') {
		loadProduction(1);
		correctHeights();
	}else if (hash === '#torts') {
		loadProduction(2);
	}else if (hash === '#diets') {
		loadProduction(3);
	}

	// trigger menu to open when page is loaded

	var mainMenu = document.querySelector('.main-menu');
	var collapseTrigger = mainMenu.querySelector('.collapse-trigger');
	var menuCollapse = mainMenu.querySelector('.products-menu');
	var event = new Event('loadClick');
	collapseTrigger.addEventListener('loadClick', function (e) { 
		menuCollapse.classList.remove('hidden');
	}, false);
	collapseTrigger.dispatchEvent(event);
});


var vafliLink = document.getElementById('vafli');
var tubesLink = document.getElementById('tubes');
var tortsLink = document.getElementById('torts');
var dietsLink = document.getElementById('diets');

vafliLink.addEventListener('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	loadProduction(0);
});

tubesLink.addEventListener('click', function(e) {
 	e.preventDefault();
 	e.stopPropagation();
 	loadProduction(1);
});

tortsLink.addEventListener('click', function(e) {
 	e.preventDefault();
 	e.stopPropagation();
 	loadProduction(2);
});

dietsLink.addEventListener('click', function(e) {
 	e.preventDefault();
 	e.stopPropagation();
 	loadProduction(3);
});