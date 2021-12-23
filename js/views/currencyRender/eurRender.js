import { formatNumber, formatColor } from '../../helpers.js';

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

  priceEl.innerHTML = `${formatNumber(currPrice, 'EUR')}`;
}

export function markupEUR(currency, data) {
  const percentageEl = document.querySelector(`.${currency}-percentage`);
  const { P: percentage, c: price } = data;

  formatColor(percentage, currency);

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

  percentageEl.innerHTML = `${percentage} <span class="main__items--duration">(24h)</span>`;
}
