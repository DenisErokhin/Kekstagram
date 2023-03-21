/* global _:readonly */

import { addDataPictures } from './add-preview.js';
import { getRundomArrayElement } from './util.js';

const RERENDER_DELAY = 500;
const NUMBER_RANDOM_PICTURES = 10;

const filterForm = document.querySelector('.img-filters__form');

const activeClass = 'img-filters__button--active';

let photos = [];

const createArrayRandomPictures = (pictures) => {
  const randomPictures = [];

  while (randomPictures.length < NUMBER_RANDOM_PICTURES) {
    const randomPicture = getRundomArrayElement(pictures);
    if (!randomPictures.includes(randomPicture)) {
      randomPictures.push(randomPicture);
    }
  }
  return randomPictures;
};

const sortPopularPictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const createPopularList = (pictures) => pictures.slice().sort(sortPopularPictures);

const filters = {
  'filter-default': _.debounce(() => addDataPictures(photos), RERENDER_DELAY),
  'filter-random': _.debounce(() => addDataPictures(createArrayRandomPictures(photos)), RERENDER_DELAY),
  'filter-discussed': _.debounce(() => addDataPictures(createPopularList(photos)), RERENDER_DELAY),
};

const checkButtonClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    filterForm.querySelector(`.${activeClass}`).classList.remove(activeClass);
    evt.target.classList.add(activeClass);
    filters[evt.target.id]();
  }

};

const addFilterClick = (pictures) => {
  photos = pictures.slice();
  filterForm.addEventListener('click', checkButtonClick);
};

export { addFilterClick };
