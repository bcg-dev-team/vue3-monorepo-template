import fs from 'fs';
import path from 'path';

/**
 * CSS 파일을 테마별 선택자로 변환하는 함수
 */
function processCSSFile(filePath, theme) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // :root를 [data-theme="light"] 또는 [data-theme="dark"]로 변경
    const processedContent = content.replace(/:root\s*{/, `[data-theme="${theme}"] {`);

    fs.writeFileSync(filePath, processedContent);
    console.log(`✅ ${path.basename(filePath)} processed for ${theme} theme`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// 라이트 모드 CSS 파일 처리
const lightCSSPath = path.join(process.cwd(), 'src/styles/_tokens-light.css');
if (fs.existsSync(lightCSSPath)) {
  processCSSFile(lightCSSPath, 'light');
}

// 다크 모드 CSS 파일 처리
const darkCSSPath = path.join(process.cwd(), 'src/styles/_tokens-dark.css');
if (fs.existsSync(darkCSSPath)) {
  processCSSFile(darkCSSPath, 'dark');
}

console.log('🎨 Token processing completed!');
