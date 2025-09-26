/**
 * 워크스페이스와 차트 상태 동기화 Composable
 */

import { WorkspaceEventHelpers } from '../utils/workspace/WorkspaceEvents';
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { ChartData } from '@template/types';
import { useWorkspace } from './useWorkspace';

/**
 * 워크스페이스와 차트 상태 동기화
 */
export function useWorkspaceSync() {
  const {
    updateCustomWorkspace,
    loadCustomWorkspace,
    isCustomWorkspaceActive,
    currentWorkspaceId,
  } = useWorkspace();

  // 차트 데이터 상태
  const charts = ref<ChartData[]>([]);
  const isAutoSaveEnabled = ref(true);
  const lastSavedTime = ref<Date | null>(null);

  // 자동 저장 디바운스 타이머
  let saveTimeout: NodeJS.Timeout | null = null;

  /**
   * 차트 데이터를 워크스페이스에 저장
   */
  const saveChartsToWorkspace = async (chartData: ChartData[]) => {
    // 커스텀 워크스페이스가 활성화되어 있고 자동 저장이 활성화된 경우에만 저장
    if (!isCustomWorkspaceActive() || !isAutoSaveEnabled.value) {
      console.log('저장 조건 미충족:', {
        isCustomActive: isCustomWorkspaceActive(),
        autoSaveEnabled: isAutoSaveEnabled.value,
      });
      return;
    }

    try {
      console.log('워크스페이스 저장 시작:', chartData.length, '개 차트');
      WorkspaceEventHelpers.emitSyncStarted('custom-workspace');

      await updateCustomWorkspace(chartData);
      lastSavedTime.value = new Date();

      WorkspaceEventHelpers.emitSyncCompleted('custom-workspace', chartData.length);
      console.log('✅ 워크스페이스에 차트 상태 저장 완료:', chartData.length, '개 차트');
    } catch (error) {
      console.error('❌ 워크스페이스 저장 실패:', error);
    }
  };

  /**
   * 디바운스된 자동 저장
   */
  const debouncedSave = (chartData: ChartData[]) => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    saveTimeout = setTimeout(() => {
      saveChartsToWorkspace(chartData);
    }, 500); // 0.5초 디바운스로 더 빠른 반응
  };

  /**
   * 워크스페이스에서 차트 데이터 로드
   */
  const loadChartsFromWorkspace = (): ChartData[] => {
    if (!isCustomWorkspaceActive()) return [];

    try {
      const savedCharts = loadCustomWorkspace();
      console.log('워크스페이스에서 차트 상태 로드됨:', savedCharts.length, '개 차트');
      return savedCharts;
    } catch (error) {
      console.error('워크스페이스 로드 실패:', error);
      return [];
    }
  };

  /**
   * 차트 데이터 업데이트
   */
  const updateCharts = (newCharts: ChartData[]) => {
    charts.value = newCharts;

    // 커스텀 워크스페이스가 활성화되어 있으면 자동 저장
    if (isCustomWorkspaceActive()) {
      debouncedSave(newCharts);
    }
  };

  /**
   * 특정 차트 업데이트
   */
  const updateChart = (chartId: string, updates: Partial<ChartData>) => {
    const chartIndex = charts.value.findIndex((c) => c.id === chartId);
    if (chartIndex >= 0) {
      charts.value[chartIndex] = { ...charts.value[chartIndex], ...updates };

      console.log('차트 업데이트:', chartId, updates);

      // 커스텀 워크스페이스가 활성화되어 있으면 자동 저장
      if (isCustomWorkspaceActive()) {
        console.log('자동 저장 트리거:', charts.value.length, '개 차트');
        debouncedSave(charts.value);
      } else {
        console.log('커스텀 워크스페이스가 비활성화됨, 저장하지 않음');
      }
    }
  };

  /**
   * 차트 추가
   */
  const addChart = (chart: ChartData) => {
    charts.value.push(chart);

    // 이벤트 발생
    WorkspaceEventHelpers.emitChartAdded('custom-workspace', chart);

    // 커스텀 워크스페이스가 활성화되어 있으면 자동 저장
    if (isCustomWorkspaceActive()) {
      debouncedSave(charts.value);
    }
  };

  /**
   * 차트 제거
   */
  const removeChart = (chartId: string) => {
    charts.value = charts.value.filter((c) => c.id !== chartId);

    // 이벤트 발생
    WorkspaceEventHelpers.emitChartRemoved('custom-workspace', chartId);

    // 커스텀 워크스페이스가 활성화되어 있으면 자동 저장
    if (isCustomWorkspaceActive()) {
      debouncedSave(charts.value);
    }
  };

  /**
   * 워크스페이스 전환 시 차트 데이터 로드
   */
  const handleWorkspaceChange = (workspaceId: string) => {
    console.log('워크스페이스 변경 감지:', workspaceId);

    if (workspaceId === 'custom-workspace') {
      // 커스텀 워크스페이스로 전환 시 저장된 차트 데이터 로드
      const savedCharts = loadChartsFromWorkspace();
      if (savedCharts.length > 0) {
        charts.value = savedCharts;
        console.log('커스텀 워크스페이스 로드됨:', savedCharts.length, '개 차트');
      }
    } else {
      // 템플릿 워크스페이스로 전환 시 현재 차트 상태를 커스텀 워크스페이스에 저장
      if (charts.value.length > 0) {
        saveChartsToWorkspace(charts.value);
      }
    }

    // 워크스페이스 변경 이벤트 emit
    WorkspaceEventHelpers.emitWorkspaceChanged(workspaceId);
  };

  /**
   * 자동 저장 활성화/비활성화
   */
  const toggleAutoSave = (enabled: boolean) => {
    isAutoSaveEnabled.value = enabled;

    // 이벤트 발생
    WorkspaceEventHelpers.emitAutoSaveToggled('custom-workspace', enabled);

    console.log('자동 저장', enabled ? '활성화' : '비활성화');
  };

  /**
   * 수동 저장
   */
  const manualSave = async () => {
    if (isCustomWorkspaceActive()) {
      await saveChartsToWorkspace(charts.value);
    }
  };

  // 워크스페이스 변경 감시
  watch(currentWorkspaceId, (newWorkspaceId, oldWorkspaceId) => {
    if (newWorkspaceId !== oldWorkspaceId) {
      handleWorkspaceChange(newWorkspaceId || '');
    }
  });

  // 컴포넌트 마운트 시 초기 로드
  onMounted(() => {
    if (isCustomWorkspaceActive()) {
      const savedCharts = loadChartsFromWorkspace();
      if (savedCharts.length > 0) {
        charts.value = savedCharts;
      }
    }
  });

  // 컴포넌트 언마운트 시 정리
  onUnmounted(() => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
  });

  return {
    // 상태
    charts: computed(() => charts.value),
    isAutoSaveEnabled: computed(() => isAutoSaveEnabled.value),
    lastSavedTime: computed(() => lastSavedTime.value),
    isCustomWorkspaceActive: computed(() => isCustomWorkspaceActive()),

    // 액션
    updateCharts,
    updateChart,
    addChart,
    removeChart,
    saveChartsToWorkspace,
    loadChartsFromWorkspace,
    toggleAutoSave,
    manualSave,
    handleWorkspaceChange,
  };
}
