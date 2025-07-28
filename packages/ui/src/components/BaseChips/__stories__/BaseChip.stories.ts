import type { Meta, StoryObj } from '@storybook/vue3';
import BaseChip from '../BaseChip.vue';

const meta: Meta<typeof BaseChip> = {
  title: 'Chips/Chip',
  component: BaseChip,
  parameters: {
    docs: {
      description: {
        component: '하이브리드 방식의 칩 컴포넌트입니다. 기본 variant와 커스텀 색상을 모두 지원하며, backgroundColor만 입력 시 기본 색상 규칙이 적용됩니다. 피그마 디자인 토큰을 기반으로 구현되었습니다.'
      }
    }
  },
  argTypes: {
    label: {
      description: '칩 텍스트',
      control: 'text'
    },
    variant: {
      description: '기본 스타일 변형',
      control: 'select',
      options: ['surface', 'primary']
    },
    size: {
      description: '칩 크기',
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    rounded: {
      description: '테두리 둥글기',
      control: 'select',
      options: ['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full']
    },
    fontWeight: {
      description: '폰트 굵기',
      control: 'select',
      options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold']
    },
    backgroundColor: {
      description: '커스텀 배경색 (CSS 변수 또는 HEX)',
      control: 'text'
    },
    textColor: {
      description: '커스텀 텍스트색 (CSS 변수 또는 HEX)',
      control: 'text'
    },
    borderColor: {
      description: '커스텀 테두리색 (CSS 변수 또는 HEX)',
      control: 'text'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 variant 스토리들
export const Default: Story = {
  args: {
    label: '기본 칩',
    variant: 'surface',
    size: 'md'
  }
};

export const Surface: Story = {
  args: {
    label: 'Surface',
    variant: 'surface',
    size: 'md'
  }
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
    size: 'md'
  }
};



// 크기별 스토리들
export const Small: Story = {
  args: {
    label: 'Small',
    variant: 'surface',
    size: 'sm'
  }
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    variant: 'surface',
    size: 'md'
  }
};

export const Large: Story = {
  args: {
    label: 'Large',
    variant: 'surface',
    size: 'lg'
  }
};

// 커스텀 색상 스토리들
export const CustomColors: Story = {
  args: {
    label: '커스텀 색상',
    backgroundColor: '#f1f9f3',
    textColor: '#00a22f',
    size: 'md'
  }
};

export const BackgroundColorOnly: Story = {
  args: {
    label: '배경색만 지정',
    backgroundColor: '#e8f0fa',
    size: 'md'
  }
};

// 비즈니스 케이스별 스토리들
export const QnaChips: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseChip 
          label="답변준비중" 
          backgroundColor="#eaecee"
          textColor="#717375"
          size="md"
        />
        <BaseChip 
          label="답변완료" 
          backgroundColor="rgba(255,94,104,0.2)"
          textColor="#ff544a"
          size="md"
        />
      </div>
    `
  })
};

export const UpdownChips: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseChip 
          label="+0.03%" 
          backgroundColor="#fff1f2"
          textColor="#f63338"
          size="sm"
        />
        <BaseChip 
          label="-1.15%" 
          backgroundColor="#e8f0fa"
          textColor="#0067ef"
          size="sm"
        />
      </div>
    `
  })
};

export const NoticeChips: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseChip 
          label="업무공지" 
          backgroundColor="#eaecee"
          textColor="#5a5c5e"
          size="lg"
        />
      </div>
    `
  })
};

export const PositionChips: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseChip 
          label="LONG" 
          backgroundColor="#fff1f2"
          textColor="#f63338"
          size="md"
        />
        <BaseChip 
          label="SHORT" 
          backgroundColor="#e8f0fa"
          textColor="#0067ef"
          size="md"
        />
      </div>
    `
  })
};

export const StatusChips: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseChip 
          label="완료" 
          backgroundColor="#f1f9f3"
          textColor="#00a22f"
          size="md"
        />
        <BaseChip 
          label="대기중" 
          backgroundColor="#fffbe8"
          textColor="#de8100"
          size="md"
        />
      </div>
    `
  })
};

export const WithdrawChips: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseChip 
          label="이체" 
          backgroundColor="#f9f3ff"
          textColor="#892fe9"
          size="md"
        />
        <BaseChip 
          label="출금" 
          backgroundColor="#e8f0fa"
          textColor="#0067ef"
          size="md"
        />
      </div>
    `
  })
};

// 모든 크기 비교
export const AllSizes: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <BaseChip label="Small" variant="surface" size="sm" />
        <BaseChip label="Medium" variant="surface" size="md" />
        <BaseChip label="Large" variant="surface" size="lg" />
      </div>
    `
  })
};

// 폰트 굵기 비교
export const FontWeights: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseChip label="Normal" variant="surface" size="md" fontWeight="font-normal" />
        <BaseChip label="Medium" variant="surface" size="md" fontWeight="font-medium" />
        <BaseChip label="Semibold" variant="surface" size="md" fontWeight="font-semibold" />
        <BaseChip label="Bold" variant="surface" size="md" fontWeight="font-bold" />
      </div>
    `
  })
};

// 테두리 둥글기 비교
export const BorderRadius: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <BaseChip label="Small" variant="surface" size="md" rounded="rounded-sm" />
        <BaseChip label="Medium" variant="surface" size="md" rounded="rounded-md" />
        <BaseChip label="Large" variant="surface" size="md" rounded="rounded-lg" />
        <BaseChip label="Full" variant="surface" size="md" rounded="rounded-full" />
      </div>
    `
  })
}; 