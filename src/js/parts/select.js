import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.default.css';

const tomSelect = document.querySelectorAll(
  'select.tom-select:not(.tomselected)'
);

tomSelect?.forEach(select => {
  const noResultsText = select.dataset.noresults || 'No results found';

  new TomSelect(select, {
    create: false,
    maxOptions: 1000,
    searchField: ['text'],
    render: {
      item: function (data, escape) {
        if (select.dataset.txt) {
          return `<div>${select.dataset.txt} ${escape(data.text)}</div>`;
        } else {
          return `<div>${escape(data.text)}</div>`;
        }
      },
      no_results: function () {
        return `<div class="no-results">${noResultsText}</div>`;
      },
    },
    onDropdownOpen: function () {
      this.dropdown.classList.add('is-open');
    },
    onDropdownClose: function () {
      this.dropdown.classList.remove('is-open');
    },
  });
});

// <select class="tom-select" data-noresults="Результати не знайдені" data-txt="All:" placeholder="Select option">
//   <option value="">All</option>
//   <option value="1">Nikola</option>
//   <option value="2">Nikola Tesla</option>
//   <option value="3">Thomas Edison</option>
// </select>
