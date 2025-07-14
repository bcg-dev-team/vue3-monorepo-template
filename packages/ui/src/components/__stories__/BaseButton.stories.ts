import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '../BaseButton.vue';

import '@template/theme/styles/_tokens-light.css';
import '@template/theme/styles/_tokens-dark.css';

/**
 * BaseButton 컴포넌트 스토리
 * 피그마 디자인 1:1 반영, 디자인 토큰 기반, 테마 지원
 */
const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '피그마 디자인을 1:1 반영한 기본 버튼 컴포넌트입니다. 디자인 토큰을 기반으로 하며 라이트/다크 테마를 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'red', 'blue', 'pill'],
      description: '버튼 스타일 변형 (피그마 variant와 동일)',
    },
    size: {
      control: 'select',
      options: ['regular', 'small', 'small-inner', 'pill'],
      description: '버튼 크기 (피그마 size와 동일)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    icon: {
      control: false,
      description: '아이콘 컴포넌트',
    },
    iconPlacement: {
      control: 'select',
      options: ['left', 'right'],
      description: '아이콘 위치',
    },
    subText: {
      control: 'text',
      description: '서브 텍스트',
    },
  },
  args: {
    variant: 'primary',
    size: 'regular',
    disabled: false,
    loading: false,
    iconPlacement: 'left',
    subText: '',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">기본 버튼</BaseButton>',
  }),
};

// 모든 Variant 스토리
export const AllVariants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-col gap-6">
        <h3 class="text-lg font-semibold">모든 Variant</h3>
        <div class="flex gap-4">
          <BaseButton variant="primary">Primary</BaseButton>
          <BaseButton variant="outline">Outline</BaseButton>
          <BaseButton variant="red">Red</BaseButton>
          <BaseButton variant="blue">Blue</BaseButton>
          <BaseButton variant="pill" size="pill">Pill</BaseButton>
        </div>
      </div>
    `,
  }),
};

// 모든 Size 스토리
export const AllSizes: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-col gap-6">
        <h3 class="text-lg font-semibold">모든 Size</h3>
        <div class="flex flex-col gap-3">
          <div class="flex flex-row items-center mb-1">
            <span class="inline-block w-28 text-base font-medium">Regular:</span>
            <BaseButton size="regular" class="ml-2">Regular</BaseButton>
          </div>
          <div class="flex flex-row items-center mb-1">
            <span class="inline-block w-28 text-base font-medium">Small:</span>
            <BaseButton size="small" class="ml-2">Small</BaseButton>
          </div>
          <div class="flex flex-row items-center mb-1">
            <span class="inline-block w-28 text-base font-medium">Small Inner:</span>
            <BaseButton size="small-inner" class="ml-2">Small Inner</BaseButton>
          </div>
          <div class="flex flex-row items-center mb-1">
            <span class="inline-block w-28 text-base font-medium">Pill:</span>
            <BaseButton size="pill" class="ml-2">Pill</BaseButton>
          </div>
        </div>
      </div>
    `,
  }),
};

// 모든 상태 스토리
export const AllStates: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-col gap-6">
        <h3 class="text-lg font-semibold">모든 상태</h3>
        <div class="flex gap-4">
          <BaseButton>Normal</BaseButton>
          <BaseButton disabled>Disabled</BaseButton>
          <BaseButton loading>Loading</BaseButton>
        </div>
      </div>
    `,
  }),
};

// 인터랙션 테스트 스토리
export const Interactive: Story = {
  render: () => ({
    components: { BaseButton },
    data() {
      return {
        clickCount: 0,
      };
    },
    template: `
      <div class="flex flex-col gap-4">
        <BaseButton @click="clickCount++">
          클릭 횟수: {{ clickCount }}
        </BaseButton>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          버튼을 클릭하여 이벤트 핸들링을 테스트하세요.
        </div>
      </div>
    `,
  }),
};

// 테마 테스트 스토리
export const ThemeTest: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">테마 전환 테스트</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            브라우저의 다크모드를 켜고 끄면서 색상 변화를 확인하세요.
          </p>
        </div>
        <div class="flex gap-4">
          <BaseButton variant="primary">Primary</BaseButton>
          <BaseButton variant="outline">Outline</BaseButton>
          <BaseButton variant="red">Red</BaseButton>
          <BaseButton variant="blue">Blue</BaseButton>
        </div>
      </div>
    `,
  }),
};

// 키보드 네비게이션 테스트 스토리
export const KeyboardNavigation: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-col gap-6">
        <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">키보드 네비게이션 테스트</h3>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Tab 키를 눌러 포커스를 이동하고, Enter/Space 키로 클릭을 테스트하세요.
          </p>
        </div>
        <div class="flex gap-4">
          <BaseButton>첫 번째 버튼</BaseButton>
          <BaseButton variant="outline">두 번째 버튼</BaseButton>
          <BaseButton variant="red">세 번째 버튼</BaseButton>
          <BaseButton disabled>비활성화 버튼</BaseButton>
        </div>
      </div>
    `,
  }),
};
