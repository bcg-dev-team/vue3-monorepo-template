<!--
  워크스페이스 드롭다운 컴포넌트
  Figma 링크: https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250923-?node-id=5763-34770&m=dev
-->
<template>
  <div class="workspace-dropdown" v-click-outside="closeDropdown">
    <!-- 워크스페이스 버튼 -->
    <button class="workspace-button" @click="toggleDropdown" :disabled="isLoading">
      <span class="workspace-name">
        {{ currentWorkspace?.name || '워크스페이스 선택' }}
      </span>
      <svg
        class="dropdown-icon"
        :class="{ rotated: isOpen }"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" fill="none" />
      </svg>
    </button>

    <!-- 드롭다운 패널 -->
    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-panel">
        <!-- 현재 워크스페이스 저장 섹션 -->
        <div class="save-section">
          <div class="input-container">
            <input
              v-model="newWorkspaceName"
              type="text"
              placeholder="워크스페이스 이름 입력"
              class="workspace-input"
              @keyup.enter="saveCurrentWorkspace"
              @blur="saveCurrentWorkspace"
            />
          </div>
        </div>

        <!-- 워크스페이스 목록 -->
        <div class="workspace-list">
          <div
            v-for="workspace in workspaces"
            :key="workspace.id"
            class="workspace-item"
            :class="{
              active: workspace.id === currentWorkspaceId,
              'custom-workspace': workspace.type === 'custom',
            }"
            @click="selectWorkspace(workspace.id)"
          >
            <div class="workspace-item-content">
              <span class="workspace-item-name">{{ workspace.name }}</span>
              <span v-if="workspace.type === 'custom'" class="custom-badge">내 워크스페이스</span>
            </div>
            <div class="workspace-actions">
              <button
                v-if="workspace.id !== currentWorkspaceId && workspace.type !== 'custom'"
                class="info-button"
                @click.stop="showWorkspaceInfo(workspace)"
                title="워크스페이스 정보"
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle
                    cx="9"
                    cy="9"
                    r="8"
                    stroke="currentColor"
                    stroke-width="1.5"
                    fill="none"
                  />
                  <path d="M9 6V9M9 12H9.01" stroke="currentColor" stroke-width="1.5" fill="none" />
                </svg>
              </button>
              <button
                v-if="workspace.type !== 'custom'"
                class="delete-button"
                @click.stop="deleteWorkspace(workspace.id)"
                title="워크스페이스 삭제"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path
                    d="M3 6H17M8 6V4C8 3.44772 8.44772 3 9 3H11C11.5523 3 12 3.44772 12 4V6M15 6V16C15 16.5523 14.5523 17 14 17H6C5.44772 17 5 16.5523 5 16V6H15Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useWorkspace } from '../../composables/useWorkspace';
import type { WorkspaceLayout } from '../../types/workspace';
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Props
interface Props {
  /** 드롭다운 열림 상태 */
  modelValue?: boolean;
}

// Emits
interface Emits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'workspace-selected', workspace: WorkspaceLayout): void;
  (e: 'workspace-saved', workspace: WorkspaceLayout): void;
  (e: 'workspace-deleted', workspaceId: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
});

const emit = defineEmits<Emits>();

// Composable
const {
  workspaces,
  currentWorkspace,
  currentWorkspaceId,
  isLoading,
  error,
  switchWorkspace,
  saveWorkspace,
  deleteWorkspace: deleteWorkspaceAction,
  createWorkspace,
} = useWorkspace();

// 상태
const isOpen = ref(false);
const newWorkspaceName = ref('');

// Computed
const isDropdownOpen = computed({
  get: () => isOpen.value,
  set: (value) => {
    isOpen.value = value;
    emit('update:modelValue', value);
  },
});

// 메서드
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const selectWorkspace = async (workspaceId: string) => {
  try {
    await switchWorkspace(workspaceId);
    const workspace = workspaces.value.find((w) => w.id === workspaceId);
    if (workspace) {
      emit('workspace-selected', workspace);
    }
    closeDropdown();
  } catch (err) {
    console.error('워크스페이스 선택 실패:', err);
  }
};

const saveCurrentWorkspace = async () => {
  if (!newWorkspaceName.value.trim()) return;

  try {
    const workspace = await createWorkspace(newWorkspaceName.value.trim());

    // 새로 생성된 워크스페이스로 자동 전환
    await switchWorkspace(workspace.id);

    emit('workspace-saved', workspace);
    newWorkspaceName.value = '';
    closeDropdown();
  } catch (err) {
    console.error('워크스페이스 저장 실패:', err);
  }
};

const deleteWorkspace = async (workspaceId: string) => {
  if (!confirm('워크스페이스를 삭제하시겠습니까?')) return;

  try {
    await deleteWorkspaceAction(workspaceId);
    emit('workspace-deleted', workspaceId);
  } catch (err) {
    console.error('워크스페이스 삭제 실패:', err);
  }
};

const showWorkspaceInfo = (workspace: WorkspaceLayout) => {
  // TODO: 워크스페이스 정보 모달 표시
  console.log('워크스페이스 정보:', workspace);
};

// 외부 클릭 감지
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    (el as any).clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    document.addEventListener('click', (el as any).clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', (el as any).clickOutsideEvent);
  },
};

// 키보드 이벤트 처리
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.workspace-dropdown {
  position: relative;
  display: inline-block;
}

.workspace-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #dadbdd;
  border-radius: 6px;
  font-size: 13px;
  color: #131313;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 200px;
}

.workspace-button:hover {
  border-color: #b4b6bb;
}

.workspace-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.workspace-name {
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-icon {
  transition: transform 0.2s;
  color: #333740;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #dadbdd;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 4px;
}

.save-section {
  padding: 8px;
  border-bottom: 1px solid #dadbdd;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #dadbdd;
  border-radius: 6px;
}

.workspace-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: #131313;
  background: transparent;
}

.workspace-input::placeholder {
  color: #b4b6bb;
}

.save-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333740;
  transition: color 0.2s;
}

.save-button:hover:not(:disabled) {
  color: #0067ef;
}

.save-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.workspace-list {
  max-height: 300px;
  overflow-y: auto;
}

.workspace-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 0.5px solid #dadbdd;
  cursor: pointer;
  transition: background-color 0.2s;
}

.workspace-item:last-child {
  border-bottom: none;
}

.workspace-item:hover {
  background: #f5f7f9;
}

.workspace-item.active {
  background: #f5f7f9;
}

.workspace-item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.workspace-item-name {
  font-size: 14px;
  color: #131313;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-badge {
  font-size: 11px;
  color: #0067ef;
  font-weight: 500;
}

.custom-workspace {
  background: #f0f7ff;
  border-left: 3px solid #0067ef;
}

.custom-workspace:hover {
  background: #e6f2ff;
}

.workspace-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-button,
.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: #b4b6bb;
  transition: color 0.2s;
}

.info-button:hover {
  color: #333740;
}

.delete-button:hover {
  color: #f63338;
}

/* 트랜지션 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
