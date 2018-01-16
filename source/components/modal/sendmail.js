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
