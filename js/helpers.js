function localeDecider(currency) {
  if (currency === 'INR') return 'en-In';
  if (currency === 'USD') return 'en-US';
  if (currency === 'EUR') return 'en-GB';
}

export const formatNumber = function (data, currency) {
  return new Intl.NumberFormat(localeDecider(currency), {
    style: 'currency',
    currency: currency,
  }).format(data);
};

export const formatColor = function (data, currency) {
  if (data.startsWith('-')) {
    document.querySelector(`.${currency}-percentage`).classList.add('red');
  } else {
    document.querySelector(`.${currency}-percentage`).classList.add('green');
  }
};

export const formatDate = function () {
  const config = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    weekDay: 'long',
  };

  return new Intl.DateTimeFormat('en-In', config).format(new Date());
};
