import type { Meta, StoryObj } from '@storybook/vue3';
import BaseInputText from '../BaseInputText.vue';

const meta: Meta<typeof BaseInputText> = {
  title: 'Inputs/Text',
  component: BaseInputText,
  parameters: {
    docs: {
      description: {
        component: '텍스트 입력 컴포넌트입니다. 피그마의 Input/Text-SM과 Input/Text-MD 디자인을 기반으로 구현되었으며, 작은 크기와 중간 크기를 지원합니다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      description: '입력값 (v-model)',
      control: 'text'
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text'
    },
    size: {
      description: '크기 (sm: 32px 높이, md: 40px 높이)',
      control: 'select',
      options: ['sm', 'md']
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean'
    },
    error: {
      description: '에러 상태 여부',
      control: 'boolean'
    },
    errorMessage: {
      description: '에러 메시지',
      control: 'text'
    },
    readonly: {
      description: '읽기 전용 여부',
      control: 'boolean'
    },
    showIcon: {
      description: '아이콘 표시 여부',
      control: 'boolean'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (중간 크기)
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '텍스트를 입력하세요',
    size: 'md',
    showIcon: true
  }
};

// 작은 크기 (Input/Text-SM)
export const Small: Story = {
  args: {
    modelValue: '',
    placeholder: '작은 크기 텍스트 입력',
    size: 'sm',
    showIcon: true
  }
};

// 중간 크기 (Input/Text-MD)
export const Medium: Story = {
  args: {
    modelValue: '',
    placeholder: '중간 크기 텍스트 입력',
    size: 'md',
    showIcon: true
  }
};

// 값이 있는 상태
export const WithValue: Story = {
  args: {
    modelValue: '입력된 텍스트',
    placeholder: '텍스트를 입력하세요',
    size: 'md',
    showIcon: true
  }
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    modelValue: '비활성화된 텍스트',
    placeholder: '비활성화된 입력',
    size: 'md',
    disabled: true,
    showIcon: true
  }
};

// 에러 상태
export const Error: Story = {
  args: {
    modelValue: '에러가 있는 텍스트',
    placeholder: '에러가 있는 입력',
    size: 'md',
    error: true,
    errorMessage: '올바른 텍스트를 입력해주세요.',
    showIcon: true
  }
};

// 읽기 전용
export const Readonly: Story = {
  args: {
    modelValue: '읽기 전용 텍스트',
    placeholder: '읽기 전용 입력',
    size: 'md',
    readonly: true,
    showIcon: true
  }
};

// 아이콘 없음
export const WithoutIcon: Story = {
  args: {
    modelValue: '',
    placeholder: '아이콘 없는 텍스트 입력',
    size: 'md',
    showIcon: false
  }
};

// 모든 상태 비교 (작은 크기)
export const AllStatesSmall: Story = {
  render: () => ({
    components: { BaseInputText },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태 (SM)</h4>
          <BaseInputText placeholder="기본 입력" size="sm" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">값이 있는 상태 (SM)</h4>
          <BaseInputText model-value="입력된 텍스트" size="sm" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">에러 상태 (SM)</h4>
          <BaseInputText 
            model-value="에러 텍스트" 
            size="sm" 
            :error="true" 
            error-message="에러 메시지" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태 (SM)</h4>
          <BaseInputText 
            model-value="비활성화 텍스트" 
            size="sm" 
            :disabled="true" 
          />
        </div>
      </div>
    `
  })
};

// 모든 상태 비교 (중간 크기)
export const AllStatesMedium: Story = {
  render: () => ({
    components: { BaseInputText },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태 (MD)</h4>
          <BaseInputText placeholder="기본 입력" size="md" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">값이 있는 상태 (MD)</h4>
          <BaseInputText model-value="입력된 텍스트" size="md" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">에러 상태 (MD)</h4>
          <BaseInputText 
            model-value="에러 텍스트" 
            size="md" 
            :error="true" 
            error-message="에러 메시지" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태 (MD)</h4>
          <BaseInputText 
            model-value="비활성화 텍스트" 
            size="md" 
            :disabled="true" 
          />
        </div>
      </div>
    `
  })
};

// 크기 비교
export const SizeComparison: Story = {
  render: () => ({
    components: { BaseInputText },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Input/Text-SM (32px 높이)</h4>
          <BaseInputText placeholder="작은 크기 텍스트 입력" size="sm" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Input/Text-MD (40px 높이)</h4>
          <BaseInputText placeholder="중간 크기 텍스트 입력" size="md" />
        </div>
      </div>
    `
  })
}; 