import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

export default {
  source: ['src/tokens/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: ['name/kebab'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: '_tokens-light.css',
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
          destination: '_tokens-light.ts',
          format: 'javascript/es6',
        },
      ],
    },
  },
};
