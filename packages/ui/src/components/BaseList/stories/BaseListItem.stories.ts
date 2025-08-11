/**
 * BaseListItem 컴포넌트 Storybook 스토리
 */
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import BaseListItem from '../BaseListItem.vue';

const meta: Meta<typeof BaseListItem> = {
  title: 'List/BaseListItem',
  component: BaseListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
BaseListItem은 Material UI 스타일의 리스트 아이템 컴포넌트입니다.

## 주요 기능
- **클릭 가능**: clickable prop으로 버튼 동작 지원
- **조밀한 간격**: dense 모드로 공간 효율성 향상
- **상태 관리**: 선택, 비활성화, 구분선 등 다양한 상태 지원
- **접근성**: ARIA 속성과 키보드 네비게이션 지원
- **보조 액션**: 우측에 BaseIcon을 통한 추가 액션 지원

## 사용 예시
\`\`\`vue
<BaseListItem :clickable="true" @click="handleClick">
  <BaseIcon name="home" />
  <span>홈 메뉴</span>
</BaseListItem>

<BaseListItem :secondary-action="{ name: 'edit' }" @secondaryActionClick="handleEdit">
  <BaseIcon name="settings" />
  <span>설정</span>
</BaseListItem>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    clickable: {
      description: '클릭 가능 여부 (버튼 동작)',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    dense: {
      description: '조밀한 간격 사용 여부',
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
    divider: {
      description: '하단 구분선 표시 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    selected: {
      description: '선택된 상태 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    secondaryAction: {
      description: '우측에 표시할 BaseIcon 컴포넌트',
      control: { type: 'object' },
      table: {
        type: { summary: 'ButtonIconProps' },
        defaultValue: { summary: 'undefined' },
        category: 'Props',
      },
    },
  },
  args: {
    clickable: false,
    dense: false,
    disabled: false,
    divider: false,
    selected: false,
    secondaryAction: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
              <BaseListItem v-bind="args">
          <BaseIcon name="home" />
          <span>기본 리스트 아이템</span>
        </BaseListItem>
    `,
  }),
};

// 클릭 가능한 리스트 아이템
export const Clickable: Story = {
  args: {
    clickable: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      const handleClick = () => {
        console.log('BaseListItem clicked!');
      };
      return { args, handleClick };
    },
    template: `
              <BaseListItem v-bind="args" @click="handleClick">
          <BaseIcon name="settings" />
          <span>클릭 가능한 리스트 아이템</span>
        </BaseListItem>
    `,
  }),
};

// 조밀한 간격
export const Dense: Story = {
  args: {
    dense: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
              <BaseListItem v-bind="args">
          <BaseIcon name="chart" />
          <span>조밀한 간격 리스트 아이템</span>
        </BaseListItem>
    `,
  }),
};

// 구분선
export const Divider: Story = {
  args: {
    divider: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
              <BaseListItem v-bind="args">
          <BaseIcon name="notification" />
          <span>구분선이 있는 리스트 아이템</span>
        </BaseListItem>
    `,
  }),
};

// 선택된 상태
export const Selected: Story = {
  args: {
    selected: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
              <BaseListItem v-bind="args">
          <BaseIcon name="star" />
          <span>선택된 리스트 아이템</span>
        </BaseListItem>
    `,
  }),
};

// 비활성화
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
              <BaseListItem v-bind="args">
          <BaseIcon name="home" />
          <span>비활성화된 리스트 아이템</span>
        </BaseListItem>
    `,
  }),
};

// 보조 액션이 있는 경우
export const WithSecondaryAction: Story = {
  args: {
    secondaryAction: { name: 'edit' },
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      const handleSecondaryActionClick = () => {
        console.log('Secondary action clicked!');
      };
      return { args, handleSecondaryActionClick };
    },
    template: `
      <BaseListItem v-bind="args" @secondaryActionClick="handleSecondaryActionClick">
        <BaseIcon name="home" />
        <span>보조 액션이 있는 리스트 아이템</span>
      </BaseListItem>
    `,
  }),
};

// 모든 상태 조합
export const AllStates: Story = {
  render: () => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      const handleClick = (itemName: string) => {
        console.log(`${itemName} clicked!`);
      };
      const handleSecondaryActionClick = (action: string) => {
        console.log(`${action} action clicked!`);
      };
      return { handleClick, handleSecondaryActionClick };
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">모든 상태 조합 예시</h3>
        
        <!-- 기본 상태 -->
        <BaseListItem>
          <BaseIcon name="home" />
          <span>기본 상태</span>
        </BaseListItem>
        
        <!-- 클릭 가능한 상태 -->
        <BaseListItem :clickable="true" @click="handleClick('클릭 가능한')">
          <BaseIcon name="settings" />
          <span>클릭 가능한 상태</span>
        </BaseListItem>
        
        <!-- 조밀한 간격 -->
        <BaseListItem :dense="true">
          <BaseIcon name="chart" />
          <span>조밀한 간격 상태</span>
        </BaseListItem>
        
        <!-- 구분선 포함 -->
        <BaseListItem :divider="true">
          <BaseIcon name="notification" />
          <span>구분선이 있는 상태</span>
        </BaseListItem>
        
        <!-- 선택된 상태 -->
        <BaseListItem :selected="true">
          <BaseIcon name="star" />
          <span>선택된 상태</span>
        </BaseListItem>
        
         <!-- 비활성화된 상태 -->
         <BaseListItem :disabled="true">
           <BaseIcon name="home" />
           <span>비활성화된 상태</span>
         </BaseListItem>
         
         <!-- 보조 액션이 있는 상태 -->
         <BaseListItem :secondary-action="{ name: 'edit' }" @secondaryActionClick="handleSecondaryActionClick('편집')">
           <BaseIcon name="home" />
           <span>보조 액션이 있는 상태</span>
         </BaseListItem>
         
         <!-- 복합 상태: 비활성화 + 보조 액션 -->
         <BaseListItem 
           :disabled="true" 
           :secondary-action="{ name: 'trash' }" 
           @secondaryActionClick="handleSecondaryActionClick('삭제')"
         >
           <BaseIcon name="home" />
           <span>비활성화 + 보조 액션</span>
         </BaseListItem>
         
         <!-- 복합 상태: 클릭 가능 + 보조 액션 -->
         <BaseListItem 
           :clickable="true" 
           :secondary-action="{ name: 'star' }" 
           @click="handleClick('클릭 가능 + 보조 액션')"
           @secondaryActionClick="handleSecondaryActionClick('즐겨찾기')"
         >
           <BaseIcon name="heart" />
           <span>클릭 가능 + 보조 액션</span>
         </BaseListItem>
      </div>
    `,
  }),
};
