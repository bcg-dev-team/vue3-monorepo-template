import BaseCheckbox from '../BaseCheckbox.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseCheckbox> = {
  title: 'BaseCheckbox/BaseCheckbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Input/Checkbox](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=29-405&m=dev)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BaseCheckbox>;

export const Off: Story = {
  args: {
    modelValue: false,
    state: 'Off',
    style: 'Default',
  },
  parameters: {
    docs: {
      description: {
        story: '체크되지 않은(Off) 기본 상태의 체크박스 예시입니다.',
      },
    },
  },
};

export const On: Story = {
  args: {
    modelValue: true,
    state: 'On',
    style: 'Default',
  },
  parameters: {
    docs: {
      description: {
        story: '체크된(On) 기본 상태의 체크박스 예시입니다.',
      },
    },
  },
};

export const DisabledOff: Story = {
  args: {
    modelValue: false,
    state: 'Off',
    style: 'Disabled',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화(Disabled) + 체크되지 않은 상태의 체크박스 예시입니다.',
      },
    },
  },
};

export const DisabledOn: Story = {
  args: {
    modelValue: true,
    state: 'On',
    style: 'Disabled',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화(Disabled) + 체크된 상태의 체크박스 예시입니다.',
      },
    },
  },
};
