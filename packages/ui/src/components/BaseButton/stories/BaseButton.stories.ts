import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '../BaseButton.vue';

const meta: Meta<typeof BaseButton> = {
  title: 'Buttons/Button',
  component: BaseButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '<a href="https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=32-244&t=Nx8blgYQ0WCWXVeQ-4" target="_blank" rel="noopener">Figma 링크</a>',
      },
    },
  },
  argTypes: {
    variant: {
      description: '버튼 스타일',
      control: { type: 'select' },
      options: ['contained', 'outlined'],
      table: {
        type: { summary: 'contained | outlined' },
        defaultValue: { summary: 'contained' },
        category: 'Props',
      },
    },
    color: {
      description: '버튼 컬러',
      control: { type: 'select' },
      options: ['primary', 'red', 'blue', 'green', 'cancel'],
      table: {
        type: { summary: 'primary | red | blue | green | cancel' },
        defaultValue: { summary: 'primary' },
        category: 'Props',
      },
    },
    size: {
      description: '버튼 크기',
      control: { type: 'select' },
      options: ['large', 'medium', 'small'],
      table: {
        type: { summary: 'large | medium | small' },
        defaultValue: { summary: 'large' },
        category: 'Props',
      },
    },
    pill: {
      description: 'pill 스타일 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    disabled: {
      description: '비활성화 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    label: {
      description: '버튼 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    subLabel: {
      description: '서브 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Base: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: '기본 버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '기본(Contained) 스타일의 Primary 버튼입니다.',
      },
    },
  },
};

// 외곽선 버튼
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'large',
    label: '외곽선 버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '투명 배경에 테두리가 있는 Outlined 버튼입니다.',
      },
    },
  },
};

// 색상별 버튼
export const Red: Story = {
  args: {
    variant: 'contained',
    color: 'red',
    size: 'large',
    label: 'Red',
  },
};
export const Blue: Story = {
  args: {
    variant: 'contained',
    color: 'blue',
    size: 'large',
    label: 'Blue',
  },
};
export const Green: Story = {
  args: {
    variant: 'contained',
    color: 'green',
    size: 'large',
    label: 'Green',
  },
};
export const Cancel: Story = {
  args: {
    variant: 'contained',
    color: 'cancel',
    size: 'large',
    label: 'Cancel',
  },
};

// 크기별 버튼
export const Large: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: 'Large',
  },
};
export const Medium: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
    label: 'Medium',
  },
};
export const Small: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    label: 'Small',
  },
};

// pill 스타일
export const Pill: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    pill: true,
    label: 'Pill',
  },
};

// 비활성화 버튼 (contained)
export const DisabledContained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: 'Disabled',
    disabled: true,
  },
};
// 비활성화 버튼 (outlined)
export const DisabledOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'large',
    label: 'Disabled',
    disabled: true,
  },
};

// 아이콘 포함 버튼
export const LeftIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: 'Left Icon',
    leftIcon: { name: 'plus' },
  },
};
export const RightIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: 'Right Icon',
    rightIcon: { name: 'plus' },
  },
};
export const BothIcons: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: 'Both Icons',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
};

// fullWidth 버튼
export const FullWidth: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: 'Full Width',
    fullWidth: true,
  },
};

// 서브텍스트 포함 버튼
export const WithSubLabel: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: 'Label',
    subLabel: 'SubLabel',
  },
};

// 모든 속성이 복잡하게 적용된 버튼 예시
export const Complex: Story = {
  args: {
    variant: 'outlined',
    color: 'red',
    size: 'large',
    pill: true,
    disabled: false,
    fullWidth: true,
    label: 'Label',
    subLabel: 'SubLabel',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '모든 주요 속성이 조합된 복잡한 버튼 예시입니다.',
      },
    },
  },
};

// 접근성 테스트: aria-label 커스텀
export const AriaLabelCustom: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: '실제 버튼 텍스트',
    // aria-label은 label로 자동 부여됨
  },
  parameters: {
    docs: {
      description: {
        story: 'label이 aria-label로 자동 부여되는지 확인하세요.',
      },
    },
  },
};

// 접근성 테스트: href prop으로 <a role="button">
export const AsLinkButton: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: '링크 버튼',
    href: 'https://blockchainglobal.co.kr/',
  },
  parameters: {
    docs: {
      description: {
        story: 'href prop이 있으면 <a role="button">으로 렌더링됩니다. 키보드/마우스 접근성 확인.',
      },
    },
  },
};

// 접근성 테스트: disabled + href (비활성화 링크 버튼)
export const DisabledLinkButton: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: '비활성화 링크 버튼',
    href: 'https://blockchainglobal.co.kr/',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'disabled + href 조합에서 aria-disabled, tabindex=-1, 클릭/키보드 이벤트 차단 확인.',
      },
    },
  },
};

// 접근성 테스트: 키보드 내비게이션 안내
export const KeyboardNavigation: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'large',
    label: 'Tab/Enter/Space로 테스트',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab으로 포커스, Enter/Space로 클릭 이벤트가 정상 동작하는지 확인하세요.',
      },
    },
  },
};
