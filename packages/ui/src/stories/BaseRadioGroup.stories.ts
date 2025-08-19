import type { Meta, StoryObj } from '@storybook/vue3';
import BaseRadioGroup from '../components/BaseRadioGroup/BaseRadioGroup.vue';
import { ref, computed } from 'vue';

const meta: Meta<typeof BaseRadioGroup> = {
  title: 'Inputs/RadioGroup',
  component: BaseRadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Headless UI를 기반으로 한 라디오 그룹 컴포넌트입니다. BaseTabs의 inner variant와 동일한 스타일을 적용하여 일관된 디자인을 제공합니다. initialValue로 초기 선택값을 설정할 수 있으며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: '라디오 옵션 목록',
    },
    initialValue: {
      control: 'text',
      description: '초기 선택값 (modelValue가 없을 때만 사용)',
    },
    label: {
      control: 'text',
      description: '라디오 그룹 라벨',
    },
    disabled: {
      control: 'boolean',
      description: '전체 비활성화 여부',
    },
    name: {
      control: 'text',
      description: '폼에서 사용할 name 속성',
    },
    by: {
      control: 'text',
      description: '객체 비교를 위한 키 또는 비교 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 라디오 그룹
export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
    initialValue: 'option1',
    label: '선택하세요',
  },
  parameters: {
    docs: {
      description: {
        story: '기본적인 라디오 그룹입니다. initialValue를 "option1"로 설정하여 첫 번째 옵션이 초기 선택됩니다. 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 아이콘이 있는 라디오 그룹
export const WithIcons: Story = {
  args: {
    options: [
      { value: 'startup', label: '스타트업', icon: 'plus' },
      { value: 'business', label: '비즈니스', icon: 'home' },
      { value: 'enterprise', label: '엔터프라이즈', icon: 'star' },
    ],
    initialValue: 'startup',
    label: '플랜 선택',
  },
  parameters: {
    docs: {
      description: {
        story: '각 옵션에 아이콘이 포함된 라디오 그룹입니다. initialValue를 "startup"으로 설정하여 "스타트업" 옵션이 초기 선택됩니다. 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 비활성화된 옵션이 있는 라디오 그룹
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2', disabled: true },
      { value: 'option3', label: '옵션 3' },
    ],
    initialValue: 'option1',
    label: '옵션 선택',
  },
  parameters: {
    docs: {
      description: {
        story: '일부 옵션이 비활성화된 라디오 그룹입니다. initialValue를 "option1"로 설정하여 첫 번째 옵션이 초기 선택됩니다. 비활성화된 옵션은 선택할 수 없지만, 활성화된 옵션들은 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 전체 비활성화된 라디오 그룹
export const Disabled: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
    initialValue: 'option1',
    label: '비활성화된 그룹',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '전체가 비활성화된 라디오 그룹입니다. initialValue를 "option1"로 설정하여 첫 번째 옵션이 초기 선택되지만, disabled prop으로 인해 모든 옵션을 선택할 수 없습니다.',
      },
    },
  },
};

// 폼에서 사용하는 라디오 그룹
export const WithForm: Story = {
  args: {
    options: [
      { value: 'male', label: '남성' },
      { value: 'female', label: '여성' },
      { value: 'other', label: '기타' },
    ],
    initialValue: 'male',
    label: '성별',
    name: 'gender',
  },
  parameters: {
    docs: {
      description: {
        story: 'HTML 폼에서 사용할 수 있는 라디오 그룹입니다. initialValue를 "male"로 설정하여 "남성" 옵션이 초기 선택됩니다. name 속성을 통해 폼 제출 시 값이 전송되며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 숫자 값을 사용하는 라디오 그룹
export const WithNumericValues: Story = {
  args: {
    options: [
      { value: 1, label: '1개' },
      { value: 2, label: '2개' },
      { value: 3, label: '3개' },
      { value: 4, label: '4개' },
      { value: 5, label: '5개' },
    ],
    initialValue: 1,
    label: '수량 선택',
  },
  parameters: {
    docs: {
      description: {
        story: '숫자 값을 사용하는 라디오 그룹입니다. initialValue를 1로 설정하여 "1개" 옵션이 초기 선택됩니다. 문자열뿐만 아니라 숫자 값도 사용할 수 있으며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 객체 값을 사용하는 라디오 그룹
export const WithObjectValues: Story = {
  args: {
    options: [
      { value: { id: 'startup', name: '스타트업', price: 10000 }, label: '스타트업' },
      { value: { id: 'business', name: '비즈니스', price: 20000 }, label: '비즈니스' },
      { value: { id: 'enterprise', name: '엔터프라이즈', price: 50000 }, label: '엔터프라이즈' },
    ],
    initialValue: { id: 'startup', name: '스타트업', price: 10000 },
    label: '플랜 선택 (객체)',
    by: 'id',
  },
  parameters: {
    docs: {
      description: {
        story: '객체 값을 사용하는 라디오 그룹입니다. initialValue를 startup 객체로 설정하여 "스타트업" 옵션이 초기 선택됩니다. by prop을 사용하여 객체 비교 방법을 지정할 수 있으며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 초기값이 없는 라디오 그룹
export const WithoutInitialValue: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
    ],
    label: '초기값 없음',
  },
  parameters: {
    docs: {
      description: {
        story: '초기값이 설정되지 않은 라디오 그룹입니다. initialValue를 설정하지 않으면 아무 옵션도 선택되지 않은 상태로 시작됩니다. 사용자가 옵션을 클릭해야 선택되며, 선택 후에는 다른 옵션으로 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 이벤트 필터링을 위한 라디오 그룹
export const EventFilter: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      // 이벤트 목록 데이터
      const events = ref([
        { id: 1, title: 'Vue.js 컨퍼런스 2024', status: 'ongoing', date: '2024-12-15', attendees: 150 },
        { id: 2, title: 'React 워크샵', status: 'ongoing', date: '2024-12-20', attendees: 80 },
        { id: 3, title: 'TypeScript 마스터클래스', status: 'ended', date: '2024-11-30', attendees: 120 },
        { id: 4, title: 'Node.js 해커톤', status: 'ended', date: '2024-11-15', attendees: 200 },
        { id: 5, title: 'AI 개발자 밋업', status: 'upcoming', date: '2025-01-10', attendees: 60 },
        { id: 6, title: 'DevOps 컨퍼런스', status: 'upcoming', date: '2025-01-25', attendees: 100 },
      ]);

      // 필터 옵션
      const filterOptions = ref([
        { value: 'all', label: '전체' },
        { value: 'ongoing', label: '진행 중' },
        { value: 'ended', label: '종료' },
        { value: 'upcoming', label: '예정' },
      ]);

      // 선택된 필터
      const selectedFilter = ref('all');

      // 필터링된 이벤트 목록
      const filteredEvents = computed(() => {
        if (selectedFilter.value === 'all') {
          return events.value;
        }
        return events.value.filter(event => event.status === selectedFilter.value);
      });

      // 이벤트 상태에 따른 배지 스타일
      const getStatusBadgeClass = (status: string) => {
        switch (status) {
          case 'ongoing':
            return 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full';
          case 'ended':
            return 'bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full';
          case 'upcoming':
            return 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full';
          default:
            return 'bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full';
        }
      };

      // 이벤트 상태에 따른 한글 라벨
      const getStatusLabel = (status: string) => {
        switch (status) {
          case 'ongoing':
            return '진행 중';
          case 'ended':
            return '종료';
          case 'upcoming':
            return '예정';
          default:
            return status;
        }
      };

      return {
        events,
        filterOptions,
        selectedFilter,
        filteredEvents,
        getStatusBadgeClass,
        getStatusLabel,
      };
    },
    template: `
      <div class="space-y-6 max-w-4xl">
        <!-- 필터 섹션 -->
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">이벤트 필터</h3>
          <BaseRadioGroup
            v-model="selectedFilter"
            :options="filterOptions"
            label="이벤트 상태별 필터링"
          />
          <p class="text-sm text-gray-600 mt-2">
            선택된 필터: <strong>{{ selectedFilter === 'all' ? '전체' : getStatusLabel(selectedFilter) }}</strong>
          </p>
        </div>

        <!-- 이벤트 목록 -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">
              이벤트 목록 
              <span class="text-sm font-normal text-gray-500">
                ({{ filteredEvents.length }}개)
              </span>
            </h3>
          </div>
          
          <div class="divide-y divide-gray-200">
            <div
              v-for="event in filteredEvents"
              :key="event.id"
              class="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h4 class="text-base font-medium text-gray-900">{{ event.title }}</h4>
                  <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>📅 {{ event.date }}</span>
                    <span>👥 {{ event.attendees }}명</span>
                    <span :class="getStatusBadgeClass(event.status)">
                      {{ getStatusLabel(event.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 이벤트가 없을 때 -->
            <div
              v-if="filteredEvents.length === 0"
              class="px-6 py-12 text-center text-gray-500"
            >
              <p>해당 조건의 이벤트가 없습니다.</p>
            </div>
          </div>
        </div>

        <!-- 디버그 정보 -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-sm font-medium text-gray-700 mb-2">디버그 정보</h4>
          <div class="text-xs text-gray-600 space-y-1">
            <p>선택된 필터: {{ selectedFilter }}</p>
            <p>전체 이벤트 수: {{ events.length }}</p>
            <p>필터링된 이벤트 수: {{ filteredEvents.length }}</p>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '이벤트 필터링을 위한 라디오 그룹 예시입니다. "전체", "진행 중", "종료", "예정" 중 선택하여 이벤트 목록을 필터링할 수 있습니다. 선택된 필터에 따라 실시간으로 이벤트 목록이 업데이트되며, 각 이벤트의 상태, 날짜, 참가자 수를 확인할 수 있습니다.',
      },
    },
  },
}; 