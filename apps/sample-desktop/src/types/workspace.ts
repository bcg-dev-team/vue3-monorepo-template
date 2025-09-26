/**
 * 워크스페이스 관련 타입 정의
 */

export interface WorkspaceLayout {
  /** 레이아웃 ID */
  id: string;
  /** 레이아웃 이름 */
  name: string;
  /** 레이아웃 설정 (TradingView layout) */
  layout: any;
  /** 차트 윈도우 설정들 */
  windows: WorkspaceWindow[];
  /** 생성 시간 */
  createdAt: Date;
  /** 마지막 수정 시간 */
  updatedAt: Date;
  /** 워크스페이스 타입 */
  type: 'template' | 'custom';
  /** 자동 저장 여부 (커스텀 워크스페이스만) */
  autoSave?: boolean;
}

export interface WorkspaceWindow {
  /** 윈도우 ID */
  id: string;
  /** 차트 심볼 */
  symbol: string;
  /** 시간 간격 */
  interval: string;
  /** 윈도우 위치 및 크기 */
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** 차트 설정 */
  settings: any;
  /** 차트 상태 (선택됨, 동기화 색상 등) */
  state?: {
    isSelected?: boolean;
    syncColor?: string;
  };
}

export interface WorkspaceTemplate {
  /** 템플릿 ID */
  id: string;
  /** 템플릿 이름 */
  name: string;
  /** 템플릿 설명 */
  description: string;
  /** 기본 레이아웃 설정 */
  defaultLayout: any;
  /** 기본 차트 윈도우들 */
  defaultWindows: Omit<WorkspaceWindow, 'id'>[];
}

/**
 * 워크스페이스 저장소 인터페이스
 */
export interface WorkspaceStorage {
  /** 모든 워크스페이스 목록 */
  workspaces: WorkspaceLayout[];
  /** 현재 활성 워크스페이스 ID */
  currentWorkspaceId: string | null;
  /** 마지막 사용 시간 */
  lastUsed: Date;
}

/**
 * 워크스페이스 관리자 인터페이스
 */
export interface WorkspaceManager {
  /** 워크스페이스 목록 가져오기 */
  getWorkspaces(): WorkspaceLayout[];
  /** 현재 워크스페이스 가져오기 */
  getCurrentWorkspace(): WorkspaceLayout | null;
  /** 워크스페이스 저장 */
  saveWorkspace(workspace: WorkspaceLayout): void;
  /** 워크스페이스 삭제 */
  deleteWorkspace(workspaceId: string): void;
  /** 워크스페이스 전환 */
  switchWorkspace(workspaceId: string): void;
  /** 현재 워크스페이스 업데이트 */
  updateCurrentWorkspace(updates: Partial<WorkspaceLayout>): void;
  /** 로컬 스토리지에서 로드 */
  loadFromStorage(): void;
  /** 로컬 스토리지에 저장 */
  saveToStorage(): void;
}
