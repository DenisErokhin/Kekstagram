import './editor.js';
import './validation.js';
import './avatar.js';
import { getData } from './api.js';
import { addDataPictures } from './add-preview.js';
import { addFilterClick } from './filter-photos.js';

getData((pictures) => {
  addDataPictures(pictures);
  addFilterClick(pictures);
});
