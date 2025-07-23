<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { NCard, NSpace, NButton, NInput, NText, NTag, NDivider } from 'naive-ui';

// 차트 데이터 웹소켓 상태
const chartWS = ref<WebSocket | null>(null);
const chartData = ref<any[]>([]);
const chartConnected = ref(false);

// 채팅 웹소켓 상태
const chatWS = ref<WebSocket | null>(null);
const chatMessages = ref<any[]>([]);
const chatConnected = ref(false);
const chatInput = ref('');

/**
 * 차트 데이터 웹소켓 연결
 */
const connectChartWS = () => {
  if (chartWS.value?.readyState === WebSocket.OPEN) {
    console.log('차트 웹소켓이 이미 연결되어 있습니다.');
    return;
  }

  try {
    chartWS.value = new WebSocket('wss://stream.binance.com/ws/btcusdt@ticker');

    chartWS.value.onopen = () => {
      chartConnected.value = true;
      console.log('차트 웹소켓 연결됨');

      // 구독 메시지 전송
      chartWS.value?.send(
        JSON.stringify({
          type: 'subscribe',
          symbol: 'BTCUSDT',
          interval: '1m',
        })
      );
    };

    chartWS.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('차트 데이터 수신:', data);

        // 최신 10개 데이터만 유지
        chartData.value.unshift(data);
        if (chartData.value.length > 10) {
          chartData.value.pop();
        }
      } catch (error) {
        console.error('차트 데이터 파싱 오류:', error);
      }
    };

    chartWS.value.onclose = () => {
      chartConnected.value = false;
      console.log('차트 웹소켓 연결 종료');
    };

    chartWS.value.onerror = (error) => {
      console.error('차트 웹소켓 오류:', error);
    };
  } catch (error) {
    console.error('차트 웹소켓 연결 실패:', error);
  }
};

/**
 * 차트 데이터 웹소켓 연결 해제
 */
const disconnectChartWS = () => {
  if (chartWS.value) {
    chartWS.value.close();
    chartWS.value = null;
    chartConnected.value = false;
    chartData.value = [];
  }
};

/**
 * 채팅 웹소켓 연결
 */
const connectChatWS = () => {
  if (chatWS.value?.readyState === WebSocket.OPEN) {
    console.log('채팅 웹소켓이 이미 연결되어 있습니다.');
    return;
  }

  try {
    chatWS.value = new WebSocket('ws://localhost:3001/chat');

    chatWS.value.onopen = () => {
      chatConnected.value = true;
      console.log('채팅 웹소켓 연결됨');
    };

    chatWS.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('채팅 메시지 수신:', data);
        chatMessages.value.push(data);
      } catch (error) {
        console.error('채팅 메시지 파싱 오류:', error);
      }
    };

    chatWS.value.onclose = () => {
      chatConnected.value = false;
      console.log('채팅 웹소켓 연결 종료');
    };

    chatWS.value.onerror = (error) => {
      console.error('채팅 웹소켓 오류:', error);
    };
  } catch (error) {
    console.error('채팅 웹소켓 연결 실패:', error);
  }
};

/**
 * 채팅 웹소켓 연결 해제
 */
const disconnectChatWS = () => {
  if (chatWS.value) {
    chatWS.value.close();
    chatWS.value = null;
    chatConnected.value = false;
    chatMessages.value = [];
  }
};

/**
 * 채팅 메시지 전송
 */
const sendChatMessage = () => {
  if (chatWS.value && chatInput.value.trim()) {
    const message = {
      type: 'chat',
      text: chatInput.value.trim(),
      timestamp: Date.now(),
    };

    chatWS.value.send(JSON.stringify(message));
    chatInput.value = '';
  }
};

// 컴포넌트 정리
onUnmounted(() => {
  disconnectChartWS();
  disconnectChatWS();
});
</script>

<template>
  <div class="websocket-test p-6">
    <h2 class="text-2xl font-bold mb-6">WebSocket 모킹 테스트</h2>

    <NSpace vertical :size="24">
      <!-- 차트 데이터 웹소켓 테스트 -->
      <NCard title="📈 실시간 차트 데이터" size="large">
        <NSpace vertical :size="16">
          <NSpace align="center">
            <NTag :type="chartConnected ? 'success' : 'default'">
              {{ chartConnected ? '연결됨' : '연결 안됨' }}
            </NTag>
            <NButton type="primary" @click="connectChartWS" :disabled="chartConnected">
              연결
            </NButton>
            <NButton type="error" @click="disconnectChartWS" :disabled="!chartConnected">
              연결 해제
            </NButton>
          </NSpace>

          <NDivider />

          <div v-if="chartData.length > 0" class="chart-data">
            <h4 class="mb-3">실시간 가격 데이터:</h4>
            <div class="space-y-2">
              <div
                v-for="(data, index) in chartData"
                :key="index"
                class="p-3 bg-gray-50 rounded-lg font-mono text-sm"
              >
                <div v-if="data.type === 'price_update'">
                  <NSpace>
                    <NText strong>{{ data.symbol }}</NText>
                    <NText>가격: ${{ data.price?.toLocaleString() }}</NText>
                    <NText>볼륨: {{ data.volume?.toFixed(2) }}</NText>
                    <NText type="info">{{ new Date(data.timestamp).toLocaleTimeString() }}</NText>
                  </NSpace>
                </div>
                <div v-else>
                  {{ JSON.stringify(data, null, 2) }}
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="chartConnected" class="text-gray-500">실시간 데이터를 기다리는 중...</div>
        </NSpace>
      </NCard>

      <!-- 채팅 웹소켓 테스트 -->
      <NCard title="💬 채팅 테스트" size="large">
        <NSpace vertical :size="16">
          <NSpace align="center">
            <NTag :type="chatConnected ? 'success' : 'default'">
              {{ chatConnected ? '연결됨' : '연결 안됨' }}
            </NTag>
            <NButton type="primary" @click="connectChatWS" :disabled="chatConnected">
              연결
            </NButton>
            <NButton type="error" @click="disconnectChatWS" :disabled="!chatConnected">
              연결 해제
            </NButton>
          </NSpace>

          <NDivider />

          <!-- 메시지 입력 -->
          <NSpace v-if="chatConnected">
            <NInput
              v-model:value="chatInput"
              placeholder="메시지를 입력하세요..."
              @keyup.enter="sendChatMessage"
              style="width: 300px"
            />
            <NButton type="primary" @click="sendChatMessage" :disabled="!chatInput.trim()">
              전송
            </NButton>
          </NSpace>

          <!-- 채팅 메시지 표시 -->
          <div v-if="chatMessages.length > 0" class="chat-messages">
            <h4 class="mb-3">채팅 메시지:</h4>
            <div class="space-y-2 max-h-60 overflow-y-auto">
              <div
                v-for="(message, index) in chatMessages"
                :key="index"
                class="p-3 bg-blue-50 rounded-lg"
              >
                <NSpace>
                  <NText strong>{{ message.user || 'User' }}:</NText>
                  <NText>{{ message.message || message.text }}</NText>
                  <NText type="info" class="text-xs">
                    {{ new Date(message.timestamp).toLocaleTimeString() }}
                  </NText>
                </NSpace>
              </div>
            </div>
          </div>
          <div v-else-if="chatConnected" class="text-gray-500">메시지를 보내보세요!</div>
        </NSpace>
      </NCard>
    </NSpace>
  </div>
</template>

<style scoped>
.websocket-test {
  max-width: 800px;
  margin: 0 auto;
}

.chart-data {
  max-height: 400px;
  overflow-y: auto;
}

.chat-messages {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
}
</style>
