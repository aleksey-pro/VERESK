import './modal.scss';
import MicroModal from 'micromodal'; //https:gist.github.com/ghosh/4f94cf497d7090359a5c9f81caf60699
import sendMail from './sendmail';

$(window).ready(function() {
    MicroModal.init();

    const ENTER_KEYCODE = 13;
    const form = document.querySelector('.contacts-form__form');

    const onSend = () => {
        MicroModal.show('modal-3');
        form.reset;
    };

    form.addEventListener('submit', evt => {
        const formData = new FormData(form);
        sendMail(formData, onSend);
        evt.preventDefault();
        if (evt.which === ENTER_KEYCODE) {
            evt.preventDefault();
        }  
    });
});
