import { updateColorBasedOnLastPrice, formatColor } from '../../helpers.js';

export function markupEUR(currency, data) {
  const percentageEl = document.querySelector(`.${currency}-percentage`);
  const { P: percentage, c: price } = data;

  formatColor(percentage, currency);

  if (currency === 'btc') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('btc', currPrice, 'EUR');
  }

  if (currency === 'eth') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('eth', currPrice, 'EUR');
  }

  if (currency === 'bnb') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('bnb', currPrice, 'EUR');
  }

  percentageEl.innerHTML = `${percentage} <span class="main__items--duration">(24h)</span>`;
}
