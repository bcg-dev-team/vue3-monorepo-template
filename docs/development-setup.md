# 개발 환경 설정 가이드

## Locator.js 설정

개발 환경에서 Locator.js가 Cursor 에디터를 열도록 설정하려면:

### 1. 개발 서버 실행
```bash
pnpm run dev
```

### 2. Locator.js 설정
1. 브라우저에서 개발 서버 접속
2. 맥에서는 `Option`키, 윈도우에서는 `Alt`키를 눌러 Locator.js 설정 패널 열기
3. Editor 설정에서 Custom template에 다음 입력:
   ```
   cursor://file/${projectPath}${filePath}:${line}:${column}
   ```

### 2. Cursor 설정 확인
- Cursor가 기본 에디터로 설정되어 있는지 확인
- URL 스키마 `cursor://`가 시스템에서 인식되는지 확인

### 3. 테스트
- 개발 서버 실행 후 브라우저에서 Locator.js 오버레이 활성화
- 컴포넌트를 클릭하여 Cursor에서 해당 파일이 열리는지 확인

## 기타 개발 환경 설정

### 필수 도구
- Node.js 18+
- pnpm
- Cursor IDE

### 권장 브라우저 확장 프로그램
- Locator.js 브라우저 확장
- Vue.js devtools
- React Developer Tools (React 프로젝트인 경우)

### 환경 변수 설정
```bash
# .env.development 파일 생성
cp .env.example .env.development
```

## 문제 해결

### Locator.js가 Cursor를 열지 않는 경우
1. Cursor가 시스템 기본 에디터로 설정되어 있는지 확인
2. 브라우저에서 `cursor://` URL 스키마 허용 확인
3. Locator.js 설정에서 template 형식 확인

### 기타 문제
- 팀 리드에게 문의하거나 이슈를 생성해주세요 