import '../../sass/main.scss';
import './index.scss';
import 'normalize.css';

import createMenu from '../../components/aside/aside';

import ymaps from 'ymaps';

ymaps.load().then(maps => {
  const map = new maps.Map(document.getElementById("map"), {
    center: [60.697932, 28.766090],
    zoom: 14
  });
  const Placemark = new maps.Placemark([60.697932, 28.766090], { 
    hintContent: 'Вереск!', 
    balloonContent: ''
  });

  map.geoObjects.add(Placemark);
})
.catch(error => console.log('Failed to load Yandex Maps', error));	

var wheight = document.documentElement.clientHeight;

var section = document.querySelectorAll('section');
[].map.call(section, function(elem) {
  elem.style.height = wheight + 'px';
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