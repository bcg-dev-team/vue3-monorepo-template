// API 관련 기능들을 export
export * from './services';
export * from './plugin/axios';
export * from './errors';

// 자동 생성된 타입들 (기본으로 사용 권장)
export * from './generated-types';

// 공통 타입들만 직접 export (충돌 없음)
export * from './types/axios';
export * from './types/errorcode.types';

/**
 * 커스텀 타입 네임스페이스
 *
 * generated-types에 없는 수동 작성 타입들을 포함합니다.
 * (예: File 필드가 포함된 폼 데이터 타입 등)
 *
 * @example
 * import { CustomTypes } from '@template/api';
 *
 * // File 필드가 있는 회원가입 폼 데이터
 * const formData: CustomTypes.IndividualMemberJoinRequest = {
 *   ...userData,
 *   idCard: fileObject  // File 타입
 * };
 */
export * as CustomTypes from './types';
