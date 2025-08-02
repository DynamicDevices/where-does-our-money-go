import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CountryComparisonPage from './pages/CountryComparisonPage';
import HistoricalDataPage from './pages/HistoricalDataPage';
import AboutPage from './pages/AboutPage';
import { DataProvider } from './context/DataContext';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <DataProvider>
        <div className="min-h-screen bg-secondary-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/compare" element={<CountryComparisonPage />} />
              <Route path="/historical" element={<HistoricalDataPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </DataProvider>
    </ErrorBoundary>
  );
};

export default App; 