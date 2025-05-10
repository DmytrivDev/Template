import { lockScroll, unlockScroll } from './lockscroll.js';

const burger = document.querySelector('.burger');
const mobMenu = document.querySelector('.mobmenu');
const mobMenuBody = document.querySelector('.mobmenu__body');
const mobNavLinks = document.querySelectorAll('.mobmenu .navmenu__list a');

let isMenuOpened = false;

function toggleMenu() {
  isMenuOpened = !isMenuOpened;
  burger.classList.toggle('is-open');
  mobMenu.classList.toggle('is-open');

  if (isMenuOpened) {
    lockScroll(mobMenuBody);
  } else {
    unlockScroll();
  }
}

function closeMenu() {
  if (isMenuOpened) {
    isMenuOpened = false;
    burger.classList.remove('is-open');
    mobMenu.classList.remove('is-open');
    unlockScroll();
  }
}

function handleResize() {
  if (window.innerWidth > 960) {
    closeMenu();
  }
}

function initMenu() {
  if (!burger || !mobMenu || !mobMenuBody) return;

  window.addEventListener('resize', handleResize);
  burger.addEventListener('click', toggleMenu);

  mobNavLinks.forEach(link => {
    link.addEventListener('click', event => {
      const itemChildren = event.target.closest('.menu-item');

      const hasItemChildren = itemChildren?.classList.contains(
        'menu-item-has-children'
      );

      if (!hasItemChildren) {
        closeMenu();
      }
    });
  });
}

// розрахунку height: 100vh на iOS ===========
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
document.addEventListener('DOMContentLoaded', setVh);

document.addEventListener('DOMContentLoaded', initMenu);
