import BaseTwoWaySplitPane from './BaseTwoWaySplitPane.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/**
 * BaseTwoWaySplitPane 컴포넌트
 *
 * 두 개의 패널을 가진 분할 패널 컴포넌트입니다.
 * splitpanes 라이브러리를 기반으로 하며, 수평/수직 방향을 지원합니다.
 *
 * Figma 링크: [Figma 컴포넌트 링크 추가 필요]
 */
const meta: Meta<typeof BaseTwoWaySplitPane> = {
  title: 'Layout/BaseTwoWaySplitPane',
  component: BaseTwoWaySplitPane,
  parameters: {
    docs: {
      description: {
        component: '두 개의 패널을 가진 분할 패널 컴포넌트로, 수평/수직 방향을 지원합니다.',
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
      description: '첫 번째/두 번째 패널의 최소 크기 (%)',
    },
    maxSizes: {
      control: { type: 'object' },
      description: '첫 번째/두 번째 패널의 최대 크기 (%)',
    },
    pushOtherPanes: {
      control: { type: 'boolean' },
      description: '다른 패널을 밀어내는지 여부',
    },
  },
  args: {
    direction: 'horizontal',
    minSizes: { first: 20, second: 20 },
    maxSizes: { first: 80, second: 80 },
    pushOtherPanes: false,
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
    components: { BaseTwoWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div class="BaseTwoWaySplitPane-stories" style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseTwoWaySplitPane v-bind="args">
          <template #first>
            <div class="pane-content first-pane">
              <span>1</span>
              <em class="specs">첫 번째 패널</em>
            </div>
          </template>
          <template #second>
            <div class="pane-content second-pane">
              <span>2</span>
              <em class="specs">두 번째 패널</em>
            </div>
          </template>
        </BaseTwoWaySplitPane>
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
    components: { BaseTwoWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div class="BaseTwoWaySplitPane-stories" style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseTwoWaySplitPane v-bind="args">
          <template #first>
            <div class="pane-content first-pane">
              <span>상단</span>
              <em class="specs">상단 패널</em>
            </div>
          </template>
          <template #second>
            <div class="pane-content second-pane">
              <span>하단</span>
              <em class="specs">하단 패널</em>
            </div>
          </template>
        </BaseTwoWaySplitPane>
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
    minSizes: { first: 25, second: 30 },
    maxSizes: { first: 70, second: 60 },
  },
  render: (args) => ({
    components: { BaseTwoWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div class="BaseTwoWaySplitPane-stories" style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseTwoWaySplitPane v-bind="args">
          <template #first>
            <div class="pane-content first-pane">
              <span>좌측</span>
              <em class="specs">최소 25%, 최대 70%</em>
            </div>
          </template>
          <template #second>
            <div class="pane-content second-pane">
              <span>우측</span>
              <em class="specs">최소 30%, 최대 60%</em>
            </div>
          </template>
        </BaseTwoWaySplitPane>
      </div>
    `,
  }),
};

/**
 * 3개 패널 분할 예제 (중첩 사용)
 */
export const ThreePanes: Story = {
  args: {
    direction: 'horizontal',
    minSizes: { first: 300, second: 60 },
    maxSizes: { first: 500, second: 80 },
    pushOtherPanes: false,
  },
  render: (args) => ({
    components: { BaseTwoWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div class="BaseTwoWaySplitPane-stories" style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseTwoWaySplitPane v-bind="args">
          <template #first>
            <div class="pane-content first-pane">
              <span>1</span>
              <em class="specs">좌측 패널 (300px-500px)</em>
            </div>
          </template>
          <template #second>
            <BaseTwoWaySplitPane
              direction="horizontal"
              :min-sizes="{ first: 20, second: 300 }"
              :max-sizes="{ first: 80, second: 500 }"
              :push-other-panes="false"
            >
              <template #first>
                <div class="pane-content center-pane">
                  <span>2</span>
                  <em class="specs">중앙 패널 (20%-80%)</em>
                </div>
              </template>
              <template #second>
                <div class="pane-content third-pane">
                  <span>3</span>
                  <em class="specs">우측 패널 (300px-500px)</em>
                </div>
              </template>
            </BaseTwoWaySplitPane>
          </template>
        </BaseTwoWaySplitPane>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'BaseTwoWaySplitPane을 중첩하여 3개 패널을 구성한 예제입니다. 좌측과 우측 패널은 고정 크기 범위를 가지며, 중앙 패널은 유연한 크기를 가집니다.',
      },
    },
  },
};

/**
 * 실제 사용 사례: 주문 관리 시스템
 */
export const OrderManagement: Story = {
  args: {
    direction: 'horizontal',
    minSizes: { first: 300, second: 60 },
    maxSizes: { first: 500, second: 80 },
    pushOtherPanes: false,
  },
  render: (args) => ({
    components: { BaseTwoWaySplitPane },
    setup() {
      return { args };
    },
    template: `
      <div class="BaseTwoWaySplitPane-stories" style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseTwoWaySplitPane v-bind="args">
          <template #first>
            <div class="content-pane left-pane">
              <div class="pane-header">
                <h3>📋 주문 목록</h3>
                <p>전체 주문 내역을 확인하세요</p>
              </div>
              <div class="pane-content">
                <div class="empty-content">
                  <div class="empty-icon">📋</div>
                  <p>주문 목록이 여기에 표시됩니다</p>
                </div>
              </div>
            </div>
          </template>
          <template #second>
            <BaseTwoWaySplitPane
              direction="horizontal"
              :min-sizes="{ first: 20, second: 300 }"
              :max-sizes="{ first: 80, second: 500 }"
              :push-other-panes="false"
            >
              <template #first>
                <div class="content-pane center-pane">
                  <div class="pane-header">
                    <h3>📄 주문 상세</h3>
                    <p>선택된 주문의 상세 정보</p>
                  </div>
                  <div class="pane-content">
                    <div class="empty-content">
                      <div class="empty-icon">📄</div>
                      <p>주문 상세 정보가 여기에 표시됩니다</p>
                    </div>
                  </div>
                </div>
              </template>
              <template #second>
                <div class="content-pane right-pane">
                  <div class="pane-header">
                    <h3>⚡ 주문 처리</h3>
                    <p>주문 상태 변경 및 액션</p>
                  </div>
                  <div class="pane-content">
                    <div class="empty-content">
                      <div class="empty-icon">⚡</div>
                      <p>주문 처리 옵션이 여기에 표시됩니다</p>
                    </div>
                  </div>
                </div>
              </template>
            </BaseTwoWaySplitPane>
          </template>
        </BaseTwoWaySplitPane>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '실제 사용 사례를 보여주는 주문 관리 시스템 예제입니다. 주문 목록, 주문 상세, 주문 처리로 구성되어 있습니다.',
      },
    },
  },
};

// 스토리북 전용 스타일 추가
const style = document.createElement('style');
style.textContent = `
  /* BaseTwoWaySplitPane 스토리북 전용 스타일 */
  .sb-show-main .BaseTwoWaySplitPane-stories .pane-content {
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    color: rgba(255, 255, 255, 0.6);
    font-size: 5em;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .pane-content span {
    color: rgba(255, 255, 255, 0.8);
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .specs {
    font-size: 0.2em;
    line-height: 1;
    position: absolute;
    color: #bbb;
    bottom: 0.5em;
    left: 0;
    right: 0;
    text-align: center;
    font-style: normal;
  }

  /* 패널별 배경색 */
  .sb-show-main .BaseTwoWaySplitPane-stories .first-pane {
    background-color: #2c3e50;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .second-pane {
    background-color: #34495e;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .center-pane {
    background-color: #3498db;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .third-pane {
    background-color: #2980b9;
  }

  /* splitpanes 기본 스타일 - 스토리북 내에서만 적용 */
  .sb-show-main .BaseTwoWaySplitPane-stories .splitpanes__pane {
    background-color: #2c3e50;
  }

  /* OrderManagement 스토리용 스타일 */
  .sb-show-main .BaseTwoWaySplitPane-stories .content-pane {
    height: 100%;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .left-pane {
    background-color: #f8f9fa;
    min-width: 250px;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .center-pane {
    background-color: #ffffff;
    flex: 1;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .right-pane {
    background-color: #f8f9fa;
    min-width: 300px;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .pane-header {
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #ffffff;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .pane-header h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .pane-header p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .empty-content {
    text-align: center;
    color: #6c757d;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .sb-show-main .BaseTwoWaySplitPane-stories .empty-content p {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
`;

// 스타일을 문서에 추가
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
