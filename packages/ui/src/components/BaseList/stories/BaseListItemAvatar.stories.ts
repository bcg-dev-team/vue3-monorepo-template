/**
 * BaseListItemAvatar 컴포넌트 Storybook 스토리
 */
import BaseListItemAvatar from '../BaseListItemAvatar.vue';
import BaseListItemText from '../BaseListItemText.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseListItemAvatar> = {
  title: 'List/BaseListItemAvatar',
  component: BaseListItemAvatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
BaseListItemAvatar는 리스트 아이템 내부에서 사용하는 아바타 컴포넌트입니다.
        `,
      },
    },
  },
  argTypes: {
    src: {
      description: '아바타 이미지 URL',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Props',
      },
    },
    alt: {
      description: '이미지 대체 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'Props',
      },
    },
    size: {
      description: '아바타 크기',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
        category: 'Props',
      },
    },
    variant: {
      description: '아바타 스타일',
      control: { type: 'select' },
      options: ['circular', 'rounded', 'square'],
      table: {
        type: { summary: "'circular' | 'rounded' | 'square'" },
        defaultValue: { summary: "'circular'" },
        category: 'Props',
      },
    },
    icon: {
      description: '직접 표시할 BaseIcon (src보다 우선순위 높음)',
      control: { type: 'object' },
      table: {
        type: { summary: 'ButtonIconProps' },
        defaultValue: { summary: 'undefined' },
        category: 'Props',
      },
    },
    fallback: {
      description: '이미지 로드 실패 시 표시할 텍스트 또는 아이콘',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | ButtonIconProps' },
        defaultValue: { summary: 'undefined' },
        category: 'Props',
      },
    },
    color: {
      description: '아바타 색상 테마',
      control: { type: 'select' },
      options: ['default', 'primary', 'red', 'blue', 'green', 'purple', 'custom'],
      table: {
        type: { summary: "'default' | 'primary' | 'red' | 'blue' | 'green' | 'purple' | 'custom'" },
        defaultValue: { summary: "'default'" },
        category: 'Props',
      },
    },
    backgroundColor: {
      description: '커스텀 배경색 (color가 custom일 때 사용)',
      control: { type: 'color' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Props',
      },
    },
    iconColor: {
      description: '커스텀 아이콘 색상 (color가 custom일 때 사용)',
      control: { type: 'color' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
        category: 'Props',
      },
    },
  },
  args: {
    src: undefined,
    alt: '',
    size: 'md',
    variant: 'circular',
    icon: undefined,
    fallback: undefined,
    color: 'default',
    backgroundColor: undefined,
    iconColor: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (이미지 없음, 기본 폴백)
export const Default: Story = {
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 이미지가 있는 경우
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: '사용자 프로필 이미지',
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 직접 아이콘 지정 (최우선)
export const WithIcon: Story = {
  args: {
    icon: { name: 'settings', size: 'md' },
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 아이콘과 이미지 동시 지정 (아이콘이 우선)
export const IconOverridesImage: Story = {
  args: {
    icon: { name: 'home', size: 'md' },
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: '이미지는 무시됨',
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 색상 테마들
export const ColorThemes: Story = {
  render: () => ({
    components: { BaseListItemAvatar },
    setup() {
      return {};
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="circular" fallback="DF" color="default" />
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Default</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="circular" fallback="PR" color="primary" />
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Primary</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="circular" fallback="RD" color="red" />
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Red</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="circular" fallback="BL" color="blue" />
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Blue</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="circular" fallback="GR" color="green" />
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Green</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="circular" fallback="PL" color="purple" />
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Purple</p>
        </div>
      </div>
    `,
  }),
};

