import { Country, TaxData, SpendingData } from '../types';

// API Configuration
const API_CONFIG = {
  OECD_BASE_URL: 'https://stats.oecd.org/api/v1',
  WORLD_BANK_BASE_URL: 'https://api.worldbank.org/v2',
  IMF_BASE_URL: 'https://www.imf.org/external/datamapper/api/v1',
  TIMEOUT: 10000, // 10 seconds
};

// OECD API endpoints
const OECD_ENDPOINTS = {
  COUNTRIES: '/countries',
  REVENUE_STATISTICS: '/revenue-statistics',
  GOVERNMENT_SPENDING: '/government-spending',
  GDP: '/gdp',
  POPULATION: '/population',
};

// World Bank API endpoints
const WORLD_BANK_ENDPOINTS = {
  COUNTRIES: '/countries',
  GDP: '/indicators/NY.GDP.MKTP.CD',
  POPULATION: '/indicators/SP.POP.TOTL',
  TAX_REVENUE: '/indicators/GC.REV.XGRT.GD.ZS',
  GOVERNMENT_SPENDING: '/indicators/GC.XPN.TOTL.GD.ZS',
};

interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// OECD API response interfaces
interface OECDTaxItem {
  countryCode: string;
  year: string;
  totalTaxRevenue: string;
  taxRevenueAsGDP: string;
  personalIncomeTax: string;
  corporateTax: string;
  vatSalesTax: string;
  socialSecurity: string;
  otherTaxes: string;
}

interface OECDSpendingItem {
  countryCode: string;
  year: string;
  totalSpending: string;
  spendingAsGDP: string;
  health: string;
  education: string;
  defense: string;
  socialProtection: string;
  generalPublicServices: string;
  economicAffairs: string;
  environmentalProtection: string;
  housing: string;
  recreation: string;
  publicOrder: string;
}

interface OECDCountryItem {
  code: string;
  name: string;
  population: string;
  gdp: string;
  currency?: string;
}

// World Bank API response interfaces
interface WorldBankDataItem {
  value: string | null;
  date: string;
  [key: string]: unknown;
}

interface WorldBankResponse {
  [index: number]: WorldBankDataItem[];
  length?: number; // Add length property for array-like behavior
}

// IMF API response interface
interface IMFResponse {
  value: string;
  [key: string]: unknown;
}

