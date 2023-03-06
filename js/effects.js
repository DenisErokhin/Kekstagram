/* global noUiSlider:readonly */

const Effects = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
  none: 'none',
};

const imgUploadPreview = document.querySelector('.img-upload__preview > img');
const radioButtons = document.querySelectorAll('.effects__radio');
const sliderBox = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
let lastClass;

const {chrome, sepia, marvin, phobos, heat} = Effects;

const keysEffects = Object.keys(Effects);

const [chromeKey, sepiaKey, marvinKey, phobosKey, heatKey, noneKey] = keysEffects;

// Переключение эффектов фото

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
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

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', () => {
    if (lastClass) {
      imgUploadPreview.classList.remove(lastClass);
    }

    if (radioButton.value === noneKey) {
      sliderBox.classList.add('visually-hidden');
      imgUploadPreview.style.filter = 'none';
    } else {
      sliderBox.classList.remove('visually-hidden');
      imgUploadPreview.classList.add(`effects__preview--${radioButton.value}`);
      lastClass = `effects__preview--${radioButton.value}`;
    }

    if (radioButton.value === chromeKey || radioButton.value === sepiaKey) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
    }  else if (radioButton.value === marvinKey) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
    } else if (radioButton.value === phobosKey) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
    } else if (radioButton.value === heatKey) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
    }
  })
});

sliderElement.noUiSlider.on('update', (values, handle) => {
  valueElement.value = values[handle];
  let radioChecked;
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      radioChecked = radioButton;
    }
  });

  if (radioChecked.value === chromeKey) {
    imgUploadPreview.style.filter = `${chrome}(${values[handle]})`;
  } else if (radioChecked.value === sepiaKey) {
    imgUploadPreview.style.filter = `${sepia}(${values[handle]})`;
  } else if (radioChecked.value === marvinKey) {
    imgUploadPreview.style.filter = `${marvin}(${values[handle]}%)`;
    valueElement.value += '%';
  } else if (radioChecked.value === phobosKey) {
    imgUploadPreview.style.filter = `${phobos}(${values[handle]}px)`;
    valueElement.value += 'px';
  } else if (radioChecked.value === heatKey) {
    imgUploadPreview.style.filter = `${heat}(${values[handle]})`;
  }
});

export { sliderBox, lastClass };
