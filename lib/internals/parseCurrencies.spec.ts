import { parseCurrencies } from './parseCurrencies';

jest.mock('xml2js', () => ({
  parseString: jest.fn((xml, callback) => {
    if (xml === '<xml>...</xml>') {
      const result = {
        Tarih_Date: {
          $: { Date: '2023-05-28' },
          Currency: [
            {
              $: { CurrencyCode: 'USD' },
              Unit: ['1'],
              Isim: ['US Dollar'],
              CurrencyName: ['USD'],
              ForexBuying: ['8.50'],
              ForexSelling: ['8.60'],
              BanknoteBuying: ['8.40'],
              BanknoteSelling: ['8.70'],
              CrossRateUSD: ['1.0'],
              CrossRateOther: ['0.90'],
            },
          ],
        },
      };
      callback(null, result);
    } else {
      callback(new Error('XML parsing error'));
    }
  }),
}));

describe('parseCurrencies', () => {
  it('should parse the XML and return a CurrencyResponse object', async () => {
    // Arrange
    const xml = '<xml>...</xml>';

    // Act
    const currencyResponse = await parseCurrencies(xml);

    // Assert
    expect(currencyResponse.date).toBeInstanceOf(Date);
    expect(currencyResponse.currencies).toHaveLength(2);
    expect(currencyResponse.currencies[0].code).toBe('USD');
  });

  it('should handle XML parsing error and reject the promise', async () => {
    // Arrange
    const xml = '<invalid-xml>...</invalid-xml>';

    // Act & Assert
    await expect(parseCurrencies(xml)).rejects.toThrow();
  });
});
