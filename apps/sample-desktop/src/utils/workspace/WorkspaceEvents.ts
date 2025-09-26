/**
 * 워크스페이스 이벤트 시스템
 */

import type { WorkspaceLayout } from '../../types/workspace';
import type { ChartData } from '@template/types';

/**
 * 워크스페이스 이벤트 타입
 */
export type WorkspaceEventType =
  | 'workspace-changed'
  | 'workspace-saved'
  | 'workspace-deleted'
  | 'workspace-created'
  | 'chart-added'
  | 'chart-removed'
  | 'chart-updated'
  | 'auto-save-toggled'
  | 'workspace-sync-started'
  | 'workspace-sync-completed';

/**
 * 워크스페이스 이벤트 데이터
 */
export interface WorkspaceEventData {
  workspaceId: string;
  workspace?: WorkspaceLayout;
  chartId?: string;
  chart?: ChartData;
  timestamp: Date;
  metadata?: Record<string, any>;
}

/**
 * 워크스페이스 이벤트 클래스
 */
export class WorkspaceEventManager {
  private listeners: Map<WorkspaceEventType, Set<(data: WorkspaceEventData) => void>> = new Map();

  /**
   * 이벤트 리스너 등록
   */
  on(eventType: WorkspaceEventType, callback: (data: WorkspaceEventData) => void): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }

    this.listeners.get(eventType)!.add(callback);

    // 정리 함수 반환
    return () => {
      this.listeners.get(eventType)?.delete(callback);
    };
  }

  /**
   * 이벤트 발생
   */
  emit(eventType: WorkspaceEventType, data: Omit<WorkspaceEventData, 'timestamp'>): void {
    const eventData: WorkspaceEventData = {
      ...data,
      timestamp: new Date(),
    };

    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(eventData);
        } catch (error) {
          console.error(`워크스페이스 이벤트 처리 실패 (${eventType}):`, error);
        }
      });
    }

    // 전역 이벤트도 발생
    window.dispatchEvent(new CustomEvent(eventType, { detail: eventData }));
  }

  /**
   * 모든 리스너 제거
   */
  removeAllListeners(): void {
    this.listeners.clear();
  }

  /**
   * 특정 이벤트 타입의 리스너 제거
   */
  removeListeners(eventType: WorkspaceEventType): void {
    this.listeners.delete(eventType);
  }
}

// 싱글톤 인스턴스
export const workspaceEventManager = new WorkspaceEventManager();

/**
 * 워크스페이스 이벤트 헬퍼 함수들
 */
export const WorkspaceEventHelpers = {
  /**
   * 워크스페이스 변경 이벤트 발생
   */
  emitWorkspaceChanged(workspaceId: string, workspace?: WorkspaceLayout): void {
    workspaceEventManager.emit('workspace-changed', {
      workspaceId,
      workspace,
    });
  },

  /**
   * 워크스페이스 저장 이벤트 발생
   */
  emitWorkspaceSaved(workspaceId: string, workspace: WorkspaceLayout): void {
    workspaceEventManager.emit('workspace-saved', {
      workspaceId,
      workspace,
    });
  },

  /**
   * 워크스페이스 삭제 이벤트 발생
   */
  emitWorkspaceDeleted(workspaceId: string): void {
    workspaceEventManager.emit('workspace-deleted', {
      workspaceId,
    });
  },

  /**
   * 차트 추가 이벤트 발생
   */
  emitChartAdded(workspaceId: string, chart: ChartData): void {
    workspaceEventManager.emit('chart-added', {
      workspaceId,
      chartId: chart.id,
      chart,
    });
  },

  /**
   * 차트 제거 이벤트 발생
   */
  emitChartRemoved(workspaceId: string, chartId: string): void {
    workspaceEventManager.emit('chart-removed', {
      workspaceId,
      chartId,
    });
  },

  /**
   * 차트 업데이트 이벤트 발생
   */
  emitChartUpdated(workspaceId: string, chart: ChartData): void {
    workspaceEventManager.emit('chart-updated', {
      workspaceId,
      chartId: chart.id,
      chart,
    });
  },

  /**
   * 자동 저장 토글 이벤트 발생
   */
  emitAutoSaveToggled(workspaceId: string, enabled: boolean): void {
    workspaceEventManager.emit('auto-save-toggled', {
      workspaceId,
      metadata: { enabled },
    });
  },

  /**
   * 워크스페이스 동기화 시작 이벤트 발생
   */
  emitSyncStarted(workspaceId: string): void {
    workspaceEventManager.emit('workspace-sync-started', {
      workspaceId,
    });
  },

  /**
   * 워크스페이스 동기화 완료 이벤트 발생
   */
  emitSyncCompleted(workspaceId: string, chartCount: number): void {
    workspaceEventManager.emit('workspace-sync-completed', {
      workspaceId,
      metadata: { chartCount },
    });
  },
};

/**
 * 워크스페이스 이벤트 로깅
 */
export class WorkspaceEventLogger {
  private logs: WorkspaceEventData[] = [];
  private maxLogs = 100;

  constructor() {
    // 모든 이벤트를 로깅
    Object.values(WorkspaceEventHelpers).forEach((helper) => {
      if (typeof helper === 'function') {
        // 이벤트 리스너 등록은 실제 구현에서 처리
      }
    });
  }

  /**
   * 이벤트 로그 추가
   */
  addLog(eventData: WorkspaceEventData): void {
    this.logs.unshift(eventData);

    // 최대 로그 수 제한
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }
  }

  /**
   * 최근 로그 가져오기
   */
  getRecentLogs(count: number = 10): WorkspaceEventData[] {
    return this.logs.slice(0, count);
  }

  /**
   * 특정 워크스페이스의 로그 가져오기
   */
  getLogsForWorkspace(workspaceId: string): WorkspaceEventData[] {
    return this.logs.filter((log) => log.workspaceId === workspaceId);
  }

  /**
   * 로그 초기화
   */
  clearLogs(): void {
    this.logs = [];
  }
}

// 싱글톤 로거 인스턴스
export const workspaceEventLogger = new WorkspaceEventLogger();
