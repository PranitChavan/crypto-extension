function onInit() {
  updateTicker(),
    chrome.alarms.create('btc-ticker-watchdog', { periodInMinutes: 1 });
  const n = 'binance_menu_item',
    c = 'changelly_menu_item';
  chrome.contextMenus.create({
    id: n,
    title: chrome.i18n.getMessage('binance_link_title'),
    contexts: ['browser_action'],
  }),
    chrome.contextMenus.create({
      id: c,
      title: chrome.i18n.getMessage('changelly_link_title'),
      contexts: ['browser_action'],
    }),
    chrome.contextMenus.onClicked.addListener((e, t) => {
      let r = null;
      e.menuItemId == n
        ? (r = BINANCE_URL)
        : e.menuItemId == c && (r = CHANGELLY_URL),
        r && chrome.tabs.create({ url: r });
    });
}
async function updateTicker() {
  [priceResp] = await Promise.all([
    fetch('https://api.binance.com/api/v3/ticker/24hr', { cache: 'no-store' }),
  ]);
  const e = await priceResp.json();
  var t = e.filter((e) => 'BTCUSDT' === e.symbol);
  const r = Math.trunc(t[0].lastPrice);
  let n = r.toString();
  1e4 < r &&
    ((to_trunc = (e, t) => Math.floor(e * Math.pow(10, t)) / Math.pow(10, t)),
    (n = Number.parseFloat(to_trunc(r / 1e3, 1)).toPrecision(3) + 'k'));
  r.toLocaleString();
  const c = await fetch('https://api.coindcx.com/exchange/ticker'),
    o = await c.json();
  var i = o.filter((e) => 'BTCINR' === e.market);
  const a = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  var s = await a.json(),
    s = Math.trunc(s.bpi.EUR.rate_float),
    s =
      '' +
      chrome.i18n.getMessage('tooltip_price_title') +
      `
 Bitcoin Price
    
${new Intl.NumberFormat('hi', { style: 'currency', currency: 'INR' }).format(
  i[0].last_price
)}
${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
  t[0].lastPrice
)}
${chrome.i18n.getMessage('tooltip_price_yesterday')}${new Intl.NumberFormat(
        'eu-ES',
        { style: 'currency', currency: 'EUR' }
      ).format(s)}
    
 Click on the icon to see more`;
  chrome.browserAction.setBadgeText({ text: n }),
    chrome.browserAction.setBadgeBackgroundColor({ color: '#22750B' }),
    chrome.browserAction.setTitle({ title: s });
}
function onAlarm(e) {
  updateTicker();
}
chrome.runtime.onInstalled.addListener(onInit),
  chrome.alarms.onAlarm.addListener(onAlarm),
  chrome.runtime.setUninstallURL &&
    chrome.runtime.setUninstallURL('https://extension-feedback.netlify.app/');
('use strict');
import { state } from './model.js';
import { markupUSD } from './views/currencyRender/usdRender.js';
import { markupINR } from './views/currencyRender/inrRender.js';
import { markupEUR } from './views/currencyRender/eurRender.js';
import { renderFooter } from './views/footer.js';
import { clearFieldsWhenCurrencyChanged } from './helpers.js';
import * as dropdown from './views/dropdown.js';
function setCurrentCurrency(r) {
  (state.currentVal = r.target.value), clearFieldsWhenCurrencyChanged();
}
const controlUSDData = function (r) {
    'USD' === state.currentVal &&
      ('BTCUSDT' === r.s && markupUSD('btc', r),
      'ETHUSDT' === r.s && markupUSD('eth', r),
      'BNBUSDT' === r.s && markupUSD('bnb', r));
  },
  controlINRData = function (r) {
    Array.isArray(r) &&
      'INR' === state.currentVal &&
      r.forEach((r) => {
        'btcinr' === r.s && markupINR('btc', r),
          'ethinr' === r.s && markupINR('eth', r),
          'bnbinr' === r.s && markupINR('bnb', r);
      });
  },
  controlEURData = function (r) {
    'EUR' === state.currentVal &&
      ('BTCEUR' === r.s && markupEUR('btc', r),
      'ETHEUR' === r.s && markupEUR('eth', r),
      'BNBEUR' === r.s && markupEUR('bnb', r));
  };
renderFooter(), console.log(1);
export { setCurrentCurrency, controlUSDData, controlINRData, controlEURData };
function localeDecider(e) {
  return 'INR' === e
    ? 'en-In'
    : 'USD' === e
    ? 'en-US'
    : 'EUR' === e
    ? 'en-GB'
    : void 0;
}
const formatNumber = function (e, r) {
    return new Intl.NumberFormat(localeDecider(r), {
      style: 'currency',
      currency: r,
    }).format(e);
  },
  formatColor = function (e, r) {
    e.startsWith('-')
      ? document.querySelector(`.${r}-percentage`).classList.add('red')
      : document.querySelector(`.${r}-percentage`).classList.add('green');
  },
  formatDate = function () {
    return new Intl.DateTimeFormat('en-In', {
      hour: 'numeric',
      minute: 'numeric',
      year: 'numeric',
      day: 'numeric',
      month: 'long',
      weekDay: 'long',
    }).format(new Date());
  },
  lastPrices = { btcLastPrice: null, ethLastPrice: null, bnbLastPrice: null };
