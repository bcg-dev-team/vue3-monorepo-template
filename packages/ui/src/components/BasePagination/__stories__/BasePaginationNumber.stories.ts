import type { Meta, StoryObj } from '@storybook/vue3';
import BasePaginationNumber from '../BasePaginationNumber.vue';

const meta: Meta<typeof BasePaginationNumber> = {
  title: 'Components/BasePaginationNumber',
  component: BasePaginationNumber,
  parameters: {
    docs: {
      description: {
        component:
          '페이지네이션 번호 컴포넌트입니다. 선택됨/선택안됨/호버 상태를 지원합니다.\n\n**Figma 링크**: [Pagination/Number](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=823-18820&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    number: {
      control: 'number',
    },
    status: {
      control: 'select',
      options: ['selected', 'unselected', 'hover'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    number: 1,
    status: 'selected',
  },
  parameters: {
    docs: {
      description: {
        story: '현재 선택된 페이지 번호 상태입니다.',
      },
    },
  },
};

export const Unselected: Story = {
  args: {
    number: 2,
    status: 'unselected',
  },
  parameters: {
    docs: {
      description: {
        story: '선택되지 않은 페이지 번호 상태입니다.',
      },
    },
  },
};

export const Hover: Story = {
  args: {
    number: 3,
    status: 'hover',
  },
  parameters: {
    docs: {
      description: {
        story: '호버 상태의 페이지 번호입니다.',
      },
    },
  },
};

export const MultipleNumbers: Story = {
  render: () => ({
    components: { BasePaginationNumber },
    template: `
      <div class="flex gap-2">
        <BasePaginationNumber :number="1" status="selected" />
        <BasePaginationNumber :number="2" status="unselected" />
        <BasePaginationNumber :number="3" status="unselected" />
        <BasePaginationNumber :number="4" status="hover" />
        <BasePaginationNumber :number="5" status="unselected" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '여러 페이지 번호를 함께 표시한 예시입니다.',
      },
    },
  },
};
