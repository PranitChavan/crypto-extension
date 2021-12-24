import { updateColorBasedOnLastPrice } from '../../helpers.js';

export function markupINR(currency, data) {
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

  if (currency === 'sol') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('sol', currPrice, 'INR');
  }

  if (currency === 'ltc') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('ltc', currPrice, 'INR');
  }

  if (currency === 'ada') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('ada', currPrice, 'INR');
  }
}
