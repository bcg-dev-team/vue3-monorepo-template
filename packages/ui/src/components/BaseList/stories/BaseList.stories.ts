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
        component: `BaseList는 접근성과 기능성을 고려한 리스트 컨테이너 컴포넌트입니다.`,
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
          <template #content>
            <BaseIcon name="user" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
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
          <template #content>
            <BaseIcon name="user" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem :clickable="true">
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem :clickable="true">
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
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
          <template #content>
            <BaseIcon name="user" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem :secondary-action="{ name: 'delete' }">
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem :secondary-action="{ name: 'visibility' }">
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
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
          <template #content>
            <BaseIcon name="user" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
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
          <template #content>
            <BaseIcon name="user" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
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
          <template #content>
            <BaseIcon name="user" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
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
          <template #content>
            <BaseIcon name="user" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
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
          <template #content>
            <BaseIcon name="user" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem :clickable="true" :secondary-action="{ name: 'delete' }">
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem :clickable="true" :secondary-action="{ name: 'visibility' }">
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};
