import type { Meta, StoryObj } from '@storybook/vue3';
import InputStepper from '../InputStepper.vue';
import { ref } from 'vue';

const meta: Meta<typeof InputStepper> = {
  title: 'Inputs/InputStepper',
  component: InputStepper,
  parameters: {
    docs: {
      description: {
        component: `BaseInput을 확장한 스테퍼 입력 컴포넌트입니다.\n증감 버튼을 통해 값을 조정할 수 있으며, 최소/최대값과 증감 단위를 설정할 수 있습니다.\nFigma 링크: [Figma 링크](https://www.figma.com/)`,
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
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
    readonly: {
      description: '읽기 전용 여부',
      control: 'boolean',
    },
    fullWidth: {
      description: '입력창을 부모의 100% 너비로 확장할지 여부',
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
    showButtons: {
      description: '증감 버튼 표시 여부',
      control: 'boolean',
    },
    buttonPosition: {
      description: '버튼 위치 (inside | outside)',
      control: 'select',
      options: ['inside', 'outside'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => ({
    components: { InputStepper },
    setup() {
      const stepperValue = ref(args.modelValue || 0);
      
      const handleValueChange = (value: number) => {
        console.log('📊 값 변경:', value);
        stepperValue.value = value;
      };
      
      return {
        args,
        stepperValue,
        handleValueChange,
      };
    },
    template: `
      <div>
        <InputStepper
          v-model="stepperValue"
          v-bind="args"
          @update:model-value="handleValueChange"
        />
        <div class="mt-4 p-3 bg-gray-100 rounded">
          <p><strong>현재 값:</strong> {{ stepperValue }}</p>
          <p><strong>+, - 버튼을 클릭하여 값을 변경해보세요!</strong></p>
          <p><strong>콘솔을 확인하여 이벤트 동작을 확인하세요.</strong></p>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: 0,
    placeholder: '0',
    min: 0,
    max: 100,
    step: 1,
    showButtons: true,
    buttonPosition: 'inside',
  },
};

// 최소/최대값 설정
export const WithMinMax: Story = {
  render: (args) => ({
    components: { InputStepper },
    setup() {
      const stepperValue = ref(args.modelValue || 0);
      
      const handleValueChange = (value: number) => {
        console.log('📊 값 변경:', value);
        stepperValue.value = value;
      };
      
      return {
        args,
        stepperValue,
        handleValueChange,
      };
    },
    template: `
      <div>
        <InputStepper
          v-model="stepperValue"
          v-bind="args"
          @update:model-value="handleValueChange"
        />
        <div class="mt-4 p-3 bg-gray-100 rounded">
          <p><strong>현재 값:</strong> {{ stepperValue }}</p>
          <p><strong>범위:</strong> {{ args.min }} ~ {{ args.max }}</p>
          <p><strong>증감 단위:</strong> {{ args.step }}</p>
          <p><strong>+, - 버튼을 클릭하여 값을 변경해보세요!</strong></p>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: 50,
    placeholder: '0',
    min: 0,
    max: 100,
    step: 5,
    showButtons: true,
    buttonPosition: 'inside',
  },
};

// 큰 증감 단위
export const LargeStep: Story = {
  args: {
    modelValue: 0,
    placeholder: '0',
    min: 0,
    max: 1000,
    step: 10,
    showButtons: true,
    buttonPosition: 'inside',
  },
};

// 버튼 없음
export const WithoutButtons: Story = {
  args: {
    modelValue: 25,
    placeholder: '0',
    min: 0,
    max: 100,
    step: 1,
    showButtons: false,
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    modelValue: 50,
    placeholder: '0',
    min: 0,
    max: 100,
    step: 1,
    showButtons: true,
    buttonPosition: 'inside',
    disabled: true,
  },
};

// 읽기 전용
export const Readonly: Story = {
  args: {
    modelValue: 50,
    placeholder: '0',
    min: 0,
    max: 100,
    step: 1,
    showButtons: true,
    buttonPosition: 'inside',
    readonly: true,
  },
};

// 전체 너비
export const FullWidth: Story = {
  args: {
    modelValue: 30,
    placeholder: '0',
    min: 0,
    max: 100,
    step: 1,
    showButtons: true,
    buttonPosition: 'inside',
    fullWidth: true,
  },
};

// 음수 허용
export const NegativeValues: Story = {
  args: {
    modelValue: 0,
    placeholder: '0',
    min: -100,
    max: 100,
    step: 1,
    showButtons: true,
    buttonPosition: 'inside',
  },
};

// 소수점 단위
export const DecimalStep: Story = {
  args: {
    modelValue: 0.5,
    placeholder: '0',
    min: 0,
    max: 10,
    step: 0.1,
    showButtons: true,
    buttonPosition: 'inside',
  },
};

// 버튼 동작 테스트용 (중간 값)
export const ButtonTest: Story = {
  args: {
    modelValue: 25,
    placeholder: '0',
    min: 0,
    max: 100,
    step: 5,
    showButtons: true,
    buttonPosition: 'inside',
  },
  parameters: {
    docs: {
      description: '+, - 버튼의 동작을 테스트합니다. 버튼을 클릭하여 값이 변경되는지 확인하세요.',
    },
  },
}; 