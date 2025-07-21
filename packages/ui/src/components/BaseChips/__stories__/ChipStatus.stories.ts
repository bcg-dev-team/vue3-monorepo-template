import ChipStatus from '../ChipStatus.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ChipStatus> = {
  title: 'BaseChips/ChipStatus',
  component: ChipStatus,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Chip/Status](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1346-18267&m=dev)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ChipStatus>;

export const Done: Story = {
  args: {
    status: 'Done',
  },
  parameters: {
    docs: {
      description: {
        story: '완료(Done) 상태의 칩 예시입니다.',
      },
    },
  },
};

export const Pending: Story = {
  args: {
    status: 'Pending',
  },
  parameters: {
    docs: {
      description: {
        story: '대기중(Pending) 상태의 칩 예시입니다.',
      },
    },
  },
};
