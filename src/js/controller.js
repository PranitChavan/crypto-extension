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

    if (data.s === 'LTCUSDT') {
      markupUSD('ltc', data);
    }

    if (data.s === 'ADAUSDT') {
      markupUSD('ada', data);
    }
    if (data.s === 'XRPUSDT') {
      markupUSD('xrp', data);
    }
    if (data.s === 'DOGEUSDT') {
      markupUSD('doge', data);
    }
    if (data.s === 'SHIBUSDT') {
      markupUSD('shib', data);
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
      if (coin.s === 'ltcinr') {
        markupINR('ltc', coin);
      }
      if (coin.s === 'adainr') {
        markupINR('ada', coin);
      }
      if (coin.s === 'xrpinr') {
        markupINR('xrp', coin);
      }
      if (coin.s === 'dogeinr') {
        markupINR('doge', coin);
      }
      if (coin.s === 'shibinr') {
        markupINR('shib', coin);
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

    if (data.s === 'LTCEUR') {
      markupEUR('ltc', data);
    }

    if (data.s === 'ADAEUR') {
      markupEUR('ada', data);
    }
    if (data.s === 'XRPEUR') {
      markupEUR('xrp', data);
    }
    if (data.s === 'DOGEEUR') {
      markupEUR('doge', data);
    }
    if (data.s === 'SHIBEUR') {
      markupEUR('shib', data);
    }
  }
};

renderFooter();
