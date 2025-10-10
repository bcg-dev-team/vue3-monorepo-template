# API 자동 생성 가이드

## 📋 목차

- [개요](#개요)
- [필수 요구사항](#필수-요구사항)
- [Swagger 문서](#swagger-문서)
- [아키텍처](#아키텍처)
- [설정 파일](#설정-파일)
- [자동 생성 프로세스](#자동-생성-프로세스)
- [사용 가이드](#사용-가이드)
- [마이그레이션 전략](#마이그레이션-전략)
- [FAQ](#faq)

---

## 개요

이 프로젝트는 OpenAPI Generator를 활용하여 Swagger JSON으로부터 TypeScript 타입과 서비스 클래스를 자동 생성합니다.

### 주요 특징

- ✅ **타입 안정성**: Swagger 스펙으로부터 정확한 TypeScript 타입 자동 생성
- ✅ **일관성**: 도메인별로 타입과 서비스를 체계적으로 구성
- ✅ **유지보수성**: API 스펙 변경 시 자동 업데이트
- ✅ **하위 호환성**: 기존 수동 작성 서비스와 병행 사용 가능

---

## 필수 요구사항

### Java 17+ 설치

OpenAPI Generator는 Java로 작성되어 있어 **Java Runtime Environment (JRE) 또는 Java Development Kit (JDK) 17 이상이 필수**입니다.

> **참고**: 자동 생성된 타입과 서비스는 이미 Git에 포함되어 있으므로, **API 스펙 변경 작업을 하지 않는 일반 개발자는 Java 설치가 필요하지 않습니다**. ✅

#### macOS

**방법 1: Homebrew 사용 (권장)**

```bash
# OpenJDK 17 설치
brew install openjdk@17

# PATH에 추가 (zsh 사용자)
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# bash 사용자
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile

# 설치 확인
java --version
```

**방법 2: 공식 다운로드**

1. [Oracle JDK 다운로드](https://www.oracle.com/java/technologies/downloads/#java17)
2. 또는 [OpenJDK 다운로드](https://adoptium.net/)
3. 설치 후 자동으로 PATH에 등록됨

#### Windows

**방법 1: Chocolatey 사용**

```powershell
# PowerShell (관리자 권한)
choco install openjdk17

# 설치 확인
java --version
```

**방법 2: 공식 다운로드**

1. [Oracle JDK 다운로드](https://www.oracle.com/java/technologies/downloads/#java17)
2. 설치 프로그램 실행
3. 자동으로 PATH 설정됨

#### Linux (Ubuntu/Debian)

```bash
# OpenJDK 17 설치
sudo apt update
sudo apt install openjdk-17-jdk

# 설치 확인
java --version
```

#### 설치 확인

```bash
# Java 버전 확인
java --version

# 출력 예시:
# openjdk 17.0.16 2025-07-15
# OpenJDK Runtime Environment Homebrew (build 17.0.16+0)
# OpenJDK 64-Bit Server VM Homebrew (build 17.0.16+0, mixed mode, sharing)
```

### Node.js 및 pnpm

```bash
# Node.js 20+
node --version  # v20.0.0 이상

# pnpm 8+
pnpm --version  # 8.0.0 이상
```

프로젝트 루트의 [README.md](../README.md)를 참고하여 설치하세요.

---

## Swagger 문서

### API 문서 접근

- **API Docs (JSON)**: http://172.25.1.24:8080/main/v1/v3/api-docs
- **Swagger UI**: http://172.25.1.24:8080/main/v1/swagger-ui/swagger-ui/index.html#/

### Swagger JSON 다운로드

```bash
# API Docs JSON 다운로드
curl http://172.25.1.24:8080/main/v1/v3/api-docs > swagger.json
```

---

## 아키텍처

### 디렉토리 구조

```
packages/api/src/
├── __generated__/                # OpenAPI Generator 원본 출력 (중간 산물)
│   └── models/                   # 개별 타입 파일들
├── generated-types/              # 통합된 타입 파일들 (사용)
│   ├── api-base.types.ts        # 공통 API 응답 타입
│   ├── auth.types.ts            # 인증 관련 타입
│   ├── member.types.ts          # 회원 관련 타입
│   ├── account.types.ts         # 계좌 관련 타입
│   ├── stock.types.ts           # 주식 관련 타입
│   ├── trade.types.ts           # 거래 관련 타입
│   ├── asset.types.ts           # 자산 관련 타입
│   ├── watch-list.types.ts      # 관심종목 관련 타입
│   ├── terms.types.ts           # 약관 관련 타입
│   ├── common.types.ts          # 공통 타입
│   └── index.ts                 # 전체 export
├── services/                     # 수동 작성 서비스 (기존)
│   ├── user.service.ts          # 사용자 서비스 (유지)
│   ├── auth.service.ts          # 인증 서비스 (유지)
│   └── generated/               # 자동 생성 서비스 (신규)
│       ├── auth.service.ts      # 인증 서비스 (생성)
│       ├── member.service.ts    # 회원 서비스 (생성)
│       ├── account.service.ts   # 계좌 서비스 (생성)
│       ├── stock.service.ts     # 주식 서비스 (생성)
│       ├── trade.service.ts     # 거래 서비스 (생성)
│       ├── asset.service.ts     # 자산 서비스 (생성)
│       ├── watchlist.service.ts # 관심종목 서비스 (생성)
│       ├── terms.service.ts     # 약관 서비스 (생성)
│       └── index.ts             # 전체 export
└── types/                        # 수동 작성 타입 (기존)
    ├── api.types.ts
    └── user.types.ts
```

### 데이터 흐름

```
Swagger JSON
    ↓
OpenAPI Generator (typescript-axios)
    ↓
packages/api/src/__generated__/models/ (개별 타입 파일 - 중간 산물)
    ↓
consolidate-generated-types.ts 스크립트
    ↓
packages/api/src/generated-types/ (도메인별 통합 타입)
    ↓
generate-services.ts 스크립트
    ↓
packages/api/src/services/generated/ (서비스 클래스)
```

---

## 설정 파일

### 1. openapi-generator-config.yaml

OpenAPI Generator의 기본 설정 파일입니다.

```yaml
# 생성 옵션
npmName: '@template/api'
npmVersion: '1.0.0'
supportsES6: true
withInterfaces: true
useSingleRequestParameter: false

# TypeScript 옵션
modelPropertyNaming: 'original'
paramNaming: 'camelCase'
enumPropertyNaming: 'original'

# 템플릿 디렉토리
templateDir: 'openapi-templates/typescript-axios'
```

### 2. 커스텀 템플릿

`openapi-templates/typescript-axios/` 디렉토리에 커스텀 Mustache 템플릿이 있습니다.

주요 수정 사항:
- **modelGeneric.mustache**: enum을 type union으로 변환
- **model.mustache**: 타입 정의 방식 수정

### 3. 도메인 매핑 (consolidate-generated-types.ts)

```typescript
const domainMapping: Record<string, string[]> = {
  'auth.types.ts': [
    'auth-login-request',
    'auth-login-response',
    'auth-refresh-token-request',
    // ...
  ],
  'member.types.ts': [
    'member-approve-request',
    'member-join-response',
    // ...
  ],
  // ... 기타 도메인
};
```

---

## 자동 생성 프로세스

### 전체 프로세스 실행

```bash
# 1단계: Swagger JSON 다운로드
curl http://172.25.1.24:8080/main/v1/v3/api-docs > swagger.json

# 2단계: API 클라이언트 및 타입 생성 (OpenAPI Generator + 통합)
pnpm run generate:api

# 3단계: 서비스 클래스 생성
pnpm run generate:services
```

### 단계별 설명

#### 1. OpenAPI Generator 실행

```bash
node scripts/generate-api.js
```

**작업 내용:**
- Swagger JSON을 읽어 TypeScript 타입 생성
- `packages/api/src/__generated__/models/` 에 개별 파일 생성
- 자동으로 `consolidate-generated-types.ts` 실행

#### 2. 타입 통합 (자동 실행)

```bash
pnpm exec tsx scripts/consolidate-generated-types.ts
```

**작업 내용:**
- 개별 타입 파일을 도메인별로 통합
- `ApiSuccessResponse` 패턴 적용
- `*TypeType` 중복 제거 → `*Type`
- `packages/api/src/generated-types/` 에 통합 파일 생성

#### 3. 서비스 클래스 생성

```bash
pnpm exec tsx scripts/generate-services.ts
```

**작업 내용:**
- Swagger JSON의 paths를 분석하여 서비스 클래스 생성
- 태그별로 서비스 그룹화
- 모든 URL에 `/main/v1/` prefix 자동 추가
- `packages/api/src/services/generated/` 에 서비스 파일 생성

---

## 사용 가이드

### 기존 서비스 (계속 사용)

기존에 작성된 서비스들은 **그대로 유지**하고 계속 사용합니다.

```typescript
// packages/api/src/services/user.service.ts (기존)
import { userService } from '@template/api';

// 기존 방식대로 계속 사용
const user = await userService.getUser(userId);
```

### 신규 서비스 (자동 생성 사용)

**새로 추가하는 기능부터는 자동 생성된 서비스를 사용합니다.**

#### 1. 타입 Import

```typescript
import {
  AuthLoginRequest,
  AuthLoginResponse,
  ResponseDataAuthLoginResponse,
  MemberApproveRequest,
  MemberApproveRequestMemberType,
} from '@template/api/generated-types';
```

#### 2. 서비스 사용

```typescript
// packages/api/src/services/generated/auth.service.ts 사용
import { AuthService } from '@template/api/services/generated';
import { axiosInstance } from '@template/api/axios';

const authService = new AuthService(axiosInstance);

// 로그인
const response = await authService.loginForWeb({
  email: 'test@example.com',
  password: 'password123',
});

// 응답 타입은 자동으로 추론됨
const loginData = response.data; // ResponseDataAuthLoginResponse 타입
```

#### 3. Vue 컴포넌트에서 사용

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { AuthService } from '@template/api/services/generated';
import { AuthLoginRequest, ResponseDataAuthLoginResponse } from '@template/api/generated-types';
import { axiosInstance } from '@template/api/axios';

const authService = new AuthService(axiosInstance);

const loginForm = ref<AuthLoginRequest>({
  email: '',
  password: '',
});

const handleLogin = async () => {
  try {
    const response = await authService.loginForWeb(loginForm.value);
    
    if (response.data.data) {
      const { memberId, memberType, accountInfo } = response.data.data;
      console.log('로그인 성공:', memberId, memberType);
    }
  } catch (error) {
    console.error('로그인 실패:', error);
  }
};
</script>
```

### API 응답 타입 패턴

모든 API 응답은 `ApiSuccessResponse<T>` 패턴을 따릅니다.

```typescript
// api-base.types.ts
export interface ApiSuccessResponse<T> {
  status: string;
  code: number;
  data?: T;  // 옵셔널 (일부 API는 data 없음)
}

// 사용 예시
type LoginResponse = ApiSuccessResponse<AuthLoginResponse>;

// 실제 응답 구조
{
  status: "SUCCESS",
  code: 200,
  data: {
    memberId: 123,
    memberType: "INDIVIDUAL",
    // ...
  }
}
```

---

## 마이그레이션 전략

### 단계별 전환 계획

#### Phase 1: 병행 사용 (현재)

- ✅ 기존 서비스: 그대로 유지하고 계속 사용
- ✅ 신규 기능: 자동 생성된 서비스 사용
- 📝 점진적으로 자동 생성 서비스에 익숙해지기

#### Phase 2: 선택적 마이그레이션

- 🔄 복잡한 비즈니스 로직이 없는 간단한 서비스부터 전환
- 🔄 자동 생성 서비스를 래핑하여 기존 인터페이스 유지
- 📝 팀 내 합의 후 진행

#### Phase 3: 완전 전환 (장기)

- 🎯 모든 신규 API는 자동 생성 사용
- 🎯 기존 서비스는 필요시에만 유지
- 🎯 레거시 제거 계획 수립

### 마이그레이션 예시

기존 수동 작성 서비스를 래핑하는 방법:

```typescript
// services/auth.service.ts (기존 - 래퍼로 변경)
import { AuthService as GeneratedAuthService } from './generated';
import { axiosInstance } from '../axios';

export class AuthService {
  private generatedService: GeneratedAuthService;

  constructor() {
    this.generatedService = new GeneratedAuthService(axiosInstance);
  }

  // 기존 메서드명 유지하면서 내부적으로 generated 사용
  async login(email: string, password: string) {
    const response = await this.generatedService.loginForWeb({
      email,
      password,
    });
    
    // 필요시 추가 로직 처리
    return response.data;
  }

  // 복잡한 비즈니스 로직이 있는 메서드는 그대로 유지
  async loginWithOAuth() {
    // 커스텀 로직...
  }
}

export const authService = new AuthService();
```

---

## FAQ

### Q1. 기존 서비스를 언제 자동 생성으로 바꿔야 하나요?

**A:** 당장 바꿀 필요는 없습니다. 기존 서비스는 계속 사용하시고, **새로 추가하는 API부터** 자동 생성된 서비스를 사용하세요.

### Q2. Swagger가 업데이트되면 어떻게 하나요?

**A:** 다음 명령어를 실행하면 자동으로 타입과 서비스가 업데이트됩니다.

```bash
# Swagger JSON 다운로드
curl http://172.25.1.24:8080/main/v1/v3/api-docs > swagger.json

# 재생성
pnpm run generate:api
pnpm run generate:services
```

### Q3. 자동 생성된 서비스를 커스터마이징할 수 있나요?

**A:** 자동 생성 파일은 직접 수정하지 마세요. 대신 래퍼 클래스를 만들어 사용하세요.

```typescript
// services/custom-auth.service.ts
import { AuthService } from './generated';

export class CustomAuthService extends AuthService {
  // 추가 메서드나 로직
  async loginWithCustomLogic() {
    // ...
  }
}
```

### Q4. 타입이 중복으로 생성되는 것 같아요 (예: *TypeType)

**A:** `consolidate-generated-types.ts` 스크립트가 자동으로 `*TypeType` → `*Type`으로 변환합니다.

예시:
- 생성: `MemberApproveRequestMemberTypeType`
- 변환: `MemberApproveRequestMemberType` ✅

### Q5. API URL prefix를 변경하고 싶어요

**A:** `scripts/generate-services.ts` 파일의 `API_PREFIX` 상수를 수정하세요.

```typescript
// scripts/generate-services.ts
const API_PREFIX = '/main/v1';  // 여기를 수정
```

### Q6. 특정 도메인의 타입만 재생성할 수 있나요?

**A:** 현재는 전체 재생성만 지원합니다. 부분 생성이 필요하면 스크립트를 수정해야 합니다.

### Q7. 생성된 서비스에 인터셉터를 어떻게 추가하나요?

**A:** 서비스 생성 시 전달하는 `axiosInstance`에 인터셉터를 설정하세요.

```typescript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://api.example.com',
});

// 인터셉터 추가
axiosInstance.interceptors.request.use((config) => {
  // 토큰 추가 등
  return config;
});

// 서비스 생성
const authService = new AuthService(axiosInstance);
```

---

## 추가 리소스

- [OpenAPI Generator 공식 문서](https://openapi-generator.tech/)
- [TypeScript Axios Generator](https://openapi-generator.tech/docs/generators/typescript-axios/)
- [프로젝트 아키텍처 문서](./architecture.md)
- [패키지 관리 가이드](./package-management.md)

---

## 변경 이력

### 2024-10-10
- ✅ 자동 생성 시스템 구축 완료
- ✅ API URL prefix `/main/v1/` 자동 추가
- ✅ `ApiSuccessResponse` data 옵셔널 처리
- ✅ `*TypeType` 중복 제거 패턴 추가
- ✅ 도메인별 타입 통합 완료
- ✅ 서비스 클래스 자동 생성 완료

---

## 문의 및 지원

문제가 발생하거나 개선 사항이 있으면 팀 채널에 공유해주세요.

