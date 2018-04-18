/**
 * Импорт стилей, функции отправки данных на сервер и модуля модального окна
 */
import './modal.scss';
import MicroModal from 'micromodal'; //https:gist.github.com/ghosh/4f94cf497d7090359a5c9f81caf60699
import sendMail from './sendmail';

const ENTER_KEYCODE = 13;
const form = $('.contacts-form__form');

/**
 * Функция-коллбек при успешной отправки заявки
 * Вызывает модальное окно со статусом и сбрасывает поля формы
 * @return {[type]} [description]
 */
const onSend = () => {
  MicroModal.show('modal-3');
  form.reset;
};

/**
 * Функция подготовки данных заявки, и вызова
 * функции отправки их на сервер
 */
const sendMessage = () => {
  form.on('submit', evt => {
    const formData = new FormData(form);
    sendMail(formData, onSend);
    evt.preventDefault();
    if (evt.which === ENTER_KEYCODE) {
      evt.preventDefault();
    }
  });
};

/*********************************************************************/
/**********************  При загрузке модуля ************************/
/********************************************************************/

$(window).ready(function() {
    /**
     * Инициализация плагина модального окна
     */
    MicroModal.init();
    /**
     * Вызов функции подготовки данных заявки
     */
    sendMessage();
});
