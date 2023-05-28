import * as xml2js from 'xml2js';
import {
  createCurrencyItem,
  createCurrencyTRYItem,
  Currency,
} from './createCurrencyItem';

export interface CurrencyResponse {
  date: Date;
  currencies: Currency[];
}

export function parseCurrencies(xml: string): Promise<CurrencyResponse> {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        return reject(err);
      }

      const currencies = result['Tarih_Date']['Currency'].map(
        (currency: Record<string, any>) => {
          return createCurrencyItem(currency);
        },
      );

      return resolve({
        date: new Date(result['Tarih_Date']['$']['Date']),
        currencies: [...currencies, createCurrencyTRYItem()],
      });
    });
  });
}
