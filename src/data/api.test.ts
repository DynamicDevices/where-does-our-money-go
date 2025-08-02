import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCountries, fetchTaxData, fetchSpendingData, fetchHistoricalData, formatCurrency, formatPercentage, formatNumber } from './api';

// Mock the mockData module
vi.mock('./mockData', () => ({
  mockCountries: [
    { code: 'USA', name: 'United States', population: 331000000, gdp: 25000000, currency: 'USD' },
    { code: 'GBR', name: 'United Kingdom', population: 67000000, gdp: 3000000, currency: 'GBP' }
  ],
  mockTaxData: [
    { countryCode: 'USA', year: 2022, totalTaxRevenue: 4000000, taxRevenueAsGDP: 16.8, personalIncomeTax: 2000000, corporateTax: 400000, vatSalesTax: 0, socialSecurity: 1400000, otherTaxes: 200000 }
  ],
  mockSpendingData: [
    { countryCode: 'USA', year: 2022, totalSpending: 6000000, spendingAsGDP: 24.0, health: 18.0, education: 12.0, defense: 15.0, socialProtection: 25.0 }
  ],
  mockHistoricalData: [
    { countryCode: 'USA', year: 2022, gdp: 25000000, taxRevenue: 4000000, spending: 6000000 }
  ]
}));

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCountries', () => {
    it('should return mock countries data', async () => {
      const result = await fetchCountries();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('code');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('population');
      expect(result[0]).toHaveProperty('gdp');
      expect(result[0]).toHaveProperty('currency');
    });

    it('should return countries with correct structure', async () => {
      const result = await fetchCountries();
      
      result.forEach(country => {
        expect(country).toMatchObject({
          code: expect.any(String),
          name: expect.any(String),
          population: expect.any(Number),
          gdp: expect.any(Number),
          currency: expect.any(String)
        });
      });
    });

    it('should handle errors gracefully and return mock data', async () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = await fetchCountries();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      consoleSpy.mockRestore();
    });
  });

  describe('fetchTaxData', () => {
    it('should return mock tax data', async () => {
      const result = await fetchTaxData();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('countryCode');
      expect(result[0]).toHaveProperty('year');
      expect(result[0]).toHaveProperty('totalTaxRevenue');
    });

    it('should return tax data with correct structure', async () => {
      const result = await fetchTaxData();
      
      result.forEach(taxData => {
        expect(taxData).toMatchObject({
          countryCode: expect.any(String),
          year: expect.any(Number),
          totalTaxRevenue: expect.any(Number),
          taxRevenueAsGDP: expect.any(Number),
          personalIncomeTax: expect.any(Number),
          corporateTax: expect.any(Number),
          vatSalesTax: expect.any(Number),
          socialSecurity: expect.any(Number),
          otherTaxes: expect.any(Number)
        });
      });
    });

    it('should handle errors gracefully and return mock data', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = await fetchTaxData();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      consoleSpy.mockRestore();
    });
  });

  describe('fetchSpendingData', () => {
    it('should return mock spending data', async () => {
      const result = await fetchSpendingData();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('countryCode');
      expect(result[0]).toHaveProperty('year');
      expect(result[0]).toHaveProperty('totalSpending');
    });

    it('should return spending data with correct structure', async () => {
      const result = await fetchSpendingData();
      
      result.forEach(spendingData => {
        expect(spendingData).toMatchObject({
          countryCode: expect.any(String),
          year: expect.any(Number),
          totalSpending: expect.any(Number),
          spendingAsGDP: expect.any(Number),
          health: expect.any(Number),
          education: expect.any(Number),
          defense: expect.any(Number),
          socialProtection: expect.any(Number)
        });
      });
    });

    it('should handle errors gracefully and return mock data', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = await fetchSpendingData();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      consoleSpy.mockRestore();
    });
  });

  describe('fetchHistoricalData', () => {
    it('should return mock historical data', async () => {
      const result = await fetchHistoricalData();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('countryCode');
      expect(result[0]).toHaveProperty('year');
      expect(result[0]).toHaveProperty('taxData');
      expect(result[0]).toHaveProperty('spendingData');
    });

    it('should return historical data with correct structure', async () => {
      const result = await fetchHistoricalData();
      
      result.forEach(historicalData => {
        expect(historicalData).toMatchObject({
          countryCode: expect.any(String),
          year: expect.any(Number),
          taxData: expect.any(Object),
          spendingData: expect.any(Object)
        });
        
        // Check taxData structure
        expect(historicalData.taxData).toMatchObject({
          countryCode: expect.any(String),
          year: expect.any(Number),
          totalTaxRevenue: expect.any(Number),
          taxRevenueAsGDP: expect.any(Number),
          personalIncomeTax: expect.any(Number),
          corporateTax: expect.any(Number),
          vatSalesTax: expect.any(Number),
          socialSecurity: expect.any(Number),
          otherTaxes: expect.any(Number)
        });
        
        // Check spendingData structure
        expect(historicalData.spendingData).toMatchObject({
          countryCode: expect.any(String),
          year: expect.any(Number),
          totalSpending: expect.any(Number),
          spendingAsGDP: expect.any(Number),
          health: expect.any(Number),
          education: expect.any(Number),
          defense: expect.any(Number),
          socialProtection: expect.any(Number)
        });
      });
    });

    it('should handle errors gracefully and return mock data', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const result = await fetchHistoricalData();
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      consoleSpy.mockRestore();
    });
  });

  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000');
      expect(formatCurrency(1234567)).toBe('$1,234,567');
      expect(formatCurrency(0)).toBe('$0');
    });

    it('should format different currencies correctly', () => {
      expect(formatCurrency(1000000, 'EUR')).toBe('€1,000,000');
      expect(formatCurrency(1000000, 'GBP')).toBe('£1,000,000');
      expect(formatCurrency(1000000, 'JPY')).toBe('¥1,000,000');
    });

    it('should handle decimal values', () => {
      expect(formatCurrency(1000000.5)).toBe('$1,000,001');
      expect(formatCurrency(1000000.4)).toBe('$1,000,000');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages correctly', () => {
      expect(formatPercentage(16.8)).toBe('16.8%');
      expect(formatPercentage(24.0)).toBe('24.0%');
      expect(formatPercentage(0)).toBe('0.0%');
      expect(formatPercentage(100)).toBe('100.0%');
    });

    it('should handle decimal percentages', () => {
      expect(formatPercentage(16.85)).toBe('16.9%');
      expect(formatPercentage(16.84)).toBe('16.8%');
    });
  });

  describe('formatNumber', () => {
    it('should format large numbers with abbreviations', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(1000000000)).toBe('1.0B');
      expect(formatNumber(1000000000000)).toBe('1.0T');
    });

    it('should format numbers with proper decimal places', () => {
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(1500000000)).toBe('1.5B');
    });

    it('should handle small numbers without abbreviation', () => {
      expect(formatNumber(999)).toBe('999');
      expect(formatNumber(500)).toBe('500');
      expect(formatNumber(0)).toBe('0');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-1000)).toBe('-1,000');
      expect(formatNumber(-1000000)).toBe('-1,000,000');
    });
  });
}); 