const fs = require('fs');
const path = require('path');

console.log('🔄 Transforming tokens for @tokens-studio/sd-transforms...');

// 원본 토큰 파일 읽기
const originalTokensPath = './src/tokens/tokens-light.json';
const originalTokens = JSON.parse(fs.readFileSync(originalTokensPath, 'utf8'));

// @tokens-studio/sd-transforms가 기대하는 형태로 변환
const transformedTokens = {
  // $themes 정의 (GitHub 문서 예시 참고)
  $themes: [
    {
      name: 'Light',
      selectedTokens: {
        'Base-Colors': 'light',
        'Base-Size': 'light',
        Font: 'light',
        Background: 'light',
      },
    },
  ],

  // 기본 토큰들을 루트 레벨로 이동
  'Base-Colors': originalTokens['Theme/Light']['Base-Colors'],
  'Base-Size': originalTokens['Theme/Light']['Base-Size'],
  Font: originalTokens['Theme/Light']['Font'],
  Background: originalTokens['Theme/Light']['Background'],
};

// 변환된 토큰을 임시 파일로 저장
const transformedTokensPath = './src/tokens/tokens-transformed.json';
fs.writeFileSync(transformedTokensPath, JSON.stringify(transformedTokens, null, 2));

console.log('✅ Tokens transformed successfully!');
console.log(`📁 Transformed file: ${transformedTokensPath}`);
