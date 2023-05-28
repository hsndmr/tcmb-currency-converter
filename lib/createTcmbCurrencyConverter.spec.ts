import { fetchCurrencies } from './internals/fetchCurrencies';
import { parseCurrencies } from './internals/parseCurrencies';
import { shouldUpdateData } from './internals/shouldUpdateData';
import { createTcmbCurrencyConverter } from './createTcmbCurrencyConverter';

jest.mock('./internals/fetchCurrencies');
jest.mock('./internals/parseCurrencies');
jest.mock('./internals/shouldUpdateData');

describe('createTcmbCurrencyConverter', () => {
  const currencyResponse = {
    date: new Date(),
    currencies: [
      {
        code: 'USD',
        forexBuying: 1.0,
        forexSelling: 1.1,
        banknoteBuying: 1.2,
        banknoteSelling: 1.3,
      },
      {
        code: 'EUR',
        forexBuying: 0.9,
        forexSelling: 1.0,
        banknoteBuying: 1.1,
        banknoteSelling: 1.2,
      },
    ],
  };

  beforeEach(() => {
    (fetchCurrencies as jest.Mock).mockClear();
    (parseCurrencies as jest.Mock).mockClear();
    (shouldUpdateData as jest.Mock).mockClear();
  });

  it('should return a converter object with convert and getData methods', () => {
    // Arrange & Act
    const converter = createTcmbCurrencyConverter();

    // Assert
    expect(converter.convert).toBeInstanceOf(Function);
    expect(converter.getData).toBeInstanceOf(Function);
  });

  it('should update data and call convertPrice when converting', async () => {
    // Arrange
    const converter = createTcmbCurrencyConverter();

    (shouldUpdateData as jest.Mock).mockReturnValue(true);
    (parseCurrencies as jest.Mock).mockResolvedValue(currencyResponse);
    (fetchCurrencies as jest.Mock).mockResolvedValue('currencies');

    const convertOptions = {
      from: 'USD',
      to: 'EUR',
      amount: 100,
    };

    // Act
    const result = await converter.convert(convertOptions);

    // Assert
    expect(shouldUpdateData).toHaveBeenCalledWith({
      data: undefined,
      lastUpdatedDataDate: expect.any(Date),
      dataUpdateIntervalInMinutes: 10,
    });

    expect(fetchCurrencies).toHaveBeenCalled();
    expect(parseCurrencies).toHaveBeenCalledWith(expect.any(String));
    expect(result).toEqual({
      forexSelling: 110,
      forexBuying: 111.1111,
      banknoteSelling: 108.3333,
      banknoteBuying: 109.0909,
    });
  });

  it('should not update data when not required', async () => {
    const converter = createTcmbCurrencyConverter();

    const convertOptions = {
      from: 'USD',
      to: 'EUR',
      amount: 100,
    };

    (shouldUpdateData as jest.Mock).mockReturnValue(true);
    (parseCurrencies as jest.Mock).mockResolvedValue(currencyResponse);

    await converter.convert(convertOptions);
    (shouldUpdateData as jest.Mock).mockReturnValue(false);
    await converter.convert(convertOptions);

    expect(shouldUpdateData).toHaveBeenCalledTimes(2);
    expect(fetchCurrencies).toHaveBeenCalledTimes(1);
    expect(parseCurrencies).toHaveBeenCalledTimes(1);
  });

  it('should throw an error  when converting with an invalid currency code', async () => {
    const converter = createTcmbCurrencyConverter();

    (shouldUpdateData as jest.Mock).mockReturnValue(true);
    (parseCurrencies as jest.Mock).mockResolvedValue(currencyResponse);

    await expect(
      converter.convert({
        from: 'USD',
        to: 'XYZ',
        amount: 100,
      }),
    ).rejects.toThrowError('Currency code XYZ is not found!');

    await expect(
      converter.convert({
        from: 'ABC',
        to: 'USD',
        amount: 100,
      }),
    ).rejects.toThrowError('Currency code ABC is not found!');
  });

  it('should return the current data when calling getData', async () => {
    const converter = createTcmbCurrencyConverter();

    (shouldUpdateData as jest.Mock).mockReturnValue(true);
    (parseCurrencies as jest.Mock).mockResolvedValue(currencyResponse);

    const data = await converter.getData();

    expect(data).toEqual(currencyResponse);
  });
});
