export default function (idx, onLoad, onLoadEnd) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => { //https://icons8.com/preloaders/en/circular
        if (xhr.status === 200) {
            onLoad(xhr.response, idx);
        }
    });
    xhr.addEventListener('error', () => {
        console.log(xhr.status + ' Произошла ошибка загрузки');
    });

    xhr.addEventListener('loadend', () => {  
        window.setTimeout(() => {
            onLoadEnd();
        }, 2000);
    });

    xhr.responseType = 'json';
    xhr.open('GET', 'https://raw.githubusercontent.com/davegahn/VERESK/master/data.json'); //  
    xhr.send(); // http://veresk-vafli.ru/data.json
}
