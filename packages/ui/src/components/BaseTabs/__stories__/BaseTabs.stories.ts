import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BaseTabs from '../BaseTabs.vue';

const meta: Meta<typeof BaseTabs> = {
  title: 'Components/BaseTabs',
  component: BaseTabs,
  parameters: {
    docs: {
      description: {
        component:
          'Headless UI 기반 탭 컴포넌트입니다. 탭 순서에 따라 [빨간색, 파란색, 초록색, 보라색] 순환하며, 컨텐츠 영역도 선택된 탭과 같은 색상으로 변경됩니다.\n\n[Figma 링크](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=58-877&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'select',
      options: ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'],
      description: '현재 선택된 탭의 값',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '탭 그룹의 방향',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '탭 그룹의 크기',
    },
    showContent: {
      control: 'boolean',
      description: '컨텐츠 영역 표시 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 탭 데이터 (4개)
const defaultTabs = [
  { value: 'tab1', label: '첫 번째 탭', content: '빨간색 탭의 컨텐츠입니다.' },
  { value: 'tab2', label: '두 번째 탭', content: '파란색 탭의 컨텐츠입니다.' },
  { value: 'tab3', label: '세 번째 탭', content: '초록색 탭의 컨텐츠입니다.' },
  { value: 'tab4', label: '네 번째 탭', content: '보라색 탭의 컨텐츠입니다.' },
];

// 5개 이상 탭 데이터 (색상 순환 확인용)
const extendedTabs = [
  { value: 'tab1', label: '첫 번째 탭', content: '빨간색 탭의 컨텐츠입니다.' },
  { value: 'tab2', label: '두 번째 탭', content: '파란색 탭의 컨텐츠입니다.' },
  { value: 'tab3', label: '세 번째 탭', content: '초록색 탭의 컨텐츠입니다.' },
  { value: 'tab4', label: '네 번째 탭', content: '보라색 탭의 컨텐츠입니다.' },
  { value: 'tab5', label: '다섯 번째 탭', content: '다시 빨간색 탭의 컨텐츠입니다.' },
  { value: 'tab6', label: '여섯 번째 탭', content: '다시 파란색 탭의 컨텐츠입니다.' },
];

// 비활성화된 탭이 포함된 데이터
const disabledTabs = [
  { value: 'tab1', label: '첫 번째 탭', content: '빨간색 탭의 컨텐츠입니다.' },
  { value: 'tab2', label: '두 번째 탭', disabled: true, content: '비활성화된 탭입니다.' },
  { value: 'tab3', label: '세 번째 탭', content: '초록색 탭의 컨텐츠입니다.' },
  { value: 'tab4', label: '네 번째 탭', content: '보라색 탭의 컨텐츠입니다.' },
];

// 기본 스토리 (Figma 디자인 기반)
export const Default: Story = {
  render: (args) => ({
    components: { BaseTabs },
    setup() {
      const selectedTab = ref(args.modelValue || 'tab1');

      const handleTabChange = (value: string) => {
        selectedTab.value = value;
      };

      return {
        args,
        selectedTab,
        handleTabChange,
        tabs: defaultTabs,
      };
    },
    template: `
      <div class="max-w-2xl">
        <BaseTabs
          :tabs="tabs"
          v-model="selectedTab"
          :direction="args.direction"
          :size="args.size"
          :show-content="args.showContent"
          @tab-click="handleTabChange"
        />
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    direction: 'horizontal',
    size: 'md',
    showContent: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Figma 디자인에 따른 기본 탭 컴포넌트입니다. 탭 순서에 따라 [빨간색, 파란색, 초록색, 보라색] 순환하며, 컨텐츠 영역도 선택된 탭과 같은 색상으로 변경됩니다.',
      },
    },
  },
};

// 5개 이상 탭 스토리 (색상 순환 확인)
export const ExtendedTabs: Story = {
  render: (args) => ({
    components: { BaseTabs },
    setup() {
      const selectedTab = ref(args.modelValue || 'tab1');

      const handleTabChange = (value: string) => {
        selectedTab.value = value;
      };

      return {
        args,
        selectedTab,
        handleTabChange,
        tabs: extendedTabs,
      };
    },
    template: `
      <div class="max-w-4xl">
        <BaseTabs
          :tabs="tabs"
          v-model="selectedTab"
          :direction="args.direction"
          :size="args.size"
          :show-content="args.showContent"
          @tab-click="handleTabChange"
        />
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    direction: 'horizontal',
    size: 'md',
    showContent: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '5개 이상의 탭이 있는 경우 색상이 순환되는 것을 확인할 수 있습니다. 5번째 탭부터 다시 빨간색으로 시작합니다.',
      },
    },
  },
};

// 비활성화된 탭이 있는 스토리
export const WithDisabledTabs: Story = {
  render: (args) => ({
    components: { BaseTabs },
    setup() {
      const selectedTab = ref(args.modelValue || 'tab1');

      const handleTabChange = (value: string) => {
        selectedTab.value = value;
      };

      return {
        args,
        selectedTab,
        handleTabChange,
        tabs: disabledTabs,
      };
    },
    template: `
      <div class="max-w-2xl">
        <BaseTabs
          :tabs="tabs"
          v-model="selectedTab"
          :direction="args.direction"
          :size="args.size"
          :show-content="args.showContent"
          @tab-click="handleTabChange"
        />
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    direction: 'horizontal',
    size: 'md',
    showContent: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '비활성화된 탭이 포함된 예시입니다. 비활성화된 탭은 클릭할 수 없고 시각적으로 구분됩니다.',
      },
    },
  },
};

// 세로 방향 스토리
export const Vertical: Story = {
  render: (args) => ({
    components: { BaseTabs },
    setup() {
      const selectedTab = ref(args.modelValue || 'tab1');

      const handleTabChange = (value: string) => {
        selectedTab.value = value;
      };

      return {
        args,
        selectedTab,
        handleTabChange,
        tabs: defaultTabs,
      };
    },
    template: `
      <div class="max-w-4xl">
        <BaseTabs
          :tabs="tabs"
          v-model="selectedTab"
          :direction="args.direction"
          :size="args.size"
          :show-content="args.showContent"
          @tab-click="handleTabChange"
        />
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    direction: 'vertical',
    size: 'md',
    showContent: true,
  },
  parameters: {
    docs: {
      description: {
        story: '세로 방향으로 배치된 탭 예시입니다. 색상 순환은 동일하게 적용됩니다.',
      },
    },
  },
};

// 다양한 크기 스토리
export const Sizes: Story = {
  render: () => ({
    components: { BaseTabs },
    setup() {
      const selectedTab1 = ref('tab1');
      const selectedTab2 = ref('tab1');
      const selectedTab3 = ref('tab1');

      const handleTabChange = (value: string, selectedRef: any) => {
        selectedRef.value = value;
      };

      return {
        selectedTab1,
        selectedTab2,
        selectedTab3,
        handleTabChange,
        tabs: defaultTabs,
      };
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Small Size</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab1"
            size="sm"
            :show-content="false"
            @tab-click="(value) => handleTabChange(value, selectedTab1)"
          />
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Medium Size (Default)</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab2"
            size="md"
            :show-content="false"
            @tab-click="(value) => handleTabChange(value, selectedTab2)"
          />
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Large Size</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab3"
            size="lg"
            :show-content="false"
            @tab-click="(value) => handleTabChange(value, selectedTab3)"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '다양한 크기의 탭 예시입니다. sm, md, lg 크기를 지원하며 색상 순환은 모든 크기에서 동일하게 적용됩니다.',
      },
    },
  },
};

// 컨텐츠 없이 탭만 표시
export const TabsOnly: Story = {
  render: (args) => ({
    components: { BaseTabs },
    setup() {
      const selectedTab = ref(args.modelValue || 'tab1');

      const handleTabChange = (value: string) => {
        selectedTab.value = value;
      };

      return {
        args,
        selectedTab,
        handleTabChange,
        tabs: defaultTabs,
      };
    },
    template: `
      <div class="max-w-2xl">
        <BaseTabs
          :tabs="tabs"
          v-model="selectedTab"
          :direction="args.direction"
          :size="args.size"
          :show-content="false"
          @tab-click="handleTabChange"
        />
        <div class="mt-4 p-4 bg-gray-50 rounded-lg">
          <p>선택된 탭: {{ selectedTab }}</p>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    direction: 'horizontal',
    size: 'md',
    showContent: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '컨텐츠 영역 없이 탭만 표시하는 예시입니다. 외부에서 선택된 탭 상태를 관리할 수 있습니다.',
      },
    },
  },
};
