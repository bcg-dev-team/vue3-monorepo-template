import type { Meta, StoryObj } from '@storybook/vue3';
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import BaseInput from '../BaseInput.vue';
import { ref } from 'vue';

const meta: Meta<typeof BaseInput> = {
  title: 'Inputs/Input',
  component: BaseInput,
  parameters: {
    docs: {
      description: {
        component:
          '모든 Input 타입의 공통 베이스 컴포넌트입니다. 피그마 디자인 토큰을 기반으로 구현되었으며, 다양한 상태와 크기를 지원합니다.',
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
    size: {
      description: '크기',
      control: 'select',
      options: ['sm', 'md'],
    },
    variant: {
      description: '입력 타입 변형',
      control: 'select',
      options: ['default', 'search', 'password', 'password-strength', 'tel', 'number'],
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
    error: {
      description: '에러 상태 여부',
      control: 'boolean',
    },
    errorMessage: {
      description: '에러 메시지',
      control: 'text',
    },
    readonly: {
      description: '읽기 전용 여부',
      control: 'boolean',
    },
    userInputs: {
      description: '비밀번호 강도 분석 시 사용할 사용자 입력 데이터 (password-strength variant용)',
      control: 'object',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '기본 입력 필드',
    size: 'md',
  },
};

// 작은 크기
export const Small: Story = {
  args: {
    modelValue: '',
    placeholder: '작은 크기 입력',
    size: 'sm',
  },
};

// 중간 크기
export const Medium: Story = {
  args: {
    modelValue: '',
    placeholder: '중간 크기 입력',
    size: 'md',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    modelValue: '비활성화된 입력',
    placeholder: '비활성화된 입력',
    disabled: true,
    size: 'md',
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    modelValue: '에러가 있는 입력',
    placeholder: '에러가 있는 입력',
    error: true,
    errorMessage: '이 필드는 필수입니다.',
    size: 'md',
  },
};

// 읽기 전용
export const Readonly: Story = {
  args: {
    modelValue: '읽기 전용 텍스트',
    placeholder: '읽기 전용 입력',
    readonly: true,
    size: 'md',
  },
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태</h4>
          <BaseInput placeholder="기본 입력" size="md" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">포커스 상태</h4>
          <BaseInput placeholder="포커스된 입력" size="md" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">에러 상태</h4>
          <BaseInput 
            placeholder="에러가 있는 입력" 
            size="md" 
            :error="true" 
            error-message="이 필드는 필수입니다." 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태</h4>
          <BaseInput 
            placeholder="비활성화된 입력" 
            size="md" 
            :disabled="true" 
          />
        </div>
      </div>
    `,
  }),
};

// 크기 비교
export const SizeComparison: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">작은 크기 (SM)</h4>
          <BaseInput placeholder="작은 크기 입력" size="sm" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">중간 크기 (MD)</h4>
          <BaseInput placeholder="중간 크기 입력" size="md" />
        </div>
      </div>
    `,
  }),
};

// Prepend-inner 단위 표시
export const WithPrependInnerUnit: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">달러 단위 ($)</h4>
          <BaseInput 
            placeholder="금액을 입력하세요" 
            size="md"
            model-value="1000"
          >
            <template #prepend-inner>
              <span style="color: var(--input-color-text-static); font-weight: 500;">$</span>
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">작은 크기 달러 단위</h4>
          <BaseInput 
            placeholder="소액 입력" 
            size="sm"
            model-value="50"
          >
            <template #prepend-inner>
              <span style="color: var(--input-color-text-static); font-weight: 500;">$</span>
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">에러 상태 달러 단위</h4>
          <BaseInput 
            placeholder="잘못된 금액" 
            size="md"
            model-value="abc"
            :error="true"
            error-message="숫자만 입력 가능합니다"
          >
            <template #prepend-inner>
              <span style="color: var(--input-color-text-static); font-weight: 500;">$</span>
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태 달러 단위</h4>
          <BaseInput 
            placeholder="비활성화된 금액" 
            size="md"
            model-value="5000"
            :disabled="true"
          >
            <template #prepend-inner>
              <span style="color: var(--input-color-text-static); font-weight: 500;">$</span>
            </template>
          </BaseInput>
        </div>
      </div>
    `,
  }),
};

// Append-inner 아이콘과 클릭 이벤트
export const WithAppendInnerIcon: Story = {
  render: () => ({
    components: { BaseInput, BaseIcon },
    setup() {
      const handleIconClick = () => {
        alert('아이콘이 클릭되었습니다!');
      };

      const handleSearchIconClick = () => {
        alert('검색 아이콘이 클릭되었습니다!');
      };

      const handleClearIconClick = () => {
        alert('지우기 아이콘이 클릭되었습니다!');
      };

      return {
        handleIconClick,
        handleSearchIconClick,
        handleClearIconClick,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">검색 아이콘</h4>
          <BaseInput 
            placeholder="검색어를 입력하세요" 
            size="md"
            model-value="검색 예시"
          >
            <template #append-inner>
              <BaseIcon 
                name="search" 
                size="md" 
                style="cursor: pointer; color: #666;"
                @click="handleSearchIconClick"
              />
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">지우기 아이콘</h4>
          <BaseInput 
            placeholder="텍스트를 입력하세요" 
            size="md"
            model-value="입력된 텍스트"
          >
            <template #append-inner>
              <BaseIcon 
                name="close" 
                size="md" 
                style="cursor: pointer; color: #999;"
                @click="handleClearIconClick"
              />
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">눈 아이콘 (비밀번호 표시)</h4>
          <BaseInput 
            placeholder="비밀번호를 입력하세요" 
            size="md"
            type="password"
            model-value="password123"
          >
            <template #append-inner>
              <BaseIcon 
                name="eye" 
                size="md" 
                style="cursor: pointer; color: #666;"
                @click="handleIconClick"
              />
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">정보 아이콘</h4>
          <BaseInput 
            placeholder="도움말이 있는 입력" 
            size="md"
            model-value="도움말이 필요한 입력"
          >
            <template #append-inner>
              <BaseIcon 
                name="info" 
                size="md" 
                style="cursor: pointer; color: #2196F3;"
                @click="handleIconClick"
              />
            </template>
          </BaseInput>
        </div>
      </div>
    `,
  }),
};

