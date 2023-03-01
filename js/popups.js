import { isEscEvent } from './util.js';
import { closeFormPhoto } from './editor.js';

const body = document.querySelector('body');

// Проверка

const checkPopup = () => {
  if ((document.contains(document.querySelector('.success')))) {
    const popup = document.querySelector('.success');
    return popup;
  } else if ((document.contains(document.querySelector('.error')))) {
    const popup = document.querySelector('.error');
    return popup;
  }
};

const checkFieldClick = (evt) => {
  const popup = checkPopup();
  const div = popup.querySelector('div');
  const withinBoundaries = evt.composedPath().includes(div);
  if (!withinBoundaries) {
    closePopup();
  }
};

// Открытие и закрытие попапов

const closePopupEsc = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const closePopup = () => {
  const popup = checkPopup();
  popup.remove();
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', checkFieldClick);
};

const showPopup = (popupTemplate) => {
  const popup = popupTemplate.cloneNode(true);
  body.appendChild(popup);
  closeFormPhoto();
  const buttonClose = popup.querySelector('button');
  buttonClose.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', checkFieldClick);
};

export { showPopup };
