import React from 'react';
import { Loader2, Globe, Database, BarChart3 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  showDataSources?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Loading real data from international sources...',
  showDataSources = true 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">
          Fetching Real Data
        </h2>
        <p className="text-secondary-600 mb-6">
          {message}
        </p>
        
        {showDataSources && (
          <div className="bg-white rounded-lg p-4 border border-secondary-200">
            <h3 className="font-semibold text-secondary-900 mb-3">Data Sources</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-secondary-600">OECD API</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-green-600" />
                <span className="text-secondary-600">World Bank API</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <span className="text-secondary-600">IMF API</span>
              </div>
            </div>
            <p className="text-xs text-secondary-500 mt-3">
              This may take a few moments as we fetch the latest data from multiple international sources.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingState; 