import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Github, ExternalLink, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Where Does Our Money Go?</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              An educational platform helping people understand how taxation is spent across different countries. 
              Explore government spending, compare tax rates, and learn about public finance.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername/where-does-our-money-go"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-300 hover:text-white transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Compare Countries
                </Link>
              </li>
              <li>
                <Link to="/historical" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Historical Data
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Data Sources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://stats.oecd.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>OECD</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://data.worldbank.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>World Bank</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.imf.org/en/Data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition-colors duration-200 flex items-center space-x-1"
                >
                  <span>IMF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2024 Where Does Our Money Go?. All rights reserved.
            </p>
            <p className="text-secondary-400 text-sm flex items-center space-x-1 mt-2 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for education</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 