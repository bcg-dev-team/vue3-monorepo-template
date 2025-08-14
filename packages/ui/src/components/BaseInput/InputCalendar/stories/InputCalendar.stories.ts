import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import InputCalendar from '../InputCalendar.vue';

/**
 * InputCalendar 컴포넌트
 * 
 * BaseInput을 확장한 캘린더 입력 컴포넌트입니다.
 * 날짜 입력과 유효성 검사 기능을 제공합니다.
 * 
 * [Figma 링크](https://figma.com/design/...)
 */
const meta: Meta<typeof InputCalendar> = {
  title: 'Inputs/InputCalendar',
  component: InputCalendar,
  parameters: {
    docs: {
      description: {
        component: `InputCalendar는 BaseInput을 확장한 캘린더 입력 컴포넌트입니다. 날짜 입력과 유효성 검사 기능을 제공합니다.`,
      },
    },
  },
  argTypes: {
    modelValue: {
      description: '선택된 날짜 (v-model)',
      control: 'text',
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text',
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
    readonly: {
      description: '읽기 전용 여부',
      control: 'boolean',
    },
    fullWidth: {
      description: '전체 너비 사용 여부',
      control: 'boolean',
    },
    minDate: {
      description: '최소 선택 가능한 날짜',
      control: 'text',
    },
    maxDate: {
      description: '최대 선택 가능한 날짜',
      control: 'text',
    },
    format: {
      description: '날짜 포맷',
      control: 'text',
    },
  },
  args: {
    modelValue: '',
    placeholder: 'YYYY-MM-DD',
    disabled: false,
    readonly: false,
    fullWidth: false,
    minDate: undefined,
    maxDate: undefined,
    format: 'YYYY-MM-DD',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 캘린더 입력
 */
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: 'YYYY-MM-DD',
  },
};

/**
 * 날짜가 선택된 상태
 */
export const WithSelectedDate: Story = {
  args: {
    modelValue: '2024-01-15',
    placeholder: 'YYYY-MM-DD',
  },
};

/**
 * 최소/최대 날짜 제한이 있는 입력
 */
export const WithDateRange: Story = {
  args: {
    modelValue: '',
    placeholder: '2024-01-01 ~ 2024-12-31',
    minDate: '2024-01-01',
    maxDate: '2024-12-31',
  },
};

/**
 * 다른 날짜 포맷을 사용하는 입력
 */
export const WithCustomFormat: Story = {
  args: {
    modelValue: '',
    placeholder: 'MM/DD/YYYY',
    format: 'MM/DD/YYYY',
  },
};

/**
 * 전체 너비 캘린더 입력
 */
export const FullWidth: Story = {
  args: {
    modelValue: '',
    placeholder: '전체 너비로 표시',
    fullWidth: true,
  },
};

/**
 * 비활성화된 캘린더 입력
 */
export const Disabled: Story = {
  args: {
    modelValue: '2024-01-15',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};

/**
 * 읽기 전용 캘린더 입력
 */
export const Readonly: Story = {
  args: {
    modelValue: '2024-01-15',
    placeholder: '수정할 수 없습니다',
    readonly: true,
  },
};

/**
 * 과거 날짜 제한이 있는 입력
 */
export const PastDateOnly: Story = {
  args: {
    modelValue: '',
    placeholder: '오늘 이전 날짜만 선택 가능',
    maxDate: new Date().toISOString().split('T')[0],
  },
};

/**
 * 미래 날짜 제한이 있는 입력
 */
export const FutureDateOnly: Story = {
  args: {
    modelValue: '',
    placeholder: '오늘 이후 날짜만 선택 가능',
    minDate: new Date().toISOString().split('T')[0],
  },
};

/**
 * 실시간 날짜 입력 예시
 */
export const RealTimeInput: Story = {
  render: (args) => ({
    components: { InputCalendar },
    setup() {
      const selectedDate = ref('');
      
      return { args, selectedDate };
    },
    template: `
      <div class="space-y-4">
        <InputCalendar 
          v-model="selectedDate"
          placeholder="날짜를 선택하세요"
          :minDate="'2024-01-01'"
          :maxDate="'2024-12-31'"
        />
        <div class="text-sm text-gray-600">
          선택된 날짜: {{ selectedDate || '(없음)' }}
        </div>
      </div>
    `,
  }),
};

/**
 * 다양한 상태 예시
 */
export const AllStates: Story = {
  render: (args) => ({
    components: { InputCalendar },
    setup: () => ({ args }),
    template: `
      <div class="space-y-6">
        <div>
          <h3>기본 상태</h3>
          <InputCalendar v-bind="args" />
        </div>
        <div>
          <h3>날짜 선택됨</h3>
          <InputCalendar 
            v-bind="args" 
            modelValue="2024-01-15"
          />
        </div>
        <div>
          <h3>날짜 범위 제한</h3>
          <InputCalendar 
            v-bind="args" 
            placeholder="2024년만 선택 가능"
            minDate="2024-01-01"
            maxDate="2024-12-31"
          />
        </div>
        <div>
          <h3>커스텀 포맷</h3>
          <InputCalendar 
            v-bind="args" 
            placeholder="MM/DD/YYYY"
            format="MM/DD/YYYY"
          />
        </div>
        <div>
          <h3>비활성화</h3>
          <InputCalendar 
            v-bind="args" 
            modelValue="2024-01-15"
            disabled
          />
        </div>
        <div>
          <h3>읽기 전용</h3>
          <InputCalendar 
            v-bind="args" 
            modelValue="2024-01-15"
            readonly
          />
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: 'YYYY-MM-DD',
  },
};

/**
 * 날짜 범위 예시
 */
export const DateRangeExamples: Story = {
  render: (args) => ({
    components: { InputCalendar },
    setup() {
      const startDate = ref('');
      const endDate = ref('');
      
      return { args, startDate, endDate };
    },
    template: `
      <div class="space-y-4">
        <div>
          <h4>시작 날짜</h4>
          <InputCalendar 
            v-model="startDate"
            placeholder="시작 날짜"
            :maxDate="endDate || undefined"
          />
        </div>
        <div>
          <h4>종료 날짜</h4>
          <InputCalendar 
            v-model="endDate"
            placeholder="종료 날짜"
            :minDate="startDate || undefined"
          />
        </div>
        <div class="text-sm text-gray-600">
          선택된 기간: {{ startDate || '(없음)' }} ~ {{ endDate || '(없음)' }}
        </div>
      </div>
    `,
  }),
}; 