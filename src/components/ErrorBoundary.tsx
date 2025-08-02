import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const isCorsError = this.state.error?.message?.includes('CORS') || 
                         this.state.error?.message?.includes('browser security restrictions');
      
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {isCorsError ? 'Data Access Issue' : 'Something went wrong'}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {isCorsError ? (
                  <>
                    Due to browser security restrictions, we cannot directly access the OECD data APIs. 
                    This is a common limitation when accessing external government data sources.
                    <br /><br />
                    <strong>Alternative Data Sources:</strong>
                    <br />
                    • <a href="https://stats.oecd.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">OECD Statistics Portal</a>
                    <br />
                    • <a href="https://stats.oecd.org/index.aspx?DataSetCode=REV" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">OECD Revenue Statistics</a>
                    <br />
                    • <a href="https://stats.oecd.org/index.aspx?DataSetCode=GOV" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">OECD Government Spending</a>
                    <br />
                    • <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">World Bank Data</a>
                    <br />
                    • <a href="https://www.imf.org/en/data" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">IMF Data</a>
                  </>
                ) : (
                  'An unexpected error occurred. Please try refreshing the page.'
                )}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 