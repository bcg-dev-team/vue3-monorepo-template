/**
 * 시장 데이터 실시간 업데이트 설정 관리 composable
 */

import { ref, reactive, computed, watch, readonly } from 'vue';

export interface MarketUpdateConfig {
  // 업데이트 간격 (밀리초)
  interval: number;
  // 업데이트 활성화 여부
  enabled: boolean;
  // 마지막 업데이트 시간
  lastUpdate: Date | null;
  // 업데이트 횟수
  updateCount: number;
}

export interface RealtimeConfig {
  // 시장 데이터 업데이트 설정
  market: MarketUpdateConfig;
  // 전체 업데이트 활성화 여부
  globalEnabled: boolean;
}

// 기본 설정값
const defaultConfig: RealtimeConfig = {
  market: {
    interval: 1000, // 1초
    enabled: true,
    lastUpdate: null,
    updateCount: 0,
  },
  globalEnabled: true,
};

// 설정 상태
const config = reactive<RealtimeConfig>({ ...defaultConfig });

// 설정 변경 이벤트 리스너
const configChangeListeners = new Set<(config: RealtimeConfig) => void>();

export function useRealtimeConfig() {
  // 설정 가져오기
  const getConfig = () => ({ ...config });

  // 설정 업데이트
  const updateConfig = (updates: Partial<RealtimeConfig>) => {
    Object.assign(config, updates);
    notifyConfigChange();
  };

  // 간격 설정
  const setInterval = (area: 'market', interval: number) => {
    config[area].interval = Math.max(100, interval); // 최소 100ms
    notifyConfigChange();
  };

  // 활성화/비활성화
  const setEnabled = (area: 'market', enabled: boolean) => {
    config[area].enabled = enabled;
    notifyConfigChange();
  };

  // 전체 활성화/비활성화
  const setGlobalEnabled = (enabled: boolean) => {
    config.globalEnabled = enabled;
    notifyConfigChange();
  };

  // 설정 리셋
  const resetConfig = () => {
    Object.assign(config, { ...defaultConfig });
    notifyConfigChange();
  };

  // 설정 변경 알림
  const notifyConfigChange = () => {
    configChangeListeners.forEach((listener) => listener({ ...config }));
  };

  // 설정 변경 리스너 등록
  const onConfigChange = (listener: (config: RealtimeConfig) => void) => {
    configChangeListeners.add(listener);
    return () => configChangeListeners.delete(listener);
  };

  // 업데이트 기록
  const recordUpdate = (area: 'market') => {
    config[area].lastUpdate = new Date();
    config[area].updateCount++;
  };

  // 통계 정보
  const getStats = () => {
    const now = new Date();
    return {
      market: {
        ...config.market,
        timeSinceLastUpdate: config.market.lastUpdate
          ? now.getTime() - config.market.lastUpdate.getTime()
          : null,
      },
    };
  };

  // 설정 검증
  const validateConfig = () => {
    const errors: string[] = [];

    const market = config.market;
    if (market.interval < 100) {
      errors.push('시장 데이터 간격은 최소 100ms여야 합니다.');
    }
    if (market.interval > 60000) {
      errors.push('시장 데이터 간격은 최대 60초여야 합니다.');
    }

    return errors;
  };

  // 설정 저장 (localStorage)
  const saveConfig = () => {
    try {
      localStorage.setItem('market-data-config', JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('설정 저장 실패:', error);
      return false;
    }
  };

  // 설정 로드 (localStorage)
  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('market-data-config');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(config, parsed);
        notifyConfigChange();
        return true;
      }
    } catch (error) {
      console.error('설정 로드 실패:', error);
    }
    return false;
  };

  // 설정 내보내기
  const exportConfig = () => {
    return JSON.stringify(config, null, 2);
  };

  // 설정 가져오기
  const importConfig = (configJson: string) => {
    try {
      const parsed = JSON.parse(configJson);
      Object.assign(config, parsed);
      notifyConfigChange();
      return true;
    } catch (error) {
      console.error('설정 가져오기 실패:', error);
      return false;
    }
  };

  return {
    // 상태
    config: readonly(config),

    // 함수들
    getConfig,
    updateConfig,
    setInterval,
    setEnabled,
    setGlobalEnabled,
    resetConfig,
    onConfigChange,
    recordUpdate,
    getStats,
    validateConfig,
    saveConfig,
    loadConfig,
    exportConfig,
    importConfig,
  };
}

// 전역 설정 인스턴스
export const realtimeConfig = useRealtimeConfig();
