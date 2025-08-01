# Repository Context & Important Information

This document tracks critical information about the repository to ensure consistency and prevent breaking changes.

## 🎯 **Project Overview**

**Name**: Where Does Our Money Go?  
**Purpose**: Educational platform for understanding taxation and government spending across countries  
**Target Audience**: Students, educators, policymakers, and general public  
**Current Version**: 1.0.0  
**Status**: Production Ready  

## 📁 **Critical File Structure**

### Core Application Files
```
src/
├── main.tsx              # Entry point - DO NOT MODIFY without testing
├── App.tsx               # Main app component with routing
├── types/index.ts        # TypeScript definitions - CRITICAL for data integrity
├── context/DataContext.tsx # Global state management
├── data/
│   ├── api.ts           # API functions and data fetching
│   └── mockData.ts      # Mock data - UPDATE CAREFULLY
├── pages/               # Page components
├── components/          # Reusable components
└── styles/index.css     # Global styles and Tailwind imports
```

### Configuration Files (DO NOT DELETE)
```
package.json              # Dependencies and scripts
vite.config.ts           # Build configuration
tsconfig.json            # TypeScript configuration
tailwind.config.js       # Styling configuration
.github/workflows/ci.yml # CI/CD pipeline
```

## 🔧 **Critical Dependencies**

### Production Dependencies
- **React 18.2.0** - Core framework
- **TypeScript 5.0.2** - Type safety
- **Vite 4.4.5** - Build tool
- **Chart.js 4.4.0** - Data visualization
- **React Router 6.8.1** - Navigation
- **Tailwind CSS 3.3.3** - Styling

### Development Dependencies
- **Vitest 0.34.1** - Testing
- **ESLint 8.45.0** - Code quality
- **Prettier 3.0.0** - Code formatting

## 📊 **Data Structure Requirements**

### Country Data
```typescript
interface Country {
  code: string;        // ISO country code (e.g., 'USA', 'GBR')
  name: string;        // Full country name
  population: number;  // Total population
  gdp: number;         // GDP in millions
  currency: string;    // Currency code
}
```

### Tax Data Structure
```typescript
interface TaxData {
  countryCode: string;     // Must match Country.code
  year: number;           // Year of data
  totalTaxRevenue: number; // Total tax revenue
  taxRevenueAsGDP: number; // Percentage of GDP
  personalIncomeTax: number;
  corporateTax: number;
  vatSalesTax: number;
  socialSecurity: number;
  otherTaxes: number;
}
```

### Spending Data Structure
```typescript
interface SpendingData {
  countryCode: string;     // Must match Country.code
  year: number;           // Year of data
  totalSpending: number;   // Total government spending
  spendingAsGDP: number;   // Percentage of GDP
  health: number;         // Health spending percentage
  education: number;       // Education spending percentage
  defense: number;        // Defense spending percentage
  socialProtection: number;
  // ... other categories
}
```

## 🚨 **Critical Constraints**

### Data Integrity
- **Country codes must be consistent** across all data files
- **Years must match** between tax and spending data
- **Percentages must sum appropriately** (tax categories, spending categories)
- **GDP percentages must be realistic** (typically 15-50% for tax, 20-60% for spending)

### Performance Requirements
- **Bundle size**: Keep under 500KB gzipped
- **Load time**: Under 3 seconds on 3G
- **Mobile performance**: Must work on older devices
- **Chart rendering**: Smooth animations, no lag

### Accessibility Requirements
- **Screen reader support**: All charts must have ARIA labels
- **Keyboard navigation**: Full keyboard accessibility
- **Color contrast**: WCAG AA compliance
- **Focus management**: Proper focus indicators

## 🔄 **Update Procedures**

### Adding New Countries
1. Add to `mockCountries` in `src/data/mockData.ts`
2. Add corresponding tax data to `mockTaxData`
3. Add corresponding spending data to `mockSpendingData`
4. Update country name mapping in components
5. Test with all chart types

### Adding New Years
1. Add data for all existing countries
2. Update year selection logic in components
3. Test historical charts
4. Update documentation

### Adding New Chart Types
1. Import new chart from Chart.js
2. Add to chart type selection
3. Test with all data types
4. Ensure accessibility

