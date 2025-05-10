const copyBtns = document.querySelectorAll('.copy-btn');

copyBtns?.forEach(btn => {
  btn.addEventListener('click', event => {
    const copyBox = event.target.closest('.copy-box');
    if (!copyBox) return;

    const copyElem = copyBox.querySelector('.copy-elem');

    if (copyElem) {
      const textToCopied = btn.dataset.copied;
      const clipboardElem = copyElem.dataset.clipboard;

      navigator.clipboard
        .writeText(clipboardElem)
        .then(() => {
          if (!copyBox.timer) copyBox.timer = null;

          copyBox.classList.add('is-copy');

          if (textToCopied) copyElem.textContent = textToCopied;

          if (copyBox.timer) clearTimeout(copyBox.timer);

          copyBox.timer = setTimeout(() => {
            if (textToCopied) copyElem.textContent = clipboardElem;
            copyBox.classList.remove('is-copy');
            copyBox.timer = null;
          }, 1000);
        })
        .catch(err => {
          console.error('Помилка при копіюванні: ', err);
        });
    }
  });
});

// <div class="copy-box">
//   <button
//     type="button"
//     class="copy-btn"
//     aria-label="Copy button"
//     data-copied="Copied to the clipboard"
//   >
//     X
//   </button>
//   <a href="#" class="copy-elem" data-clipboard="Clipboard">
//     Clipboard
//   </a>
// </div>
