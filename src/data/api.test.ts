import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCountries, fetchTaxData, fetchSpendingData, fetchHistoricalData } from './api';

// Mock the apiService module
vi.mock('../services/apiService', () => ({
  fetchRealCountries: vi.fn(),
  fetchRealTaxData: vi.fn(),
  fetchRealSpendingData: vi.fn(),
}));

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCountries', () => {
    it('should fetch countries successfully', async () => {
      const mockCountries = [
        { code: 'USA', name: 'United States', population: 331002651, gdp: 21433200, currency: 'USD' },
        { code: 'GBR', name: 'United Kingdom', population: 67215293, gdp: 3070667, currency: 'GBP' },
      ];

      const { fetchRealCountries } = await import('../services/apiService');
      vi.mocked(fetchRealCountries).mockResolvedValue(mockCountries);

      const result = await fetchCountries();

      expect(result).toEqual(mockCountries);
      expect(fetchRealCountries).toHaveBeenCalledTimes(1);
    });

    it('should handle CORS errors gracefully', async () => {
      const { fetchRealCountries } = await import('../services/apiService');
      vi.mocked(fetchRealCountries).mockRejectedValue(new Error('Failed to fetch'));

      await expect(fetchCountries()).rejects.toThrow(
        'Unable to fetch country data due to browser security restrictions'
      );
    });
  });

  describe('fetchTaxData', () => {
    it('should fetch tax data successfully', async () => {
      const mockTaxData = [
        {
          countryCode: 'USA',
          year: 2022,
          totalTaxRevenue: 4560000,
          taxRevenueAsGDP: 21.3,
          personalIncomeTax: 8.1,
          corporateTax: 1.0,
          vatSalesTax: 0.0,
          socialSecurity: 6.2,
          otherTaxes: 6.0,
        },
      ];

      const { fetchRealTaxData } = await import('../services/apiService');
      vi.mocked(fetchRealTaxData).mockResolvedValue(mockTaxData);

      const result = await fetchTaxData();

      expect(result).toEqual(mockTaxData);
      expect(fetchRealTaxData).toHaveBeenCalledTimes(1);
    });

    it('should handle CORS errors gracefully', async () => {
      const { fetchRealTaxData } = await import('../services/apiService');
      vi.mocked(fetchRealTaxData).mockRejectedValue(new Error('Failed to fetch'));

      await expect(fetchTaxData()).rejects.toThrow(
        'Unable to fetch tax data due to browser security restrictions'
      );
    });
  });

  describe('fetchSpendingData', () => {
    it('should fetch spending data successfully', async () => {
      const mockSpendingData = [
        {
          countryCode: 'USA',
          year: 2022,
          totalSpending: 6500000,
          spendingAsGDP: 30.3,
          health: 18.3,
          education: 5.4,
          defense: 3.1,
          socialProtection: 7.8,
          generalPublicServices: 1.2,
          economicAffairs: 1.8,
          environmentalProtection: 0.3,
          housing: 0.8,
          recreation: 0.4,
          publicOrder: 0.8,
        },
      ];

      const { fetchRealSpendingData } = await import('../services/apiService');
      vi.mocked(fetchRealSpendingData).mockResolvedValue(mockSpendingData);

      const result = await fetchSpendingData();

      expect(result).toEqual(mockSpendingData);
      expect(fetchRealSpendingData).toHaveBeenCalledTimes(1);
    });

    it('should handle CORS errors gracefully', async () => {
      const { fetchRealSpendingData } = await import('../services/apiService');
      vi.mocked(fetchRealSpendingData).mockRejectedValue(new Error('Failed to fetch'));

      await expect(fetchSpendingData()).rejects.toThrow(
        'Unable to fetch spending data due to browser security restrictions'
      );
    });
  });

  describe('fetchHistoricalData', () => {
    it('should fetch and combine historical data successfully', async () => {
      const mockTaxData = [
        {
          countryCode: 'USA',
          year: 2022,
          totalTaxRevenue: 4560000,
          taxRevenueAsGDP: 21.3,
          personalIncomeTax: 8.1,
          corporateTax: 1.0,
          vatSalesTax: 0.0,
          socialSecurity: 6.2,
          otherTaxes: 6.0,
        },
      ];

      const mockSpendingData = [
        {
          countryCode: 'USA',
          year: 2022,
          totalSpending: 6500000,
          spendingAsGDP: 30.3,
          health: 18.3,
          education: 5.4,
          defense: 3.1,
          socialProtection: 7.8,
          generalPublicServices: 1.2,
          economicAffairs: 1.8,
          environmentalProtection: 0.3,
          housing: 0.8,
          recreation: 0.4,
          publicOrder: 0.8,
        },
      ];

      const { fetchRealTaxData, fetchRealSpendingData } = await import('../services/apiService');
      vi.mocked(fetchRealTaxData).mockResolvedValue(mockTaxData);
      vi.mocked(fetchRealSpendingData).mockResolvedValue(mockSpendingData);

      const result = await fetchHistoricalData();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('countryCode', 'USA');
      expect(result[0]).toHaveProperty('year', 2022);
      expect(result[0]).toHaveProperty('taxData');
      expect(result[0]).toHaveProperty('spendingData');
      expect(result[0].taxData).toEqual(mockTaxData[0]);
      expect(result[0].spendingData).toEqual(mockSpendingData[0]);
    });

    it('should handle errors from tax data fetch', async () => {
      const { fetchRealTaxData, fetchRealSpendingData } = await import('../services/apiService');
      vi.mocked(fetchRealTaxData).mockRejectedValue(new Error('Tax data failed'));
      vi.mocked(fetchRealSpendingData).mockResolvedValue([]);

      await expect(fetchHistoricalData()).rejects.toThrow(
        'Unable to fetch historical data due to browser security restrictions'
      );
    });

    it('should handle errors from spending data fetch', async () => {
      const { fetchRealTaxData, fetchRealSpendingData } = await import('../services/apiService');
      vi.mocked(fetchRealTaxData).mockResolvedValue([]);
      vi.mocked(fetchRealSpendingData).mockRejectedValue(new Error('Spending data failed'));

      await expect(fetchHistoricalData()).rejects.toThrow(
        'Unable to fetch historical data due to browser security restrictions'
      );
    });
  });
}); 