import type { Meta, StoryObj } from '@storybook/vue3';
import BasePopup from '../BasePopup/BasePopup.vue';
import BaseButton from '../BaseButton/BaseButton.vue';
import { ref } from 'vue';

const meta: Meta<typeof BasePopup> = {
  title: 'Components/BasePopup',
  component: BasePopup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Headless UI Dialog 기반의 재사용 가능한 팝업 컴포넌트입니다. 기본, 확인, 알림 타입을 모두 지원하며 접근성이 완벽하게 구현되어 있습니다.\n\n[Figma 링크](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=1801-17801&m=dev)',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '팝업 열림 상태',
    },
    title: {
      control: 'text',
      description: '팝업 제목',
    },
    description: {
      control: 'text',
      description: '팝업 설명 (접근성용)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '팝업 크기',
    },
    variant: {
      control: 'select',
      options: ['default', 'confirm', 'alert'],
      description: '팝업 타입',
    },
    alertVariant: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: '알림 타입 (variant가 alert일 때만 사용)',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 닫기 여부',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키 클릭 시 닫기 여부',
    },
    showCloseButton: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
    actions: {
      control: 'object',
      description: '팝업 액션 버튼들',
    },
  },
  args: {
    isOpen: false,
    title: '팝업 제목',
    description: '팝업에 대한 설명입니다.',
    size: 'md',
    variant: 'default',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 - Storybook docs에서 기본 형태로 표시됨
export const Default: Story = {
  args: {
    isOpen: false,
    title: '기본 팝업',
    description: '기본 팝업의 설명입니다.',
    variant: 'default',
  },
  render: (args) => ({
    components: { BasePopup, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openPopup = () => { isOpen.value = true; };
      const closePopup = () => { isOpen.value = false; };
      
      return { args, isOpen, openPopup, closePopup };
    },
    template: `
      <div>
        <BaseButton 
          variant="outline"
          size="regular"
          label="기본 팝업 열기"
          @click="openPopup"
          style="color: #3b82f6; border-color: #3b82f6;"
        />
        
        <BasePopup 
          v-bind="args" 
          :is-open="isOpen"
          @close="closePopup"
        >
          <p>기본 팝업의 내용입니다.</p>
        </BasePopup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Headless UI Dialog 기반의 기본 팝업입니다. 제목, 설명, 내용을 포함할 수 있으며 접근성이 완벽하게 구현되어 있습니다. 버튼을 클릭하여 팝업을 열어보세요.',
      },
    },
  },
};

// 기본 팝업 with 컨텐츠
export const DefaultWithContent: Story = {
  args: {
    isOpen: false,
    title: '기본 팝업',
    description: '기본 팝업에 대한 상세한 설명입니다.',
    variant: 'default',
  },
  render: (args) => ({
    components: { BasePopup, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openPopup = () => { isOpen.value = true; };
      const closePopup = () => { isOpen.value = false; };
      
      return { args, isOpen, openPopup, closePopup };
    },
    template: `
      <div>
        <BaseButton 
          variant="outline"
          size="regular"
          label="기본 팝업 열기"
          @click="openPopup"
          style="color: #3b82f6; border-color: #3b82f6;"
        />
        
        <BasePopup 
          v-bind="args" 
          :is-open="isOpen"
          @close="closePopup"
        >
          <p>이것은 기본 팝업의 내용입니다.</p>
          <p>여러 줄의 텍스트를 포함할 수 있습니다.</p>
        </BasePopup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '기본 팝업에 내용이 포함된 예시입니다. Headless UI의 DialogTitle과 DialogDescription을 사용하여 접근성을 향상시켰습니다. 버튼을 클릭하여 팝업을 열어보세요.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    isOpen: false,
    title: '작은 팝업',
    description: '작은 크기의 팝업입니다.',
    size: 'sm',
    variant: 'default',
  },
  render: (args) => ({
    components: { BasePopup, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openPopup = () => { isOpen.value = true; };
      const closePopup = () => { isOpen.value = false; };
      
      return { args, isOpen, openPopup, closePopup };
    },
    template: `
      <div>
        <BaseButton 
          variant="outline"
          size="regular"
          label="작은 팝업 열기"
          @click="openPopup"
          style="color: #3b82f6; border-color: #3b82f6;"
        />
        
        <BasePopup 
          v-bind="args" 
          :is-open="isOpen"
          @close="closePopup"
        >
          <p>작은 크기의 팝업입니다.</p>
        </BasePopup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '작은 크기의 팝업입니다. Headless UI Dialog의 접근성 기능이 모든 크기에서 동일하게 작동합니다. 버튼을 클릭하여 팝업을 열어보세요.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    isOpen: false,
    title: '큰 팝업',
    description: '큰 크기의 팝업으로 더 많은 내용을 포함할 수 있습니다.',
    size: 'lg',
    variant: 'default',
  },
  render: (args) => ({
    components: { BasePopup, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openPopup = () => { isOpen.value = true; };
      const closePopup = () => { isOpen.value = false; };
      
      return { args, isOpen, openPopup, closePopup };
    },
    template: `
      <div>
        <BaseButton 
          variant="outline"
          size="regular"
          label="큰 팝업 열기"
          @click="openPopup"
          style="color: #3b82f6; border-color: #3b82f6;"
        />
        
        <BasePopup 
          v-bind="args" 
          :is-open="isOpen"
          @close="closePopup"
        >
          <p>큰 크기의 팝업입니다.</p>
          <p>더 많은 내용을 포함할 수 있습니다.</p>
          <div style="height: 200px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; margin: 16px 0;">
            스크롤 가능한 영역
          </div>
        </BasePopup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '큰 크기의 팝업입니다. 더 많은 내용을 포함할 수 있으며, Headless UI Dialog의 포커스 트랩핑과 스크롤 락 기능이 완벽하게 작동합니다. 버튼을 클릭하여 팝업을 열어보세요.',
      },
    },
  },
};

export const Confirm: Story = {
  args: {
    isOpen: false,
    title: '확인',
    description: '작업을 확인하는 팝업입니다.',
    variant: 'confirm',
    actions: [
      {
        label: '취소',
        variant: 'outline',
        size: 'regular',
      },
      {
        label: '확인',
        variant: 'primary',
        size: 'regular',
      },
    ],
  },
  render: (args) => ({
    components: { BasePopup, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openPopup = () => { isOpen.value = true; };
      const closePopup = () => { isOpen.value = false; };
      
      return { args, isOpen, openPopup, closePopup };
    },
    template: `
      <div>
        <BaseButton 
          variant="outline"
          size="regular"
          label="확인 팝업 열기"
          @click="openPopup"
          style="color: #3b82f6; border-color: #3b82f6;"
        />
        
        <BasePopup 
          v-bind="args" 
          :is-open="isOpen"
          @close="closePopup"
          @action="(action, index) => { console.log('Action clicked:', action, index); closePopup(); }"
        >
          정말로 이 작업을 수행하시겠습니까?
        </BasePopup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '확인/취소 버튼이 있는 팝업입니다. Headless UI Dialog의 키보드 네비게이션과 포커스 관리 기능이 완벽하게 작동합니다. 버튼을 클릭하여 팝업을 열어보세요.',
      },
    },
  },
};

export const AlertSuccess: Story = {
  args: {
    isOpen: false,
    title: '성공',
    description: '작업이 성공적으로 완료되었습니다.',
    variant: 'alert',
    alertVariant: 'success',
    actions: [
      {
        label: '확인',
        variant: 'green-solid',
        size: 'regular',
      },
    ],
  },
  render: (args) => ({
    components: { BasePopup, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openPopup = () => { isOpen.value = true; };
      const closePopup = () => { isOpen.value = false; };
      
      return { args, isOpen, openPopup, closePopup };
    },
    template: `
      <div>
        <BaseButton 
          variant="outline"
          size="regular"
          label="성공 알림 열기"
          @click="openPopup"
          style="color: #10b981; border-color: #10b981;"
        />
        
        <BasePopup 
          v-bind="args" 
          :is-open="isOpen"
          @close="closePopup"
          @action="(action, index) => { console.log('Action clicked:', action, index); closePopup(); }"
        >
          작업이 성공적으로 완료되었습니다.
        </BasePopup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '성공 알림 팝업입니다. Headless UI Dialog의 접근성 기능과 함께 아이콘과 색상으로 상태를 명확하게 표현합니다. 버튼을 클릭하여 팝업을 열어보세요.',
      },
    },
  },
};

