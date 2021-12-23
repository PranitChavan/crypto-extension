'use strict';

import {
  controlUSDData,
  controlINRData,
  controlEURData,
} from './controller.js';

export const state = {
  currentVal: 'USD',
};

/**
 * USD DATA
 */

export function getUSDData() {
  let streams = ['btcusdt@ticker', 'ethusdt@ticker', 'bnbusdt@ticker'];
  let ws = new WebSocket(
    'wss://stream.binance.com:9443/ws/' + streams.join('/')
  );

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    controlUSDData(data);
  };

  return;
}

getUSDData();

/**
 * INR DATA
 */

export function getINRData() {
  const wsINR = new WebSocket('wss://stream.wazirx.com/stream');

  wsINR.addEventListener('open', () => {
    wsINR.send(
      JSON.stringify({ event: 'subscribe', streams: ['!ticker@arr'] })
    );
  });

  wsINR.onmessage = (e) => {
    const res = JSON.parse(e.data);
    const { data } = res;
    controlINRData(data);
  };

  return;
}

getINRData();

/**
 * EUR
 */

export function getEURData() {
  let streamsEUR = ['btceur@ticker', 'etheur@ticker', 'bnbeur@ticker'];
  let wsEUR = new WebSocket(
    'wss://stream.binance.com:9443/ws/' + streamsEUR.join('/')
  );

  wsEUR.onmessage = (e) => {
    const data = JSON.parse(e.data);
    controlEURData(data);
  };

  return;
}

getEURData();
