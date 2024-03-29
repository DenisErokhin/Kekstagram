// // Статичные, тестовые данные, при отсутствии данных с сервера, можно воспользоваться ими

// import {getRandomNumber, getRundomArrayElement} from './util.js';

// const DESCRIBING_TEXTS = [
//   'Без фильтров',
//   'Новая камера',
//   'Зацените фотку!',
//   'Хороший ракурс',
//   'Просто так',
//   'Из архива',
//   'Лучшее фото',
// ];

// const MESSAGES = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
// ];

// const NAMES = [
//   'Сафия',
//   'Екатерина',
//   'Таисия',
//   'Андрей',
//   'Нина',
//   'Леонид',
//   'Анастасия',
//   'Михаил',
//   'Мирослава',
//   'Антон',
//   'Есения',
//   'Давид',
//   'Никита',
//   'Елена',
//   'Фёдор',
//   'Виктория',
//   'Даниил',
//   'Милана',
//   'Лев',
//   'Денис',
// ];

// const NUMBER_DESCRIBING_PHOTOS = 25;

// const Likes = {
//   MIN: 15,
//   MAX: 200,
// };

// const Comments = {
//   MIN: 1,
//   MAX: 6,
// };

// const IdComments = {
//   MIN: 1,
//   MAX: 999,
// };

// const Avatars = {
//   MIN: 1,
//   MAX: 6,
// };

// //Получение объекта коментария

// const getComment = () => {
//   return  {
//     id: getRandomNumber(IdComments.MIN, IdComments.MAX),
//     avatar: 'img/avatar-' + getRandomNumber(Avatars.MIN, Avatars.MAX) + '.svg',
//     message: getRundomArrayElement(MESSAGES),
//     name: getRundomArrayElement(NAMES),
//   }
// };

// // Cоздание массива объектов комментариев

// const getArrayComments = () => {
//   return new Array(getRandomNumber(Comments.MIN, Comments.MAX)).fill(null).map(() => getComment());
// };

// // Создание массива объектов описания фотографии, опубликованной пользователем

// const getDescribingPhotos = () => {
//   const describingPhotos = [];

//   for (let i = 1; i <= NUMBER_DESCRIBING_PHOTOS; i++) {
//     describingPhotos.push({
//       id: i,
//       url : 'photos/' + i + '.jpg',
//       describing: getRundomArrayElement(DESCRIBING_TEXTS),
//       likes: getRandomNumber(Likes.MIN, Likes.MAX),
//       comments: getArrayComments(),
//     })
//   }
//   return describingPhotos;
// };

// export { getDescribingPhotos };
