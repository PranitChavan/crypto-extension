import { setCurrentCurrency } from '../controller.js';

const dropdown = document.querySelector('.select__dropdown');

function getCurrentVal() {
  dropdown.addEventListener('change', setCurrentCurrency);
}

getCurrentVal();
