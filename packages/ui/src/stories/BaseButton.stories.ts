import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import BaseButton from '../components/BaseButton.vue';

/**
 * BaseButton 컴포넌트
 *
 * 다양한 variant, size, 상태를 지원하는 버튼 컴포넌트입니다.
 * 디자인 토큰을 기반으로 일관된 스타일을 제공합니다.
 */
const meta = {
  title: 'Components/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 (스피너 표시)',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
} as Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Primary 버튼
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Primary Button</BaseButton>',
  }),
};

/**
 * Secondary 버튼
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Secondary Button</BaseButton>',
  }),
};

/**
 * Success 버튼
 */
export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Success Button</BaseButton>',
  }),
};

/**
 * Warning 버튼
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Warning Button</BaseButton>',
  }),
};

/**
 * Danger 버튼
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Danger Button</BaseButton>',
  }),
};

/**
 * Info 버튼
 */
export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Info Button</BaseButton>',
  }),
};

/**
 * 크기별 버튼들
 */
export const Sizes: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <BaseButton v-bind="args" size="sm" @click="args.onClick">Small</BaseButton>
        <BaseButton v-bind="args" size="md" @click="args.onClick">Medium</BaseButton>
        <BaseButton v-bind="args" size="lg" @click="args.onClick">Large</BaseButton>
      </div>
    `,
  }),
};

/**
 * 비활성화된 버튼
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Disabled Button</BaseButton>',
  }),
};

/**
 * 로딩 상태 버튼
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Loading Button</BaseButton>',
  }),
};

/**
 * 전체 너비 버튼
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: '<BaseButton v-bind="args" @click="args.onClick">Full Width Button</BaseButton>',
  }),
};

/**
 * 모든 variant를 한번에 보기
 */
export const AllVariants: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <BaseButton variant="primary" @click="args.onClick">Primary</BaseButton>
          <BaseButton variant="secondary" @click="args.onClick">Secondary</BaseButton>
          <BaseButton variant="success" @click="args.onClick">Success</BaseButton>
          <BaseButton variant="warning" @click="args.onClick">Warning</BaseButton>
          <BaseButton variant="danger" @click="args.onClick">Danger</BaseButton>
          <BaseButton variant="info" @click="args.onClick">Info</BaseButton>
        </div>
      </div>
    `,
  }),
};
