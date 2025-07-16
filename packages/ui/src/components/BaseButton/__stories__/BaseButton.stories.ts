import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '../BaseButton.vue';

const iconOptions = ['none', 'plus', 'home', 'user'];

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
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
        'disabled',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['regular', 'small', 'pill', 'small-inner'],
    },
    label: { control: 'text' },
    subLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    leftIcon: {
      control: { type: 'select' },
      options: iconOptions,
      mapping: {
        none: undefined,
        plus: { name: 'plus', size: 'md', color: 'primary' },
        home: { name: 'home', size: 'md', color: 'primary' },
        user: { name: 'user', size: 'md', color: 'primary' },
      },
      labels: {
        none: '없음',
        plus: '플러스',
        home: '홈',
        user: '유저',
      },
    },
    rightIcon: {
      control: { type: 'select' },
      options: iconOptions,
      mapping: {
        none: undefined,
        plus: { name: 'plus', size: 'md', color: 'primary' },
        home: { name: 'home', size: 'md', color: 'primary' },
        user: { name: 'user', size: 'md', color: 'primary' },
      },
      labels: {
        none: '없음',
        plus: '플러스',
        home: '홈',
        user: '유저',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '<a href="https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=32-244&t=Nx8blgYQ0WCWXVeQ-4" target="_blank" rel="noopener">Figma 링크</a>',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'regular',
    label: 'Button',
    leftIcon: { name: 'plus', size: 'md', color: 'primary' },
    rightIcon: undefined,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'regular',
    label: 'Button',
  },
};

export const Red: Story = {
  args: {
    variant: 'red',
    size: 'regular',
    label: 'Button',
  },
};

export const Blue: Story = {
  args: {
    variant: 'blue',
    size: 'regular',
    label: 'Button',
  },
};

export const Pill: Story = {
  args: {
    variant: 'pill',
    size: 'pill',
    label: 'Button',
  },
};

export const LightSolid: Story = {
  args: {
    variant: 'light-solid',
    size: 'regular',
    label: 'Button',
  },
};

export const RedSolid: Story = {
  args: {
    variant: 'red-solid',
    size: 'regular',
    label: 'Button',
  },
};

export const BlueSolid: Story = {
  args: {
    variant: 'blue-solid',
    size: 'regular',
    label: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    size: 'regular',
    label: 'Button',
    disabled: true,
  },
};

// props별 단독 확인 스토리 추가
export const SizeSmall: Story = {
  args: {
    size: 'small',
    variant: 'primary',
    label: 'Button',
  },
};

export const SizePill: Story = {
  args: {
    size: 'pill',
    variant: 'primary',
    label: 'Button',
  },
};

export const SizeSmallInner: Story = {
  args: {
    size: 'small-inner',
    variant: 'primary',
    label: 'Button',
  },
};

export const DisabledProp: Story = {
  args: {
    disabled: true,
    variant: 'primary',
    size: 'regular',
    label: 'Button',
  },
};

export const WithSubLabel: Story = {
  args: {
    subLabel: 'Sub label',
    variant: 'primary',
    size: 'regular',
    label: 'Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Button',
    leftIcon: { name: 'plus', size: 'md', color: 'primary' },
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Button',
    rightIcon: { name: 'plus', size: 'md', color: 'primary' },
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Button',
    leftIcon: { name: 'plus', size: 'md', color: 'primary' },
    rightIcon: { name: 'plus', size: 'md', color: 'primary' },
  },
};
