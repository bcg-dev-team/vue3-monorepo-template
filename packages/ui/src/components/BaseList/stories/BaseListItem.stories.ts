/**
 * BaseListItem 컴포넌트 Storybook 스토리
 */
import BaseListItemAvatar from '../BaseListItemAvatar.vue';
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
        `,
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
        <template #content>
          <BaseIcon name="home" />
          <span>기본 리스트 아이템</span>
        </template>
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
        <template #content>
          <BaseIcon name="settings" />
          <span>클릭 가능한 리스트 아이템</span>
        </template>
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
        <template #content>
          <BaseIcon name="chart" />
          <span>조밀한 간격 리스트 아이템</span>
        </template>
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
        <template #content>
          <BaseIcon name="notification" />
          <span>구분선이 있는 리스트 아이템</span>
        </template>
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
        <template #content>
          <BaseIcon name="star" />
          <span>선택된 리스트 아이템</span>
        </template>
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
        <template #content>
          <BaseIcon name="home" />
          <span>비활성화된 리스트 아이템</span>
        </template>
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
        <template #content>
          <BaseIcon name="home" />
          <span>보조 액션이 있는 리스트 아이템</span>
        </template>
      </BaseListItem>
    `,
  }),
};

// 아바타와 함께 사용
export const WithAvatar: Story = {
  render: () => ({
    components: { BaseListItem, BaseListItemAvatar },
    setup() {
      return {};
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">아바타와 함께 사용하는 예시</h3>
        
        <!-- 기본 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar fallback="JD" />
            <span>John Doe</span>
          </template>
        </BaseListItem>
        
        <!-- 이미지 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="사용자 프로필"
            />
            <span>Jane Smith</span>
          </template>
        </BaseListItem>
        
        <!-- 직접 아이콘 지정 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar 
              icon="{ name: 'settings', size: 'md' }"
              size="md"
              variant="rounded"
            />
            <span>설정 메뉴</span>
          </template>
        </BaseListItem>
        
        <!-- 큰 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar size="lg" fallback="AB" />
            <span>Alice Brown</span>
          </template>
        </BaseListItem>
        
        <!-- 둥근 모서리 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar variant="rounded" fallback="CD" />
            <span>Charlie Davis</span>
          </template>
        </BaseListItem>
        
        <!-- 사각형 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar variant="square" fallback="EF" />
            <span>Eve Franklin</span>
          </template>
        </BaseListItem>
      </div>
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
          <template #content>
            <BaseIcon name="home" />
            <span>기본 상태</span>
          </template>
        </BaseListItem>
        
        <!-- 클릭 가능한 상태 -->
        <BaseListItem :clickable="true" @click="handleClick('클릭 가능한')">
          <template #content>
            <BaseIcon name="settings" />
            <span>클릭 가능한 상태</span>
          </template>
        </BaseListItem>
        
        <!-- 조밀한 간격 -->
        <BaseListItem :dense="true">
          <template #content>
            <BaseIcon name="chart" />
            <span>조밀한 간격 상태</span>
          </template>
        </BaseListItem>
        
        <!-- 구분선 포함 -->
        <BaseListItem :divider="true">
          <template #content>
            <BaseIcon name="notification" />
            <span>구분선이 있는 상태</span>
          </template>
        </BaseListItem>
        
        <!-- 선택된 상태 -->
        <BaseListItem :selected="true">
          <template #content>
            <BaseIcon name="star" />
            <span>선택된 상태</span>
          </template>
        </BaseListItem>
        
         <!-- 비활성화된 상태 -->
         <BaseListItem :disabled="true">
           <template #content>
             <BaseIcon name="home" />
             <span>비활성화된 상태</span>
           </template>
         </BaseListItem>
         
         <!-- 보조 액션이 있는 상태 -->
         <BaseListItem :secondary-action="{ name: 'edit' }" @secondaryActionClick="handleSecondaryActionClick('편집')">
           <template #content>
             <BaseIcon name="home" />
             <span>보조 액션이 있는 상태</span>
           </template>
         </BaseListItem>
         
         <!-- 복합 상태: 비활성화 + 보조 액션 -->
         <BaseListItem 
           :disabled="true" 
           :secondary-action="{ name: 'trash' }" 
           @secondaryActionClick="handleSecondaryActionClick('삭제')"
         >
           <template #content>
             <BaseIcon name="home" />
             <span>비활성화 + 보조 액션</span>
           </template>
         </BaseListItem>
         
         <!-- 복합 상태: 클릭 가능 + 보조 액션 -->
         <BaseListItem 
           :clickable="true" 
           :secondary-action="{ name: 'star' }" 
           @click="handleClick('클릭 가능 + 보조 액션')"
           @secondaryActionClick="handleSecondaryActionClick('즐겨찾기')"
         >
           <template #content>
             <BaseIcon name="heart" />
             <span>클릭 가능 + 보조 액션</span>
           </template>
         </BaseListItem>
      </div>
    `,
  }),
};
