import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export const initSlider = (container, options = {}) => {
  const sliderElement = container.querySelector('.splide');
  if (!sliderElement) return;

  const splide = new Splide(sliderElement, {
    type: 'slide',
    speed: 1000,
    perMove: 1,
    arrows: true,
    pagination: false,
    updateOnMove: true,

    ...options,
  }).mount();

  const navigationElems = {
    next: container.querySelector('.arrows__next'),
    prev: container.querySelector('.arrows__prev'),
    number: container.querySelector('.arrows__number'),
    progressbar: container.querySelector('.progressbar__thumb'),
  };
  const { next, prev, number, progressbar } = navigationElems;

  const updateSlideState = () => {
    const totalSlides = Math.ceil(
      splide.Components.Elements.slides.length / splide.options.perPage
    );
    const currentIndex = Math.ceil(splide.index / splide.options.perPage) + 1;

    const isAtStart = splide.index === 0;
    const isAtEnd = splide.index === splide.Components.Controller.getEnd();

    if (next && prev) {
      next.disabled = isAtEnd;
      prev.disabled = isAtStart;
      next.classList.toggle('isDisabled', isAtEnd);
      prev.classList.toggle('isDisabled', isAtStart);
    }

    if (number) {
      number.textContent = `${currentIndex}/${totalSlides}`;
    }

    if (progressbar) {
      const totalSlides = splide.Components.Elements.slides.length + 1;
      const progress =
        (((splide.index + 1) % totalSlides) /
          (totalSlides - splide.options.perPage)) *
        100;
      progressbar.style.width = `${progress}%`;
    }
  };

  next?.addEventListener('click', () => splide.go('>'));
  prev?.addEventListener('click', () => splide.go('<'));

  if (splide.options.type === 'fade') {
    splide.on('moved', updateSlideState);
  } else {
    splide.on('move', updateSlideState);
  }

  window.addEventListener('resize', updateSlideState);

  updateSlideState();

  return splide;
};

// <section class="elem">
//   <div class="splide">
//     <div class="splide__track">
//       <ul class="splide__list">
//         <li class="splide__slide">
//           <p>slide 1</p>
//         </li>
//         <li class="splide__slide">
//           <p>slide 1</p>
//         </li>
//       </ul>
//     </div>
//   </div>

//   <div class="arrows">
//     <div class="arrows__body">
//       <button type="button" class="arrows__prev">
//         <span>Назад</span>
//       </button>
//       <span class="arrows__number">1/1</span>
//       <button type="button" class="arrows__next">
//         <span>Далі</span>
//       </button>
//     </div>
//   </div>

//   <div class="progressbar">
//     <div class="progressbar__thumb"></div>
//   </div>
// </section>
