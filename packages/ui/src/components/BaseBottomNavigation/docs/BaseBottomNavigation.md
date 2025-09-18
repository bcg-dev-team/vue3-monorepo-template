# BaseBottomNavigation

Material UI의 Bottom Navigation을 참고하여 구현된 Vue 3 하단 네비게이션 컴포넌트입니다.

## 특징

- 3-5개의 네비게이션 아이템을 하단에 표시
- 각 아이템은 아이콘과 라벨을 가짐
- 3개 이하일 때는 라벨을 항상 표시, 4-5개일 때는 선택적으로 표시
- 하단 고정 옵션 제공
- 접근성 지원 (ARIA 라벨, 키보드 네비게이션)
- 반응형 디자인 지원
- 50px 고정 높이

## 사용법

### 기본 사용법

```vue
<template>
  <BaseBottomNavigation
    :items="navigationItems"
    :value="selectedValue"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BaseBottomNavigation, type BottomNavigationItem } from '@template/ui';

const navigationItems: BottomNavigationItem[] = [
  {
    value: 'home',
    label: '홈',
    icon: 'home',
    iconSize: 'md',
  },
  {
    value: 'search',
    label: '검색',
    icon: 'search',
    iconSize: 'md',
  },
  {
    value: 'favorites',
    label: '즐겨찾기',
    icon: 'heart',
    iconSize: 'md',
  },
];

const selectedValue = ref('home');

const handleChange = (value: string | number, item: BottomNavigationItem) => {
  selectedValue.value = value;
  console.log('Selected:', value, item);
};
</script>
```

### 4개 이상의 아이템 (아이콘만)

```vue
<template>
  <BaseBottomNavigation
    :items="fourItems"
    :value="selectedValue"
    :show-labels="false"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
const fourItems: BottomNavigationItem[] = [
  {
    value: 'home',
    label: '홈',
    icon: 'home',
    iconSize: 'md',
  },
  {
    value: 'search',
    label: '검색',
    icon: 'search',
    iconSize: 'md',
  },
  {
    value: 'favorites',
    label: '즐겨찾기',
    icon: 'heart',
    iconSize: 'md',
  },
  {
    value: 'profile',
    label: '프로필',
    icon: 'user',
    iconSize: 'md',
  },
];
</script>
```

### 비활성화된 아이템 포함

```vue
<template>
  <BaseBottomNavigation
    :items="itemsWithDisabled"
    :value="selectedValue"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
const itemsWithDisabled: BottomNavigationItem[] = [
  {
    value: 'home',
    label: '홈',
    icon: 'home',
    iconSize: 'md',
  },
  {
    value: 'search',
    label: '검색',
    icon: 'search',
    iconSize: 'md',
    disabled: true, // 비활성화
  },
  {
    value: 'favorites',
    label: '즐겨찾기',
    icon: 'heart',
    iconSize: 'md',
  },
];
</script>
```

### 고정되지 않은 네비게이션

```vue
<template>
  <BaseBottomNavigation
    :items="navigationItems"
    :value="selectedValue"
    :fixed="false"
    @change="handleChange"
  />
</template>
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `items` | `BottomNavigationItem[]` | - | 네비게이션 아이템 배열 (필수) |
| `value` | `string \| number` | `undefined` | 현재 선택된 아이템의 값 |
| `showLabels` | `boolean` | `undefined` | 라벨 표시 여부 (3개 이하일 때는 자동으로 true) |
| `fixed` | `boolean` | `true` | 하단 고정 여부 |
| `customClass` | `string` | `''` | 커스텀 클래스 |

## BottomNavigationItem 타입

```typescript
interface BottomNavigationItem {
  /** 아이템의 고유 값 */
  value: string | number;
  /** 아이템 라벨 */
  label: string;
  /** 아이콘 이름 */
  icon: string;
  /** 아이콘 크기 */
  iconSize?: 'sm' | 'md' | 'lg';
  /** 아이콘 색상 */
  iconColor?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 커스텀 클래스 */
  customClass?: string;
}
```

## Events

| 이벤트 | 타입 | 설명 |
|--------|------|------|
| `change` | `(value: string \| number, item: BottomNavigationItem) => void` | 선택된 아이템이 변경될 때 발생 |

## 스타일링

컴포넌트는 SCSS를 사용하여 스타일링되며, 프로젝트의 디자인 토큰을 사용합니다.

### 주요 CSS 클래스

- `.base-bottom-navigation`: 메인 컨테이너
- `.base-bottom-navigation--fixed`: 고정된 네비게이션
- `.base-bottom-navigation--with-labels`: 라벨이 표시되는 네비게이션
- `.base-bottom-navigation--icons-only`: 아이콘만 표시되는 네비게이션
- `.base-bottom-navigation__item`: 개별 아이템
- `.base-bottom-navigation__item--active`: 활성화된 아이템
- `.base-bottom-navigation__item--disabled`: 비활성화된 아이템
- `.base-bottom-navigation__icon`: 아이콘 컨테이너
- `.base-bottom-navigation__label`: 라벨 텍스트

### 색상 토큰

- **활성 상태**: `var(--base-colors-primary-primary800)` (#ffc300)
- **기본 상태**: `var(--base-colors-neutral-neutral600)`
- **비활성화 상태**: `var(--base-colors-neutral-neutral400)`
- **배경**: `var(--base-colors-neutral-neutral000)`
- **테두리**: `var(--base-colors-neutral-neutral200)`

## 접근성

- `role="navigation"` 속성으로 네비게이션 역할 명시
- `aria-label`로 네비게이션 설명 제공
- `aria-current="page"`로 현재 페이지 표시
- 키보드 네비게이션 지원
- 포커스 표시기 제공

## 반응형 디자인

- 모바일 화면에서 패딩과 폰트 크기 자동 조정
- 480px 이하에서 더욱 컴팩트한 레이아웃
- 터치 친화적인 버튼 크기

## 브라우저 지원

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 예시

더 많은 사용 예시는 Storybook에서 확인할 수 있습니다:

```bash
npm run storybook
```

그리고 `Components/BaseBottomNavigation` 섹션을 참조하세요.
