import { showAlert } from './util.js';
import { addDataPictures } from './add-preview.js';

const Urls = {
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
  POST: 'https://23.javascript.pages.academy/kekstagram',
};

// Получение данных

const getData = () => {
  fetch(Urls.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error(`${response.status} : ${response.statusText}`);
    })
    .then((dataImages) => addDataPictures(dataImages))
    .catch(() => {
      showAlert('Что-то пошло не так, попробуйте обновить страницу');
    },
    );
};

// Отправка данных

const sendData = (onSuccess, onFail, body) => {
  fetch(Urls.POST,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      response.ok ? onSuccess() : onFail();
    })
    .catch(() => onFail());
};

export { getData, sendData };