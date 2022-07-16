import {postData} from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name = "upload"]'),
        textarea = document.querySelectorAll('textarea'),
        price = document.querySelector('.calc-price'),
        selectFields = document.querySelectorAll('select');

    const message = {
        loading: 'Loading...',
        success: 'Thanks. We will contact you soon)))',
        failure: 'Something went wrong...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php',
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });

        textarea.forEach(item => {
           item.value = '';
        });

        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });

        selectFields.forEach(item => {
            let optionFields = item.querySelectorAll('option');
            for (let i = 0, l = optionFields.length; i < l; i++) {
                optionFields[i].selected = optionFields[i].defaultSelected;
            }
        });

        price.textContent = 'Для расчета нужно выбрать размер картины и материал картины';
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
           let dots;
           const arrName = item.files[0].name.split('.');
            arrName[0].length > 6 ? dots = '...' : dots = '.';
           const name = arrName[0].substring(0, 6) + dots + arrName[1];
           item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.append(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
               item.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.append(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.append(textMessage);

            const formData = new FormData(item);

            if (+price.textContent) {
                formData.append('price', price.textContent);
            }

            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    textMessage.textContent = message.success;
                    statusImg.setAttribute('src', message.ok);
                })
                .catch(() => {
                    textMessage.textContent = message.failure;
                    statusImg.setAttribute('src', message.fail);
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;
