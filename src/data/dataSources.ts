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
        name: 'World Bank API - Population Data',
        url: 'https://api.worldbank.org/v2/indicators/SP.POP.TOTL',
        description: 'Real-time population data from World Bank API',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      },
      {
        name: 'OECD API - Population Statistics',
        url: 'https://stats.oecd.org/api/v1/population',
        description: 'Population data from OECD member countries',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'Population figures are real-time data from World Bank and OECD APIs'
  },
  
  gdp: {
    category: 'GDP Data',
    sources: [
      {
        name: 'World Bank API - GDP Data',
        url: 'https://api.worldbank.org/v2/indicators/NY.GDP.MKTP.CD',
        description: 'Real-time GDP data in current US dollars',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      },
      {
        name: 'OECD API - Economic Data',
        url: 'https://stats.oecd.org/api/v1/gdp',
        description: 'GDP data from OECD member countries',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'GDP figures are real-time data from World Bank and OECD APIs'
  },
  
  taxRevenue: {
    category: 'Tax Revenue Data',
    sources: [
      {
        name: 'OECD API - Revenue Statistics',
        url: 'https://stats.oecd.org/api/v1/revenue-statistics',
        description: 'Real-time tax revenue data for OECD countries',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      },
      {
        name: 'IMF API - Government Finance Statistics',
        url: 'https://www.imf.org/external/datamapper/api/v1/weo/NGDP_RPCH',
        description: 'Real-time government revenue and expenditure data',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      },
      {
        name: 'World Bank API - Government Revenue',
        url: 'https://api.worldbank.org/v2/indicators/GC.REV.XGRT.GD.ZS',
        description: 'Real-time tax revenue as percentage of GDP',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'Tax revenue data is fetched in real-time from OECD, IMF, and World Bank APIs. Data includes personal income tax, corporate tax, VAT/sales tax, and social security contributions.'
  },
  
  governmentSpending: {
    category: 'Government Spending Data',
    sources: [
      {
        name: 'OECD API - Government at a Glance',
        url: 'https://stats.oecd.org/api/v1/government-spending',
        description: 'Real-time government spending data by category',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      },
      {
        name: 'IMF API - Government Finance Statistics',
        url: 'https://www.imf.org/external/datamapper/api/v1/weo/NGDP_RPCH',
        description: 'Real-time government expenditure by function',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      },
      {
        name: 'World Bank API - Government Expenditure',
        url: 'https://api.worldbank.org/v2/indicators/GC.XPN.TOTL.GD.ZS',
        description: 'Real-time government expenditure as percentage of GDP',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'Spending data is fetched in real-time from OECD, IMF, and World Bank APIs. Data is categorized by function: health, education, defense, social protection, and other government services. All figures are as percentage of GDP.'
  },
  
  historicalData: {
    category: 'Historical Data',
    sources: [
      {
        name: 'OECD API - Historical Data',
        url: 'https://stats.oecd.org/api/v1',
        description: 'Real-time historical tax and spending data',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      },
      {
        name: 'World Bank API - Historical Development Indicators',
        url: 'https://api.worldbank.org/v2/indicators',
        description: 'Real-time historical economic and social indicators',
        lastUpdated: '2024',
        license: 'CC BY 4.0'
      }
    ],
    notes: 'Historical data is fetched in real-time from OECD and World Bank APIs, showing current trends in tax revenue and government spending.'
  }
};

export const DISCLAIMER = {
  title: 'Data Disclaimer',
  content: [
    'This application uses real-time data from multiple international sources including the OECD, World Bank, and IMF APIs.',
    'All data is fetched live from official APIs and properly attributed to original sources.',
    'Data is updated in real-time and reflects the most current available information.',
    'For official government statistics, please refer to individual country sources.',
    'This tool is for educational and informational purposes only.',
    'API data may have slight delays and should be cross-referenced with official sources for critical decisions.'
  ]
};

export const getDataSourcesForCategory = (category: string): DataAttribution | null => {
  return DATA_SOURCES[category] || null;
};

export const getAllDataSources = (): DataAttribution[] => {
  return Object.values(DATA_SOURCES);
}; 