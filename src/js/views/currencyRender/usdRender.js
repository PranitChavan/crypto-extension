'use strict';

import { formatColor, updateColorBasedOnLastPrice } from '../../helpers.js';

function provideDataForColorUpdate(coin, currentPrice) {
  updateColorBasedOnLastPrice(coin, currentPrice, 'USD');
}

export function markupUSD(currency, data) {
  const percentageEl = document.querySelector(`.${currency}-percentage`);

  const { P: percentage, c: price } = data;

  let currentPrice = Number(price);

  provideDataForColorUpdate(currency, currentPrice);

  formatColor(percentage, currency);

  percentageEl.innerHTML = `${percentage} <span class="main__items--duration">(24h)</span>`;
}
