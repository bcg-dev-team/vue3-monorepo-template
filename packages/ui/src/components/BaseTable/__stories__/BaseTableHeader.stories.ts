import type { Meta, StoryObj } from '@storybook/vue3';
import BaseTableHeader from '../BaseTableHeader.vue';

const meta: Meta<typeof BaseTableHeader> = {
  title: 'Components/BaseTableHeader',
  component: BaseTableHeader,
  parameters: {
    docs: {
      description: {
        component:
          '테이블 헤더 컴포넌트입니다. Type1과 Type2 스타일을 지원합니다.\n\n**Figma 링크**: [Table/Header](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-997&m=dev), [Table/Header-Type2](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=82-940&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['type1', 'type2'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Type1: Story = {
  args: {
    title: '총 회원수(명)',
    type: 'type1',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type1 스타일의 테이블 헤더입니다. 작은 폰트 크기와 얇은 하단 테두리를 사용합니다.',
      },
    },
  },
};

export const Type2: Story = {
  args: {
    title: '총 회원수(명)',
    type: 'type2',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 스타일의 테이블 헤더입니다. 큰 폰트 크기와 더 넓은 패딩을 사용합니다.',
      },
    },
  },
};

export const CenterAligned: Story = {
  args: {
    title: '중앙 정렬',
    type: 'type1',
    align: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: '중앙 정렬된 테이블 헤더입니다.',
      },
    },
  },
};

export const RightAligned: Story = {
  args: {
    title: '우측 정렬',
    type: 'type1',
    align: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: '우측 정렬된 테이블 헤더입니다.',
      },
    },
  },
};

export const MultipleHeaders: Story = {
  render: () => ({
    components: { BaseTableHeader },
    template: `
      <div class="flex w-full">
        <div class="flex-1">
          <BaseTableHeader title="이름" type="type1" align="left" />
        </div>
        <div class="flex-1">
          <BaseTableHeader title="나이" type="type1" align="center" />
        </div>
        <div class="flex-1">
          <BaseTableHeader title="직업" type="type1" align="right" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '여러 헤더를 함께 사용한 예시입니다.',
      },
    },
  },
};
