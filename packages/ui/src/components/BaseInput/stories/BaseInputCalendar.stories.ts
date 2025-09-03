import BaseInputCalendar from '../BaseInputCalendar.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof BaseInputCalendar> = {
  title: 'Inputs/Calendar',
  component: BaseInputCalendar,
  parameters: {
    docs: {
      description: {
        component:
          '캘린더 입력 컴포넌트입니다. 피그마의 Input/Calendar-SM 디자인을 기반으로 구현되었으며, 작은 크기를 지원합니다.',
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
    disabledDate: {
      description: '비활성화할 날짜를 결정하는 함수',
      control: false,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => ({
    components: { BaseInputCalendar },
    setup() {
      const selectedDate = ref('');
      return { args, selectedDate };
    },
    template: `
      <div>
        <BaseInputCalendar 
          v-model="selectedDate"
          v-bind="args"
        />
        <p style="margin-top: 8px; font-size: 12px; color: #666;">
          선택된 날짜: {{ selectedDate || '없음' }}
        </p>
        <button @click="selectedDate = '2024-01-15'" style="margin-top: 8px; padding: 4px 8px; background: #007bff; color: white; border: none; border-radius: 4px;">
          테스트: 2024-01-15로 설정
        </button>
        <button @click="selectedDate = ''" style="margin-left: 8px; padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px;">
          초기화
        </button>
      </div>
    `,
  }),
  args: {
    placeholder: 'YYYY-MM-DD',
  },
};

// 날짜가 선택된 상태
export const WithDate: Story = {
  render: (args) => ({
    components: { BaseInputCalendar },
    setup() {
      const selectedDate = ref('2024-01-15');
      return { args, selectedDate };
    },
    template: `
      <BaseInputCalendar 
        v-model="selectedDate"
        v-bind="args"
      />
      <p style="margin-top: 8px; font-size: 12px; color: #666;">
        선택된 날짜: {{ selectedDate || '없음' }}
      </p>
    `,
  }),
  args: {
    placeholder: 'YYYY-MM-DD',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  render: (args) => ({
    components: { BaseInputCalendar },
    setup() {
      const selectedDate = ref('2024-01-15');
      return { args, selectedDate };
    },
    template: `
      <BaseInputCalendar 
        v-model="selectedDate"
        v-bind="args"
      />
      <p style="margin-top: 8px; font-size: 12px; color: #666;">
        선택된 날짜: {{ selectedDate || '없음' }}
      </p>
    `,
  }),
  args: {
    placeholder: '비활성화된 캘린더',
    disabled: true,
  },
};

// 다른 플레이스홀더
export const CustomPlaceholder: Story = {
  render: (args) => ({
    components: { BaseInputCalendar },
    setup() {
      const selectedDate = ref('');
      return { args, selectedDate };
    },
    template: `
      <BaseInputCalendar 
        v-model="selectedDate"
        v-bind="args"
      />
      <p style="margin-top: 8px; font-size: 12px; color: #666;">
        선택된 날짜: {{ selectedDate || '없음' }}
      </p>
    `,
  }),
  args: {
    placeholder: '날짜를 선택하세요',
  },
};

// 비활성화 날짜 기능
export const WithDisabledDate: Story = {
  render: (args) => ({
    components: { BaseInputCalendar },
    setup() {
      const selectedDate = ref('');
      return { args, selectedDate };
    },
    template: `
      <BaseInputCalendar 
        v-model="selectedDate"
        v-bind="args"
      />
      <p style="margin-top: 8px; font-size: 12px; color: #666;">
        선택된 날짜: {{ selectedDate || '없음' }}
      </p>
    `,
  }),
  args: {
    placeholder: '미래 날짜는 선택할 수 없습니다',
    disabledDate: (date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date > today;
    },
  },
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => ({
    components: { BaseInputCalendar },
    setup() {
      const date1 = ref('');
      const date2 = ref('2024-01-15');
      const date3 = ref('2024-01-15');
      return { date1, date2, date3 };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태</h4>
          <BaseInputCalendar 
            v-model="date1"
            placeholder="YYYY-MM-DD" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ date1 || '없음' }}</p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">날짜가 선택된 상태</h4>
          <BaseInputCalendar 
            v-model="date2"
            placeholder="YYYY-MM-DD" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ date2 || '없음' }}</p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태</h4>
          <BaseInputCalendar 
            v-model="date3"
            placeholder="비활성화된 캘린더" 
            :disabled="true" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ date3 || '없음' }}</p>
        </div>
      </div>
    `,
  }),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseInputCalendar },
    setup() {
      const birthDate = ref('');
      const startDate = ref('');
      const endDate = ref('');
      return { birthDate, startDate, endDate };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">생년월일</h4>
          <BaseInputCalendar 
            v-model="birthDate"
            placeholder="생년월일을 선택하세요" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ birthDate || '없음' }}</p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">시작일</h4>
          <BaseInputCalendar 
            v-model="startDate"
            placeholder="시작일을 선택하세요" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ startDate || '없음' }}</p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">종료일</h4>
          <BaseInputCalendar 
            v-model="endDate"
            placeholder="종료일을 선택하세요" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ endDate || '없음' }}</p>
        </div>
      </div>
    `,
  }),
};

// 날짜 형식 예시
export const DateFormats: Story = {
  render: () => ({
    components: { BaseInputCalendar },
    setup() {
      const date1 = ref('2024-01-15');
      const date2 = ref('2024-01-15');
      const date3 = ref('2024-01-15');
      return { date1, date2, date3 };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 형식 (YYYY-MM-DD)</h4>
          <BaseInputCalendar 
            v-model="date1"
            placeholder="YYYY-MM-DD" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ date1 || '없음' }}</p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">한국어 형식</h4>
          <BaseInputCalendar 
            v-model="date2"
            placeholder="2024년 1월 15일" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ date2 || '없음' }}</p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">간단한 형식</h4>
          <BaseInputCalendar 
            v-model="date3"
            placeholder="01/15/2024" 
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">선택된 날짜: {{ date3 || '없음' }}</p>
        </div>
      </div>
    `,
  }),
};
