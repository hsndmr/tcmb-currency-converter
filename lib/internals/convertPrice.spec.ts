import { convertPrice } from './convertPrice';

describe('convertPrice', () => {
  it('should return undefined if both fromPrice and toPrice are not provided', () => {
    // Arrange
    const options = {
      amount: 10,
    };

    // Act
    const result = convertPrice(options);

    // Assert
    expect(result).toBeUndefined();
  });

  it('should convert the price correctly when fromPrice and toPrice are provided', () => {
    // Arrange
    const options = {
      fromPrice: 2,
      toPrice: 3,
      amount: 10,
    };

    // Act
    const result = convertPrice(options);

    // Assert
    expect(result).toBe(6.6667);
  });
});
