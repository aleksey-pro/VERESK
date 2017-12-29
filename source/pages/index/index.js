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
    center: [60.699, 28.752],
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
  if (document.documentElement.clientWidth >= 1200) {
    var wheight = document.documentElement.clientHeight;
    var section = document.querySelectorAll('section');
    [].map.call(section, function(elem) {
      elem.style.height = wheight + 'px';
    });
    return section;
  }
};

  // function get_name_browser() {
  //   // получаем данные userAgent
  //   const ua = navigator.userAgent;
  //   // с помощью регулярок проверяем наличие текста,
  //   // соответствующие тому или иному браузеру
  //   if (ua.search(/Edge/) > 0) return 'Edge';
  //   if (ua.search(/Chrome/) > 0) return 'Google Chrome';
  //   if (ua.search(/Firefox/) > 0) return 'Firefox';
  //   if (ua.search(/Opera/) > 0) return 'Opera';
  //   if (ua.search(/Safari/) > 0) return 'Safari';
  //   if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
  //   if (ua.search(/Trident/) > 0) return 'Trident';
  //   // условий может быть и больше.
  //   // сейчас сделаны проверки только
  //   // для популярных браузеров
  //   return 'Не определен';
  // };

  // if (get_name_browser() == 'Firefox') {
  //   var sliderImage = document.querySelectorAll('.swiper-slide');
  //   [].forEach.call(sliderImage, function(image) {
  //     image.children[0].style.width = 'unset';
  //   })      
  // };


$(window).ready(function() {
  setSectionHeight();
  MicroModal.init();
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
  }
});


// sendmail

const ENTER_KEYCODE = 13;
const form = document.querySelector('.contacts-form__form');


function sendMail(data) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('loadend', function () {
    if (xhr.status === 200) {
      MicroModal.show('modal-3');
      form.reset;
    } else {
      alert('Ошибка при отправке' + xhr.status);
    }
  });

  xhr.open('POST', 'send.php');
  xhr.send(data);
};

form.addEventListener('submit', function (evt) {
  var formData = new FormData(form);
  sendMail(formData);
  evt.preventDefault();
  if (evt.which === ENTER_KEYCODE) {
    evt.preventDefault();
  }  
});




