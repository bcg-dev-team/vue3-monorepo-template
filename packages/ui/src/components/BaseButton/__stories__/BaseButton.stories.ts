import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '../BaseButton.vue';

const iconOptions = ['none', 'plus', 'home', 'person'];

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'regular',
    label: 'Button',
    leftIcon: { name: 'plus', size: 'md', color: 'currentColor' },
    rightIcon: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 스타일(Primary)과 레귤러 크기, 왼쪽 플러스 아이콘이 포함된 버튼 예시입니다.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'regular',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: '외곽선(Outline) 스타일의 레귤러 크기 버튼 예시입니다.',
      },
    },
  },
};

export const Red: Story = {
  args: {
    variant: 'red',
    size: 'regular',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Red 스타일의 레귤러 크기 버튼 예시입니다.',
      },
    },
  },
};

export const Blue: Story = {
  args: {
    variant: 'blue',
    size: 'regular',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Blue(Outline) 스타일의 레귤러 크기 버튼 예시입니다.',
      },
    },
  },
};

export const Pill: Story = {
  args: {
    variant: 'pill',
    size: 'pill',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pill 스타일(완전 둥근 형태)의 버튼 예시입니다.',
      },
    },
  },
};

export const LightSolid: Story = {
  args: {
    variant: 'light-solid',
    size: 'regular',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: '연한 노란색 배경의 Light Solid 스타일 버튼 예시입니다.',
      },
    },
  },
};

export const RedSolid: Story = {
  args: {
    variant: 'red-solid',
    size: 'regular',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Red Solid(실색) 스타일의 버튼 예시입니다.',
      },
    },
  },
};

export const BlueSolid: Story = {
  args: {
    variant: 'blue-solid',
    size: 'regular',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Blue Solid(실색) 스타일의 버튼 예시입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'disabled',
    size: 'regular',
    label: 'Button',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화(Disabled) 상태의 버튼 예시입니다.',
      },
    },
  },
};

// props별 단독 확인 스토리 추가
export const SizeSmall: Story = {
  args: {
    size: 'small',
    variant: 'primary',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small(작은 크기) 버튼 예시입니다.',
      },
    },
  },
};

export const SizePill: Story = {
  args: {
    size: 'pill',
    variant: 'primary',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pill(완전 둥근) 크기의 버튼 예시입니다.',
      },
    },
  },
};

export const SizeSmallInner: Story = {
  args: {
    size: 'small-inner',
    variant: 'primary',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small Inner(내부 여백이 작은) 버튼 예시입니다.',
      },
    },
  },
};

export const DisabledProp: Story = {
  args: {
    disabled: true,
    variant: 'primary',
    size: 'regular',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'props로 disabled를 직접 지정한 버튼 예시입니다.',
      },
    },
  },
};

export const WithSubLabel: Story = {
  args: {
    subLabel: 'Sub label',
    variant: 'primary',
    size: 'regular',
    label: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story: '서브 텍스트가 포함된 버튼 예시입니다.',
      },
    },
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Button',
    leftIcon: { name: 'plus', size: 'md', color: 'primary' },
  },
  parameters: {
    docs: {
      description: {
        story: '왼쪽에 아이콘이 있는 버튼 예시입니다.',
      },
    },
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Button',
    rightIcon: { name: 'plus', size: 'md', color: 'primary' },
  },
  parameters: {
    docs: {
      description: {
        story: '오른쪽에 아이콘이 있는 버튼 예시입니다.',
      },
    },
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Button',
    leftIcon: { name: 'plus', size: 'md', color: 'primary' },
    rightIcon: { name: 'plus', size: 'md', color: 'primary' },
  },
  parameters: {
    docs: {
      description: {
        story: '양쪽에 아이콘이 모두 있는 버튼 예시입니다.',
      },
    },
  },
};
