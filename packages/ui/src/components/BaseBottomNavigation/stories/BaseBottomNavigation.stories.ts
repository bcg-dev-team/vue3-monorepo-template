import type { BottomNavigationItem } from '../BaseBottomNavigation.vue';
import BaseBottomNavigation from '../BaseBottomNavigation.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof BaseBottomNavigation> = {
  title: 'Components/BaseBottomNavigation',
  component: BaseBottomNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Material UI의 Bottom Navigation을 참고하여 구현된 Vue 3 하단 네비게이션 컴포넌트입니다. <br/> 3-5개의 네비게이션 아이템을 하단에 표시하며, 각 아이템은 아이콘과 라벨을 가집니다.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: '네비게이션 아이템 배열',
      table: {
        type: {
          summary: 'BottomNavigationItem[]',
          detail: `interface BottomNavigationItem {
  value: string | number
  label: string
  icon: IconName
  iconSize?: 'sm' | 'md' | 'lg'
  iconColor?: string
  disabled?: boolean
}`,
        },
      },
    },
    value: {
      control: 'text',
      description: '현재 선택된 아이템의 값',
    },
    showLabels: {
      control: 'boolean',
      description: '라벨 표시 여부 (3개 이하일 때는 자동으로 true)',
    },
    // fixed 제거
    // customClass는 사용하지 않음
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseBottomNavigation>;

/**
 * 기본 3개 아이템 네비게이션
 */