// Generic API fetch function with error handling
async function fetchApi<T>(url: string, options: { signal?: AbortSignal; headers?: Record<string, string> } = {}): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    console.error(`API Error (${url}):`, error);
    return { 
      data: null as T, 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// OECD API Functions
export const fetchOECDTaxData = async (): Promise<TaxData[]> => {
  const url = `${API_CONFIG.OECD_BASE_URL}${OECD_ENDPOINTS.REVENUE_STATISTICS}`;
  const response = await fetchApi<OECDTaxItem[]>(url);
  
  if (!response.success) {
    throw new Error(`Failed to fetch OECD tax data: ${response.error}`);
  }

  return response.data.map((item: OECDTaxItem) => ({
    countryCode: item.countryCode,
    year: parseInt(item.year),
    totalTaxRevenue: parseFloat(item.totalTaxRevenue) || 0,
    taxRevenueAsGDP: parseFloat(item.taxRevenueAsGDP) || 0,
    personalIncomeTax: parseFloat(item.personalIncomeTax) || 0,
    corporateTax: parseFloat(item.corporateTax) || 0,
    vatSalesTax: parseFloat(item.vatSalesTax) || 0,
    socialSecurity: parseFloat(item.socialSecurity) || 0,
    otherTaxes: parseFloat(item.otherTaxes) || 0,
  }));
};

export const fetchOECDSpendingData = async (): Promise<SpendingData[]> => {
  const url = `${API_CONFIG.OECD_BASE_URL}${OECD_ENDPOINTS.GOVERNMENT_SPENDING}`;
  const response = await fetchApi<OECDSpendingItem[]>(url);
  
  if (!response.success) {
    throw new Error(`Failed to fetch OECD spending data: ${response.error}`);
  }

  return response.data.map((item: OECDSpendingItem) => ({
    countryCode: item.countryCode,
    year: parseInt(item.year),
    totalSpending: parseFloat(item.totalSpending) || 0,
    spendingAsGDP: parseFloat(item.spendingAsGDP) || 0,
    health: parseFloat(item.health) || 0,
    education: parseFloat(item.education) || 0,
    defense: parseFloat(item.defense) || 0,
    socialProtection: parseFloat(item.socialProtection) || 0,
    generalPublicServices: parseFloat(item.generalPublicServices) || 0,
    economicAffairs: parseFloat(item.economicAffairs) || 0,
    environmentalProtection: parseFloat(item.environmentalProtection) || 0,
    housing: parseFloat(item.housing) || 0,
    recreation: parseFloat(item.recreation) || 0,
    publicOrder: parseFloat(item.publicOrder) || 0,
  }));
};

export const fetchOECDCountries = async (): Promise<Country[]> => {
  const url = `${API_CONFIG.OECD_BASE_URL}${OECD_ENDPOINTS.COUNTRIES}`;
  const response = await fetchApi<OECDCountryItem[]>(url);
  
  if (!response.success) {
    throw new Error(`Failed to fetch OECD countries: ${response.error}`);
  }

  return response.data.map((item: OECDCountryItem) => ({
    code: item.code,
    name: item.name,
    population: parseInt(item.population) || 0,
    gdp: parseFloat(item.gdp) || 0,
    currency: item.currency || 'USD',
  }));
};

// World Bank API Functions
export const fetchWorldBankGDP = async (countryCode: string, year: number): Promise<number> => {
  const url = `${API_CONFIG.WORLD_BANK_BASE_URL}${WORLD_BANK_ENDPOINTS.GDP}/${countryCode}?format=json&date=${year}`;
  const response = await fetchApi<WorldBankResponse>(url);
  
  if (!response.success || !response.data || response.data.length === 0) {
    return 0;
  }

  const gdpData = response.data[1]?.find((item: WorldBankDataItem) => item.value !== null);
  return gdpData && gdpData.value ? parseFloat(gdpData.value) : 0;
};

export const fetchWorldBankPopulation = async (countryCode: string, year: number): Promise<number> => {
  const url = `${API_CONFIG.WORLD_BANK_BASE_URL}${WORLD_BANK_ENDPOINTS.POPULATION}/${countryCode}?format=json&date=${year}`;
  const response = await fetchApi<WorldBankResponse>(url);
  
  if (!response.success || !response.data || response.data.length === 0) {
    return 0;
  }

  const populationData = response.data[1]?.find((item: WorldBankDataItem) => item.value !== null);
  return populationData && populationData.value ? parseInt(populationData.value) : 0;
};

// IMF API Functions
export const fetchIMFTaxRevenue = async (countryCode: string, year: number): Promise<number> => {
  const url = `${API_CONFIG.IMF_BASE_URL}/weo/NGDP_RPCH/${countryCode}?year=${year}`;
  const response = await fetchApi<IMFResponse>(url);
  
  if (!response.success || !response.data) {
    return 0;
  }

  return parseFloat(response.data.value) || 0;
};

// Combined API Functions
export const fetchRealCountries = async (): Promise<Country[]> => {
  try {
    // Try OECD first, fallback to World Bank
    const oecdCountries = await fetchOECDCountries();
    if (oecdCountries.length > 0) {
      return oecdCountries;
    }

    // Fallback: Create countries from World Bank data
    const majorCountries = ['USA', 'GBR', 'DEU', 'FRA', 'JPN', 'CAN', 'AUS', 'ITA', 'ESP', 'KOR'];
    const countries: Country[] = [];

    for (const code of majorCountries) {
      const population = await fetchWorldBankPopulation(code, 2022);
      const gdp = await fetchWorldBankGDP(code, 2022);
      
      if (population > 0 && gdp > 0) {
        countries.push({
          code,
          name: getCountryName(code),
          population,
          gdp,
          currency: getCountryCurrency(code),
        });
      }
    }

    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const fetchRealTaxData = async (): Promise<TaxData[]> => {
  try {
    const oecdTaxData = await fetchOECDTaxData();
    if (oecdTaxData.length > 0) {
      return oecdTaxData;
    }

    // Fallback: Create tax data from World Bank and IMF
    const countries = await fetchRealCountries();
    const taxData: TaxData[] = [];

    for (const country of countries) {
      const taxRevenue = await fetchIMFTaxRevenue(country.code, 2022);
      
      if (taxRevenue > 0) {
        taxData.push({
          countryCode: country.code,
          year: 2022,
          totalTaxRevenue: taxRevenue,
          taxRevenueAsGDP: (taxRevenue / country.gdp) * 100,
          personalIncomeTax: taxRevenue * 0.4, // Estimate
          corporateTax: taxRevenue * 0.2, // Estimate
          vatSalesTax: taxRevenue * 0.25, // Estimate
          socialSecurity: taxRevenue * 0.1, // Estimate
          otherTaxes: taxRevenue * 0.05, // Estimate
        });
      }
    }

    return taxData;
  } catch (error) {
    console.error('Error fetching tax data:', error);
    throw error;
  }
};

export const fetchRealSpendingData = async (): Promise<SpendingData[]> => {
  try {
    const oecdSpendingData = await fetchOECDSpendingData();
    if (oecdSpendingData.length > 0) {
      return oecdSpendingData;
    }

    // Fallback: Create spending data from World Bank
    const countries = await fetchRealCountries();
    const spendingData: SpendingData[] = [];

    for (const country of countries) {
      const governmentSpending = await fetchWorldBankGDP(country.code, 2022) * 0.3; // Estimate 30% of GDP
      
      if (governmentSpending > 0) {
        spendingData.push({
          countryCode: country.code,
          year: 2022,
          totalSpending: governmentSpending,
          spendingAsGDP: 30, // Estimate
          health: 7, // Estimate
          education: 5, // Estimate
          defense: 2, // Estimate
          socialProtection: 8, // Estimate
          generalPublicServices: 2, // Estimate
          economicAffairs: 2, // Estimate
          environmentalProtection: 1, // Estimate
          housing: 1, // Estimate
          recreation: 1, // Estimate
          publicOrder: 1, // Estimate
        });
      }
    }

    return spendingData;
  } catch (error) {
    console.error('Error fetching spending data:', error);
    throw error;
  }
};

// Helper functions
function getCountryName(code: string): string {
  const countryNames: Record<string, string> = {
    USA: 'United States',
    GBR: 'United Kingdom',
    DEU: 'Germany',
    FRA: 'France',
    JPN: 'Japan',
    CAN: 'Canada',
    AUS: 'Australia',
    ITA: 'Italy',
    ESP: 'Spain',
    KOR: 'South Korea',
  };
  return countryNames[code] || code;
}

function getCountryCurrency(code: string): string {
  const currencies: Record<string, string> = {
    USA: 'USD',
    GBR: 'GBP',
    DEU: 'EUR',
    FRA: 'EUR',
    JPN: 'JPY',
    CAN: 'CAD',
    AUS: 'AUD',
    ITA: 'EUR',
    ESP: 'EUR',
    KOR: 'KRW',
  };
  return currencies[code] || 'USD';
} 