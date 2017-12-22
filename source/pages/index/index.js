import '../../sass/main.scss';
import '../../sass/_vars.scss';
import '../../sass/swiper.css';
import './index.scss';
import 'normalize.css';

import ymaps from 'ymaps';
import Swiper from 'swiper'; // http://idangero.us/swiper/api/
import createMenu from '../../components/aside/aside';
import Animation from '../../libs/animate.js';
import MicroModal from 'micromodal'; //https://gist.github.com/ghosh/4f94cf497d7090359a5c9f81caf60699

var anim = new Animation;

ymaps.load().then(maps => {
  const map = new maps.Map(document.getElementById("map"), {
    center: [60.697932, 28.766090],
    zoom: 14
  });
  map.behaviors.disable('scrollZoom');
  const Placemark = new maps.Placemark([60.699, 28.752], { 
    hintContent: 'Вереск!', 
    balloonContent: '' 
  });

  map.geoObjects.add(Placemark);
})
.catch(error => console.log('Failed to load Yandex Maps', error));	

function setSectionHeight() {
  var wheight = document.documentElement.clientHeight;
  var section = document.querySelectorAll('section');
  [].map.call(section, function(elem) {
    elem.style.height = wheight + 'px';
  });
  return section;
};

$(window).ready(function() {
  setSectionHeight();
  MicroModal.init();
  if (document.documentElement.clientWidth >= 1200) {
    anim.description();
    anim.play();
  }

  var imgs = $('.partners-tiles__image');

  imgs.on('mouseenter', function(e) {
  
    console.log('imgs');
    // var thisImage = $(this);
    // var wrapper = thisImage.closest('.partners-tiles');
    // var otherImages = wrapper.find('.partners-tiles__image');
    // otherImages.addClass('partners-tiles__image--active')
    // thisImage.removeClass('partners-tiles__image--active');
  });

});

$(window).scroll(function () {
  if (document.documentElement.clientWidth >= 1200) {
    anim.play();
  }
});

$(window).resize(function () {
  setSectionHeight();
});

// Slider

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

// var images = document.querySelectorAll('.partners-tiles__image');

// [].forEach.call(images, function(el){
//   el.addEventListener('hover', function(e){
//     e.preventDefault();
//     console.log(this);
//   })
// });


