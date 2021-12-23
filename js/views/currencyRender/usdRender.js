'use strict';

import { formatColor, formatNumber } from '../../helpers.js';
let btcLastPrice = null;
let ethLastPrice = null;

export function markupUSD(currency, data) {
  const priceEl = document.querySelector(`.${currency}-price`);
  const percentageEl = document.querySelector(`.${currency}-percentage`);

  const { P: percentage, c: price } = data;

  if (currency === 'btc') {
    const currPrice = Number(price);

    if (!btcLastPrice) {
      priceEl.style.color = 'white';
    }

    priceEl.style.color = currPrice > btcLastPrice ? 'green' : 'red';
    btcLastPrice = price;
  }

  priceEl.innerHTML = `${formatNumber(price, 'USD')}`;

  formatColor(percentage, currency);

  percentageEl.innerHTML = `${percentage} <span class="main__items--duration">(24h)</span>`;
}
