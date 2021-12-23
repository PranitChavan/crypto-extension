import { formatNumber } from '../../helpers.js';

const lastPrices = {
  btcLastPrice: null,
  ethLastPrice: null,
  bnbLastPrice: null,
};

function updateColorBasedOnLastPrice(currency, currPrice) {
  const priceEl = document.querySelector(`.${currency}-price`);

  priceEl.style.color =
    !lastPrices[`${currency}LastPrice`] ||
    lastPrices[`${currency}LastPrice`] === currPrice
      ? 'white'
      : currPrice > lastPrices[`${currency}LastPrice`]
      ? 'green'
      : 'red';

  lastPrices[`${currency}LastPrice`] = currPrice;

  priceEl.innerHTML = `${formatNumber(currPrice, 'INR')}`;
}

export function markupINR(currency, data) {
  const { c: price } = data;
  document.querySelector(`.${currency}-percentage`).innerHTML = '';

  if (currency === 'btc') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('btc', currPrice);
  }

  if (currency === 'eth') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('eth', currPrice);
  }

  if (currency === 'bnb') {
    const currPrice = Number(price);
    updateColorBasedOnLastPrice('bnb', currPrice);
  }
}
