import { toggle, up } from 'slide-element';

function handleMenuItemChildren() {
  const isMobile = () => window.innerWidth < 960;

  function handleMenu(menuElement) {
    const links = menuElement.querySelectorAll('.menu-item-has-children > a');
    links.forEach(link => {
      if (link.getAttribute('href') === '#') {
        link.addEventListener('click', event => event.preventDefault());
      }
    });

    function toggleMenu(event) {
      const target = event.target;
      const menuItem = target.closest('.menu-item-has-children');
      const menuLink = target.closest('.menu-item-has-children > a');

      if (menuItem && menuLink === target) {
        event.preventDefault();
        const subMenu = menuItem.querySelector('& > .sub-menu');
        toggle(subMenu, { display: 'flex' });
        menuItem.classList.toggle('is-open');

        const allOpenedItems = menuItem.parentElement.querySelectorAll(
          '.menu-item-has-children.is-open'
        );
        allOpenedItems.forEach(item => {
          if (item !== menuItem) {
            up(item.querySelector('.sub-menu'));
            item.classList.remove('is-open');
          }
        });
      }
    }

    function activateMenu() {
      if (menuElement.dataset.hasEventListener !== 'true') {
        menuElement.addEventListener('click', toggleMenu);
        menuElement.dataset.hasEventListener = 'true';
      }
    }

    function deactivateMenu() {
      if (menuElement.dataset.hasEventListener === 'true') {
        menuElement.removeEventListener('click', toggleMenu);
        menuElement.dataset.hasEventListener = 'false';

        menuElement
          .querySelectorAll('& > .menu-item-has-children')
          .forEach(item => item.classList.remove('is-open'));
        menuElement.querySelectorAll('& > .sub-menu').forEach(subMenu => {
          subMenu.style.display = '';
        });
      }
    }

    function applyMenuLogic() {
      if (isMobile()) {
        activateMenu();
      } else {
        deactivateMenu();
      }
    }

    applyMenuLogic();
    window.addEventListener('resize', applyMenuLogic);
  }

  const mobMenu = document.querySelector('.mobmenu');

  if (mobMenu) handleMenu(mobMenu);
}

document.addEventListener('DOMContentLoaded', () => {
  handleMenuItemChildren();
});
