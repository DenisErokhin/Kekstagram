import { isEscEvent } from './util.js'

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const comments = document.querySelector('.social__comments');

// Скрываем на время

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

// Cоздание ноного элемента

const getElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

comments.innerHTML = '';

// Получаем комментарий

const getComment = (element) => {
  const comment = getElement('li', 'social__comment');
  const picture = getElement('img', 'social__picture');
  const text = getElement('p', 'social__text');
  comment.appendChild(picture);
  comment.appendChild(text);
  picture.src = element.avatar;
  picture.alt = element.name;
  picture.width = 35;
  picture.height = 35;
  text.textContent = element.message;
  return comment;
}

// Получаем комментарии

const getComments = (elements) => {

  const commentsListFragment = document.createDocumentFragment();

  elements.forEach ((element) => {
    commentsListFragment.appendChild(getComment(element));
  })
  comments.appendChild(commentsListFragment);
}

// Обработчики на закрытие большой фотографии

const closePictureEsc = (evt) => {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    closePictureClick();
  }
}

const closePictureClick = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closePictureEsc);
  buttonClose.removeEventListener('click', closePictureClick);
  comments.innerHTML = '';
}

// Получаем большую фотографию

const getBigPicture = (describingPhoto) => {

  bigPicture.querySelector('.big-picture__img > img').src = describingPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = describingPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = describingPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = describingPhoto.description;
  getComments(describingPhoto.comments);
  buttonClose.addEventListener('click', closePictureClick);
  document.addEventListener('keydown', closePictureEsc);

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
}

export { getBigPicture };
