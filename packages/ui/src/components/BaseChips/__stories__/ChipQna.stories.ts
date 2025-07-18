import ChipQna from '../ChipQna.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ChipQna> = {
  title: 'BaseChips/ChipQna',
  component: ChipQna,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Chip/qna](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=116-2845&m=dev)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ChipQna>;

export const Waiting: Story = {
  args: {
    status: '답변대기',
  },
  parameters: {
    docs: {
      description: {
        story: '답변대기 상태의 QnA 칩 예시입니다.',
      },
    },
  },
};

export const Done: Story = {
  args: {
    status: '답변완료',
  },
  parameters: {
    docs: {
      description: {
        story: '답변완료 상태의 QnA 칩 예시입니다.',
      },
    },
  },
};
