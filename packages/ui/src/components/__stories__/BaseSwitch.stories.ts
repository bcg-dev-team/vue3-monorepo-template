import type { Meta, StoryObj } from '@storybook/vue3';
import BaseSwitch from '../BaseSwitch/BaseSwitch.vue';

const meta: Meta<typeof BaseSwitch> = {
  title: 'Inputs/Switch',
  component: BaseSwitch,
  parameters: {
    docs: {
      description: {
        component: `
BaseSwitch 컴포넌트는 토글 스위치 기능을 제공합니다.

## Figma 링크
- [Button/Toggle(20px)](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=36-182&m=dev)

## Props
- \`modelValue\`: 토글 상태 (true: On, false: Off)
- \`size\`: 스위치 크기 (small: 20px, regular: 24px)
- \`disabled\`: 비활성화 여부

## Events
- \`update:modelValue\`: 토글 상태 변경 이벤트
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'regular'],
      description: '스위치 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: () => ({
    components: { BaseSwitch },
    data() {
      return {
        isEnabled: false,
      };
    },
    template: `
      <BaseSwitch 
        v-model="isEnabled" 
        size="regular"
      />
    `,
  }),
};

// 작은 크기 스위치
export const Small: Story = {
  render: () => ({
    components: { BaseSwitch },
    data() {
      return {
        isEnabled: false,
      };
    },
    template: `
      <BaseSwitch 
        v-model="isEnabled" 
        size="small"
      />
    `,
  }),
};

// On 상태
export const On: Story = {
  render: () => ({
    components: { BaseSwitch },
    data() {
      return {
        isEnabled: true,
      };
    },
    template: `
      <BaseSwitch 
        v-model="isEnabled" 
        size="regular"
      />
    `,
  }),
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => ({
    components: { BaseSwitch },
    data() {
      return {
        isEnabled: false,
      };
    },
    template: `
      <BaseSwitch 
        v-model="isEnabled" 
        size="regular"
        disabled
      />
    `,
  }),
};

// 비활성화 상태 (On)
export const DisabledOn: Story = {
  render: () => ({
    components: { BaseSwitch },
    data() {
      return {
        isEnabled: true,
      };
    },
    template: `
      <BaseSwitch 
        v-model="isEnabled" 
        size="regular"
        disabled
      />
    `,
  }),
};

// 인터랙티브 데모 스토리
export const InteractiveDemo: Story = {
  render: () => ({
    components: { BaseSwitch },
    data() {
      return {
        switch1: false,
        switch2: true,
        switch3: false,
        switch4: true,
      };
    },
    template: `
      <div class="space-y-8 p-6">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Interactive Demo</h3>
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-4">
              <h4 class="font-medium">Small Switches</h4>
              <div class="flex items-center justify-between">
                <span>Switch 1</span>
                <BaseSwitch v-model="switch1" size="small" />
              </div>
              <div class="flex items-center justify-between">
                <span>Switch 2</span>
                <BaseSwitch v-model="switch2" size="small" />
              </div>
            </div>
            
            <div class="space-y-4">
              <h4 class="font-medium">Regular Switches</h4>
              <div class="flex items-center justify-between">
                <span>Switch 3</span>
                <BaseSwitch v-model="switch3" size="regular" />
              </div>
              <div class="flex items-center justify-between">
                <span>Switch 4</span>
                <BaseSwitch v-model="switch4" size="regular" />
              </div>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-gray-100 rounded-lg">
            <h4 class="font-medium mb-2">Current States:</h4>
            <div class="text-sm space-y-1">
              <div>Switch 1: {{ switch1 ? 'On' : 'Off' }}</div>
              <div>Switch 2: {{ switch2 ? 'On' : 'Off' }}</div>
              <div>Switch 3: {{ switch3 ? 'On' : 'Off' }}</div>
              <div>Switch 4: {{ switch4 ? 'On' : 'Off' }}</div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}; 