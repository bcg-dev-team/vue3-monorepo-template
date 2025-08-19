import BaseHorizontalSplitPane from './BaseHorizontalSplitPane.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/**
 * BaseHorizontalSplitPane 컴포넌트
 *
 * 수평 방향으로 세 개의 패널을 분할하는 컴포넌트입니다.
 * BaseThreeWaySplitPane을 래핑하여 수평 분할만을 위한 편의 컴포넌트입니다.
 *
 * Figma 링크: [Figma 컴포넌트 링크 추가 필요]
 */
const meta: Meta<typeof BaseHorizontalSplitPane> = {
  title: 'Layout/HorizontalSplitPane',
  component: BaseHorizontalSplitPane,
  parameters: {
    docs: {
      description: {
        component: '수평 방향으로 세 개의 패널을 분할하는 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
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
  args: {},
  render: (args) => ({
    components: { BaseHorizontalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseHorizontalSplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>좌측 패널</h3>
              <p>사이드바 또는 네비게이션</p>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%;">
              <h3>중앙 패널</h3>
              <p>메인 콘텐츠 영역</p>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%;">
              <h3>우측 패널</h3>
              <p>도구 모음 또는 정보 패널</p>
            </div>
          </template>
        </BaseHorizontalSplitPane>
      </div>
    `,
  }),
};

/**
 * 넓은 사이드바
 */
export const WideSidebars: Story = {
  args: {
    minSizes: { left: 20, right: 25 },
    maxSizes: { left: 40, right: 45 },
  },
  render: (args) => ({
    components: { BaseHorizontalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseHorizontalSplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>넓은 좌측 패널</h3>
              <p>최소 20%, 최대 40%</p>
              <p>더 많은 콘텐츠를 표시할 수 있습니다.</p>
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
              <h3>넓은 우측 패널</h3>
              <p>최소 25%, 최대 45%</p>
              <p>도구 모음이나 상세 정보를 표시합니다.</p>
            </div>
          </template>
        </BaseHorizontalSplitPane>
      </div>
    `,
  }),
};

/**
 * 좁은 사이드바
 */
export const NarrowSidebars: Story = {
  args: {
    minSizes: { left: 5, right: 8 },
    maxSizes: { left: 15, right: 20 },
  },
  render: (args) => ({
    components: { BaseHorizontalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseHorizontalSplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>좁은 좌측 패널</h3>
              <p>최소 5%, 최대 15%</p>
              <p>아이콘만 표시하는 미니 사이드바</p>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%;">
              <h3>중앙 패널</h3>
              <p>메인 콘텐츠가 더 넓은 공간을 차지합니다.</p>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%;">
              <h3>좁은 우측 패널</h3>
              <p>최소 8%, 최대 20%</p>
              <p>알림이나 상태 정보만 표시</p>
            </div>
          </template>
        </BaseHorizontalSplitPane>
      </div>
    `,
  }),
};

/**
 * 반응형 테스트
 */
export const Responsive: Story = {
  args: {
    breakpoint: 1000,
  },
  render: (args) => ({
    components: { BaseHorizontalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <div style="position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ccc;">
          <strong>반응형 테스트</strong>
          <br>
          <small>브레이크포인트: {{ args.breakpoint }}px - 화면 너비가 이 값보다 작으면 좌측 패널이 자동으로 접힙니다.</small>
        </div>
        <BaseHorizontalSplitPane v-bind="args" style="padding-top: 80px;">
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
        </BaseHorizontalSplitPane>
      </div>
    `,
  }),
};

/**
 * 라우팅 예제 - 이커머스 관리자 패널
 */
export const EcommerceAdmin: Story = {
  args: {
    minSizes: { left: 18, right: 22 },
    maxSizes: { left: 40, right: 45 },
  },
  render: (args) => ({
    components: { BaseHorizontalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <div style="position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ccc;">
          <strong>이커머스 관리자 패널 예제</strong>
          <br>
          <small>각 패널이 다른 관리 기능을 표시하는 라우팅 예제</small>
        </div>
        <BaseHorizontalSplitPane v-bind="args" style="padding-top: 80px;">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>🛍️ 상품 관리</h3>
              <div style="margin-top: 20px;">
                <div style="background: #fff; padding: 15px; border-radius: 6px; margin-bottom: 10px; cursor: pointer;">
                  <strong>📦 상품 목록</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">전체 상품 관리</p>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 6px; margin-bottom: 10px; cursor: pointer;">
                  <strong>➕ 상품 등록</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">새 상품 추가</p>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 6px; margin-bottom: 10px; cursor: pointer;">
                  <strong>🏷️ 카테고리</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">상품 분류 관리</p>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 6px; margin-bottom: 10px; cursor: pointer;">
                  <strong>📊 재고 현황</strong>
                  <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">재고 수량 확인</p>
                </div>
              </div>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>📊 주문 현황</h3>
              <div style="margin-top: 20px;">
                <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                  <h4 style="margin: 0 0 10px 0;">🆕 신규 주문</h4>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>주문번호: #12345</span>
                    <span style="color: #f44336; font-weight: bold;">처리 대기</span>
                  </div>
                  <p style="margin: 5px 0 0 0; color: #666;">고객: 김철수 | 총액: ₩45,000</p>
                </div>
                <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                  <h4 style="margin: 0 0 10px 0;">📦 배송 중</h4>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>주문번호: #12344</span>
                    <span style="color: #ff9800; font-weight: bold;">배송 중</span>
                  </div>
                  <p style="margin: 5px 0 0 0; color: #666;">고객: 이영희 | 총액: ₩32,000</p>
                </div>
                <div style="background: #fff; padding: 20px; border-radius: 8px;">
                  <h4 style="margin: 0 0 10px 0;">✅ 완료</h4>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>주문번호: #12343</span>
                    <span style="color: #4caf50; font-weight: bold;">배송 완료</span>
                  </div>
                  <p style="margin: 5px 0 0 0; color: #666;">고객: 박민수 | 총액: ₩28,500</p>
                </div>
              </div>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>💰 매출 통계</h3>
              <div style="margin-top: 20px;">
                <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
                  <h4 style="margin: 0 0 10px 0;">오늘 매출</h4>
                  <div style="font-size: 1.8em; color: #4caf50; font-weight: bold;">₩2,450,000</div>
                  <p style="margin: 5px 0 0 0; color: #666; font-size: 0.9em;">전일 대비 +12%</p>
                </div>
                <div style="background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 15px; text-align: center;">
                  <h4 style="margin: 0 0 10px 0;">이번 주 매출</h4>
                  <div style="font-size: 1.8em; color: #2196f3; font-weight: bold;">₩15,800,000</div>
                  <p style="margin: 5px 0 0 0; color: #666; font-size: 0.9em;">지난주 대비 +8%</p>
                </div>
                <div style="background: #fff; padding: 20px; border-radius: 8px; text-align: center;">
                  <h4 style="margin: 0 0 10px 0;">이번 달 매출</h4>
                  <div style="font-size: 1.8em; color: #ff9800; font-weight: bold;">₩68,500,000</div>
                  <p style="margin: 5px 0 0 0; color: #666; font-size: 0.9em;">지난달 대비 +15%</p>
                </div>
              </div>
            </div>
          </template>
        </BaseHorizontalSplitPane>
      </div>
    `,
  }),
};
