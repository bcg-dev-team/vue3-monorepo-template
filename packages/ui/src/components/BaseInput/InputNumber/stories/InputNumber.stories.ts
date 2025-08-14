import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import InputNumber from '../InputNumber.vue';

/**
 * InputNumber 컴포넌트
 * 
 * BaseInput을 확장한 숫자 입력 컴포넌트입니다.
 * 숫자 유효성 검사, 포맷팅, 증감 버튼 등의 기능을 제공합니다.
 * 
 * [Figma 링크](https://figma.com/design/...)
 */
const meta: Meta<typeof InputNumber> = {
  title: 'Inputs/InputNumber',
  component: InputNumber,
  parameters: {
    docs: {
      description: {
        component: `InputNumber는 BaseInput을 확장한 숫자 입력 컴포넌트입니다. 숫자 유효성 검사, 포맷팅, 증감 버튼 등의 기능을 제공합니다.`,
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
    fullWidth: {
      description: '전체 너비 사용 여부',
      control: 'boolean',
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
    precision: {
      description: '소수점 자릿수',
      control: 'number',
    },
    allowNegative: {
      description: '음수 허용 여부',
      control: 'boolean',
    },
    format: {
      description: '포맷 타입',
      control: 'select',
      options: ['number', 'currency', 'percentage'],
    },
  },
  args: {
    modelValue: '',
    placeholder: '숫자를 입력하세요',
    disabled: false,
    readonly: false,
    fullWidth: false,
    min: undefined,
    max: undefined,
    step: 1,
    precision: 0,
    allowNegative: false,
    format: 'number',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 숫자 입력
 */
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '숫자를 입력하세요',
  },
};

/**
 * 최소/최대값이 있는 숫자 입력
 */
export const WithMinMax: Story = {
  args: {
    modelValue: '50',
    placeholder: '1-100 사이의 숫자',
    min: 1,
    max: 100,
    step: 1,
  },
};

/**
 * 소수점이 있는 숫자 입력
 */
export const WithDecimal: Story = {
  args: {
    modelValue: '3.14',
    placeholder: '소수점 포함 숫자',
    precision: 2,
    step: 0.1,
  },
};

/**
 * 통화 포맷 숫자 입력
 */
export const CurrencyFormat: Story = {
  args: {
    modelValue: '10000',
    placeholder: '금액 입력',
    format: 'currency',
    precision: 0,
  },
};

/**
 * 퍼센트 포맷 숫자 입력
 */
export const PercentageFormat: Story = {
  args: {
    modelValue: '25',
    placeholder: '퍼센트 입력',
    format: 'percentage',
    precision: 1,
  },
};

/**
 * 음수 허용 숫자 입력
 */
export const AllowNegative: Story = {
  args: {
    modelValue: '-10',
    placeholder: '음수 허용',
    allowNegative: true,
    min: -100,
    max: 100,
  },
};

/**
 * 증감 단위가 있는 숫자 입력
 */
export const WithStep: Story = {
  args: {
    modelValue: '10',
    placeholder: '5단위로 입력',
    step: 5,
    min: 0,
    max: 100,
  },
};

/**
 * 에러 상태의 숫자 입력 (최소값 미달)
 */
export const WithErrorMin: Story = {
  args: {
    modelValue: '0',
    placeholder: '1 이상 입력',
    min: 1,
  },
};

/**
 * 에러 상태의 숫자 입력 (최대값 초과)
 */
export const WithErrorMax: Story = {
  args: {
    modelValue: '101',
    placeholder: '100 이하 입력',
    max: 100,
  },
};

/**
 * 비활성화된 숫자 입력
 */
export const Disabled: Story = {
  args: {
    modelValue: '42',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

/**
 * 읽기 전용 숫자 입력
 */
export const Readonly: Story = {
  args: {
    modelValue: '42',
    placeholder: '수정할 수 없습니다',
    readonly: true,
  },
};

/**
 * 전체 너비 숫자 입력
 */
export const FullWidth: Story = {
  args: {
    modelValue: '',
    placeholder: '전체 너비로 표시',
    fullWidth: true,
  },
};

/**
 * 다양한 포맷 예시
 */
export const AllFormats: Story = {
  render: (args) => ({
    components: { InputNumber },
    setup: () => ({ args }),
    template: `
      <div class="space-y-6">
        <div>
          <h3>기본 숫자</h3>
          <InputNumber 
            v-bind="args" 
            modelValue="123"
            placeholder="기본 숫자 입력"
            format="number"
          />
        </div>
        <div>
          <h3>통화 포맷</h3>
          <InputNumber 
            v-bind="args" 
            modelValue="50000"
            placeholder="통화 입력"
            format="currency"
            precision="0"
          />
        </div>
        <div>
          <h3>퍼센트 포맷</h3>
          <InputNumber 
            v-bind="args" 
            modelValue="75.5"
            placeholder="퍼센트 입력"
            format="percentage"
            precision="1"
          />
        </div>
        <div>
          <h3>소수점 포함</h3>
          <InputNumber 
            v-bind="args" 
            modelValue="3.14159"
            placeholder="소수점 입력"
            precision="3"
            step="0.001"
          />
        </div>
        <div>
          <h3>음수 허용</h3>
          <InputNumber 
            v-bind="args" 
            modelValue="-25"
            placeholder="음수 입력"
            allowNegative
            min="-100"
            max="100"
          />
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: '숫자를 입력하세요',
  },
};

/**
 * 실시간 유효성 검사 예시
 */
export const RealTimeValidation: Story = {
  render: (args) => ({
    components: { InputNumber },
    setup() {
      const value = ref('50');
      const min = 1;
      const max = 100;
      
      return { args, value, min, max };
    },
    template: `
      <div class="space-y-4">
        <InputNumber 
          v-model="value"
          placeholder="1-100 사이 입력"
          :min="min"
          :max="max"
          :step="1"
        />
        <div class="text-sm text-gray-600">
          현재 값: {{ value }} ({{ min }}-{{ max }} 범위)
        </div>
      </div>
    `,
  }),
}; 