export { default as BaseTwoWaySplitPane } from './BaseTwoWaySplitPane.vue';

// 컴포넌트 타입 정의
export interface TwoWaySplitPaneProps {
  direction?: 'horizontal' | 'vertical';
  minSizes?: {
    first: number;
    second: number;
  };
  maxSizes?: {
    first: number;
    second: number;
  };
  pushOtherPanes?: boolean;
}
