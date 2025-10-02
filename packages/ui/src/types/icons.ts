/**
 * 아이콘 이름 타입 정의
 * SVG 파일명과 일치해야 합니다.
 */
export type IconName =
  // 화살표 아이콘
  | 'arrow-forward'
  | 'arrow-backward'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-close'
  | 'arrow-open'
  | 'arrow-drawer'
  | 'arrow-right-thin'
  | 'arrow-updown'
  | 'arrow-updown-solid'
  | 'arrow-forward-sm'
  | 'arrow-backward-sm'
  | 'arrow-down-solid'
  | 'arrow-left-solid'
  | 'arrow-outward'
  | 'arrow-right-solid'
  | 'arrow-up-solid'
  | 'arrow-updown-solid'

  // 액션 아이콘
  | 'heart'
  | 'heart-thin'
  | 'star'
  | 'plus'
  | 'minus'
  | 'plus-minus'
  | 'edit'
  | 'trash'
  | 'refresh'
  | 'search'
  | 'eye'
  | 'eye-close'
  | 'fullscreen'
  | 'external-link'
  | 'icn-delete'
  | 'copy'
  | 'download'
  | 'upload'
  | 'send'
  | 'pause'
  | 'move'
  | 'withdraw'
<<<<<<< HEAD
  | 'grap'
=======
  | 'delete'
  | 'save'
  | 'sort'
  | 'grab'
  | 'drag-draw'
>>>>>>> 08afe46f (chore(packages/ui): 아이콘 타입 목록 업데이트 및 문서 수정)

  // 네비게이션 아이콘
  | 'home'
  | 'settings'
  | 'person'
  | 'login'
  | 'logout'
  | 'mypage'
  | 'order'
  | 'trade'
  | 'support'
  | 'list'
  | 'phone'
  | 'noti'
  | 'campaign-thin'
  | 'deposit-thin'
  | 'faq-thin'
  | 'logout-thin'
  | 'mypage-thin'
  | 'support-thin'
  | 'trade-thin'
  | 'trash-thin'
  | 'info-thin'
  | 'close-thin'
  | 'list-thin'

  // 테마 아이콘
  | 'mode-dark'
  | 'mode-light'

  // 상태/알림 아이콘
  | 'warning'
  | 'warning2'
  | 'info'
  | 'check-sm'
  | 'check-circle'
  | 'grade'
  | 'fav'
  | 'favorite'

  // 화면/디스플레이 아이콘
  | 'screen-single'
  | 'screen-multi'
  | 'screem-multi2'
  | 'layout-1x1'
  | 'layout-2x2'
  | 'layout-3x3'
  | 'layout-4x4'

  // 차트 아이콘
  | 'chart'
  | 'chart-line'
  | 'chart-candle'
  | 'chart-bubble'
  | 'chart-area'
  | 'chart-5m'
  | 'chart-4h'
  | 'chart-1-w'
  | 'chart-1-mon'
  | 'chart-1m'
  | 'chart-1h'
  | 'chart-1-d'
  | 'chart-15m'
  | 'chart-30m'
  | 'chart-10m'
  | 'chart-eye-thin'
  | 'chart-indicator'
  | 'chart-new'
  | 'chart-setting'
  | 'chart-setup'
  | 'chart-snapshot'

  // 기타 아이콘
  | 'asset'
  | 'calendar'
  | 'email'
  | 'time'
  | 'cert'
  | 'comm'
  | 'account-balance'
  | 'account'
  | 'description'
  | 'file-attached'
  | 'filter'
  | 'card'
  | 'close'
  | 'close small'
  | 'trending-up'
  | 'trending-down'
  | 'dollar'
  | 'cloud-upload'
  | 'transparent'
  | 'watch'
  | 'more vert'

  // 플래그 아이콘
  | 'flag-AU'
  | 'flag-CA'
  | 'flag-CN'
  | 'flag-de'
  | 'flag-es'
  | 'flag-EU'
  | 'flag-fr'
  | 'flag-HK'
  | 'flag-it'
  | 'flag-JP'
  | 'flag-KR'
  | 'flag-MX'
  | 'flag-nl'
  | 'flag-NR'
  | 'flag-NZ'
  | 'flag-SE'
  | 'flag-SG'
  | 'flag-SUI'
  | 'flag-TR'
  | 'flag-UK'
  | 'flag-US'
  | 'flag-ZA';

/**
 * 아이콘 타입 정의
 */
export type IconType = 'fill' | 'stroke';

/**
 * 아이콘 크기 타입
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * 아이콘 모양 타입 (스켈레톤용)
 */
export type IconVariant = 'circular' | 'square' | 'rounded';

