# Deployment Guide

This guide explains how to deploy the "Where Does Our Money Go?" website to various platforms.

## GitHub Pages (Recommended)

The project is configured to automatically deploy to GitHub Pages when tests pass.

### Setup

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

2. **Configure Repository**:
   - Update the repository URL in `package.json`
   - Update the homepage URL in `package.json`
   - Update the GitHub username in the workflow file

3. **Deploy**:
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy

### Manual Deployment

If you need to deploy manually:

```bash
# Build the project
npm run build

# The built files will be in the `dist` directory
# Upload the contents of `dist` to your web server
```

## Other Platforms

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Vercel

1. Import your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy automatically on push to main branch

### AWS S3 + CloudFront

1. Build the project: `npm run build`
2. Upload `dist` contents to S3 bucket
3. Configure CloudFront distribution
4. Set up CI/CD pipeline for automatic deployment

## Environment Variables

For production deployment, you may want to set these environment variables:

```bash
# API endpoints (when real APIs are implemented)
VITE_OECD_API_URL=https://stats.oecd.org/api/v1
VITE_WORLD_BANK_API_URL=https://api.worldbank.org/v2

# Analytics (optional)
VITE_GA_TRACKING_ID=your-ga-tracking-id
```

## Performance Optimization

### Build Optimization

The project is already configured with:

- Code splitting with Vite
- Tree shaking for unused code
- CSS minification
- Image optimization
- Gzip compression

### Additional Optimizations

1. **CDN**: Use a CDN for static assets
2. **Caching**: Set appropriate cache headers
3. **Compression**: Enable gzip/brotli compression
4. **Monitoring**: Add performance monitoring

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **CSP**: Consider adding Content Security Policy headers
3. **CORS**: Configure CORS for API calls
4. **Dependencies**: Regularly update dependencies

## Monitoring

### Recommended Tools

- **Google Analytics**: Track user engagement
- **Sentry**: Error monitoring
- **Lighthouse**: Performance monitoring
- **Uptime Robot**: Availability monitoring

### Setup

1. Add monitoring scripts to `index.html`
2. Configure environment variables
3. Set up alerts for critical issues

## Troubleshooting

### Common Issues

1. **Build Fails**: Check TypeScript errors and dependencies
2. **Deployment Fails**: Verify GitHub Actions configuration
3. **Assets Not Loading**: Check base URL configuration
4. **Charts Not Rendering**: Verify Chart.js dependencies

### Debug Steps

1. Check browser console for errors
2. Verify all dependencies are installed
3. Test locally before deploying
4. Check network requests in browser dev tools

## Support

If you encounter deployment issues:

1. Check the GitHub Actions logs
2. Verify your repository configuration
3. Open an issue with detailed error information
4. Review the troubleshooting section above 