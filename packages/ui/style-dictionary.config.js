import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Tokens Studio transforms 등록
register(StyleDictionary);

export default {
  source: ['src/tokens/tokens.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: '_tokens.css',
          format: 'css/variables',
        },
      ],
    },
    ts: {
      transformGroup: 'tokens-studio',
      transforms: ['name/camel'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: '_tokens.ts',
          format: 'javascript/es6',
        },
      ],
    },
  },
};
