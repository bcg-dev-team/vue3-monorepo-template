import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, onMounted, defineComponent, computed, onUnmounted, watch } from 'vue';
import { getColorTokens, getTypographyTokens, getSpacingTokens } from '../../utils/tokenUtils';
import { useTheme } from '../../composables/useTheme';
import './design-tokens.css';
import '../../styles/_tokens-light.css';
import '../../styles/_tokens-dark.css';

/**
 * 타이포그래피 토큰을 표시하는 컴포넌트
 */
const TypographyToken = defineComponent({
  props: {
    tokenName: { type: String, required: true },
    tokenValue: { type: String, required: true },
    tokenType: { type: String, required: true },
  },
  computed: {
    computedFontSize() {
      return isNaN(Number(this.tokenValue)) ? this.tokenValue : `${this.tokenValue}px`;
    },
    computedLineHeight() {
      return isNaN(Number(this.tokenValue)) ? this.tokenValue : `${this.tokenValue}px`;
    },
    computedLetterSpacing() {
      return isNaN(Number(this.tokenValue)) ? this.tokenValue : `${this.tokenValue}px`;
    },
  },
  template: `
    <div class="typography-token">
      <div class="token-info">
        <div class="token-name">{{ tokenName }}</div>
        <div class="token-value">{{ tokenValue }}</div>
      </div>
      <div 
        v-if="tokenType === 'fontSize'"
        class="typography-preview"
        :style="{ fontSize: computedFontSize, lineHeight: '1.2', fontWeight: '400' }"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
      <div 
        v-else-if="tokenType === 'lineHeight'"
        class="typography-preview"
        :style="{ lineHeight: computedLineHeight, fontSize: '16px', fontWeight: '400', maxHeight: '5.5em', overflow: 'hidden', whiteSpace: 'normal', textOverflow: 'ellipsis' }"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
        Pellentesque euismod, nisi eu consectetur consectetur, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
      </div>
      <div 
        v-else-if="tokenType === 'letterSpacing'"
        class="typography-preview"
        :style="{ letterSpacing: computedLetterSpacing, fontSize: '16px', lineHeight: '1.2', fontWeight: '400' }"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </div>
  `,
});

/**
 * 색상 토큰을 표시하는 컴포넌트
 */
const ColorToken = defineComponent({
  props: {
    colorName: { type: String, required: true },
    colorValue: { type: String, required: true },
  },
  template: `
    <div class="color-token">
      <div 
        class="color-preview" 
        :style="{ backgroundColor: colorValue }"
        :title="colorValue"
      ></div>
      <div class="color-info">
        <div class="color-name">{{ colorName }}</div>
        <div class="color-value">{{ colorValue }}</div>
      </div>
    </div>
  `,
});

/**
 * 간격 토큰을 표시하는 컴포넌트
 */
const SpacingToken = defineComponent({
  props: {
    tokenName: { type: String, required: true },
    tokenValue: { type: String, required: true },
  },
  template: `
    <div class="spacing-token">
      <div class="token-info">
        <div class="token-name">{{ tokenName }}</div>
        <div class="token-value">{{ tokenValue }}</div>
      </div>
      <div 
        class="spacing-preview"
        :style="{ width: tokenValue, height: '20px' }"
      ></div>
    </div>
  `,
});

/**
 * 디자인 토큰을 동적으로 표시하는 메인 컴포넌트
 */
const DesignTokens = defineComponent({
  components: { ColorToken, TypographyToken, SpacingToken },
  setup() {
    const colors = ref<Record<string, Record<string, string>>>({});
    const typography = ref<Record<string, Record<string, string>>>({});
    const spacing = ref<Record<string, string>>({});
    const activeTab = ref('colors');
    const { themeMode, toggleTheme } = useTheme();

    const loadTokens = () => {
      colors.value = getColorTokens();
      typography.value = getTypographyTokens();
      spacing.value = getSpacingTokens();
    };

    // 그룹명을 대문자로 변환하는 함수
    const formatGroupName = (name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    // 테마 변경 시 토큰 다시 로드
    watch(themeMode, () => {
      // CSS 변수가 적용될 시간을 주기 위해 약간의 지연
      setTimeout(loadTokens, 10);
    });

    onMounted(() => {
      loadTokens();
    });

    return {
      colors,
      typography,
      spacing,
      activeTab,
      theme: themeMode,
      toggleTheme,
      formatGroupName,
    };
  },
  template: `
    <div class="design-tokens-container">
      <div class="theme-toggle-bar">
        <button
          class="theme-switch"
          :aria-checked="theme === 'dark'"
          role="switch"
          :title="theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'"
          @click="toggleTheme"
        >
          <div class="theme-switch-track">
            <div class="theme-switch-thumb" :class="{ 'theme-switch-thumb-dark': theme === 'dark' }">
              <span class="theme-switch-icon" v-if="theme === 'light'">☀️</span>
              <span class="theme-switch-icon" v-else>🌙</span>
            </div>
          </div>
        </button>
      </div>
      <div class="tabs">
        <button 
          :class="{ active: activeTab === 'colors' }"
          @click="activeTab = 'colors'"
        >
          색상
        </button>
        <button 
          :class="{ active: activeTab === 'typography' }"
          @click="activeTab = 'typography'"
        >
          타이포그래피
        </button>
        <button 
          :class="{ active: activeTab === 'spacing' }"
          @click="activeTab = 'spacing'"
        >
          간격
        </button>
      </div>
      <div class="content">
        <!-- 색상 토큰 -->
        <div v-if="activeTab === 'colors'" class="colors-section">
          <div v-for="(colorGroup, groupName) in colors" :key="groupName" class="color-group">
            <h3>{{ groupName.charAt(0).toUpperCase() }}{{ groupName.slice(1) }}</h3>
            <div class="color-grid">
              <ColorToken
                v-for="(colorValue, colorName) in colorGroup"
                :key="colorName"
                :color-name="colorName"
                :color-value="colorValue"
              />
            </div>
          </div>
        </div>

        <!-- 타이포그래피 토큰 -->
        <div v-if="activeTab === 'typography'" class="typography-section">
          <div v-for="(typeGroup, typeName) in typography" :key="typeName" class="typography-group">
            <h3>{{ typeName === 'fontSize' ? 'Font Size' : typeName === 'lineHeight' ? 'Line Height' : 'Letter Spacing' }}</h3>
            <div class="typography-grid">
              <TypographyToken
                v-for="(tokenValue, tokenName) in typeGroup"
                :key="tokenName"
                :token-name="tokenName"
                :token-value="tokenValue"
                :token-type="typeName"
              />
            </div>
          </div>
        </div>

        <!-- 간격 토큰 -->
        <div v-if="activeTab === 'spacing'" class="spacing-section">
          <h3>Spacing</h3>
          <div class="spacing-grid">
            <SpacingToken
              v-for="(tokenValue, tokenName) in spacing"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
            />
          </div>
        </div>
      </div>
    </div>
  `,
});

const meta: Meta<typeof DesignTokens> = {
  title: 'Foundations/Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '디자인 시스템의 모든 토큰을 동적으로 표시합니다. CSS 변수가 변경되면 자동으로 반영됩니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
