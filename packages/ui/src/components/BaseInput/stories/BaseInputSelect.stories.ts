import type { Meta, StoryObj } from '@storybook/vue3';
import BaseInputSelect from '../BaseInputSelect.vue';

const meta: Meta<typeof BaseInputSelect> = {
  title: 'Inputs/Select',
  component: BaseInputSelect,
  parameters: {
    docs: {
      description: {
        component: '셀렉트 박스 컴포넌트입니다. 피그마의 Input/Select-SM 디자인을 기반으로 구현되었으며, 작은 크기를 지원합니다.'
      }
    }
  },
  argTypes: {
    modelValue: {
      description: '선택된 값 (v-model)',
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
    },
    options: {
      description: '선택 옵션들',
      control: 'object'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 옵션 데이터
const defaultOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' }
];

// 기본 스토리
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '옵션을 선택하세요',
    size: 'sm',
    options: defaultOptions
  }
};

// 값이 선택된 상태
export const WithValue: Story = {
  args: {
    modelValue: 'option2',
    placeholder: '옵션을 선택하세요',
    size: 'sm',
    options: defaultOptions
  }
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    modelValue: 'option1',
    placeholder: '비활성화된 셀렉트',
    size: 'sm',
    disabled: true,
    options: defaultOptions
  }
};

// 에러 상태
export const Error: Story = {
  args: {
    modelValue: '',
    placeholder: '에러가 있는 셀렉트',
    size: 'sm',
    error: true,
    errorMessage: '옵션을 선택해주세요.',
    options: defaultOptions
  }
};

// 긴 옵션 텍스트
export const LongOptions: Story = {
  args: {
    modelValue: '',
    placeholder: '긴 옵션 텍스트가 있는 셀렉트',
    size: 'sm',
    options: [
      { value: 'long1', label: '매우 긴 옵션 텍스트 1번입니다' },
      { value: 'long2', label: '매우 긴 옵션 텍스트 2번입니다' },
      { value: 'long3', label: '매우 긴 옵션 텍스트 3번입니다' }
    ]
  }
};

// 많은 옵션들
export const ManyOptions: Story = {
  args: {
    modelValue: '',
    placeholder: '많은 옵션이 있는 셀렉트',
    size: 'sm',
    options: [
      { value: '1', label: '옵션 1' },
      { value: '2', label: '옵션 2' },
      { value: '3', label: '옵션 3' },
      { value: '4', label: '옵션 4' },
      { value: '5', label: '옵션 5' },
      { value: '6', label: '옵션 6' },
      { value: '7', label: '옵션 7' },
      { value: '8', label: '옵션 8' },
      { value: '9', label: '옵션 9' },
      { value: '10', label: '옵션 10' }
    ]
  }
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const options = [
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' }
      ];
      
      return { options };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태</h4>
          <BaseInputSelect 
            placeholder="기본 셀렉트" 
            size="sm" 
            :options="options" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">값이 선택된 상태</h4>
          <BaseInputSelect 
            model-value="option2" 
            placeholder="선택된 셀렉트" 
            size="sm" 
            :options="options" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">에러 상태</h4>
          <BaseInputSelect 
            placeholder="에러가 있는 셀렉트" 
            size="sm" 
            :error="true" 
            error-message="옵션을 선택해주세요." 
            :options="options" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태</h4>
          <BaseInputSelect 
            model-value="option1" 
            placeholder="비활성화된 셀렉트" 
            size="sm" 
            :disabled="true" 
            :options="options" 
          />
        </div>
      </div>
    `
  })
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const countryOptions = [
        { value: 'kr', label: '대한민국' },
        { value: 'us', label: '미국' },
        { value: 'jp', label: '일본' },
        { value: 'cn', label: '중국' },
        { value: 'uk', label: '영국' }
      ];
      
      const categoryOptions = [
        { value: 'electronics', label: '전자제품' },
        { value: 'clothing', label: '의류' },
        { value: 'books', label: '도서' },
        { value: 'sports', label: '스포츠용품' }
      ];
      
      return { countryOptions, categoryOptions };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">국가 선택</h4>
          <BaseInputSelect 
            placeholder="국가를 선택하세요" 
            size="sm" 
            :options="countryOptions" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">카테고리 선택</h4>
          <BaseInputSelect 
            placeholder="카테고리를 선택하세요" 
            size="sm" 
            :options="categoryOptions" 
          />
        </div>
      </div>
    `
  })
}; 