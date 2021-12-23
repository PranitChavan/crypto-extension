function onInit() {
  updateTicker();
  chrome.alarms.create('btc-ticker-watchdog', { periodInMinutes: 1 });

  const BINANCE_MENU_ITEM_ID = 'binance_menu_item';
  const CHANGELLY_MENU_ITEM_ID = 'changelly_menu_item';

  chrome.contextMenus.create({
    id: BINANCE_MENU_ITEM_ID,
    title: chrome.i18n.getMessage('binance_link_title'),
    contexts: ['browser_action'],
  });
  chrome.contextMenus.create({
    id: CHANGELLY_MENU_ITEM_ID,
    title: chrome.i18n.getMessage('changelly_link_title'),
    contexts: ['browser_action'],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    let navLink = null;

    if (info.menuItemId == BINANCE_MENU_ITEM_ID) {
      navLink = BINANCE_URL;
    } else if (info.menuItemId == CHANGELLY_MENU_ITEM_ID) {
      navLink = CHANGELLY_URL;
    }

    if (navLink) {
      chrome.tabs.create({ url: navLink });
    }
  });
}

async function updateTicker() {
  [priceResp] = await Promise.all([
    fetch('https://api.binance.com/api/v3/ticker/24hr', {
      cache: 'no-store',
    }),
  ]);
  const tickerData = await priceResp.json();

  const usd = tickerData.filter((coin) => {
    return coin.symbol === 'BTCUSDT';
  });

  const rateUsd = Math.trunc(usd[0].lastPrice);

  let rateUsdStr = rateUsd.toString();
  if (rateUsd > 10000) {
    to_trunc = (value, n) =>
      Math.floor(value * Math.pow(10, n)) / Math.pow(10, n);
    rateUsdStr =
      Number.parseFloat(to_trunc(rateUsd / 1000, 1)).toPrecision(3) + 'k';
  }

  const rateUsdLocale = rateUsd.toLocaleString();

  const res = await fetch('https://api.coindcx.com/exchange/ticker');
  const data = await res.json();

  const inr = data.filter((coin) => {
    return coin.market === 'BTCINR';
  });

  const options = {
    style: 'currency',
    currency: 'INR',
  };

  const eurRes = await fetch(
    'https://api.coindesk.com/v1/bpi/currentprice.json'
  );
  const eurData = await eurRes.json();

  const rateEur = Math.trunc(eurData.bpi.EUR.rate_float);
  const title = `${chrome.i18n.getMessage(
    'tooltip_price_title'
  )}\n Bitcoin Price
    \n${new Intl.NumberFormat('hi', options).format(
      inr[0].last_price
    )}\n${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(usd[0].lastPrice)}\n${chrome.i18n.getMessage(
    'tooltip_price_yesterday'
  )}${new Intl.NumberFormat('eu-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(rateEur)}
    \n Click on the icon to see more`;

  chrome.browserAction.setBadgeText({ text: rateUsdStr });
  chrome.browserAction.setBadgeBackgroundColor({ color: '#22750B' });
  chrome.browserAction.setTitle({ title: title });
}

function onAlarm(alarm) {
  updateTicker();
}

chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);

if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL('https://extension-feedback.netlify.app/');
} else {
  // Not yet enabled
}
