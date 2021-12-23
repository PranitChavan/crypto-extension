'use strict';

import { state } from './model.js';
import { markupUSD } from './views/currencyRender/usdRender.js';
import { markupINR } from './views/currencyRender/inrRender.js';
import { markupEUR } from './views/currencyRender/eurRender.js';
import { renderFooter } from './views/footer.js';
import { clearFieldsWhenCurrencyChanged } from './helpers.js';
import * as dropdown from './views/dropdown.js';

export function setCurrentCurrency(e) {
  state.currentVal = e.target.value;
  clearFieldsWhenCurrencyChanged();
}

export const controlUSDData = function (data) {
  if (state.currentVal === 'USD') {
    if (data.s === 'BTCUSDT') {
      markupUSD('btc', data);
    }
    if (data.s === 'ETHUSDT') {
      markupUSD('eth', data);
    }
    if (data.s === 'BNBUSDT') {
      markupUSD('bnb', data);
    }

    if (data.s === 'SOLUSDT') {
      markupUSD('sol', data);
    }
  }
};

export const controlINRData = function (data) {
  if (!Array.isArray(data)) return;

  if (state.currentVal === 'INR') {
    data.forEach((coin) => {
      if (coin.s === 'btcinr') {
        markupINR('btc', coin);
      }
      if (coin.s === 'ethinr') {
        markupINR('eth', coin);
      }
      if (coin.s === 'bnbinr') {
        markupINR('bnb', coin);
      }
      if (coin.s === 'solinr') {
        markupINR('sol', coin);
      }
    });
  }
};

export const controlEURData = function (data) {
  if (state.currentVal === 'EUR') {
    if (data.s === 'BTCEUR') {
      markupEUR('btc', data);
    }
    if (data.s === 'ETHEUR') {
      markupEUR('eth', data);
    }

    if (data.s === 'BNBEUR') {
      markupEUR('bnb', data);
    }

    if (data.s === 'SOLEUR') {
      markupEUR('sol', data);
    }
  }
};

renderFooter();
