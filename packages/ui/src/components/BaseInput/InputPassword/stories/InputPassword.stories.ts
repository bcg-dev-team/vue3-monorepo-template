import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import InputPassword from '../InputPassword.vue';

/**
 * InputPassword 컴포넌트
 * 
 * BaseInput을 확장한 비밀번호 입력 컴포넌트입니다.
 * 비밀번호 표시/숨김 토글과 강도 표시 기능을 제공합니다.
 * 
 * [Figma 링크](https://figma.com/design/...)
 */
const meta: Meta<typeof InputPassword> = {
  title: 'Inputs/InputPassword',
  component: InputPassword,
  parameters: {
    docs: {
      description: {
        component: `InputPassword는 BaseInput을 확장한 비밀번호 입력 컴포넌트입니다. 비밀번호 표시/숨김 토글과 강도 표시 기능을 제공합니다.`,
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
    error: {
      description: '에러 상태 여부',
      control: 'boolean',
    },
    errorMessage: {
      description: '에러 메시지',
      control: 'text',
    },
    label: {
      description: '라벨 텍스트',
      control: 'text',
    },
    required: {
      description: '필수 입력 여부',
      control: 'boolean',
    },
    showStrength: {
      description: '비밀번호 강도 표시 여부',
      control: 'boolean',
    },
    showStrengthLabel: {
      description: '비밀번호 강도 라벨 표시 여부',
      control: 'boolean',
    },
    showStrengthDetails: {
      description: '비밀번호 강도 상세 정보 표시 여부',
      control: 'boolean',
    },
    showCrackTime: {
      description: '크랙 시간 표시 여부',
      control: 'boolean',
    },
  },
  args: {
    modelValue: '',
    placeholder: '비밀번호를 입력하세요',
    disabled: false,
    error: false,
    errorMessage: '',
    label: '',
    required: false,
    showStrength: true,
    showStrengthLabel: true,
    showStrengthDetails: false,
    showCrackTime: false,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 비밀번호 입력
 */
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '비밀번호를 입력하세요',
  },
};

/**
 * 라벨이 있는 비밀번호 입력
 */
export const WithLabel: Story = {
  args: {
    modelValue: '',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    required: true,
  },
};

/**
 * 에러 상태의 비밀번호 입력
 */
export const WithError: Story = {
  args: {
    modelValue: 'weakpassword',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    error: true,
    errorMessage: '비밀번호는 8자 이상이어야 합니다.',
  },
};

/**
 * 비밀번호 강도 표시가 있는 입력
 */
export const WithStrengthIndicator: Story = {
  args: {
    modelValue: 'MyPassword123!',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    showStrength: true,
    showStrengthLabel: true,
    showStrengthDetails: true,
  },
};

/**
 * 상세 강도 정보가 있는 입력
 */
export const WithDetailedStrength: Story = {
  args: {
    modelValue: 'ComplexPassword123!@#',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    showStrength: true,
    showStrengthLabel: true,
    showStrengthDetails: true,
    showCrackTime: true,
  },
};

/**
 * 강도 표시 없음
 */
export const WithoutStrength: Story = {
  args: {
    modelValue: '',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    showStrength: false,
  },
};

/**
 * 비활성화된 비밀번호 입력
 */
export const Disabled: Story = {
  args: {
    modelValue: '비밀번호123',
    label: '비밀번호',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

/**
 * 필수 입력 비밀번호
 */
export const Required: Story = {
  args: {
    modelValue: '',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    required: true,
  },
};

/**
 * 실시간 비밀번호 입력 예시
 */
export const RealTimeInput: Story = {
  render: (args) => ({
    components: { InputPassword },
    setup() {
      const password = ref('');
      
      return { args, password };
    },
    template: `
      <div class="space-y-4">
        <InputPassword 
          v-model="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          :showStrength="true"
          :showStrengthDetails="true"
        />
        <div class="text-sm text-gray-600">
          입력된 비밀번호: {{ password || '(없음)' }}
        </div>
      </div>
    `,
  }),
};

/**
 * 다양한 상태 예시
 */
export const AllStates: Story = {
  render: (args) => ({
    components: { InputPassword },
    setup: () => ({ args }),
    template: `
      <div class="space-y-6">
        <div>
          <h3>기본 상태</h3>
          <InputPassword v-bind="args" />
        </div>
        <div>
          <h3>라벨 + 필수</h3>
          <InputPassword 
            v-bind="args" 
            label="비밀번호" 
            required
          />
        </div>
        <div>
          <h3>에러 상태</h3>
          <InputPassword 
            v-bind="args" 
            label="비밀번호"
            modelValue="weak"
            error
            errorMessage="비밀번호가 너무 짧습니다."
          />
        </div>
        <div>
          <h3>강도 표시</h3>
          <InputPassword 
            v-bind="args" 
            label="비밀번호"
            modelValue="StrongPass123!"
            showStrength
            showStrengthDetails
          />
        </div>
        <div>
          <h3>비활성화</h3>
          <InputPassword 
            v-bind="args" 
            label="비활성화"
            modelValue="비밀번호123"
            disabled
          />
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: '비밀번호를 입력하세요',
  },
}; 