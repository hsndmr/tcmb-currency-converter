# TCMB Kur Çeviri
Türkiye Cumhuriyet Merkez Bankası (TCMB) tarafından sağlanan günlük döviz kurları üzerinden istenilen kur bilgisini sunar ve ayrıca çapraz kur dönüşümü gerçekleştirir. Bu paket https://github.com/tkaratug/tcmb_currency_converter paketinden esinlenerek oluşturulmuştur.  


## Kurulum
```bash
npm install tcmb-currency-converter
```

## Kullanım
```typescript
import { createTcmbCurrencyConverter } from 'tcmb-currency-converter';

const tcmbCurrencyConverter = createTcmbCurrencyConverter({
  dataUpdateIntervalInMinutes: 10, // varsayılan değer 10 dakikadır. 10 dakika boyunca aynı veri döndürülür.
});
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

// Tüm döviz kurlarını getirir.
tcmbCurrencyConverter.getData().then(data => {
  console.log(data?.currencies);
  console.log(data?.date);
});
```
