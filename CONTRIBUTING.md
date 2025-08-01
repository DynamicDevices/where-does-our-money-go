# Contributing to Where Does Our Money Go?

Thank you for your interest in contributing to our educational platform! We welcome contributions from developers, educators, and anyone interested in making public finance data more accessible.

## How to Contribute

### 1. Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/where-does-our-money-go.git
   cd where-does-our-money-go
   ```

### 2. Setup Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

### 3. Make Your Changes

- Create a new branch for your feature/fix
- Make your changes following our coding standards
- Add tests for new functionality
- Update documentation as needed

### 4. Testing

Run the test suite:
```bash
npm run test
```

Run linting:
```bash
npm run lint
```

### 5. Submit a Pull Request

1. Push your changes to your fork
2. Create a pull request with a clear description
3. Ensure all tests pass and code is properly formatted

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (Prettier + ESLint)
- Write meaningful commit messages
- Add JSDoc comments for complex functions

### Component Structure

- Keep components small and focused
- Use TypeScript interfaces for props
- Implement proper error handling
- Add loading states where appropriate

### Data Handling

- Use the existing data context for state management
- Add new data sources through the API layer
- Ensure data accuracy and proper formatting
- Add tooltips for educational content

### Testing

- Write unit tests for utilities and hooks
- Add integration tests for complex features
- Test accessibility features
- Ensure mobile responsiveness

## Areas for Contribution

### High Priority

- **Data Sources**: Add more countries and historical data
- **Visualizations**: Improve chart interactions and accessibility
- **Educational Content**: Add more tooltips and explanations
- **Mobile Experience**: Enhance responsive design

### Medium Priority

- **Performance**: Optimize bundle size and loading
- **Accessibility**: Improve screen reader support
- **Internationalization**: Add multi-language support
- **Advanced Features**: Add data export, custom comparisons

### Low Priority

- **Documentation**: Improve code comments and guides
- **Testing**: Increase test coverage
- **CI/CD**: Enhance deployment pipeline

## Getting Help

- Open an issue for bugs or feature requests
- Join our discussions for questions
- Check existing issues before creating new ones

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## License

By contributing, you agree that your contributions will be licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. 