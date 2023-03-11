const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const Picture = {
  WIDTH: 600,
  HEIGHT: 600,
};

const uploadButton = document.querySelector('#upload-file');
const bigPicture = document.querySelector('.img-upload__preview > img');
const previews = document.querySelectorAll('.effects__preview');

uploadButton.addEventListener('change', () => {
  const file = uploadButton.files[0];
  const matches = fileTypes.includes(file.type);

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      bigPicture.src = reader.result;
      bigPicture.width = Picture.WIDTH;
      bigPicture.height = Picture.HEIGHT;

      previews.forEach((filter) => {
        filter.style.backgroundImage = `url(${reader.result})`;
      })
    });

    reader.readAsDataURL(file);
  }
});
