import BaseInputText from '../BaseInputText.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseInputText> = {
  title: 'BaseInput/BaseInputText',
  component: BaseInputText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Input/Text-MD](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=32-176&m=dev)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BaseInputText>;

export const Static: Story = {
  args: {
    modelValue: '',
    placeholder: '입력하세요',
    status: 'Static',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '기본(Static) 상태의 텍스트 입력 필드 예시입니다.',
      },
    },
  },
};

export const Focus: Story = {
  args: {
    modelValue: '',
    placeholder: '입력하세요',
    status: 'Focus',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '포커스(Focus) 상태의 텍스트 입력 필드 예시입니다.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    modelValue: '',
    placeholder: '입력하세요',
    status: 'Error',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '에러(Error) 상태의 텍스트 입력 필드 예시입니다.',
      },
    },
  },
};

export const Filled: Story = {
  args: {
    modelValue: '입력값',
    placeholder: '입력하세요',
    status: 'Filled',
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '값이 입력된(Filled) 상태의 텍스트 입력 필드 예시입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    modelValue: '',
    placeholder: '입력하세요',
    status: 'Disabled',
    showIcon: true,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화(Disabled) 상태의 텍스트 입력 필드 예시입니다.',
      },
    },
  },
};
