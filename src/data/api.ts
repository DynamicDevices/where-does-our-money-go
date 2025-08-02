import { Country, TaxData, SpendingData, HistoricalData } from '../types';
import { 
  fetchRealCountries, 
  fetchRealTaxData, 
  fetchRealSpendingData 
} from '../services/apiService';
import { mockCountries, mockTaxData, mockSpendingData, mockHistoricalData } from './mockData';

// Real API functions using actual data sources with fallback to mock data
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    console.log('Fetching real country data from OECD/World Bank...');
    const countries = await fetchRealCountries();
    console.log(`Successfully fetched ${countries.length} countries`);
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    console.log('Falling back to mock data...');
    return mockCountries;
  }
};

export const fetchTaxData = async (): Promise<TaxData[]> => {
  try {
    console.log('Fetching real tax data from OECD/IMF...');
    const taxData = await fetchRealTaxData();
    console.log(`Successfully fetched tax data for ${taxData.length} countries`);
    return taxData;
  } catch (error) {
    console.error('Error fetching tax data:', error);
    console.log('Falling back to mock data...');
    return mockTaxData;
  }
};

export const fetchSpendingData = async (): Promise<SpendingData[]> => {
  try {
    console.log('Fetching real spending data from OECD/World Bank...');
    const spendingData = await fetchRealSpendingData();
    console.log(`Successfully fetched spending data for ${spendingData.length} countries`);
    return spendingData;
  } catch (error) {
    console.error('Error fetching spending data:', error);
    console.log('Falling back to mock data...');
    return mockSpendingData;
  }
};

export const fetchHistoricalData = async (): Promise<HistoricalData[]> => {
  try {
    console.log('Fetching real historical data from multiple sources...');
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
    console.log('Falling back to mock data...');
    return mockHistoricalData;
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