import type { Meta, StoryObj } from '@storybook/vue3';
import BaseTab from '../BaseTab.vue';

/**
 * BaseTab 컴포넌트
 *
 * Headless UI의 Tab 컴포넌트를 기반으로 한 탭 인터페이스입니다.
 * 카테고리별로 콘텐츠를 구분하여 표시할 수 있습니다.
 */
const meta: Meta<typeof BaseTab> = {
  title: 'Components/BaseTab',
  component: BaseTab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '탭 인터페이스를 제공하는 컴포넌트입니다. 카테고리별로 콘텐츠를 구분하여 표시할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // 명시적으로 컨트롤 타입 지정
    tabs: {
      control: 'object',
      description: '탭 카테고리 객체',
    },
    modelValue: {
      control: { type: 'text' },
      description: '현재 선택된 탭 값',
    },
    variant: {
      control: { type: 'radio' },
      options: ['underline', 'inner'],
      description: '탭 디자인 타입',
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md'],
      description: '탭 크기',
    },
    underline: {
      control: 'boolean',
      description: '밑줄 여부',
    },
    hasBackground: {
      control: 'boolean',
      description: '배경색 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: {
      Limit: {
        value: 'Limit',
      },
      Stop: {
        value: 'Stop',
      },
      'Stop Limit': {
        value: 'Stop Limit',
      },
      'Profit & Loss': {
        value: 'Profit & Loss',
      },
    },
    modelValue: 'Limit',
    ariaLabel: '주문 타입 탭',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본적인 탭 인터페이스를 보여줍니다. Limit, Stop, Stop Limit, Profit & Loss 카테고리가 있으며, 각각 관련 컨텐츠를 표시합니다.',
      },
    },
  },
};
