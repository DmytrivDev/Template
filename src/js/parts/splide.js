import { initSlider } from './splidecust';

// const elemSplide = document.querySelector('.elem');
// if (elemSplide) {
//   initSlider(elemSplide, {
//     perPage: 2,
//     gap: '1.5rem',
//     breakpoints: {
//       960: {},
//       768: {},
//     },
//   });
// }

// const elemSplides = document.querySelectorAll('.elem');
// elemSplides?.forEach(container => {
//   initSlider(container, {
//     perPage: 2,
//     gap: '1.5rem',
//     breakpoints: {
//       960: {},
//       768: {},
//     },
//   });
// });

// let elemSliderInstance;
// const elem = document.querySelector('.elem');

// const elemInitSlider = () => {
//   if (elem && !elemSliderInstance) {
//     elemSliderInstance = initSlider(elem, {
//       perPage: 2,
//       gap: '1.5rem',
//       breakpoints: {
//         960: {},
//         768: {},
//       },
//     });
//   }
// };

// let elemSliderInstances = [];
// const elem = document.querySelectorAll('.elem__splide');

// const elemInitSliders = () => {
//   if (elem && !elemSliderInstances.length) {
//     elem.forEach(container => {
//       const slider = initSlider(container, {
//         perPage: 2,
//         gap: '1.5rem',
//         breakpoints: {
//           960: {},
//           768: {},
//         },
//       });
//       elemSliderInstances.push(slider);
//     });
//   }
// };

// const destroySliders = () => {
//   if (elemSliderInstances) {
//     elemSliderInstances.forEach(instance => {
//       instance.destroy();
//     });
//     elemSliderInstances = [];
//   }
//   if (elemSliderInstance) {
//     elemSliderInstance.destroy();
//     elemSliderInstance = null;
//   }
// };

// const checkViewport = () => {
//   elemInitSliders();
//   elemInitSlider();
//   if (window.innerWidth > 960) {
//     destroySliders();
//   }
// };

// window.addEventListener('resize', checkViewport);
// document.addEventListener('DOMContentLoaded', checkViewport);
