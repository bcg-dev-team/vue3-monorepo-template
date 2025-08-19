/**
 * MSW 핸들러 통합 관리
 * 모든 API 모킹 핸들러들을 여기서 중앙 관리합니다.
 */

import { websocketHandlers } from './chart-websocket.js';
import { httpHandlers } from './chart-history.js';

/**
 * 모든 MSW 핸들러를 통합하여 내보냅니다.
 */
export const handlers = [...httpHandlers, ...websocketHandlers];
