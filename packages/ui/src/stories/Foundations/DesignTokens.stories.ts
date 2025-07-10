import type { Meta, StoryObj } from '@storybook/vue3';
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { getColorTokens, getTypographyTokens, getSpacingTokens } from '@template/theme';
import '@template/theme/styles/_tokens-light.css';
import '@template/theme/styles/_tokens-dark.css';
import './design-tokens.css';

/**
 * 타이포그래피 토큰을 표시하는 컴포넌트
 */
const TypographyToken = defineComponent({
  props: {
    tokenName: { type: String, required: true },
    tokenValue: { type: String, required: true },
    tokenType: { type: String, required: true },
  },
  setup(props) {
    const computedFontSize = computed(() => {
      if (props.tokenType === 'fontSize') {
        return props.tokenValue;
      }
      return '16px';
    });

    const computedLineHeight = computed(() => {
      if (props.tokenType === 'lineHeight') {
        return props.tokenValue;
      }
      return '1.5';
    });

    const computedLetterSpacing = computed(() => {
      if (props.tokenType === 'letterSpacing') {
        return props.tokenValue;
      }
      return 'normal';
    });

    return {
      computedFontSize,
      computedLineHeight,
      computedLetterSpacing,
    };
  },
  template: `
    <div class="typography-token">
      <div class="token-info">
        <div class="token-name">{{ tokenName }}</div>
        <div class="token-value">{{ tokenValue }}</div>
      </div>
      <div 
        class="typography-preview"
        :style="{
          fontSize: computedFontSize,
          lineHeight: computedLineHeight,
          letterSpacing: computedLetterSpacing,
        }"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
  name: 'DesignTokens',
  components: { ColorToken, TypographyToken, SpacingToken },
  setup() {
    const colors = ref<Record<string, Record<string, string>>>({});
    const typography = ref<Record<string, Record<string, string>>>({});
    const spacing = ref<Record<string, string>>({});
    const activeTab = ref('colors');
    const isDark = ref(false);

    const loadTokens = () => {
      console.log('Loading tokens...');
      const colorTokens = getColorTokens();
      const typographyTokens = getTypographyTokens();
      const spacingTokens = getSpacingTokens();

      console.log('Color tokens:', colorTokens);
      console.log('Typography tokens:', typographyTokens);
      console.log('Spacing tokens:', spacingTokens);

      colors.value = colorTokens;
      typography.value = typographyTokens;
      spacing.value = spacingTokens;
    };

    // 그룹명을 대문자로 변환하는 함수
    const formatGroupName = (name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    // 테마 토글 함수
    const toggleTheme = () => {
      isDark.value = !isDark.value;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
      }
      // CSS 변수가 적용될 시간을 주기 위해 약간의 지연
      setTimeout(loadTokens, 10);
    };

    // 테마 변경 시 토큰 다시 로드
    watch(isDark, () => {
      // CSS 변수가 적용될 시간을 주기 위해 약간의 지연
      setTimeout(loadTokens, 10);
    });

    onMounted(() => {
      // 초기 테마 설정
      if (typeof document !== 'undefined') {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        isDark.value = currentTheme === 'dark';

        // data-theme이 설정되지 않은 경우 기본값으로 'light' 설정
        if (!currentTheme) {
          document.documentElement.setAttribute('data-theme', 'light');
          isDark.value = false;
        }
      }

      // CSS 변수가 적용될 시간을 주기 위해 약간의 지연
      setTimeout(() => {
        loadTokens();
      }, 50);
    });

    const theme = computed(() => (isDark.value ? 'dark' : 'light'));

    return {
      colors,
      typography,
      spacing,
      activeTab,
      theme,
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
            <h3>{{ formatGroupName(groupName) }}</h3>
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
  decorators: [
    (story: any) => ({
      components: { story },
      template: '<story />',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
