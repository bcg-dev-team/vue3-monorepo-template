import type { Meta, StoryObj } from '@storybook/vue3';
import InputSelect from '../InputSelect.vue';

const meta: Meta<typeof InputSelect> = {
  title: 'Inputs/InputSelect',
  component: InputSelect,
  parameters: {
    docs: {
      description: {
        component: `BaseInput을 확장한 셀렉트 박스 컴포넌트입니다.\n단일/다중 선택을 지원하며, 옵션 목록을 표시합니다.\nFigma 링크: [Figma 링크](https://www.figma.com/)`,
      },
    },
  },
  argTypes: {
    modelValue: {
      description: '선택된 값 (v-model)',
      control: 'object',
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
    options: {
      description: '선택 옵션들',
      control: 'object',
    },
    multiple: {
      description: '다중 선택 여부',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 옵션들
const defaultOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
  { value: 'option5', label: '옵션 5' },
];

// 카테고리 옵션들
const categoryOptions = [
  { value: 'electronics', label: '전자제품' },
  { value: 'clothing', label: '의류' },
  { value: 'books', label: '도서' },
  { value: 'sports', label: '스포츠용품' },
  { value: 'home', label: '홈&가든' },
];

// 사용자 옵션들
const userOptions = [
  { value: 'admin', label: '관리자' },
  { value: 'user', label: '일반 사용자' },
  { value: 'guest', label: '게스트' },
  { value: 'moderator', label: '모더레이터', disabled: true },
];

// 기본 스토리
export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: '선택해주세요',
    options: defaultOptions,
    multiple: false,
  },
};

// 선택된 값이 있는 상태
export const WithValue: Story = {
  args: {
    modelValue: 'option2',
    placeholder: '선택해주세요',
    options: defaultOptions,
    multiple: false,
  },
};

// 다중 선택
export const Multiple: Story = {
  args: {
    modelValue: [],
    placeholder: '선택해주세요',
    options: defaultOptions,
    multiple: true,
  },
};

// 카테고리 선택
export const CategorySelection: Story = {
  args: {
    modelValue: 'electronics',
    placeholder: '카테고리를 선택하세요',
    options: categoryOptions,
    multiple: false,
  },
};

// 사용자 역할 선택
export const UserRoleSelection: Story = {
  args: {
    modelValue: 'user',
    placeholder: '사용자 역할을 선택하세요',
    options: userOptions,
    multiple: false,
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    modelValue: 'option1',
    placeholder: '선택해주세요',
    options: defaultOptions,
    multiple: false,
    disabled: true,
  },
};

// 읽기 전용
export const Readonly: Story = {
  args: {
    modelValue: 'option3',
    placeholder: '선택해주세요',
    options: defaultOptions,
    multiple: false,
    readonly: true,
  },
};

// 전체 너비
export const FullWidth: Story = {
  args: {
    modelValue: '',
    placeholder: '선택해주세요',
    options: defaultOptions,
    multiple: false,
    fullWidth: true,
  },
};

// 긴 옵션 목록
export const LongOptions: Story = {
  args: {
    modelValue: '',
    placeholder: '도시를 선택하세요',
    options: [
      { value: 'seoul', label: '서울특별시' },
      { value: 'busan', label: '부산광역시' },
      { value: 'daegu', label: '대구광역시' },
      { value: 'incheon', label: '인천광역시' },
      { value: 'gwangju', label: '광주광역시' },
      { value: 'daejeon', label: '대전광역시' },
      { value: 'ulsan', label: '울산광역시' },
      { value: 'sejong', label: '세종특별자치시' },
      { value: 'jeju', label: '제주특별자치도' },
      { value: 'gyeonggi', label: '경기도' },
      { value: 'gangwon', label: '강원도' },
      { value: 'chungbuk', label: '충청북도' },
      { value: 'chungnam', label: '충청남도' },
      { value: 'jeonbuk', label: '전라북도' },
      { value: 'jeonnam', label: '전라남도' },
      { value: 'gyeongbuk', label: '경상북도' },
      { value: 'gyeongnam', label: '경상남도' },
    ],
    multiple: false,
  },
};

// 빈 옵션 목록
export const EmptyOptions: Story = {
  args: {
    modelValue: '',
    placeholder: '선택해주세요',
    options: [],
    multiple: false,
  },
}; 