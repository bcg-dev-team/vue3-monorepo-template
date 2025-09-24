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
  | 'grap'

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
  | 'notification'

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

  // 화면/디스플레이 아이콘
  | 'screen-single'
  | 'screen-multi'
  | 'screem-multi2'

  // 기타 아이콘
  | 'asset'
  | 'calendar'
  | 'chart'
  | 'chart-line'
  | 'chart-candle'
  | 'chart-bubble'
  | 'chart-area'
  | 'chart-5m'
  | 'chart-4h'
  | 'chart-1w'
  | 'chart-1mon'
  | 'chart-1m'
  | 'chart-1h'
  | 'chart-1d'
  | 'chart-15m'
  | 'chart-10m'
  | 'email'
  | 'time'
  | 'cert'
  | 'comm'
  | 'account-balance'
  | 'description'
  | 'file-attached'
  | 'filter'
  | 'card'
  | 'close'
  | 'close small'
  | 'trending-up'
  | 'trending-down'

  // 플래그 아이콘
  | 'flag-au'
  | 'flag-ca'
  | 'flag-cn'
  | 'flag-eu'
  | 'flag-hk'
  | 'flag-jp'
  | 'flag-kr'
  | 'flag-mx'
  | 'flag-nr'
  | 'flag-nz'
  | 'flag-se'
  | 'flag-sg'
  | 'flag-sui'
  | 'flag-tr'
  | 'flag-uk'
  | 'flag-us'
  | 'flag-za';

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
  'arrow-forward-sm': 'fill', // fill="#333740"
  'arrow-backward-sm': 'fill', // fill="#333740"

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
  notification: 'fill', // fill="#333740" (path만 사용)

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

  // 화면/디스플레이 아이콘
  'screen-single': 'fill', // fill="#333740" (path만 사용)
  'screen-multi': 'fill', // fill="#333740" (path만 사용)
  'screem-multi2': 'fill', // fill="#333740" (path만 사용)

  // 기타 아이콘
  asset: 'fill', // fill="#333740"
  calendar: 'fill', // fill="#333740"
  chart: 'fill', // fill="#333740"
  'chart-line': 'fill', // fill="#333740" (path만 사용)
  'chart-candle': 'fill', // fill="#333740" (path만 사용)
  'chart-bubble': 'fill', // fill="#333740" (path만 사용)
  'chart-area': 'fill', // fill="#333740" (path만 사용)
  'chart-5m': 'fill', // fill="#333740" (path만 사용)
  'chart-4h': 'fill', // fill="#333740" (path만 사용)
  'chart-1w': 'fill', // fill="#333740" (path만 사용)
  'chart-1mon': 'fill', // fill="#333740" (path만 사용)
  'chart-1m': 'fill', // fill="#333740" (path만 사용)
  'chart-1h': 'fill', // fill="#333740" (path만 사용)
  'chart-1d': 'fill', // fill="#333740" (path만 사용)
  'chart-15m': 'fill', // fill="#333740" (path만 사용)
  'chart-10m': 'fill', // fill="#333740" (path만 사용)
  email: 'fill', // fill="#333740"
  time: 'fill', // fill="#333740"
  cert: 'fill', // fill="#000"
  comm: 'fill', // fill="#333740"
  'account-balance': 'fill', // fill="#717375"
  description: 'fill', // fill="#333740" (path만 사용)
  'file-attached': 'fill', // fill="#333740" (path만 사용)
  filter: 'fill', // fill="#333740" (path만 사용)
  card: 'fill', // fill="#333740"
  close: 'fill', // fill="#333740"
  'close small': 'fill', // fill="#333740" (path만 사용)
  'trending-up': 'fill', // fill="#333740"
  'trending-down': 'fill', // fill="#333740"

  // 플래그 아이콘 (특별 처리)
  'flag-au': 'fill',
  'flag-ca': 'fill',
  'flag-cn': 'fill',
  'flag-eu': 'fill',
  'flag-hk': 'fill',
  'flag-jp': 'fill',
  'flag-kr': 'fill',
  'flag-mx': 'fill',
  'flag-nr': 'fill',
  'flag-nz': 'fill',
  'flag-se': 'fill',
  'flag-sg': 'fill',
  'flag-sui': 'fill',
  'flag-tr': 'fill',
  'flag-uk': 'fill',
  'flag-us': 'fill',
  'flag-za': 'fill',
};

/**
 * 아이콘 타입을 자동으로 감지하는 함수
 */
export const getIconType = (name: IconName): IconType => {
  return ICON_TYPES[name] || 'fill'; // 기본값은 fill
};
