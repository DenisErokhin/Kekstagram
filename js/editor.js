import { isEscEvent} from './util.js';
import { sliderBox, lastClass } from './effects.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const fileUpload = document.querySelector('#upload-file');
const formChangePhoto = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const buttonCloseForm = formChangePhoto.querySelector('#upload-cancel');
const scaleControlSmaller = formChangePhoto.querySelector('.scale__control--smaller');
const scaleControlBigger = formChangePhoto.querySelector('.scale__control--bigger');
const scaleControlValue = formChangePhoto.querySelector('.scale__control--value');
const imgUploadPreview = formChangePhoto.querySelector('.img-upload__preview > img');
let scalePicture;

// Добавление и редактирование фото

const closeFormPhotoEsc = (evt) => {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    closeFormFoto();
  }
};

const resetSettings = () => {
  imgUploadPreview.style.transform = `scale( ${scalePicture = 1} )`;
  imgUploadPreview.style.filter = 'none';
  scaleControlValue.value = Scale.MAX + '%';
  sliderBox.classList.add('visually-hidden');
  if (lastClass) {
    imgUploadPreview.classList.remove(lastClass);
  }
};

fileUpload.addEventListener('change', () => {
  formChangePhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  resetSettings();
  document.addEventListener('keydown', closeFormPhotoEsc);
  buttonCloseForm.addEventListener('click', closeFormFoto);
});

const closeFormFoto = () => {
  formChangePhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormPhotoEsc);
  buttonCloseForm.removeEventListener('click', closeFormFoto);
  fileUpload.value = '';
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

scaleControlSmaller.addEventListener('click', clickControl);
scaleControlBigger.addEventListener('click', clickControl);

export { fileUpload };
