import { Country, TaxData, SpendingData } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateCountryData = (countries: Country[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for required fields
  countries.forEach((country, index) => {
    if (!country.code || !country.name) {
      errors.push(`Country at index ${index} is missing required fields (code or name)`);
    }
    
    if (country.population <= 0) {
      errors.push(`Country ${country.code} has invalid population: ${country.population}`);
    }
    
    if (country.gdp <= 0) {
      errors.push(`Country ${country.code} has invalid GDP: ${country.gdp}`);
    }
    
    if (!country.currency) {
      warnings.push(`Country ${country.code} is missing currency information`);
    }
  });

  // Check for duplicate country codes
  const codes = countries.map(c => c.code);
  const uniqueCodes = new Set(codes);
  if (codes.length !== uniqueCodes.size) {
    errors.push('Duplicate country codes found');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateTaxData = (taxData: TaxData[], countries: Country[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const countryCodes = new Set(countries.map(c => c.code));

  taxData.forEach((data, index) => {
    // Check if country exists
    if (!countryCodes.has(data.countryCode)) {
      errors.push(`Tax data at index ${index} references non-existent country: ${data.countryCode}`);
    }

    // Check for required fields
    if (!data.countryCode || !data.year) {
      errors.push(`Tax data at index ${index} is missing required fields`);
    }

    // Validate percentages
    const totalTax = data.personalIncomeTax + data.corporateTax + data.vatSalesTax + 
                    data.socialSecurity + data.otherTaxes;
    
    if (Math.abs(totalTax - data.taxRevenueAsGDP) > 1) {
      warnings.push(`Tax data for ${data.countryCode} ${data.year}: Sum of tax categories (${totalTax}%) doesn't match total tax revenue (${data.taxRevenueAsGDP}%)`);
    }

    // Check for reasonable ranges
    if (data.taxRevenueAsGDP < 5 || data.taxRevenueAsGDP > 50) {
      warnings.push(`Tax revenue for ${data.countryCode} ${data.year} (${data.taxRevenueAsGDP}%) seems outside normal range (5-50%)`);
    }

    if (data.personalIncomeTax < 0 || data.personalIncomeTax > 30) {
      errors.push(`Personal income tax for ${data.countryCode} ${data.year} (${data.personalIncomeTax}%) is outside valid range`);
    }

    if (data.corporateTax < 0 || data.corporateTax > 15) {
      errors.push(`Corporate tax for ${data.countryCode} ${data.year} (${data.corporateTax}%) is outside valid range`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateSpendingData = (spendingData: SpendingData[], countries: Country[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const countryCodes = new Set(countries.map(c => c.code));

  spendingData.forEach((data, index) => {
    // Check if country exists
    if (!countryCodes.has(data.countryCode)) {
      errors.push(`Spending data at index ${index} references non-existent country: ${data.countryCode}`);
    }

    // Check for required fields
    if (!data.countryCode || !data.year) {
      errors.push(`Spending data at index ${index} is missing required fields`);
    }

    // Validate percentages
    const totalSpending = data.health + data.education + data.defense + data.socialProtection +
                         data.generalPublicServices + data.economicAffairs + data.environmentalProtection +
                         data.housing + data.recreation + data.publicOrder;
    
    if (Math.abs(totalSpending - data.spendingAsGDP) > 2) {
      warnings.push(`Spending data for ${data.countryCode} ${data.year}: Sum of spending categories (${totalSpending}%) doesn't match total spending (${data.spendingAsGDP}%)`);
    }

    // Check for reasonable ranges
    if (data.spendingAsGDP < 10 || data.spendingAsGDP > 70) {
      warnings.push(`Government spending for ${data.countryCode} ${data.year} (${data.spendingAsGDP}%) seems outside normal range (10-70%)`);
    }

    if (data.health < 0 || data.health > 30) {
      errors.push(`Health spending for ${data.countryCode} ${data.year} (${data.health}%) is outside valid range`);
    }

    if (data.education < 0 || data.education > 15) {
      errors.push(`Education spending for ${data.countryCode} ${data.year} (${data.education}%) is outside valid range`);
    }

    if (data.defense < 0 || data.defense > 10) {
      errors.push(`Defense spending for ${data.countryCode} ${data.year} (${data.defense}%) is outside valid range`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

export const validateAllData = (
  countries: Country[], 
  taxData: TaxData[], 
  spendingData: SpendingData[]
): ValidationResult => {
  const countryValidation = validateCountryData(countries);
  const taxValidation = validateTaxData(taxData, countries);
  const spendingValidation = validateSpendingData(spendingData, countries);

  const allErrors = [
    ...countryValidation.errors,
    ...taxValidation.errors,
    ...spendingValidation.errors
  ];

  const allWarnings = [
    ...countryValidation.warnings,
    ...taxValidation.warnings,
    ...spendingValidation.warnings
  ];

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };
}; 