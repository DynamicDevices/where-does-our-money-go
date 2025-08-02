import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataProvider } from './DataContext';

// Mock the API functions
vi.mock('../data/api', () => ({
  fetchCountries: vi.fn(),
  fetchTaxData: vi.fn(),
  fetchSpendingData: vi.fn(),
  fetchHistoricalData: vi.fn(),
}));

// Test component to access context
const TestComponent = () => {
  return <div data-testid="test-component">Test Component</div>;
};

describe('DataProvider', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Setup default mock responses
    const { fetchCountries, fetchTaxData, fetchSpendingData, fetchHistoricalData } = await import('../data/api');
    vi.mocked(fetchCountries).mockResolvedValue([]);
    vi.mocked(fetchTaxData).mockResolvedValue([]);
    vi.mocked(fetchSpendingData).mockResolvedValue([]);
    vi.mocked(fetchHistoricalData).mockResolvedValue([]);
  });

  it('should render children', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });

  it('should call API functions on mount', async () => {
    const { fetchCountries, fetchTaxData, fetchSpendingData, fetchHistoricalData } = await import('../data/api');
    
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    await waitFor(() => {
      expect(vi.mocked(fetchCountries)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(fetchTaxData)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(fetchSpendingData)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(fetchHistoricalData)).toHaveBeenCalledTimes(1);
    });
  });

  it('should handle API errors gracefully', async () => {
    const errorMessage = 'Failed to fetch data';
    const { fetchCountries } = await import('../data/api');
    vi.mocked(fetchCountries).mockRejectedValue(new Error(errorMessage));

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    await waitFor(() => {
      // The component should still render even with errors
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  it('should handle successful data loading', async () => {
    const mockCountries = [
      { code: 'USA', name: 'United States', population: 331000000, gdp: 25000000, currency: 'USD' }
    ];
    const mockTaxData = [
      { countryCode: 'USA', year: 2022, totalTaxRevenue: 4000000, taxRevenueAsGDP: 16.8, personalIncomeTax: 2000000, corporateTax: 400000, vatSalesTax: 0, socialSecurity: 1400000, otherTaxes: 200000 }
    ];

    const { fetchCountries, fetchTaxData } = await import('../data/api');
    vi.mocked(fetchCountries).mockResolvedValue(mockCountries);
    vi.mocked(fetchTaxData).mockResolvedValue(mockTaxData);

    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );

    await waitFor(() => {
      expect(vi.mocked(fetchCountries)).toHaveBeenCalled();
      expect(vi.mocked(fetchTaxData)).toHaveBeenCalled();
    });
  });
}); 