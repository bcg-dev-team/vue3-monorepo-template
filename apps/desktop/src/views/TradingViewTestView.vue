<template>
  <div class="trading-view-test p-6">
    <h2 class="text-2xl font-bold mb-6">TradingView + MSW 테스트</h2>

    <NSpace vertical :size="24">
      <!-- API 연결 상태 -->
      <NCard title="📊 API 연결 상태" size="large">
        <NSpace vertical :size="16">
          <NSpace align="center">
            <NTag :type="apiStatus.status === 'success' ? 'success' : 'error'">
              {{ apiStatus.status === 'success' ? 'API 연결됨' : 'API 연결 실패' }}
            </NTag>
            <NButton type="primary" @click="testApiConnection" :loading="apiTestLoading">
              API 연결 테스트
            </NButton>
          </NSpace>
        </NSpace>
      </NCard>

      <!-- TradingView 차트 -->
      <NCard title="📈 TradingView 차트" size="large">
        <NSpace vertical :size="16">
          <div class="chart-controls">
            <NSpace>
              <NSelect
                v-model:value="selectedSymbol"
                :options="symbolOptions"
                placeholder="심볼 선택"
                style="width: 200px"
                @update:value="changeSymbol"
              />
              <NSelect
                v-model:value="selectedInterval"
                :options="intervalOptions"
                placeholder="시간 간격"
                style="width: 150px"
                @update:value="changeInterval"
              />
              <NButton type="success" @click="refreshChart" :loading="chartLoading">
                차트 새로고침
              </NButton>
            </NSpace>
          </div>

          <div class="">
            <ChartView ref="chartRef" />
          </div>

          <div class="chart-info">
            <NText type="info">
              💡 이 차트는 MSW로 모킹된 데이터를 사용합니다. 실시간 데이터는 WebSocket을 통해
              업데이트됩니다.
            </NText>
            <div class="mt-3 p-3 bg-blue-50 rounded-lg">
              <h4 class="font-semibold mb-2">가격 스케일 디버깅 정보:</h4>
              <ul class="text-sm space-y-1">
                <li>• <strong>심볼 설정:</strong> pricescale=100 (소수점 2자리)</li>
                <li>• <strong>minmov:</strong> 1 (최소 움직임 단위)</li>
                <li>• <strong>가격 범위:</strong> ~50,000 EUR (소수점 표시)</li>
                <li>• <strong>포맷:</strong> price (가격 형식)</li>
                <li>• <strong>스케일 표시:</strong> showSeriesLastValue=true</li>
              </ul>
              <div class="mt-2 text-xs text-gray-600">
                오른쪽 가격 스케일이 보이지 않으면 브라우저 콘솔에서 오류를 확인하세요.
              </div>
            </div>
          </div>
        </NSpace>
      </NCard>

      <!-- WebSocket 상태 모니터링 -->
      <NCard title="🔌 WebSocket 연결 상태" size="large">
        <NSpace vertical :size="16">
          <NSpace align="center">
            <NTag :type="wsStatus.connected ? 'success' : 'error'">
              {{ wsStatus.connected ? 'WebSocket 연결됨' : 'WebSocket 연결 안됨' }}
            </NTag>
            <NButton type="warning" @click="reconnectWebSocket" :disabled="wsStatus.connected">
              재연결
            </NButton>
            <NButton type="info" @click="updateWSStatus"> 상태 새로고침 </NButton>
          </NSpace>

          <div class="ws-info">
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">활성 구독:</span>
                <span class="info-value">{{ wsStatus.subscriptions.length }}개</span>
              </div>
              <div class="info-item">
                <span class="info-label">구독자 수:</span>
                <span class="info-value">{{ wsStatus.subscriberCount }}명</span>
              </div>
              <div class="info-item">
                <span class="info-label">마지막 업데이트:</span>
                <span class="info-value">{{ lastWSUpdate || '없음' }}</span>
              </div>
            </div>
          </div>

          <div v-if="wsStatus.subscriptions.length > 0" class="subscription-list">
            <h4 class="font-semibold mb-2">활성 구독 목록:</h4>
            <div class="subscriptions">
              <NTag
                v-for="(sub, index) in wsStatus.subscriptions"
                :key="index"
                type="info"
                size="small"
              >
                {{ sub }}
              </NTag>
            </div>
          </div>
        </NSpace>
      </NCard>

      <!-- 모킹된 데이터 정보 -->
      <NCard title="🔧 모킹 데이터 설정" size="large">
        <NSpace vertical :size="16">
          <div class="data-controls">
            <NSpace>
              <div>
                <label class="block text-sm font-medium mb-2">시작 가격:</label>
                <NInputNumber
                  v-model:value="mockSettings.basePrice"
                  :min="100"
                  :max="100000"
                  :step="100"
                  style="width: 150px"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">변동성 (%):</label>
                <NInputNumber
                  v-model:value="mockSettings.volatility"
                  :min="0.01"
                  :max="0.2"
                  :step="0.01"
                  style="width: 150px"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">데이터 개수:</label>
                <NInputNumber
                  v-model:value="mockSettings.dataCount"
                  :min="50"
                  :max="1000"
                  :step="50"
                  style="width: 150px"
                />
              </div>
            </NSpace>
          </div>

          <NButton type="warning" @click="updateMockSettings"> 모킹 설정 업데이트 </NButton>

          <div class="mock-info">
            <h4 class="font-semibold mb-2">현재 모킹 설정:</h4>
            <ul class="text-sm space-y-1">
              <li>
                • API 엔드포인트: <code>https://min-api.cryptocompare.com/data/histoday</code>
              </li>
              <li>• 로컬 API: <code>/api/chart/histoday</code></li>
              <li>• WebSocket: <code>wss://stream.binance.com/*</code></li>
              <li>• 데이터 형식: CryptoCompare API 호환</li>
            </ul>
          </div>
        </NSpace>
      </NCard>

      <!-- 실시간 로그 -->
      <NCard title="📝 실시간 로그" size="large">
        <div class="log-container">
          <div
            v-for="(log, index) in logs"
            :key="index"
            class="log-entry p-2 border-b text-xs font-mono"
            :class="{
              'text-green-600': log.type === 'success',
              'text-red-600': log.type === 'error',
              'text-blue-600': log.type === 'info',
              'text-yellow-600': log.type === 'warning',
            }"
          >
            <span class="font-bold">[{{ log.timestamp }}]</span>
            <span class="ml-2">{{ log.message }}</span>
          </div>
          <div v-if="logs.length === 0" class="text-gray-500 text-center py-4">
            로그가 없습니다. 차트를 조작하거나 API를 테스트해보세요.
          </div>
        </div>
        <div class="mt-4">
          <NButton size="small" @click="clearLogs">로그 지우기</NButton>
        </div>
      </NCard>
    </NSpace>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { NCard, NSpace, NButton, NTag, NText, NSelect, NInputNumber } from 'naive-ui';
