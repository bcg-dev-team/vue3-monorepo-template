import BaseButton from '../../BaseButton/BaseButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseAlert from '../BaseAlert.vue';

const meta: Meta<typeof BaseAlert> = {
  title: 'Alert/BaseAlert',
  component: BaseAlert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '경고/안내 메시지를 표시하는 배너 컴포넌트입니다.',
      },
    },
  },
  args: {
    variant: 'subtle',
    title: '',
    description: '추가 설명 텍스트입니다.',
    closable: true,
    showIcon: true,
    center: false,
  },
  argTypes: {
    variant: {
      description: '스타일 변형 (subtle: 연한, filled: 원색 배경, outlined: 테두리)',
      control: { type: 'select' },
      options: ['subtle', 'filled', 'outlined'],
      table: {
        type: { summary: 'subtle | filled | outlined' },
        defaultValue: { summary: 'subtle' },
        category: 'Props',
      },
    },
    severity: {
      description: '심각도 (선택 사항) — 아이콘/기본 색 매핑에 사용',
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error', ''],
      table: {
        type: { summary: 'success | info | warning | error | ' },
        defaultValue: { summary: '—' },
        category: 'Props',
      },
    },
    color: {
      description: '색상 계열 (선택 사항) — 지정 없으면 severity 또는 기본값 사용',
      control: { type: 'select' },
      options: ['primary', 'green', 'blue', 'yellow', 'red', ''],
      table: {
        type: { summary: 'primary | green | blue | yellow | red | ' },
        defaultValue: { summary: '—' },
        category: 'Props',
      },
    },
    title: {
      description: '제목 텍스트 (slot:title로 대체 가능)',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    description: {
      description: '본문 설명 (default slot로 대체 가능)',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    closable: {
      description: '닫기 가능 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    showIcon: {
      description: '아이콘 표시 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    center: {
      description: '콘텐츠 가운데 정렬',
      control: { type: 'boolean' },
      table: { category: 'Props' },
    },
    // showAfter/hideAfter 제거됨
    autoClose: {
      description: '자동 닫힘(ms)',
      control: { type: 'number' },
      table: { category: 'Behavior' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variant: Story = {
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3 flex-1">
        <BaseAlert v-bind="{...args, variant: 'subtle'}" title="subtle" :closable="false" />
        <BaseAlert v-bind="{...args, variant: 'filled'}" title="filled" :closable="false" />
        <BaseAlert v-bind="{...args, variant: 'outlined'}" title="outlined" :closable="false" />
      </div>
    `,
  }),
};

export const Severity: Story = {
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3 flex-1">
        <BaseAlert v-bind="{...args, severity: 'success'}" title="success" :closable="false" />
        <BaseAlert v-bind="{...args, severity: 'info'}" title="info" :closable="false" />
        <BaseAlert v-bind="{...args, severity: 'warning'}" title="warning" :closable="false" />
        <BaseAlert v-bind="{...args, severity: 'error'}" title="error" :closable="false" />
      </div>
    `,
  }),
};

export const Color: Story = {
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3 flex-1">
        <BaseAlert v-bind="{...args, color: 'primary'}" title="primary" :closable="false" />
        <BaseAlert v-bind="{...args, color: 'green'}" title="green" :closable="false" />
        <BaseAlert v-bind="{...args, color: 'blue'}" title="blue" :closable="false" />
        <BaseAlert v-bind="{...args, color: 'yellow'}" title="yellow" :closable="false" />
        <BaseAlert v-bind="{...args, color: 'red'}" title="red" :closable="false" />
      </div>
    `,
  }),
};

export const TitleToggle: Story = {
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3 flex-1">
        <BaseAlert v-bind="args" title="제목 있음" :closable="false" />
        <BaseAlert v-bind="{...args, title: undefined}" :closable="false" />
      </div>
    `,
  }),
};

export const Closable: Story = {
  render: (args) => ({
    components: { BaseAlert, BaseButton },
    setup() {
      return { args };
    },
    data() {
      return { open: true };
    },
    methods: {
      handleClose() {
        this.open = false;
      },
      handleOpen() {
        this.open = true;
      },
    },
    template: `
      <div class="space-y-4 flex-1">
        <BaseAlert v-if="open" v-bind="{...args, closable: true}" @close="handleClose" />
        <BaseButton v-else label="다시 열기" size="sm" @click="handleOpen" />
      </div>
    `,
  }),
};

export const Centered: Story = {
  args: { center: true, closable: false, showIcon: false },
};

export const WithIcon: Story = {
  args: { showIcon: true, closable: false },
};

export const WithSlots: Story = {
  args: { severity: 'success', showIcon: false, variant: 'filled', closable: false },
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4 flex-1">
        <BaseAlert v-bind="args">
          <template #title>슬롯 제목</template>
          커스텀 <b>기본 슬롯</b> 콘텐츠입니다.
          <template #icon>
            <span class="inline-block h-3 w-3 rounded-sm bg-[var(--font-color-white)]" />
          </template>
        </BaseAlert>
        <BaseAlert v-bind="args" color="red" closable>
          <div class="text-font-12 font-regular">
            <span>AUDUSD 포지션 손실 주의 (마진레벨: 45%) </span>
            <span class="underline cursor-pointer"> 자세히</span>
          </div>
        </BaseAlert>
      </div>
    `,
  }),
};

export const DelayedAttributes: Story = {
  args: { autoClose: 2000 },
  parameters: {
    docs: {
      description: {
        story:
          '2초 후 자동으로 닫히는 예제입니다. 닫힌 후에는 버튼으로 다시 열 수 있습니다. 닫히는 시간을 지정하지 않으면 알림은 계속 표시됩니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseAlert, BaseButton },
    setup() {
      return { args };
    },
    data() {
      return { open: true };
    },
    methods: {
      handleClose() {
        this.open = false;
      },
      handleOpen() {
        this.open = true;
      },
    },
    template: `
      <div class="space-y-4 flex-1">
        <BaseAlert v-if="open" v-bind="{...args, closable: true}" @close="handleClose" />
        <BaseButton v-else label="다시 열기" size="sm" @click="handleOpen" />
      </div>
    `,
  }),
};
