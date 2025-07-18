import BaseTableInputCell from '../BaseTableInputCell.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseTableInputCell> = {
  title: 'BaseTable/BaseTableInputCell',
  component: BaseTableInputCell,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Table/Body-Input](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-1059&m=dev)',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '셀 라벨',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드 플레이스홀더',
    },
    value: {
      control: 'text',
      description: '입력 필드 값',
    },
    buttonText: {
      control: 'text',
      description: '버튼 텍스트',
    },
    showCheckbox: {
      control: 'boolean',
      description: '체크박스 표시 여부',
    },
    checked: {
      control: 'boolean',
      description: '체크박스 상태',
    },
  },
};
export default meta;
type Story = StoryObj<typeof BaseTableInputCell>;

export const Default: Story = {
  args: {
    label: '글씨',
    placeholder: '텍스트',
    value: '',
    buttonText: 'Button',
    showCheckbox: false,
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 입력 필드가 포함된 테이블 셀입니다.',
      },
    },
  },
};

export const WithCheckbox: Story = {
  args: {
    label: '글씨',
    placeholder: '텍스트',
    value: '',
    buttonText: 'Button',
    showCheckbox: true,
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: '체크박스가 포함된 테이블 셀입니다.',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    label: '글씨',
    placeholder: '텍스트',
    value: '',
    buttonText: 'Button',
    showCheckbox: true,
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '체크박스가 선택된 상태의 테이블 셀입니다.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    label: '글씨',
    placeholder: '텍스트',
    value: '회',
    buttonText: 'Button',
    showCheckbox: false,
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: '입력 필드에 값이 있는 테이블 셀입니다.',
      },
    },
  },
};

export const WithoutButton: Story = {
  args: {
    label: '글씨',
    placeholder: '텍스트',
    value: '',
    buttonText: '',
    showCheckbox: false,
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: '버튼이 없는 테이블 셀입니다.',
      },
    },
  },
};
