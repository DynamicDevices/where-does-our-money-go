import React from 'react';
import { useData } from '../hooks/useData';

const LoadingState: React.FC = () => {
  const { loading, error } = useData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading government data...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching from OECD, World Bank, and IMF sources</p>
        </div>
      </div>
    );
  }

  if (error) {
    const isCorsError = error.includes('CORS') || error.includes('Unable to fetch') || error.includes('browser security restrictions');
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {isCorsError ? 'Data Access Limited' : 'Data Loading Error'}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {isCorsError ? (
                <>
                  Due to browser security restrictions, we cannot directly access the OECD data APIs from this website. 
                  This is a common limitation when accessing external government data sources.
                  <br /><br />
                  <strong>For the most current and comprehensive data, please visit these official sources:</strong>
                  <br /><br />
                  <div className="space-y-2 text-left">
                    <div>
                      <a href="https://stats.oecd.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">OECD Statistics Portal</a>
                      <p className="text-xs text-gray-500">Comprehensive economic and social data</p>
                    </div>
                    <div>
                      <a href="https://stats.oecd.org/index.aspx?DataSetCode=REV" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">OECD Revenue Statistics</a>
                      <p className="text-xs text-gray-500">Detailed tax revenue data by country</p>
                    </div>
                    <div>
                      <a href="https://stats.oecd.org/index.aspx?DataSetCode=GOV" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">OECD Government Spending</a>
                      <p className="text-xs text-gray-500">Government expenditure by function</p>
                    </div>
                    <div>
                      <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">World Bank Data</a>
                      <p className="text-xs text-gray-500">Global development indicators</p>
                    </div>
                    <div>
                      <a href="https://www.imf.org/en/data" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline font-medium">IMF Data</a>
                      <p className="text-xs text-gray-500">International financial statistics</p>
                    </div>
                  </div>
                </>
              ) : (
                error
              )}
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingState; 