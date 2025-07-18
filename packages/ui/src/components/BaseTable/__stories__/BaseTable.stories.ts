import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BaseTable from '../BaseTable.vue';

const meta: Meta<typeof BaseTable> = {
  title: 'Components/BaseTable',
  component: BaseTable,
  parameters: {
    docs: {
      description: {
        component:
          '완전한 테이블 컴포넌트입니다. 헤더와 바디를 포함한 테이블 기능을 제공합니다.\n\n**Figma 링크**: [Table/Header](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-997&m=dev), [Table/Body-Input](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-1059&m=dev), [Table/Body-Type2](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=82-941&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
    },
    sortable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleHeaders = [
  { key: 'name', title: '이름', width: '200px' },
  { key: 'age', title: '나이', width: '100px', align: 'center' },
  { key: 'job', title: '직업', width: '150px' },
  { key: 'email', title: '이메일', width: '250px' },
];

const sampleData = [
  { id: 1, name: '김철수', age: 25, job: '개발자', email: 'kim@example.com' },
  { id: 2, name: '이영희', age: 30, job: '디자이너', email: 'lee@example.com' },
  { id: 3, name: '박민수', age: 28, job: '기획자', email: 'park@example.com' },
  { id: 4, name: '정수진', age: 32, job: '개발자', email: 'jung@example.com' },
];

export const Default: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    selectable: false,
    sortable: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 테이블입니다. 헤더와 데이터를 표시합니다.',
      },
    },
  },
};

export const Selectable: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    selectable: true,
    sortable: false,
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      const selectedRows = ref<number[]>([]);

      const handleRowSelect = (rowId: number, selected: boolean) => {
        if (selected) {
          selectedRows.value.push(rowId);
        } else {
          selectedRows.value = selectedRows.value.filter((id) => id !== rowId);
        }
        console.log('선택된 행:', selectedRows.value);
      };

      return {
        ...args,
        selectedRows,
        handleRowSelect,
      };
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600">선택된 행: {{ selectedRows.join(', ') || '없음' }}</p>
        <BaseTable
          :headers="headers"
          :data="data"
          :selectable="selectable"
          :sortable="sortable"
          :selected-rows="selectedRows"
          @row-select="handleRowSelect"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '행 선택이 가능한 테이블입니다. 행을 클릭하여 선택할 수 있습니다.',
      },
    },
  },
};

export const Sortable: Story = {
  args: {
    headers: [
      { key: 'name', title: '이름', width: '200px', sortable: true },
      { key: 'age', title: '나이', width: '100px', align: 'center', sortable: true },
      { key: 'job', title: '직업', width: '150px', sortable: true },
      { key: 'email', title: '이메일', width: '250px' },
    ],
    data: sampleData,
    selectable: false,
    sortable: true,
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      const handleSort = (key: string, direction: 'asc' | 'desc') => {
        console.log('정렬:', key, direction);
      };

      return {
        ...args,
        handleSort,
      };
    },
    template: `
      <BaseTable
        :headers="headers"
        :data="data"
        :selectable="selectable"
        :sortable="sortable"
        @sort="handleSort"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '정렬이 가능한 테이블입니다. 헤더를 클릭하여 정렬할 수 있습니다.',
      },
    },
  },
};

export const CustomCellRenderer: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    selectable: false,
    sortable: false,
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      return { args };
    },
    template: `
      <BaseTable
        :headers="args.headers"
        :data="args.data"
        :selectable="args.selectable"
        :sortable="args.sortable"
      >
        <template #body-cell="{ row, header, value }">
          <div class="h-12">
            <div class="bg-[#ffffff] relative w-full h-full">
              <div class="absolute border-[#dadbdd] border-[1px_0px] border-solid inset-0 pointer-events-none" />
              <div class="flex flex-row items-center relative size-full">
                <div class="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-[15px] py-3 relative size-full">
                  <div class="font-regular leading-[0] not-italic relative shrink-0 text-[#131313] text-[14px] text-left text-nowrap tracking-[-0.35px]">
                    <span v-if="header.key === 'age'" class="block whitespace-pre">{{ value }}세</span>
                    <span v-else-if="header.key === 'email'" class="block whitespace-pre text-blue-600">{{ value }}</span>
                    <span v-else class="block whitespace-pre">{{ value }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </BaseTable>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '커스텀 셀 렌더러를 사용한 테이블입니다. 나이에 "세"를 추가하고 이메일을 파란색으로 표시합니다.',
      },
    },
  },
};

export const EmptyTable: Story = {
  args: {
    headers: sampleHeaders,
    data: [],
    selectable: false,
    sortable: false,
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      return { args };
    },
    template: `
      <BaseTable
        :headers="args.headers"
        :data="args.data"
        :selectable="args.selectable"
        :sortable="args.sortable"
      >
        <template #body>
          <div class="flex w-full h-32 items-center justify-center text-gray-500">
            데이터가 없습니다.
          </div>
        </template>
      </BaseTable>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '빈 데이터 테이블입니다. 데이터가 없을 때 표시할 내용을 커스텀할 수 있습니다.',
      },
    },
  },
};
