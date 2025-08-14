import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import InputEmail from '../InputEmail.vue';

/**
 * InputEmail 컴포넌트
 * 
 * BaseInput을 확장한 이메일 입력 컴포넌트입니다.
 * 이메일 유효성 검사와 도메인 제안 기능을 제공합니다.
 * 
 * [Figma 링크](https://figma.com/design/...)
 */
const meta: Meta<typeof InputEmail> = {
  title: 'Inputs/InputEmail',
  component: InputEmail,
  parameters: {
    docs: {
      description: {
        component: `InputEmail는 BaseInput을 확장한 이메일 입력 컴포넌트입니다. 이메일 유효성 검사와 도메인 제안 기능을 제공합니다.`,
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
    autoComplete: {
      description: '자동완성 기능 여부',
      control: 'boolean',
    },
    domainSuggestions: {
      description: '도메인 제안 목록',
      control: 'object',
    },
    validateOnBlur: {
      description: '블러 시 유효성 검사 여부',
      control: 'boolean',
    },
  },
  args: {
    modelValue: '',
    placeholder: '이메일을 입력하세요',
    disabled: false,
    readonly: false,
    fullWidth: false,
    autoComplete: true,
    domainSuggestions: ['gmail.com', 'naver.com', 'daum.net', 'outlook.com'],
    validateOnBlur: true,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 이메일 입력
 */
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '이메일을 입력하세요',
  },
};

/**
 * 유효한 이메일이 입력된 상태
 */
export const WithValidEmail: Story = {
  args: {
    modelValue: 'user@example.com',
    placeholder: '이메일을 입력하세요',
  },
};

/**
 * 유효하지 않은 이메일이 입력된 상태
 */
export const WithInvalidEmail: Story = {
  args: {
    modelValue: 'invalid-email',
    placeholder: '이메일을 입력하세요',
  },
};

/**
 * 기본 이메일 입력 (라벨 없음)
 */
export const WithLabel: Story = {
  args: {
    modelValue: '',
    placeholder: '이메일을 입력하세요',
  },
};

/**
 * 자동완성이 비활성화된 이메일 입력
 */
export const WithoutAutoComplete: Story = {
  args: {
    modelValue: '',
    placeholder: '이메일을 입력하세요',
    autoComplete: false,
  },
};

/**
 * 커스텀 도메인 제안이 있는 이메일 입력
 */
export const WithCustomDomainSuggestions: Story = {
  args: {
    modelValue: '',
    placeholder: '회사 이메일을 입력하세요',
    domainSuggestions: ['company.com', 'corp.com', 'business.net'],
  },
};

/**
 * 전체 너비 이메일 입력
 */
export const FullWidth: Story = {
  args: {
    modelValue: '',
    placeholder: '전체 너비로 표시',
    fullWidth: true,
  },
};

/**
 * 비활성화된 이메일 입력
 */
export const Disabled: Story = {
  args: {
    modelValue: 'user@example.com',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

/**
 * 읽기 전용 이메일 입력
 */
export const Readonly: Story = {
  args: {
    modelValue: 'user@example.com',
    placeholder: '수정할 수 없습니다',
    readonly: true,
  },
};

/**
 * 실시간 이메일 입력 예시
 */
export const RealTimeInput: Story = {
  render: (args) => ({
    components: { InputEmail },
    setup() {
      const email = ref('');
      
      return { args, email };
    },
    template: `
      <div class="space-y-4">
        <InputEmail 
          v-model="email"
          placeholder="이메일을 입력하세요"
          :autoComplete="true"
        />
        <div class="text-sm text-gray-600">
          입력된 이메일: {{ email || '(없음)' }}
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
    components: { InputEmail },
    setup: () => ({ args }),
    template: `
      <div class="space-y-6">
        <div>
          <h3>기본 상태</h3>
          <InputEmail v-bind="args" />
        </div>
        <div>
          <h3>기본 상태</h3>
          <InputEmail 
            v-bind="args" 
          />
        </div>
        <div>
          <h3>유효한 이메일</h3>
          <InputEmail 
            v-bind="args" 
            modelValue="user@example.com"
          />
        </div>
        <div>
          <h3>유효하지 않은 이메일</h3>
          <InputEmail 
            v-bind="args" 
            modelValue="invalid-email"
          />
        </div>
        <div>
          <h3>자동완성 없음</h3>
          <InputEmail 
            v-bind="args" 
            :autoComplete="false"
          />
        </div>
        <div>
          <h3>비활성화</h3>
          <InputEmail 
            v-bind="args" 
            modelValue="user@example.com"
            disabled
          />
        </div>
        <div>
          <h3>읽기 전용</h3>
          <InputEmail 
            v-bind="args" 
            modelValue="user@example.com"
            readonly
          />
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: '이메일을 입력하세요',
  },
};

/**
 * 도메인 제안 기능 예시
 */
export const DomainSuggestions: Story = {
  render: (args) => ({
    components: { InputEmail },
    setup() {
      const email = ref('');
      const suggestions = ['gmail.com', 'naver.com', 'daum.net', 'outlook.com', 'yahoo.com'];
      
      return { args, email, suggestions };
    },
    template: `
      <div class="space-y-4">
        <InputEmail 
          v-model="email"
          placeholder="이메일을 입력하세요"
          :domainSuggestions="suggestions"
          :autoComplete="true"
        />
        <div class="text-sm text-gray-600">
          사용 가능한 도메인: {{ suggestions.join(', ') }}
        </div>
      </div>
    `,
  }),
}; 