import { formatNumber } from '../../helpers.js';

export function markupINR(currency, data) {
  document.querySelector(`.${currency}-percentage`).innerHTML = '';

  document.querySelector(`.${currency}-price`).innerHTML = `${formatNumber(
    data.c,
    'INR'
  )}`;
}
