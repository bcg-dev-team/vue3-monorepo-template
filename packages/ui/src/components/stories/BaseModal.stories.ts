import BaseButton from '../BaseButton/BaseButton.vue';
import BaseButton from '../BaseButton/BaseButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseModal from '../BaseModal/BaseModal.vue';
<<<<<<< HEAD
import { ref } from 'vue';
=======
import BaseButton from '../BaseButton/BaseButton.vue';
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)

const meta: Meta<typeof BaseModal> = {
  title: 'Components/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
<<<<<<< HEAD
        component:
          'Headless UI Dialog 기반의 재사용 가능한 모달 컴포넌트입니다. 기본, 확인, 알림 타입을 모두 지원하며 접근성이 완벽하게 구현되어 있습니다.\n\n[Figma 링크](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1801-17801&m=dev)',
=======
        component: '기본 모달 컴포넌트입니다. 헤더, 컨텐츠, 푸터 영역을 포함하며 다양한 스타일과 기능을 지원합니다.',
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
      },
    },
  },
  argTypes: {
    isOpen: {
      description: '모달 열림/닫힘 상태',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    title: {
      description: '모달 제목',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    description: {
      description: '모달 설명',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    variant: {
      description: '모달 스타일 변형',
      control: { type: 'select' },
      options: ['default', 'alert'],
      table: {
        type: { summary: 'default | alert' },
        defaultValue: { summary: 'default' },
        category: 'Props',
      },
    },
    size: {
      description: '모달 크기',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        type: { summary: 'sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    showCloseButton: {
      description: '닫기 버튼 표시 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    showBackButton: {
      description: '뒤로가기 버튼 표시 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    fullWidth: {
      description: '버튼을 fullwidth로 표시할지 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },

  },
  args: {
    isOpen: false,
    title: '모달 제목',
    description: '모달 설명입니다.',
    variant: 'default',
    size: 'md',
    showCloseButton: true,
    showBackButton: false,
    fullWidth: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 모달 스토리
 * 가장 기본적인 모달 형태를 보여줍니다.
 */
export const Default: Story = {
  args: {
    isOpen: false,
    title: '기본 모달',
    description: '이것은 기본 모달입니다.',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
<<<<<<< HEAD
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };

      return { args, isOpen, openModal, closeModal };
=======
      return { args };
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
    },
    template: `
      <div>
        <BaseButton 
          label="기본 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event" />
      </div>
    `,
  }),
<<<<<<< HEAD
  parameters: {
    docs: {
      description: {
        story:
          'Headless UI Dialog 기반의 기본 모달입니다. 제목, 설명, 내용을 포함할 수 있으며 접근성이 완벽하게 구현되어 있습니다. 버튼을 클릭하여 모달을 열어보세요.',
      },
    },
  },
=======
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
};

/**
 * 기본 Footer가 있는 모달
 * 기본 제공되는 취소/확인 버튼을 사용합니다.
 */
export const WithDefaultFooter: Story = {
  args: {
    isOpen: false,
    title: '기본 Footer 모달',
    description: '기본 제공되는 취소/확인 버튼을 사용합니다.',
    showDefaultFooter: true,
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
<<<<<<< HEAD
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };

      return { args, isOpen, openModal, closeModal };
=======
      return { args };
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
    },
    template: `
      <div>
        <BaseButton 
          label="기본 Footer 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event" />
      </div>
    `,
  }),
<<<<<<< HEAD
  parameters: {
    docs: {
      description: {
        story:
          '기본 모달에 내용이 포함된 예시입니다. Headless UI의 DialogTitle과 DialogDescription을 사용하여 접근성을 향상시켰습니다. 버튼을 클릭하여 모달을 열어보세요.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    isOpen: false,
    title: '작은 모달',
    description: '작은 크기의 모달입니다.',
    size: 'sm',
    variant: 'default',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };

      return { args, isOpen, openModal, closeModal };
    },
    template: `
      <div>
        <BaseButton 
          variant="contained"
          size="md"
          label="작은 모달 열기"
          @click="openModal"
        />
        
        <BaseModal 
          v-bind="args" 
          :is-open="isOpen"
          @close="closeModal"
        >
          <p>작은 크기의 모달입니다.</p>
        </BaseModal>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '작은 크기의 모달입니다. Headless UI Dialog의 접근성 기능이 모든 크기에서 동일하게 작동합니다. 버튼을 클릭하여 모달을 열어보세요.',
      },
    },
  },
=======
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
};

/**
 * Large 크기 모달
 * 더 큰 크기의 모달을 보여줍니다.
 */
export const Large: Story = {
  args: {
    isOpen: false,
    title: 'Large 모달',
    description: '더 큰 크기의 모달입니다.',
    size: 'lg',
    showDefaultFooter: true,
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
<<<<<<< HEAD
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };

      return { args, isOpen, openModal, closeModal };
=======
      return { args };
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
    },
    template: `
      <div>
        <BaseButton 
          label="Large 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div style="padding: 20px;">
            <p>이것은 Large 크기의 모달입니다. 더 많은 컨텐츠를 표시할 수 있습니다.</p>
            <p>긴 텍스트나 복잡한 폼 요소들을 포함할 수 있습니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
<<<<<<< HEAD
  parameters: {
    docs: {
      description: {
        story:
          '큰 크기의 모달입니다. 더 많은 내용을 포함할 수 있으며, Headless UI Dialog의 포커스 트랩핑과 스크롤 락 기능이 완벽하게 작동합니다. 버튼을 클릭하여 모달을 열어보세요.',
      },
    },
  },
=======
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
};

/**
 * Alert 스타일 모달
 * 경고나 알림을 위한 모달입니다.
 */
export const Alert: Story = {
  args: {
    isOpen: false,
<<<<<<< HEAD
    title: '확인',
    description: '작업을 확인하는 모달입니다.',
    variant: 'confirm',
    actions: [
      {
        label: '취소',
        variant: 'outlined',
        size: 'md',
      },
      {
        label: '확인',
        variant: 'contained',
        size: 'md',
      },
    ],
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };

      return { args, isOpen, openModal, closeModal };
    },
    template: `
      <div>
        <BaseButton 
          variant="contained"
          size="md"
          label="확인 모달 열기"
          @click="openModal"
        />
        
        <BaseModal 
          v-bind="args" 
          :is-open="isOpen"
          @close="closeModal"
          @action="(action, index) => { console.log('Action clicked:', action, index); closeModal(); }"
        >
          정말로 이 작업을 수행하시겠습니까?
        </BaseModal>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '확인/취소 버튼이 있는 모달입니다. Headless UI Dialog의 키보드 네비게이션과 포커스 관리 기능이 완벽하게 작동합니다. 버튼을 클릭하여 모달을 열어보세요.',
      },
    },
  },
};

export const AlertSuccess: Story = {
  args: {
    isOpen: false,
    title: '성공',
    description: '작업이 성공적으로 완료되었습니다.',
=======
    title: '경고',
    description: '이 작업을 계속 진행하시겠습니까?',
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
    variant: 'alert',
    size: 'sm',
    showDefaultFooter: true,
    confirmText: '계속',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
<<<<<<< HEAD
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };

      return { args, isOpen, openModal, closeModal };
=======
      return { args };
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
    },
    template: `
      <div>
        <BaseButton 
          label="Alert 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div style="padding: 20px; text-align: center;">
            <p style="color: #d32f2f; font-weight: 500;">⚠️ 주의: 이 작업은 되돌릴 수 없습니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
<<<<<<< HEAD
  parameters: {
    docs: {
      description: {
        story:
          '성공 알림 모달입니다. Headless UI Dialog의 접근성 기능과 함께 아이콘과 색상으로 상태를 명확하게 표현합니다. 버튼을 클릭하여 모달을 열어보세요.',
      },
    },
  },
=======
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
};

