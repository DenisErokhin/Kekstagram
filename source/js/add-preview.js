// import { getDescribingPhotos } from './describing-photos.js';
import { getBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const describingPhotos = getDescribingPhotos();
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');
const filterPicture = document.querySelector('.img-filters');

const addDataPictures = (dataPictures) => {

  dataPictures.forEach((dataPicture) => {
    const photoPreview = pictureTemplate.cloneNode(true);

    photoPreview.querySelector('.picture__img').src = dataPicture.url;
    photoPreview.querySelector('.picture__likes').textContent = dataPicture.likes;
    photoPreview.querySelector('.picture__comments').textContent = dataPicture.comments.length;

    photoPreview.addEventListener('click', (evt) => {
      evt.preventDefault();
      getBigPicture(dataPicture);
    });
    fragment.appendChild(photoPreview);
  });

  pictures.querySelectorAll('.picture').forEach(picture => picture.remove());

  pictures.appendChild(fragment);

  if (filterPicture.classList.contains('img-filters--inactive')) {
    filterPicture.classList.remove('img-filters--inactive');
  }

  return pictures;
};

export { addDataPictures };

