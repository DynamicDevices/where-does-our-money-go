import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  fetchRealCountries, 
  fetchRealTaxData, 
  fetchRealSpendingData,
  fetchOECDTaxData,
  fetchOECDSpendingData,
  fetchOECDCountries
} from './apiService';

// Mock fetch globally
global.fetch = vi.fn();

describe('API Service Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchOECDCountries', () => {
    it('should fetch OECD countries successfully', async () => {
      const mockResponse = {
        data: [
          { code: 'USA', name: 'United States', population: '331002651', gdp: '21433200' },
          { code: 'GBR', name: 'United Kingdom', population: '67215293', gdp: '3070667' }
        ]
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await fetchOECDCountries();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('code', 'USA');
      expect(result[0]).toHaveProperty('name', 'United States');
      expect(fetch).toHaveBeenCalledWith(
        'https://stats.oecd.org/api/v1/countries',
        expect.any(Object)
      );
    });

    it('should handle API errors gracefully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      } as Response);

      await expect(fetchOECDCountries()).rejects.toThrow('Failed to fetch OECD countries');
    });

    it('should handle network errors gracefully', async () => {
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchOECDCountries()).rejects.toThrow('Failed to fetch OECD countries');
    });
  });

  describe('fetchOECDTaxData', () => {
    it('should fetch OECD tax data successfully', async () => {
      const mockResponse = {
        data: [
          {
            countryCode: 'USA',
            year: '2022',
            totalTaxRevenue: '4560000',
            taxRevenueAsGDP: '21.3',
            personalIncomeTax: '8.1',
            corporateTax: '1.0',
            vatSalesTax: '0.0',
            socialSecurity: '6.2',
            otherTaxes: '6.0'
          }
        ]
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await fetchOECDTaxData();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('countryCode', 'USA');
      expect(result[0]).toHaveProperty('year', 2022);
      expect(result[0]).toHaveProperty('totalTaxRevenue', 4560000);
      expect(fetch).toHaveBeenCalledWith(
        'https://stats.oecd.org/api/v1/revenue-statistics',
        expect.any(Object)
      );
    });

    it('should handle API errors gracefully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden'
      } as Response);

      await expect(fetchOECDTaxData()).rejects.toThrow('Failed to fetch OECD tax data');
    });
  });

  describe('fetchOECDSpendingData', () => {
    it('should fetch OECD spending data successfully', async () => {
      const mockResponse = {
        data: [
          {
            countryCode: 'USA',
            year: '2022',
            totalSpending: '6500000',
            spendingAsGDP: '30.3',
            health: '18.3',
            education: '5.4',
            defense: '3.1',
            socialProtection: '7.8',
            generalPublicServices: '1.2',
            economicAffairs: '1.8',
            environmentalProtection: '0.3',
            housing: '0.8',
            recreation: '0.4',
            publicOrder: '0.8'
          }
        ]
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await fetchOECDSpendingData();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('countryCode', 'USA');
      expect(result[0]).toHaveProperty('year', 2022);
      expect(result[0]).toHaveProperty('totalSpending', 6500000);
      expect(fetch).toHaveBeenCalledWith(
        'https://stats.oecd.org/api/v1/government-spending',
        expect.any(Object)
      );
    });

    it('should handle API errors gracefully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden'
      } as Response);

      await expect(fetchOECDSpendingData()).rejects.toThrow('Failed to fetch OECD spending data');
    });
  });

  describe('fetchRealCountries', () => {
    it('should fetch countries from OECD successfully', async () => {
      const mockResponse = {
        data: [
          { code: 'USA', name: 'United States', population: '331002651', gdp: '21433200' },
          { code: 'GBR', name: 'United Kingdom', population: '67215293', gdp: '3070667' }
        ]
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await fetchRealCountries();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('code', 'USA');
      expect(result[0]).toHaveProperty('name', 'United States');
    });

    it('should handle OECD API failures gracefully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden'
      } as Response);

      await expect(fetchRealCountries()).rejects.toThrow('Failed to fetch OECD countries');
    });
  });

  describe('fetchRealTaxData', () => {
    it('should fetch tax data from OECD successfully', async () => {
      const mockResponse = {
        data: [
          {
            countryCode: 'USA',
            year: '2022',
            totalTaxRevenue: '4560000',
            taxRevenueAsGDP: '21.3',
            personalIncomeTax: '8.1',
            corporateTax: '1.0',
            vatSalesTax: '0.0',
            socialSecurity: '6.2',
            otherTaxes: '6.0'
          }
        ]
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await fetchRealTaxData();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('countryCode', 'USA');
      expect(result[0]).toHaveProperty('year', 2022);
    });

    it('should handle OECD API failures gracefully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden'
      } as Response);

      await expect(fetchRealTaxData()).rejects.toThrow('Failed to fetch OECD tax data');
    });
  });

  describe('fetchRealSpendingData', () => {
    it('should fetch spending data from OECD successfully', async () => {
      const mockResponse = {
        data: [
          {
            countryCode: 'USA',
            year: '2022',
            totalSpending: '6500000',
            spendingAsGDP: '30.3',
            health: '18.3',
            education: '5.4',
            defense: '3.1',
            socialProtection: '7.8',
            generalPublicServices: '1.2',
            economicAffairs: '1.8',
            environmentalProtection: '0.3',
            housing: '0.8',
            recreation: '0.4',
            publicOrder: '0.8'
          }
        ]
      };

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await fetchRealSpendingData();

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('countryCode', 'USA');
      expect(result[0]).toHaveProperty('year', 2022);
    });

    it('should handle OECD API failures gracefully', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden'
      } as Response);

      await expect(fetchRealSpendingData()).rejects.toThrow('Failed to fetch OECD spending data');
    });
  });
}); 