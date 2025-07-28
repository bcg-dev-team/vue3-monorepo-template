import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '../BaseButton.vue';

const meta: Meta<typeof BaseButton> = {
  title: 'Buttons/Button',
  component: BaseButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '<a href="https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=32-244&t=Nx8blgYQ0WCWXVeQ-4" target="_blank" rel="noopener">Figma 링크</a>',
      },
    },
  },
  argTypes: {
    variant: {
      description: '버튼 스타일',
      control: { type: 'select' },
      options: [
        'primary',
        'outline',
        'red',
        'blue',
        'pill',
        'light-solid',
        'red-solid',
        'blue-solid',
        'green-solid',
        'cancel-solid',
        'disabled'
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
        category: 'Props',
      },
    },
    size: {
      description: '버튼 크기',
      control: { type: 'select' },
      options: ['regular', 'small', 'pill', 'small-inner'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
        category: 'Props',
      },
    },
    disabled: {
      description: '비활성화 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    label: {
      description: '버튼 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    subLabel: {
      description: '서브 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Primary 버튼 (Regular 크기)
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '기본 노란색 배경의 Primary 버튼입니다. 좌우 아이콘이 포함되어 있습니다.',
      },
    },
  },
};

// Small 크기 Primary 버튼
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    label: '버튼',
    leftIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '작은 크기의 Primary 버튼입니다.',
      },
    },
  },
};

// Small-inner 크기 Primary 버튼
export const SmallInner: Story = {
  args: {
    variant: 'primary',
    size: 'small-inner',
    label: '버튼',
    leftIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '내부 여백이 작은 Primary 버튼입니다.',
      },
    },
  },
};

// Pill 크기 Primary 버튼
export const Pill: Story = {
  args: {
    variant: 'primary',
    size: 'pill',
    label: '버튼',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '완전히 둥근 모서리의 Primary 버튼입니다.',
      },
    },
  },
};

// Outline 버튼
export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '흰색 배경에 테두리가 있는 Outline 버튼입니다.',
      },
    },
  },
};

// Red 버튼
export const Red: Story = {
  args: {
    variant: 'red',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '빨간색 테두리의 Red 버튼입니다.',
      },
    },
  },
};

// Blue 버튼
export const Blue: Story = {
  args: {
    variant: 'blue',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '파란색 테두리의 Blue 버튼입니다.',
      },
    },
  },
};

// Light Solid 버튼
export const LightSolid: Story = {
  args: {
    variant: 'light-solid',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '연한 노란색 배경의 Light Solid 버튼입니다.',
      },
    },
  },
};

// Red Solid 버튼
export const RedSolid: Story = {
  args: {
    variant: 'red-solid',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '빨간색 배경의 Red Solid 버튼입니다.',
      },
    },
  },
};

// Blue Solid 버튼
export const BlueSolid: Story = {
  args: {
    variant: 'blue-solid',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '파란색 배경의 Blue Solid 버튼입니다.',
      },
    },
  },
};

// Green Solid 버튼
export const GreenSolid: Story = {
  args: {
    variant: 'green-solid',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '초록색 배경의 Green Solid 버튼입니다.',
      },
    },
  },
};

// Cancel Solid 버튼
export const CancelSolid: Story = {
  args: {
    variant: 'cancel-solid',
    size: 'regular',
    label: '버튼',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '보라색 배경의 Cancel Solid 버튼입니다.',
      },
    },
  },
};

// Disabled 버튼
export const Disabled: Story = {
  args: {
    variant: 'disabled',
    size: 'regular',
    label: '버튼',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 버튼입니다.',
      },
    },
  },
};

// 서브 텍스트가 있는 버튼
export const WithSubLabel: Story = {
  args: {
    variant: 'red-solid',
    size: 'regular',
    label: '버튼',
    subLabel: '추가 텍스트',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '메인 텍스트 아래에 서브 텍스트가 있는 버튼입니다.',
      },
    },
  },
};

// 모든 크기 비교
export const AllSizes: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Regular Size</h3>
          <BaseButton variant="primary" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Small Size</h3>
          <BaseButton variant="primary" size="small" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Small-inner Size</h3>
          <BaseButton variant="primary" size="small-inner" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Pill Size</h3>
          <BaseButton variant="primary" size="pill" label="버튼" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '4가지 크기의 Primary 버튼을 비교할 수 있습니다.',
      },
    },
  },
};

// 모든 variant 비교
export const AllVariants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Primary</h3>
          <BaseButton variant="primary" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Outline</h3>
          <BaseButton variant="outline" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Red</h3>
          <BaseButton variant="red" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Blue</h3>
          <BaseButton variant="blue" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Light Solid</h3>
          <BaseButton variant="light-solid" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Red Solid</h3>
          <BaseButton variant="red-solid" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Blue Solid</h3>
          <BaseButton variant="blue-solid" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Green Solid</h3>
          <BaseButton variant="green-solid" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Cancel Solid</h3>
          <BaseButton variant="cancel-solid" size="regular" label="버튼" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Disabled</h3>
          <BaseButton variant="disabled" size="regular" label="버튼" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '11가지 variant의 버튼을 비교할 수 있습니다.',
      },
    },
  },
};