import ChartView from '../components/ChartView.vue';
// WebSocket 상태 모니터링을 위한 streaming 함수들
// @ts-ignore - JavaScript 파일이므로 타입 체크 무시
import { isConnected, reconnect, getSubscriptionStatus } from '../chart/streaming.js';

// 참조
const chartRef = ref();

// 상태 관리
const apiTestLoading = ref(false);
const chartLoading = ref(false);
const selectedSymbol = ref('BTC/EUR');
const selectedInterval = ref('1D');

// API 상태
const apiStatus = ref({
  status: 'pending' as 'success' | 'error' | 'pending',
  message: '',
  data: null as any,
});

// 모킹 설정
const mockSettings = ref({
  basePrice: 50000,
  volatility: 0.05,
  dataCount: 100,
});

// 로그
const logs = ref<
  Array<{
    timestamp: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }>
>([]);

// WebSocket 상태
const wsStatus = ref({
  connected: false,
  subscriptions: [] as string[],
  subscriberCount: 0,
});
const lastWSUpdate = ref<string | null>(null);

// 옵션들
const symbolOptions = [
  { label: 'BTC/EUR', value: 'BTC/EUR' },
  { label: 'BTC/USD', value: 'BTC/USD' },
  { label: 'ETH/EUR', value: 'ETH/EUR' },
  { label: 'ETH/USD', value: 'ETH/USD' },
];

const intervalOptions = [
  { label: '1분', value: '1m' },
  { label: '5분', value: '5m' },
  { label: '15분', value: '15m' },
  { label: '1시간', value: '1h' },
  { label: '1일', value: '1D' },
  { label: '1주', value: '1W' },
];

/**
 * 로그 추가 함수
 */
const addLog = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
  logs.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    type,
    message,
  });

  // 최대 100개 로그만 유지
  if (logs.value.length > 100) {
    logs.value = logs.value.slice(0, 100);
  }
};

/**
 * API 연결 테스트
 */
