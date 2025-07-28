import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BaseTabs from '../BaseTabs.vue';

const meta: Meta<typeof BaseTabs> = {
  title: 'Tabs/Tabs',
  component: BaseTabs,
  parameters: {
    docs: {
      description: {
        component:
          'v-if를 활용한 세 가지 탭 디자인을 지원하는 컴포넌트입니다. 연결된 탭, 개별 탭, 카드 탭 형태를 제공하며, 탭 순서에 따라 [빨간색, 파란색, 초록색, 보라색] 순환합니다.\n\n[Figma 링크](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=58-877&m=dev)',
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['connected', 'individual', 'card'],
      description: '탭 디자인 타입',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'connected' },
      },
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: '탭 그룹의 방향',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: '탭 그룹의 크기',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    showContent: {
      control: { type: 'boolean' },
      description: '컨텐츠 영역 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    modelValue: {
      control: { type: 'text' },
      description: '현재 선택된 탭의 값',
      table: {
        type: { summary: 'string | number' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 탭 데이터 (4개)
const defaultTabs = [
  { 
    value: 'tab1', 
    label: '첫 번째 탭', 
    content: '빨간색 탭의 컨텐츠입니다. 이 탭은 Trade Long 색상을 사용합니다.' 
  },
  { 
    value: 'tab2', 
    label: '두 번째 탭', 
    content: '파란색 탭의 컨텐츠입니다. 이 탭은 Trade Short 색상을 사용합니다.' 
  },
  { 
    value: 'tab3', 
    label: '세 번째 탭', 
    content: '초록색 탭의 컨텐츠입니다. 이 탭은 Trade Correct 색상을 사용합니다.' 
  },
  { 
    value: 'tab4', 
    label: '네 번째 탭', 
    content: '보라색 탭의 컨텐츠입니다. 이 탭은 Trade Cancel 색상을 사용합니다.' 
  },
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

// ===== 기본 디자인 스토리들 =====

// 연결된 탭 스토리 (첫 번째 탭 디자인)
export const Connected: Story = {
  render: (args: any) => ({
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
          variant="connected"
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
    variant: 'connected',
    direction: 'horizontal',
    size: 'md',
    showContent: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '연결된 탭 형태입니다. 탭들이 서로 연결되어 있으며, 컨텐츠 영역도 선택된 탭과 같은 색상으로 변경됩니다.',
      },
    },
  },
};

// 개별 탭 스토리 (두 번째 탭 디자인)
export const Individual: Story = {
  render: (args: any) => ({
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
          variant="individual"
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
    variant: 'individual',
    direction: 'horizontal',
    size: 'md',
    showContent: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '개별 탭 형태입니다. 각 탭이 독립적으로 표시되며, 선택된 탭만 색상이 변경됩니다.',
      },
    },
  },
};

// 카드 탭 스토리 (세 번째 탭 디자인)
export const Card: Story = {
  render: (args: any) => ({
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
          variant="card"
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
    variant: 'card',
    direction: 'horizontal',
    size: 'md',
    showContent: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '카드 형태 탭입니다. 각 탭이 카드처럼 표시되며, 선택 시 그림자 효과와 함께 위로 올라가는 애니메이션이 적용됩니다.',
      },
    },
  },
};

// ===== 상태별 스토리들 =====

// 비활성화된 탭이 있는 스토리
export const WithDisabledTabs: Story = {
  render: (args: any) => ({
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
          :variant="args.variant"
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
    variant: 'connected',
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

// 5개 이상 탭 스토리 (색상 순환 확인)
export const ExtendedTabs: Story = {
  render: (args: any) => ({
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
          :variant="args.variant"
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
    variant: 'connected',
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

// ===== 레이아웃 스토리들 =====

// 세로 방향 스토리
export const Vertical: Story = {
  render: (args: any) => ({
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
          :variant="args.variant"
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
    variant: 'connected',
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

// ===== 크기별 스토리들 =====

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
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Small Size</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab1"
            variant="individual"
            size="sm"
            :show-content="false"
            @tab-click="(value) => handleTabChange(value, selectedTab1)"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Medium Size (Default)</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab2"
            variant="individual"
            size="md"
            :show-content="false"
            @tab-click="(value) => handleTabChange(value, selectedTab2)"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Large Size</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab3"
            variant="individual"
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

// ===== 기능별 스토리들 =====

// 컨텐츠 없이 탭만 표시
export const TabsOnly: Story = {
  render: (args: any) => ({
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
          :variant="args.variant"
          :direction="args.direction"
          :size="args.size"
          :show-content="false"
          @tab-click="handleTabChange"
        />
        <div class="mt-4 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">선택된 탭: <strong>{{ selectedTab }}</strong></p>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    variant: 'connected',
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

// ===== 비교 스토리들 =====

// 모든 디자인 비교 스토리
export const AllVariants: Story = {
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
      <div class="space-y-12">
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-6">연결된 탭 (Connected)</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab1"
            variant="connected"
            :show-content="true"
            @tab-click="(value) => handleTabChange(value, selectedTab1)"
          />
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-6">개별 탭 (Individual)</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab2"
            variant="individual"
            :show-content="true"
            @tab-click="(value) => handleTabChange(value, selectedTab2)"
          />
        </div>
        
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-6">카드 탭 (Card)</h3>
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab3"
            variant="card"
            :show-content="true"
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
          '세 가지 탭 디자인을 모두 비교할 수 있는 예시입니다. 각각의 디자인 특징을 확인할 수 있습니다.',
      },
    },
  },
};

// ===== 인터랙티브 테스트 스토리 =====

// 인터랙티브 테스트 스토리
export const InteractiveTest: Story = {
  render: () => ({
    components: { BaseTabs },
    setup() {
      const selectedTab = ref('tab1');
      const currentVariant = ref('connected');
      const currentSize = ref('md');
      const showContent = ref(true);

      const handleTabChange = (value: string) => {
        selectedTab.value = value;
      };

      const variants = ['connected', 'individual', 'card'];
      const sizes = ['sm', 'md', 'lg'];

      return {
        selectedTab,
        currentVariant,
        currentSize,
        showContent,
        handleTabChange,
        variants,
        sizes,
        tabs: defaultTabs,
      };
    },
    template: `
      <div class="space-y-8">
        <!-- 컨트롤 패널 -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">컨트롤 패널</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Variant</label>
              <select 
                v-model="currentVariant"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="variant in variants" :key="variant" :value="variant">
                  {{ variant }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select 
                v-model="currentSize"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option v-for="size in sizes" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Show Content</label>
              <input 
                type="checkbox" 
                v-model="showContent"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
          <div class="mt-4 p-3 bg-blue-50 rounded">
            <p class="text-sm text-blue-800">
              선택된 탭: <strong>{{ selectedTab }}</strong> | 
              Variant: <strong>{{ currentVariant }}</strong> | 
              Size: <strong>{{ currentSize }}</strong>
            </p>
          </div>
        </div>

        <!-- 탭 컴포넌트 -->
        <div class="max-w-4xl">
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTab"
            :variant="currentVariant"
            :size="currentSize"
            :show-content="showContent"
            @tab-click="handleTabChange"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '인터랙티브 테스트 환경입니다. Variant, Size, Show Content 옵션을 실시간으로 변경하여 컴포넌트의 동작을 테스트할 수 있습니다.',
      },
    },
  },
};