// Prepend 외부 슬롯
export const WithPrepend: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">라벨과 함께</h4>
          <BaseInput 
            placeholder="이름을 입력하세요" 
            size="md"
            model-value="홍길동"
          >
            <template #prepend>
              <label style="color: #333; font-weight: 500; font-size: 14px; white-space: nowrap;">이름</label>
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">아이콘과 함께</h4>
          <BaseInput 
            placeholder="검색어를 입력하세요" 
            size="md"
            model-value=""
          >
            <template #prepend>
              <div style="display: flex; align-items: center; gap: 8px; color: #666; white-space: nowrap;">
                <span>🔍</span>
                <span style="font-size: 12px;">검색</span>
              </div>
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">복합 정보</h4>
          <BaseInput 
            placeholder="전화번호를 입력하세요" 
            size="md"
            model-value="010-1234-5678"
          >
            <template #prepend>
              <div style="display: flex; flex-direction: column; gap: 2px; white-space: nowrap;">
                <span style="color: #333; font-weight: 500; font-size: 12px;">연락처</span>
                <span style="color: #666; font-size: 10px;">필수 입력</span>
              </div>
            </template>
          </BaseInput>
        </div>
      </div>
    `,
  }),
};

// Append 외부 슬롯
export const WithAppend: Story = {
  render: () => ({
    components: { BaseInput },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">도움말 텍스트</h4>
          <BaseInput 
            placeholder="비밀번호를 입력하세요" 
            size="md"
            model-value=""
          >
            <template #append>
              <span style="color: #666; font-size: 12px; white-space: nowrap;">8자 이상 입력하세요</span>
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">버튼과 함께</h4>
          <BaseInput 
            placeholder="이메일을 입력하세요" 
            size="md"
            model-value="user@example.com"
          >
            <template #append>
              <button 
                style="
                  background: #007bff; 
                  color: white; 
                  border: none; 
                  padding: 4px 8px; 
                  border-radius: 4px; 
                  font-size: 12px; 
                  cursor: pointer;
                  white-space: nowrap;
                "
                @click="() => alert('인증 메일을 발송했습니다!')"
              >
                인증
              </button>
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">상태 표시</h4>
          <BaseInput 
            placeholder="사용자명을 입력하세요" 
            size="md"
            model-value="available_user"
          >
            <template #append>
              <div style="display: flex; align-items: center; gap: 4px; color: #28a745; white-space: nowrap;">
                <span>✓</span>
                <span style="font-size: 12px;">사용 가능</span>
              </div>
            </template>
          </BaseInput>
        </div>
      </div>
    `,
  }),
};

