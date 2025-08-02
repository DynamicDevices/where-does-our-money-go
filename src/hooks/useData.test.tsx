import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataProvider } from '../context/DataContext';
import { useData } from './useData';

// Mock the API functions
vi.mock('../data/api', () => ({
  fetchCountries: vi.fn(() => Promise.resolve([])),
  fetchTaxData: vi.fn(() => Promise.resolve([])),
  fetchSpendingData: vi.fn(() => Promise.resolve([])),
  fetchHistoricalData: vi.fn(() => Promise.resolve([])),
}));

describe('useData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw error when used outside of DataProvider', () => {
    expect(() => {
      renderHook(() => useData());
    }).toThrow('useData must be used within a DataProvider');
  });

  it('should return context when used within DataProvider', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DataProvider>{children}</DataProvider>
    );

    const { result } = renderHook(() => useData(), { wrapper });

    // Wait for initial data loading to complete
    await act(async () => {
      // Wait a bit for the async operations to complete
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current).toBeDefined();
    expect(result.current.countries).toEqual([]);
    expect(result.current.taxData).toEqual([]);
    expect(result.current.spendingData).toEqual([]);
    expect(result.current.historicalData).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.selectedCountries).toEqual(['USA', 'GBR', 'DEU']);
    expect(result.current.selectedYears).toEqual([2022, 2021, 2020]);
    expect(typeof result.current.setSelectedCountries).toBe('function');
    expect(typeof result.current.setSelectedYears).toBe('function');
    expect(typeof result.current.refreshData).toBe('function');
  });

  it('should update selected countries', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DataProvider>{children}</DataProvider>
    );

    const { result } = renderHook(() => useData(), { wrapper });

    // Wait for initial data loading to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    act(() => {
      result.current.setSelectedCountries(['USA', 'CAN']);
    });

    expect(result.current.selectedCountries).toEqual(['USA', 'CAN']);
  });

  it('should update selected years', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DataProvider>{children}</DataProvider>
    );

    const { result } = renderHook(() => useData(), { wrapper });

    // Wait for initial data loading to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    act(() => {
      result.current.setSelectedYears([2023, 2022]);
    });

    expect(result.current.selectedYears).toEqual([2023, 2022]);
  });
}); 