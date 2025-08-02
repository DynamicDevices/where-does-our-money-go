import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('should render the header with title', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText(/where does our money go/i)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/compare countries/i)).toBeInTheDocument();
    expect(screen.getByText(/historical data/i)).toBeInTheDocument();
  });

  it('should have proper navigation structure', () => {
    renderWithRouter(<Header />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should have accessible navigation', () => {
    renderWithRouter(<Header />);
    
    // Check that all links have proper text content
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link.textContent).toBeTruthy();
    });
  });
}); 