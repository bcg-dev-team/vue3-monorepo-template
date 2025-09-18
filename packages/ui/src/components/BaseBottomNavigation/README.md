# BaseBottomNavigation

Material UI의 Bottom Navigation을 참고하여 구현된 Vue 3 하단 네비게이션 컴포넌트입니다.

## 빠른 시작

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
  },
  {
    value: 'search',
    label: '검색',
    icon: 'search',
  },
  {
    value: 'favorites',
    label: '즐겨찾기',
    icon: 'heart',
  },
];

const selectedValue = ref('home');

const handleChange = (value: string | number, item: BottomNavigationItem) => {
  selectedValue.value = value;
};
</script>
```

## 주요 특징

- ✅ 3-5개의 네비게이션 아이템 지원
- ✅ 아이콘과 라벨 표시
- ✅ 50px 고정 높이
- ✅ 하단 고정 옵션
- ✅ 접근성 지원
- ✅ 반응형 디자인
- ✅ TypeScript 지원

## 파일 구조

```
BaseBottomNavigation/
├── BaseBottomNavigation.vue      # 메인 컴포넌트
├── BaseBottomNavigation.scss     # 스타일 파일
├── index.ts                      # Export 파일
├── docs/
│   └── BaseBottomNavigation.md   # 상세 문서
├── stories/
│   └── BaseBottomNavigation.stories.ts  # Storybook 스토리
└── README.md                     # 이 파일
```

## 더 자세한 정보

- [상세 문서](./docs/BaseBottomNavigation.md)
- [Storybook 예시](./stories/BaseBottomNavigation.stories.ts)
