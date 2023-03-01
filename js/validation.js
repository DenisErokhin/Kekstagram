const Length = {
  MIN: 2,
  MAX: 20,
};

const MAX_NUMBER_HASHTAG = 5;

const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const submitForm = document.querySelector('.img-upload__submit');

const regularExpression = new RegExp('^#[a-zA-Z0-9]{1,19}$');

// Проверка валидности полей

hashtagField.addEventListener('input', () => {
  if (!hashtagField.value.length) {
    hashtagField.setCustomValidity('');
    hashtagField.style.borderColor = '';
    return;
  }
  const hashtags = hashtagField.value.toLowerCase().trim().split(/\s+/);
  let message = '';

  for (let i = 0; i < hashtags.length; i++) {

    if (!hashtags[i].startsWith('#')) {
      message = 'хэш-тег начинается с символа # (решётка)';
    } else if (hashtags[i].length < Length.MIN) {
      message = 'хеш-тег не может состоять только из одной решётки';
    } else if (hashtags[i].length > Length.MAX) {
      message = 'максимальная длина одного хэш-тега 20 символов, включая решётку';
    } else if (hashtags.length > MAX_NUMBER_HASHTAG) {
      message = 'нельзя указать больше пяти хэш-тегов';
    } else if (hashtags[i].length > 3 && hashtags[i].startsWith('#', 2)) {
      message = 'хэш-теги разделяются пробелами';
    } else if (!regularExpression.test(hashtags[i])) {
      message = 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.';
    } else if (hashtags.indexOf(hashtags[i]) !== i) {
      message = 'один и тот же хэш-тег не может быть использован дважды';
    } else {
      hashtagField.setCustomValidity('');
      hashtagField.style.borderColor = '';
    }

    if (message !== '') {
      hashtagField.setCustomValidity(message);
      return message;
    }
  }
});

const checkValidElement = () => {

  if (!hashtagField.validity.valid) {
    hashtagField.style.borderColor = 'red';
  }

  if (!commentField.validity.valid) {
    commentField.style.borderColor = 'red';
  }
};

export { hashtagField, commentField, submitForm, checkValidElement };
