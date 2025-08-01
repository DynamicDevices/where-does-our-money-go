import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { Line } from 'react-chartjs-2';
import { DollarSign, Shield } from 'lucide-react';
import { formatPercentage } from '../data/api';

const HistoricalDataPage: React.FC = () => {
  const { historicalData, selectedCountries, setSelectedCountries, loading } = useData();
  const [activeTab, setActiveTab] = useState<'tax' | 'spending'>('tax');
  const [selectedYears, setSelectedYears] = useState<number[]>([2020, 2021, 2022]);

  const filteredData = historicalData.filter(data => 
    selectedCountries.includes(data.countryCode) && selectedYears.includes(data.year)
  );

  const years = Array.from(new Set(historicalData.map(d => d.year))).sort();
  const countries = Array.from(new Set(historicalData.map(d => d.countryCode)));

  const getCountryName = (code: string) => {
    const countryNames: Record<string, string> = {
      'USA': 'United States',
      'GBR': 'United Kingdom',
      'DEU': 'Germany',
      'FRA': 'France',
      'JPN': 'Japan',
    };
    return countryNames[code] || code;
  };

  const createChartData = () => {
    const labels = selectedYears.sort();
    const datasets = selectedCountries.map((countryCode, index) => {
      const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ];
      
      const data = labels.map(year => {
        const yearData = filteredData.find(d => d.countryCode === countryCode && d.year === year);
        if (activeTab === 'tax') {
          return yearData?.taxData.taxRevenueAsGDP || 0;
        } else {
          return yearData?.spendingData.spendingAsGDP || 0;
        }
      });

      return {
        label: getCountryName(countryCode),
        data,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      };
    });

    return { labels, datasets };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: activeTab === 'tax' 
          ? 'Tax Revenue as % of GDP Over Time' 
          : 'Government Spending as % of GDP Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage of GDP',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Historical Trends
          </h1>
          <p className="text-secondary-600">
            Track how taxation and government spending have changed over time. 
            Explore trends and patterns across different countries and years.
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Select Countries
              </label>
              <div className="grid grid-cols-2 gap-2">
                {countries.map((countryCode) => (
                  <label key={countryCode} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(countryCode)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCountries([...selectedCountries, countryCode]);
                        } else {
                          setSelectedCountries(selectedCountries.filter(c => c !== countryCode));
                        }
                      }}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{getCountryName(countryCode)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Year Selection */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Select Years
              </label>
              <div className="grid grid-cols-3 gap-2">
                {years.map((year) => (
                  <label key={year} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedYears.includes(year)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedYears([...selectedYears, year]);
                        } else {
                          setSelectedYears(selectedYears.filter(y => y !== year));
                        }
                      }}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{year}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-secondary-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('tax')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tax'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <DollarSign className="w-4 h-4 inline mr-2" />
                Tax Revenue Trends
              </button>
              <button
                onClick={() => setActiveTab('spending')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'spending'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Spending Trends
              </button>
            </nav>
          </div>
        </div>

        {/* Chart */}
        <div className="card">
          <div className="chart-container">
            <Line data={createChartData()} options={chartOptions} />
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {selectedCountries.map((countryCode) => {
            const countryData = filteredData.filter(d => d.countryCode === countryCode);
            const latestData = countryData[countryData.length - 1];
            const earliestData = countryData[0];
            
            if (!latestData || !earliestData) return null;

            const currentValue = activeTab === 'tax' 
              ? latestData.taxData.taxRevenueAsGDP 
              : latestData.spendingData.spendingAsGDP;
            const previousValue = activeTab === 'tax' 
              ? earliestData.taxData.taxRevenueAsGDP 
              : earliestData.spendingData.spendingAsGDP;
            const change = currentValue - previousValue;

            return (
              <div key={countryCode} className="card">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {getCountryName(countryCode)}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Current ({latestData.year}):</span>
                    <span className="font-medium">{formatPercentage(currentValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Previous ({earliestData.year}):</span>
                    <span className="font-medium">{formatPercentage(previousValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Change:</span>
                    <span className={`font-medium ${change >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                      {change >= 0 ? '+' : ''}{formatPercentage(change)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data Table */}
        <div className="card mt-8">
          <h3 className="text-lg font-semibold mb-4">
            {activeTab === 'tax' ? 'Tax Revenue Historical Data' : 'Government Spending Historical Data'}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    {activeTab === 'tax' ? 'Tax Revenue (% of GDP)' : 'Spending (% of GDP)'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Change from Previous Year
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {filteredData
                  .sort((a, b) => a.countryCode.localeCompare(b.countryCode) || a.year - b.year)
                  .map((data) => {
                    const currentValue = activeTab === 'tax' 
                      ? data.taxData.taxRevenueAsGDP 
                      : data.spendingData.spendingAsGDP;
                    
                    const previousData = filteredData.find(d => 
                      d.countryCode === data.countryCode && d.year === data.year - 1
                    );
                    const previousValue = previousData 
                      ? (activeTab === 'tax' 
                          ? previousData.taxData.taxRevenueAsGDP 
                          : previousData.spendingData.spendingAsGDP)
                      : 0;
                    const change = currentValue - previousValue;

                    return (
                      <tr key={`${data.countryCode}-${data.year}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                          {getCountryName(data.countryCode)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {data.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {formatPercentage(currentValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={change >= 0 ? 'text-success-600' : 'text-danger-600'}>
                            {change >= 0 ? '+' : ''}{formatPercentage(change)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalDataPage; 