import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BasePagination from '../BasePagination.vue';

const meta: Meta<typeof BasePagination> = {
  title: 'Pagination/Pagination',
  component: BasePagination,
  parameters: {
    docs: {
      description: {
        component:
          '완전한 페이지네이션 컴포넌트입니다. 화살표와 페이지 번호를 조합하여 페이지 네비게이션을 제공합니다.\n\n**Figma 링크**: [Pagination/Arrow-Left](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=823-18815&m=dev), [Pagination/Arrow-Right](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=823-18810&m=dev), [Pagination/Number](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=823-18820&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
    },
    totalPages: {
      control: 'number',
    },
    maxVisiblePages: {
      control: 'number',
    },
    showFirstLast: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
    showFirstLast: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 페이지네이션입니다. 10페이지 중 1페이지가 선택된 상태입니다.',
      },
    },
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
    showFirstLast: false,
  },
  parameters: {
    docs: {
      description: {
        story: '중간 페이지가 선택된 상태입니다. 주변 페이지들이 표시됩니다.',
      },
    },
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    maxVisiblePages: 5,
    showFirstLast: false,
  },
  parameters: {
    docs: {
      description: {
        story: '마지막 페이지가 선택된 상태입니다.',
      },
    },
  },
};

export const WithFirstLastButtons: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 5,
    showFirstLast: true,
  },
  parameters: {
    docs: {
      description: {
        story: '첫/마지막 페이지 버튼이 포함된 페이지네이션입니다.',
      },
    },
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    maxVisiblePages: 5,
    showFirstLast: true,
  },
  parameters: {
    docs: {
      description: {
        story: '많은 페이지가 있는 경우의 페이지네이션입니다.',
      },
    },
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    maxVisiblePages: 5,
    showFirstLast: false,
  },
  parameters: {
    docs: {
      description: {
        story: '적은 페이지가 있는 경우의 페이지네이션입니다.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    maxVisiblePages: 5,
    showFirstLast: false,
  },
  render: (args: any) => ({
    components: { BasePagination },
    setup() {
      const currentPage = ref(args.currentPage);

      const handlePageChange = (page: number) => {
        currentPage.value = page;
      };

      return {
        currentPage,
        totalPages: args.totalPages,
        maxVisiblePages: args.maxVisiblePages,
        showFirstLast: args.showFirstLast,
        handlePageChange,
      };
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600">현재 페이지: {{ currentPage }}</p>
        <BasePagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :max-visible-pages="maxVisiblePages"
          :show-first-last="showFirstLast"
          @page-change="handlePageChange"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '상호작용 가능한 페이지네이션 예시입니다. 페이지를 클릭하여 변경할 수 있습니다.',
      },
    },
  },
};
