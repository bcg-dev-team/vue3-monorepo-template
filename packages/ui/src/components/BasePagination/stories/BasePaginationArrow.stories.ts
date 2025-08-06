import type { Meta, StoryObj } from '@storybook/vue3';
import BasePaginationArrow from '../BasePaginationArrow.vue';

const meta: Meta<typeof BasePaginationArrow> = {
  title: 'Pagination/Arrow',
  component: BasePaginationArrow,
  parameters: {
    docs: {
      description: {
        component:
          '페이지네이션 화살표 컴포넌트입니다. 왼쪽/오른쪽 방향과 disabled 상태를 지원합니다.\n\n**Figma 링크**: [Pagination/Arrow-Left](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=823-18815&m=dev), [Pagination/Arrow-Right](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=823-18810&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: 'left',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 왼쪽 화살표 상태입니다.',
      },
    },
  },
};

export const RightDirection: Story = {
  args: {
    direction: 'right',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '오른쪽 방향 화살표입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    direction: 'left',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 화살표 상태입니다.',
      },
    },
  },
};

export const RightDisabled: Story = {
  args: {
    direction: 'right',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 오른쪽 화살표 상태입니다.',
      },
    },
  },
};
