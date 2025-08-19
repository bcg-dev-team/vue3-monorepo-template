import BaseVerticalSplitPane from './BaseVerticalSplitPane.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

/**
 * BaseVerticalSplitPane 컴포넌트
 *
 * 수직 방향으로 세 개의 패널을 분할하는 컴포넌트입니다.
 * BaseThreeWaySplitPane을 래핑하여 수직 분할만을 위한 편의 컴포넌트입니다.
 *
 * Figma 링크: [Figma 컴포넌트 링크 추가 필요]
 */
const meta: Meta<typeof BaseVerticalSplitPane> = {
  title: 'Layout/VerticalSplitPane',
  component: BaseVerticalSplitPane,
  parameters: {
    docs: {
      description: {
        component: '수직 방향으로 세 개의 패널을 분할하는 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    minSizes: {
      control: { type: 'object' },
      description: '상단/하단 패널의 최소 크기 (%)',
    },
    maxSizes: {
      control: { type: 'object' },
      description: '상단/하단 패널의 최대 크기 (%)',
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
 * 기본 수직 분할 패널
 */
export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { BaseVerticalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseVerticalSplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>상단 패널</h3>
              <p>헤더 또는 도구 모음</p>
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
              <h3>하단 패널</h3>
              <p>상태 바 또는 정보 표시</p>
            </div>
          </template>
        </BaseVerticalSplitPane>
      </div>
    `,
  }),
};

/**
 * 넓은 상하 패널
 */
export const WideTopBottom: Story = {
  args: {
    minSizes: { left: 15, right: 20 },
    maxSizes: { left: 35, right: 40 },
  },
  render: (args) => ({
    components: { BaseVerticalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseVerticalSplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>넓은 상단 패널</h3>
              <p>최소 15%, 최대 35%</p>
              <p>더 많은 도구나 메뉴를 표시할 수 있습니다.</p>
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
              <h3>넓은 하단 패널</h3>
              <p>최소 20%, 최대 40%</p>
              <p>상세 정보나 로그를 표시합니다.</p>
            </div>
          </template>
        </BaseVerticalSplitPane>
      </div>
    `,
  }),
};

/**
 * 좁은 상하 패널
 */
export const NarrowTopBottom: Story = {
  args: {
    minSizes: { left: 5, right: 8 },
    maxSizes: { left: 12, right: 15 },
  },
  render: (args) => ({
    components: { BaseVerticalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <BaseVerticalSplitPane v-bind="args">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>좁은 상단 패널</h3>
              <p>최소 5%, 최대 12%</p>
              <p>컴팩트한 헤더</p>
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
              <h3>좁은 하단 패널</h3>
              <p>최소 8%, 최대 15%</p>
              <p>미니 상태 바</p>
            </div>
          </template>
        </BaseVerticalSplitPane>
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
    components: { BaseVerticalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <div style="position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ccc;">
          <strong>반응형 테스트</strong>
          <br>
          <small>브레이크포인트: {{ args.breakpoint }}px - 화면 너비가 이 값보다 작으면 상단 패널이 자동으로 접힙니다.</small>
        </div>
        <BaseVerticalSplitPane v-bind="args" style="padding-top: 80px;">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%;">
              <h3>상단 패널</h3>
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
              <h3>하단 패널</h3>
              <p>고정 패널</p>
            </div>
          </template>
        </BaseVerticalSplitPane>
      </div>
    `,
  }),
};

/**
 * 라우팅 예제 - 소셜 미디어 피드
 */
export const SocialMediaFeed: Story = {
  args: {
    minSizes: { left: 12, right: 15 },
    maxSizes: { left: 30, right: 25 },
  },
  render: (args) => ({
    components: { BaseVerticalSplitPane },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100vh; width: 100%; border: 1px solid #ccc; margin: -1rem;">
        <div style="position: absolute; top: 0; left: 0; right: 0; z-index: 10; padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ccc;">
          <strong>소셜 미디어 피드 레이아웃 예제</strong>
          <br>
          <small>각 패널이 다른 소셜 기능을 표시하는 라우팅 예제</small>
        </div>
        <BaseVerticalSplitPane v-bind="args" style="padding-top: 80px;">
          <template #left>
            <div style="background: #e3f2fd; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>🔔 알림 & 활동</h3>
              <div style="margin-top: 20px;">
                <div style="background: #fff; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="width: 40px; height: 40px; background: #ff9800; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 10px;">김</div>
                    <div>
                      <strong>김철수</strong>님이 회원님의 게시물을 좋아합니다
                      <div style="font-size: 0.9em; color: #666;">2분 전</div>
                    </div>
                  </div>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="width: 40px; height: 40px; background: #2196f3; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 10px;">이</div>
                    <div>
                      <strong>이영희</strong>님이 회원님을 팔로우했습니다
                      <div style="font-size: 0.9em; color: #666;">15분 전</div>
                    </div>
                  </div>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 8px;">
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="width: 40px; height: 40px; background: #4caf50; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 10px;">박</div>
                    <div>
                      <strong>박민수</strong>님이 댓글을 남겼습니다
                      <div style="color: #666;">1시간 전</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #center>
            <div style="background: #f3e5f5; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>📱 메인 피드</h3>
              <div style="margin-top: 20px;">
                <div style="background: #fff; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 50px; height: 50px; background: #ff9800; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">김</div>
                    <div>
                      <strong>김철수</strong>
                      <div style="font-size: 0.9em; color: #666;">오늘 오후 2:30</div>
                    </div>
                  </div>
                  <p style="margin: 0 0 15px 0; line-height: 1.6;">오늘 정말 좋은 날씨네요! 🌞 공원에서 산책하기 완벽한 날씨입니다. 여러분도 좋은 하루 보내세요! 😊</p>
                  <div style="display: flex; gap: 20px; color: #666; font-size: 0.9em;">
                    <span style="cursor: pointer;">❤️ 24</span>
                    <span style="cursor: pointer;">💬 8</span>
                    <span style="cursor: pointer;">🔄 3</span>
                  </div>
                </div>
                <div style="background: #fff; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="width: 50px; height: 50px; background: #2196f3; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 15px;">이</div>
                    <div>
                      <strong>이영희</strong>
                      <div style="font-size: 0.9em; color: #666;">오늘 오후 1:15</div>
                    </div>
                  </div>
                  <p style="margin: 0 0 15px 0; line-height: 1.6;">새로운 카페를 발견했어요! ☕ 분위기도 좋고 커피도 맛있네요. 추천합니다! #카페 #커피 #추천</p>
                  <div style="display: flex; gap: 20px; color: #666; font-size: 0.9em;">
                    <span style="cursor: pointer;">❤️ 18</span>
                    <span style="cursor: pointer;">💬 12</span>
                    <span style="cursor: pointer;">🔄 5</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #right>
            <div style="background: #e8f5e8; padding: 20px; height: 100%; overflow-y: auto;">
              <h3>👥 친구 & 추천</h3>
              <div style="margin-top: 20px;">
                <div style="background: #fff; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                  <h4 style="margin: 0 0 10px 0;">친구 추천</h4>
                  <div style="display: flex; align-items: center; margin-bottom: 8px;">
                    <div style="width: 35px; height: 35px; background: #9c27b0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 10px;">최</div>
                    <div>
                      <strong>최지영</strong>
                      <div style="font-size: 0.9em; color: #666;">공통 친구 3명</div>
                    </div>
                    <button style="margin-left: auto; background: #2196f3; color: white; border: none; padding: 5px 12px; border-radius: 4px; cursor: pointer; font-size: 0.8em;">팔로우</button>
                  </div>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                  <h4 style="margin: 0 0 10px 0;">트렌딩</h4>
                  <div style="margin-bottom: 8px;">
                    <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em; margin-right: 5px;">#봄날씨</span>
                    <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em; margin-right: 5px;">#산책</span>
                  </div>
                  <div style="margin-bottom: 8px;">
                    <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em; margin-right: 5px;">#카페</span>
                    <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 0.9em;">#커피</span>
                  </div>
                </div>
                <div style="background: #fff; padding: 15px; border-radius: 8px;">
                  <h4 style="margin: 0 0 10px 0;">최근 활동</h4>
                  <div style="font-size: 0.9em; color: #666; line-height: 1.4;">
                    <div style="margin-bottom: 5px;">• 김철수님이 게시물을 좋아합니다</div>
                    <div style="margin-bottom: 5px;">• 이영희님이 댓글을 남겼습니다</div>
                    <div style="margin-bottom: 5px;">• 박민수님이 사진을 공유했습니다</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </BaseVerticalSplitPane>
      </div>
    `,
  }),
};
