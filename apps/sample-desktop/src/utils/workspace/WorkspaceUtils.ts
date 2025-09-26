/**
 * 워크스페이스 유틸리티 함수들
 */

import type { WorkspaceLayout, WorkspaceWindow } from '../../types/workspace';
import type { ChartData } from '@template/types';

/**
 * 차트 데이터를 워크스페이스 윈도우로 변환
 */
export function chartDataToWorkspaceWindow(chart: ChartData, index: number): WorkspaceWindow {
  return {
    id: `window-${index}`,
    symbol: chart.symbol as unknown as string,
    interval: chart.timeframe,
    position: {
      x: (chart.position as any)?.x || 0,
      y: (chart.position as any)?.y || 0,
      width: (chart.position as any)?.width || 400,
      height: (chart.position as any)?.height || 300,
    },
    settings: (chart as any).settings || {},
    state: {
      isSelected: chart.isSelected || false,
      syncColor: chart.syncColor,
    },
  };
}

/**
 * 워크스페이스 윈도우를 차트 데이터로 변환
 */
export function workspaceWindowToChartData(window: WorkspaceWindow, index: number): ChartData {
  return {
    id: `chart-${index}`,
    symbol: window.symbol as any,
    timeframe: window.interval,
    isSelected: window.state?.isSelected || false,
    syncColor: window.state?.syncColor,
    position: {
      row: Math.floor(window.position.y / 100),
      col: Math.floor(window.position.x / 100),
    },
  } as ChartData;
}

/**
 * 워크스페이스 레이아웃을 차트 데이터 배열로 변환
 */
export function workspaceToChartData(workspace: WorkspaceLayout): ChartData[] {
  return workspace.windows.map((window, index) => workspaceWindowToChartData(window, index));
}

/**
 * 차트 데이터 배열을 워크스페이스 윈도우 배열로 변환
 */
export function chartDataToWorkspaceWindows(charts: ChartData[]): WorkspaceWindow[] {
  return charts.map((chart, index) => chartDataToWorkspaceWindow(chart, index));
}

/**
 * 워크스페이스가 커스텀 워크스페이스인지 확인
 */
export function isCustomWorkspace(workspace: WorkspaceLayout): boolean {
  return workspace.type === 'custom';
}

/**
 * 워크스페이스가 자동 저장 가능한지 확인
 */
export function isAutoSaveEnabled(workspace: WorkspaceLayout): boolean {
  return workspace.autoSave === true;
}

/**
 * 워크스페이스 이름 생성 (중복 방지)
 */
export function generateWorkspaceName(
  existingNames: string[],
  baseName: string = '새 워크스페이스'
): string {
  let counter = 1;
  let name = baseName;

  while (existingNames.includes(name)) {
    name = `${baseName} ${counter}`;
    counter++;
  }

  return name;
}

/**
 * 워크스페이스 백업 생성
 */
export function createWorkspaceBackup(workspace: WorkspaceLayout): WorkspaceLayout {
  return {
    ...workspace,
    id: `${workspace.id}-backup-${Date.now()}`,
    name: `${workspace.name} (백업)`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * 워크스페이스 복원
 */
export function restoreWorkspaceFromBackup(backup: WorkspaceLayout): WorkspaceLayout {
  return {
    ...backup,
    id: `workspace-${Date.now()}`,
    name: backup.name.replace(' (백업)', ''),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * 워크스페이스 크기 계산 (차트 개수)
 */
export function getWorkspaceSize(workspace: WorkspaceLayout): number {
  return workspace.windows.length;
}

/**
 * 워크스페이스가 비어있는지 확인
 */
export function isEmptyWorkspace(workspace: WorkspaceLayout): boolean {
  return workspace.windows.length === 0;
}

/**
 * 워크스페이스 마지막 활동 시간 포맷팅
 */
export function formatLastActivity(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return date.toLocaleDateString('ko-KR');
}

/**
 * 워크스페이스 통계 정보
 */
export interface WorkspaceStats {
  totalCharts: number;
  symbols: string[];
  timeframes: string[];
  lastActivity: string;
  size: 'small' | 'medium' | 'large';
}

/**
 * 워크스페이스 통계 계산
 */
export function calculateWorkspaceStats(workspace: WorkspaceLayout): WorkspaceStats {
  const symbols = [...new Set(workspace.windows.map((w) => w.symbol))];
  const timeframes = [...new Set(workspace.windows.map((w) => w.interval))];
  const totalCharts = workspace.windows.length;

  let size: 'small' | 'medium' | 'large' = 'small';
  if (totalCharts > 6) size = 'large';
  else if (totalCharts > 3) size = 'medium';

  return {
    totalCharts,
    symbols,
    timeframes,
    lastActivity: formatLastActivity(workspace.updatedAt),
    size,
  };
}
