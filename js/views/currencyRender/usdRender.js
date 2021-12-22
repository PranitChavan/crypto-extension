'use strict';

import { formatColor, formatNumber } from '../../helpers.js';

let lastPrice = null;

export function markupUSD(currency, data) {
  formatColor(data.P, currency);

  document.querySelector(
    `.${currency}-percentage`
  ).innerHTML = `${data.P} <span class="main__items--duration">(24h)</span>`;

  document.querySelector(`.${currency}-price`).innerHTML = `${formatNumber(
    data.c,
    'USD'
  )}`;
}
