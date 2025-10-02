<!--
  @fileoverview 차트 설정 다이얼로그 컴포넌트
  @component ChartSettingsDialog
  @figma 차트 설정 다이얼로그
  FIXME: 피그마 확인하여 추가 수정
-->
<template>
  <BaseModal
    :is-open="isVisible"
    title="설정"
    size="lg"
    :close-on-overlay-click="true"
    :close-on-escape="true"
    :show-close-button="true"
    :show-default-footer="false"
    content-padding="compact"
    @close="handleClose"
  >
    <!-- 메인 컨텐츠 -->
    <div class="settings-main">
      <!-- 좌측 탭 네비게이션 -->
      <div class="settings-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 우측 설정 패널 -->
      <div class="settings-content">
        <!-- 기본 탭 -->
        <div v-if="activeTab === 'basic'" class="settings-panel">
          <div class="setting-section">
            <h3 class="section-title">기본</h3>

            <div class="setting-group">
              <!-- 테마 설정 -->
              <div class="setting-item">
                <label class="setting-label">테마</label>
                <div class="theme-selector">
                  <button
                    :class="['theme-option', { selected: settings.basic.theme === 'redBlue' }]"
                    @click="updateSetting('basic.theme', 'redBlue')"
                  >
                    <div class="theme-preview redBlue">
                      <div class="candle red"></div>
                      <div class="candle blue"></div>
                    </div>
                    <!-- FIXME: 아이콘 변경 필요 -->
                    <BaseIcon
                      v-if="settings.basic.theme === 'redBlue'"
                      name="check-sm"
                      size="sm"
                      color="var(--background-bg-default)"
                      class="theme-check"
                    />
                  </button>
                  <button
                    :class="['theme-option', { selected: settings.basic.theme === 'greenRed' }]"
                    @click="updateSetting('basic.theme', 'greenRed')"
                  >
                    <div class="theme-preview greenRed">
                      <div class="candle green"></div>
                      <div class="candle red"></div>
                    </div>
                    <!-- FIXME: 아이콘 변경 필요 -->
                    <BaseIcon
                      v-if="settings.basic.theme === 'greenRed'"
                      name="check-sm"
                      size="sm"
                      color="var(--background-bg-default)"
                      class="theme-check"
                    />
                  </button>
                </div>
              </div>

              <!-- 가격 정밀도 -->
              <div class="setting-item">
                <label class="setting-label">가격 정밀도</label>
                <select
                  v-model="settings.basic.precision"
                  @change="applySettings"
                  class="setting-select"
                >
                  <option value="default">기본</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <!-- 타임존 -->
              <div class="setting-item">
                <label class="setting-label">타임존</label>
                <select
                  v-model="settings.basic.timezone"
                  @change="applySettings"
                  class="setting-select"
                >
                  <option value="Asia/Seoul">(UTC +09:00) 서울(KST)</option>
                  <option value="UTC">(UTC +00:00) UTC</option>
                  <option value="America/New_York">(UTC -05:00) 뉴욕(EST)</option>
                  <option value="Europe/London">(UTC +00:00) 런던(GMT)</option>
                </select>
              </div>

              <!-- 시간 형식은 24시간으로 고정 (TradingView 제한) -->
            </div>
          </div>
        </div>

        <!-- 심볼 및 지표 탭 -->
        <div v-if="activeTab === 'symbols'" class="settings-panel">
          <div class="setting-section">
            <h3 class="section-title">심볼 및 지표</h3>

            <div class="setting-group">
              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.symbols.showSymbolName"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">종목명</label>
              </div>

              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.symbols.showChartValues"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">차트 값</label>
              </div>

              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.symbols.showBarChangeValues"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">봉 변화값</label>
              </div>

              <!-- 지표 관련 설정 - 새로운 레이아웃 -->
              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.symbols.showIndicatorNames"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">지표 이름</label>
              </div>

              <div class="setting-item checkbox-item indicator-sub-item">
                <BaseCheckbox
                  v-model="settings.symbols.showIndicatorArguments"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">매개변수</label>
              </div>

              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.symbols.showIndicatorValues"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">지표 값</label>
              </div>
            </div>
          </div>
        </div>

        <!-- 축 및 눈금선 탭 -->
        <div v-if="activeTab === 'scales'" class="settings-panel">
          <div class="setting-section">
            <h3 class="section-title">축 및 눈금선</h3>

            <div class="setting-group">
              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.scales.showPriceLabels"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">종목 가격</label>
              </div>

              <div class="setting-item complex-item">
                <BaseCheckbox
                  v-model="settings.scales.showGridLines"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">격자선</label>
                <select
                  v-model="settings.scales.gridLineMode"
                  @change="applySettings"
                  class="setting-select small"
                  :disabled="!settings.scales.showGridLines"
                >
                  <option value="both">수직 / 수평</option>
                  <option value="vertical">수직</option>
                  <option value="horizontal">수평</option>
                </select>
                <!-- 수직 격자선 색상 (수직 또는 둘다 모드일 때만 표시) -->
                <ColorPicker
                  v-if="
                    settings.scales.gridLineMode === 'vertical' ||
                    settings.scales.gridLineMode === 'both'
                  "
                  v-model="settings.scales.verticalGridColor"
                  @change="applySettings"
                  :disabled="!settings.scales.showGridLines"
                  title="수직 격자선 색상"
                />
                <!-- 수평 격자선 색상 (수평 또는 둘다 모드일 때만 표시) -->
                <ColorPicker
                  v-if="
                    settings.scales.gridLineMode === 'horizontal' ||
                    settings.scales.gridLineMode === 'both'
                  "
                  v-model="settings.scales.horizontalGridColor"
                  @change="applySettings"
                  :disabled="!settings.scales.showGridLines"
                  title="수평 격자선 색상"
                />
              </div>

              <div class="setting-item complex-item">
                <BaseCheckbox
                  v-model="settings.scales.showCrosshair"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">십자선 (TBD)</label>
                <ColorPicker
                  v-model="settings.scales.crosshairColor"
                  @change="applySettings"
                  :disabled="!settings.scales.showCrosshair"
                  title="십자선 색상"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 트레이딩 탭 -->
        <div v-if="activeTab === 'trading'" class="settings-panel">
          <div class="setting-section">
            <h3 class="section-title">트레이딩</h3>

            <div class="setting-group">
              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.trading.showBuySellButtons"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">매수/매도 버튼 (TBD)</label>
              </div>

              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.trading.instantOrderExecution"
                  @update:modelValue="applySettings"
                  disabled
                />
                <label class="checkbox-label">즉시 주문 실행 (TBD)</label>
              </div>

              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.trading.showOrders"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">주문 (TBD)</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { getGlobalChartSettingsInstance } from '../../composables/useGlobalChartSettings';
