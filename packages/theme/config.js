import path from 'path';

const root = process.cwd();

export default [
  {
    name: 'light',
    source: [path.join(root, 'packages/theme/src/tokens/tokens-light.json')],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: path.join(root, 'dist/tokens/light/'),
        files: [
          {
            destination: '_tokens-light.css',
            format: 'css/variables',
          },
        ],
      },
      ts: {
        transformGroup: 'js',
        buildPath: path.join(root, 'dist/tokens/light/'),
        files: [
          {
            destination: '_tokens-light.ts',
            format: 'javascript/es6',
          },
        ],
      },
      tailwind: {
        transformGroup: 'js',
        buildPath: path.join(root, 'dist/tokens/light/'),
        files: [
          {
            destination: 'tailwind-preset-light.js',
            format: 'javascript/es6',
          },
        ],
      },
      tailwindJson: {
        transformGroup: 'js',
        buildPath: path.join(root, 'dist/tokens/light/'),
        files: [
          {
            destination: 'tailwind-tokens-light.json',
            format: 'json/flat',
          },
        ],
      },
    },
  },
  {
    name: 'dark',
    source: [path.join(root, 'packages/theme/src/tokens/tokens-dark.json')],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: path.join(root, 'dist/tokens/dark/'),
        files: [
          {
            destination: '_tokens-dark.css',
            format: 'css/variables',
          },
        ],
      },
      ts: {
        transformGroup: 'js',
        buildPath: path.join(root, 'dist/tokens/dark/'),
        files: [
          {
            destination: '_tokens-dark.ts',
            format: 'javascript/es6',
          },
        ],
      },
      tailwind: {
        transformGroup: 'js',
        buildPath: path.join(root, 'dist/tokens/dark/'),
        files: [
          {
            destination: 'tailwind-preset-dark.js',
            format: 'javascript/es6',
          },
        ],
      },
      tailwindJson: {
        transformGroup: 'js',
        buildPath: path.join(root, 'dist/tokens/dark/'),
        files: [
          {
            destination: 'tailwind-tokens-dark.json',
            format: 'json/flat',
          },
        ],
      },
    },
  },
];
