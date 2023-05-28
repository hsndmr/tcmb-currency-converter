import {
  createCurrencyItem,
  createCurrencyTRYItem,
} from './createCurrencyItem';

describe('createCurrencyItem', () => {
  it('should create a Currency object with the provided data', () => {
    // Arrange
    const currencyData = {
      $: {
        CurrencyCode: 'USD',
      },
      Unit: ['1'],
      Isim: ['US Dollar'],
      CurrencyName: ['USD'],
      ForexBuying: ['8.50'],
      ForexSelling: ['8.60'],
      BanknoteBuying: ['8.40'],
      BanknoteSelling: ['8.70'],
      CrossRateUSD: ['1.0'],
      CrossRateOther: ['0.90'],
    };

    // Act
    const currency = createCurrencyItem(currencyData);

    // Assert
    expect(currency.code).toBe('USD');
    expect(currency.unit).toBe(1);
    expect(currency.name).toBe('US Dollar');
    expect(currency.currencyName).toBe('USD');
    expect(currency.forexBuying).toBe(8.5);
    expect(currency.forexSelling).toBe(8.6);
    expect(currency.banknoteBuying).toBe(8.4);
    expect(currency.banknoteSelling).toBe(8.7);
    expect(currency.crossRateUSD).toBe(1.0);
    expect(currency.crossRateOther).toBe(0.9);
  });

  it('should handle undefined banknoteBuying and banknoteSelling values', () => {
    // Arrange
    const currencyData = {
      $: {
        CurrencyCode: 'EUR',
      },
      Unit: ['1'],
      Isim: ['Euro'],
      CurrencyName: ['EUR'],
      ForexBuying: ['9.20'],
      ForexSelling: ['9.30'],
      BanknoteBuying: [''],
      BanknoteSelling: [''],
      CrossRateUSD: ['1.15'],
      CrossRateOther: ['1.05'],
    };

    // Act
    const currency = createCurrencyItem(currencyData);

    // Assert
    expect(currency.banknoteBuying).toBeUndefined();
    expect(currency.banknoteSelling).toBeUndefined();
  });
});

describe('createCurrencyTRYItem', () => {
  it('should create a Currency object for Turkish Lira (TRY)', () => {
    // Arrange & Act
    const currency = createCurrencyTRYItem();

    // Assert
    expect(currency.code).toBe('TRY');
    expect(currency.unit).toBe(1);
    expect(currency.name).toBe('Türk Lirası');
    expect(currency.currencyName).toBe('TRY');
    expect(currency.forexBuying).toBe(1);
    expect(currency.forexSelling).toBe(1);
    expect(currency.banknoteBuying).toBe(1);
    expect(currency.banknoteSelling).toBe(1);
  });
});