export const Default: Story = {
  args: {
    items: [
      { value: 'home', label: '홈', icon: 'home', iconSize: 'md' },
      { value: 'order', label: '주문', icon: 'order', iconSize: 'md' },
      { value: 'trade', label: '거래', icon: 'trade', iconSize: 'md' },
    ],
    value: 'home',
    // fixed 제거
  },
  render: (args) => ({
    components: { BaseBottomNavigation },
    setup() {
      const selectedValue = ref(args.value);
      const handleChange = (value: string | number) => {
        selectedValue.value = value;
      };
      return { ...args, value: selectedValue, handleChange };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="width: 300px; height: 500px; background: #f5f5f5; border: 1px solid #e5e7eb; border-radius: 0; overflow: hidden; display: flex; flex-direction: column;">
          <div style="flex: 1; overflow: auto; background: white; padding: 12px;">
            <h2>BaseBottomNavigation 예시</h2>
            <p>현재 선택된 값: {{ value }}</p>
          </div>
          <BaseBottomNavigation :items="items" :value="value" @change="handleChange" />
        </div>
      </div>
    `,
  }),
};

/**
 * 4개 아이템 (라벨 표시)
 */
export const FourItemsWithLabels: Story = {
  args: {
    items: [
      { value: 'home', label: '홈', icon: 'home', iconSize: 'md' },
      { value: 'order', label: '주문', icon: 'order', iconSize: 'md' },
      { value: 'trade', label: '거래', iconSize: 'md', icon: 'trade' },
      { value: 'asset', label: '자산', icon: 'asset', iconSize: 'md' },
    ],
    value: 'order',
    showLabels: true,
    // fixed 제거
  },
  render: (args) => ({
    components: { BaseBottomNavigation },
    setup() {
      const selectedValue = ref(args.value);
      const handleChange = (value: string | number) => {
        selectedValue.value = value;
      };
      return { ...args, value: selectedValue, handleChange };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="width: 300px; height: 500px; background: #f5f5f5; border: 1px solid #e5e7eb; border-radius: 0; overflow: hidden; display: flex; flex-direction: column;">
          <div style="flex: 1; overflow: auto; background: white; padding: 12px;">
            <h2>4개 아이템 (라벨 표시)</h2>
            <p>현재 선택된 값: {{ value }}</p>
          </div>
          <BaseBottomNavigation :items="items" :value="value" :show-labels="showLabels" @change="handleChange" />
        </div>
      </div>
    `,
  }),
};

/**
 * 4개 아이템 (아이콘만)
 */
export const FourItemsIconsOnly: Story = {
  args: {
    items: [
      { value: 'home', label: '홈', icon: 'home', iconSize: 'md' },
      { value: 'order', label: '주문', icon: 'order', iconSize: 'md' },
      { value: 'trade', label: '거래', icon: 'trade', iconSize: 'md' },
      { value: 'asset', label: '자산', icon: 'asset', iconSize: 'md' },
    ],
    value: 'trade',
    showLabels: false,
    // fixed 제거
  },
  render: (args) => ({
    components: { BaseBottomNavigation },
    setup() {
      const selectedValue = ref(args.value);
      const handleChange = (value: string | number) => {
        selectedValue.value = value;
      };
      return { ...args, value: selectedValue, handleChange };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="width: 300px; height: 500px; background: #f5f5f5; border: 1px solid #e5e7eb; border-radius: 0; overflow: hidden; display: flex; flex-direction: column;">
          <div style="flex: 1; overflow: auto; background: white; padding: 12px;">
            <h2>4개 아이템 (아이콘만)</h2>
            <p>현재 선택된 값: {{ value }}</p>
          </div>
          <BaseBottomNavigation :items="items" :value="value" :show-labels="showLabels" @change="handleChange" />
        </div>
      </div>
    `,
  }),
};

/**
 * 5개 아이템
 */
export const FiveItems: Story = {
  args: {
    items: [
      { value: 'home', label: '홈', icon: 'home', iconSize: 'md' },
      { value: 'order', label: '주문', icon: 'order', iconSize: 'md' },
      { value: 'trade', label: '거래', icon: 'trade', iconSize: 'md' },
      { value: 'asset', label: '자산', icon: 'asset', iconSize: 'md' },
      { value: 'account-balance', label: '계좌관리', icon: 'account-balance', iconSize: 'md' },
    ],
    value: 'account-balance',
    showLabels: false,
    // fixed 제거
  },
  render: (args) => ({
    components: { BaseBottomNavigation },
    setup() {
      const selectedValue = ref(args.value);
      const handleChange = (value: string | number) => {
        selectedValue.value = value;
      };
      return { ...args, value: selectedValue, handleChange };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="width: 300px; height: 500px; background: #f5f5f5; border: 1px solid #e5e7eb; border-radius: 0; overflow: hidden; display: flex; flex-direction: column;">
          <div style="flex: 1; overflow: auto; background: white; padding: 12px;">
            <h2>5개 아이템</h2>
            <p>현재 선택된 값: {{ value }}</p>
          </div>
          <BaseBottomNavigation :items="items" :value="value" :show-labels="showLabels" @change="handleChange" />
        </div>
      </div>
    `,
  }),
};

/**
 * 비활성화된 아이템 포함
 */
export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        value: 'home',
        label: '홈',
        icon: 'home',
        iconSize: 'md',
      },
      {
        value: 'order',
        label: '주문',
        icon: 'order',
        iconSize: 'md',
        disabled: true,
      },
      {
        value: 'trade',
        label: '거래',
        icon: 'trade',
        iconSize: 'md',
      },
      {
        value: 'account-balance',
        label: '계좌관리',
        icon: 'account-balance',
        iconSize: 'md',
        disabled: true,
      },
    ],
    value: 'home',
  },
  render: (args) => ({
    components: { BaseBottomNavigation },
    setup() {
      const selectedValue = ref(args.value);
      const handleChange = (value: string | number) => {
        selectedValue.value = value;
      };
      return { ...args, value: selectedValue, handleChange };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="width: 300px; height: 500px; background: #f5f5f5; border: 1px solid #e5e7eb; border-radius: 0; overflow: hidden; display: flex; flex-direction: column;">
          <div style="flex: 1; overflow: auto; background: white; padding: 12px;">
            <h2>비활성화된 아이템 포함</h2>
            <p>현재 선택된 값: {{ value }}</p>
            <p>검색과 프로필 아이템이 비활성화되어 있습니다.</p>
          </div>
          <BaseBottomNavigation :items="items" :value="value" @change="handleChange" />
        </div>
      </div>
    `,
  }),
};

/**
 * 고정되지 않은 네비게이션
 */
export const NotFixed: Story = {
  args: {
    items: [
      { value: 'home', label: '홈', icon: 'home', iconSize: 'md' },
      { value: 'order', label: '주문', icon: 'order', iconSize: 'md' },
      { value: 'trade', label: '거래', icon: 'trade', iconSize: 'md' },
    ],
    value: 'home',
    // fixed 제거
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => ({
    components: { BaseBottomNavigation },
    setup() {
      const selectedValue = ref(args.value);
      const handleChange = (value: string | number) => {
        selectedValue.value = value;
      };
      return { ...args, value: selectedValue, handleChange };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="width: 300px; height: 500px; background: #f5f5f5; border: 1px solid #e5e7eb; border-radius: 0; overflow: hidden; display: flex; flex-direction: column;">
          <div style="flex: 1; overflow: auto; background: white; padding: 12px;">
            <h2>고정되지 않은 네비게이션</h2>
            <p>현재 선택된 값: {{ value }}</p>
            <p>이 네비게이션은 하단에 고정되지 않습니다.</p>
            <p>폰 화면(300x700) 내 하단 네비게이션</p>
          </div>
          <BaseBottomNavigation :items="items" :value="value" @change="handleChange" />
        </div>
      </div>
    `,
  }),
};

/**
 * 커스텀 아이콘 색상
 */
export const CustomIconColors: Story = {
  args: {
    items: [
      { value: 'home', label: '홈', icon: 'home', iconSize: 'md', iconColor: '#3b82f6' },
      { value: 'order', label: '주문', icon: 'order', iconSize: 'md', iconColor: '#10b981' },
      { value: 'trade', label: '거래', icon: 'trade', iconSize: 'md', iconColor: '#ef4444' },
    ],
    value: 'home',
    // fixed 제거
  },
  render: (args) => ({
    components: { BaseBottomNavigation },
    setup() {
      const selectedValue = ref(args.value);
      const handleChange = (value: string | number) => {
        selectedValue.value = value;
      };
      return { ...args, value: selectedValue, handleChange };
    },
    template: `
      <div style="height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="width: 300px; height: 500px; background: #f5f5f5; border: 1px solid #e5e7eb; border-radius: 0; overflow: hidden; display: flex; flex-direction: column;">
          <div style="flex: 1; overflow: auto; background: white; padding: 12px;">
            <h2>커스텀 아이콘 색상</h2>
            <p>현재 선택된 값: {{ value }}</p>
            <p>각 아이콘에 다른 색상이 적용되어 있습니다.</p>
          </div>
          <BaseBottomNavigation :items="items" :value="value" @change="handleChange" />
        </div>
      </div>
    `,
  }),
};
