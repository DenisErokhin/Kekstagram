import { isEscEvent} from './util.js';
import { sliderBox, lastClass } from './effects.js';
import { hashtagField, commentField, checkValidElement, checkValidHashtag } from './validation.js';
import { sendData } from './api.js';
import { showPopup } from './popups.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const uploadFileInput = document.querySelector('#upload-file');
const popupAddPhoto = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const submitForm = document.querySelector('.img-upload__submit');
const buttonCloseForm = popupAddPhoto.querySelector('#upload-cancel');

const scaleControlSmaller = popupAddPhoto.querySelector('.scale__control--smaller');
const scaleControlBigger = popupAddPhoto.querySelector('.scale__control--bigger');
const scaleControlValue = popupAddPhoto.querySelector('.scale__control--value');
let scalePicture;

const previewUploadImg = popupAddPhoto.querySelector('.img-upload__preview > img');

const formPhoto = document.querySelector('.img-upload__form');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

// Добавление и редактирование фото

const resetSettings = () => {
  previewUploadImg.style.transform = `scale( ${scalePicture = 1} )`;
  scaleControlValue.value = Scale.MAX + '%';
  sliderBox.classList.add('visually-hidden');
  if (lastClass) {
    previewUploadImg.classList.remove(lastClass);
  }
};

const closeFormPhotoEsc = (evt) => {
  if (document.activeElement === hashtagField || document.activeElement === commentField) {
    return;
  } else if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFormPhoto();
  }
};

const closeFormPhoto = () => {
  popupAddPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileInput.value = '';
  hashtagField.value = '';
  commentField.value = '';
  previewUploadImg.style.transform = `scale( ${scalePicture = 1} )`;
  previewUploadImg.style.filter = 'none';
  popupAddPhoto.querySelector('#effect-none').checked = true;

  document.removeEventListener('keydown', closeFormPhotoEsc);
  buttonCloseForm.removeEventListener('click', closeFormPhoto);
  submitForm.removeEventListener('click', checkValidElement);
  scaleControlSmaller.removeEventListener('click', changeScalePhoto);
  scaleControlBigger.removeEventListener('click', changeScalePhoto);
  hashtagField.removeEventListener('input', checkValidHashtag);
};

// Масштаб фото

const changeScalePhoto = (evt) => {
  if (evt.target === scaleControlSmaller && parseInt(scaleControlValue.value, 10) === Scale.MIN || evt.target === scaleControlBigger && parseInt(scaleControlValue.value, 10) === Scale.MAX) {
    return;
  } else if (evt.target === scaleControlSmaller) {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) - Scale.STEP + '%';
    previewUploadImg.style.transform = `scale( ${scalePicture -= 0.25} )`;
  } else if (evt.target === scaleControlBigger) {
    scaleControlValue.value = parseInt(scaleControlValue.value, 10) + Scale.STEP + '%';
    previewUploadImg.style.transform = `scale( ${scalePicture += 0.25} )`;
  }
};

uploadFileInput.addEventListener('change', () => {
  popupAddPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  resetSettings();
  document.addEventListener('keydown', closeFormPhotoEsc);
  buttonCloseForm.addEventListener('click', closeFormPhoto);
  submitForm.addEventListener('click', checkValidElement);
  scaleControlSmaller.addEventListener('click', changeScalePhoto);
  scaleControlBigger.addEventListener('click', changeScalePhoto);
  hashtagField.addEventListener('input', checkValidHashtag);
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

export { closeFormPhoto };
