const imageGallery = document.querySelector('.image--container');
const imageContainer = document.querySelector('.image--selection');
const apiUrl =
  'https://api.unsplash.com/photos/?client_id=8dd839a74ceea72e92afe3771beb91e0f2aae03d661286914f7cad77ba63e157';
const loading = '<h1 class="loader">Loading...</h1>';


const buttonLeft = document.querySelector('.left');
const buttonRight = document.querySelector('.right');
let output = '';
let imagesArray = [];
let imagesIndexes = [];

const showImages = () => {
  // Show loading text if no data
  if (imageContainer.children.length === 0) imageContainer.innerHTML = loading;

  fetch(apiUrl)
    .then((res) => {
      res.json().then((images) => {
        // first image on the viewer
        imageGallery.innerHTML = `<img src="${images[0].urls.regular}" class="animate-entrance image--gallery" alt="${images[0].alt_description}">`;
        setTimeout(() => {
          imageGallery.children[0].classList.remove('animate-entrance');
        }, 500);
        // show unselected images
        let imgIndex = 0;
        images.forEach(({ urls, alt_description }) => {
          imagesArray.push(urls.regular);
          imagesIndexes.push(imgIndex);

          output += `<img src="${urls.regular}" alt="${alt_description}" class="image__item" />`;
          imgIndex++;
        });
        imageContainer.innerHTML = output;
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

const changeImage = (e) => {
  // Get the viewer image element
  const image = imageGallery.children[0];
  if (e.target.src) {
    // change the image
    image.classList.add('animate-entrance');
    image.src = e.target.src;
    setTimeout(() => {
      image.classList.remove('animate-entrance');
    }, 800);
  }
};
// Event listeners
document.addEventListener('DOMContentLoaded', showImages);
imageContainer.addEventListener('click', changeImage);


const nextSlide = () => {
  const currImgSrc = imageGallery.children[0].src;
  const imgPosition = Number(imagesArray.indexOf(currImgSrc));
  const nextPosition =
    imgPosition === imagesIndexes.length - 1
      ? imagesIndexes[0]
      : imgPosition + 1;
  const image = imageGallery.children[0];
  image.classList.add('animate-entrance');
  image.src = imagesArray[nextPosition];
  setTimeout(() => {
    image.classList.remove('animate-entrance');
  }, 800);
};

const prevSlide = () => {
  const currImgSrc = imageGallery.children[0].src;
  const imgPosition = Number(imagesArray.indexOf(currImgSrc));
  const prevPosition =
    imgPosition === imagesIndexes[0]
      ? imagesIndexes.length - 1
      : imgPosition - 1;
  const image = imageGallery.children[0];

  image.classList.add('animate-entrance');
  image.src = imagesArray[prevPosition];
  setTimeout(() => {
    image.classList.remove('animate-entrance');
  }, 800);
};

buttonRight.addEventListener('click', nextSlide);
buttonLeft.addEventListener('click', prevSlide);

window.addEventListener('wheel', function (event) {
  event.deltaY < 0 ? nextSlide() : prevSlide();
});
