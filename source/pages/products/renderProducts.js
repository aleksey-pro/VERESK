const renderProducts = (item, headTitle) => {
    let productsTemplate = document.querySelector('template').content;
    let product = productsTemplate.cloneNode(true);
    product.querySelector('.heading--products').textContent = headTitle;
    product.querySelector('.product-item__desc-title').textContent = item.title;
    product.querySelector('.product-item__desc-text').textContent = item.desc;
    product.querySelector('.desc-param__value--before').textContent = item.before;
    product.querySelector('.desc-param__value--weight').textContent = item.weight;
    product.querySelector('.desc-param__value--box').textContent = item.boxSize;
    product.querySelector('.desc-param__value--fasovka').textContent = item.fasovka;
    product.querySelector('.desc-param__value--numPerBox').textContent = item.numPerBox;
    product.querySelector('.main-image').src = 'images/products/' + item.url;
    product.querySelector('.big-image').src = 'images/products/big/' + item.urlBig;
    return product;
};

export function fillProducts(data, idx) {
    let container = document.querySelector('.products__wrapper');
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
