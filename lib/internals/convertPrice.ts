interface options {
  fromPrice?: number;
  toPrice?: number;
  amount: number;
}

export function convertPrice({
  fromPrice,
  toPrice,
  amount,
}: options): number | undefined {
  if (!fromPrice && !toPrice) {
    return undefined;
  }

  return parseFloat(((amount * fromPrice!) / toPrice!).toFixed(4));
}
