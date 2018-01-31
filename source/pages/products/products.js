import '../../sass/main.scss';
import './products.scss';
import 'normalize.css';

import createMenu from '../../components/aside/aside';
import {fillProducts} from './renderProducts.js';
import loadProduction from './load';

// Correct height of goods

const correctHeights = () => {	
    const productBlocks = document.querySelectorAll('.product-item__image');	
    [].forEach.call(productBlocks, productBlock => {
        let productBlockHeight = productBlock.offsetHeight;
        let productImage = productBlock.children[0];
        let productHeight = productImage.offsetHeight;
        if(productHeight >= productBlockHeight) {
            productImage.style.height = '100%';
        }
    });
};

$(document).ready(function() {

// Set backgroundImage

    const leftImage = document.querySelector('.aside');
    leftImage.style.backgroundImage = 'url(images/menu_bg_1.jpg)';	

    let hash = window.location.hash;
    if(hash === '#vafli') {
        loadProduction(0, fillProducts, correctHeights);
    }else if (hash === '#tubes') {
        loadProduction(1, fillProducts, correctHeights);
    }else if (hash === '#torts') {
        loadProduction(2, fillProducts, correctHeights);
    }else if (hash === '#diets') {
        loadProduction(3, fillProducts, correctHeights);
    }

    // trigger menu to open when page is loaded

    const mainMenu = document.querySelector('.main-menu');
    const collapseTrigger = mainMenu.querySelector('.collapse-trigger');
    const menuCollapse = mainMenu.querySelector('.products-menu');
    const event = new Event('loadClick');

    collapseTrigger.addEventListener('loadClick', () => { 
        menuCollapse.classList.remove('hidden');        
    }, false);
    collapseTrigger.dispatchEvent(event);


    // change production   

    const vafliLink = document.getElementById('vafli');
    const tubesLink = document.getElementById('tubes');
    const tortsLink = document.getElementById('torts');
    const dietsLink = document.getElementById('diets');

    const changeProduction = (evt, idx, hash) => {
        evt.preventDefault();
        window.location.hash = hash;
        loadProduction(idx, fillProducts, correctHeights);
    };

    vafliLink.addEventListener('click', e => {
        changeProduction(e, 0, '#vafli');
    });
    tubesLink.addEventListener('click', e => {
        changeProduction(e, 1, '#tubes');
    });
    tortsLink.addEventListener('click', e => {
        changeProduction(e, 2, '#torts');
    });
    dietsLink.addEventListener('click', e => {
        changeProduction(e, 3, '#diets');
    });

});