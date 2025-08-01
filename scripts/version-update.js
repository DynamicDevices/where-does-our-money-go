#!/usr/bin/env node

/**
 * Version Update Script
 * 
 * This script helps manage version updates and changelog entries.
 * Usage: node scripts/version-update.js [patch|minor|major]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const VERSION_TYPES = ['patch', 'minor', 'major'];

function updateChangelog(version, versionType) {
  const changelogPath = path.join(__dirname, '..', 'CHANGELOG.md');
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  
  const today = new Date().toISOString().split('T')[0];
  const newEntry = `\n## [${version}] - ${today}\n\n### ${versionType === 'major' ? 'Breaking Changes' : versionType === 'minor' ? 'Added' : 'Fixed'}\n- \n\n`;
  
  // Insert new entry after the first ## [version] line
  const lines = changelog.split('\n');
  let insertIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## [')) {
      insertIndex = i;
      break;
    }
  }
  
  lines.splice(insertIndex, 0, newEntry);
  fs.writeFileSync(changelogPath, lines.join('\n'));
  
  console.log(`✅ Updated CHANGELOG.md with version ${version}`);
}

function updateContextFile(version) {
  const contextPath = path.join(__dirname, '..', 'REPOSITORY_CONTEXT.md');
  const context = fs.readFileSync(contextPath, 'utf8');
  
  // Update version in context file
  const updatedContext = context.replace(
    /Current Version: \d+\.\d+\.\d+/,
    `Current Version: ${version}`
  ).replace(
    /Version: \d+\.\d+\.\d+/,
    `Version: ${version}`
  );
  
  fs.writeFileSync(contextPath, updatedContext);
  console.log(`✅ Updated REPOSITORY_CONTEXT.md with version ${version}`);
}

function createGitTag(version) {
  try {
    execSync(`git tag -a v${version} -m "Release version ${version}"`, { stdio: 'inherit' });
    console.log(`✅ Created git tag v${version}`);
  } catch (error) {
    console.log(`⚠️  Git tag creation failed: ${error.message}`);
  }
}

function main() {
  const versionType = process.argv[2];
  
  if (!versionType || !VERSION_TYPES.includes(versionType)) {
    console.error('❌ Please specify a valid version type: patch, minor, or major');
    console.error('Usage: node scripts/version-update.js [patch|minor|major]');
    process.exit(1);
  }
  
  try {
    // Get current version from package.json
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = packageJson.version;
    
    console.log(`🔄 Updating version from ${currentVersion} to ${versionType}...`);
    
    // Update version in package.json
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    
    // Get new version
    const newPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const newVersion = newPackageJson.version;
    
    console.log(`✅ Updated package.json to version ${newVersion}`);
    
    // Update changelog
    updateChangelog(newVersion, versionType);
    
    // Update context file
    updateContextFile(newVersion);
    
    // Create git tag
    createGitTag(newVersion);
    
    console.log(`\n🎉 Version ${newVersion} update complete!`);
    console.log('\nNext steps:');
    console.log('1. Review the changes in CHANGELOG.md');
    console.log('2. Add your changes to the changelog entry');
    console.log('3. Commit the changes: git add . && git commit -m "chore: bump version to ${newVersion}"');
    console.log('4. Push to repository: git push origin main --tags');
    
  } catch (error) {
    console.error('❌ Version update failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { updateChangelog, updateContextFile, createGitTag }; 