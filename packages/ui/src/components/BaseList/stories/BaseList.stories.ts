/**
 * BaseList 컴포넌트 Storybook 스토리
 */
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import BaseListItem from '../BaseListItem.vue';
import BaseList from '../BaseList.vue';

const meta: Meta<typeof BaseList> = {
  title: 'List/BaseList',
  component: BaseList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `BaseList는 접근성과 기능성을 고려한 리스트 컨테이너 컴포넌트입니다.
        
## 사용법
BaseList는 단독으로 사용할 수 없으며, 반드시 BaseListItem들을 자식으로 포함해야 합니다.

\`\`\`vue
<BaseList>
  <BaseListItem>
    <BaseIcon name="user" />
    <span>사용자 관리</span>
  </BaseListItem>
  <BaseListItem :secondary-action="{ name: 'edit' }">
    <BaseIcon name="settings" />
    <span>시스템 설정</span>
  </BaseListItem>
</BaseList>
\`\`\`

## Props
- **subheader**: 서브헤더 텍스트
- **dense**: 조밀한 간격 사용 여부
- **gap**: 리스트 아이템 간격 (CSS gap 값)

## BaseListItem Props
- **clickable**: 클릭 가능 여부
- **secondaryAction**: 우측에 표시할 BaseIcon (ButtonIconProps)

## 주의사항
- BaseList는 반드시 BaseListItem들을 자식으로 포함해야 합니다
- 빈 BaseList는 렌더링되지 않거나 오류가 발생할 수 있습니다
        `,
      },
    },
  },
  argTypes: {
    subheader: {
      description: '서브헤더 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
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
    gap: {
      description: '리스트 아이템 간격 (CSS gap 값)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0px' },
        category: 'Props',
      },
    },
  },
  args: {
    subheader: '',
    dense: false,
    gap: '0px',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 리스트
export const Default: Story = {
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem>
          <BaseIcon name="user" />
          <span>사용자 관리</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="settings" />
          <span>시스템 설정</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="chart" />
          <span>통계 대시보드</span>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 클릭 가능한 리스트
export const Clickable: Story = {
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem :clickable="true">
          <BaseIcon name="user" />
          <span>사용자 관리</span>
        </BaseListItem>
        <BaseListItem :clickable="true">
          <BaseIcon name="settings" />
          <span>시스템 설정</span>
        </BaseListItem>
        <BaseListItem :clickable="true">
          <BaseIcon name="chart" />
          <span>통계 대시보드</span>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 보조 액션이 있는 리스트
export const WithSecondaryActions: Story = {
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem :secondary-action="{ name: 'edit' }">
          <BaseIcon name="user" />
          <span>사용자 관리</span>
        </BaseListItem>
        <BaseListItem :secondary-action="{ name: 'delete' }">
          <BaseIcon name="settings" />
          <span>시스템 설정</span>
        </BaseListItem>
        <BaseListItem :secondary-action="{ name: 'visibility' }">
          <BaseIcon name="chart" />
          <span>통계 대시보드</span>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 조밀한 간격
export const Dense: Story = {
  args: {
    dense: true,
  },
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem>
          <BaseIcon name="user" />
          <span>사용자 관리</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="settings" />
          <span>시스템 설정</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="chart" />
          <span>통계 대시보드</span>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 커스텀 간격
export const WithGap: Story = {
  args: {
    gap: '16px',
  },
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem>
          <BaseIcon name="user" />
          <span>사용자 관리</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="settings" />
          <span>시스템 설정</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="chart" />
          <span>통계 대시보드</span>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 조밀한 간격 + 커스텀 간격
export const DenseWithGap: Story = {
  args: {
    dense: true,
    gap: '8px',
  },
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem>
          <BaseIcon name="user" />
          <span>사용자 관리</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="settings" />
          <span>시스템 설정</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="chart" />
          <span>통계 대시보드</span>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 서브헤더 포함
export const WithSubheader: Story = {
  args: {
    subheader: '시스템 관리 메뉴',
  },
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem>
          <BaseIcon name="user" />
          <span>사용자 관리</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="settings" />
          <span>시스템 설정</span>
        </BaseListItem>
        <BaseListItem>
          <BaseIcon name="chart" />
          <span>통계 대시보드</span>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 완전한 설정 예시
export const Complete: Story = {
  args: {
    subheader: '완전한 설정 예시',
    dense: true,
    gap: '12px',
  },
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem :clickable="true" :secondary-action="{ name: 'edit' }">
          <BaseIcon name="user" />
          <span>사용자 관리</span>
        </BaseListItem>
        <BaseListItem :clickable="true" :secondary-action="{ name: 'delete' }">
          <BaseIcon name="settings" />
          <span>시스템 설정</span>
        </BaseListItem>
        <BaseListItem :clickable="true" :secondary-action="{ name: 'visibility' }">
          <BaseIcon name="chart" />
          <span>통계 대시보드</span>
        </BaseListItem>
      </BaseList>
    `,
  }),
};
