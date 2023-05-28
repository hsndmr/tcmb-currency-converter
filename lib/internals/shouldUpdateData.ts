import { CurrencyResponse } from './parseCurrencies';

interface ShouldUpdateDataOptions {
  data: CurrencyResponse | undefined;
  lastUpdatedDataDate: Date;
  dataUpdateIntervalInMinutes: number;
}

export const shouldUpdateData = ({
  data,
  lastUpdatedDataDate,
  dataUpdateIntervalInMinutes,
}: ShouldUpdateDataOptions) => {
  if (!data) {
    return true;
  }

  const currentDate = new Date();
  const minutesDiffForData: number = Math.floor(
    (currentDate.getTime() - lastUpdatedDataDate.getTime()) / (1000 * 60),
  );

  return minutesDiffForData >= dataUpdateIntervalInMinutes;
};
