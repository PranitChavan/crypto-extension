import { updateColorBasedOnLastPrice, formatColor } from '../../helpers.js';

function provideDataForColorUpdate(coin, currentPrice) {
  updateColorBasedOnLastPrice(coin, currentPrice, 'EUR');
}

export function markupEUR(currency, data) {
  const percentageEl = document.querySelector(`.${currency}-percentage`);
  const { P: percentage, c: price } = data;

  formatColor(percentage, currency);

  let currentPrice = Number(price);

  provideDataForColorUpdate(currency, currentPrice);
  percentageEl.innerHTML = `${percentage} <span class="main__items--duration">(24h)</span>`;
}
