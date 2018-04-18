
/**
 * Функция генерации блока с товаром и заполнения его данными
 * @param  {String} item      [категория товара]
 * @param  {String} headTitle [наименование заголовка]
 * @return {Element}          [блок с продуктом (DOM-element)]
 */
const renderProducts = (item, headTitle) => {
  let productsTemplate = document.querySelector('template').content;
  let product = productsTemplate.cloneNode(true);
  product.querySelector('.products-heading').textContent = headTitle;
  product.querySelector('.product-desc__title').textContent = item.title;
  product.querySelector('.product-desc__text').textContent = item.desc;
  product.querySelector('.desc-param__value--before').textContent = item.before;
  product.querySelector('.desc-param__value--weight').textContent = item.weight;
  product.querySelector('.desc-param__value--box').textContent = item.boxSize;
  product.querySelector('.desc-param__value--fasovka').textContent = item.fasovka;
  product.querySelector('.desc-param__value--numPerBox').textContent = item.numPerBox;
  product.querySelector('.main-image').src = 'images/products/' + item.url;
  product.querySelector('.big-image').src = 'images/products/big/' + item.urlBig;
  return product;
};

/**
 * Функция подготовки данных, полученных с сервера, для вставки в блок товара
 * @param  {Array} data [массив полученных данных]
 * @param  {Number} idx  [индекс соответствующей категории]
 */
export function fillProducts(data, idx) {
  let container = document.querySelector('.products-wrapper');
  container.innerHTML = '';
  let fragment = document.createDocumentFragment();
  for(let keys in data[idx]) {
    let categories = data[idx][keys];
    let catName = keys;
    for(let category of categories) {
      fragment.appendChild(renderProducts(category, catName));
    }
  }
  container.appendChild(fragment);
}
