import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';

/**
 * Architecture (see README): dependencies point inwards only.
 *
 *   renderer (UI)  →  shared (view models, IPC contracts)
 *   application    →  domain, shared
 *   persistence    →  domain, application (ports)
 *   integrations   →  domain, application (ports)
 *   main (Electron composition root) → everything except renderer
 *   domain         →  domain only, and NO external package (pure TypeScript)
 *
 * The renderer never imports the domain: it only displays view models and never
 * recomputes a scientific value (spec §14.10).
 */
const layers = ['domain', 'application', 'persistence', 'integrations', 'main', 'preload', 'renderer', 'shared'];

export default tseslint.config(
  { ignores: ['node_modules/', 'coverage/', 'dist/'] },

  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...tseslint.configs.disableTypeChecked,
    rules: { ...tseslint.configs.disableTypeChecked.rules, '@typescript-eslint/no-require-imports': 'off' },
  },

  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      // Lets the plugin resolve extension-less TypeScript imports (e.g. '../domain').
      'import/resolver': { typescript: { project: './tsconfig.json' } },
      'boundaries/elements': layers.map((type) => ({
        type,
        pattern: `src/${type}`,
      })),
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            { from: { element: { type: 'domain' } }, allow: { to: { element: { type: 'domain' } } } },
            {
              from: { element: { type: 'application' } },
              allow: { to: { element: { types: { anyOf: ['domain', 'shared', 'application'] } } } },
            },
            {
              from: { element: { types: { anyOf: ['persistence', 'integrations'] } } },
              allow: {
                to: { element: { types: { anyOf: ['domain', 'application', 'shared'] } } },
              },
            },
            {
              from: { element: { type: 'main' } },
              allow: { to: { element: { types: { anyOf: layers.filter((l) => l !== 'renderer' && l !== 'preload') } } } },
            },
            {
              from: { element: { type: 'renderer' } },
              allow: { to: { element: { types: { anyOf: ['shared', 'renderer'] } } } },
            },
            { from: { element: { type: 'shared' } }, allow: { to: { element: { type: 'shared' } } } },
            // The preload script is the bridge: it knows the IPC contract and nothing else.
            { from: { element: { type: 'preload' } }, allow: { to: { element: { types: { anyOf: ['shared', 'preload'] } } } } },
          ],
        },
      ],
    },
  },

  // The domain is pure TypeScript: only relative imports, no external package and
  // no Node built-in (enforced separately from the layer rules above).
  {
    files: ['src/domain/**/*.ts'],
    rules: {
      // No browser or Node global either: the domain does not know where it runs.
      'no-restricted-globals': [
        'error',
        ...['window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'fetch', 'process', 'require', '__dirname'].map((name) => ({
          name,
          message: 'The domain layer is pure: no browser or Node global.',
        })),
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^(?!\\.{1,2}(/|$))',
              message: 'The domain layer may only use relative imports (no package, no Node built-in).',
            },
          ],
        },
      ],
    },
  },
);
