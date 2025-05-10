const tabs = document.querySelectorAll('.tabs');

function initTabController() {
  tabs?.forEach(tab => {
    const tabButtons = tab.querySelectorAll('.tabs__btn');
    const tabContents = tab.querySelectorAll('.tabs__cont');

    if (!tabButtons.length || !tabContents.length) return;

    function handleTabBtns(event) {
      const button = event.currentTarget;
      if (button.classList.contains('is-active')) return;

      const tabId = button.dataset.tab;
      const targetTab = document.getElementById(tabId);

      if (!targetTab) return;

      tabButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      tabContents.forEach(content =>
        content.classList.remove('is-active', 'is-visible')
      );

      targetTab.classList.add('is-active');
      setTimeout(() => {
        targetTab.classList.add('is-visible');
      }, 100);
    }

    tabButtons.forEach(button => {
      button.addEventListener('click', handleTabBtns);
    });
  });
}

document.addEventListener('DOMContentLoaded', initTabController);

// <div class="tabs">
//   <div class="block__tabs">
//     <ul>
//       <li>
//         <button type="button" class="tabs__btn is-active" data-tab="block1">
//           block1
//         </button>
//       </li>
//       <li>
//         <button type="button" class="tabs__btn" data-tab="block2">
//           block2
//         </button>
//       </li>
//     </ul>
//   </div>

//   <div class="tabs__cont is-active is-visible" id="block1"></div>
//   <div class="tabs__cont" id="block2"></div>
// </div>
