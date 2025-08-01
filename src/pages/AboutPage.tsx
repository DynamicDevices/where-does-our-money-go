import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, BookOpen, Database, Users, Heart, ExternalLink } from 'lucide-react';

const AboutPage: React.FC = () => {
  const dataSources = [
    {
      name: 'OECD Revenue Statistics',
      description: 'Comprehensive data on tax revenues across OECD countries',
      url: 'https://stats.oecd.org/',
      icon: Database,
    },
    {
      name: 'World Bank Data',
      description: 'Global development indicators and economic data',
      url: 'https://data.worldbank.org/',
      icon: Database,
    },
    {
      name: 'IMF Government Finance Statistics',
      description: 'International standards for government finance data',
      url: 'https://www.imf.org/en/Data',
      icon: Database,
    },
  ];

  const educationalContent = [
    {
      title: 'What is GDP?',
      description: 'Gross Domestic Product (GDP) is the total value of all goods and services produced within a country in a given period. It\'s used to measure the size and health of an economy.',
      examples: ['If a country\'s GDP is $1 trillion and tax revenue is $200 billion, the tax-to-GDP ratio is 20%'],
    },
    {
      title: 'Types of Taxes',
      description: 'Different countries use various types of taxes to raise revenue. Common types include income tax, corporate tax, value-added tax (VAT), and social security contributions.',
      examples: ['Personal Income Tax: Tax on individual earnings', 'Corporate Tax: Tax on business profits', 'VAT/Sales Tax: Tax on goods and services'],
    },
    {
      title: 'Government Spending Categories',
      description: 'Governments spend money on various services and programs. Major categories include health, education, defense, and social protection.',
      examples: ['Health: Hospitals, doctors, medicines', 'Education: Schools, universities, training', 'Defense: Military, security, peacekeeping'],
    },
  ];

  const features = [
    {
      icon: Globe,
      title: 'Country Comparison',
      description: 'Compare tax rates and government spending between different countries to understand how public finance varies globally.',
    },
    {
      icon: BookOpen,
      title: 'Educational Tooltips',
      description: 'Hover over categories and terms to learn what they mean, making complex economic concepts accessible to everyone.',
    },
    {
      icon: Users,
      title: 'School-Friendly Design',
      description: 'Designed to be accessible for students and educators, with clear explanations and visual data representations.',
    },
    {
      icon: Heart,
      title: 'Accurate Data',
      description: 'All data comes from reputable international organizations like OECD, World Bank, and IMF to ensure accuracy.',
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            About This Project
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Where Does Our Money Go? is an educational platform designed to help people understand 
            how governments around the world collect and spend tax money.
          </p>
        </div>

        {/* Mission */}
        <section className="card mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Our Mission</h2>
          <p className="text-secondary-600 mb-4">
            We believe that understanding public finance is crucial for informed citizenship. 
            This platform aims to make complex economic data accessible and engaging for everyone, 
            from students to policymakers.
          </p>
          <p className="text-secondary-600">
            By providing accurate, up-to-date information about taxation and government spending 
            across different countries, we hope to foster better understanding of how public money 
            is used and encourage informed discussions about fiscal policy.
          </p>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Data Sources */}
        <section className="card mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Data Sources</h2>
          <p className="text-secondary-600 mb-6">
            We use data from reputable international organizations to ensure accuracy and reliability. 
            All data is regularly updated and follows international standards for government finance statistics.
          </p>
          <div className="space-y-4">
            {dataSources.map((source) => {
              const Icon = source.icon;
              return (
                <div key={source.name} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg">
                  <Icon className="w-6 h-6 text-primary-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900 mb-1">{source.name}</h3>
                    <p className="text-secondary-600 text-sm mb-2">{source.description}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                    >
                      Visit Source
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Educational Content */}
        <section className="card mb-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6">Learning Resources</h2>
          <div className="space-y-6">
            {educationalContent.map((content) => (
              <div key={content.title} className="border-b border-secondary-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {content.title}
                </h3>
                <p className="text-secondary-600 mb-3">{content.description}</p>
                {content.examples && (
                  <div className="bg-secondary-50 p-4 rounded-lg">
                    <h4 className="font-medium text-secondary-900 mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {content.examples.map((example, index) => (
                        <li key={index} className="text-sm text-secondary-600 flex items-start">
                          <span className="text-primary-600 mr-2">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="card bg-primary-600 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-primary-100 mb-6">
              Start comparing countries and understanding how your tax money is spent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/compare"
                className="btn bg-white text-primary-600 hover:bg-primary-50"
              >
                Compare Countries
              </Link>
              <Link
                to="/historical"
                className="btn bg-primary-700 text-white hover:bg-primary-800"
              >
                View Historical Data
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Get in Touch</h2>
          <p className="text-secondary-600 mb-4">
            Have questions, suggestions, or want to contribute? We'd love to hear from you!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/yourusername/where-does-our-money-go"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              GitHub Repository
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 