export interface Country {
  code: string;
  name: string;
  population: number;
  gdp: number;
  currency: string;
}

export interface TaxData {
  countryCode: string;
  year: number;
  totalTaxRevenue: number;
  taxRevenueAsGDP: number;
  personalIncomeTax: number;
  corporateTax: number;
  vatSalesTax: number;
  socialSecurity: number;
  otherTaxes: number;
}

export interface SpendingData {
  countryCode: string;
  year: number;
  totalSpending: number;
  spendingAsGDP: number;
  health: number;
  education: number;
  defense: number;
  socialProtection: number;
  generalPublicServices: number;
  economicAffairs: number;
  environmentalProtection: number;
  housing: number;
  recreation: number;
  publicOrder: number;
}

export interface HistoricalData {
  countryCode: string;
  year: number;
  taxData: TaxData;
  spendingData: SpendingData;
}

export interface ComparisonData {
  countries: Country[];
  taxData: TaxData[];
  spendingData: SpendingData[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface TooltipData {
  title: string;
  description: string;
  examples?: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

export interface FilterOptions {
  countries: string[];
  years: number[];
  categories: string[];
} 