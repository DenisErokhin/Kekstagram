import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const valueSlider = {
  default: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 0,
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
  },
};

const Effect = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
  none: 'none',
};

const {chrome, sepia, marvin, phobos, heat, none} = Effect;

const uploadImg = document.querySelector('.img-upload__preview > img');
const radioButtons = document.querySelectorAll('.effects__radio');
const sliderBox = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
let lastClass;

// Cоздание слайдера

noUiSlider.create(sliderElement, {
  range: {
    min: valueSlider.default.min,
    max: valueSlider.default.max,
  },
  start: valueSlider.default.start,
  step: valueSlider.default.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Получение активной радиокнопки
const getCheckedButton = () => {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i];
    }
  }
};

// Изменение значения слайдера

const changeFilter = (checkedButton) => {
  const valueButton = checkedButton.value;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: valueSlider[valueButton].min,
      max: valueSlider[valueButton].max,
    },
    step: valueSlider[valueButton].step,
    start: valueSlider[valueButton].start,
  });
};

const checkButton = () => {
  const checkedButton = getCheckedButton();

  if (lastClass) {
    uploadImg.classList.remove(lastClass);
  }

  if (checkedButton.value === none) {
    sliderBox.classList.add('visually-hidden');
    uploadImg.style.filter = 'none';
  } else {
    changeFilter(checkedButton);
    sliderBox.classList.remove('visually-hidden');
    uploadImg.classList.add(`effects__preview--${checkedButton.value}`);
    lastClass = `effects__preview--${checkedButton.value}`;
  }
}

// Создание обработчиков для радиокнопок

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', () => {
    checkButton();
  })
});

// Добавление значения фильтра картинке и нужному полю

sliderElement.noUiSlider.on('update', (values, handle) => {
  valueElement.value = values[handle];

  const filters = {
    chrome: () => `${chrome}(${values[handle]})`,
    sepia: () => `${sepia}(${values[handle]})`,
    heat: () => `${heat}(${values[handle]})`,
    marvin: () => {
      valueElement.value += '%';
      return `${marvin}(${values[handle]}%)`;
    },
    phobos: () => {
      valueElement.value += 'px';
      return `${phobos}(${values[handle]}px)`
    },
  }

  const checkedButton = getCheckedButton();

  if (checkedButton.value !== none) {
    uploadImg.style.filter = filters[checkedButton.value]();
  }
});

export { sliderBox, lastClass };
