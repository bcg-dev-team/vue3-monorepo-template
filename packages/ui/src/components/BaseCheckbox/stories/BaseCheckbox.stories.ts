import type { Meta, StoryObj } from '@storybook/vue3';
import BaseCheckbox from '../BaseCheckbox.vue';

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
    indeterminate: false
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
    indeterminate: false
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
    indeterminate: false
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
    indeterminate: false
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
    indeterminate: true
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
          <BaseCheckbox :model-value="false" :disabled="false" :indeterminate="true">
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

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseCheckbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; color: #131313;">개인정보 수집 동의</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox :model-value="true">
              필수 개인정보 수집 및 이용에 동의합니다
            </BaseCheckbox>
            <BaseCheckbox :model-value="false">
              선택 개인정보 수집 및 이용에 동의합니다
            </BaseCheckbox>
            <BaseCheckbox :model-value="false" :indeterminate="true">
              마케팅 정보 수신에 동의합니다
            </BaseCheckbox>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; color: #131313;">설정 옵션</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox :model-value="true">
              이메일 알림 받기
            </BaseCheckbox>
            <BaseCheckbox :model-value="false">
              푸시 알림 받기
            </BaseCheckbox>
            <BaseCheckbox :model-value="false" :disabled="true">
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
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">키보드 접근성</h4>
          <p style="margin-bottom: 12px; color: #666; font-size: 14px;">
            Tab 키로 포커스를 이동하고, Enter 또는 Space 키로 체크/언체크할 수 있습니다.
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox :model-value="false">
              첫 번째 체크박스
            </BaseCheckbox>
            <BaseCheckbox :model-value="true">
              두 번째 체크박스
            </BaseCheckbox>
            <BaseCheckbox :model-value="false" :indeterminate="true">
              세 번째 체크박스
            </BaseCheckbox>
          </div>
        </div>
      </div>
    `
  })
};
