/**
 * BaseList 컴포넌트 Storybook 스토리
 */
import type { ListItem } from '../../../types/components';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseList from '../BaseList.vue';

const meta: Meta<typeof BaseList> = {
  title: 'List/BaseList',
  component: BaseList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
BaseList는 접근성과 기능성을 고려한 리스트 컴포넌트입니다.

## 주요 기능
- 아이템 선택 (단일/다중)
- 중첩 리스트 지원
- 아바타/이미지 표시
- 액션 버튼
- 키보드 내비게이션
- ARIA 지원

## 접근성
- WAI-ARIA 가이드라인 준수
- 키보드 내비게이션 (화살표 키, Home, End, Enter, Space)
- 스크린 리더 지원
- 포커스 관리
        `,
      },
    },
    accessibility: {
      config: {
        rules: [
          {
            id: 'list',
            enabled: true,
          },
          {
            id: 'listitem',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    items: {
      description: '리스트 아이템 배열',
      control: { type: 'object' },
      table: {
        type: { summary: 'ListItem[]' },
        category: 'Props',
      },
    },
    selectable: {
      description: '아이템 선택 가능 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    multiSelect: {
      description: '다중 선택 가능 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    dense: {
      description: '조밀한 간격 사용 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    disablePadding: {
      description: '패딩 비활성화 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    subheader: {
      description: '서브헤더 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    variant: {
      description: '리스트 스타일',
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated'],
      table: {
        type: { summary: 'default | outlined | elevated' },
        defaultValue: { summary: 'default' },
        category: 'Props',
      },
    },
    size: {
      description: '리스트 크기',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    isLoading: {
      description: '로딩 상태 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    skeletonItems: {
      description: '스켈레톤 아이템 개수',
      control: { type: 'number', min: 1, max: 20 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
        category: 'Props',
      },
    },
  },
  args: {
    items: [],
    selectable: false,
    multiSelect: false,
    dense: false,
    disablePadding: false,
    variant: 'default',
    size: 'md',
    isLoading: false,
    skeletonItems: 5,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터
const sampleItems: ListItem[] = [
  {
    id: 1,
    title: '사용자 관리',
    subtitle: '시스템 사용자 계정 관리',
    description: '사용자 생성, 수정, 삭제 및 권한 관리',
    avatar: 'UM',
    actions: [
      {
        id: 'edit',
        label: '편집',
        icon: 'edit',
        variant: 'primary',
        onClick: (item) => console.log('편집:', item),
      },
      {
        id: 'delete',
        label: '삭제',
        icon: 'trash',
        variant: 'danger',
        onClick: (item) => console.log('삭제:', item),
      },
    ],
  },
  {
    id: 2,
    title: '제품 관리',
    subtitle: '제품 정보 및 재고 관리',
    description: '제품 등록, 수정, 삭제 및 재고 현황',
    avatar: 'PM',
    actions: [
      {
        id: 'view',
        label: '보기',
        icon: 'eye',
        variant: 'default',
        onClick: (item) => console.log('보기:', item),
      },
    ],
  },
  {
    id: 3,
    title: '주문 관리',
    subtitle: '고객 주문 처리 및 관리',
    description: '주문 접수, 처리, 배송 상태 관리',
    avatar: 'OM',
    children: [
      {
        id: '3-1',
        title: '신규 주문',
        subtitle: '처리 대기 중',
        avatar: 'N',
      },
      {
        id: '3-2',
        title: '처리 중',
        subtitle: '배송 준비 중',
        avatar: 'P',
      },
    ],
  },
  {
    id: 4,
    title: '고객 지원',
    subtitle: '고객 문의 및 지원',
    description: '고객 문의 접수, 응답, 해결',
    avatar: 'CS',
  },
];

const imageItems: ListItem[] = [
  {
    id: 1,
    title: '사용자 프로필',
    subtitle: 'john.doe@example.com',
    description: '시스템 관리자',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    title: '제품 이미지',
    subtitle: '전자제품 카테고리',
    description: '최신 스마트폰 모델',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop',
  },
];

// 기본 리스트
export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

// 선택 가능한 리스트
export const Selectable: Story = {
  args: {
    items: sampleItems,
    selectable: true,
  },
};

// 다중 선택 리스트
export const MultiSelect: Story = {
  args: {
    items: sampleItems,
    selectable: true,
    multiSelect: true,
    selectedItems: [1, 3],
  },
};

// 조밀한 간격
export const Dense: Story = {
  args: {
    items: sampleItems,
    dense: true,
  },
};

// 아웃라인 스타일
export const Outlined: Story = {
  args: {
    items: sampleItems,
    variant: 'outlined',
  },
};

// 그림자 효과
export const Elevated: Story = {
  args: {
    items: sampleItems,
    variant: 'elevated',
  },
};

// 서브헤더 포함
export const WithSubheader: Story = {
  args: {
    items: sampleItems,
    subheader: '시스템 관리 메뉴',
  },
};

// 이미지 아이템
export const WithImages: Story = {
  args: {
    items: imageItems,
    variant: 'outlined',
  },
};

// 로딩 상태
export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
    skeletonItems: 8,
  },
};

// 빈 상태
export const Empty: Story = {
  args: {
    items: [],
    subheader: '검색 결과',
  },
};

// Small 크기
export const Small: Story = {
  args: {
    items: sampleItems.slice(0, 2),
    size: 'sm',
  },
};

// Large 크기
export const Large: Story = {
  args: {
    items: sampleItems.slice(0, 2),
    size: 'lg',
  },
};