// 커스텀 색상
export const CustomColors: Story = {
  args: {
    color: 'custom',
    backgroundColor: '#ff6b6b',
    iconColor: '#ffffff',
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 400px; margin: 0 auto;">
        <div style="text-align: center;">
          <BaseListItemAvatar 
            v-bind="args" 
            fallback="CC"
            size="md"
            variant="circular"
          />
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Custom Red</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar 
            color="custom"
            backgroundColor="#4ecdc4"
            iconColor="#ffffff"
            fallback="CC"
            size="md"
            variant="circular"
          />
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Custom Teal</p>
        </div>
      </div>
    `,
  }),
};

// 텍스트 폴백
export const WithTextFallback: Story = {
  args: {
    fallback: 'JD',
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 아이콘 폴백
export const WithIconFallback: Story = {
  args: {
    fallback: { name: 'person', size: 'md' },
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 작은 크기
export const Small: Story = {
  args: {
    size: 'sm',
    fallback: 'SM',
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 큰 크기
export const Large: Story = {
  args: {
    size: 'lg',
    fallback: 'LG',
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 둥근 모서리
export const Rounded: Story = {
  args: {
    variant: 'rounded',
    fallback: 'RD',
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 사각형
export const Square: Story = {
  args: {
    variant: 'square',
    fallback: 'SQ',
  },
  render: (args) => ({
    components: { BaseListItemAvatar },
    setup() {
      return { args };
    },
    template: `
      <BaseListItemAvatar v-bind="args" />
    `,
  }),
};

// 모든 크기와 스타일 조합
export const AllVariants: Story = {
  render: () => ({
    components: { BaseListItemAvatar },
    setup() {
      return {};
    },
    template: `
      <div style="
        display: grid; 
        grid-template-columns: repeat(3, 1fr); 
        grid-template-rows: repeat(3, auto);
        gap: 32px; 
        max-width: 800px; 
        margin: 0 auto;
        align-items: center;
        justify-items: center;
      ">
        <!-- Small 크기들 -->
        <div style="text-align: center;">
          <BaseListItemAvatar size="sm" variant="circular" fallback="SC" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Small Circular</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="sm" variant="rounded" fallback="SR" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Small Rounded</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="sm" variant="square" fallback="SS" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Small Square</p>
        </div>
        
        <!-- Medium 크기들 -->
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="circular" fallback="MC" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Medium Circular</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="rounded" fallback="MR" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Medium Rounded</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="md" variant="square" fallback="MS" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Medium Square</p>
        </div>
        
        <!-- Large 크기들 -->
        <div style="text-align: center;">
          <BaseListItemAvatar size="lg" variant="circular" fallback="LC" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Large Circular</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="lg" variant="rounded" fallback="LR" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Large Rounded</p>
        </div>
        
        <div style="text-align: center;">
          <BaseListItemAvatar size="lg" variant="square" fallback="LS" />
          <p style="margin: 12px 0 0 0; font-size: 12px; color: #666; text-align: center;">Large Square</p>
        </div>
      </div>
    `,
  }),
};

// 실제 사용 예시 (BaseListItem과 함께)
export const InListItem: Story = {
  render: () => ({
    components: { BaseListItemAvatar },
    setup() {
      return {};
    },
    template: `
      <div style="max-width: 400px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">BaseListItem과 함께 사용하는 예시</h3>
        
        <!-- 이미지 아바타 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="사용자 프로필"
            size="md"
            variant="circular"
          />
          <span style="font-size: 16px; font-weight: 500;">John Doe</span>
        </div>
        
        <!-- 직접 아이콘 지정 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar 
            icon="{ name: 'settings', size: 'md' }"
            size="md"
            variant="rounded"
            color="blue"
          />
          <span style="font-size: 16px; font-weight: 500;">설정 메뉴</span>
        </div>
        
        <!-- 텍스트 폴백 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar 
            fallback="JD"
            size="md"
            variant="rounded"
            color="primary"
          />
          <span style="font-size: 16px; font-weight: 500;">Jane Smith</span>
        </div>
        
        <!-- 커스텀 색상 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <BaseListItemAvatar 
            fallback="{ name: 'person', size: 'md' }"
            size="md"
            variant="square"
            color="custom"
            backgroundColor="#ff6b6b"
            iconColor="#ffffff"
          />
          <span style="font-size: 16px; font-weight: 500;">Alice Brown</span>
        </div>
      </div>
    `,
  }),
};

// BaseListItemText와 함께 사용
export const WithListItemText: Story = {
  render: () => ({
    components: { BaseListItemAvatar, BaseListItemText },
    setup() {
      return {};
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">BaseListItemText와 함께 사용하는 예시</h3>
        
        <!-- 기본 아바타 + 텍스트 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar fallback="JD" color="primary" />
          <BaseListItemText 
            primary="John Doe"
            secondary="john.doe@example.com"
            inset
          />
        </div>
        
        <!-- 이미지 아바타 + 오른쪽 텍스트 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="사용자 프로필"
            size="lg"
          />
          <BaseListItemText 
            primary="Jane Smith"
            secondary="jane.smith@example.com"
            rightPrimary="2024-01-15"
            rightSecondary="온라인"
            inset
          />
        </div>
        
        <!-- 아이콘 아바타 + 여러 줄 텍스트 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar 
            :icon="{ name: 'settings', size: 'md' }"
            color="blue"
            variant="rounded"
          />
          <BaseListItemText 
            primary="시스템 설정"
            secondary="시스템 전반적인 설정을 관리합니다. 매우 긴 설명 텍스트입니다."
            inset
            multiline
          />
        </div>
        
        <!-- 커스텀 색상 아바타 + 줄바꿈 방지 텍스트 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <BaseListItemAvatar 
            fallback="AB"
            color="custom"
            backgroundColor="#ff6b6b"
            iconColor="#ffffff"
            variant="square"
          />
          <BaseListItemText 
            primary="매우 긴 사용자 이름입니다. 이 텍스트는 한 줄로만 표시됩니다."
            secondary="매우 긴 이메일 주소입니다. 이 텍스트도 한 줄로만 표시됩니다."
            inset
            :noWrap="true"
          />
        </div>
      </div>
    `,
  }),
};

// 다양한 크기와 스타일 조합
export const SizeVariantCombinations: Story = {
  render: () => ({
    components: { BaseListItemAvatar, BaseListItemText },
    setup() {
      return {};
    },
    template: `
      <div style="max-width: 800px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">크기와 스타일 조합 예시</h3>
        
        <!-- Small Circular -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar size="sm" variant="circular" fallback="SC" color="primary" />
          <BaseListItemText 
            primary="Small Circular Avatar"
            secondary="40px 크기의 원형 아바타"
          />
        </div>
        
        <!-- Medium Rounded -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar size="md" variant="rounded" fallback="MR" color="green" />
          <BaseListItemText 
            primary="Medium Rounded Avatar"
            secondary="44px 크기의 둥근 모서리 아바타"
          />
        </div>
        
        <!-- Large Square -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 12px;">
          <BaseListItemAvatar size="lg" variant="square" fallback="LS" color="purple" />
          <BaseListItemText 
            primary="Large Square Avatar"
            secondary="48px 크기의 사각형 아바타"
          />
        </div>
        
        <!-- 이미지 + 아이콘 폴백 -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <BaseListItemAvatar 
            src="invalid-url"
            :fallback="{ name: 'person', size: 'md' }"
            size="md"
            variant="circular"
            color="red"
          />
          <BaseListItemText 
            primary="이미지 로드 실패 시 아이콘 폴백"
            secondary="이미지 URL이 유효하지 않을 때 아이콘이 표시됩니다"
          />
        </div>
      </div>
    `,
  }),
};
