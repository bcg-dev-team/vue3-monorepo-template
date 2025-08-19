import BaseInputStepper from '../BaseInputStepper.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseInputStepper> = {
  title: 'Inputs/Stepper',
  component: BaseInputStepper,
  parameters: {
    docs: {
      description: {
        component:
          '스테퍼 입력 컴포넌트입니다. 피그마의 Input/Stepper와 Input/Stepper-lined 디자인을 기반으로 구현되었으며, +/- 버튼으로 값을 조정할 수 있습니다.',
      },
    },
  },
  argTypes: {
    modelValue: {
      description: '현재 값 (v-model)',
      control: 'number',
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text',
    },
    size: {
      description: '크기 (sm: 32px 높이)',
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
    min: {
      description: '최소값',
      control: 'number',
    },
    max: {
      description: '최대값',
      control: 'number',
    },
    step: {
      description: '증감 단위',
      control: 'number',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    modelValue: 0,
    placeholder: '수량을 입력하세요',
    size: 'sm',
    min: 0,
    max: 100,
    step: 1,
  },
};

// 값이 있는 상태
export const WithValue: Story = {
  args: {
    modelValue: 5,
    placeholder: '수량을 입력하세요',
    size: 'sm',
    min: 0,
    max: 100,
    step: 1,
  },
};

// 최소값에 도달한 상태
export const AtMinimum: Story = {
  args: {
    modelValue: 0,
    placeholder: '수량을 입력하세요',
    size: 'sm',
    min: 0,
    max: 100,
    step: 1,
  },
};

// 최대값에 도달한 상태
export const AtMaximum: Story = {
  args: {
    modelValue: 100,
    placeholder: '수량을 입력하세요',
    size: 'sm',
    min: 0,
    max: 100,
    step: 1,
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    modelValue: 5,
    placeholder: '비활성화된 스테퍼',
    size: 'sm',
    disabled: true,
    min: 0,
    max: 100,
    step: 1,
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    modelValue: 0,
    placeholder: '에러가 있는 스테퍼',
    size: 'sm',
    error: true,
    errorMessage: '수량을 입력해주세요.',
    min: 0,
    max: 100,
    step: 1,
  },
};

// 큰 단위 스테퍼
export const LargeStep: Story = {
  args: {
    modelValue: 50,
    placeholder: '큰 단위 스테퍼',
    size: 'sm',
    min: 0,
    max: 1000,
    step: 10,
  },
};

// 소수점 스테퍼
export const DecimalStep: Story = {
  args: {
    modelValue: 1.5,
    placeholder: '소수점 스테퍼',
    size: 'sm',
    min: 0,
    max: 10,
    step: 0.5,
  },
};

// 음수 허용
export const NegativeAllowed: Story = {
  args: {
    modelValue: 0,
    placeholder: '음수 허용 스테퍼',
    size: 'sm',
    min: -10,
    max: 10,
    step: 1,
  },
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => ({
    components: { BaseInputStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태</h4>
          <BaseInputStepper 
            model-value="5" 
            placeholder="기본 스테퍼" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">최소값 상태</h4>
          <BaseInputStepper 
            model-value="0" 
            placeholder="최소값 스테퍼" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">최대값 상태</h4>
          <BaseInputStepper 
            model-value="100" 
            placeholder="최대값 스테퍼" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">에러 상태</h4>
          <BaseInputStepper 
            model-value="0" 
            placeholder="에러가 있는 스테퍼" 
            size="sm" 
            :error="true" 
            error-message="수량을 입력해주세요." 
            :min="0" 
            :max="100" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태</h4>
          <BaseInputStepper 
            model-value="5" 
            placeholder="비활성화된 스테퍼" 
            size="sm" 
            :disabled="true" 
            :min="0" 
            :max="100" 
            :step="1" 
          />
        </div>
      </div>
    `,
  }),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseInputStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">수량 선택</h4>
          <BaseInputStepper 
            model-value="1" 
            placeholder="수량을 선택하세요" 
            size="sm" 
            :min="1" 
            :max="99" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">온도 조절</h4>
          <BaseInputStepper 
            model-value="20" 
            placeholder="온도를 설정하세요" 
            size="sm" 
            :min="16" 
            :max="30" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">볼륨 조절</h4>
          <BaseInputStepper 
            model-value="50" 
            placeholder="볼륨을 설정하세요" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="5" 
          />
        </div>
      </div>
    `,
  }),
};

// 다양한 단위 예시
export const DifferentSteps: Story = {
  render: () => ({
    components: { BaseInputStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">1씩 증가 (기본)</h4>
          <BaseInputStepper 
            model-value="5" 
            placeholder="1씩 증가" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">5씩 증가</h4>
          <BaseInputStepper 
            model-value="25" 
            placeholder="5씩 증가" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="5" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">10씩 증가</h4>
          <BaseInputStepper 
            model-value="50" 
            placeholder="10씩 증가" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="10" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">0.5씩 증가</h4>
          <BaseInputStepper 
            model-value="2.5" 
            placeholder="0.5씩 증가" 
            size="sm" 
            :min="0" 
            :max="10" 
            :step="0.5" 
          />
        </div>
      </div>
    `,
  }),
};
