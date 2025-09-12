<template>
  <div class="realtime-config-panel">
    <div class="config-header">
      <h3 class="config-title">⚙️ 시장 데이터 업데이트 설정</h3>
      <div class="config-actions">
        <button @click="togglePanel" class="toggle-button">
          {{ isExpanded ? '접기' : '펼치기' }}
        </button>
        <button @click="resetConfig" class="reset-button">초기화</button>
      </div>
    </div>

    <div v-if="isExpanded" class="config-content">
      <!-- 시장 데이터 설정 -->
      <div class="market-config">
        <div class="area-controls">
          <div class="control-group">
            <label class="control-label">업데이트 간격</label>
          </div>

          <div class="preset-buttons">
            <button
              v-for="preset in intervalPresets"
              :key="preset.value"
              @click="setPresetInterval(preset.value)"
              :disabled="!marketConfig.enabled"
              class="preset-button"
              :class="{ active: marketConfig.interval === preset.value }"
            >
              {{ preset.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- 통계 정보 -->
      <div class="stats-section">
        <h4 class="stats-title">📊 업데이트 통계</h4>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-name">시장 데이터</span>
            <span class="stat-status" :class="getStatusClass()">
              {{ getStatusText() }}
            </span>
          </div>
          <div class="stat-details">
            <div class="stat-item">
              <span class="stat-label">간격:</span>
              <span class="stat-value">{{ marketConfig.interval }}ms</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">업데이트:</span>
              <span class="stat-value">{{ marketConfig.updateCount }}회</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">마지막:</span>
              <span class="stat-value">{{ formatTime(marketConfig.lastUpdate) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 설정 관리 -->
      <div class="config-management">
        <h4 class="management-title">💾 설정 관리</h4>
        <div class="management-actions">
          <button @click="saveConfig" class="action-button save">설정 저장</button>
          <button @click="loadConfig" class="action-button load">설정 불러오기</button>
          <button @click="exportConfig" class="action-button export">설정 내보내기</button>
          <input
            ref="importInput"
            type="file"
            accept=".json"
            @change="importConfig"
            style="display: none"
          />
          <button @click="triggerImport" class="action-button import">설정 가져오기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { realtimeConfig } from '@/composables/useRealtimeConfig';
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 상태
const isExpanded = ref(false);
const config = ref(realtimeConfig.getConfig());
const importInput = ref<HTMLInputElement>();

// 시장 데이터 설정
const marketConfig = computed(() => {
  const stats = realtimeConfig.getStats();
  return stats.market;
});

// 간격 프리셋
const intervalPresets = [
  { label: '0.1초', value: 100 },
  { label: '0.5초', value: 500 },
  { label: '1초', value: 1000 },
  { label: '2초', value: 2000 },
  { label: '5초', value: 5000 },
  { label: '10초', value: 10000 },
];

// 함수들
const togglePanel = () => {
  isExpanded.value = !isExpanded.value;
};

const updateGlobalEnabled = () => {
  realtimeConfig.setGlobalEnabled(config.value.globalEnabled);
};

const updateMarketEnabled = (enabled: boolean) => {
  console.log(`🔄 시장 데이터 활성화 변경: ${enabled ? '활성' : '비활성'}`);
  realtimeConfig.setEnabled('market', enabled);
};

const updateMarketInterval = (interval: number) => {
  console.log(`🔄 시장 데이터 간격 변경: ${interval}ms`);
  realtimeConfig.setInterval('market', interval);
};

const setPresetInterval = (interval: number) => {
  realtimeConfig.setInterval('market', interval);
};

const resetConfig = () => {
  if (confirm('설정을 초기화하시겠습니까?')) {
    realtimeConfig.resetConfig();
    config.value = realtimeConfig.getConfig();
  }
};

const saveConfig = () => {
  const success = realtimeConfig.saveConfig();
  if (success) {
    alert('설정이 저장되었습니다.');
  } else {
    alert('설정 저장에 실패했습니다.');
  }
};

const loadConfig = () => {
  const success = realtimeConfig.loadConfig();
  if (success) {
    config.value = realtimeConfig.getConfig();
    alert('설정을 불러왔습니다.');
  } else {
    alert('저장된 설정이 없습니다.');
  }
};

const exportConfig = () => {
  const configJson = realtimeConfig.exportConfig();
  const blob = new Blob([configJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'market-data-config.json';
  a.click();
  URL.revokeObjectURL(url);
};

const triggerImport = () => {
  importInput.value?.click();
};

const importConfig = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const configJson = e.target?.result as string;
    const success = realtimeConfig.importConfig(configJson);
    if (success) {
      config.value = realtimeConfig.getConfig();
      alert('설정을 가져왔습니다.');
    } else {
      alert('설정 가져오기에 실패했습니다.');
    }
  };
  reader.readAsText(file);
};

const formatTime = (date: Date | null) => {
  if (!date) return '없음';
  return date.toLocaleTimeString();
};

const getStatusClass = () => {
  if (!marketConfig.value.enabled) return 'disabled';
  if (marketConfig.value.timeSinceLastUpdate === null) return 'waiting';
  if (marketConfig.value.timeSinceLastUpdate < marketConfig.value.interval) return 'active';
  return 'stale';
};

const getStatusText = () => {
  if (!marketConfig.value.enabled) return '비활성';
  if (marketConfig.value.timeSinceLastUpdate === null) return '대기중';
  if (marketConfig.value.timeSinceLastUpdate < marketConfig.value.interval) return '활성';
  return '지연';
};

// 설정 변경 감지
let unsubscribe: (() => void) | null = null;

onMounted(() => {
  unsubscribe = realtimeConfig.onConfigChange((newConfig) => {
    config.value = newConfig;
  });

  // 초기 설정 로드
  realtimeConfig.loadConfig();
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style scoped>
.realtime-config-panel {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.config-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.config-actions {
  display: flex;
  gap: 8px;
}

.toggle-button,
.reset-button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
}

.toggle-button:hover,
.reset-button:hover {
  background: #f0f0f0;
}

.reset-button {
  color: #dc3545;
  border-color: #dc3545;
}

.reset-button:hover {
  background: #dc3545;
  color: white;
}

.config-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.global-controls {
  padding: 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  cursor: pointer;
}

.market-config {
  padding: 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.area-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.area-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  cursor: pointer;
}

.area-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 12px;
  color: #666;
}

.update-count {
  font-weight: 500;
}

.last-update {
  color: #999;
}

.area-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.interval-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.interval-slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  cursor: pointer;
}

.interval-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #007bff;
  cursor: pointer;
}

.interval-value {
  min-width: 60px;
  text-align: right;
  font-weight: 500;
  color: #007bff;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.preset-button {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
}

.preset-button:hover {
  background: #f0f0f0;
}

.preset-button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.preset-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.stats-section {
  padding: 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.stats-title {
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.stat-card {
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stat-name {
  font-weight: 600;
  font-size: 12px;
}

.stat-status {
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 500;
}

.stat-status.active {
  background: #d4edda;
  color: #155724;
}

.stat-status.waiting {
  background: #fff3cd;
  color: #856404;
}

.stat-status.stale {
  background: #f8d7da;
  color: #721c24;
}

.stat-status.disabled {
  background: #e2e3e5;
  color: #6c757d;
}

.stat-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-weight: 500;
  color: #333;
}

.config-management {
  padding: 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.management-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.management-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.action-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.action-button:hover {
  background: #f0f0f0;
}

.action-button.save {
  color: #28a745;
  border-color: #28a745;
}

.action-button.save:hover {
  background: #28a745;
  color: white;
}

.action-button.load {
  color: #007bff;
  border-color: #007bff;
}

.action-button.load:hover {
  background: #007bff;
  color: white;
}

.action-button.export {
  color: #6f42c1;
  border-color: #6f42c1;
}

.action-button.export:hover {
  background: #6f42c1;
  color: white;
}

.action-button.import {
  color: #fd7e14;
  border-color: #fd7e14;
}

.action-button.import:hover {
  background: #fd7e14;
  color: white;
}
</style>
