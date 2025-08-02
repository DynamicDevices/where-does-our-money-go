import React, { useState } from 'react';
import { ExternalLink, Info, AlertTriangle } from 'lucide-react';
import { DataAttribution as DataAttributionType, DISCLAIMER, getAllDataSources, getDataSourcesForCategory } from '../data/dataSources';

interface DataAttributionProps {
  categories?: string[];
  showDisclaimer?: boolean;
  className?: string;
}

const DataAttribution: React.FC<DataAttributionProps> = ({ 
  categories = [], 
  showDisclaimer = true,
  className = ''
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const dataSources = categories.length > 0 
    ? categories.map(cat => getDataSourcesForCategory(cat)).filter(Boolean)
    : getAllDataSources();

  return (
    <div className={`bg-secondary-50 border border-secondary-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-secondary-900">Data Sources</h3>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4">
          {dataSources.filter((source): source is DataAttributionType => source !== null).map((source) => (
            <div key={source.category} className="border-l-4 border-primary-500 pl-4">
              <h4 className="font-semibold text-secondary-900 mb-2">{source.category}</h4>
              <p className="text-sm text-secondary-600 mb-3">{source.notes}</p>
              
              <div className="space-y-2">
                {source.sources.map((dataSource, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-secondary-900">
                          {dataSource.name}
                        </span>
                        <a
                          href={dataSource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-xs text-secondary-500 mb-1">
                        {dataSource.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-secondary-500">
                        <span>Last updated: {dataSource.lastUpdated}</span>
                        {dataSource.license && (
                          <span>License: {dataSource.license}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showDisclaimer && (
        <div className="mt-4 pt-4 border-t border-secondary-200">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-warning-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-secondary-900 mb-2">{DISCLAIMER.title}</h4>
              <ul className="text-sm text-secondary-600 space-y-1">
                {DISCLAIMER.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAttribution; 