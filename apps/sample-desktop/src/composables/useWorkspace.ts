/**
 * 워크스페이스 상태 관리 Composable
 */

import { workspaceStorage } from '../utils/workspace/WorkspaceStorage';
import type { WorkspaceLayout } from '../types/workspace';
import { ref, computed, watch } from 'vue';

/**
 * 워크스페이스 상태 관리 Composable
 */
export function useWorkspace() {
  // 반응형 상태
  const workspaces = ref<WorkspaceLayout[]>([]);
  const currentWorkspaceId = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // 현재 워크스페이스
  const currentWorkspace = computed(() => {
    if (!currentWorkspaceId.value) return null;
    return workspaces.value.find((w) => w.id === currentWorkspaceId.value) || null;
  });

  // 워크스페이스 목록 로드
  const loadWorkspaces = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      workspaceStorage.loadFromStorage();
      workspaces.value = workspaceStorage.getWorkspaces();
      currentWorkspaceId.value = workspaceStorage.getCurrentWorkspace()?.id || null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '워크스페이스 로드 실패';
      console.error('워크스페이스 로드 실패:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // 워크스페이스 전환
  const switchWorkspace = async (workspaceId: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      workspaceStorage.switchWorkspace(workspaceId);
      currentWorkspaceId.value = workspaceId;

      // 워크스페이스 전환 이벤트 발생
      window.dispatchEvent(
        new CustomEvent('workspace-changed', {
          detail: { workspaceId, workspace: workspaceStorage.getCurrentWorkspace() },
        })
      );
    } catch (err) {
      error.value = err instanceof Error ? err.message : '워크스페이스 전환 실패';
      console.error('워크스페이스 전환 실패:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // 워크스페이스 저장
  const saveWorkspace = async (workspace: WorkspaceLayout) => {
    try {
      isLoading.value = true;
      error.value = null;

      workspaceStorage.saveWorkspace(workspace);

      // 로컬 상태 업데이트
      const existingIndex = workspaces.value.findIndex((w) => w.id === workspace.id);
      if (existingIndex >= 0) {
        workspaces.value[existingIndex] = workspace;
      } else {
        workspaces.value.push(workspace);
      }

      // 현재 워크스페이스라면 업데이트
      if (currentWorkspaceId.value === workspace.id) {
        currentWorkspaceId.value = workspace.id;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '워크스페이스 저장 실패';
      console.error('워크스페이스 저장 실패:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // 워크스페이스 삭제
  const deleteWorkspace = async (workspaceId: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      workspaceStorage.deleteWorkspace(workspaceId);

      // 로컬 상태 업데이트
      workspaces.value = workspaces.value.filter((w) => w.id !== workspaceId);

      // 삭제된 워크스페이스가 현재 워크스페이스였다면 첫 번째 워크스페이스로 전환
      if (currentWorkspaceId.value === workspaceId) {
        currentWorkspaceId.value = workspaces.value.length > 0 ? workspaces.value[0].id : null;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '워크스페이스 삭제 실패';
      console.error('워크스페이스 삭제 실패:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // 새 워크스페이스 생성
  const createWorkspace = async (name: string, templateId?: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const newWorkspace = workspaceStorage.createWorkspace(name, templateId);
      workspaces.value.push(newWorkspace);

      return newWorkspace;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '워크스페이스 생성 실패';
      console.error('워크스페이스 생성 실패:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 워크스페이스 이름 변경
  const renameWorkspace = async (workspaceId: string, newName: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      workspaceStorage.renameWorkspace(workspaceId, newName);

      // 로컬 상태 업데이트
      const workspace = workspaces.value.find((w) => w.id === workspaceId);
      if (workspace) {
        workspace.name = newName;
        workspace.updatedAt = new Date();
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '워크스페이스 이름 변경 실패';
      console.error('워크스페이스 이름 변경 실패:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // 현재 워크스페이스 업데이트
  const updateCurrentWorkspace = async (updates: Partial<WorkspaceLayout>) => {
    if (!currentWorkspaceId.value) return;

    try {
      isLoading.value = true;
      error.value = null;

      workspaceStorage.updateCurrentWorkspace(updates);

      // 로컬 상태 업데이트
      const workspace = workspaces.value.find((w) => w.id === currentWorkspaceId.value);
      if (workspace) {
        Object.assign(workspace, updates, { updatedAt: new Date() });
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : '워크스페이스 업데이트 실패';
      console.error('워크스페이스 업데이트 실패:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // 워크스페이스 변경 이벤트 리스너
  const onWorkspaceChanged = (
    callback: (workspaceId: string, workspace: WorkspaceLayout | null) => void
  ) => {
    const handler = (event: CustomEvent) => {
      callback(event.detail.workspaceId, event.detail.workspace);
    };

    window.addEventListener('workspace-changed', handler as EventListener);

    // 정리 함수 반환
    return () => {
      window.removeEventListener('workspace-changed', handler as EventListener);
    };
  };

  // 커스텀 워크스페이스 업데이트 (차트 상태 동기화)
  const updateCustomWorkspace = async (chartData: any[]) => {
    try {
      workspaceStorage.updateCustomWorkspace(chartData);
      
      // 로컬 상태 업데이트
      const customWorkspace = workspaces.value.find((w) => w.id === 'custom-workspace');
      if (customWorkspace) {
        customWorkspace.updatedAt = new Date();
      }
    } catch (err) {
      console.error('커스텀 워크스페이스 업데이트 실패:', err);
    }
  };

  // 커스텀 워크스페이스에서 차트 데이터 로드
  const loadCustomWorkspace = () => {
    return workspaceStorage.loadCustomWorkspace();
  };

  // 커스텀 워크스페이스가 활성화되어 있는지 확인
  const isCustomWorkspaceActive = () => {
    return workspaceStorage.isCustomWorkspaceActive();
  };

  // 초기 로드
  loadWorkspaces();

  return {
    // 상태
    workspaces: computed(() => workspaces.value),
    currentWorkspace,
    currentWorkspaceId: computed(() => currentWorkspaceId.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),

    // 액션
    loadWorkspaces,
    switchWorkspace,
    saveWorkspace,
    deleteWorkspace,
    createWorkspace,
    renameWorkspace,
    updateCurrentWorkspace,
    onWorkspaceChanged,
    
    // 커스텀 워크스페이스 액션
    updateCustomWorkspace,
    loadCustomWorkspace,
    isCustomWorkspaceActive,
  };
}