/**
 * 아이콘 스켈레톤 Props
 */
export interface IconSkeletonProps {
  size?: IconSize;
  showText?: boolean;
  text?: string;
}

/**
 * 아이콘 크기 매핑
 */
export const ICON_SIZE_MAP: Record<IconSize, string> = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

/**
 * 아이콘 타입 매핑
 * 실제 SVG 파일 분석 결과를 바탕으로 각 아이콘의 기본 타입을 정의합니다.
 */
export const ICON_TYPES: Record<IconName, IconType> = {
  // 화살표 아이콘
  'arrow-forward': 'fill', // fill="#333740"
  'arrow-backward': 'fill', // fill="#333740"
  'arrow-up': 'stroke', // stroke="#333740"
  'arrow-down': 'stroke', // stroke="#333740"
  'arrow-close': 'fill', // fill="#333740"
  'arrow-open': 'fill', // fill="#333740"
  'arrow-drawer': 'fill', // fill="#333740"
  'arrow-right-thin': 'stroke', // stroke="#333740"
  'arrow-updown': 'fill', // fill="#333740"
  'arrow-updown-solid': 'fill', // fill="#333740"
  'arrow-forward-sm': 'fill', // fill="#333740"
  'arrow-backward-sm': 'fill', // fill="#333740"
  'arrow-down-solid': 'fill', // fill (path 요소)
  'arrow-left-solid': 'fill', // fill (path 요소)
  'arrow-outward': 'fill', // fill="#333740"
  'arrow-right-solid': 'fill', // fill (path 요소)
  'arrow-up-solid': 'fill', // fill (path 요소)
  'arrow-updown-solid': 'fill', // fill (path 요소)

  // 액션 아이콘
  heart: 'fill', // fill="#333740"
  'heart-thin': 'fill', // fill="#dadbdd" (다른 색상이지만 fill)
  star: 'stroke', // stroke="#333740"
  plus: 'fill', // fill="#333740"
  minus: 'fill', // fill="#333740"
  'plus-minus': 'stroke', // stroke="#333740"
  edit: 'fill', // fill="#333740"
  trash: 'fill', // fill="#333740"
  refresh: 'fill', // fill="#333740"
  search: 'fill', // fill="#333740"
  eye: 'stroke', // stroke="#333740"
  'eye-close': 'stroke', // stroke="#333740" (path만 사용)
  fullscreen: 'fill', // fill="#333740"
  'external-link': 'fill', // fill="#333740"
  'icn-delete': 'fill', // fill="#b4b6bb"
  copy: 'fill', // fill="#333740"
  download: 'fill', // fill="#333740" (path만 사용)
  upload: 'fill', // fill="#333740" (path만 사용)
  send: 'fill', // fill="#333740"
  pause: 'fill', // fill="#333740"
  move: 'fill', // fill="#333740" (path만 사용)
  withdraw: 'fill', // fill="#333740" (path만 사용)
<<<<<<< HEAD
  grap: 'fill', // fill="#333740"
=======
  delete: 'fill', // fill (path 요소)
  save: 'fill', // fill (path 요소)
  sort: 'fill', // fill (path 요소)
  grab: 'fill', // fill (path 요소)
  'drag-draw': 'fill', // fill (path 요소)
>>>>>>> 08afe46f (chore(packages/ui): 아이콘 타입 목록 업데이트 및 문서 수정)

  // 네비게이션 아이콘
  home: 'fill', // fill="#333740"
  settings: 'fill', // fill="#333740"
  person: 'fill', // fill="#333740"
  login: 'fill', // fill="#333740"
  logout: 'fill', // fill="#333740"
  mypage: 'fill', // fill="#333740"
  order: 'fill', // fill="#333740"
  trade: 'stroke', // stroke="#333740"
  support: 'fill', // fill="#333740"
  list: 'fill', // fill="#333740"
  phone: 'fill', // fill="#333740"
  noti: 'fill', // fill (path 요소)
  'campaign-thin': 'fill', // fill (path 요소)
  'deposit-thin': 'fill', // fill (path 요소)
  'faq-thin': 'fill', // fill (path 요소)
  'logout-thin': 'fill', // fill (path 요소)
  'mypage-thin': 'fill', // fill (path 요소)
  'support-thin': 'fill', // fill (path 요소)
  'trade-thin': 'fill', // fill (path 요소)
  'trash-thin': 'fill', // fill (path 요소)
  'info-thin': 'fill', // fill (path 요소)
  'close-thin': 'fill', // fill (path 요소)
  'list-thin': 'fill', // fill (path 요소)

  // 테마 아이콘
  'mode-dark': 'fill', // fill="#333740"
  'mode-light': 'fill', // fill="#333740"

  // 상태/알림 아이콘
  warning: 'fill', // fill="#333740" (path만 사용)
  warning2: 'fill', // fill="#333740" (path만 사용)
  info: 'fill', // fill="#333740"
  'check-sm': 'fill', // fill="#333740" (path만 사용)
  'check-circle': 'fill', // fill="#000"
  grade: 'fill', // fill="#333740"
  fav: 'fill', // fill (path 요소)
  favorite: 'fill', // fill (path 요소)

  // 화면/디스플레이 아이콘
  'screen-single': 'fill', // fill="#333740" (path만 사용)
  'screen-multi': 'fill', // fill="#333740" (path만 사용)
  'screem-multi2': 'fill', // fill="#333740" (path만 사용)
  'layout-1x1': 'fill', // fill (path 요소)
  'layout-2x2': 'fill', // fill (path 요소)
  'layout-3x3': 'fill', // fill (path 요소)
  'layout-4x4': 'fill', // fill (path 요소)

  // 차트 아이콘
  chart: 'fill', // fill="#333740"
  'chart-line': 'fill', // fill="#333740" (path만 사용)
  'chart-candle': 'fill', // fill="#333740" (path만 사용)
  'chart-bubble': 'fill', // fill="#333740" (path만 사용)
  'chart-area': 'fill', // fill="#333740" (path만 사용)
  'chart-5m': 'fill', // fill="#333740" (path만 사용)
  'chart-4h': 'fill', // fill="#333740" (path만 사용)
  'chart-1-w': 'fill', // fill (text 요소)
  'chart-1-mon': 'fill', // fill (path 요소)
  'chart-1m': 'fill', // fill="#333740" (path만 사용)
  'chart-1h': 'fill', // fill="#333740" (path만 사용)
  'chart-1-d': 'fill', // fill (text 요소)
  'chart-15m': 'fill', // fill="#333740" (path만 사용)
  'chart-30m': 'fill', // fill (path 요소)
  'chart-10m': 'fill', // fill="#333740" (path만 사용)
  'chart-eye-thin': 'fill', // fill (path 요소)
  'chart-indicator': 'fill', // fill (path 요소)
  'chart-new': 'fill', // fill (path 요소)
  'chart-setting': 'fill', // fill (path 요소)
  'chart-setup': 'fill', // fill (path 요소)
  'chart-snapshot': 'fill', // fill (path 요소)

  // 기타 아이콘
  asset: 'fill', // fill="#333740"
  calendar: 'fill', // fill="#333740"
  email: 'fill', // fill="#333740"
  time: 'fill', // fill="#333740"
  cert: 'fill', // fill="#000"
  comm: 'fill', // fill="#333740"
  'account-balance': 'fill', // fill="#717375"
  account: 'fill', // fill="#333740"
  description: 'fill', // fill="#333740" (path만 사용)
  'file-attached': 'fill', // fill="#333740" (path만 사용)
  filter: 'fill', // fill="#333740" (path만 사용)
  card: 'fill', // fill="#333740"
  close: 'fill', // fill="#333740"
  'close small': 'fill', // fill="#333740" (path만 사용)
  'trending-up': 'fill', // fill="#333740"
  'trending-down': 'fill', // fill="#333740"
  dollar: 'fill', // fill (path 요소)
  'cloud-upload': 'fill', // fill (path 요소)
  transparent: 'stroke', // stroke (path 요소)
  watch: 'fill', // fill (path 요소)
  'more vert': 'fill', // fill (path 요소)

  // 플래그 아이콘 (특별 처리)
  'flag-AU': 'fill',
  'flag-CA': 'fill',
  'flag-CN': 'fill',
  'flag-de': 'fill',
  'flag-es': 'fill',
  'flag-EU': 'fill',
  'flag-fr': 'fill',
  'flag-HK': 'fill',
  'flag-it': 'fill',
  'flag-JP': 'fill',
  'flag-KR': 'fill',
  'flag-MX': 'fill',
  'flag-nl': 'fill',
  'flag-NR': 'fill',
  'flag-NZ': 'fill',
  'flag-SE': 'fill',
  'flag-SG': 'fill',
  'flag-SUI': 'fill',
  'flag-TR': 'fill',
  'flag-UK': 'fill',
  'flag-US': 'fill',
  'flag-ZA': 'fill',
};

/**
 * 아이콘 타입을 자동으로 감지하는 함수
 */
export const getIconType = (name: IconName): IconType => {
  return ICON_TYPES[name] || 'fill'; // 기본값은 fill
};
