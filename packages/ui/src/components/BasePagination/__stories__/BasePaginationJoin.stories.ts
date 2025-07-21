import BasePaginationJoin from '../BasePaginationJoin.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BasePaginationJoin> = {
  title: 'BasePagination/BasePaginationJoin',
  component: BasePaginationJoin,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Figma 링크: [Icon/pagination-join](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=152-4581&m=dev)`,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof BasePaginationJoin>;

export const Default: Story = {
  args: {
    count: 5,
    current: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 5개 indicator 중 첫 번째가 활성화된 기본 페이지네이션 조인 인디케이터입니다.',
      },
    },
  },
};

export const MultipleStates: Story = {
  args: {
    count: 7,
    current: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          '7개의 indicator 중 네 번째가 활성화된 예시입니다. count와 current를 동적으로 조정할 수 있습니다.',
      },
    },
  },
};

export const LastIndex: Story = {
  args: {
    count: 5,
    current: 4,
  },
  parameters: {
    docs: {
      description: {
        story: '5개 indicator 중 마지막(5번째)이 활성화된 예시입니다.',
      },
    },
  },
};
