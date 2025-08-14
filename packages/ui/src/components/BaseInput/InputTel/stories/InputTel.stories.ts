import type { Meta, StoryObj } from '@storybook/vue3';
import InputTel from '../InputTel.vue';

const meta: Meta<typeof InputTel> = {
  title: 'Inputs/InputTel',
  component: InputTel,
  parameters: {
    docs: {
      description: {
        component: `BaseInput을 확장한 전화번호 입력 컴포넌트입니다.\n자동 포맷팅과 국가 코드 표시 기능을 제공하며, 전화번호 유효성 검사를 수행합니다.\nFigma 링크: [Figma 링크](https://www.figma.com/)`,
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
    autoFormat: {
      description: '자동 포맷팅 여부',
      control: 'boolean',
    },
    format: {
      description: '전화번호 포맷',
      control: 'text',
    },
    countryCode: {
      description: '국가 코드 표시 여부',
      control: 'boolean',
    },
    defaultCountry: {
      description: '기본 국가 코드',
      control: 'text',
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
    placeholder: '전화번호를 입력하세요',
    autoFormat: true,
    format: '###-####-####',
    countryCode: false,
    defaultCountry: '+82',
  },
};

// 국가 코드와 함께
export const WithCountryCode: Story = {
  args: {
    modelValue: '010-1234-5678',
    placeholder: '전화번호를 입력하세요',
    autoFormat: true,
    format: '###-####-####',
    countryCode: true,
    defaultCountry: '+82',
  },
};

// 다른 포맷
export const DifferentFormat: Story = {
  args: {
    modelValue: '01012345678',
    placeholder: '전화번호를 입력하세요',
    autoFormat: true,
    format: '###-###-####',
    countryCode: false,
    defaultCountry: '+82',
  },
};

// 자동 포맷팅 없음
export const NoAutoFormat: Story = {
  args: {
    modelValue: '01012345678',
    placeholder: '전화번호를 입력하세요',
    autoFormat: false,
    format: '###-####-####',
    countryCode: false,
    defaultCountry: '+82',
  },
};

// 다른 국가 코드
export const DifferentCountry: Story = {
  args: {
    modelValue: '123-456-7890',
    placeholder: '전화번호를 입력하세요',
    autoFormat: true,
    format: '###-###-####',
    countryCode: true,
    defaultCountry: '+1',
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    modelValue: '010-1234-5678',
    placeholder: '전화번호를 입력하세요',
    autoFormat: true,
    format: '###-####-####',
    countryCode: false,
    defaultCountry: '+82',
    disabled: true,
  },
};

// 읽기 전용
export const Readonly: Story = {
  args: {
    modelValue: '010-1234-5678',
    placeholder: '전화번호를 입력하세요',
    autoFormat: true,
    format: '###-####-####',
    countryCode: false,
    defaultCountry: '+82',
    readonly: true,
  },
};

// 전체 너비
export const FullWidth: Story = {
  args: {
    modelValue: '',
    placeholder: '전화번호를 입력하세요',
    autoFormat: true,
    format: '###-####-####',
    countryCode: false,
    defaultCountry: '+82',
    fullWidth: true,
  },
};

// 유효하지 않은 전화번호
export const InvalidPhoneNumber: Story = {
  args: {
    modelValue: '010-123',
    placeholder: '전화번호를 입력하세요',
    autoFormat: true,
    format: '###-####-####',
    countryCode: false,
    defaultCountry: '+82',
  },
}; 