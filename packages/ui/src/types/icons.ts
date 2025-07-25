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
  | 'fullscreen'
  | 'external-link'
  | 'icn-delete'

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

  // 테마 아이콘
  | 'mode-dark'
  | 'mode-light'

  // 기타 아이콘
  | 'asset'
  | 'calendar'
  | 'chart'
  | 'email'
  | 'time'
  | 'cert'
  | 'check-circle'
  | 'comm'
  | 'account-balance'

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
  fullscreen: 'fill', // fill="#333740"
  'external-link': 'fill', // fill="#333740"
  'icn-delete': 'fill', // fill="#b4b6bb"

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

  // 테마 아이콘
  'mode-dark': 'fill', // fill="#333740"
  'mode-light': 'fill', // fill="#333740"

  // 기타 아이콘
  asset: 'fill', // fill="#333740"
  calendar: 'fill', // fill="#333740"
  chart: 'fill', // fill="#333740"
  email: 'fill', // fill="#333740"
  time: 'fill', // fill="#333740"
  cert: 'fill', // fill="#000"
  'check-circle': 'fill', // fill="#000"
  comm: 'fill', // fill="#333740"
  'account-balance': 'fill', // fill="#717375"

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