function updateColorBasedOnLastPrice(e, r, t) {
  const n = document.querySelector(`.${e}-price`);
  (n.style.color =
    lastPrices[e + 'LastPrice'] && lastPrices[e + 'LastPrice'] !== r
      ? r > lastPrices[e + 'LastPrice']
        ? 'green'
        : 'red'
      : 'white'),
    (lastPrices[e + 'LastPrice'] = r),
    (n.innerHTML = '' + formatNumber(r, t));
}
function clearFieldsWhenCurrencyChanged() {
  document.querySelectorAll('.main__items--percentage').forEach((e) => {
    e.innerHTML = '';
  }),
    document.querySelectorAll('.main__items--price').forEach((e) => {
      (e.innerHTML = ''), e.removeAttribute('style');
    });
}
export {
  formatNumber,
  formatColor,
  formatDate,
  updateColorBasedOnLastPrice,
  clearFieldsWhenCurrencyChanged,
};
('use strict');
import {
  controlUSDData,
  controlINRData,
  controlEURData,
} from './controller.js';
const state = { currentVal: 'USD' };
function getUSDData() {
  let t = new WebSocket(
    'wss://stream.binance.com:9443/ws/' +
      ['btcusdt@ticker', 'ethusdt@ticker', 'bnbusdt@ticker'].join('/')
  );
  t.onmessage = (t) => {
    t = JSON.parse(t.data);
    controlUSDData(t);
  };
}
function getINRData() {
  const t = new WebSocket('wss://stream.wazirx.com/stream');
  t.addEventListener('open', () => {
    t.send(JSON.stringify({ event: 'subscribe', streams: ['!ticker@arr'] }));
  }),
    (t.onmessage = (t) => {
      t = JSON.parse(t.data).data;
      controlINRData(t);
    });
}
function getEURData() {
  let t = new WebSocket(
    'wss://stream.binance.com:9443/ws/' +
      ['btceur@ticker', 'etheur@ticker', 'bnbeur@ticker'].join('/')
  );
  t.onmessage = (t) => {
    t = JSON.parse(t.data);
    controlEURData(t);
  };
}
getUSDData(), getINRData(), getEURData();
export { state, getUSDData, getINRData, getEURData };
import { setCurrentCurrency } from '../controller.js';
const dropdown = document.querySelector('.select__dropdown');
function getCurrentVal() {
  dropdown.addEventListener('change', setCurrentCurrency);
}
getCurrentVal();
import { formatDate } from '../helpers.js';
const footer = document.querySelector('#footer'),
  renderFooter = function () {
    footer.innerHTML = '';
    var o = ` <div class="footer__main">
  <p class="footer__msg">Data is updated in Real-time</p>
</div>

<div class="footer__details">
  <p class="footer__date">${formatDate()}</p>
  <p class="footer_credits">
    All the USD/EUR Price data is from Binance and INR data is from WazirX
  </p>
  <p class="footer__contact">Contact: Pranit55@protonmail.com</p>
</div>`;
    footer.insertAdjacentHTML('afterbegin', o);
  };
export { renderFooter };
import { updateColorBasedOnLastPrice, formatColor } from '../../helpers.js';
function markupEUR(e, r) {
  const a = document.querySelector(`.${e}-percentage`);
  var t,
    { P: o, c: r } = r;
  formatColor(o, e),
    'btc' === e &&
      ((t = Number(r)), updateColorBasedOnLastPrice('btc', t, 'EUR')),
    'eth' === e &&
      ((t = Number(r)), updateColorBasedOnLastPrice('eth', t, 'EUR')),
    'bnb' === e &&
      ((r = Number(r)), updateColorBasedOnLastPrice('bnb', r, 'EUR')),
    (a.innerHTML = o + ' <span class="main__items--duration">(24h)</span>');
}
export { markupEUR };
import { updateColorBasedOnLastPrice } from '../../helpers.js';
function markupINR(e, r) {
  var t,
    r = r['c'];
  (document.querySelector(`.${e}-percentage`).innerHTML = ''),
    'btc' === e &&
      ((t = Number(r)), updateColorBasedOnLastPrice('btc', t, 'INR')),
    'eth' === e &&
      ((t = Number(r)), updateColorBasedOnLastPrice('eth', t, 'INR')),
    'bnb' === e &&
      ((r = Number(r)), updateColorBasedOnLastPrice('bnb', r, 'INR'));
}
export { markupINR };
('use strict');
import { formatColor, updateColorBasedOnLastPrice } from '../../helpers.js';
function markupUSD(e, r) {
  const t = document.querySelector(`.${e}-percentage`);
  var a,
    { P: o, c: r } = r;
  'btc' === e &&
    ((a = Number(r)), updateColorBasedOnLastPrice('btc', a, 'USD')),
    'eth' === e &&
      ((a = Number(r)), updateColorBasedOnLastPrice('eth', a, 'USD')),
    'bnb' === e &&
      ((r = Number(r)), updateColorBasedOnLastPrice('bnb', r, 'USD')),
    formatColor(o, e),
    (t.innerHTML = o + ' <span class="main__items--duration">(24h)</span>');
}
export { markupUSD };
