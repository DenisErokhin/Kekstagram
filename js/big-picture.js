import { isEscEvent } from './util.js';

const COMMENTS_SHOW_NUMBER = 5;

let commentsShowMin = COMMENTS_SHOW_NUMBER;
let commentsShowMax = commentsShowMin + COMMENTS_SHOW_NUMBER;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const buttonClose = bigPicture.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');

const showCommentsButton = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsShowValue = commentCount.childNodes[0];

// Функция обработки клика показа комментариев

const showComments = () => {
  const comments = commentsList.children;
  commentsShowValue.textContent = commentsShowMax + ' из ';

  for (let i = commentsShowMin; i < commentsShowMax; i++) {

    if (i < comments.length - 1) {
      comments[i].classList.remove('hidden');
    }

    if (i === comments.length - 1) {
      comments[i].classList.remove('hidden');
      showCommentsButton.classList.add('hidden');
      commentsShowValue.textContent = comments.length + ' из ';
      break;
    }
  }

  commentsShowMin += COMMENTS_SHOW_NUMBER;
  commentsShowMax += COMMENTS_SHOW_NUMBER;
};

// Скрытие комментариев

const hideComments = (comments) => {
  for (let i = COMMENTS_SHOW_NUMBER; i < comments.length; i++) {
    comments[i].classList.add('hidden');
  }
};

// Проверка количества комментариев

const checkLengthComments = (commentsList) => {
  const comments = commentsList.children;

  if (comments.length <= COMMENTS_SHOW_NUMBER) {
    showCommentsButton.classList.add('hidden');
    commentsShowValue.textContent = comments.length + ' из ';
  } else {
    hideComments(comments);
    commentsShowValue.textContent = COMMENTS_SHOW_NUMBER + ' из ';
    showCommentsButton.classList.remove('hidden');
    showCommentsButton.addEventListener('click', showComments);
  }
};

// Cоздание ноного элемента

const getElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

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
};

// Получаем комментарии

const getComments = (elements) => {

  const commentsListFragment = document.createDocumentFragment();

  elements.forEach((element) => {
    commentsListFragment.appendChild(getComment(element));
  })
  commentsList.appendChild(commentsListFragment);
};

// Обработчики на закрытие большой фотографии

const closePictureEsc = (evt) => {
  if(isEscEvent(evt)) {
    evt.preventDefault();
    closePictureClick();
  }
};

const closePictureClick = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closePictureEsc);
  buttonClose.removeEventListener('click', closePictureClick);
  showCommentsButton.removeEventListener('click', showComments);
  commentsList.innerHTML = '';
  commentsShowValue.textContent = '';
  commentsShowMin = COMMENTS_SHOW_NUMBER;
  commentsShowMax = commentsShowMin + COMMENTS_SHOW_NUMBER;
};

// Получаем большую фотографию

const getBigPicture = (describingPhoto) => {
  commentsList.innerHTML = '';

  bigPicture.querySelector('.big-picture__img > img').src = describingPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = describingPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = describingPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = describingPhoto.description;
  getComments(describingPhoto.comments);
  buttonClose.addEventListener('click', closePictureClick);
  document.addEventListener('keydown', closePictureEsc);
  checkLengthComments(commentsList);
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

export { getBigPicture };
