import axios from 'axios';
import { fetchCurrencies } from './fetchCurrencies';

jest.mock('axios');

describe('fetchCurrencies', () => {
  it('should fetch currency data successfully', async () => {
    // Arrange
    const responseData = '<xml>...</xml>';
    (axios.get as jest.Mock).mockResolvedValue({
      data: responseData,
    });

    // Act
    const data = await fetchCurrencies();

    // Assert
    expect(data).toBe(responseData);
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.tcmb.gov.tr/kurlar/today.xml',
    );
  });

  it('should handle fetch error and reject the promise', async () => {
    // Arrange
    const error = new Error('Network error');
    (axios.get as jest.Mock).mockRejectedValue(error);

    // Act
    await expect(fetchCurrencies()).rejects.toThrow('Network error');

    // Assert
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.tcmb.gov.tr/kurlar/today.xml',
    );
  });
});
