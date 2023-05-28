export type CurrencyCode =
  | 'TRY'
  | 'USD'
  | 'AUD'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'CHF'
  | 'SEK'
  | 'CAD'
  | 'KWD'
  | 'NOK'
  | 'SAR'
  | 'JPY'
  | 'BGN'
  | 'RON'
  | 'RUB'
  | 'IRR'
  | 'CNY'
  | 'PKR'
  | 'QAR'
  | 'KRW'
  | 'AZN'
  | 'AED'
  | 'XDR';

export interface Currency {
  code: CurrencyCode;
  unit: number;
  name: string;
  currencyName: string;
  forexBuying: number;
  forexSelling: number;
  banknoteBuying?: number;
  banknoteSelling?: number;
  crossRateUSD?: number;
  crossRateOther?: number;
}

export function createCurrencyItem(currency: Record<string, any>): Currency {
  const code = currency.$.CurrencyCode.trim();
  const unit = Number(currency.Unit[0]);
  const name = currency.Isim[0].trim();
  const currencyName = currency.CurrencyName[0].trim();
  const forexBuying = Number(currency.ForexBuying[0]) / unit;
  const forexSelling = Number(currency.ForexSelling[0]) / unit;
  const banknoteBuying = currency.BanknoteBuying[0]
    ? Number(currency.BanknoteBuying[0]) / unit
    : undefined;
  const banknoteSelling = currency.BanknoteSelling[0]
    ? Number(currency.BanknoteSelling[0]) / unit
    : undefined;
  const crossRateUSD = currency.CrossRateUSD[0]
    ? Number(currency.CrossRateUSD[0])
    : undefined;
  const crossRateOther = currency.CrossRateOther[0]
    ? Number(currency.CrossRateOther[0])
    : undefined;

  return {
    code,
    unit,
    name,
    currencyName,
    forexBuying,
    forexSelling,
    banknoteBuying,
    banknoteSelling,
    crossRateUSD,
    crossRateOther,
  };
}

export function createCurrencyTRYItem(): Currency {
  return {
    code: 'TRY',
    unit: 1,
    name: 'Türk Lirası',
    currencyName: 'TRY',
    forexBuying: 1,
    forexSelling: 1,
    banknoteBuying: 1,
    banknoteSelling: 1,
  };
}
