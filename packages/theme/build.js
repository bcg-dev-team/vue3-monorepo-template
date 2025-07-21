import StyleDictionary from 'style-dictionary';
import configs from './config.js';

for (const config of configs) {
  const sd = new StyleDictionary(config);
  await sd.hasInitialized;
  console.log(`Build started for: ${config.name}`);
  await sd.buildAllPlatforms();
  console.log(`Build completed for: ${config.name}`);
}
