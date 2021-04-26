const sliderNavi = document.querySelector('.slider__navi');
const slides = document.querySelectorAll('.slide');

sliderNavi.addEventListener('click', function (event) {
  event.preventDefault();

  if (!event.target.classList.contains('slide-nav')) return;

  document.querySelector('.active').classList.remove('active');

  const currentSlide = document.querySelector('.flex--active');
  let nextSlide;
  let clickedNav = event.target;
  clickedNav.classList.add('active');
  const dataSlide = clickedNav.getAttribute('data-slide');

  slides.forEach((slide) => {
    if (slide.getAttribute('data-slide') === dataSlide) nextSlide = slide;
  }, dataSlide);

  currentSlide.classList.remove('flex--active');
  currentSlide.classList.add('animate--start');
  nextSlide.classList.add('flex--active');
  nextSlide.classList.remove('animate--start');
});
