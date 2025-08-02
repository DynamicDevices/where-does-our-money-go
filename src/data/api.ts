import { Country, TaxData, SpendingData, HistoricalData } from '../types';
import { fetchRealCountries, fetchRealTaxData, fetchRealSpendingData } from '../services/apiService';

export const fetchCountries = async (): Promise<Country[]> => {
  console.log('Fetching real country data from OECD/World Bank...');
  try {
    const countries = await fetchRealCountries();
    console.log(`Successfully fetched ${countries.length} countries`);
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error(
      'Unable to fetch country data due to browser security restrictions. ' +
      'This is a common limitation when accessing external APIs from web browsers. ' +
      'Please visit the OECD website directly for the most current data: ' +
      'https://stats.oecd.org/'
    );
  }
};

export const fetchTaxData = async (): Promise<TaxData[]> => {
  console.log('Fetching real tax data from OECD...');
  try {
    const taxData = await fetchRealTaxData();
    console.log(`Successfully fetched ${taxData.length} tax data records`);
    return taxData;
  } catch (error) {
    console.error('Error fetching tax data:', error);
    throw new Error(
      'Unable to fetch tax data due to browser security restrictions. ' +
      'This is a common limitation when accessing external APIs from web browsers. ' +
      'Please visit the OECD Revenue Statistics directly: ' +
      'https://stats.oecd.org/index.aspx?DataSetCode=REV'
    );
  }
};

export const fetchSpendingData = async (): Promise<SpendingData[]> => {
  console.log('Fetching real spending data from OECD...');
  try {
    const spendingData = await fetchRealSpendingData();
    console.log(`Successfully fetched ${spendingData.length} spending data records`);
    return spendingData;
  } catch (error) {
    console.error('Error fetching spending data:', error);
    throw new Error(
      'Unable to fetch spending data due to browser security restrictions. ' +
      'This is a common limitation when accessing external APIs from web browsers. ' +
      'Please visit the OECD Government Spending directly: ' +
      'https://stats.oecd.org/index.aspx?DataSetCode=GOV'
    );
  }
};

export const fetchHistoricalData = async (): Promise<HistoricalData[]> => {
  console.log('Fetching real historical data from OECD/World Bank/IMF...');
  try {
    const [taxData, spendingData] = await Promise.all([
      fetchTaxData(),
      fetchSpendingData(),
    ]);
    
    const historicalData = taxData.map(tax => {
      const spending = spendingData.find(s => s.countryCode === tax.countryCode && s.year === tax.year);
      return {
        countryCode: tax.countryCode,
        year: tax.year,
        taxData: tax,
        spendingData: spending!,
      };
    });

    console.log(`Successfully created historical data for ${historicalData.length} countries`);
    return historicalData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw new Error(
      'Unable to fetch historical data due to browser security restrictions. ' +
      'This is a common limitation when accessing external APIs from web browsers. ' +
      'Please visit the OECD website directly for the most current data: ' +
      'https://stats.oecd.org/'
    );
  }
};

// Helper function to format currency
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format percentage
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

// Helper function to format large numbers
export const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(1)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  return value.toLocaleString();
}; 