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
      options: ['contained', 'contained-grey', 'outlined'],
      table: {
        type: { summary: 'contained | contained-grey | outlined' },
        defaultValue: { summary: 'contained' },
        category: 'Props',
      },
    },
    color: {
      description: '버튼 컬러',
      control: { type: 'select' },
      options: ['primary', 'red', 'blue', 'green', 'cancel', 'grey', 'white'],
      table: {
        type: { summary: 'primary | red | blue | green | cancel | grey | white' },
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
export const Grey: Story = {
  args: {
    variant: 'contained',
    color: 'grey',
    size: 'large',
    label: 'Grey',
  },
};
export const White: Story = {
  args: {
    variant: 'contained',
    color: 'white',
    size: 'large',
    label: 'White',
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
    color: 'red',
    size: 'large',
    label: 'Label',
    subLabel: 'SubLabel',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
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

// Variant 비교 스토리
export const VariantComparison: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="space-y-8">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Contained</h3>
          <div class="flex flex-wrap gap-4">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Primary</p>
              <BaseButton
                variant="contained"
                color="primary"
                size="large"
                label="Primary"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Red</p>
              <BaseButton
                variant="contained"
                color="red"
                size="large"
                label="Red"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Blue</p>
              <BaseButton
                variant="contained"
                color="blue"
                size="large"
                label="Blue"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Green</p>
              <BaseButton
                variant="contained"
                color="green"
                size="large"
                label="Green"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Cancel</p>
              <BaseButton
                variant="contained"
                color="cancel"
                size="large"
                label="Cancel"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Grey</p>
              <BaseButton
                variant="contained"
                color="grey"
                size="large"
                label="Grey"
              />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Contained Grey</h3>
          <div class="flex flex-wrap gap-4">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Red</p>
              <BaseButton
                variant="contained-grey"
                color="red"
                size="large"
                label="Red"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Blue</p>
              <BaseButton
                variant="contained-grey"
                color="blue"
                size="large"
                label="Blue"
              />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Outlined</h3>
          <div class="flex flex-wrap gap-4">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Primary</p>
              <BaseButton
                variant="outlined"
                color="primary"
                size="large"
                label="Primary"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Red</p>
              <BaseButton
                variant="outlined"
                color="red"
                size="large"
                label="Red"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Blue</p>
              <BaseButton
                variant="outlined"
                color="blue"
                size="large"
                label="Blue"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">White</p>
              <BaseButton
                variant="outlined"
                color="white"
                size="large"
                label="White"
              />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '모든 variant(contained, contained-grey, outlined)를 색상별로 비교할 수 있습니다. 각 variant의 스타일 차이를 확인하세요.',
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

// Figma 디자인 기반 커스텀 색상 버튼
export const CustomGreen: Story = {
  args: {
    variant: 'contained',
    size: 'medium',
    label: '인증완료',
    rightIcon: { name: 'check-circle', color: 'currentColor' },
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <BaseButton
        v-bind="args"
        :style="{
          backgroundColor: 'var(--base-colors-green-green050)',
          color: 'var(--base-colors-green-green800)',
          borderColor: 'var(--base-colors-green-green800)'
        }"
        class="btn-no-events"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Figma 디자인 기반의 인증완료 버튼입니다. 연한 초록색 배경에 진한 초록색 텍스트와 테두리를 가지며, 이벤트가 비활성화되어 있습니다.',
      },
    },
  },
};

// 커스텀 단색 버튼
export const CustomSolid: Story = {
  args: {
    variant: 'contained',
    size: 'large',
    label: '커스텀 단색 버튼',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <style>
          .custom-solid {
            background-color: #ff6b6b !important;
            color: #ffffff !important;
            border-color: #ff6b6b !important;
            transition: all 0.2s ease !important;
          }
          .custom-solid:hover {
            background-color: #e55a5a !important;
            border-color: #e55a5a !important;
          }
        </style>
        <BaseButton
          v-bind="args"
          :customClass="'custom-solid'"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '단색 배경을 사용한 커스텀 버튼입니다. 호버 시 색상이 어두워집니다.',
      },
    },
  },
};

// 커스텀 그라데이션 버튼
export const CustomGradient: Story = {
  args: {
    variant: 'contained',
    size: 'large',
    label: '그라데이션 버튼',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <style>
          .custom-gradient {
            background: linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%) !important;
            color: #ffffff !important;
            border-color: transparent !important;
            transition: all 0.2s ease !important;
          }
          .custom-gradient:hover {
            background: linear-gradient(135deg, #9bb0ff 0%, #2e1f85 100%) !important;
          }
        </style>
        <BaseButton
          v-bind="args"
          :customClass="'custom-gradient'"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '그라데이션 배경을 사용한 커스텀 버튼입니다. 호버 시 그라데이션이 어두워집니다.',
      },
    },
  },
};
