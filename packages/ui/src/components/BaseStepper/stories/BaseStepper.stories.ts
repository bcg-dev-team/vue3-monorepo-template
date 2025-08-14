import type { Meta, StoryObj } from '@storybook/vue3';
import BaseStepper from '../BaseStepper.vue';

const meta: Meta<typeof BaseStepper> = {
  title: 'Components/BaseStepper',
  component: BaseStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['label', 'dot'],
      description: 'Stepper의 표시 방식을 설정합니다.',
    },
    stepLabelList: {
      control: { type: 'object' },
      description: 'variant가 label일 때 사용할 단계 라벨 배열입니다.',
    },
    count: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'variant가 dot일 때 표시할 인디케이터 개수입니다.',
    },
    current: {
      control: { type: 'number', min: 0, max: 9, step: 1 },
      description: '현재 활성화된 단계의 인덱스입니다 (0부터 시작).',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 라벨 스테퍼
export const LabelDefault: Story = {
  args: {
    variant: 'label',
    stepLabelList: ['유형 선택', '금액 입력', '승인 완료'],
    current: 0,
  },
};

// 진행 중인 라벨 스테퍼
export const LabelInProgress: Story = {
  args: {
    variant: 'label',
    stepLabelList: ['회원가입', '이메일 인증', '프로필 설정', '완료'],
    current: 1,
  },
};

// 완료된 라벨 스테퍼
export const LabelCompleted: Story = {
  args: {
    variant: 'label',
    stepLabelList: ['주문 확인', '결제', '배송', '완료'],
    current: 3,
  },
};

// 기본 점 스테퍼
export const DotDefault: Story = {
  args: {
    variant: 'dot',
    count: 5,
    current: 0,
    stepLabelList: [], // dot 모드에서는 사용하지 않음
  },
};

// 진행 중인 점 스테퍼
export const DotInProgress: Story = {
  args: {
    variant: 'dot',
    count: 6,
    current: 2,
    stepLabelList: [],
  },
};
