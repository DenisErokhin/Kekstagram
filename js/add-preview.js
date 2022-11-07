import { getDescribingPhotos } from './describing-photos.js';
import { getBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const describingPhotos = getDescribingPhotos();
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');

describingPhotos.forEach((describingPhoto) => {
  const photoPreview = pictureTemplate.cloneNode(true);

  photoPreview.querySelector('.picture__img').src = describingPhoto.url;
  photoPreview.querySelector('.picture__likes').textContent = describingPhoto.likes;
  photoPreview.querySelector('.picture__comments').textContent = describingPhoto.comments.length;

  photoPreview.addEventListener('click', (evt) => {
    evt.preventDefault();
    getBigPicture(describingPhoto);
  });
  fragment.appendChild(photoPreview);
});

pictures.appendChild(fragment);

export { pictures };

