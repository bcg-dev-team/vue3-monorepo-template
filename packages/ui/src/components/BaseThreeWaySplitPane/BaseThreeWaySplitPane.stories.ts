import BaseThreeWaySplitPane from './BaseThreeWaySplitPane.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/**
 * BaseThreeWaySplitPane 컴포넌트
 *
 * 세 개의 패널을 가진 분할 패널 컴포넌트입니다.
 * 좌측, 중앙, 우측 패널을 독립적으로 조절할 수 있으며,
 * 반응형 브레이크포인트에 따라 자동으로 패널을 접을 수 있습니다.
 *
 * Figma 링크: [Figma 컴포넌트 링크 추가 필요]
 */
const meta: Meta<typeof BaseThreeWaySplitPane> = {
  title: 'Layout/ThreeWaySplitPane',
  component: BaseThreeWaySplitPane,
  parameters: {
    docs: {
      description: {
        component: '세 개의 패널을 가진 분할 패널 컴포넌트로, 수평/수직 방향을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: '분할 방향 (수평/수직)',
    },
    minSizes: {
      control: { type: 'object' },
      description: '좌측/우측 패널의 최소 크기 (%)',
    },
    maxSizes: {
      control: { type: 'object' },
      description: '좌측/우측 패널의 최대 크기 (%)',
    },
    breakpoint: {
      control: { type: 'number' },
      description: '반응형 브레이크포인트 (px)',
    },
  },
  args: {
    direction: 'horizontal',
    minSizes: { left: 10, right: 10 },
    maxSizes: { left: 80, right: 80 },
    breakpoint: 768,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 수평 분할 패널
 */
export const Default: Story = {
  args: {
    direction: 'horizontal',
  },
  render: (args) => ({
    components: { BaseThreeWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseThreeWaySplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>좌측 패널</h3>
              <p>이 패널은 접을 수 있습니다.</p>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%;">
              <h3>중앙 패널</h3>
              <p>메인 콘텐츠가 들어갑니다.</p>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%;">
              <h3>우측 패널</h3>
              <p>이 패널도 접을 수 있습니다.</p>
            </div>
          </template>
        </BaseThreeWaySplitPane>
      </div>
    `,
  }),
};

/**
 * 수직 분할 패널
 */
export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: (args) => ({
    components: { BaseThreeWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseThreeWaySplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>상단 패널</h3>
              <p>상단 콘텐츠 영역입니다.</p>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%;">
              <h3>중앙 패널</h3>
              <p>메인 콘텐츠가 들어갑니다.</p>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%;">
              <h3>하단 패널</h3>
              <p>하단 콘텐츠 영역입니다.</p>
            </div>
          </template>
        </BaseThreeWaySplitPane>
      </div>
    `,
  }),
};

/**
 * 커스텀 크기 제한
 */
export const CustomSizes: Story = {
  args: {
    direction: 'horizontal',
    minSizes: { left: 15, right: 20 },
    maxSizes: { left: 60, right: 50 },
  },
  render: (args) => ({
    components: { BaseThreeWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseThreeWaySplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>좌측 패널</h3>
              <p>최소 15%, 최대 60%</p>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%;">
              <h3>중앙 패널</h3>
              <p>유연한 크기</p>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%;">
              <h3>우측 패널</h3>
              <p>최소 20%, 최대 50%</p>
            </div>
          </template>
        </BaseThreeWaySplitPane>
      </div>
    `,
  }),
};

/**
 * 반응형 브레이크포인트 테스트
 */
export const ResponsiveBreakpoint: Story = {
  args: {
    direction: 'horizontal',
    breakpoint: 1200,
  },
  render: (args) => ({
    components: { BaseThreeWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <div style="position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ccc;">
          <strong>브레이크포인트:</strong> {{ args.breakpoint }}px
          <br>
          <small>화면 너비가 이 값보다 작으면 좌측 패널이 자동으로 접힙니다.</small>
        </div>
        <BaseThreeWaySplitPane v-bind="args" style="padding-top: 80px;">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>좌측 패널</h3>
              <p>반응형으로 접힘</p>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%;">
              <h3>중앙 패널</h3>
              <p>메인 콘텐츠</p>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%;">
              <h3>우측 패널</h3>
              <p>고정 패널</p>
            </div>
          </template>
        </BaseThreeWaySplitPane>
      </div>
    `,
  }),
};

/**
 * 라우팅 예제 - 대시보드 레이아웃
 */
export const DashboardLayout: Story = {
  args: {
    direction: 'horizontal',
    minSizes: { left: 15, right: 20 },
    maxSizes: { left: 35, right: 40 },
  },
  render: (args) => ({
    components: { BaseThreeWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <div style="position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ccc;">
          <strong>대시보드 레이아웃 예제</strong>
          <br>
          <small>각 패널이 다른 페이지/컴포넌트를 표시하는 라우팅 예제</small>
        </div>
        <BaseThreeWaySplitPane v-bind="args" style="padding-top: 80px;">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>📱 네비게이션 메뉴</h3>
              <nav style="margin-top: 20px;">
                <div style="margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 6px; cursor: pointer;">
                  🏠 대시보드
                </div>
                <div style="margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 6px; cursor: pointer;">
                  👥 사용자 관리
                </div>
                <div style="margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 6px; cursor: pointer;">
                  📊 분석
                </div>
                <div style="margin-bottom: 15px; padding: 10px; background: #fff; border-radius: 6px; cursor: pointer;">
                  ⚙️ 설정
                </div>
              </nav>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>📊 메인 대시보드</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center;">
                  <h4>총 사용자</h4>
                  <div style="font-size: 2em; color: #2196f3;">1,234</div>
                </div>
                <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center;">
                  <h4>활성 사용자</h4>
                  <div style="font-size: 2em; color: #4caf50;">892</div>
                </div>
                <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center;">
                  <h4>월간 수익</h4>
                  <div style="font-size: 2em; color: #ff9800;">$45,678</div>
                </div>
                <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center;">
                  <h4>신규 주문</h4>
                  <div style="font-size: 2em; color: #f44336;">156</div>
                </div>
              </div>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>🔔 알림 & 상태</h3>
              <div style="margin-top: 20px;">
                <div style="background: #fff; padding: 15px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #4caf50;">
                  <strong>시스템 정상</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">모든 서비스가 정상 작동 중입니다.</p>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #ff9800;">
                  <strong>업데이트 필요</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">새로운 버전이 사용 가능합니다.</p>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #2196f3;">
                  <strong>새 메시지</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">3개의 새로운 메시지가 있습니다.</p>
                </div>
              </div>
            </div>
          </template>
        </BaseThreeWaySplitPane>
      </div>
    `,
  }),
};

/**
 * 라우팅 예제 - 코드 에디터 레이아웃
 */
export const CodeEditorLayout: Story = {
  args: {
    direction: 'horizontal',
    minSizes: { left: 20, right: 25 },
    maxSizes: { left: 50, right: 45 },
  },
  render: (args) => ({
    components: { BaseThreeWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <div style="position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ccc;">
          <strong>코드 에디터 레이아웃 예제</strong>
          <br>
          <small>VS Code와 유사한 개발 환경 레이아웃</small>
        </div>
        <BaseThreeWaySplitPane v-bind="args" style="padding-top: 80px;">
          <template #left>
            <div style="background: #1e1e1e; color: #fff; padding: 20px; height: 100%; overflow-y: auto;">
              <h3 style="color: #fff; margin-bottom: 20px;">📁 파일 탐색기</h3>
              <div style="font-family: monospace; font-size: 14px;">
                <div style="margin-bottom: 8px; cursor: pointer;">📁 src/</div>
                <div style="margin-left: 20px; margin-bottom: 8px; cursor: pointer;">📁 components/</div>
                <div style="margin-left: 40px; margin-bottom: 8px; cursor: pointer;">📄 Button.vue</div>
                <div style="margin-left: 40px; margin-bottom: 8px; cursor: pointer;">📄 Input.vue</div>
                <div style="margin-left: 20px; margin-bottom: 8px; cursor: pointer;">📁 utils/</div>
                <div style="margin-left: 40px; margin-bottom: 8px; cursor: pointer;">📄 helpers.ts</div>
                <div style="margin-left: 20px; margin-bottom: 8px; cursor: pointer;">📄 main.ts</div>
              </div>
            </div>
          </template>
          <template #center>
            <div style="background: #1e1e1e; color: #fff; padding: 20px; height: 100%; overflow-y: auto;">
              <h3 style="color: #fff; margin-bottom: 20px;">📝 코드 에디터</h3>
              <div style="font-family: monospace; font-size: 14px; line-height: 1.5;">
                <div style="color: #569cd6;">import</div>
                <div style="color: #fff;">{</div>
                <div style="color: #fff; margin-left: 20px;">ref,</div>
                <div style="color: #fff; margin-left: 20px;">computed</div>
                <div style="color: #fff;">}</div>
                <div style="color: #569cd6;">from</div>
                <div style="color: #ce9178;">'vue'</div>
                <div style="margin-top: 10px;"></div>
                <div style="color: #569cd6;">export default</div>
                <div style="color: #569cd6;">function</div>
                <div style="color: #dcdcaa;">useCounter</div>
                <div style="color: #fff;">() {</div>
                <div style="color: #569cd6;">const</div>
                <div style="color: #9cdcfe;">count</div>
                <div style="color: #fff;">=</div>
                <div style="color: #b5cea8;">ref</div>
                <div style="color: #fff;">(</div>
                <div style="color: #b5cea8;">0</div>
                <div style="color: #fff;">)</div>
                <div style="margin-top: 10px;"></div>
                <div style="color: #569cd6;">return</div>
                <div style="color: #fff;">{</div>
                <div style="color: #fff; margin-left: 20px;">count</div>
                <div style="color: #fff;">}</div>
                <div style="color: #fff;">}</div>
              </div>
            </div>
          </template>
          <template #right>
            <div style="background: #1e1e1e; color: #fff; padding: 20px; height: 100%; overflow-y: auto;">
              <h3 style="color: #fff; margin-bottom: 20px;">🐛 디버그 콘솔</h3>
              <div style="font-family: monospace; font-size: 12px; line-height: 1.4;">
                <div style="color: #6a9955;">// 컴파일 완료</div>
                <div style="color: #6a9955;">// TypeScript 검사 완료</div>
                <div style="margin-top: 10px;"></div>
                <div style="color: #fff;">[INFO]</div>
                <div style="color: #fff; margin-left: 10px;">개발 서버 시작됨</div>
                <div style="color: #fff;">[INFO]</div>
                <div style="color: #fff; margin-left: 10px;">포트 3000에서 실행 중</div>
                <div style="margin-top: 10px;"></div>
                <div style="color: #ff6b6b;">[ERROR]</div>
                <div style="color: #ff6b6b; margin-left: 10px;">컴포넌트 로드 실패</div>
                <div style="color: #ff6b6b; margin-left: 10px;">Button.vue:15</div>
              </div>
            </div>
          </template>
        </BaseThreeWaySplitPane>
      </div>
    `,
  }),
};