import { BaseIcon, BaseCheckbox, BaseModal } from '@template/ui';
import type { ChartSettings } from '@template/types';
import ColorPicker from './ColorPicker.vue';
import './ChartSettingsDialog.scss';
import { ref } from 'vue';

interface Props {
  /**
   * 다이얼로그 표시 여부
   */
  isVisible: boolean;
  /**
   * 차트 매니저 인스턴스
   */
  chartManager?: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /**
   * 다이얼로그 닫기
   */
  close: [];
  /**
   * 설정 변경 시 발생
   * @param settings - 변경된 차트 설정
   */
  settingsChanged: [settings: ChartSettings];
}>();

// 글로벌 차트 설정 인스턴스
const globalChartSettings = getGlobalChartSettingsInstance();
const settings = globalChartSettings.getGlobalChartSettings();

// 활성 탭
const activeTab = ref('basic');

// 탭 정의
const tabs = [
  { id: 'basic', label: '기본' },
  { id: 'symbols', label: '심볼 및 지표' },
  { id: 'scales', label: '축 및 눈금선' },
  { id: 'trading', label: '트레이딩' },
];

// 설정 업데이트 헬퍼 함수
const updateSetting = (path: string, value: any) => {
  const keys = path.split('.');
  let target: any = settings;

  for (let i = 0; i < keys.length - 1; i++) {
    target = target[keys[i]];
  }

  const oldValue = target[keys[keys.length - 1]];
  target[keys[keys.length - 1]] = value;

  console.log(`[ChartSettingsDialog] Setting updated: ${path}`, {
    from: oldValue,
    to: value,
  });

  applySettings();
};

// 설정 적용
const applySettings = () => {
  try {
    console.log('[ChartSettingsDialog] === SETTINGS CHANGE STARTED ===');
    console.log('[ChartSettingsDialog] 🔍 CHECKBOX VALUES CHECK:', {
      symbols: {
        showSymbolName: settings.symbols.showSymbolName,
        showChartValues: settings.symbols.showChartValues,
        showBarChangeValues: settings.symbols.showBarChangeValues,
        showIndicatorNames: settings.symbols.showIndicatorNames,
        showIndicatorArguments: settings.symbols.showIndicatorArguments,
        showIndicatorValues: settings.symbols.showIndicatorValues,
      },
      scales: {
        showPriceLabels: settings.scales.showPriceLabels,
        showGridLines: settings.scales.showGridLines,
        gridLineMode: settings.scales.gridLineMode,
        showCrosshair: settings.scales.showCrosshair,
        crosshairColor: settings.scales.crosshairColor,
      },
    });

    // 글로벌 설정을 모든 차트에 적용
    globalChartSettings.updateGlobalChartSettings(settings);

    // 이벤트 발생
    emit('settingsChanged', settings);

    console.log('[ChartSettingsDialog] === SETTINGS CHANGE COMPLETED ===');
  } catch (error) {
    console.error('[ChartSettingsDialog] Failed to apply global settings:', error);
  }
};

// 다이얼로그 닫기
const handleClose = () => {
  emit('close');
};
</script>
