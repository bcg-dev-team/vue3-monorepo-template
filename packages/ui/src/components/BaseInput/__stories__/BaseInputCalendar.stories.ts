import type { Meta, StoryObj } from '@storybook/vue3';
import BaseInputCalendar from '../BaseInputCalendar.vue';

const meta: Meta<typeof BaseInputCalendar> = {
  title: 'Inputs/Calendar',
  component: BaseInputCalendar,
  parameters: {
    docs: {
      description: {
        component: '캘린더 입력 컴포넌트입니다. 피그마의 Input/Calendar-SM 디자인을 기반으로 구현되었으며, 작은 크기를 지원합니다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      description: '선택된 날짜 (v-model)',
      control: 'text'
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text'
    },
    size: {
      description: '크기 (sm: 32px 높이)',
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
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: 'YYYY-MM-DD',
    size: 'sm'
  }
};

// 날짜가 선택된 상태
export const WithDate: Story = {
  args: {
    modelValue: '2024-01-15',
    placeholder: 'YYYY-MM-DD',
    size: 'sm'
  }
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    modelValue: '2024-01-15',
    placeholder: '비활성화된 캘린더',
    size: 'sm',
    disabled: true
  }
};

// 에러 상태
export const Error: Story = {
  args: {
    modelValue: '',
    placeholder: '에러가 있는 캘린더',
    size: 'sm',
    error: true,
    errorMessage: '올바른 날짜를 선택해주세요.'
  }
};

// 다른 플레이스홀더
export const CustomPlaceholder: Story = {
  args: {
    modelValue: '',
    placeholder: '날짜를 선택하세요',
    size: 'sm'
  }
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => ({
    components: { BaseInputCalendar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태</h4>
          <BaseInputCalendar 
            placeholder="YYYY-MM-DD" 
            size="sm" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">날짜가 선택된 상태</h4>
          <BaseInputCalendar 
            model-value="2024-01-15" 
            placeholder="YYYY-MM-DD" 
            size="sm" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">에러 상태</h4>
          <BaseInputCalendar 
            placeholder="에러가 있는 캘린더" 
            size="sm" 
            :error="true" 
            error-message="올바른 날짜를 선택해주세요." 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태</h4>
          <BaseInputCalendar 
            model-value="2024-01-15" 
            placeholder="비활성화된 캘린더" 
            size="sm" 
            :disabled="true" 
          />
        </div>
      </div>
    `
  })
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseInputCalendar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">생년월일</h4>
          <BaseInputCalendar 
            placeholder="생년월일을 선택하세요" 
            size="sm" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">시작일</h4>
          <BaseInputCalendar 
            placeholder="시작일을 선택하세요" 
            size="sm" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">종료일</h4>
          <BaseInputCalendar 
            placeholder="종료일을 선택하세요" 
            size="sm" 
          />
        </div>
      </div>
    `
  })
};

// 날짜 형식 예시
export const DateFormats: Story = {
  render: () => ({
    components: { BaseInputCalendar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 형식 (YYYY-MM-DD)</h4>
          <BaseInputCalendar 
            model-value="2024-01-15" 
            placeholder="YYYY-MM-DD" 
            size="sm" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">한국어 형식</h4>
          <BaseInputCalendar 
            model-value="2024-01-15" 
            placeholder="2024년 1월 15일" 
            size="sm" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">간단한 형식</h4>
          <BaseInputCalendar 
            model-value="2024-01-15" 
            placeholder="01/15/2024" 
            size="sm" 
          />
        </div>
      </div>
    `
  })
}; 