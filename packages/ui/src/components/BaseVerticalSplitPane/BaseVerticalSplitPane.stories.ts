import BaseVerticalSplitPane from './BaseVerticalSplitPane.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseVerticalSplitPane> = {
  title: 'Layout/BaseVerticalSplitPane',
  component: BaseVerticalSplitPane,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '상하로 분할되는 2-pane 컴포넌트입니다. BaseTwoWaySplitPane을 기반으로 합니다.',
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
 * 기본 상하 분할 예제
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BaseVerticalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseVerticalSplitPane v-bind="args">
          <template #top>
            <div class="pane-content top-pane">
              <h3>위쪽 툴바</h3>
              <p>메뉴 및 도구 버튼</p>
              <div class="toolbar">
                <button class="tool-btn">📁 열기</button>
                <button class="tool-btn">💾 저장</button>
                <button class="tool-btn">🖨️ 인쇄</button>
                <button class="tool-btn">⚙️ 설정</button>
              </div>
            </div>
          </template>
          <template #bottom>
            <div class="pane-content bottom-pane">
              <h3>메인 작업 영역</h3>
              <p>편집기 및 캔버스</p>
              <div class="work-area">
                <div class="canvas-placeholder">
                  <span class="canvas-icon">🎨</span>
                  <p>작업 영역이 여기에 표시됩니다</p>
                </div>
              </div>
            </div>
          </template>
        </BaseVerticalSplitPane>
      </div>
    `,
  }),
};

/**
 * 고정 크기 제한 예제
 */
export const FixedSizes: Story = {
  args: {
    minSizes: { first: 80, second: 200 },
    maxSizes: { first: 120, second: 600 },
  },
  render: (args) => ({
    components: { BaseVerticalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseVerticalSplitPane v-bind="args">
          <template #top>
            <div class="pane-content top-pane">
              <h3>툴바 (80px-120px)</h3>
              <p>최소 80px, 최대 120px로 제한</p>
              <div class="size-info">
                <div>최소: 80px</div>
                <div>최대: 120px</div>
              </div>
            </div>
          </template>
          <template #bottom>
            <div class="pane-content bottom-pane">
              <h3>작업 영역 (200px-600px)</h3>
              <p>최소 200px, 최대 600px로 제한</p>
              <div class="size-info">
                <div>최소: 200px</div>
                <div>최대: 600px</div>
              </div>
            </div>
          </template>
        </BaseVerticalSplitPane>
      </div>
    `,
  }),
};

/**
 * 실제 사용 사례 - 이미지 편집기
 */
export const ImageEditor: Story = {
  args: {},
  render: (args) => ({
    components: { BaseVerticalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; margin: -1rem;">
        <BaseVerticalSplitPane v-bind="args">
          <template #top>
            <div class="pane-content top-pane">
              <div class="pane-header">
                <h3>🎨 이미지 편집기</h3>
              </div>
              <div class="toolbar">
                <div class="tool-group">
                  <button class="tool-btn">✏️ 브러시</button>
                  <button class="tool-btn">🔍 줌</button>
                  <button class="tool-btn">📏 자르기</button>
                </div>
                <div class="tool-group">
                  <button class="tool-btn">🎨 색상</button>
                  <button class="tool-btn">🔧 필터</button>
                  <button class="tool-btn">📐 레이어</button>
                </div>
              </div>
            </div>
          </template>
          <template #bottom>
            <div class="pane-content bottom-pane">
              <div class="pane-header">
                <h3>🖼️ 이미지 캔버스</h3>
              </div>
              <div class="canvas-area">
                <div class="canvas-placeholder">
                  <span class="canvas-icon">🖼️</span>
                  <p>이미지가 여기에 표시됩니다</p>
                  <small>800x600px 해상도</small>
                </div>
                <div class="canvas-info">
                  <div>파일: sample-image.jpg</div>
                  <div>크기: 800 x 600</div>
                  <div>형식: JPEG</div>
                </div>
              </div>
            </div>
          </template>
        </BaseVerticalSplitPane>
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

  .top-pane {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
  }

  .bottom-pane {
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

  .toolbar {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .tool-group {
    display: flex;
    gap: 8px;
  }

  .tool-btn {
    padding: 8px 16px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    background-color: #ffffff;
    color: #495057;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tool-btn:hover {
    background-color: #e9ecef;
    border-color: #adb5bd;
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

  .canvas-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 20px;
  }

  .canvas-placeholder {
    text-align: center;
    color: #6c757d;
  }

  .canvas-icon {
    font-size: 48px;
    display: block;
    margin-bottom: 16px;
  }

  .canvas-placeholder p {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 500;
  }

  .canvas-placeholder small {
    font-size: 14px;
    color: #adb5bd;
  }

  .canvas-info {
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    font-size: 14px;
    color: #495057;
  }

  .canvas-info div {
    margin-bottom: 4px;
  }
`;

// 스타일을 문서에 추가
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