// Search Variant
export const SearchVariant: Story = {
  render: () => ({
    components: { BaseInput },
    setup() {
      const searchValue = ref('');
      const handleSearch = () => {
        alert(`검색어: ${searchValue.value}`);
      };

      return { searchValue, handleSearch };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Search Variant - MD 크기</h4>
          <BaseInput 
            v-model="searchValue"
            variant="search"
            placeholder="검색어를 입력하세요"
            size="md"
            :onSearch="handleSearch"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Search Variant - SM 크기</h4>
          <BaseInput 
            v-model="searchValue"
            variant="search"
            placeholder="작은 검색창"
            size="sm"
            :onSearch="handleSearch"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Search Variant - 비활성화</h4>
          <BaseInput 
            v-model="searchValue"
            variant="search"
            placeholder="비활성화된 검색"
            size="md"
            :disabled="true"
            :onSearch="handleSearch"
          />
        </div>
      </div>
    `,
  }),
};

// Password Variant
export const PasswordVariant: Story = {
  render: () => ({
    components: { BaseInput },
    setup() {
      const password = ref('password123');
      const confirmPassword = ref('');

      return { password, confirmPassword };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Variant - MD 크기</h4>
          <BaseInput 
            v-model="password"
            variant="password"
            placeholder="비밀번호를 입력하세요"
            size="md"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Variant - SM 크기</h4>
          <BaseInput 
            v-model="confirmPassword"
            variant="password"
            placeholder="비밀번호 확인"
            size="sm"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Variant - 에러 상태</h4>
          <BaseInput 
            v-model="confirmPassword"
            variant="password"
            placeholder="비밀번호 확인"
            size="md"
            :error="true"
            error-message="비밀번호가 일치하지 않습니다"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Variant - 비활성화</h4>
          <BaseInput 
            v-model="password"
            variant="password"
            placeholder="비활성화된 비밀번호"
            size="md"
            :disabled="true"
          />
        </div>
      </div>
    `,
  }),
};

// Password Strength Variant
export const PasswordStrengthVariant: Story = {
  render: () => ({
    components: { BaseInput },
    setup() {
      const password = ref('password123');
      const weakPassword = ref('123');
      const strongPassword = ref('MyStr0ng!P@ssw0rd');
      const userPassword = ref('john123');

      // 사용자 입력 데이터 예시
      const userInputs = ['john', 'smith', 'john.smith@example.com', 'johnsmith'];

      return { password, weakPassword, strongPassword, userPassword, userInputs };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Strength - MD 크기</h4>
          <BaseInput 
            v-model="password"
            variant="password-strength"
            placeholder="비밀번호를 입력하세요"
            size="md"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Strength - SM 크기</h4>
          <BaseInput 
            v-model="weakPassword"
            variant="password-strength"
            placeholder="비밀번호를 입력하세요"
            size="sm"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Strength - 강한 비밀번호</h4>
          <BaseInput
            v-model="strongPassword"
            variant="password-strength"
            placeholder="강한 비밀번호를 입력하세요"
            size="md"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Strength - 사용자 정보 포함 (취약)</h4>
          <BaseInput
            v-model="userPassword"
            variant="password-strength"
            placeholder="사용자 정보가 포함된 비밀번호"
            size="md"
            :user-inputs="userInputs"
          />
          <p style="margin-top: 4px; font-size: 11px; color: #666; line-height: 1.3;">
            사용자 정보: {{ userInputs.join(', ') }}
          </p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Strength - 에러 상태</h4>
          <BaseInput 
            v-model="weakPassword"
            variant="password-strength"
            placeholder="비밀번호를 입력하세요"
            size="md"
            :error="true"
            error-message="비밀번호가 너무 약합니다"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Strength - 비활성화</h4>
          <BaseInput 
            v-model="password"
            variant="password-strength"
            placeholder="비활성화된 비밀번호"
            size="md"
            :disabled="true"
          />
        </div>
      </div>
    `,
  }),
};

// Tel Variant
export const TelVariant: Story = {
  render: () => ({
    components: { BaseInput },
    setup() {
      const phoneNumber = ref('010-1234-5678');
      const homeNumber = ref('');

      return { phoneNumber, homeNumber };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Tel Variant - MD 크기</h4>
          <BaseInput 
            v-model="phoneNumber"
            variant="tel"
            placeholder="전화번호를 입력하세요"
            size="md"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Tel Variant - SM 크기</h4>
          <BaseInput 
            v-model="homeNumber"
            variant="tel"
            placeholder="집전화번호"
            size="sm"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Tel Variant - 에러 상태</h4>
          <BaseInput 
            v-model="phoneNumber"
            variant="tel"
            placeholder="올바른 전화번호를 입력하세요"
            size="md"
            :error="true"
            error-message="올바른 전화번호 형식이 아닙니다"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Tel Variant - 비활성화</h4>
          <BaseInput 
            v-model="phoneNumber"
            variant="tel"
            placeholder="비활성화된 전화번호"
            size="md"
            :disabled="true"
          />
        </div>
      </div>
    `,
  }),
};

// Number Variant
export const NumberVariant: Story = {
  render: () => ({
    components: { BaseInput },
    setup() {
      const age = ref('25');
      const price = ref('');

      return { age, price };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Number Variant - MD 크기</h4>
          <BaseInput 
            v-model="age"
            variant="number"
            placeholder="나이를 입력하세요"
            size="md"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Number Variant - SM 크기</h4>
          <BaseInput 
            v-model="price"
            variant="number"
            placeholder="가격을 입력하세요"
            size="sm"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Number Variant - 에러 상태</h4>
          <BaseInput 
            v-model="age"
            variant="number"
            placeholder="올바른 숫자를 입력하세요"
            size="md"
            :error="true"
            error-message="1 이상의 숫자를 입력하세요"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Number Variant - 비활성화</h4>
          <BaseInput 
            v-model="age"
            variant="number"
            placeholder="비활성화된 숫자 입력"
            size="md"
            :disabled="true"
          />
        </div>
      </div>
    `,
  }),
};

// All Variants Comparison
export const AllVariantsComparison: Story = {
  render: () => ({
    components: { BaseInput },
    setup() {
      const defaultValue = ref('기본 입력값');
      const searchValue = ref('검색어 예시');
      const passwordValue = ref('password123');
      const passwordStrengthValue = ref('MyStr0ng!P@ssw0rd');
      const telValue = ref('010-1234-5678');
      const numberValue = ref('25');

      const handleSearch = () => {
        alert(`검색: ${searchValue.value}`);
      };

      return {
        defaultValue,
        searchValue,
        passwordValue,
        passwordStrengthValue,
        telValue,
        numberValue,
        handleSearch,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Default Variant</h4>
          <BaseInput 
            v-model="defaultValue"
            variant="default"
            placeholder="기본 입력 필드"
            size="md"
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">
            입력값: {{ defaultValue || '없음' }}
          </p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Search Variant</h4>
          <BaseInput 
            v-model="searchValue"
            variant="search"
            placeholder="검색어를 입력하세요"
            size="md"
            :onSearch="handleSearch"
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">
            검색어: {{ searchValue || '없음' }}
          </p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Variant</h4>
          <BaseInput 
            v-model="passwordValue"
            variant="password"
            placeholder="비밀번호를 입력하세요"
            size="md"
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">
            비밀번호 길이: {{ passwordValue ? passwordValue.length + '자' : '없음' }}
          </p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Password Strength Variant</h4>
          <BaseInput
            v-model="passwordStrengthValue"
            variant="password-strength"
            placeholder="강한 비밀번호를 입력하세요"
            size="md"
            :user-inputs="['user', 'example', 'test']"
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">
            비밀번호 길이: {{ passwordStrengthValue ? passwordStrengthValue.length + '자' : '없음' }}
          </p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Tel Variant</h4>
          <BaseInput 
            v-model="telValue"
            variant="tel"
            placeholder="전화번호를 입력하세요"
            size="md"
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">
            전화번호: {{ telValue || '없음' }}
          </p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Number Variant</h4>
          <BaseInput 
            v-model="numberValue"
            variant="number"
            placeholder="숫자를 입력하세요"
            size="md"
          />
          <p style="margin-top: 4px; font-size: 12px; color: #666;">
            숫자: {{ numberValue || '없음' }}
          </p>
        </div>
      </div>
    `,
  }),
};

// 모든 슬롯 조합
export const AllSlotsCombined: Story = {
  render: () => ({
    components: { BaseInput, BaseIcon },
    setup() {
      const handleSearchClick = () => {
        alert('검색이 실행되었습니다!');
      };

      const handleClearClick = () => {
        alert('내용이 지워졌습니다!');
      };

      const handleVerifyClick = () => {
        alert('인증이 완료되었습니다!');
      };

      return {
        handleSearchClick,
        handleClearClick,
        handleVerifyClick,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 500px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">모든 슬롯 조합 예시</h4>
          <BaseInput 
            placeholder="검색어를 입력하세요" 
            size="md"
            model-value="검색 예시"
          >
            <template #prepend>
              <div style="display: flex; align-items: center; gap: 8px; color: #666; white-space: nowrap;">
                <span>🔍</span>
                <span style="font-size: 12px;">통합 검색</span>
              </div>
            </template>
            
            <template #prepend-inner>
              <span style="color: var(--input-color-text-static); font-weight: 500;">@</span>
            </template>
            
            <template #append-inner>
              <BaseIcon 
                name="close" 
                size="md" 
                style="cursor: pointer; color: #999;"
                @click="handleClearClick"
              />
            </template>
            
            <template #append>
              <button 
                style="
                  background: #28a745; 
                  color: white; 
                  border: none; 
                  padding: 4px 12px; 
                  border-radius: 4px; 
                  font-size: 12px; 
                  cursor: pointer;
                  white-space: nowrap;
                "
                @click="handleSearchClick"
              >
                검색
              </button>
            </template>
          </BaseInput>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">인증 폼 예시</h4>
          <BaseInput 
            placeholder="인증번호를 입력하세요" 
            size="md"
            model-value="123456"
          >
            <template #prepend>
              <label style="color: #333; font-weight: 500; font-size: 14px; white-space: nowrap;">인증번호</label>
            </template>
            
            <template #prepend-inner>
              <span style="color: var(--input-color-text-static); font-weight: 500;">#</span>
            </template>
            
            <template #append-inner>
              <BaseIcon 
                name="info" 
                size="md" 
                style="cursor: pointer; color: #2196F3;"
                @click="() => alert('6자리 숫자를 입력하세요')"
              />
            </template>
            
            <template #append>
              <div style="display: flex; align-items: center; gap: 4px; white-space: nowrap;">
                <span style="color: #28a745; font-size: 12px;">✓ 인증됨</span>
                <button 
                  style="
                    background: #007bff; 
                    color: white; 
                    border: none; 
                    padding: 4px 8px; 
                    border-radius: 4px; 
                    font-size: 12px; 
                    cursor: pointer;
                    margin-left: 8px;
                  "
                  @click="handleVerifyClick"
                >
                  재인증
                </button>
              </div>
            </template>
          </BaseInput>
        </div>
      </div>
    `,
  }),
};
