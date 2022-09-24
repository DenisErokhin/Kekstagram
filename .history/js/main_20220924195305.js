//функция выдающуя случайное число из заданого диапазона

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//функция для проверки максимальной длины строки

const checkLengthString = (text, maxLength) => text.length <= maxLength;

checkLengthString('Проверочный текст', 140);

const DESCRIBING_TEXTS = [
  'Без фильтров',
  'Новая камера',
  'Зацените фотку!',
  'Хороший ракурс',
  'Просто так',
  'Из архива',
  'Лучшее фото',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Сафия',
  'Екатерина',
  'Таисия',
  'Андрей',
  'Нина',
  'Леонид',
  'Анастасия',
  'Михаил',
  'Мирослава',
  'Антон',
  'Есения',
  'Давид',
  'Никита',
  'Елена',
  'Фёдор',
  'Виктория',
  'Даниил',
  'Милана',
  'Лев',
  'Денис',
];

const NUMBER_DESCRIBING_PHOTOS = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 1,
  MAX: 6,
};

const IdDescriptions = {
  MIN: 1,
  MAX: 25,
};

const IdComments = {
  MIN: 1,
  MAX: ,
};

const Addresses = {
  MIN: 1,
  MAX: 25,
};

const Avatars = {
  MIN: 1,
  MAX: 6,
};

// Получение рандомного элемента массива

const getRundomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

//Получение массива с рандомными неповторяющимися цифрами в диапазоне

const getNoRepeatNumbers = (min, max) => {
  const numbers = [];

  while (numbers.length < max) {
    const rundomNumber = getRandomNumber(min, max);
    const isNewNumber = numbers.every((element) => element !== rundomNumber)

    if(numbers.length === 0 || isNewNumber) {
      numbers.push(rundomNumber);
    }
  }
  return numbers;
}

const idDescriptions = getNoRepeatNumbers(IdDescriptions.MIN, IdDescriptions.MAX);
const idComments = getNoRepeatNumbers(IdComments.MIN, IdComments.MAX);
const addresses = getNoRepeatNumbers(Addresses.MIN, Addresses.MAX);

//Получение объекта коментария

const getComments = () => {
  const comments = [];

  for (let i = 0; i < getRandomNumber(Comments.MIN, Comments.MAX); i ++) {
    comments.push ({
      id: getRundomArrayElement(idComments),
      avatar: 'img/avatar-' + getRandomNumber(Avatars.MIN, Avatars.MAX) + '.svg',
      message: getRundomArrayElement(MESSAGES),
      NAMES: getRundomArrayElement(NAMES),
    })
  }

  return comments;
};

//Cоздание массива объектов комментариев

// const getArrayComments = () => {
//   return new Array(getRandomNumber(Comments.MIN, Comments.MAX)).fill(null).map(() => getComment());
// };

// Создание объекта описания фотографии, опубликованной пользователем
const getDescribingPhotos = () => {
  const describingPhotos = [];

  for (let i = 1; i <= NUMBER_DESCRIBING_PHOTOS; i++) {
    describingPhotos.push({
      id: i,
      url : 'photos/' + i + '.jpg',
      describing: getRundomArrayElement(DESCRIBING_TEXTS),
      likes: getRandomNumber(Likes.MIN, Likes.MAX),
      comments: getComments(),
    })
}
  return describingPhotos;
};

// Cоздание массива объектов, объекты это описания фотографий опубликованных пользователями

// const getDescribingPhotos = () => {
//   return new Array(NUMBER_DESCRIBING_PHOTOS).fill(null).map(() => getDescribing());
// };


