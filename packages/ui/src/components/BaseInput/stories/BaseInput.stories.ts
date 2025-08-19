import type { Meta, StoryObj } from '@storybook/vue3';
import BaseInput from '../BaseInput.vue';

const meta: Meta<typeof BaseInput> = {
  title: 'Inputs/Input',
  component: BaseInput,
  parameters: {
    docs: {
      description: {
        component:
          '모든 Input 타입의 공통 베이스 컴포넌트입니다. 피그마 디자인 토큰을 기반으로 구현되었으며, 다양한 상태와 크기를 지원합니다.',
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
    size: {
      description: '크기',
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
    error: {
      description: '에러 상태 여부',
      control: 'boolean',
    },
    errorMessage: {
      description: '에러 메시지',
      control: 'text',
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
    size: 'md',
  },
};

// 작은 크기
export const Small: Story = {
  args: {
    modelValue: '',
    placeholder: '작은 크기 입력',
    size: 'sm',
  },
};

// 중간 크기
export const Medium: Story = {
  args: {
    modelValue: '',
    placeholder: '중간 크기 입력',
    size: 'md',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    modelValue: '비활성화된 입력',
    placeholder: '비활성화된 입력',
    disabled: true,
    size: 'md',
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    modelValue: '에러가 있는 입력',
    placeholder: '에러가 있는 입력',
    error: true,
    errorMessage: '이 필드는 필수입니다.',
    size: 'md',
  },
};

// 읽기 전용
export const Readonly: Story = {
  args: {
    modelValue: '읽기 전용 텍스트',
    placeholder: '읽기 전용 입력',
    readonly: true,
    size: 'md',
  },
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태</h4>
          <BaseInput placeholder="기본 입력" size="md" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">포커스 상태</h4>
          <BaseInput placeholder="포커스된 입력" size="md" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">에러 상태</h4>
          <BaseInput 
            placeholder="에러가 있는 입력" 
            size="md" 
            :error="true" 
            error-message="이 필드는 필수입니다." 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태</h4>
          <BaseInput 
            placeholder="비활성화된 입력" 
            size="md" 
            :disabled="true" 
          />
        </div>
      </div>
    `,
  }),
};

// 크기 비교
export const SizeComparison: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">작은 크기 (SM)</h4>
          <BaseInput placeholder="작은 크기 입력" size="sm" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">중간 크기 (MD)</h4>
          <BaseInput placeholder="중간 크기 입력" size="md" />
        </div>
      </div>
    `,
  }),
};