### Updating Dependencies
1. Check for breaking changes
2. Test all functionality
3. Update TypeScript types if needed
4. Verify build still works
5. Update CHANGELOG.md

## 🧪 **Testing Requirements**

### Must Test Before Any Release
- [ ] All pages load correctly
- [ ] Charts render without errors
- [ ] Country selection works
- [ ] Year filtering works
- [ ] Mobile responsiveness
- [ ] Accessibility features
- [ ] Build process completes
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All tests pass

### Critical Test Scenarios
1. **Empty data**: Handle gracefully
2. **Missing countries**: Show appropriate messages
3. **Chart interactions**: Hover, click, zoom
4. **Mobile interactions**: Touch, swipe, pinch
5. **Screen reader**: Navigate all content
6. **Keyboard navigation**: Tab through all elements

## 🚀 **Deployment Checklist**

### Before Deployment
- [ ] All tests pass
- [ ] Build completes without errors
- [ ] Bundle size is acceptable
- [ ] Performance is good
- [ ] Accessibility is verified
- [ ] Documentation is updated
- [ ] Version is updated in package.json
- [ ] CHANGELOG.md is updated
- [ ] Git tag is created

### Deployment Process
1. Run `npm run build`
2. Test locally with `npm run preview`
3. Commit all changes
4. Push to main branch
5. Verify GitHub Actions pass
6. Check deployed site

## 🔍 **Common Issues & Solutions**

### Build Errors
- **TypeScript errors**: Check type definitions
- **Missing dependencies**: Run `npm install`
- **Chart.js errors**: Verify chart registration
- **Tailwind issues**: Check class names

### Runtime Errors
- **Data not loading**: Check mock data structure
- **Charts not rendering**: Verify data format
- **Navigation issues**: Check React Router setup
- **Styling problems**: Check Tailwind classes

### Performance Issues
- **Slow loading**: Check bundle size
- **Chart lag**: Optimize data processing
- **Mobile issues**: Test on actual devices
- **Memory leaks**: Check component cleanup

## 📋 **Maintenance Tasks**

### Weekly
- [ ] Check for dependency updates
- [ ] Review GitHub Issues
- [ ] Test on different browsers
- [ ] Verify mobile functionality

### Monthly
- [ ] Update dependencies (if safe)
- [ ] Review performance metrics
- [ ] Check accessibility compliance
- [ ] Update documentation

### Quarterly
- [ ] Major dependency updates
- [ ] Performance optimization
- [ ] Feature planning
- [ ] User feedback review

## 🎯 **Success Metrics**

### Technical Metrics
- **Build time**: < 30 seconds
- **Bundle size**: < 500KB gzipped
- **Load time**: < 3 seconds
- **Test coverage**: > 80%
- **Accessibility score**: 100%

### User Experience Metrics
- **Mobile usability**: 95%+ score
- **Performance score**: 90%+ Lighthouse
- **Accessibility score**: 100% axe-core
- **SEO score**: 90%+ Lighthouse

## 📄 **Licensing Information**

### License Structure
- **Educational Content**: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
- **Software Code**: MIT License
- **Data**: Public domain (government statistics)

### License Requirements
- **Attribution**: Users must credit the original work
- **ShareAlike**: Derivatives must use the same license
- **Commercial Use**: Allowed with proper attribution
- **Educational Use**: Encouraged and supported

## 🔐 **Security Considerations**

### Data Security
- No sensitive data in client-side code
- All data is public (government statistics)
- No user authentication required
- No personal data collection

### Code Security
- Regular dependency updates
- No eval() or dangerous code
- Proper CSP headers
- HTTPS only in production

## 📞 **Emergency Contacts**

### Repository Information
- **Owner**: DynamicDevices
- **Repository**: where-does-our-money-go
- **Primary Branch**: main
- **Deployment**: GitHub Pages

### Critical Files (DO NOT DELETE)
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration
- `src/types/index.ts` - Type definitions
- `src/data/mockData.ts` - Core data
- `.github/workflows/ci.yml` - Deployment pipeline

---

**Last Updated**: December 19, 2024  
**Version**: 1.0.0  
**Maintainer**: Repository Owner  
**Status**: Production Ready ✅ 