"use strict";import{formatColor,updateColorBasedOnLastPrice}from"../../helpers.js";function markupUSD(e,r){const t=document.querySelector(`.${e}-percentage`);var a,{P:o,c:r}=r;"btc"===e&&(a=Number(r),updateColorBasedOnLastPrice("btc",a,"USD")),"eth"===e&&(a=Number(r),updateColorBasedOnLastPrice("eth",a,"USD")),"bnb"===e&&(r=Number(r),updateColorBasedOnLastPrice("bnb",r,"USD")),formatColor(o,e),t.innerHTML=o+' <span class="main__items--duration">(24h)</span>'}export{markupUSD};