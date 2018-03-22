/**
 * Функция отправки данных заявки на сервер - в обработчик отправки на почту
 * @param  {Function} data   [данные формы]
 * @param  {Function} onSend [функция-коллбек при успешной отправки данных]
 */
export default function (data, onSend) {  
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('loadend', () => {
        if (xhr.status === 200) {
            onSend();
        }else {
            alert('Ошибка при отправке' + xhr.status);
        }
    });

    xhr.open('POST', 'send.php');
    xhr.send(data);
}
