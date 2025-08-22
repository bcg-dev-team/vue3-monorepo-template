import BaseHorizontalSplitPane from './BaseHorizontalSplitPane.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseHorizontalSplitPane> = {
  title: 'Layout/BaseHorizontalSplitPane',
  component: BaseHorizontalSplitPane,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '좌우로 분할되는 2-pane 컴포넌트입니다. BaseTwoWaySplitPane을 기반으로 합니다.',
      },
    },
  },
  argTypes: {
    minSizes: {
      control: { type: 'object' },
      description: '각 pane의 최소 크기',
    },
    maxSizes: {
      control: { type: 'object' },
      description: '각 pane의 최대 크기',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 좌우 분할 예제
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BaseHorizontalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseHorizontalSplitPane v-bind="args">
          <template #left>
            <div class="pane-content left-pane">
              <h3>왼쪽 사이드바</h3>
              <p>네비게이션 및 메뉴</p>
              <div class="content-demo">
                <div class="demo-item">🏠 홈</div>
                <div class="demo-item">👥 사용자</div>
                <div class="demo-item">📊 대시보드</div>
                <div class="demo-item">⚙️ 설정</div>
              </div>
            </div>
          </template>
          <template #right>
            <div class="pane-content right-pane">
              <h3>메인 컨텐츠</h3>
              <p>사용자 정보 및 데이터</p>
              <div class="content-demo">
                <div class="demo-item">👤 사용자 프로필</div>
                <div class="demo-item">📈 통계 차트</div>
                <div class="demo-item">📝 최근 활동</div>
              </div>
            </div>
          </template>
        </BaseHorizontalSplitPane>
      </div>
    `,
  }),
};

/**
 * 고정 크기 제한 예제
 */
export const FixedSizes: Story = {
  args: {
    minSizes: { left: 250, right: 400 },
    maxSizes: { left: 400, right: 800 },
  },
  render: (args) => ({
    components: { BaseHorizontalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseHorizontalSplitPane v-bind="args">
          <template #left>
            <div class="pane-content left-pane">
              <h3>사이드바 (250px-400px)</h3>
              <p>최소 250px, 최대 400px로 제한</p>
              <div class="size-info">
                <div>최소: 250px</div>
                <div>최대: 400px</div>
              </div>
            </div>
          </template>
          <template #right>
            <div class="pane-content right-pane">
              <h3>메인 영역 (400px-800px)</h3>
              <p>최소 400px, 최대 800px로 제한</p>
              <div class="size-info">
                <div>최소: 400px</div>
                <div>최대: 800px</div>
              </div>
            </div>
          </template>
        </BaseHorizontalSplitPane>
      </div>
    `,
  }),
};

/**
 * 실제 사용 사례 - 관리자 대시보드
 */
export const AdminDashboard: Story = {
  args: {},
  render: (args) => ({
    components: { BaseHorizontalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseHorizontalSplitPane v-bind="args">
          <template #left>
            <div class="pane-content left-pane">
              <div class="pane-header">
                <h3>🎛️ 관리자 메뉴</h3>
              </div>
              <div class="admin-menu">
                <div class="menu-item active">📊 대시보드</div>
                <div class="menu-item">👥 사용자 관리</div>
                <div class="menu-item">🔐 권한 관리</div>
                <div class="menu-item">📈 통계</div>
                <div class="menu-item">⚙️ 시스템 설정</div>
                <div class="menu-item">📝 로그</div>
              </div>
            </div>
          </template>
          <template #right>
            <div class="pane-content right-pane">
              <div class="pane-header">
                <h3>📊 대시보드</h3>
              </div>
              <div class="dashboard-content">
                <div class="stats-grid">
                  <div class="stat-card">
                    <h4>총 사용자</h4>
                    <div class="stat-value">1,234</div>
                  </div>
                  <div class="stat-card">
                    <h4>활성 사용자</h4>
                    <div class="stat-value">987</div>
                  </div>
                  <div class="stat-card">
                    <h4>오늘 방문</h4>
                    <div class="stat-value">156</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </BaseHorizontalSplitPane>
      </div>
    `,
  }),
};

// 스토리용 CSS 스타일
const style = document.createElement('style');
style.textContent = `
  .pane-content {
    height: 100%;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: auto;
  }

  .left-pane {
    background-color: #f8f9fa;
    border-right: 1px solid #e9ecef;
  }

  .right-pane {
    background-color: #ffffff;
  }

  .pane-content h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  .pane-content p {
    margin: 0 0 16px 0;
    color: #666;
    font-size: 14px;
  }

  .content-demo {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .demo-item {
    padding: 8px 12px;
    background-color: #e9ecef;
    border-radius: 4px;
    font-size: 14px;
    color: #495057;
  }

  .size-info {
    background-color: #e9ecef;
    padding: 12px;
    border-radius: 4px;
    font-size: 12px;
    color: #495057;
  }

  .size-info div {
    margin-bottom: 4px;
  }

  .pane-header {
    border-bottom: 1px solid #e9ecef;
    padding-bottom: 12px;
    margin-bottom: 16px;
  }

  .admin-menu {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .menu-item {
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    color: #495057;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .menu-item:hover {
    background-color: #e9ecef;
  }

  .menu-item.active {
    background-color: #007bff;
    color: white;
  }

  .dashboard-content {
    padding: 20px 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .stat-card {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }

  .stat-card h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #666;
    font-weight: 500;
  }

  .stat-value {
    font-size: 32px;
    font-weight: 700;
    color: #007bff;
  }
`;

// 스타일을 문서에 추가
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
