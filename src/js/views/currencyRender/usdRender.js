'use strict';

import { formatColor, updateColorBasedOnLastPrice } from '../../helpers.js';

export function markupUSD(currency, data) {
  const percentageEl = document.querySelector(`.${currency}-percentage`);

  const { P: percentage, c: price } = data;

  if (currency === 'btc') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('btc', currPrice, 'USD');
  }

  if (currency === 'eth') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('eth', currPrice, 'USD');
  }

  if (currency === 'bnb') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('bnb', currPrice, 'USD');
  }

  if (currency === 'sol') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('sol', currPrice, 'USD');
  }

  if (currency === 'ltc') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('ltc', currPrice, 'USD');
  }

  if (currency === 'ada') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('ada', currPrice, 'USD');
  }

  formatColor(percentage, currency);

  percentageEl.innerHTML = `${percentage} <span class="main__items--duration">(24h)</span>`;
}
