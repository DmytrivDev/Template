import { lockScroll, unlockScroll } from './lockscroll.js';

const activeModals = new Set();
const initializedModals = new WeakSet();

let lastFocusedElement = null;

function showModal(modal) {
  modal.classList.add('is-open');
  lockScroll(modal);
  activeModals.add(modal);

  setTimeout(() => {
    modal.focus();
  }, 150);
}

export function closeModal(modal) {
  modal.classList.remove('is-open');

  setTimeout(() => {
    activeModals.delete(modal);
    unlockScroll();

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }, 150);
}

function initCloseModal(modal) {
  if (initializedModals.has(modal)) return;

  const modalContainer = modal.querySelector('.modal__container');
  const btnsCloseModal = modal.querySelectorAll('.close-modal');

  btnsCloseModal.forEach(btn => {
    btn.addEventListener('click', () => closeModal(modal));
  });

  if (modalContainer) {
    modalContainer.addEventListener('click', event => {
      if (event.target === modalContainer) {
        closeModal(modal);
      }
    });
  }

  initializedModals.add(modal);
}

export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    lastFocusedElement = document.activeElement;

    activeModals.forEach(activeModal => {
      if (activeModal !== modal) {
        closeModal(activeModal);
      }
    });

    if (!initializedModals.has(modal)) {
      initCloseModal(modal);
    }

    if (!modal.classList.contains('is-open')) {
      showModal(modal);
    }
  }
}

function initOpenModal() {
  const btnsOpenModal = document.querySelectorAll('.open-modal');
  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.id;
      if (modalId) {
        openModal(modalId);
      }
    });
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    const lastModal = Array.from(activeModals).pop();
    if (lastModal) closeModal(lastModal);
  }
});

document.addEventListener('DOMContentLoaded', initOpenModal);
