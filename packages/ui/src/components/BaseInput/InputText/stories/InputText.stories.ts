import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import InputText from '../InputText.vue';

/**
 * InputText 컴포넌트
 * 
 * BaseInput을 확장한 텍스트 입력 컴포넌트입니다.
 * text 타입 전용으로 설계되었습니다.
 * 
 * [Figma 링크](https://figma.com/design/...)
 */
const meta: Meta<typeof InputText> = {
  title: 'Inputs/InputText',
  component: InputText,
  parameters: {
    docs: {
      description: {
        component: `InputText는 BaseInput을 확장한 텍스트 입력 컴포넌트입니다.`,
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
    label: {
      description: '라벨 텍스트',
      control: 'text',
    },
    helperText: {
      description: '헬퍼 텍스트',
      control: 'text',
    },
    errorMessage: {
      description: '에러 메시지',
      control: 'text',
    },
    size: {
      description: '크기',
      control: 'select',
      options: ['sm', 'md'],
    },
    clearable: {
      description: 'Clear 버튼 표시 여부',
      control: 'boolean',
    },
    required: {
      description: '필수 여부',
      control: 'boolean',
    },
    autoFocus: {
      description: '자동 포커스 여부',
      control: 'boolean',
    },
  },
  args: {
    modelValue: '',
    placeholder: '텍스트를 입력하세요',
    disabled: false,
    readonly: false,
    fullWidth: true,
    label: '',
    helperText: '',
    errorMessage: '',
    size: 'md',
    clearable: false,
    required: false,
    autoFocus: false,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 텍스트 입력
 */
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '텍스트를 입력하세요',
  },
};

/**
 * 라벨이 있는 텍스트 입력
 */
export const WithLabel: Story = {
  args: {
    modelValue: '',
    label: '이름',
    placeholder: '이름을 입력하세요',
    required: true,
  },
};

/**
 * 헬퍼 텍스트가 있는 텍스트 입력
 */
export const WithHelperText: Story = {
  args: {
    modelValue: '',
    label: '사용자명',
    placeholder: '사용자명을 입력하세요',
    helperText: '영문, 숫자, 언더스코어만 사용 가능합니다.',
  },
};

/**
 * 에러 상태의 텍스트 입력
 */
export const WithError: Story = {
  args: {
    modelValue: 'invalid-username',
    label: '사용자명',
    placeholder: '사용자명을 입력하세요',
    errorMessage: '사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다.',
  },
};

/**
 * Clear 버튼이 있는 텍스트 입력
 */
export const WithClearButton: Story = {
  render: (args) => ({
    components: { InputText },
    setup() {
      const modelValue = ref('입력된 텍스트');
      return { args, modelValue };
    },
    template: `
      <InputText 
        v-model="modelValue"
        placeholder="텍스트를 입력하세요"
        :clearable="true"
      />
    `,
  }),
};

/**
 * 작은 크기의 텍스트 입력
 */
export const Small: Story = {
  args: {
    modelValue: '',
    label: '작은 입력',
    placeholder: '작은 크기 입력',
    size: 'sm',
  },
};

/**
 * 비활성화된 텍스트 입력
 */
export const Disabled: Story = {
  args: {
    modelValue: '비활성화된 텍스트',
    label: '비활성화',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

/**
 * 읽기 전용 텍스트 입력
 */
export const Readonly: Story = {
  args: {
    modelValue: '읽기 전용 텍스트',
    label: '읽기 전용',
    placeholder: '수정할 수 없습니다',
    readonly: true,
  },
};

/**
 * 고정 너비 텍스트 입력 (200px)
 */
export const FixedWidth: Story = {
  args: {
    modelValue: '',
    label: '고정 너비 입력',
    placeholder: '200px 고정 너비',
    fullWidth: false,
  },
};

/**
 * 전체 너비 텍스트 입력
 */
export const FullWidth: Story = {
  args: {
    modelValue: '',
    label: '전체 너비 입력',
    placeholder: '전체 너비로 표시됩니다',
    fullWidth: true,
  },
};

/**
 * 다양한 상태 예시
 */
export const AllStates: Story = {
  render: (args) => ({
    components: { InputText },
    setup: () => ({ args }),
    template: `
      <div class="space-y-6">
        <div>
          <h3>기본 상태</h3>
          <InputText v-bind="args" />
        </div>
        <div>
          <h3>라벨 + 헬퍼 텍스트</h3>
          <InputText 
            v-bind="args" 
            label="사용자명" 
            helperText="영문, 숫자, 언더스코어만 사용 가능합니다."
          />
        </div>
        <div>
          <h3>에러 상태</h3>
          <InputText 
            v-bind="args" 
            label="사용자명"
            modelValue="invalid-username"
            errorMessage="사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다."
          />
        </div>
        <div>
          <h3>Clear 버튼</h3>
          <InputText 
            v-bind="args" 
            modelValue="입력된 텍스트"
            clearable
          />
        </div>
        <div>
          <h3>비활성화</h3>
          <InputText 
            v-bind="args" 
            label="비활성화"
            modelValue="비활성화된 텍스트"
            disabled
          />
        </div>
        <div>
          <h3>읽기 전용</h3>
          <InputText 
            v-bind="args" 
            label="읽기 전용"
            modelValue="읽기 전용 텍스트"
            readonly
          />
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: '텍스트를 입력하세요',
  },
};