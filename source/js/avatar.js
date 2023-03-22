const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const SizePicture = {
  WIDTH: 600,
  HEIGHT: 600,
};

const uploadButton = document.querySelector('#upload-file');
const bigImg = document.querySelector('.img-upload__preview > img');
const previews = document.querySelectorAll('.effects__preview');

uploadButton.addEventListener('change', () => {
  const file = uploadButton.files[0];
  const isMatch = fileTypes.includes(file.type);

  if (isMatch) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      bigImg.src = reader.result;
      bigImg.width = SizePicture.WIDTH;
      bigImg.height = SizePicture.HEIGHT;

      previews.forEach((filter) => {
        filter.style.backgroundImage = `url(${reader.result})`;
      })
    });

    reader.readAsDataURL(file);
  }
});
