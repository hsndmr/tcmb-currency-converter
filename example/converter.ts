import { createTcmbCurrencyConverter } from 'tcmb-currency-converter';

const tcmbCurrencyConverter = createTcmbCurrencyConverter();
{
}
// 1 USD'nin TL karşılığı olan değerleri getirir.
tcmbCurrencyConverter
  .convert({
    from: 'USD',
    to: 'TRY',
    amount: 1,
  })
  .then(result => {
    console.log(result.forexBuying);
    console.log(result.forexSelling);
    console.log(result.banknoteBuying);
    console.log(result.banknoteSelling);
  });

// 1 TL'nin USD karşılığı olan değerleri getirir.
tcmbCurrencyConverter
  .convert({
    from: 'TRY',
    to: 'USD',
    amount: 1,
  })
  .then(result => {
    console.log(result.forexBuying);
    console.log(result.forexSelling);
    console.log(result.banknoteBuying);
    console.log(result.banknoteSelling);
  });

// Tüm döviz kurlarını getirir.
tcmbCurrencyConverter.getData().then(data => {
  console.log(data?.currencies);
  console.log(data?.date);
});
