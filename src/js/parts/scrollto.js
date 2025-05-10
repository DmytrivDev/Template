import scrollToElement from 'scroll-to-element';

const anchorLinks = document.querySelectorAll('.anchor-links li > a, .anchor');

anchorLinks?.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');

    if (href.startsWith('#') && href !== '#') {
      event.preventDefault();

      const header = document.querySelector('.header');
      const headerHeight = header?.offsetHeight || 0;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        scrollToElement(targetElement, {
          offset: -headerHeight,
          ease: 'inOutQuint',
          duration: 1000,
        });
      }
    }
  });
});

// <ul class="anchor-links">
//   <li class="menu-item">
//     <a href="#"></a>
//   </li>
// </ul>
