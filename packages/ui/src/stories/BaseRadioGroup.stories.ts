import type { Meta, StoryObj } from '@storybook/vue3';
import BaseRadioGroup from '../components/BaseRadioGroup/BaseRadioGroup.vue';
import type { RadioOption } from '../types/components';

const meta: Meta<typeof BaseRadioGroup> = {
  title: 'Inputs/RadioGroup',
  component: BaseRadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Headless UI를 기반으로 한 라디오 그룹 컴포넌트입니다. BaseTabs의 inner variant와 동일한 스타일을 적용하여 일관된 디자인을 제공합니다. initialValue로 초기 선택값을 설정할 수 있으며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: '라디오 옵션 목록',
    },
    initialValue: {
      control: 'text',
      description: '초기 선택값 (modelValue가 없을 때만 사용)',
    },
    label: {
      control: 'text',
      description: '라디오 그룹 라벨',
    },
    disabled: {
      control: 'boolean',
      description: '전체 비활성화 여부',
    },
    name: {
      control: 'text',
      description: '폼에서 사용할 name 속성',
    },
    by: {
      control: 'text',
      description: '객체 비교를 위한 키 또는 비교 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 라디오 그룹
export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
    initialValue: 'option1',
    label: '선택하세요',
  },
  parameters: {
    docs: {
      description: {
        story: '기본적인 라디오 그룹입니다. initialValue를 "option1"로 설정하여 첫 번째 옵션이 초기 선택됩니다. 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 아이콘이 있는 라디오 그룹
export const WithIcons: Story = {
  args: {
    options: [
      { value: 'startup', label: '스타트업', icon: 'plus' },
      { value: 'business', label: '비즈니스', icon: 'home' },
      { value: 'enterprise', label: '엔터프라이즈', icon: 'star' },
    ],
    initialValue: 'startup',
    label: '플랜 선택',
  },
  parameters: {
    docs: {
      description: {
        story: '각 옵션에 아이콘이 포함된 라디오 그룹입니다. initialValue를 "startup"으로 설정하여 "스타트업" 옵션이 초기 선택됩니다. 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 비활성화된 옵션이 있는 라디오 그룹
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2', disabled: true },
      { value: 'option3', label: '옵션 3' },
    ],
    initialValue: 'option1',
    label: '옵션 선택',
  },
  parameters: {
    docs: {
      description: {
        story: '일부 옵션이 비활성화된 라디오 그룹입니다. initialValue를 "option1"로 설정하여 첫 번째 옵션이 초기 선택됩니다. 비활성화된 옵션은 선택할 수 없지만, 활성화된 옵션들은 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 전체 비활성화된 라디오 그룹
export const Disabled: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
    initialValue: 'option1',
    label: '비활성화된 그룹',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '전체가 비활성화된 라디오 그룹입니다. initialValue를 "option1"로 설정하여 첫 번째 옵션이 초기 선택되지만, disabled prop으로 인해 모든 옵션을 선택할 수 없습니다.',
      },
    },
  },
};

// 폼에서 사용하는 라디오 그룹
export const WithForm: Story = {
  args: {
    options: [
      { value: 'male', label: '남성' },
      { value: 'female', label: '여성' },
      { value: 'other', label: '기타' },
    ],
    initialValue: 'male',
    label: '성별',
    name: 'gender',
  },
  parameters: {
    docs: {
      description: {
        story: 'HTML 폼에서 사용할 수 있는 라디오 그룹입니다. initialValue를 "male"로 설정하여 "남성" 옵션이 초기 선택됩니다. name 속성을 통해 폼 제출 시 값이 전송되며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 숫자 값을 사용하는 라디오 그룹
export const WithNumericValues: Story = {
  args: {
    options: [
      { value: 1, label: '1개' },
      { value: 2, label: '2개' },
      { value: 3, label: '3개' },
      { value: 4, label: '4개' },
      { value: 5, label: '5개' },
    ],
    initialValue: 1,
    label: '수량 선택',
  },
  parameters: {
    docs: {
      description: {
        story: '숫자 값을 사용하는 라디오 그룹입니다. initialValue를 1로 설정하여 "1개" 옵션이 초기 선택됩니다. 문자열뿐만 아니라 숫자 값도 사용할 수 있으며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 객체 값을 사용하는 라디오 그룹
export const WithObjectValues: Story = {
  args: {
    options: [
      { value: { id: 'startup', name: '스타트업', price: 10000 }, label: '스타트업' },
      { value: { id: 'business', name: '비즈니스', price: 20000 }, label: '비즈니스' },
      { value: { id: 'enterprise', name: '엔터프라이즈', price: 50000 }, label: '엔터프라이즈' },
    ],
    initialValue: { id: 'startup', name: '스타트업', price: 10000 },
    label: '플랜 선택 (객체)',
    by: 'id',
  },
  parameters: {
    docs: {
      description: {
        story: '객체 값을 사용하는 라디오 그룹입니다. initialValue를 startup 객체로 설정하여 "스타트업" 옵션이 초기 선택됩니다. by prop을 사용하여 객체 비교 방법을 지정할 수 있으며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 초기값이 없는 라디오 그룹
export const WithoutInitialValue: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
    label: '초기값 없음',
  },
  parameters: {
    docs: {
      description: {
        story: '초기값이 설정되지 않은 라디오 그룹입니다. initialValue를 설정하지 않으면 아무 옵션도 선택되지 않은 상태로 시작됩니다. 사용자가 옵션을 클릭해야 선택되며, 선택 후에는 다른 옵션으로 자유롭게 변경할 수 있습니다.',
      },
    },
  },
}; 