export const AlertError: Story = {
  args: {
    isOpen: false,
    title: '오류',
    description: '작업 중 오류가 발생했습니다.',
    variant: 'alert',
    alertVariant: 'error',
    actions: [
      {
        label: '확인',
        variant: 'red-solid',
        size: 'regular',
      },
    ],
  },
  render: (args) => ({
    components: { BasePopup, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openPopup = () => { isOpen.value = true; };
      const closePopup = () => { isOpen.value = false; };
      
      return { args, isOpen, openPopup, closePopup };
    },
    template: `
      <div>
        <BaseButton 
          variant="outline"
          size="regular"
          label="오류 알림 열기"
          @click="openPopup"
          style="color: #ef4444; border-color: #ef4444;"
        />
        
        <BasePopup 
          v-bind="args" 
          :is-open="isOpen"
          @close="closePopup"
          @action="(action, index) => { console.log('Action clicked:', action, index); closePopup(); }"
        >
          작업 중 오류가 발생했습니다.
        </BasePopup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '오류 알림 팝업입니다. Headless UI Dialog의 접근성 기능과 함께 오류 상태를 명확하게 표현합니다. 버튼을 클릭하여 팝업을 열어보세요.',
      },
    },
  },
};

export const WithCustomFooter: Story = {
  args: {
    isOpen: false,
    title: '커스텀 푸터',
    description: '커스텀 푸터가 있는 팝업입니다.',
    variant: 'default',
  },
  render: (args) => ({
    components: { BasePopup, BaseButton },
    setup() {
      const isOpen = ref(false);
      const openPopup = () => { isOpen.value = true; };
      const closePopup = () => { isOpen.value = false; };
      
      return { args, isOpen, openPopup, closePopup };
    },
    template: `
      <div>
        <BaseButton 
          variant="outline"
          size="regular"
          label="커스텀 푸터 팝업 열기"
          @click="openPopup"
          style="color: #3b82f6; border-color: #3b82f6;"
        />
        
        <BasePopup 
          v-bind="args" 
          :is-open="isOpen"
          @close="closePopup"
        >
          <p>커스텀 푸터가 있는 팝업입니다.</p>
          <template #footer>
            <BaseButton 
              variant="outline"
              size="regular"
              label="취소"
              style="margin-right: 8px; color: #6b7280; border-color: #6b7280;"
            />
            <BaseButton 
              variant="primary"
              size="regular"
              label="확인"
            />
          </template>
        </BasePopup>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '커스텀 푸터가 있는 팝업입니다. Headless UI Dialog의 구조를 활용하면서도 유연한 커스터마이징이 가능합니다. 버튼을 클릭하여 팝업을 열어보세요.',
      },
    },
  },
}; 