/**
 * 워크스페이스 로컬 스토리지 관리 유틸리티
 */

import type { WorkspaceLayout, WorkspaceStorage, WorkspaceTemplate } from '../../types/workspace';

const STORAGE_KEY = 'moda_workspaces';
const DEFAULT_TEMPLATES: WorkspaceTemplate[] = [
  {
    id: 'multi-timeframe-basic',
    name: '다중 시간대 분석(기본)',
    description: '단일 통화쌍 장기 트렌드부터 진입점까지 분석하는 템플릿입니다.',
    defaultLayout: {},
    defaultWindows: [
      {
        symbol: 'EURUSD',
        interval: '1D',
        position: { x: 0, y: 0, width: 400, height: 300 },
        settings: {},
      },
      {
        symbol: 'EURUSD',
        interval: '4H',
        position: { x: 400, y: 0, width: 400, height: 300 },
        settings: {},
      },
      {
        symbol: 'EURUSD',
        interval: '1H',
        position: { x: 0, y: 300, width: 400, height: 300 },
        settings: {},
      },
    ],
  },
  {
    id: 'multi-timeframe-advanced',
    name: '다중 시간대 분석(심층)',
    description: '기관투자자급 완전 분석 템플릿입니다.',
    defaultLayout: {},
    defaultWindows: [
      {
        symbol: 'EURUSD',
        interval: '1W',
        position: { x: 0, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'EURUSD',
        interval: '1D',
        position: { x: 300, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'EURUSD',
        interval: '4H',
        position: { x: 600, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'EURUSD',
        interval: '1H',
        position: { x: 0, y: 200, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'EURUSD',
        interval: '15m',
        position: { x: 300, y: 200, width: 300, height: 200 },
        settings: {},
      },
    ],
  },
  {
    id: 'major-pairs-basic',
    name: '주요 통화쌍(기본)',
    description: '달러 강세/약세 확인, 주요 통화쌍 상대적 강도를 비교하는 템플릿입니다.',
    defaultLayout: {},
    defaultWindows: [
      {
        symbol: 'EURUSD',
        interval: '1H',
        position: { x: 0, y: 0, width: 400, height: 300 },
        settings: {},
      },
      {
        symbol: 'GBPUSD',
        interval: '1H',
        position: { x: 400, y: 0, width: 400, height: 300 },
        settings: {},
      },
      {
        symbol: 'USDJPY',
        interval: '1H',
        position: { x: 0, y: 300, width: 400, height: 300 },
        settings: {},
      },
      {
        symbol: 'USDCHF',
        interval: '1H',
        position: { x: 400, y: 300, width: 400, height: 300 },
        settings: {},
      },
    ],
  },
  {
    id: 'major-pairs-advanced',
    name: '주요 통화쌍(심층)',
    description: '글로벌 FX 시장 전체 모니터링, 상관관계를 분석하는 템플릿입니다.',
    defaultLayout: {},
    defaultWindows: [
      {
        symbol: 'EURUSD',
        interval: '1H',
        position: { x: 0, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'GBPUSD',
        interval: '1H',
        position: { x: 300, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'USDJPY',
        interval: '1H',
        position: { x: 600, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'USDCHF',
        interval: '1H',
        position: { x: 0, y: 200, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'AUDUSD',
        interval: '1H',
        position: { x: 300, y: 200, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'USDCAD',
        interval: '1H',
        position: { x: 600, y: 200, width: 300, height: 200 },
        settings: {},
      },
    ],
  },
  {
    id: 'scalping',
    name: '스캘핑',
    description: '초단타 거래, 2-5pips를 목표로 하는 템플릿입니다.',
    defaultLayout: {},
    defaultWindows: [
      {
        symbol: 'EURUSD',
        interval: '1m',
        position: { x: 0, y: 0, width: 600, height: 400 },
        settings: {},
      },
      {
        symbol: 'GBPUSD',
        interval: '1m',
        position: { x: 600, y: 0, width: 600, height: 200 },
        settings: {},
      },
      {
        symbol: 'USDJPY',
        interval: '1m',
        position: { x: 600, y: 200, width: 600, height: 200 },
        settings: {},
      },
    ],
  },
  {
    id: 'day-trading',
    name: '데이트레이딩',
    description: '일중 거래, 20-50 pips를 목표로 하는 템플릿입니다.',
    defaultLayout: {},
    defaultWindows: [
      {
        symbol: 'EURUSD',
        interval: '15m',
        position: { x: 0, y: 0, width: 500, height: 300 },
        settings: {},
      },
      {
        symbol: 'GBPUSD',
        interval: '15m',
        position: { x: 500, y: 0, width: 500, height: 300 },
        settings: {},
      },
      {
        symbol: 'USDJPY',
        interval: '15m',
        position: { x: 0, y: 300, width: 500, height: 300 },
        settings: {},
      },
      {
        symbol: 'USDCHF',
        interval: '15m',
        position: { x: 500, y: 300, width: 500, height: 300 },
        settings: {},
      },
    ],
  },
  {
    id: 'correlation-monitoring',
    name: '상관종목 모니터링',
    description: '헤지펀드 스타일 매크로 분석, 포트폴리오 리스크를 관리하는 템플릿입니다.',
    defaultLayout: {},
    defaultWindows: [
      {
        symbol: 'EURUSD',
        interval: '1H',
        position: { x: 0, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'GBPUSD',
        interval: '1H',
        position: { x: 300, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'USDJPY',
        interval: '1H',
        position: { x: 600, y: 0, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'XAUUSD',
        interval: '1H',
        position: { x: 0, y: 200, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'XAGUSD',
        interval: '1H',
        position: { x: 300, y: 200, width: 300, height: 200 },
        settings: {},
      },
      {
        symbol: 'USOIL',
        interval: '1H',
        position: { x: 600, y: 200, width: 300, height: 200 },
        settings: {},
      },
    ],
  },
];

/**
 * 워크스페이스 스토리지 관리 클래스
 */
export class WorkspaceStorageManager {
  private storage: WorkspaceStorage;

  constructor() {
    this.storage = {
      workspaces: [],
      currentWorkspaceId: null,
      lastUsed: new Date(),
    };
    this.loadFromStorage();
  }

  /**
   * 로컬 스토리지에서 워크스페이스 데이터 로드
   */
  loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.storage = {
          ...parsed,
          workspaces: parsed.workspaces.map((w: any) => ({
            ...w,
            createdAt: new Date(w.createdAt),
            updatedAt: new Date(w.updatedAt),
          })),
          lastUsed: new Date(parsed.lastUsed),
        };
      } else {
        // 기본 템플릿들을 워크스페이스로 생성
        this.initializeDefaultWorkspaces();
      }
    } catch (error) {
      console.error('워크스페이스 데이터 로드 실패:', error);
      this.initializeDefaultWorkspaces();
    }
  }

  /**
   * 로컬 스토리지에 워크스페이스 데이터 저장
   */
  saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.storage));
    } catch (error) {
      console.error('워크스페이스 데이터 저장 실패:', error);
    }
  }

  /**
   * 기본 워크스페이스 초기화
   */
  private initializeDefaultWorkspaces(): void {
    const now = new Date();
    this.storage.workspaces = DEFAULT_TEMPLATES.map((template, index) => ({
      id: template.id,
      name: template.name,
      layout: template.defaultLayout,
      windows: template.defaultWindows.map((window, windowIndex) => ({
        id: `${template.id}-window-${windowIndex}`,
        ...window,
      })),
      createdAt: now,
      updatedAt: now,
      type: 'template' as const,
    }));

    // 커스텀 워크스페이스 추가
    const customWorkspace: WorkspaceLayout = {
      id: 'custom-workspace',
      name: '내 워크스페이스',
      layout: {},
      windows: [],
      createdAt: now,
      updatedAt: now,
      type: 'custom',
      autoSave: true,
    };

    this.storage.workspaces.push(customWorkspace);

    // 커스텀 워크스페이스를 현재 워크스페이스로 설정
    this.storage.currentWorkspaceId = customWorkspace.id;

    this.saveToStorage();
  }

  /**
   * 모든 워크스페이스 목록 가져오기
   */
  getWorkspaces(): WorkspaceLayout[] {
    return [...this.storage.workspaces];
  }

  /**
   * 현재 워크스페이스 가져오기
   */
  getCurrentWorkspace(): WorkspaceLayout | null {
    if (!this.storage.currentWorkspaceId) {
      return null;
    }
    return this.storage.workspaces.find((w) => w.id === this.storage.currentWorkspaceId) || null;
  }

  /**
   * 워크스페이스 저장
   */
  saveWorkspace(workspace: WorkspaceLayout): void {
    const existingIndex = this.storage.workspaces.findIndex((w) => w.id === workspace.id);

    if (existingIndex >= 0) {
      // 기존 워크스페이스 업데이트
      this.storage.workspaces[existingIndex] = {
        ...workspace,
        updatedAt: new Date(),
      };
    } else {
      // 새 워크스페이스 추가
      this.storage.workspaces.push({
        ...workspace,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    this.saveToStorage();
  }

  /**
   * 워크스페이스 삭제
   */
  deleteWorkspace(workspaceId: string): void {
    this.storage.workspaces = this.storage.workspaces.filter((w) => w.id !== workspaceId);

    // 삭제된 워크스페이스가 현재 워크스페이스였다면 첫 번째 워크스페이스로 전환
    if (this.storage.currentWorkspaceId === workspaceId) {
      this.storage.currentWorkspaceId =
        this.storage.workspaces.length > 0 ? this.storage.workspaces[0].id : null;
    }

    this.saveToStorage();
  }

  /**
   * 워크스페이스 전환
   */
  switchWorkspace(workspaceId: string): void {
    const workspace = this.storage.workspaces.find((w) => w.id === workspaceId);
    if (workspace) {
      this.storage.currentWorkspaceId = workspaceId;
      this.storage.lastUsed = new Date();
      this.saveToStorage();
    }
  }

  /**
   * 현재 워크스페이스 업데이트
   */
  updateCurrentWorkspace(updates: Partial<WorkspaceLayout>): void {
    const currentWorkspace = this.getCurrentWorkspace();
    if (currentWorkspace) {
      const updatedWorkspace = {
        ...currentWorkspace,
        ...updates,
        updatedAt: new Date(),
      };
      this.saveWorkspace(updatedWorkspace);
    }
  }

  /**
   * 새 워크스페이스 생성
   */
  createWorkspace(name: string, templateId?: string): WorkspaceLayout {
    const id = `workspace-${Date.now()}`;
    const now = new Date();

    let defaultWindows: Omit<WorkspaceLayout['windows'][0], 'id'>[] = [];
    if (templateId) {
      const template = DEFAULT_TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        defaultWindows = template.defaultWindows;
      }
    }

    const newWorkspace: WorkspaceLayout = {
      id,
      name,
      layout: {},
      windows: defaultWindows.map((window, index) => ({
        id: `${id}-window-${index}`,
        ...window,
      })),
      createdAt: now,
      updatedAt: now,
      type: 'custom',
      autoSave: true,
    };

    this.saveWorkspace(newWorkspace);
    return newWorkspace;
  }

  /**
   * 워크스페이스 이름 변경
   */
  renameWorkspace(workspaceId: string, newName: string): void {
    const workspace = this.storage.workspaces.find((w) => w.id === workspaceId);
    if (workspace) {
      workspace.name = newName;
      workspace.updatedAt = new Date();
      this.saveToStorage();
    }
  }

  /**
   * 커스텀 워크스페이스 업데이트 (차트 상태 동기화)
   */
  updateCustomWorkspace(chartData: any[]): void {
    const customWorkspace = this.storage.workspaces.find((w) => w.id === 'custom-workspace');
    if (!customWorkspace) return;

    // 차트 데이터를 워크스페이스 윈도우로 변환
    customWorkspace.windows = chartData.map((chart, index) => ({
      id: `custom-window-${index}`,
      symbol: chart.symbol || 'EURUSD',
      interval: chart.timeframe || '1h',
      position: {
        x: chart.position?.x || 0,
        y: chart.position?.y || 0,
        width: chart.position?.width || 400,
        height: chart.position?.height || 300,
      },
      settings: chart.settings || {},
      state: {
        isSelected: chart.isSelected || false,
        syncColor: chart.syncColor,
      },
    }));

    customWorkspace.updatedAt = new Date();
    this.saveToStorage();
  }

  /**
   * 커스텀 워크스페이스에서 차트 데이터 로드
   */
  loadCustomWorkspace(): any[] {
    const customWorkspace = this.storage.workspaces.find((w) => w.id === 'custom-workspace');
    if (!customWorkspace) return [];

    return customWorkspace.windows.map((window, index) => ({
      id: `chart-${index}`,
      symbol: window.symbol,
      timeframe: window.interval,
      isSelected: window.state?.isSelected || false,
      syncColor: window.state?.syncColor,
      position: window.position,
      settings: window.settings,
    }));
  }

  /**
   * 커스텀 워크스페이스가 활성화되어 있는지 확인
   */
  isCustomWorkspaceActive(): boolean {
    return this.storage.currentWorkspaceId === 'custom-workspace';
  }
}

// 싱글톤 인스턴스
export const workspaceStorage = new WorkspaceStorageManager();
