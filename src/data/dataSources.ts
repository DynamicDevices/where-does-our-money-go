export interface DataSource {
  name: string;
  url: string;
  description: string;
  lastUpdated: string;
  license?: string;
}

export interface DataAttribution {
  category: string;
  sources: DataSource[];
  notes: string;
}

export const DATA_SOURCES: Record<string, DataAttribution> = {
  population: {
    category: 'Population Data',
    sources: [
      {
        name: 'World Bank - Population Data',
        url: 'https://data.worldbank.org/indicator/SP.POP.TOTL',
        description: 'Total population data for all countries',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      },
      {
        name: 'United Nations - World Population Prospects',
        url: 'https://population.un.org/wpp/',
        description: 'Comprehensive population estimates and projections',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'Population figures are mid-year estimates for 2023'
  },
  
  gdp: {
    category: 'GDP Data',
    sources: [
      {
        name: 'World Bank - GDP Data',
        url: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.CD',
        description: 'GDP in current US dollars',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      },
      {
        name: 'International Monetary Fund - World Economic Outlook',
        url: 'https://www.imf.org/en/Publications/WEO',
        description: 'Comprehensive economic data and forecasts',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'GDP figures are in millions of US dollars for 2023'
  },
  
  taxRevenue: {
    category: 'Tax Revenue Data',
    sources: [
      {
        name: 'OECD - Revenue Statistics',
        url: 'https://stats.oecd.org/index.aspx?DataSetCode=REV',
        description: 'Comprehensive tax revenue data for OECD countries',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      },
      {
        name: 'International Monetary Fund - Government Finance Statistics',
        url: 'https://data.imf.org/?sk=89418059-d5c0-4330-8c41-dbc0d065073f',
        description: 'Government revenue and expenditure data',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      },
      {
        name: 'World Bank - Government Revenue',
        url: 'https://data.worldbank.org/indicator/GC.REV.XGRT.GD.ZS',
        description: 'Tax revenue as percentage of GDP',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'Tax revenue data represents total government revenue as percentage of GDP. Data includes personal income tax, corporate tax, VAT/sales tax, and social security contributions.'
  },
  
  governmentSpending: {
    category: 'Government Spending Data',
    sources: [
      {
        name: 'OECD - Government at a Glance',
        url: 'https://www.oecd.org/gov/government-at-a-glance/',
        description: 'Comprehensive government spending data by category',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      },
      {
        name: 'International Monetary Fund - Government Finance Statistics',
        url: 'https://data.imf.org/?sk=89418059-d5c0-4330-8c41-dbc0d065073f',
        description: 'Government expenditure by function',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      },
      {
        name: 'World Bank - Government Expenditure',
        url: 'https://data.worldbank.org/indicator/GC.XPN.TOTL.GD.ZS',
        description: 'Government expenditure as percentage of GDP',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'Spending data is categorized by function: health, education, defense, social protection, and other government services. All figures are as percentage of GDP.'
  },
  
  historicalData: {
    category: 'Historical Data',
    sources: [
      {
        name: 'OECD - Historical Data',
        url: 'https://stats.oecd.org/',
        description: 'Historical tax and spending data from 2020-2023',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      },
      {
        name: 'World Bank - Historical Development Indicators',
        url: 'https://data.worldbank.org/data-catalog/world-development-indicators',
        description: 'Historical economic and social indicators',
        lastUpdated: '2023',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'Historical data covers the period 2020-2023, showing trends in tax revenue and government spending over time.'
  }
};

export const DISCLAIMER = {
  title: 'Data Disclaimer',
  content: [
    'This application uses data from multiple international sources including the OECD, World Bank, IMF, and United Nations.',
    'All data is publicly available and properly attributed to original sources.',
    'Figures are estimates and may vary from official government statistics.',
    'Data is updated annually and may not reflect the most recent changes.',
    'For official government statistics, please refer to individual country sources.',
    'This tool is for educational and informational purposes only.'
  ]
};

export const getDataSourcesForCategory = (category: string): DataAttribution | null => {
  return DATA_SOURCES[category] || null;
};

export const getAllDataSources = (): DataAttribution[] => {
  return Object.values(DATA_SOURCES);
}; 