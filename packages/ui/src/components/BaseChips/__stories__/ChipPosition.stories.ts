import ChipPosition from '../ChipPosition.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ChipPosition> = {
  title: 'BaseChips/ChipPosition',
  component: ChipPosition,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Chip/Position](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1028-8538&m=dev)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ChipPosition>;

export const Long: Story = {
  args: {
    status: 'LONG',
  },
  parameters: {
    docs: {
      description: {
        story: 'LONG 상태의 포지션 칩 예시입니다.',
      },
    },
  },
};

export const Short: Story = {
  args: {
    status: 'SHORT',
  },
  parameters: {
    docs: {
      description: {
        story: 'SHORT 상태의 포지션 칩 예시입니다.',
      },
    },
  },
};
