import { isEscEvent} from './util.js';
import { sliderBox, lastClass } from './effects.js';
import { hashtagField, commentField, submitForm, checkValidElement } from './validation.js';
import { sendData } from './api.js';
import { showPopup } from './popups.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const fileUpload = document.querySelector('#upload-file');
const popupAddPhoto = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const buttonCloseForm = popupAddPhoto.querySelector('#upload-cancel');

const scaleControlSmaller = popupAddPhoto.querySelector('.scale__control--smaller');
const scaleControlBigger = popupAddPhoto.querySelector('.scale__control--bigger');
const scaleControlValue = popupAddPhoto.querySelector('.scale__control--value');
let scalePicture;

const imgUploadPreview = popupAddPhoto.querySelector('.img-upload__preview > img');

const formPhoto = document.querySelector('.img-upload__form');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

// Добавление и редактирование фото

const resetSettings = () => {
  imgUploadPreview.style.transform = `scale( ${scalePicture = 1} )`;
  scaleControlValue.value = Scale.MAX + '%';
  sliderBox.classList.add('visually-hidden');
  if (lastClass) {
    imgUploadPreview.classList.remove(lastClass);
  }
};

const closeFormPhotoEsc = (evt) => {
  if(document.activeElement === hashtagField || document.activeElement === commentField) {
    return;
  } else if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFormPhoto();
  }
};

const closeFormPhoto = () => {
  popupAddPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  fileUpload.value = '';
  hashtagField.value = '';
  commentField.value = '';
  imgUploadPreview.style.transform = `scale( ${scalePicture = 1} )`;
  imgUploadPreview.style.filter = 'none';
  popupAddPhoto.querySelector('#effect-none').checked = true;
  
  document.removeEventListener('keydown', closeFormPhotoEsc);
  buttonCloseForm.removeEventListener('click', closeFormPhoto);
  submitForm.removeEventListener('click', checkValidElement);
  scaleControlSmaller.removeEventListener('click', clickControl);
  scaleControlBigger.removeEventListener('click', clickControl);
};

// Масштаб фото

const clickControl = (evt) => {
  if (evt.target === scaleControlSmaller && parseInt(scaleControlValue.value, 10) === Scale.MIN || evt.target === scaleControlBigger && parseInt(scaleControlValue.value, 10) === Scale.MAX) {
    return;
  } else if (evt.target === scaleControlSmaller) {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) - Scale.STEP + '%';
    imgUploadPreview.style.transform = `scale( ${scalePicture -= 0.25} )`;
  } else if (evt.target === scaleControlBigger) {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) + Scale.STEP + '%';
    imgUploadPreview.style.transform = `scale( ${scalePicture += 0.25} )`;
  }
};

fileUpload.addEventListener('change', () => {
  popupAddPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  resetSettings();
  document.addEventListener('keydown', closeFormPhotoEsc);
  buttonCloseForm.addEventListener('click', closeFormPhoto);
  submitForm.addEventListener('click', checkValidElement);
  scaleControlSmaller.addEventListener('click', clickControl);
  scaleControlBigger.addEventListener('click', clickControl);
});

// Отправка формы

formPhoto.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => showPopup(successPopup),
    () => showPopup(errorPopup),
    new FormData(evt.target),
  );
});

export { fileUpload, closeFormPhoto };
