import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

export default {
  platforms: {
    css_light: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: '_tokens-light.css',
          format: 'css/variables',
        },
      ],
      source: ['src/tokens/tokens.json'],
    },
    css_dark: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: '_tokens-dark.css',
          format: 'css/variables',
        },
      ],
      source: ['src/tokens/tokens-dark.json'],
    },
    ts_light: {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: '_tokens-light.ts',
          format: 'javascript/es6',
        },
      ],
      source: ['src/tokens/tokens.json'],
    },
    ts_dark: {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: '_tokens-dark.ts',
          format: 'javascript/es6',
        },
      ],
      source: ['src/tokens/tokens-dark.json'],
    },
  },
};
