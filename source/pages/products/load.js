/**
 * Функция загрузки данных с сервера
 * @param  {number} idx         [индекс категории, соотсветствующий индексу подмассива данных]
 * @param  {Function} onLoad    [коллбек при успешной загрузки]
 * @param  {Function} onLoadEnd [коллбек по окончанию успешной загрузки]
 * @return {Array}              [массив данных c товарами]
 */
// export default function (idx, onLoad, onLoadEnd) {
//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener('load', () => { //https://icons8.com/preloaders/en/circular //var escapedPosts = xhr.responseText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"</g,'&lt;').replace(/>"/g,'&gt;');
//     if (xhr.status === 200) {
//       onLoad(xhr.response, idx);
//     }
//   });
//   xhr.addEventListener('error', () => {
//     console.log(xhr.status + ' Произошла ошибка загрузки');
//   });

//   xhr.addEventListener('loadend', () => {
//     window.setTimeout(() => {
//       onLoadEnd();
//     }, 2000);
//   });

//   xhr.responseType = 'json';

//   xhr.open('GET', 'http://veresk-vafli.ru/data.json'); //
//   xhr.send(); // https://raw.githubusercontent.com/davegahn/VERESK/master/data.json
// }

// export default function (idx, onLoad, onLoadEnd) {

//   const contentful = require('contentful');

//   const client = contentful.createClient({
//     space: 'fvwpxwob4rjn',
//     accessToken: '9dd7bfbe40eb7ddc918a402442cc428ef8da74747746bea8945c1c653417878d',
//   });

//   /**
//    * одна запись
//    */
//   // client.getEntry('7nJvx2UTaEKwo8686QQQSC')
//   //   .then(function (entry) {
//   //     // logs the entry metadata
//   //     console.log(entry.sys);

//   //     // logs the field with ID title
//   //     console.log(entry.fields.title);
//   //   });

//   /**
//    * Все заголовки
//    */
//   client.getEntries()
//     .then(function (entries) {
//       // log the title for all the entries that have it
//       entries.items.forEach(function (entry) {
//         if(entry.fields.title) {
//           console.log(entry.fields.title);
//         }
//       });
//     });
// }

