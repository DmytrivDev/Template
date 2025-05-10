const showBox = document.querySelectorAll('.show-box');

showBox.forEach(block => {
  const showBtn = block.querySelector('.show-btn');

  if (!showBtn) return;

  showBtn.addEventListener('click', () => {
    showBtn.style.display = 'none';
    block.classList.add('is-open');

    setTimeout(() => {
      block.classList.add('is-visible');
    }, 100);
  });
});

// <div class="show-box">
//   <ul>
//     <li></li>
//     <li></li>
//     <li></li>
//   </ul>

//   <button type="button" class="show-btn"></button>
// </div>
