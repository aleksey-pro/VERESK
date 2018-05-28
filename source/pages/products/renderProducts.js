/**
 * Объект с типами и заголоками категорий
 */
export const PRODUCT_CATEGORIES = {
  products: { id: 'vafli', title: 'ВАФЛИ' },
  tubes: { id: 'tubes', title: 'ВАФЕЛЬНЫЕ ТРУБОЧКИ' },
  torts: { id: 'torts', title: 'ВАФЕЛЬНЫЕ ТОРТЫ' },
  diets: { id: 'diet', title: 'ДИЕТИЧЕСКОЕ ПИТАНИЕ' },
};

/**
 * Вспомогательная функция извлечения значения из строки, описывающей
 * характеристики товара
 * @param {String} item [запись в массиве характеристик товара]
 * @return {String}
 */
const _extractVal = item => {
  const resArr = item.split(' ');
  const lastRes = resArr[resArr.length - 1];
  return lastRes;
};

/**
 * Функция, заполняющая шаблон вывода товара данными из объекта товаров категории, и
 * и выводящая этот шаблон столько раз, сколько подгрузилось товаров
 * @param {Object} item [объект с товарами выбранной категории]
 * @return {NodeList}
 */
export const renderProducts = item => {
  const productsTemplate = document.querySelector('template').content;
  const product = productsTemplate.cloneNode(true);

  let catTitle = product.querySelector('.products-heading');
  if (item.sys.contentType.sys.id === 'products') {
    catTitle.textContent = PRODUCT_CATEGORIES.products.title;
  } else if (item.sys.contentType.sys.id === 'tubes') {
    catTitle.textContent = PRODUCT_CATEGORIES.tubes.title;
  } else if (item.sys.contentType.sys.id === 'torts') {
    catTitle.textContent = PRODUCT_CATEGORIES.torts.title;
  } else if (item.sys.contentType.sys.id === 'diet') {
    catTitle.textContent = PRODUCT_CATEGORIES.diets.title;
  }

  if (item.fields.title)
    product.querySelector('.product-desc__title').textContent = item.fields.title;
  if (item.fields.description)
    product.querySelector('.product-desc__text').textContent = item.fields.description;
  if (item.fields.image.fields.file.url)
    product.querySelector('.main-image').src = item.fields.image.fields.file.url;
  if (item.fields.bigImage.fields.file.url)
    product.querySelector('.big-image').src = item.fields.bigImage.fields.file.url;
  // prettier-ignore
  if (item.fields.chars[0]) product.querySelector('.desc-param__value--before').textContent = _extractVal(item.fields.chars[0]);
  // prettier-ignore
  if (item.fields.chars[1]) product.querySelector('.desc-param__value--fasovka').textContent = _extractVal(item.fields.chars[1]);
  // prettier-ignore
  if (item.fields.chars[2]) product.querySelector('.desc-param__value--numPerBox').textContent = _extractVal(item.fields.chars[2]);
  // prettier-ignore
  if (item.fields.chars[3]) product.querySelector('.desc-param__value--weight').textContent = _extractVal(item.fields.chars[3]);
  // prettier-ignore
  if (item.fields.chars[4]) product.querySelector('.desc-param__value--box').textContent = _extractVal(item.fields.chars[4]);

  return product;
};
