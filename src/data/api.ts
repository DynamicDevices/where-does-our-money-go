import { Country, TaxData, SpendingData, HistoricalData } from '../types';
import { mockCountries, mockTaxData, mockSpendingData, mockHistoricalData } from './mockData';

// API base URLs (for future use)
// const OECD_BASE_URL = 'https://stats.oecd.org/api/v1';
// const WORLD_BANK_BASE_URL = 'https://api.worldbank.org/v2';

// Real API functions (commented out for now, using mock data)
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    // In production, this would fetch from OECD API
    // const response = await fetch(`${OECD_BASE_URL}/countries`);
    // const data = await response.json();
    // return data.map((country: any) => ({
    //   code: country.code,
    //   name: country.name,
    //   population: country.population,
    //   gdp: country.gdp,
    //   currency: country.currency,
    // }));

    // Using mock data for development
    return mockCountries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return mockCountries; // Fallback to mock data
  }
};

export const fetchTaxData = async (): Promise<TaxData[]> => {
  try {
    // In production, this would fetch from OECD Revenue Statistics
    // const response = await fetch(`${OECD_BASE_URL}/revenue-statistics`);
    // const data = await response.json();
    // return data.map((item: any) => ({
    //   countryCode: item.countryCode,
    //   year: item.year,
    //   totalTaxRevenue: item.totalTaxRevenue,
    //   taxRevenueAsGDP: item.taxRevenueAsGDP,
    //   personalIncomeTax: item.personalIncomeTax,
    //   corporateTax: item.corporateTax,
    //   vatSalesTax: item.vatSalesTax,
    //   socialSecurity: item.socialSecurity,
    //   otherTaxes: item.otherTaxes,
    // }));

    // Using mock data for development
    return mockTaxData;
  } catch (error) {
    console.error('Error fetching tax data:', error);
    return mockTaxData; // Fallback to mock data
  }
};

export const fetchSpendingData = async (): Promise<SpendingData[]> => {
  try {
    // In production, this would fetch from OECD Government at a Glance
    // const response = await fetch(`${OECD_BASE_URL}/government-spending`);
    // const data = await response.json();
    // return data.map((item: any) => ({
    //   countryCode: item.countryCode,
    //   year: item.year,
    //   totalSpending: item.totalSpending,
    //   spendingAsGDP: item.spendingAsGDP,
    //   health: item.health,
    //   education: item.education,
    //   defense: item.defense,
    //   socialProtection: item.socialProtection,
    //   generalPublicServices: item.generalPublicServices,
    //   economicAffairs: item.economicAffairs,
    //   environmentalProtection: item.environmentalProtection,
    //   housing: item.housing,
    //   recreation: item.recreation,
    //   publicOrder: item.publicOrder,
    // }));

    // Using mock data for development
    return mockSpendingData;
  } catch (error) {
    console.error('Error fetching spending data:', error);
    return mockSpendingData; // Fallback to mock data
  }
};

export const fetchHistoricalData = async (): Promise<HistoricalData[]> => {
  try {
    // In production, this would fetch historical data from multiple sources
    // const [taxData, spendingData] = await Promise.all([
    //   fetchTaxData(),
    //   fetchSpendingData(),
    // ]);
    // 
    // return taxData.map(tax => {
    //   const spending = spendingData.find(s => s.countryCode === tax.countryCode && s.year === tax.year);
    //   return {
    //     countryCode: tax.countryCode,
    //     year: tax.year,
    //     taxData: tax,
    //     spendingData: spending!,
    //   };
    // });

    // Using mock data for development
    return mockHistoricalData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return mockHistoricalData; // Fallback to mock data
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