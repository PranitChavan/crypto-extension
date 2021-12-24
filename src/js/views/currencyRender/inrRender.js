import { updateColorBasedOnLastPrice } from '../../helpers.js';

function provideDataForColorUpdate(coin, currentPrice) {
  updateColorBasedOnLastPrice(coin, currentPrice, 'INR');
}

export function markupINR(currency, data) {
  const { c: price } = data;
  document.querySelector(`.${currency}-percentage`).innerHTML = '';

  let currentPrice = Number(price);

  provideDataForColorUpdate(currency, currentPrice);
}
