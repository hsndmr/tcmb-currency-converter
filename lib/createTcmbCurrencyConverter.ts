import { fetchCurrencies } from './internals/fetchCurrencies';
import { CurrencyResponse, parseCurrencies } from './internals/parseCurrencies';
import { shouldUpdateData } from './internals/shouldUpdateData';
import { convertPrice } from './internals/convertPrice';

const DEFAULT_DATA_UPDATE_INTERVAL_IN_MINUTES = 10;

interface Options {
  dataUpdateIntervalInMinutes?: number;
}

interface ConvertOptions {
  from: string;
  to: string;
  amount: number;
}

interface ConvertResult {
  forexSelling: number;
  forexBuying: number;
  banknoteSelling?: number;
  banknoteBuying?: number;
}

export default function createTcmbCurrencyConverter(options?: Options) {
  const { dataUpdateIntervalInMinutes } = options || {};
  let data: CurrencyResponse | undefined = undefined;
  let lastUpdatedDataDate: Date = new Date();

  const updateData = async () => {
    if (
      shouldUpdateData({
        data,
        lastUpdatedDataDate,
        dataUpdateIntervalInMinutes:
          dataUpdateIntervalInMinutes ||
          DEFAULT_DATA_UPDATE_INTERVAL_IN_MINUTES,
      })
    ) {
      const currencies = await fetchCurrencies();
      data = await parseCurrencies(currencies);
      lastUpdatedDataDate = new Date();
    }
  };

  const convert = async ({
    from,
    to,
    amount,
  }: ConvertOptions): Promise<ConvertResult> => {
    await updateData();

    const fromCurrency = data?.currencies.find(
      currency => currency.code === from,
    );

    if (!fromCurrency) {
      throw new Error(`Currency code ${from} is not found!`);
    }

    const toCurrency = data?.currencies.find(currency => currency.code === to);

    if (!toCurrency) {
      throw new Error(`Currency code ${to} is not found!`);
    }

    return {
      forexSelling: convertPrice({
        fromPrice: fromCurrency.forexSelling,
        toPrice: toCurrency.forexSelling,
        amount,
      })!,
      forexBuying: convertPrice({
        fromPrice: fromCurrency.forexBuying,
        toPrice: toCurrency.forexBuying,
        amount,
      })!,
      banknoteSelling: convertPrice({
        fromPrice: fromCurrency.banknoteSelling,
        toPrice: toCurrency.banknoteSelling,
        amount,
      }),
      banknoteBuying: convertPrice({
        fromPrice: fromCurrency.banknoteBuying,
        toPrice: toCurrency.banknoteBuying,
        amount,
      }),
    };
  };

  const getData = async () => {
    await updateData();
    return data;
  };

  return {
    convert,
    getData,
  };
}
