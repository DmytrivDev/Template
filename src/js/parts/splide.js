import { initSlider } from './splidecust';

const elemSplide = document.querySelector('.elem');
if (elemSplide) {
  initSlider(elemSplide, {
    perPage: 2,
    breakpoints: {
      960: {},
      500: {},
    },
  });
}
