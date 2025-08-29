import BaseCheckbox from '../../BaseCheckbox/BaseCheckbox.vue';
import BaseFormControlLabel from '../BaseFormControlLabel.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, computed } from 'vue';

const meta: Meta<typeof BaseFormControlLabel> = {
  title: 'Components/Form/BaseFormControlLabel',
  component: BaseFormControlLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
BaseFormControlLabel은 **Headless UI 패턴**을 따르는 컴포넌트입니다.

체크박스와 라벨을 연결하는 순수한 로직만 제공하며, 레이아웃과 스타일링은 사용자가 자유롭게 구성할 수 있습니다.

## 기본 사용법
\`\`\`vue
<!-- 간단한 사용법 - 라벨 클릭 시 체크박스 자동 토글 -->
<BaseFormControlLabel>
  <BaseCheckbox v-model="checked" />
  <span>라벨 텍스트</span>
</BaseFormControlLabel>

<!-- 추가 이벤트가 필요한 경우 -->
<BaseFormControlLabel @toggle="handleToggle">
  <BaseCheckbox v-model="checked" />
  <span>라벨 텍스트</span>
</BaseFormControlLabel>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { BaseFormControlLabel, BaseCheckbox },
    setup() {
      const checked = ref(false);

      return { checked };
    },
    template: `
      <BaseFormControlLabel 
        v-model="checked"
        style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px;"
      >
        <template #default="{ checked: isChecked, toggle }">
          <BaseCheckbox 
            :model-value="isChecked" 
            @update:model-value="toggle" 
          />
          <span style="font-size: 14px; color: #374151;">
            이용약관에 동의합니다 (라벨 클릭가능)
          </span>
        </template>
      </BaseFormControlLabel>
    `,
  }),
};

// 간단한 사용법 테스트
export const SimpleUsage: Story = {
  render: () => ({
    components: { BaseFormControlLabel, BaseCheckbox },
    setup() {
      const agreed = ref(false);

      return { agreed };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 16px;">간단한 사용법 (동일한 v-model)</h3>
          <BaseFormControlLabel 
            v-model="agreed"
            style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 8px; border: 1px dashed #ccc; border-radius: 4px;"
          >
            <BaseCheckbox v-model="agreed" />
            <span style="font-size: 14px; color: #374151;">
              이용약관에 동의합니다
            </span>
          </BaseFormControlLabel>

          <div style="margin-top: 8px; padding: 8px; background: #f8f9fa; border-radius: 4px; font-size: 12px; color: #666;">
            agreed 상태: {{ agreed }}
            <br>
            🧪 체크박스 직접 클릭과 라벨 텍스트 클릭 모두 테스트해보세요!
          </div>
        </div>
      </div>
    `,
  }),
};
