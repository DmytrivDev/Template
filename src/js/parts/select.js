import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.default.css';

const tomSelect = document.querySelectorAll('.tom-select');

tomSelect.forEach(select => {
  new TomSelect(select, {
    create: false,
    controlInput: false,
    searchField: [],

    render: {
      item: function (data, escape) {
        return `<div>${select.dataset.txt} ${escape(data.text)}</div>`;
      },
    },
  });
});
