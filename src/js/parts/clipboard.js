const copyBtns = document.querySelectorAll('.clipboard');

copyBtns?.forEach(btn => {
  btn.addEventListener('click', event => {
    const copyBox = event.target.closest('.copyBox');
    if (copyBox.classList.contains('isCopy')) return;

    const textToCopy = btn.dataset.copy;

    if (copyBox && textToCopy) {
      const copyElem = copyBox.querySelector('.copyElem');
      const textDef = copyElem.textContent.trim();

      if (copyElem) {
        const textElem = copyElem.textContent.trim();

        navigator.clipboard
          .writeText(textElem)
          .then(() => {
            if (!copyBox.timer) {
              copyBox.timer = null;
            }

            copyBox.classList.add('isCopy');
            copyElem.textContent = textToCopy;

            if (copyBox.timer) {
              clearTimeout(copyBox.timer);
            }

            copyBox.timer = setTimeout(() => {
              copyElem.textContent = textDef;
              copyBox.classList.remove('isCopy');
              copyBox.timer = null;
            }, 1000);
          })
          .catch(err => {
            console.error('Помилка при копіюванні: ', err);
          });
      }
    }
  });
});

// <div class="copyBox">
//   <button
//     type="button"
//     class="clipboard"
//     aria-label="Copy button"
//     data-copy="Copied to the clipboard"
//   ></button>
//   <a href="#" class="copyElem">
//     Text
//   </a>
// </div>
