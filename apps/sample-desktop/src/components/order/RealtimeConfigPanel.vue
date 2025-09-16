<!-- 개발용 디버깅 패널 -->
<template>
  <div class="dev-panel">
    <div class="dev-header" @click="togglePanel">
      <span class="dev-title">🔧 실시간 데이터 설정</span>
      <span class="toggle-icon">
        {{ isExpanded ? '−' : '+' }}
      </span>
    </div>

    <div v-if="isExpanded" class="dev-content">
      <!-- 간격 설정 -->
      <div class="dev-section">
        <label class="dev-label">업데이트 간격</label>
        <div class="preset-buttons">
          <button
            v-for="preset in intervalPresets"
            :key="preset.value"
            @click="setPresetInterval(preset.value)"
            class="preset-btn"
            :class="{ active: marketConfig.interval === preset.value }"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>

      <!-- 상태 정보 -->
      <div class="dev-section">
        <div class="status-info">
          <span class="status-label">상태:</span>
          <span class="status-value" :class="getStatusClass()">
            {{ getStatusText() }}
          </span>
          <span class="update-count">{{ marketConfig.updateCount }}회</span>
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
];

// 함수들
const togglePanel = () => {
  isExpanded.value = !isExpanded.value;
};

const setPresetInterval = (interval: number) => {
  realtimeConfig.setInterval('market', interval);
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
  unsubscribe = realtimeConfig.onConfigChange(() => {
    // 설정 변경 시 자동 업데이트
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style scoped>
.dev-panel {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  margin: 8px 0;
  font-size: 12px;
}

.dev-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #e9ecef;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dev-header:hover {
  background: #dee2e6;
}

.dev-title {
  font-weight: 600;
  color: #495057;
}

.toggle-icon {
  width: 20px;
  height: 20px;
  background: #6c757d;
  color: white;
  border-radius: 3px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.dev-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dev-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dev-label {
  font-weight: 500;
  color: #495057;
  font-size: 11px;
}

.preset-buttons {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.preset-btn {
  padding: 4px 8px;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  font-size: 10px;
  transition: all 0.2s;
}

.preset-btn:hover {
  background: #f8f9fa;
}

.preset-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.status-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
}

.status-label {
  color: #6c757d;
}

.status-value {
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
}

.status-value.active {
  background: #d4edda;
  color: #155724;
}

.status-value.waiting {
  background: #fff3cd;
  color: #856404;
}

.status-value.stale {
  background: #f8d7da;
  color: #721c24;
}

.status-value.disabled {
  background: #e2e3e5;
  color: #6c757d;
}

.update-count {
  color: #6c757d;
  font-size: 10px;
}
</style>
