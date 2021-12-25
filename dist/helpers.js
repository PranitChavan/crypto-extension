function localeDecider(e){return"INR"===e?"en-In":"USD"===e?"en-US":"EUR"===e?"en-GB":void 0}const formatNumber=function(e,r){return new Intl.NumberFormat(localeDecider(r),{style:"currency",currency:r,minimumFractionDigits:5<+e.toFixed(0)?2:6}).format(e)},formatColor=function(e,r){e.startsWith("-")?document.querySelector(`.${r}-percentage`).classList.add("red"):document.querySelector(`.${r}-percentage`).classList.add("green")},formatDate=function(){return new Intl.DateTimeFormat("en-In",{hour:"numeric",minute:"numeric",year:"numeric",day:"numeric",month:"long",weekDay:"long"}).format(new Date)},lastPrices={btcLastPrice:null,ethLastPrice:null,bnbLastPrice:null};function updateColorBasedOnLastPrice(e,r,t){const n=document.querySelector(`.${e}-price`);n.style.color=lastPrices[e+"LastPrice"]&&lastPrices[e+"LastPrice"]!==r?r>lastPrices[e+"LastPrice"]?"green":"red":"white",lastPrices[e+"LastPrice"]=r,n.innerHTML=""+formatNumber(r,t)}function clearFieldsWhenCurrencyChanged(){document.querySelectorAll(".main__items--percentage").forEach(e=>{e.innerHTML=""}),document.querySelectorAll(".main__items--price").forEach(e=>{e.innerHTML="",e.removeAttribute("style")})}export{formatNumber,formatColor,formatDate,updateColorBasedOnLastPrice,clearFieldsWhenCurrencyChanged};