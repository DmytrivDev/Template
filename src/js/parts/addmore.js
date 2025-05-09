const moreBlock = document.querySelectorAll('.more-block');

moreBlock.forEach(block => {
  if (!block) return;

  const addMore = block.querySelector('.add-more');
  addMore?.addEventListener('click', () => {
    if (block) {
      addMore.style.display = 'none';
      block.classList.add('is-open');

      setTimeout(() => {
        block.classList.add('is-visible');
      }, 100);
    }
  });
});

// <div class="more-block">
//   <ul>
//     <li></li>
//     <li></li>
//     <li></li>
//   </ul>

//   <button type="button" class="add-more"></button>
// </div>
