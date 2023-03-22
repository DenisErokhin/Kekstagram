const ALERT_SHOW_TIME = 5000;

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

// Показ сообщения об ошибке загрузки данных

const showAlert = (message) => {

  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.color = 'black';
  alertContainer.style.fontWeight = '700';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME)
};

export { getRandomNumber, checkLengthString, getRundomArrayElement, isEscEvent, showAlert };
