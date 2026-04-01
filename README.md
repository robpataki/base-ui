# Base UI

A production-ready React 19 component library built with Vite, TypeScript, and Storybook.

## Features

- ⚡ **Vite** - Lightning-fast build tool with ESM and CommonJS outputs
- 🎨 **Storybook** - Beautiful interactive component documentation with a11y testing
- 🧪 **Vitest** - Fast unit testing with React Testing Library
- 📝 **TypeScript** - Full type safety with strict mode enabled
- 🎯 **Accessibility** - Built-in a11y addon for Storybook and testing utilities
- 🎨 **Sass + CSS Modules** - Scoped styling with SCSS support
- 🔍 **Biome** - Lightning-fast code linting and formatting

## Installation

```bash
npm install base-ui
```

## Usage

### Basic Example

```tsx
import { TextInput } from "base-ui";

function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <TextInput
      label="Email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={error}
      isError={!!error}
      helperText="We'll never share your email"
    />
  );
}
```

### Components

#### TextInput

A flexible text input component with support for labels, error states, helper text, and accessibility features.

**Props:**

- `label?: string` - Label text for the input
- `placeholder?: string` - Placeholder text
- `value?: string` - Input value
- `error?: string` - Error message to display
- `isError?: boolean` - Whether the input is in an error state
- `helperText?: string` - Helper text below the input
- `disabled?: boolean` - Whether the input is disabled
- `onChange?: (e: ChangeEvent<HTMLInputElement>) => void` - Change handler
- Plus all standard HTML input attributes

## Development

### Setup

```bash
npm install
```

### Development Scripts

```bash
# Start Storybook dev server
npm run storybook

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui

# Type check
npm run type-check

# Lint code
npm run lint

# Format code
npm run format

# Build library
npm run build

# Build Storybook for production
npm run build-storybook
```

### Project Structure

```
base-ui/
├── src/
│   ├── components/             # Component implementations
│   │   └── TextInput/
│   │       ├── TextInput.tsx
│   │       ├── TextInput.module.scss
│   │       ├── TextInput.test.tsx
│   │       ├── TextInput.stories.tsx
│   │       └── index.ts
│   ├── test/
│   │   ├── setup.ts           # Test environment setup
│   │   └── test-utils.ts      # Custom render wrapper
│   ├── types/                  # TypeScript type definitions
│   └── index.ts               # Barrel export
├── .storybook/                # Storybook configuration
│   ├── main.ts
│   └── preview.tsx
├── vite.config.ts             # Vite build configuration
├── vitest.config.ts           # Vitest configuration
├── tsconfig.json              # TypeScript configuration
├── biome.json                 # Biome lint/format config
└── package.json               # Dependencies and scripts
```

### Adding New Components

1. Create a new folder under `src/components/{ComponentName}`
2. Add implementation files:
   - `{ComponentName}.tsx` - Component implementation
   - `{ComponentName}.module.scss` - Styles
   - `{ComponentName}.test.tsx` - Tests
   - `{ComponentName}.stories.tsx` - Storybook stories
   - `index.ts` - Export
3. Update `src/index.ts` to export the new component
4. Run tests to ensure everything works: `npm run test`

### Code Quality

We use Biome for formatting and linting:

```bash
# Check for lint errors
npm run lint

# Fix formatting issues
npm run format
```

### Testing

Tests are written with Vitest and React Testing Library. Run tests with:

```bash
npm run test                  # Run all tests
npm run test:coverage         # Generate coverage report
npm run test:ui               # Open test UI
```

Tests should cover:
- Component rendering
- User interactions
- Props variations
- Accessibility attributes
- Error states

### Storybook

Storybook provides interactive documentation with accessibility testing:

```bash
npm run storybook #Start dev server (port 6006)
```

Stories should include:
- Default state
- With different props
- Error states
- Disabled states
- Multiple variations

The a11y addon automatically checks for accessibility issues like:
- Color contrast
- ARIA attributes
- Semantic HTML

## Building

To build the library for npm distribution:

```bash
npm run build
```

This will generate:
- `dist/index.mjs` - ES Module
- `dist/index.cjs` - CommonJS
- `dist/index.d.ts` - TypeScript declarations
- `dist/styles.css` - Compiled styles

## Publishing

### Before Publishing

Run the pre-publish checks to ensure everything is ready:

```bash
npm run prepublishonly
```

This will:
1. Type check all code
2. Lint and format check
3. Run all tests
4. Build the library

### Publishing to npm

```bash
npm publish
```

For private registries, update `.npmrc`:

```
@yourusername:registry=https://your-private-registry.com
```

Then publish:

```bash
npm publish --registry https://your-private-registry.com
```

## Peer Dependencies

This library requires:
- `react >= 19.0.0`
- `react-dom >= 19.0.0`

Install them in your project:

```bash
npm install react react-dom
```

## Browser Support

We support all modern browsers (last 3 versions):
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am "Add feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

### Development Workflow

1. Make changes to components
2. Write/update tests to cover changes
3. Write/update Storybook stories
4. Run checks: `npm run type-check && npm run lint && npm run test`
5. Verify in Storybook: `npm run storybook`

## License

MIT

## Changelog

### v0.1.0 (Initial Release)

- Initial release with TextInput component
- Storybook with a11y addon
- Vitest + React Testing Library setup
- Full TypeScript support with strict mode
- CSS Modules with Sass support
- Biome for linting and formatting
