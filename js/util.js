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

const checkLengthString = (text, maxLength) => text.length < maxLength;

// Получение рандомного элемента массива

const getRundomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

// Проверка на нажатие кнопки Esc

const isEscEvent = (evt) => evt.keyCode === 27;

export {getRandomNumber, checkLengthString, getRundomArrayElement, isEscEvent};
