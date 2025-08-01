# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added
- **Initial Release**: Complete taxation and government spending website
- **Core Features**:
  - Interactive country comparison with charts (Bar, Line, Pie)
  - Historical data visualization with time series
  - Educational tooltips and explanations
  - Mobile-responsive design
  - Multi-country selection and filtering
- **Technical Stack**:
  - React 18 with TypeScript
  - Vite for fast development and builds
  - Tailwind CSS for styling
  - Chart.js for data visualization
  - React Router for navigation
  - React Query for data management
- **Data & Content**:
  - Mock data for 10 countries (USA, UK, Germany, France, Japan, Canada, Australia, Sweden, Norway, Denmark)
  - Historical data from 2020-2022
  - Realistic tax and spending percentages
  - Educational content explaining GDP, taxes, and government spending
- **Development Setup**:
  - GitHub Actions CI/CD pipeline
  - ESLint and Prettier configuration
  - Vitest testing setup
  - Husky pre-commit hooks
- **Documentation**:
  - Comprehensive README with setup instructions
  - Contributing guidelines
  - Deployment documentation
  - MIT License
- **Pages**:
  - Home page with hero section and key statistics
  - Country comparison page with interactive charts
  - Historical data page with time series
  - About page with educational content
- **Components**:
  - Responsive header with navigation
  - Footer with links and information
  - Chart components with multiple visualization types
  - Data tables with formatted percentages
  - Loading states and error handling

### Technical Details
- **Build Size**: 425.50 kB (136.91 kB gzipped)
- **CSS Size**: 24.63 kB (4.33 kB gzipped)
- **Dependencies**: 606 packages
- **TypeScript**: Strict mode enabled
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Repository Structure
```
where-does-our-money-go/
├── src/
│   ├── components/     # React components
│   ├── context/        # Data context and state management
│   ├── data/          # API functions and mock data
│   ├── pages/         # Page components
│   ├── styles/        # CSS and Tailwind styles
│   ├── test/          # Test setup
│   └── types/         # TypeScript type definitions
├── docs/              # Documentation
├── .github/           # GitHub Actions workflows
└── public/            # Static assets
```

### Deployment
- **Platform**: GitHub Pages (static hosting)
- **CI/CD**: Automated testing and deployment
- **Performance**: Optimized for static hosting
- **SEO**: Meta tags and structured data

### Data Sources (Planned)
- OECD Revenue Statistics
- World Bank Data
- IMF Government Finance Statistics
- National statistical offices

### Future Roadmap
- [ ] Add real API integration
- [ ] Expand to more countries
- [ ] Add more historical data
- [ ] Implement data export features
- [ ] Add multi-language support
- [ ] Enhance accessibility features
- [ ] Add more chart types
- [ ] Implement user preferences
- [ ] Add data validation
- [ ] Create mobile app version

---

## Version History

### Version 1.0.0 (Current)
- **Status**: Production Ready
- **Release Date**: December 19, 2024
- **Features**: Complete educational platform for taxation and government spending
- **Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Deployment**: GitHub Pages static hosting

---

## Versioning Strategy

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

### Version Update Process

1. **Update version in package.json**
2. **Add entry to CHANGELOG.md**
3. **Create git tag for the version**
4. **Update any version-specific documentation**

### Breaking Changes

Breaking changes will be clearly marked in the changelog and will trigger a MAJOR version bump. Examples:
- API changes
- Component prop changes
- Data structure changes
- Build configuration changes

### Deprecation Policy

- Deprecated features will be marked in the changelog
- At least one MINOR version cycle will pass before removal
- Clear migration guides will be provided 