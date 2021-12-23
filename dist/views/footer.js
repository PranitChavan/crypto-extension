import{formatDate}from"../helpers.js";const footer=document.querySelector("#footer"),renderFooter=function(){footer.innerHTML="";var o=` <div class="footer__main">
  <p class="footer__msg">Data is updated in Real-time</p>
</div>

<div class="footer__details">
  <p class="footer__date">${formatDate()}</p>
  <p class="footer_credits">
    All the USD/EUR Price data is from Binance and INR data is from WazirX
  </p>
  <p class="footer__contact">Contact: Pranit55@protonmail.com</p>
</div>`;footer.insertAdjacentHTML("afterbegin",o)};export{renderFooter};