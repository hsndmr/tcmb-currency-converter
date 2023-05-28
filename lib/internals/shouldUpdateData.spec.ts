import { shouldUpdateData } from './shouldUpdateData';

describe('shouldUpdateData', () => {
  it('should return true if data is undefined', () => {
    // Arrange
    const options = {
      data: undefined,
      lastUpdatedDataDate: new Date(),
      dataUpdateIntervalInMinutes: 60,
    };

    // Act
    const result = shouldUpdateData(options);

    // Assert
    expect(result).toBe(true);
  });

  it('should return true if the time difference exceeds the data update interval', () => {
    // Arrange
    const options = {
      data: {
        date: new Date(),
        currencies: [],
      },
      lastUpdatedDataDate: new Date('2023-05-28T12:00:00Z'),
      dataUpdateIntervalInMinutes: 10,
    };

    const currentDate = new Date();
    const minutesToAdd = 11;
    const addedDate = new Date(
      currentDate.getTime() + minutesToAdd * 1000 * 60,
    );
    jest.spyOn(global, 'Date').mockImplementation(() => addedDate);

    // Act
    const result = shouldUpdateData(options);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false if the time difference does not exceed the data update interval', () => {
    // Assert
    const options = {
      data: {
        date: new Date(),
        currencies: [],
      },
      lastUpdatedDataDate: new Date(),
      dataUpdateIntervalInMinutes: 10,
    };
    const currentDate = new Date();
    const minutesToAdd = 10;
    const addedDate = new Date(
      currentDate.getTime() + minutesToAdd * 1000 * 60,
    );
    jest.spyOn(global, 'Date').mockImplementation(() => addedDate);

    // Act
    const result = shouldUpdateData(options);

    // Assert
    expect(result).toBe(false);
  });
});
