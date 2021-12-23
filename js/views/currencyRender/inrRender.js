import { updateColorBasedOnLastPrice } from '../../helpers.js';

export function markupINR(currency, data) {
  const priceEl = document.querySelector(`.${currency}-price`);

  console.log(priceEl.getAttribute('style'));
  const { c: price } = data;
  document.querySelector(`.${currency}-percentage`).innerHTML = '';

  if (currency === 'btc') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('btc', currPrice, 'INR');
  }

  if (currency === 'eth') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('eth', currPrice, 'INR');
  }

  if (currency === 'bnb') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('bnb', currPrice, 'INR');
  }
}
