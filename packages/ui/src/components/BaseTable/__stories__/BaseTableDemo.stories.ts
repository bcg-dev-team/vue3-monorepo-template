import BaseTableDemo from '../BaseTableDemo.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseTableDemo> = {
  title: 'BaseTable/BaseTableDemo',
  component: BaseTableDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 디자인을 반영한 테이블 데모 컴포넌트입니다.\n\n**Figma 링크**: [Table/Header](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-997&m=dev), [Table/Body-Input](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-1059&m=dev)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BaseTableDemo>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Figma 디자인을 정확히 반영한 테이블 데모입니다. 입력 필드, 버튼, 체크박스가 포함된 실제 사용 예시를 보여줍니다.',
      },
    },
  },
};