const testApiConnection = async () => {
  try {
    apiTestLoading.value = true;
    addLog('info', 'API 연결 테스트 시작...');

    // MSW로 모킹된 API 호출
    const response = await fetch('/api/chart/histoday?e=Bitfinex&fsym=BTC&tsym=EUR&limit=10');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    apiStatus.value = {
      status: 'success',
      message: 'API 연결 성공!',
      data,
    };

    addLog('success', `API 연결 성공 - ${data.Data?.length || 0}개 데이터 수신`);
  } catch (error) {
    apiStatus.value = {
      status: 'error',
      message: error instanceof Error ? error.message : '알 수 없는 오류',
      data: null,
    };

    addLog('error', `API 연결 실패: ${apiStatus.value.message}`);
  } finally {
    apiTestLoading.value = false;
  }
};

/**
 * 심볼 변경
 */
const changeSymbol = (symbol: string) => {
  addLog('info', `심볼 변경: ${symbol}`);
  // TradingView 차트 심볼 업데이트 로직 (필요시 구현)
};

/**
 * 간격 변경
 */
const changeInterval = (interval: string) => {
  addLog('info', `시간 간격 변경: ${interval}`);
  // TradingView 차트 간격 업데이트 로직 (필요시 구현)
};

/**
 * 차트 새로고침
 */
const refreshChart = async () => {
  try {
    chartLoading.value = true;
    addLog('info', '차트 새로고침 중...');

    // 차트 컴포넌트 새로고침 로직
    await nextTick();

    addLog('success', '차트 새로고침 완료');
  } catch (error) {
    addLog('error', `차트 새로고침 실패: ${error}`);
  } finally {
    chartLoading.value = false;
  }
};

/**
 * 모킹 설정 업데이트
 */
const updateMockSettings = () => {
  addLog(
    'warning',
    `모킹 설정 업데이트: 가격=${mockSettings.value.basePrice}, 변동성=${mockSettings.value.volatility}, 개수=${mockSettings.value.dataCount}`
  );
  // 실제로는 MSW 핸들러에 설정을 전달하는 로직이 필요
};

/**
 * 로그 지우기
 */
const clearLogs = () => {
  logs.value = [];
  addLog('info', '로그가 지워졌습니다.');
};

/**
 * WebSocket 상태 업데이트
 */
const updateWSStatus = () => {
  try {
    const status = getSubscriptionStatus();
    wsStatus.value = {
      connected: status.connected,
      subscriptions: status.subscriptions,
      subscriberCount: status.subscriberCount,
    };
    lastWSUpdate.value = new Date().toLocaleTimeString();
    addLog(
      'info',
      `WebSocket 상태 업데이트: 연결=${status.connected}, 구독=${status.subscriptions.length}개`
    );
  } catch (error) {
    addLog('error', `WebSocket 상태 업데이트 실패: ${error}`);
  }
};

/**
 * WebSocket 재연결
 */
const reconnectWebSocket = () => {
  try {
    addLog('warning', 'WebSocket 재연결 시도...');
    reconnect();

    // 잠시 후 상태 업데이트
    setTimeout(() => {
      updateWSStatus();
    }, 1000);
  } catch (error) {
    addLog('error', `WebSocket 재연결 실패: ${error}`);
  }
};

// 컴포넌트 마운트 시 초기 테스트
onMounted(async () => {
  addLog('info', 'TradingView 테스트 페이지 로드됨');
  await nextTick();

  // WebSocket 상태 초기화
  updateWSStatus();

  // 주기적으로 WebSocket 상태 업데이트 (5초마다)
  const wsStatusInterval = setInterval(() => {
    updateWSStatus();
  }, 5000);

  // 컴포넌트 언마운트 시 인터벌 정리
  onUnmounted(() => {
    clearInterval(wsStatusInterval);
  });

  // 자동으로 API 연결 테스트
  setTimeout(() => {
    testApiConnection();
  }, 1000);
});
</script>

<style scoped>
.trading-view-test {
  max-width: 1200px;
  margin: 0 auto;
}

.chart-container {
  min-height: 600px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

.log-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: #fafafa;
}

.log-entry {
  font-family: 'Courier New', Courier, monospace;
}

.data-controls > * {
  margin-bottom: 0.5rem;
}

.mock-info ul {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}

.mock-info code {
  background: #e9ecef;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.ws-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-weight: 500;
  color: #6c757d;
}

.info-value {
  font-weight: 600;
  color: #495057;
}

.subscription-list {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 1rem;
}

.subscriptions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
