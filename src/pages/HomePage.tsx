import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { Globe, BarChart3, TrendingUp, Users, DollarSign, Shield, BookOpen } from 'lucide-react';
import { formatNumber, formatPercentage } from '../data/api';
import DataAttribution from '../components/DataAttribution';

const HomePage: React.FC = () => {
  const { countries, taxData, spendingData, loading } = useData();
  const [showCountriesTooltip, setShowCountriesTooltip] = useState(false);

  const getLatestData = () => {
    const latestYear = Math.max(...taxData.map(t => t.year));
    const latestTaxData = taxData.filter(t => t.year === latestYear);
    const latestSpendingData = spendingData.filter(s => s.year === latestYear);
    
    return { latestYear, latestTaxData, latestSpendingData };
  };

  const { latestYear, latestTaxData } = getLatestData();

  const totalPopulation = countries.reduce((sum, country) => sum + country.population, 0);
  const avgTaxRate = latestTaxData.length > 0 
    ? latestTaxData.reduce((sum, data) => sum + data.taxRevenueAsGDP, 0) / latestTaxData.length 
    : 0;

  const features = [
    {
      icon: BarChart3,
      title: 'Compare Countries',
      description: 'See how different countries tax their citizens and spend public money.',
      href: '/compare',
      color: 'bg-primary-500',
    },
    {
      icon: TrendingUp,
      title: 'Historical Trends',
      description: 'Track how taxation and spending have changed over time.',
      href: '/historical',
      color: 'bg-success-500',
    },
    {
      icon: Users,
      title: 'Population Insights',
      description: 'Explore population and GDP data across different countries.',
      href: '/compare',
      color: 'bg-warning-500',
    },
    {
      icon: DollarSign,
      title: 'Tax Analysis',
      description: 'Detailed breakdowns of income, corporate, and sales taxes.',
      href: '/compare',
      color: 'bg-danger-500',
    },
  ];

  const spendingCategories = [
    { name: 'Health', icon: Shield, color: 'bg-red-500' },
    { name: 'Education', icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Defense', icon: Shield, color: 'bg-gray-500' },
    { name: 'Social Protection', icon: Users, color: 'bg-green-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Where Does Our Money Go?
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-primary-100">
              Explore how governments around the world spend your tax money. 
              Compare countries, track historical trends, and understand public finance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/compare"
                className="btn-primary text-lg px-8 py-3"
              >
                Explore Data
              </Link>
              <Link
                to="/about"
                className="btn-outline text-lg px-8 py-3 bg-white text-primary-600 hover:bg-primary-50"
              >
                About This Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div 
              className="text-center relative cursor-help"
              onMouseEnter={() => setShowCountriesTooltip(true)}
              onMouseLeave={() => setShowCountriesTooltip(false)}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                {countries.length}
              </h3>
              <p className="text-secondary-600">Countries Analyzed</p>
              
              {/* Tooltip */}
              {showCountriesTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-secondary-900 text-white text-sm rounded-lg shadow-lg z-50 max-w-xs">
                  <div className="text-center mb-2 font-semibold">Countries Included:</div>
                  <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
                    {countries.map((country, index) => (
                      <div key={country.code} className="text-primary-100">
                        {country.name}
                        {index < countries.length - 1 && ','}
                      </div>
                    ))}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-secondary-900"></div>
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                {formatNumber(totalPopulation)}
              </h3>
              <p className="text-secondary-600">Total Population</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                {formatPercentage(avgTaxRate)}
              </h3>
              <p className="text-secondary-600">Average Tax Rate</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-danger-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-danger-600" />
              </div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                {latestYear}
              </h3>
              <p className="text-secondary-600">Latest Data Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  to={feature.href}
                  className="card-hover group"
                >
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-secondary-900">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600">
                    {feature.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spending Categories Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Government Spending Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spendingCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="card text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    Healthcare, education, defense, and social programs that benefit citizens.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Data Attribution */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DataAttribution 
            categories={['population', 'gdp', 'taxRevenue', 'governmentSpending']}
            showDisclaimer={true}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage; 