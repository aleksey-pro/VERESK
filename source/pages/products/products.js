import '../../sass/main.scss';
import './products.scss';
import 'normalize.css';

import createMenu from '../../components/aside/aside';

var renderProducts = function (item, headTitle) {
	console.log(headTitle);
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

function loadProduction(idx) {

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      fillProducts(xhr.response, idx);
    }
  });
  xhr.addEventListener('error', function () {
    console.log(xhr.status + ' Произошла ошибка загрузки');
  });

  xhr.responseType = 'json';
  xhr.open('GET', 'https://raw.githubusercontent.com/davegahn/VERESK/master/source/js/data.json');
  xhr.send();
};


// Load Products

$(document).ready(function() {
	var hash = window.location.hash;
	if(hash === '#vafli') {
		loadProduction(0);
	}else if (hash === '#tubes') {
		loadProduction(1);
	}else if (hash === '#torts') {
		loadProduction(2);
	}else if (hash === '#diets') {
		loadProduction(3);
	}

	// var event = new Event('click');
	// vafliLink.addEventListener('click', function (e) { 
	// 	loadProduction(0);
	// }, false);
	// vafliLink.dispatchEvent(event);
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