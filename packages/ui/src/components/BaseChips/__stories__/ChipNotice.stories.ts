import ChipNotice from '../ChipNotice.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ChipNotice> = {
  title: 'BaseChips/ChipNotice',
  component: ChipNotice,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Chip/Notice](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=108-1955&m=dev)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ChipNotice>;

export const Default: Story = {
  args: {
    label: '업무공지',
  },
  parameters: {
    docs: {
      description: {
        story: '공지(Notice) 칩의 기본 예시입니다.',
      },
    },
  },
};
