import type { Meta, StoryObj } from '@storybook/vue3';
import InputSearch from '../InputSearch.vue';
import { ref } from 'vue';

const meta: Meta<typeof InputSearch> = {
  title: 'Inputs/InputSearch',
  component: InputSearch,
  parameters: {
    docs: {
      description: {
        component: `BaseInput을 확장한 검색 입력 컴포넌트입니다.\n검색 아이콘, 지우기 버튼, 자동완성 제안 목록을 제공하며, 디바운스 기능을 지원합니다.\nFigma 링크: [Figma 링크](https://www.figma.com/)`,
      },
    },
  },
  argTypes: {
    modelValue: {
      description: '입력값 (v-model)',
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
      description: '입력창을 부모의 100% 너비로 확장할지 여부',
      control: 'boolean',
    },
    clearable: {
      description: '지우기 버튼 표시 여부',
      control: 'boolean',
    },
    autoComplete: {
      description: '자동완성 기능 여부',
      control: 'boolean',
    },
    suggestions: {
      description: '자동완성 제안 목록',
      control: 'object',
    },
    debounce: {
      description: '디바운스 시간 (ms)',
      control: 'number',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const searchValue = ref(args.modelValue || '');
      
      const handleSearch = (value: string) => {
        console.log('🔍 검색 실행:', value);
      };
      
      const handleClear = () => {
        console.log('🧹 검색어 지우기');
      };
      
      return {
        args,
        searchValue,
        handleSearch,
        handleClear,
      };
    },
    template: `
      <div>
        <InputSearch
          v-model="searchValue"
          v-bind="args"
          @search="handleSearch"
          @clear="handleClear"
        />
        <div class="mt-4 p-3 bg-gray-100 rounded">
          <p><strong>현재 검색어:</strong> "{{ searchValue || '(없음)' }}"</p>
          <p><strong>검색어를 입력하거나 X 버튼을 클릭해보세요!</strong></p>
          <p><strong>콘솔을 확인하여 이벤트 동작을 확인하세요.</strong></p>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: '',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: false,
    suggestions: [],
    debounce: 300,
  },
};

// 검색어가 있는 상태
export const WithValue: Story = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const searchValue = ref(args.modelValue || '');
      
      const handleSearch = (value: string) => {
        console.log('🔍 검색 실행:', value);
      };
      
      const handleClear = () => {
        console.log('🧹 검색어 지우기');
      };
      
      return {
        args,
        searchValue,
        handleSearch,
        handleClear,
      };
    },
    template: `
      <div>
        <InputSearch
          v-model="searchValue"
          v-bind="args"
          @search="handleSearch"
          @clear="handleClear"
        />
        <div class="mt-4 p-3 bg-gray-100 rounded">
          <p><strong>현재 검색어:</strong> "{{ searchValue || '(없음)' }}"</p>
          <p><strong>X 버튼을 클릭하여 검색어를 지워보세요!</strong></p>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: 'Vue.js',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: false,
    suggestions: [],
    debounce: 300,
  },
};

// 지우기 버튼 테스트용 (빈 값이지만 clearable: true)
export const ClearableEmpty: Story = {
  args: {
    modelValue: '',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: false,
    suggestions: [],
    debounce: 300,
  },
  parameters: {
    docs: {
      description: '빈 값이지만 지우기 버튼이 표시되는지 테스트합니다. 실제로는 텍스트를 입력해야 지우기 버튼이 나타납니다.',
    },
  },
};

// 자동완성 제안과 함께
export const WithSuggestions: Story = {
  args: {
    modelValue: 'Vue',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: true,
    suggestions: ['Vue.js', 'Vue 3', 'Vue Router', 'Vuex', 'Vue CLI'],
    debounce: 300,
  },
};

// 지우기 버튼 없음
export const WithoutClearButton: Story = {
  args: {
    modelValue: '검색어',
    placeholder: '검색어를 입력하세요',
    clearable: false,
    autoComplete: false,
    suggestions: [],
    debounce: 300,
  },
};

// 자동완성 없음
export const NoAutoComplete: Story = {
  args: {
    modelValue: '',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: false,
    suggestions: [],
    debounce: 300,
  },
};

// 빠른 디바운스
export const FastDebounce: Story = {
  args: {
    modelValue: '',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: true,
    suggestions: ['빠른', '검색', '결과'],
    debounce: 100,
  },
};

// 느린 디바운스
export const SlowDebounce: Story = {
  args: {
    modelValue: '',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: true,
    suggestions: ['느린', '검색', '결과'],
    debounce: 1000,
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    modelValue: '검색어',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: false,
    suggestions: [],
    debounce: 300,
    disabled: true,
  },
};

// 읽기 전용
export const Readonly: Story = {
  args: {
    modelValue: '읽기 전용 검색어',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: false,
    suggestions: [],
    debounce: 300,
    readonly: true,
  },
};

// 전체 너비
export const FullWidth: Story = {
  args: {
    modelValue: '',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: false,
    suggestions: [],
    debounce: 300,
    fullWidth: true,
  },
};

// 긴 제안 목록
export const LongSuggestions: Story = {
  args: {
    modelValue: '프로그래밍',
    placeholder: '검색어를 입력하세요',
    clearable: true,
    autoComplete: true,
    suggestions: [
      '프로그래밍 언어',
      '프로그래밍 패러다임',
      '프로그래밍 도구',
      '프로그래밍 프레임워크',
      '프로그래밍 라이브러리',
      '프로그래밍 튜토리얼',
      '프로그래밍 커뮤니티',
      '프로그래밍 블로그',
      '프로그래밍 책',
      '프로그래밍 강의',
    ],
    debounce: 300,
  },
}; 