/**
 * Back Button이 있는 모달
 * 뒤로가기 기능이 있는 모달입니다.
 */
export const WithBackButton: Story = {
  args: {
    isOpen: false,
    title: '단계별 설정',
    description: '두 번째 단계입니다.',
    showBackButton: true,
    showDefaultFooter: true,
    cancelText: '이전',
    confirmText: '다음',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
<<<<<<< HEAD
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };

      return { args, isOpen, openModal, closeModal };
=======
      return { args };
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
    },
    template: `
      <div>
        <BaseButton 
          label="Back Button 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div style="padding: 20px;">
            <p>현재 단계: 2/3</p>
            <p>이전 단계로 돌아가거나 다음 단계로 진행할 수 있습니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
<<<<<<< HEAD
  parameters: {
    docs: {
      description: {
        story:
          '오류 알림 모달입니다. Headless UI Dialog의 접근성 기능과 함께 오류 상태를 명확하게 표현합니다. 버튼을 클릭하여 모달을 열어보세요.',
      },
    },
  },
=======
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
};

/**
 * 커스텀 헤더 액션이 있는 모달
 * 헤더에 추가 액션 버튼이 있는 모달입니다.
 */
export const WithCustomHeaderActions: Story = {
  args: {
    isOpen: false,
    title: '문서 편집',
    description: '문서를 편집하고 있습니다.',
    showDefaultFooter: true,
    confirmText: '완료',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
<<<<<<< HEAD
      const isOpen = ref(false);
      const openModal = () => {
        isOpen.value = true;
      };
      const closeModal = () => {
        isOpen.value = false;
      };

      return { args, isOpen, openModal, closeModal };
=======
      return { args };
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
    },
    template: `
      <div>
        <BaseButton 
          label="커스텀 헤더 액션 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <template #actions>
            <div style="display: flex; gap: 8px;">
              <button 
                type="button" 
                style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
                @click="alert('저장되었습니다')"
              >
                저장
              </button>
              <button 
                type="button" 
                style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
                @click="alert('미리보기가 열렸습니다')"
              >
                미리보기
              </button>
            </div>
          </template>
          <div style="padding: 20px;">
            <p>문서 편집 모드입니다. 헤더에 추가 액션 버튼들이 표시됩니다.</p>
            <textarea 
              style="width: 100%; height: 100px; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
              placeholder="여기에 텍스트를 입력하세요..."
            ></textarea>
          </div>
        </BaseModal>
      </div>
    `,
  }),
<<<<<<< HEAD
  parameters: {
    docs: {
      description: {
        story:
          '커스텀 푸터가 있는 모달입니다. Headless UI Dialog의 구조를 활용하면서도 유연한 커스터마이징이 가능합니다. 버튼을 클릭하여 모달을 열어보세요.',
      },
    },
  },
};
=======
};

/**
 * XL 크기 모달
 * 가장 큰 크기의 모달을 보여줍니다.
 */
export const ExtraLarge: Story = {
  args: {
    isOpen: false,
    title: '대시보드 설정',
    description: '대시보드의 레이아웃과 위젯을 구성합니다.',
    size: 'xl',
    showDefaultFooter: true,
    cancelText: '기본값으로 복원',
    confirmText: '적용',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <BaseButton 
          label="XL 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div style="padding: 20px;">
            <h3 style="margin-bottom: 16px;">레이아웃 구성</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h4>왼쪽 패널</h4>
                <p>차트와 그래프를 배치할 수 있습니다.</p>
                <div style="height: 120px; border: 2px dashed #ccc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                  차트 영역
                </div>
              </div>
              <div>
                <h4>오른쪽 패널</h4>
                <p>통계와 요약 정보를 표시합니다.</p>
                <div style="height: 120px; border: 2px dashed #ccc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                  통계 영역
                </div>
              </div>
            </div>
          </div>
        </BaseModal>
      </div>
    `,
  }),
}; 
>>>>>>> 233c482 (feat(packages/ui): BaseModal 컴포넌트 구현)
