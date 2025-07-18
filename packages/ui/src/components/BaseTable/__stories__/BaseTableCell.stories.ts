import type { Meta, StoryObj } from '@storybook/vue3';
import BaseTableCell from '../BaseTableCell.vue';

const meta: Meta<typeof BaseTableCell> = {
  title: 'Components/BaseTableCell',
  component: BaseTableCell,
  parameters: {
    docs: {
      description: {
        component:
          '테이블 셀 컴포넌트입니다. 일반, 선택됨, 입력 상태를 지원합니다.\n\n**Figma 링크**: [Table/Body-Input](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-1059&m=dev), [Table/Body-Input-bg](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=82-1019&m=dev), [Table/Body-Type2](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=82-941&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['normal', 'selected', 'input'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    width: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    content: '일반 셀 내용',
    type: 'normal',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: '일반 상태의 테이블 셀입니다.',
      },
    },
  },
};

export const Selected: Story = {
  args: {
    content: '선택된 셀 내용',
    type: 'selected',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: '선택된 상태의 테이블 셀입니다. 파란색 배경을 가집니다.',
      },
    },
  },
};

export const Input: Story = {
  args: {
    content: '입력 가능한 셀',
    type: 'input',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: '입력 가능한 상태의 테이블 셀입니다. 더 작은 폰트 크기를 사용합니다.',
      },
    },
  },
};

export const CenterAligned: Story = {
  args: {
    content: '중앙 정렬',
    type: 'normal',
    align: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: '중앙 정렬된 테이블 셀입니다.',
      },
    },
  },
};

export const RightAligned: Story = {
  args: {
    content: '우측 정렬',
    type: 'normal',
    align: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: '우측 정렬된 테이블 셀입니다.',
      },
    },
  },
};

export const WithCustomWidth: Story = {
  args: {
    content: '고정 너비 셀',
    type: 'normal',
    align: 'left',
    width: '200px',
  },
  parameters: {
    docs: {
      description: {
        story: '고정 너비를 가진 테이블 셀입니다.',
      },
    },
  },
};

export const WithSlot: Story = {
  args: {
    content: '슬롯이 있는 셀',
    type: 'normal',
    align: 'left',
  },
  render: (args) => ({
    components: { BaseTableCell },
    setup() {
      return { args };
    },
    template: `
      <BaseTableCell v-bind="args">
        <template #default>
          <button class="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
            버튼
          </button>
        </template>
      </BaseTableCell>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '슬롯을 사용하여 추가 콘텐츠를 포함한 테이블 셀입니다.',
      },
    },
  },
};
