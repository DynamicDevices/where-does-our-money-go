import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DollarSign, Shield } from 'lucide-react';
import { formatPercentage } from '../data/api';
import DataAttribution from '../components/DataAttribution';
import { TaxData, SpendingData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CountryComparisonPage: React.FC = () => {
  const { countries, taxData, spendingData, selectedCountries, setSelectedCountries, loading } = useData();
  const [activeTab, setActiveTab] = useState<'tax' | 'spending'>('tax');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const filteredTaxData = taxData.filter(data => 
    selectedCountries.includes(data.countryCode) && data.year === 2022
  );
  const filteredSpendingData = spendingData.filter(data => 
    selectedCountries.includes(data.countryCode) && data.year === 2022
  );

  const getCountryName = (code: string) => {
    return countries.find(c => c.code === code)?.name || code;
  };

  // Group countries by region
  const groupedCountries = {
    'North America': countries.filter(c => ['USA', 'CAN', 'MEX'].includes(c.code)),
    'Europe': countries.filter(c => ['GBR', 'DEU', 'FRA', 'ITA', 'ESP', 'NLD', 'SWE', 'NOR', 'DNK', 'CHE', 'AUT', 'BEL', 'POL'].includes(c.code)),
    'Asia-Pacific': countries.filter(c => ['JPN', 'AUS', 'KOR', 'SGP', 'NZL', 'CHN', 'IND'].includes(c.code)),
    'Other Regions': countries.filter(c => ['BRA', 'RUS', 'TUR', 'ZAF'].includes(c.code)),
  };

  const createTaxChartData = () => ({
    labels: filteredTaxData.map(data => getCountryName(data.countryCode)),
    datasets: [
      {
        label: 'Personal Income Tax',
        data: filteredTaxData.map(data => data.personalIncomeTax),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Corporate Tax',
        data: filteredTaxData.map(data => data.corporateTax),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
      {
        label: 'VAT/Sales Tax',
        data: filteredTaxData.map(data => data.vatSalesTax),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
      },
      {
        label: 'Social Security',
        data: filteredTaxData.map(data => data.socialSecurity),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  });

  const createSpendingChartData = () => ({
    labels: filteredSpendingData.map(data => getCountryName(data.countryCode)),
    datasets: [
      {
        label: 'Health',
        data: filteredSpendingData.map(data => data.health),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
      {
        label: 'Education',
        data: filteredSpendingData.map(data => data.education),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Defense',
        data: filteredSpendingData.map(data => data.defense),
        backgroundColor: 'rgba(107, 114, 128, 0.8)',
        borderColor: 'rgba(107, 114, 128, 1)',
        borderWidth: 1,
      },
      {
        label: 'Social Protection',
        data: filteredSpendingData.map(data => data.socialProtection),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  });

  const getChartOptions = () => {
    if (chartType === 'pie') {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: activeTab === 'tax' ? 'Tax Revenue by Category (%)' : 'Government Spending by Category (%)',
          },
          tooltip: {
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label: (context: any) => {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        }
      };
    }

    // Calculate appropriate y-axis range for better visualization
    const data = activeTab === 'tax' ? filteredTaxData : filteredSpendingData;
    const allValues: number[] = [];
    
    if (activeTab === 'tax') {
      (data as TaxData[]).forEach((item) => {
        allValues.push(
          item.personalIncomeTax,
          item.corporateTax,
          item.vatSalesTax,
          item.socialSecurity,
          item.otherTaxes
        );
      });
    } else {
      (data as SpendingData[]).forEach((item) => {
        allValues.push(
          item.health,
          item.education,
          item.defense,
          item.socialProtection
        );
      });
    }

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const range = maxValue - minValue;
    const padding = range * 0.1; // 10% padding

    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: activeTab === 'tax' ? 'Tax Revenue by Category (%)' : 'Government Spending by Category (%)',
        },
        tooltip: {
          callbacks: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            label: (context: any) => {
              return `${context.dataset.label}: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: Math.max(0, minValue - padding),
          max: maxValue + padding,
          title: {
            display: true,
            text: 'Percentage of GDP',
          },
        },
      }
    };
  };

  const renderChart = () => {
    const options = getChartOptions();
    
    if (chartType === 'pie') {
      // For pie charts, we need to restructure the data
      const pieData = activeTab === 'tax' ? 
        createPieChartData(filteredTaxData, 'tax') : 
        createPieChartData(filteredSpendingData, 'spending');
      
      return <Pie data={pieData} options={options} />;
    }
    
    const data = activeTab === 'tax' ? createTaxChartData() : createSpendingChartData();
    
    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      default:
        return <Bar data={data} options={options} />;
    }
  };

  const createPieChartData = (data: TaxData[] | SpendingData[], type: 'tax' | 'spending') => {
    if (data.length === 0) return { labels: [], datasets: [] };
    
    // For pie charts, we'll show the first country's data as segments
    const firstCountryData = data[0];
    
    if (type === 'tax') {
      const taxData = firstCountryData as TaxData;
      const labels = ['Personal Income Tax', 'Corporate Tax', 'VAT/Sales Tax', 'Social Security', 'Other Taxes'];
      const values = [
        taxData.personalIncomeTax,
        taxData.corporateTax,
        taxData.vatSalesTax,
        taxData.socialSecurity,
        taxData.otherTaxes
      ];
      const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ];
      
      return {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.8', '1')),
          borderWidth: 2,
        }]
      };
    } else {
      const spendingData = firstCountryData as SpendingData;
      const labels = ['Health', 'Education', 'Defense', 'Social Protection'];
      const values = [
        spendingData.health,
        spendingData.education,
        spendingData.defense,
        spendingData.socialProtection
      ];
      const colors = [
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(107, 114, 128, 0.8)',
        'rgba(16, 185, 129, 0.8)'
      ];
      
      return {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.8', '1')),
          borderWidth: 2,
        }]
      };
    }
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
            Compare Countries
          </h1>
          <p className="text-secondary-600">
            Compare taxation and government spending across different countries. 
            Select countries and explore the data through interactive charts.
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Country Selection */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Select Countries
              </label>
              <div className="space-y-4">
                {Object.entries(groupedCountries).map(([region, countries]) => (
                  <div key={region} className="border border-secondary-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 text-secondary-900">{region}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {countries.map((country) => (
                        <label key={country.code} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedCountries.includes(country.code)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCountries([...selectedCountries, country.code]);
                              } else {
                                setSelectedCountries(selectedCountries.filter(c => c !== country.code));
                              }
                            }}
                            className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-secondary-700">{country.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart Type Selection */}
            <div className="lg:w-48">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Chart Type
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as 'bar' | 'line' | 'pie')}
                className="select"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </select>
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
                Tax Revenue
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
                Government Spending
              </button>
            </nav>
          </div>
        </div>

        {/* Chart */}
        <div className="card">
          <div className="chart-container">
            {renderChart()}
          </div>

        </div>

        {/* Data Table */}
        <div className="card mt-8">
          <h3 className="text-lg font-semibold mb-4">
            {activeTab === 'tax' ? 'Tax Revenue Data' : 'Government Spending Data'}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-200">
              <thead className="bg-secondary-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                    Country
                  </th>
                  {activeTab === 'tax' ? (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Total Tax Revenue (% of GDP)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Personal Income Tax
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Corporate Tax
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        VAT/Sales Tax
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Social Security
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Total Spending (% of GDP)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Health
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Education
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Defense
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Social Protection
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-secondary-200">
                {activeTab === 'tax' ? (
                  filteredTaxData.map((data) => (
                    <tr key={data.countryCode}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                        {getCountryName(data.countryCode)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.taxRevenueAsGDP)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.personalIncomeTax)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.corporateTax)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.vatSalesTax)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.socialSecurity)}
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredSpendingData.map((data) => (
                    <tr key={data.countryCode}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                        {getCountryName(data.countryCode)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.spendingAsGDP)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.health)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.education)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.defense)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                        {formatPercentage(data.socialProtection)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DataAttribution 
          categories={activeTab === 'tax' ? ['taxRevenue'] : ['governmentSpending']}
          showDisclaimer={true}
        />
      </div>
    </div>
  );
};

export default CountryComparisonPage; 