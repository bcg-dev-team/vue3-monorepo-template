import ChipUpdown from '../ChipUpdown.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ChipUpdown> = {
  title: 'BaseChips/ChipUpdown',
  component: ChipUpdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Chip/Updown](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1028-8543&m=dev)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ChipUpdown>;

export const Up: Story = {
  args: {
    status: 'Up',
    value: '+0.03%',
  },
  parameters: {
    docs: {
      description: {
        story: '상승(Up) 상태의 칩 예시입니다.',
      },
    },
  },
};

export const Down: Story = {
  args: {
    status: 'Down',
    value: '-1.15%',
  },
  parameters: {
    docs: {
      description: {
        story: '하락(Down) 상태의 칩 예시입니다.',
      },
    },
  },
};
