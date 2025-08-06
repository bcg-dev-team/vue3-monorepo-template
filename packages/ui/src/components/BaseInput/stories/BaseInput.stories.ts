import type { Meta, StoryObj } from '@storybook/vue3';
import BaseInput from '../BaseInput.vue';

const meta: Meta<typeof BaseInput> = {
  title: 'Inputs/BaseInput',
  component: BaseInput,
  parameters: {
    docs: {
      description: {
        component: `공통 스타일/상태/slot만 담당하는 베이스 컴포넌트입니다.\nFigma 링크: [Figma 링크](https://www.figma.com/)`,
      },
    },
  },
  argTypes: {
    modelValue: {
      description: '입력값 (v-model)',
      control: 'text',
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text',
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
    readonly: {
      description: '읽기 전용 여부',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '기본 입력 필드',
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    modelValue: '비활성화',
    placeholder: '비활성화 입력',
    disabled: true,
  },
};

// 읽기 전용
export const Readonly: Story = {
  args: {
    modelValue: '읽기 전용',
    placeholder: '읽기 전용 입력',
    readonly: true,
  },
};

// prefix slot 예시
export const WithPrefix: Story = {
  render: (args) => ({
    components: { BaseInput },
    setup: () => ({ args }),
    template: `
      <BaseInput v-bind="args">
        <template #prefix>
          <span class="text-default-muted text-font-16">+82</span>
        </template>
      </BaseInput>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: '전화번호 입력',
  },
};

// suffix slot 예시
export const WithSuffix: Story = {
  render: (args) => ({
    components: { BaseInput },
    setup: () => ({ args }),
    template: `
      <BaseInput v-bind="args">
        <template #suffix>
          <span class="text-default-muted text-font-16">원</span>
        </template>
      </BaseInput>
    `,
  }),
  args: {
    modelValue: '10000',
    placeholder: '금액 입력',
  },
};

// append slot 예시 (한 줄로 자연스럽게 표시)
export const WithAppend: Story = {
  render: (args) => ({
    components: { BaseInput },
    setup: () => ({ args }),
    template: `
      <BaseInput v-bind="args">
        <template #append>
          <span class="text-red text-font-12 font-bold whitespace-nowrap inline-block">남은 시간 2:56</span>
        </template>
      </BaseInput>
    `,
  }),
  args: {
    modelValue: '031841',
    placeholder: '인증번호',
  },
};

// suffix slot에 남은 시간 표시 (한 줄)
export const WithSuffixTimer: Story = {
  render: (args) => ({
    components: { BaseInput },
    setup: () => ({ args }),
    template: `
      <BaseInput v-bind="args">
        <template #suffix>
          <span class="text-red text-font-12 font-bold whitespace-nowrap inline-block">남은 시간 2:56</span>
        </template>
      </BaseInput>
    `,
  }),
  args: {
    modelValue: '031841',
    placeholder: '인증번호',
  },
};
