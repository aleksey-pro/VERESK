import '../../sass/main.scss';
import '../../sass/_vars.scss';
import '../../sass/swiper.css';
import './index.scss';
import 'normalize.css';

import ymaps from 'ymaps';
import Swiper from 'swiper'; // http://idangero.us/swiper/api/
import createMenu from '../../components/aside/aside';
import Animation from '../../libs/animate.js';


var anim = new Animation;

$(window).ready(function() {
  if (document.documentElement.clientWidth >= 1200) {
    anim.description();
    anim.play();
  }
});

$(window).scroll(function () {
  if (document.documentElement.clientWidth >= 1200) {
    anim.play();
  }
});

ymaps.load().then(maps => {
  const map = new maps.Map(document.getElementById("map"), {
    center: [60.697932, 28.766090],
    zoom: 14
  });
  map.behaviors.disable('scrollZoom');
  const Placemark = new maps.Placemark([60.697932, 28.766090], { 
    hintContent: 'Вереск!', 
    balloonContent: '' 
  });

  map.geoObjects.add(Placemark);
})
.catch(error => console.log('Failed to load Yandex Maps', error));	

(function setSectionHeight() {
  var wheight = document.documentElement.clientHeight;
  var section = document.querySelectorAll('section');
  [].map.call(section, function(elem) {
    elem.style.height = wheight + 'px';
  });
  return section;
})();

// window.addEventlistener('DOMContentLoaded', setSectionHeight);
// window.addEventlistener('resize', setSectionHeight);

// var sliderContainer = document.querySelector('.swiper-container');

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

//  hover

  $('.partners-tiles__image').on('mouseenter mouseleave', function() {
    var thisImage = $(this);
    var wrapper = thisImage.closest('.partners-tiles');
    var otherImages = wrapper.find('.partners-tiles__image');
    otherImages.addClass('partners-tiles__image--active')
    thisImage.removeClass('partners-tiles__image--active');
  });
 


  // $('.plant-links').on('mouseout', function() {
  //   var Images = $(this).find('.plant-link-image');
  //   Images.removeClass('plant-link-image--active');
  // });