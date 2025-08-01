import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Country, TaxData, SpendingData, HistoricalData } from '../types';

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

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}; 