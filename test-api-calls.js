#!/usr/bin/env node

// Simple test script to check API endpoints directly
const fetch = require('node-fetch');

const API_ENDPOINTS = {
  OECD_COUNTRIES: 'https://stats.oecd.org/api/v1/countries',
  OECD_TAX: 'https://stats.oecd.org/api/v1/revenue-statistics',
  OECD_SPENDING: 'https://stats.oecd.org/api/v1/government-spending',
  WORLD_BANK_COUNTRIES: 'https://api.worldbank.org/v2/countries',
  IMF_DATA: 'https://www.imf.org/external/datamapper/api/v1'
};

async function testEndpoint(name, url) {
  console.log(`\n🔍 Testing ${name}...`);
  console.log(`URL: ${url}`);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; TestBot/1.0)'
      },
      timeout: 10000
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Headers:`, Object.fromEntries(response.headers.entries()));

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Success! Data preview:`, JSON.stringify(data, null, 2).substring(0, 500) + '...');
    } else {
      console.log(`❌ Failed with status ${response.status}`);
      const errorText = await response.text();
      console.log(`Error body:`, errorText.substring(0, 200));
    }
  } catch (error) {
    console.log(`❌ Network error:`, error.message);
  }
}

async function runTests() {
  console.log('🚀 Testing API endpoints directly...\n');
  
  for (const [name, url] of Object.entries(API_ENDPOINTS)) {
    await testEndpoint(name, url);
  }
  
  console.log('\n📊 Test Summary:');
  console.log('This script tests the actual API endpoints to see what responses we get.');
  console.log('If you see 403/404 errors, it means the APIs require authentication or have CORS restrictions.');
  console.log('If you see 200 OK, the APIs are accessible from server-side requests.');
}

runTests().catch(console.error); 