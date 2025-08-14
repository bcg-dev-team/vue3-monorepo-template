import type { Meta, StoryObj } from '@storybook/vue3'
import InputFactory from '../InputFactory.vue'

const meta: Meta<typeof InputFactory> = {
  title: 'Components/BaseInput/InputFactory',
  component: InputFactory,
  parameters: {
    docs: {
      description: {
        component: '모든 Input 타입을 통합 관리하는 Factory 컴포넌트입니다. type prop으로 다양한 입력 타입을 지원합니다.'
      }
    },
    design: {
      type: 'figma',
      url: 'https://figma.com/design/...'
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'number', 'date', 'select', 'stepper'],
      description: '입력 타입'
    },
    modelValue: {
      control: 'text',
      description: '입력값 (v-model)'
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트'
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부'
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 여부'
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부'
    },
    options: {
      control: 'object',
      description: 'Select 타입 전용: 선택 옵션들'
    },
    min: {
      control: 'number',
      description: 'Number, Stepper 타입 전용: 최소값'
    },
    max: {
      control: 'number',
      description: 'Number, Stepper 타입 전용: 최대값'
    },
    step: {
      control: 'number',
      description: 'Number, Stepper 타입 전용: 증감 단위'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 스토리
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '텍스트를 입력하세요'
  }
}

// 모든 타입을 보여주는 스토리
export const AllTypes: Story = {
  render: () => ({
    components: { InputFactory },
    template: `
      <div class="space-y-4 p-4">
        <h3 class="text-lg font-semibold mb-4">모든 Input 타입</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 단순 타입들 -->
          <div class="space-y-2">
            <label class="text-sm font-medium">Text</label>
            <InputFactory type="text" placeholder="텍스트 입력" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <InputFactory type="email" placeholder="이메일 입력" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Search</label>
            <InputFactory type="search" placeholder="검색어 입력" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Tel</label>
            <InputFactory type="tel" placeholder="전화번호 입력" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Number</label>
            <InputFactory type="number" placeholder="숫자 입력" :min="0" :max="100" :step="1" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Date</label>
            <InputFactory type="date" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Select</label>
            <InputFactory 
              type="select" 
              :options="[
                { value: 'option1', label: '옵션 1' },
                { value: 'option2', label: '옵션 2' },
                { value: 'option3', label: '옵션 3' }
              ]"
              placeholder="선택해주세요"
            />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Stepper</label>
            <InputFactory type="stepper" :min="0" :max="100" :step="5" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">Password</label>
            <InputFactory type="password" placeholder="비밀번호 입력" />
          </div>
        </div>
      </div>
    `
  })
}

// 상태별 스토리
export const States: Story = {
  render: () => ({
    components: { InputFactory },
    template: `
      <div class="space-y-4 p-4">
        <h3 class="text-lg font-semibold mb-4">다양한 상태</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">기본</label>
            <InputFactory type="text" placeholder="기본 상태" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">비활성화</label>
            <InputFactory type="text" placeholder="비활성화" :disabled="true" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">읽기 전용</label>
            <InputFactory type="text" value="읽기 전용 텍스트" :readonly="true" />
          </div>
          
          <div class="space-y-2">
            <label class="text-sm font-medium">전체 너비</label>
            <InputFactory type="text" placeholder="전체 너비" :fullWidth="true" />
          </div>
        </div>
      </div>
    `
  })
}

// Select 타입 스토리
export const SelectType: Story = {
  args: {
    type: 'select',
    placeholder: '선택해주세요',
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3 (비활성화)', disabled: true },
      { value: 'option4', label: '옵션 4' },
      { value: 'option5', label: '옵션 5' }
    ]
  }
}

// Number 타입 스토리
export const NumberType: Story = {
  args: {
    type: 'number',
    placeholder: '숫자 입력',
    min: 0,
    max: 100,
    step: 5
  }
}

// Date 타입 스토리
export const DateType: Story = {
  args: {
    type: 'date'
  }
}

// Password 타입 스토리
export const PasswordType: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호 입력'
  }
}

// Stepper 타입 스토리
export const StepperType: Story = {
  args: {
    type: 'stepper',
    min: 0,
    max: 100,
    step: 10
  }
}
