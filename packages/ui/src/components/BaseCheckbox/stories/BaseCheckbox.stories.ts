import type { Meta, StoryObj } from '@storybook/vue3';
import BaseCheckbox from '../BaseCheckbox.vue';
import { ref } from 'vue';

const meta: Meta<typeof BaseCheckbox> = {
  title: 'Inputs/Checkbox',
  component: BaseCheckbox,
  parameters: {
    docs: {
      description: {
        component: '체크박스 컴포넌트입니다. 피그마의 Input/Checkbox 디자인을 기반으로 구현되었으며, 체크/언체크 상태와 비활성화 상태를 지원합니다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      description: '체크 여부 (v-model)',
      control: 'boolean'
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean'
    },
    indeterminate: {
      description: '부분 선택 상태 (3-state checkbox)',
      control: 'boolean'
    },
    size: {
      description: '컴포넌트 크기 (sm: 20px, md: 22px, lg: 24px)',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' }
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (체크 안됨)
export const Default: Story = {
  args: {
    modelValue: false,
    disabled: false,
    indeterminate: false,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        기본 체크박스
      </BaseCheckbox>
    `
  })
};

// 체크된 상태
export const Checked: Story = {
  args: {
    modelValue: true,
    disabled: false,
    indeterminate: false,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        체크된 체크박스
      </BaseCheckbox>
    `
  })
};

// 비활성화 상태 (체크 안됨)
export const DisabledUnchecked: Story = {
  args: {
    modelValue: false,
    disabled: true,
    indeterminate: false,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        비활성화된 체크박스 (체크 안됨)
      </BaseCheckbox>
    `
  })
};

// 비활성화 상태 (체크됨)
export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    disabled: true,
    indeterminate: false,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        비활성화된 체크박스 (체크됨)
      </BaseCheckbox>
    `
  })
};

// 부분 선택 상태 (indeterminate)
export const Indeterminate: Story = {
  args: {
    modelValue: false,
    disabled: false,
    indeterminate: true,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        부분 선택 체크박스
      </BaseCheckbox>
    `
  })
};

// 모든 상태 비교
export const AllStates: Story = {
  parameters: {
    controls: { exclude: ['visible'] },
  },
  render: () => ({
    components: { BaseCheckbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태 (체크 안됨)</h4>
          <BaseCheckbox :model-value="false" :disabled="false" :indeterminate="false">
            기본 체크박스
          </BaseCheckbox>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">체크된 상태</h4>
          <BaseCheckbox :model-value="true" :disabled="false" :indeterminate="false">
            체크된 체크박스
          </BaseCheckbox>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">부분 선택 상태</h4>
          <BaseCheckbox :model-value="true" :disabled="false" :indeterminate="true">
            부분 선택 체크박스
          </BaseCheckbox>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 (체크 안됨)</h4>
          <BaseCheckbox :model-value="false" :disabled="true" :indeterminate="false">
            비활성화된 체크박스
          </BaseCheckbox>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 (체크됨)</h4>
          <BaseCheckbox :model-value="true" :disabled="true" :indeterminate="false">
            비활성화된 체크박스
          </BaseCheckbox>
        </div>
      </div>
    `
  })
};

// 사이즈 비교
export const AllSizes: Story = {
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      const sizeSm = ref(false);
      const sizeMd = ref(true);
      const sizeLg = ref(true);
      return { sizeSm, sizeMd, sizeLg };
    },
    template: `
      <div style="display: flex; flex-direction: row; gap: 24px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin-bottom: 8px; color: #131313;">sm (20px)</h4>
          <BaseCheckbox v-model="sizeSm" size="sm">
            작은 사이즈 체크박스
          </BaseCheckbox>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin-bottom: 8px; color: #131313;">md (22px)</h4>
          <BaseCheckbox v-model="sizeMd" size="md">
            기본 사이즈 체크박스
          </BaseCheckbox>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin-bottom: 8px; color: #131313;">lg (24px)</h4>
          <BaseCheckbox v-model="sizeLg" size="lg">
            큰 사이즈 체크박스
          </BaseCheckbox>
        </div>
      </div>
    `
  })
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      // 개인정보 수집 동의 섹션
      const consentRequired = ref(true);
      const consentOptional = ref(false);
      const marketing = ref(true);

      // 설정 옵션 섹션
      const emailNotif = ref(true);
      const pushNotif = ref(false);
      const smsNotif = ref(false);

      return {
        consentRequired,
        consentOptional,
        marketing,
        emailNotif,
        pushNotif,
        smsNotif,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; color: #131313;">개인정보 수집 동의</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox v-model="consentRequired">
              필수 개인정보 수집 및 이용에 동의합니다
            </BaseCheckbox>
            <BaseCheckbox v-model="consentOptional">
              선택 개인정보 수집 및 이용에 동의합니다
            </BaseCheckbox>
            <BaseCheckbox v-model="marketing" :indeterminate="true">
              마케팅 정보 수신에 동의합니다
            </BaseCheckbox>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; color: #131313;">설정 옵션</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox v-model="emailNotif">
              이메일 알림 받기
            </BaseCheckbox>
            <BaseCheckbox v-model="pushNotif">
              푸시 알림 받기
            </BaseCheckbox>
            <BaseCheckbox v-model="smsNotif" :disabled="true">
              SMS 알림 받기 (서비스 종료)
            </BaseCheckbox>
          </div>
        </div>
      </div>
    `
  })
};

// 접근성 테스트
export const Accessibility: Story = {
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      const first = ref(false);
      const second = ref(true);
      const third = ref(false);

      return { first, second, third };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">키보드 접근성</h4>
          <p style="margin-bottom: 12px; color: #666; font-size: 14px;">
            Tab 키로 포커스를 이동하고, Enter 또는 Space 키로 체크/언체크할 수 있습니다.
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox v-model="first">
              첫 번째 체크박스
            </BaseCheckbox>
            <BaseCheckbox v-model="second">
              두 번째 체크박스
            </BaseCheckbox>
            <BaseCheckbox v-model="third" :indeterminate="true">
              세 번째 체크박스
            </BaseCheckbox>
          </div>
        </div>
      </div>
    `
  })
};
