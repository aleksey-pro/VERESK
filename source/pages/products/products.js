import '../../sass/main.scss';
import './products.scss';
import 'normalize.css';

import createMenu from '../../components/aside/aside';



(function load(onLoad, onError) {


function onLoad(data){
	console.log(data);
};

  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      onLoad(xhr.response);
    }
  });
  xhr.addEventListener('error', function () {
    onError(xhr.status + ' Произошла ошибка загрузки');
  });

  xhr.responseType = 'json';
  xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
  xhr.send();
})();




