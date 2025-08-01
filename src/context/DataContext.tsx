import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Country, TaxData, SpendingData, HistoricalData } from '../types';
import { fetchCountries, fetchTaxData, fetchSpendingData, fetchHistoricalData } from '../data/api';

interface DataContextType {
  countries: Country[];
  taxData: TaxData[];
  spendingData: SpendingData[];
  historicalData: HistoricalData[];
  loading: boolean;
  error: string | null;
  selectedCountries: string[];
  selectedYears: number[];
  setSelectedCountries: (countries: string[]) => void;
  setSelectedYears: (years: number[]) => void;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [taxData, setTaxData] = useState<TaxData[]>([]);
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['USA', 'GBR', 'DEU']);
  const [selectedYears, setSelectedYears] = useState<number[]>([2022, 2021, 2020]);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [countriesData, taxDataResult, spendingDataResult, historicalDataResult] = await Promise.all([
        fetchCountries(),
        fetchTaxData(),
        fetchSpendingData(),
        fetchHistoricalData(),
      ]);

      setCountries(countriesData);
      setTaxData(taxDataResult);
      setSpendingData(spendingDataResult);
      setHistoricalData(historicalDataResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const value: DataContextType = {
    countries,
    taxData,
    spendingData,
    historicalData,
    loading,
    error,
    selectedCountries,
    selectedYears,
    setSelectedCountries,
    setSelectedYears,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

 