import{updateColorBasedOnLastPrice}from"../../helpers.js";function provideDataForColorUpdate(e,r){updateColorBasedOnLastPrice(e,r,"INR")}function markupINR(e,r){r=r.c;document.querySelector(`.${e}-percentage`).innerHTML="",provideDataForColorUpdate(e,Number(r))}export{markupINR};