import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '../components/BaseButton.vue';

/**
 * BaseButton 컴포넌트 스토리
 *
 * Naive UI를 기반으로 한 재사용 가능한 버튼 컴포넌트입니다.
 * 다양한 variant, size, 상태를 지원하며 자동 문서화가 활성화되어 있습니다.
 */
const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Naive UI를 기반으로 한 재사용 가능한 버튼 컴포넌트입니다. 다양한 스타일 변형과 크기를 지원하며, 로딩 상태, 비활성화 상태 등을 제공합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'default',
        'dashed',
        'text',
      ],
      description: '버튼 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['tiny', 'small', 'medium', 'large', 'huge'],
      description: '버튼 크기',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'HTML button 타입',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
    },
    round: {
      control: { type: 'boolean' },
      description: '둥근 모서리',
    },
    circle: {
      control: { type: 'boolean' },
      description: '원형 버튼',
    },
    ghost: {
      control: { type: 'boolean' },
      description: '고스트 스타일',
    },
    secondary: {
      control: { type: 'boolean' },
      description: '보조 스타일',
    },
    tertiary: {
      control: { type: 'boolean' },
      description: '3차 스타일',
    },
    quaternary: {
      control: { type: 'boolean' },
      description: '4차 스타일',
    },
    color: {
      control: { type: 'color' },
      description: '커스텀 색상',
    },
    textColor: {
      control: { type: 'color' },
      description: '텍스트 색상',
    },
    borderColor: {
      control: { type: 'color' },
      description: '테두리 색상',
    },
    iconPlacement: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: '아이콘 위치',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 버튼
 */
export const Default: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">기본 버튼</BaseButton>',
  }),
};

/**
 * Primary 버튼
 */
export const Primary: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Primary 버튼</BaseButton>',
  }),
  args: {
    variant: 'primary',
  },
};

/**
 * Secondary 버튼
 */
export const Secondary: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Secondary 버튼</BaseButton>',
  }),
  args: {
    variant: 'secondary',
  },
};

/**
 * Success 버튼
 */
export const Success: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Success 버튼</BaseButton>',
  }),
  args: {
    variant: 'success',
  },
};

/**
 * Warning 버튼
 */
export const Warning: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Warning 버튼</BaseButton>',
  }),
  args: {
    variant: 'warning',
  },
};

/**
 * Danger 버튼
 */
export const Danger: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Danger 버튼</BaseButton>',
  }),
  args: {
    variant: 'danger',
  },
};

/**
 * Info 버튼
 */
export const Info: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">Info 버튼</BaseButton>',
  }),
  args: {
    variant: 'info',
  },
};

/**
 * 다양한 크기
 */
export const Sizes: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <BaseButton size="tiny">Tiny</BaseButton>
        <BaseButton size="small">Small</BaseButton>
        <BaseButton size="medium">Medium</BaseButton>
        <BaseButton size="large">Large</BaseButton>
        <BaseButton size="huge">Huge</BaseButton>
      </div>
    `,
  }),
};

/**
 * 로딩 상태
 */
export const Loading: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">로딩 중...</BaseButton>',
  }),
  args: {
    loading: true,
  },
};

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">비활성화</BaseButton>',
  }),
  args: {
    disabled: true,
  },
};

/**
 * 전체 너비
 */
export const FullWidth: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">전체 너비 버튼</BaseButton>',
  }),
  args: {
    fullWidth: true,
  },
};

/**
 * 둥근 모서리
 */
export const Round: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">둥근 버튼</BaseButton>',
  }),
  args: {
    round: true,
  },
};

/**
 * 고스트 스타일
 */
export const Ghost: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args">고스트 버튼</BaseButton>',
  }),
  args: {
    ghost: true,
  },
};
