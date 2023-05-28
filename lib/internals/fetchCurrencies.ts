import axios from 'axios';

export async function fetchCurrencies() {
  const response = await axios.get('https://www.tcmb.gov.tr/kurlar/today.xml');
  return response.data;
}
